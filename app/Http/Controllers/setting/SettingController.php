<?php

namespace App\Http\Controllers\setting;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class SettingController extends Controller
{
    /**
     * Resolve table name for settings with required columns. If an existing
     * `setting` table doesn't have expected columns, fallback to `settings`
     * and create it with the proper schema.
     */
    protected function resolveTable(): string
    {
        $hasSetting = Schema::hasTable('setting');
        $hasSettings = Schema::hasTable('settings');

        $hasRequired = function ($tbl) {
            return Schema::hasColumn($tbl, 'key') && Schema::hasColumn($tbl, 'value');
        };

        if ($hasSetting && $hasRequired('setting')) {
            return 'setting';
        }

        if ($hasSettings && $hasRequired('settings')) {
            return 'settings';
        }

        // If `setting` exists but without required columns, avoid altering it and
        // create `settings` with the required structure to be safely used.
        if (!$hasSettings) {
            Schema::create('settings', function (Blueprint $table) {
                $table->id();
                $table->string('key')->unique();
                $table->text('value')->nullable();
                $table->string('type')->default('string');
                $table->string('group')->default('app');
                $table->string('description')->nullable();
                $table->timestamps();
            });
        }

        return 'settings';
    }
    /**
     * Display the settings page with current records.
     */
    public function index()
    {
        $table = $this->resolveTable();

        $settings = DB::table($table)
            ->orderBy('group')
            ->orderBy('key')
            ->get();

        return Inertia::render('Setting/setting', [
            'settings' => $settings,
            'table' => $table,
        ]);
    }

    /**
     * Describe the structure of the settings table.
     */
    public function describe()
    {
        $table = $this->resolveTable();

        $columns = DB::select('SHOW COLUMNS FROM `'.$table.'`');
        return response()->json([
            'table' => $table,
            'columns' => $columns,
        ]);
    }

