# Hak Akses User – Rancangan Pengelompokan Menu per Modul

## Tujuan
- Mengelompokkan menu berdasarkan modul (mis. `Farmasi`, `Keuangan`, `Pengaturan/Administrasi`, `Laboratorium`, `Rawat Jalan`, `Master Data`, `Laporan`, `PCare`, `SATUSEHAT`).
- Mempermudah pemberian hak akses per user dengan satu atau beberapa permission tingkat modul (group-level), plus granular permission per submenu.
- Menjaga konsistensi tampilan sidebar yang sudah dinamis via `menu_hierarchy`.

## Prinsip
- Tiap modul memiliki satu permission kunci “akses modul” untuk mengontrol visibilitas seluruh modul (root menu dan turunannya).
- Submenu dapat memiliki permission granular (mis. `farmasi.jenis-obat.index`) agar lebih spesifik.
- Filtering menu dilakukan di backend pada builder `menu_hierarchy`, sehingga frontend otomatis mengikuti.

## Dampak & Integrasi Kode
- Backend sudah membagikan `menu_hierarchy` ke React: `app/Http/Middleware/HandleInertiaRequests.php:76`.
- Filtering menu berdasarkan permission terjadi di: `app/Models/Menu.php:101–161`.
  - Ambil root aktif (`getMenuHierarchy`) lalu filter berdasarkan `permission_name` per item (`userCanAccessMenu`).
  - Anak-anak difilter rekursif (`filterChildrenByPermission`).

## Kelompok Modul & Permission Kunci
- `Farmasi` → `group.farmasi.access`
- `Keuangan` → `group.keuangan.access`
- `Pengaturan/Administrasi` → `group.pengaturan.access`
- `Laboratorium` → `group.laboratorium.access`
- `Rawat Jalan` → `group.rawatjalan.access`
- `Master Data` → `group.masterdata.access`
- `Laporan` → `group.laporan.access`
- `PCare` → `group.pcare.access`
- `SATUSEHAT` → `group.satusehat.access`

Catatan:
- Penamaan menggunakan namespace `group.<modul>.access` untuk konsistensi dan mudah dikenali.
- Jika ada modul baru, cukup tambahkan satu permission kunci.

## Perubahan yang Disarankan (Seeder)
1) Tambahkan permission kunci modul ke `PermissionSeeder.php`:
```php
// Tambahkan ke array $permissions
'group.farmasi.access',
'group.keuangan.access',
'group.pengaturan.access',
'group.laboratorium.access',
'group.rawatjalan.access',
'group.masterdata.access',
'group.laporan.access',
'group.pcare.access',
'group.satusehat.access',
```

2) Set `permission_name` pada root menu di `MenuSeeder.php` untuk mengikat ke permission kunci:
```php
// Contoh root Farmasi
$farmasi = Menu::create([
    'name' => 'Farmasi',
    'slug' => 'farmasi',
    'icon' => 'fas fa-pills',
    'route' => 'farmasi.index',
    'url' => route('farmasi.index'),
    'sort_order' => 7,
    'is_active' => true,
    'permission_name' => 'group.farmasi.access', // ← tambahkan
    'description' => 'Modul farmasi dan pengelolaan obat',
]);

// Contoh root Administrasi (Pengaturan)
$administration = Menu::create([
    'name' => 'Administrasi',
    'slug' => 'administrasi',
    'icon' => 'fas fa-cogs',
    'sort_order' => 6,
    'is_active' => true,
    'permission_name' => 'group.pengaturan.access', // ← tambahkan
    'description' => 'Pengaturan sistem dan administrasi',
]);

// Disarankan menambah root Keuangan & Laboratorium jika belum ada
$keuangan = Menu::create([
    'name' => 'Keuangan',
    'slug' => 'keuangan',
    'icon' => 'fas fa-money-bill-wave',
    'sort_order' => 10,
    'is_active' => true,
    'permission_name' => 'group.keuangan.access',
    'description' => 'Modul akuntansi & keuangan',
]);

$laboratorium = Menu::create([
    'name' => 'Laboratorium',
    'slug' => 'laboratorium',
    'icon' => 'fas fa-vial',
    'sort_order' => 11,
    'is_active' => true,
    'permission_name' => 'group.laboratorium.access',
    'description' => 'Modul layanan laboratorium',
]);
```

3) Submenu granular tetap bisa memakai permission spesifik yang sudah ada.
- Contoh: `Jenis Obat` memakai `farmasi.jenis-obat.index`.
- Root modul mengendalikan visibilitas utama; submenu permissions memberi kontrol detail.

## Penerapan di Routes (Opsional, Memperketat Server)
- Lindungi seluruh grup dengan middleware permission:
```php
Route::middleware(['auth', 'permission:group.farmasi.access'])
    ->prefix('farmasi')
    ->group(function () {
        // routes farmasi
    });

Route::middleware(['auth', 'permission:group.keuangan.access'])
    ->prefix('keuangan')
    ->group(function () {
        // routes keuangan
    });
```
- Tetap pertahankan middleware granular per submenu bila diperlukan.

## Penugasan ke Role
- Contoh assignment cepat:
  - `admin`: semua `group.*.access` + granular sesuai kebutuhan.
  - `dokter`: `group.rawatjalan.access`, `group.laboratorium.access` (jika butuh), granular tertentu.
  - `petugas`: `group.masterdata.access`, `group.rawatjalan.access`, granular tertentu.
  - `keuangan`: `group.keuangan.access` + granular keuangan.

Contoh di seeder role (sketsa):
```php
$adminRole->givePermissionTo([
    'group.farmasi.access',
    'group.keuangan.access',
    'group.pengaturan.access',
    'group.laboratorium.access',
    'group.rawatjalan.access',
    'group.masterdata.access',
    'group.laporan.access',
    'group.pcare.access',
    'group.satusehat.access',
    // + granular
]);
```

## Alur Kerja & Verifikasi
1) Tambahkan permission kunci ke `PermissionSeeder.php`.
2) Tambahkan `permission_name` di root menu `MenuSeeder.php` (dan root modul baru jika diperlukan).
3) Seed ulang di lingkungan pengembangan:
   - `php artisan db:seed --class=PermissionSeeder`
   - `php artisan db:seed --class=MenuSeeder`
4) Login sebagai user dengan role berbeda, pastikan:
   - Modul tanpa `group.*.access` tidak tampil di sidebar (dibuktikan via `menu_hierarchy`).
   - Submenu yang tidak berizin tidak tampil.
5) Jalankan build frontend untuk memastikan tidak ada referensi menu yang hilang: `npm run build`.

## Catatan Implementasi Aman
- Di produksi, hindari `truncate()` penuh saat memperbarui menu; gunakan migrasi/seed incremental agar tidak menghapus struktur yang sudah dimodifikasi.
- Simpan mapping `group.*.access` di dokumentasi role agar onboarding mudah.
- Gunakan penamaan konsisten untuk slug dan permission agar mudah ditelusuri.

## Manfaat
- Satu permission kunci dapat menyembunyikan/menampilkan seluruh modul.
- Pengelolaan role lebih cepat dan konsisten.
- Frontend otomatis mengikuti perubahan karena filtering dilakukan di backend (`Menu::getMenuHierarchy`).
