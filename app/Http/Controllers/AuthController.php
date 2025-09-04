<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Setting;

class AuthController extends Controller
{
    public function showLogin()
    {
        // Ambil setting aktif untuk wallpaper
        $setting = Setting::where('aktifkan', 'Yes')->first();
        $wallpaper = null;
        
        if ($setting && $setting->wallpaper) {
            $wallpaper = route('settings.image', ['setting' => $setting->nama_instansi, 'type' => 'wallpaper']);
        }
        
        return Inertia::render('Auth/Login', [
            'wallpaper' => $wallpaper,
            'setting' => $setting ? $setting->makeHidden(['wallpaper', 'logo'])->toArray() : null
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended('/dashboard');
        }

        return back()->withErrors([
            'email' => 'Kredensial tidak valid.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('login');
    }
}
