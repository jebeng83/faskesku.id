<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        // Inject dynamic wallpaper from legacy `setting` table for guest login page
        $wallpaperDataUrl = null;
        $instansi = null;

        try {
            if (Schema::hasTable('setting')) {
                // Ambil record aktif jika ada, jika tidak, ambil record pertama
                // Catatan: di UI/validasi kita menggunakan nilai 'Yes'/'No'.
                // Untuk kompatibilitas dengan variasi data lama ('yes'/'no'), gunakan pencarian case-insensitive.
                // FIXED: Menggunakan parameter binding untuk mencegah SQL injection
                $active = DB::table('setting')
                    ->select('nama_instansi', 'wallpaper', 'aktifkan')
                    ->whereRaw('LOWER(aktifkan) = ?', ['yes'])
                    ->first();

                if (! $active) {
                    $active = DB::table('setting')
                        ->select('nama_instansi', 'wallpaper', 'aktifkan')
                        ->first();
                }

                if ($active) {
                    $instansi = $active->nama_instansi ?? null;
                    $blob = $active->wallpaper ?? null;
                    if ($blob) {
                        // Pastikan blob dalam bentuk string
                        if (! is_string($blob) && is_resource($blob)) {
                            $blob = stream_get_contents($blob);
                        }

                        if (is_string($blob)) {
                            $mime = $this->detectImageMime($blob) ?? 'image/jpeg';
                            $wallpaperDataUrl = 'data:'.$mime.';base64,'.base64_encode($blob);
                        }
                    }
                }
            }
        } catch (\Throwable $e) {
            // Abaikan kesalahan, gunakan wallpaper default di sisi frontend
        }

        return Inertia::render('Auth/Login', [
            'wallpaperDataUrl' => $wallpaperDataUrl,
            'instansi' => $instansi,
        ]);
    }

    public function login(Request $request)
    {
        $key = 'login.'.$request->ip();
        $rateLimited = false;
        $retryAfter = null;
        try {
            if (RateLimiter::tooManyAttempts($key, 5)) {
                $rateLimited = true;
                $retryAfter = RateLimiter::availableIn($key);
            }
        } catch (\Throwable $e) {
            $rateLimited = false;
            $retryAfter = null;
            Log::warning('RateLimiter unavailable', [
                'error' => $e->getMessage(),
                'ip' => $request->ip(),
            ]);
        }

        if ($rateLimited) {
            Log::warning('Login rate limit exceeded', [
                'ip' => $request->ip(),
                'username' => $request->input('username'),
                'user_agent' => $request->userAgent(),
            ]);

            return back()->withErrors([
                'username' => $retryAfter !== null
                    ? "Terlalu banyak percobaan login. Silakan coba lagi dalam {$retryAfter} detik."
                    : 'Terlalu banyak percobaan login. Silakan coba lagi nanti.',
            ])->onlyInput('username');
        }

        $credentials = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required'],
        ]);

        try {
            if (! Schema::hasTable('users')) {
                Log::error('Users table missing');
                return back()->withErrors([
                    'username' => 'Server belum dikonfigurasi untuk login.',
                ])->onlyInput('username');
            }

            $user = \App\Models\User::where('username', $credentials['username'])
                ->orWhere('email', $credentials['username'])
                ->first();
        } catch (\Throwable $e) {
            Log::error('Login query failed', [
                'error' => $e->getMessage(),
            ]);
            return back()->withErrors([
                'username' => 'Login gagal karena gangguan server. Coba lagi nanti.',
            ])->onlyInput('username');
        }

        if ($user && \Illuminate\Support\Facades\Hash::check($credentials['password'], $user->password)) {
            try { RateLimiter::clear($key); } catch (\Throwable $e) {}

            Auth::login($user, $request->boolean('remember'));
            $request->session()->regenerate();

            Log::info('Successful login', [
                'user_id' => $user->id,
                'username' => $user->username,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            // Setelah login, arahkan ke Dashboard
            return redirect()->route('dashboard');
        }

        try { RateLimiter::hit($key, 60); } catch (\Throwable $e) {}

        Log::warning('Failed login attempt', [
            'username' => $credentials['username'],
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return back()->withErrors([
            'username' => 'Kredensial tidak valid.',
        ])->onlyInput('username');
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }

    /**
     * Deteksi mime type image dari bytes awal blob untuk wallpaper login.
     */
    protected function detectImageMime($blob): ?string
    {
        if (! is_string($blob)) {
            if (is_resource($blob)) {
                $blob = stream_get_contents($blob);
            } else {
                return null;
            }
        }

        $bytes = substr($blob, 0, 12);
        // PNG
        if (strncmp($bytes, "\x89PNG\r\n\x1A\n", 8) === 0) {
            return 'image/png';
        }
        // JPEG (SOI 0xFFD8)
        if (strlen($bytes) >= 2 && ord($bytes[0]) === 0xFF && ord($bytes[1]) === 0xD8) {
            return 'image/jpeg';
        }
        // GIF
        if (strncmp($bytes, 'GIF87a', 6) === 0 || strncmp($bytes, 'GIF89a', 6) === 0) {
            return 'image/gif';
        }
        // WebP (RIFF....WEBP)
        if (strncmp($bytes, 'RIFF', 4) === 0 && strncmp(substr($bytes, 8, 4), 'WEBP', 4) === 0) {
            return 'image/webp';
        }
        // BMP (BM)
        if (strncmp($bytes, 'BM', 2) === 0) {
            return 'image/bmp';
        }

        return null;
    }
}