    /**
     * Store or update settings in bulk or single record.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'key' => 'required|string',
            'value' => 'nullable',
            'type' => 'nullable|string',
            'group' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $table = $this->resolveTable();

        $exists = DB::table($table)->where('key', $data['key'])->exists();
        $payload = array_merge($data, [
            'updated_at' => now(),
        ]);

        if ($exists) {
            DB::table($table)->where('key', $data['key'])->update($payload);
        } else {
            $payload['created_at'] = now();
            DB::table($table)->insert($payload);
        }

        return back()->with('success', 'Setting berhasil disimpan');
    }

    /**
     * Update a setting by id.
     */
    public function update($id, Request $request)
    {
        $data = $request->validate([
            'key' => 'required|string',
            'value' => 'nullable',
            'type' => 'nullable|string',
            'group' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $table = $this->resolveTable();
        DB::table($table)->where('id', $id)->update(array_merge($data, ['updated_at' => now()]));

        return back()->with('success', 'Setting berhasil diperbarui');
    }

    /**
     * Delete a setting by id.
     */
    public function destroy($id)
    {
        $table = $this->resolveTable();
        DB::table($table)->where('id', $id)->delete();
        return back()->with('success', 'Setting berhasil dihapus');
    }

    /**
     * =============== LEGACY TABLE CRUD: `setting` (aplikasi) ===============
     * Struktur sesuai gambar: nama_instansi (PK), alamat_instansi, kabupaten,
     * propinsi, kontak, email, aktifkan (enum Yes/No), kode_ppk, kode_ppkinkhealth,
     * kode_ppkkemenkes, wallpaper (longblob), logo (longblob)
     * -----------------------------------------------------------------------
     * Catatan: Tidak melakukan migrasi. Asumsikan tabel `setting` sudah ada
     * dengan struktur di atas. Endpoints berikut mengembalikan JSON agar mudah
     * diintegrasikan pada card “Setting Aplikasi” di halaman React.
     */

    public function appIndex()
    {
        if (!Schema::hasTable('setting')) {
            return response()->json(['message' => 'Tabel `setting` tidak ditemukan'], 404);
        }

        // Pilih kolom yang tersedia secara dinamis (hindari error 1054 Unknown column)
        $base = [
            'nama_instansi', 'alamat_instansi', 'kabupaten', 'propinsi',
            'kontak', 'email', 'aktifkan', 'kode_ppk',
        ];
        $optional = [
            'kode_ppkinkhealth', // beberapa schema menggunakan ini
            'kode_ppkinhealth',  // beberapa schema menggunakan ini (tanpa huruf 'k' setelah ppk)
            'kode_ppkkemenkes',
        ];

        $selectable = [];
        foreach (array_merge($base, $optional) as $col) {
            if (Schema::hasColumn('setting', $col)) {
                $selectable[] = $col;
            }
        }

        // Tambahkan deskripsi blob (ukuran) bila kolom tersedia
        if (Schema::hasColumn('setting', 'wallpaper')) {
            $selectable[] = DB::raw('LENGTH(`wallpaper`) as wallpaper_size');
        }
        if (Schema::hasColumn('setting', 'logo')) {
            $selectable[] = DB::raw('LENGTH(`logo`) as logo_size');
        }

        $records = DB::table('setting')->select($selectable)->get();

        return response()->json(['data' => $records]);
    }

    public function appStore(Request $request)
    {
        if (!Schema::hasTable('setting')) {
            return back()->with('error', 'Tabel `setting` tidak ditemukan');
        }

        $data = $request->validate([
            'nama_instansi' => 'required|string|max:60',
            'alamat_instansi' => 'nullable|string|max:150',
            'kabupaten' => 'nullable|string|max:30',
            'propinsi' => 'nullable|string|max:30',
            'kontak' => 'nullable|string|max:50',
            'email' => 'nullable|string|max:50',
            'aktifkan' => 'required|in:Yes,No',
            'kode_ppk' => 'nullable|string|max:15',
            'kode_ppkinkhealth' => 'nullable|string|max:15',
            'kode_ppkinhealth' => 'nullable|string|max:15',
            'kode_ppkkemenkes' => 'nullable|string|max:15',
            'wallpaper' => 'nullable|file|mimes:jpg,jpeg,png,webp,bmp',
            'logo' => 'nullable|file|mimes:jpg,jpeg,png,webp,bmp',
        ]);

        $payload = $data;
        // Handle blobs if provided
        if ($request->file('wallpaper')) {
            $payload['wallpaper'] = file_get_contents($request->file('wallpaper')->getRealPath());
        }
        if ($request->file('logo')) {
            $payload['logo'] = file_get_contents($request->file('logo')->getRealPath());
        }
        // Jika tidak ada file dikirim, pastikan tidak memasukkan kolom blob
        if (!$request->file('wallpaper')) {
            unset($payload['wallpaper']);
        }
        if (!$request->file('logo')) {
            unset($payload['logo']);
        }

        // Map kolom opsional sesuai ketersediaan di DB
        $payload = $this->mapLegacyPayload($payload);

        // Pastikan tidak duplikat primary key
        $exists = DB::table('setting')->where('nama_instansi', $data['nama_instansi'])->exists();
        if ($exists) {
            return back()->with('error', 'Nama instansi sudah ada');
        }

        DB::table('setting')->insert($payload);
        return back()->with('success', 'Setting aplikasi berhasil ditambahkan');
    }

    public function appUpdate($nama_instansi, Request $request)
    {
        if (!Schema::hasTable('setting')) {
            return back()->with('error', 'Tabel `setting` tidak ditemukan');
        }

        $data = $request->validate([
            'nama_instansi' => 'required|string|max:60',
            'alamat_instansi' => 'nullable|string|max:150',
            'kabupaten' => 'nullable|string|max:30',
            'propinsi' => 'nullable|string|max:30',
            'kontak' => 'nullable|string|max:50',
            'email' => 'nullable|string|max:50',
            'aktifkan' => 'required|in:Yes,No',
            'kode_ppk' => 'nullable|string|max:15',
            'kode_ppkinkhealth' => 'nullable|string|max:15',
            'kode_ppkinhealth' => 'nullable|string|max:15',
            'kode_ppkkemenkes' => 'nullable|string|max:15',
            'wallpaper' => 'nullable|file|mimes:jpg,jpeg,png,webp,bmp',
            'logo' => 'nullable|file|mimes:jpg,jpeg,png,webp,bmp',
        ]);

        $payload = $data;
        if ($request->file('wallpaper')) {
            $payload['wallpaper'] = file_get_contents($request->file('wallpaper')->getRealPath());
        } else {
            unset($payload['wallpaper']);
        }
        if ($request->file('logo')) {
            $payload['logo'] = file_get_contents($request->file('logo')->getRealPath());
        } else {
            unset($payload['logo']);
        }

        // Map kolom opsional sesuai ketersediaan di DB
        $payload = $this->mapLegacyPayload($payload);

        // Jika nama_instansi diubah, pastikan tidak bentrok
        if ($nama_instansi !== $data['nama_instansi']) {
            $pkExists = DB::table('setting')->where('nama_instansi', $data['nama_instansi'])->exists();
            if ($pkExists) {
                return back()->with('error', 'Nama instansi baru sudah digunakan');
            }
        }

        DB::table('setting')->where('nama_instansi', $nama_instansi)->update($payload);
        return back()->with('success', 'Setting aplikasi berhasil diperbarui');
    }

    public function appDestroy($nama_instansi)
    {
        if (!Schema::hasTable('setting')) {
            return back()->with('error', 'Tabel `setting` tidak ditemukan');
        }
        DB::table('setting')->where('nama_instansi', $nama_instansi)->delete();
        return back()->with('success', 'Setting aplikasi berhasil dihapus');
    }

    /**
     * Stream wallpaper image (longblob) untuk sebuah nama_instansi.
     */
    public function appWallpaper($nama_instansi)
    {
        if (!Schema::hasTable('setting') || !Schema::hasColumn('setting', 'wallpaper')) {
            return response('Not Found', 404);
        }

        $row = DB::table('setting')->where('nama_instansi', $nama_instansi)->select('wallpaper')->first();
        if (!$row || !$row->wallpaper) {
            return response('Not Found', 404);
        }

        $blob = $row->wallpaper;
        $mime = $this->detectImageMime($blob) ?? 'application/octet-stream';
        return response($blob, 200)
            ->header('Content-Type', $mime)
            ->header('Content-Disposition', 'inline; filename="wallpaper-'.$nama_instansi.'"')
            ->header('Cache-Control', 'private, max-age=0, no-cache');
    }

    /**
     * Stream logo image (longblob) untuk sebuah nama_instansi.
     */
    public function appLogo($nama_instansi)
    {
        if (!Schema::hasTable('setting') || !Schema::hasColumn('setting', 'logo')) {
            return response('Not Found', 404);
        }

        $row = DB::table('setting')->where('nama_instansi', $nama_instansi)->select('logo')->first();
        if (!$row || !$row->logo) {
            return response('Not Found', 404);
        }

        $blob = $row->logo;
        $mime = $this->detectImageMime($blob) ?? 'application/octet-stream';
        return response($blob, 200)
            ->header('Content-Type', $mime)
            ->header('Content-Disposition', 'inline; filename="logo-'.$nama_instansi.'"')
            ->header('Cache-Control', 'private, max-age=0, no-cache');
    }

    /**
     * Deteksi mime type image dari bytes awal blob.
     */
    protected function detectImageMime($blob): ?string
    {
        if (!is_string($blob)) {
            // In some DB drivers, blob may be resource; cast to string
            if (is_resource($blob)) {
                $blob = stream_get_contents($blob);
            } else {
                return null;
            }
        }

        $bytes = substr($blob, 0, 12);
        // PNG
        if (strncmp($bytes, "\x89PNG\r\n\x1A\n", 8) === 0) return 'image/png';
        // JPEG (SOI 0xFFD8)
        if (strlen($bytes) >= 2 && ord($bytes[0]) === 0xFF && ord($bytes[1]) === 0xD8) return 'image/jpeg';
        // GIF
        if (strncmp($bytes, 'GIF87a', 6) === 0 || strncmp($bytes, 'GIF89a', 6) === 0) return 'image/gif';
        // WebP (RIFF....WEBP)
        if (strncmp($bytes, 'RIFF', 4) === 0 && strncmp(substr($bytes, 8, 4), 'WEBP', 4) === 0) return 'image/webp';
        // BMP (BM)
        if (strncmp($bytes, 'BM', 2) === 0) return 'image/bmp';
        return null;
    }

    /**
     * Map payload untuk kolom opsional legacy agar sesuai dengan kolom yang ada di DB.
     * - Menangani perbedaan penamaan: kode_ppkinkhealth vs kode_ppkinhealth
     * - Menghapus kolom yang tidak tersedia agar tidak error saat insert/update
     */
    protected function mapLegacyPayload(array $payload): array
    {
        // Tangani perbedaan nama kolom InKHealth
        $hasInK = Schema::hasColumn('setting', 'kode_ppkinkhealth');
        $hasInH = Schema::hasColumn('setting', 'kode_ppkinhealth');

        if ($hasInK && isset($payload['kode_ppkinkhealth'])) {
            // OK, gunakan sebagaimana adanya
        } elseif ($hasInH && isset($payload['kode_ppkinkhealth'])) {
            // DB menggunakan kode_ppkinhealth, pindahkan nilai dari request
            $payload['kode_ppkinhealth'] = $payload['kode_ppkinkhealth'];
            unset($payload['kode_ppkinkhealth']);
        }

        // Jika request membawa kode_ppkinhealth namun kolom yang ada kode_ppkinkhealth
        if ($hasInK && isset($payload['kode_ppkinhealth']) && !Schema::hasColumn('setting', 'kode_ppkinhealth')) {
            $payload['kode_ppkinkhealth'] = $payload['kode_ppkinhealth'];
            unset($payload['kode_ppkinhealth']);
        }

        // Hapus semua kolom yang tidak tersedia di tabel
        foreach ($payload as $key => $val) {
            if (!Schema::hasColumn('setting', $key)) {
                unset($payload[$key]);
            }
        }

        return $payload;
    }
}