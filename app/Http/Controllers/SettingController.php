<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SettingController extends Controller
{
    /**
     * Get application configuration for API
     */
    public function config()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'timezone' => config('app.timezone'),
                'locale' => config('app.locale'),
                'name' => config('app.name'),
                'url' => config('app.url'),
            ]
        ]);
    }

    public function index(Request $request)
    {
        $query = Setting::query()
            ->select([
                'nama_instansi',
                'alamat_instansi',
                'kabupaten',
                'propinsi',
                'kontak',
                'email',
                'aktifkan',
                'kode_ppk',
                'kode_ppkinhealth',
                'kode_ppkkemenkes',
                'logo',
                'wallpaper'
            ]);

        // Search functionality
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('aktifkan', $request->status);
        }

        $settings = $query->orderBy('nama_instansi')->paginate(10)->withQueryString();
        
        // Konversi data binary ke base64 untuk tampilan dan tambahkan flag has_logo dan has_wallpaper
        $settings->getCollection()->transform(function ($setting) {
            // Add has_logo and has_wallpaper flags for frontend
            $setting->has_logo = !is_null($setting->logo);
            $setting->has_wallpaper = !is_null($setting->wallpaper);
            
            if ($setting->logo) {
                $setting->logo = base64_encode($setting->logo);
            }
            if ($setting->wallpaper) {
                $setting->wallpaper = base64_encode($setting->wallpaper);
            }
            return $setting;
        });

        return Inertia::render('Settings/Index', [
            'settings' => $settings,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    public function create()
    {
        return response()->json([
            'success' => true,
            'data' => new Setting()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_instansi' => 'required|string|max:60|unique:setting,nama_instansi',
            'alamat_instansi' => 'nullable|string|max:150',
            'kabupaten' => 'nullable|string|max:30',
            'propinsi' => 'nullable|string|max:30',
            'kontak' => 'required|string|max:50',
            'email' => 'required|email|max:50',
            'aktifkan' => 'required|in:Yes,No',
            'kode_ppk' => 'nullable|string|max:15',
            'kode_ppkinhealth' => 'nullable|string|max:15',
            'kode_ppkkemenkes' => 'nullable|string|max:15',
            'wallpaper' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $data = $request->except(['wallpaper', 'logo']);

            // Handle wallpaper upload - save as binary data in database
            if ($request->hasFile('wallpaper')) {
                $wallpaper = $request->file('wallpaper');
                $data['wallpaper'] = file_get_contents($wallpaper->getPathname());
            }

            // Handle logo upload - save as binary data in database
            if ($request->hasFile('logo')) {
                $logo = $request->file('logo');
                $data['logo'] = file_get_contents($logo->getPathname());
            }

            // Java behavior parity: only one row is allowed
            // Replace any existing row, then insert the new one
            Setting::query()->delete();

            // If this setting is being activated, deactivate others (noop after delete)
            if (($data['aktifkan'] ?? 'No') === 'Yes') {
                // nothing to do; there are no other rows now
            }

            $setting = Setting::create($data);

            // Buat respons tanpa data binary
            return response()->json([
                'success' => true,
                'message' => 'Setting berhasil dibuat',
                'data' => [
                    'nama_instansi' => $setting->nama_instansi,
                    'alamat_instansi' => $setting->alamat_instansi,
                    'kabupaten' => $setting->kabupaten,
                    'propinsi' => $setting->propinsi,
                    'kontak' => $setting->kontak,
                    'email' => $setting->email,
                    'aktifkan' => $setting->aktifkan,
                    'kode_ppk' => $setting->kode_ppk,
                    'kode_ppkinhealth' => $setting->kode_ppkinhealth,
                    'kode_ppkkemenkes' => $setting->kode_ppkkemenkes,
                    'has_logo' => !is_null($setting->logo),
                    'has_wallpaper' => !is_null($setting->wallpaper)
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show(Setting $setting)
    {
        return response()->json([
            'success' => true,
            'data' => $this->transformSetting($setting)
        ]);
    }

    public function edit(Setting $setting)
    {
        return response()->json([
            'success' => true,
            'data' => $this->transformSetting($setting)
        ]);
    }

    public function update(Request $request, Setting $setting)
    {
        $validator = Validator::make($request->all(), [
            'nama_instansi' => 'required|string|max:60|unique:setting,nama_instansi,' . $setting->nama_instansi . ',nama_instansi',
            'alamat_instansi' => 'nullable|string|max:150',
            'kabupaten' => 'nullable|string|max:30',
            'propinsi' => 'nullable|string|max:30',
            'kontak' => 'required|string|max:50',
            'email' => 'required|email|max:50',
            'aktifkan' => 'required|in:Yes,No',
            'kode_ppk' => 'nullable|string|max:15',
            'kode_ppkinhealth' => 'nullable|string|max:15',
            'kode_ppkkemenkes' => 'nullable|string|max:15',
            'wallpaper' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $data = $request->except(['wallpaper', 'logo']);

            // Handle wallpaper upload - save as binary data in database
            if ($request->hasFile('wallpaper')) {
                $wallpaper = $request->file('wallpaper');
                $data['wallpaper'] = file_get_contents($wallpaper->getPathname());
            }

            // Handle logo upload - save as binary data in database
            if ($request->hasFile('logo')) {
                $logo = $request->file('logo');
                $data['logo'] = file_get_contents($logo->getPathname());
            }

            // If this setting is being activated, deactivate others
            if ($data['aktifkan'] === 'Yes') {
                Setting::where('aktifkan', 'Yes')
                      ->where('nama_instansi', '!=', $setting->nama_instansi)
                      ->update(['aktifkan' => 'No']);
            }

            $setting->update($data);
            
            // Buat respons tanpa data binary
            return response()->json([
                'success' => true,
                'message' => 'Setting berhasil diperbarui',
                'data' => [
                    'nama_instansi' => $setting->nama_instansi,
                    'alamat_instansi' => $setting->alamat_instansi,
                    'kabupaten' => $setting->kabupaten,
                    'propinsi' => $setting->propinsi,
                    'kontak' => $setting->kontak,
                    'email' => $setting->email,
                    'aktifkan' => $setting->aktifkan,
                    'kode_ppk' => $setting->kode_ppk,
                    'kode_ppkinhealth' => $setting->kode_ppkinhealth,
                    'kode_ppkkemenkes' => $setting->kode_ppkkemenkes,
                    'has_logo' => !is_null($setting->logo),
                    'has_wallpaper' => !is_null($setting->wallpaper)
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy($nama_instansi)
    {
        try {
            $setting = Setting::where('nama_instansi', $nama_instansi)->firstOrFail();
            $setting->delete();

            return redirect()->route('settings.index')->with('success', 'Setting berhasil dihapus');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['delete' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    public function activate(Setting $setting)
    {
        try {
            // Hanya toggle kolom aktifkan
            Setting::where('aktifkan', 'Yes')->update(['aktifkan' => 'No']);
            $setting->update(['aktifkan' => 'Yes']);

            // Inertia expects a redirect
            return redirect()->route('settings.index')->with('success', 'Setting berhasil diaktifkan');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['activate' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    public function getImage($setting, $type)
    {
        // Decode URL-encoded setting parameter to handle spaces and special characters
        $decodedSetting = rawurldecode($setting);
        
        // Debug log untuk troubleshooting
        Log::info('=== getImage METHOD CALLED ===', [
            'setting_param' => $setting,
            'decoded_setting' => $decodedSetting,
            'type' => $type,
            'request_url' => request()->fullUrl(),
            'request_method' => request()->method(),
            'user_agent' => request()->userAgent(),
            'all_settings_in_db' => Setting::pluck('nama_instansi')->toArray()
        ]);
        
        // Additional debug log for URL decoding
        Log::info('=== URL DECODING DEBUG ===', [
            'original_setting' => $setting,
            'decoded_setting' => $decodedSetting,
            'type' => $type
        ]);
        
        $setting = Setting::where('nama_instansi', $decodedSetting)->first();
        
        if (!$setting) {
            Log::error('Setting not found', ['nama_instansi' => $decodedSetting]);
            return response()->json(['error' => 'Setting not found'], 404);
        }
        
        if ($type === 'logo' && $setting->logo) {
            if (strpos($setting->logo, 'setting/') === 0) {
                // Return file from storage (legacy path-based storage)
                return response()->file(public_path($setting->logo));
            } else {
                // Handle binary data directly from database
                // Detect MIME type from binary data
                $finfo = new \finfo(FILEINFO_MIME_TYPE);
                $mimeType = $finfo->buffer($setting->logo) ?: 'image/png';
                $extension = $this->getExtensionFromMimeType($mimeType);
                
                return response($setting->logo)
                    ->header('Content-Type', $mimeType)
                    ->header('Content-Disposition', "inline; filename=\"logo.{$extension}\"")
                    ->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
                    ->header('Pragma', 'no-cache')
                    ->header('Expires', '0');
            }
        }
        
        if ($type === 'wallpaper' && $setting->wallpaper) {
            Log::info('Processing wallpaper request', [
                'has_wallpaper' => !is_null($setting->wallpaper),
                'wallpaper_size' => strlen($setting->wallpaper ?? ''),
                'is_path' => strpos($setting->wallpaper, 'img/') === 0
            ]);
            
            if (strpos($setting->wallpaper, 'img/') === 0) {
                // Return file from storage (legacy path-based storage)
                return response()->file(public_path($setting->wallpaper));
            } else {
                // Handle binary data directly from database
                // Detect MIME type from binary data
                $finfo = new \finfo(FILEINFO_MIME_TYPE);
                $mimeType = $finfo->buffer($setting->wallpaper) ?: 'image/png';
                $extension = $this->getExtensionFromMimeType($mimeType);
                
                Log::info('Serving wallpaper BLOB', [
                    'mime_type' => $mimeType,
                    'extension' => $extension,
                    'data_size' => strlen($setting->wallpaper)
                ]);
                
                return response($setting->wallpaper)
                    ->header('Content-Type', $mimeType)
                    ->header('Content-Disposition', "inline; filename=\"wallpaper.{$extension}\"")
                    ->header('Cache-Control', 'public, max-age=3600')
                    ->header('Pragma', 'cache')
                    ->header('Expires', gmdate('D, d M Y H:i:s', time() + 3600) . ' GMT');
            }
        }
        
        return response()->json(['error' => 'Image not found'], 404);
    }

    /**
     * Get file extension from MIME type
     */
    private function getExtensionFromMimeType($mimeType)
    {
        $extensions = [
            'image/jpeg' => 'jpg',
            'image/jpg' => 'jpg',
            'image/png' => 'png',
            'image/gif' => 'gif',
            'image/webp' => 'webp',
            'image/bmp' => 'bmp',
            'image/svg+xml' => 'svg',
        ];

        return $extensions[$mimeType] ?? 'png';
    }

    /**
     * Get active setting for AppLayout
     */
    public function getActiveSetting()
    {
        try {
            $setting = Setting::where('aktifkan', 'Yes')->first();
            
            if (!$setting) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak ada setting yang aktif',
                    'data' => [
                        'nama_instansi' => 'Faskesku',
                        'has_logo' => false,
                        'logo_url' => null,
                        'has_wallpaper' => false,
                        'wallpaper_url' => null
                    ]
                ], 404);
            }

            // Debug log untuk melihat nama_instansi yang sebenarnya
            Log::info('Active setting found', [
                'nama_instansi' => $setting->nama_instansi,
                'nama_instansi_length' => strlen($setting->nama_instansi),
                'nama_instansi_encoded' => rawurlencode($setting->nama_instansi),
                'has_wallpaper' => !is_null($setting->wallpaper),
                'wallpaper_size' => $setting->wallpaper ? strlen($setting->wallpaper) : 0
            ]);

            $data = [
                'nama_instansi' => $setting->nama_instansi,
                'alamat_instansi' => $setting->alamat_instansi,
                'kabupaten' => $setting->kabupaten,
                'propinsi' => $setting->propinsi,
                'kontak' => $setting->kontak,
                'email' => $setting->email,
                'aktifkan' => $setting->aktifkan,
                'kode_ppk' => $setting->kode_ppk,
                'kode_ppkinhealth' => $setting->kode_ppkinhealth,
                'kode_ppkkemenkes' => $setting->kode_ppkkemenkes,
                'has_logo' => !is_null($setting->logo),
                'has_wallpaper' => !is_null($setting->wallpaper)
            ];

            // Generate URLs for logo and wallpaper if they exist
            if ($setting->logo) {
                $data['logo_url'] = route('settings.image', ['setting' => rawurlencode($setting->nama_instansi), 'type' => 'logo']);
            }

            if ($setting->wallpaper) {
                $data['wallpaper_url'] = route('settings.image', ['setting' => rawurlencode($setting->nama_instansi), 'type' => 'wallpaper']);
            }

            return response()->json([
                'success' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            Log::error('Error in getActiveSetting', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage(),
                'data' => [
                    'nama_instansi' => 'Faskesku',
                    'has_logo' => false,
                    'logo_url' => null,
                    'has_wallpaper' => false,
                    'wallpaper_url' => null
                ]
            ], 500);
        }
    }

    private function transformSetting(Setting $setting): array
    {
        // Konversi data binary ke base64 untuk tampilan
        $result = [
            'nama_instansi' => $setting->nama_instansi,
            'alamat_instansi' => $setting->alamat_instansi,
            'kabupaten' => $setting->kabupaten,
            'propinsi' => $setting->propinsi,
            'kontak' => $setting->kontak,
            'email' => $setting->email,
            'aktifkan' => $setting->aktifkan,
            'kode_ppk' => $setting->kode_ppk,
            'kode_ppkinhealth' => $setting->kode_ppkinhealth,
            'kode_ppkkemenkes' => $setting->kode_ppkkemenkes,
            'has_logo' => !is_null($setting->logo),
            'has_wallpaper' => !is_null($setting->wallpaper),
        ];
        
        // Tambahkan data logo dan wallpaper dalam format base64
        if ($setting->logo) {
            $result['logo'] = base64_encode($setting->logo);
        }
        
        if ($setting->wallpaper) {
            $result['wallpaper'] = base64_encode($setting->wallpaper);
        }
        
        return $result;
    }
}
