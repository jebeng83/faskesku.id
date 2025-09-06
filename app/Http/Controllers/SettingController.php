<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class SettingController extends Controller
{
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
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
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
        $setting = Setting::findOrFail($setting);
        
        if ($type === 'logo' && $setting->logo) {
            if (strpos($setting->logo, 'setting/') === 0) {
                // Return file from storage (legacy path-based storage)
                return response()->file(public_path($setting->logo));
            } else {
                // Handle binary data directly from database
                return response($setting->logo)
                    ->header('Content-Type', 'image/png')
                    ->header('Content-Disposition', 'inline; filename="logo.png"');
            }
        }
        
        if ($type === 'wallpaper' && $setting->wallpaper) {
            if (strpos($setting->wallpaper, 'img/') === 0) {
                // Return file from storage (legacy path-based storage)
                return response()->file(public_path($setting->wallpaper));
            } else {
                // Handle binary data directly from database
                return response($setting->wallpaper)
                    ->header('Content-Type', 'image/png')
                    ->header('Content-Disposition', 'inline; filename="wallpaper.png"');
            }
        }
        
        return response()->json(['error' => 'Image not found'], 404);
    }

    /**
     * Get active setting for AppLayout
     */
    public function getActiveSetting()
    {
        try {
            $setting = Setting::getActiveSetting();
            
            if (!$setting) {
                // Return default values if no active setting found
                return response()->json([
                    'success' => true,
                    'data' => [
                        'nama_instansi' => 'Faskesku',
                        'has_logo' => false,
                        'logo_url' => null
                    ]
                ]);
            }
            
            return response()->json([
                'success' => true,
                'data' => [
                    'nama_instansi' => $setting->nama_instansi,
                    'has_logo' => $setting->has_logo,
                    'logo_url' => $setting->has_logo ? route('settings.image', ['setting' => $setting->nama_instansi, 'type' => 'logo']) : null
                ]
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage(),
                'data' => [
                    'nama_instansi' => 'Faskesku',
                    'has_logo' => false,
                    'logo_url' => null
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
