# Pembuatan Menu Baru – Panduan Lengkap

Dokumen ini menjelaskan langkah-langkah membuat menu baru di aplikasi Faskesku_id (Laravel + Inertia React), agar halaman baru muncul di sidebar dan menggunakan layout aplikasi yang sama.

## Ringkasan Arsitektur Menu
- Backend: Laravel, Spatie Permission.
- Frontend: Inertia.js (React), Ziggy (`route()` helper), Tailwind.
- Sumber data sidebar: Tabel `menus` (model `App\Models\Menu`) melalui helper `Menu::getMenuHierarchy($userId)`.
- Layout umum: `resources/js/Layouts/AppLayout.jsx`. Halaman React melekatkan layout dengan `Page.layout`.

### Kolom penting di tabel `menus`
`name`, `slug`, `icon`, `route`, `url`, `parent_id`, `sort_order`, `is_active`, `permission_name`, `description`.

Sidebar akan membangun URL dengan urutan:
1) `menu.url` (jika ada) → digunakan langsung;
2) `menu.route` (jika ada) → diubah ke URL relatif dengan Ziggy;
3) fallback `#`.

Catatan: Saat ini ada perlakuan khusus untuk root menu “Farmasi” dan “PCare” di `resources/js/Components/SidebarMenu.jsx` agar langsung menuju ke halaman index masing-masing. Untuk menu standar, cukup isi `url` atau `route`.

---

## Langkah 1 – Buat Route Laravel
Definisikan rute di `routes/web.php` (di dalam middleware auth). Contoh untuk modul baru “Antrian”:

```php
// routes/web.php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('antrian')->name('antrian.')->group(function () {
        // Halaman utama (index)
        Route::get('/', function () {
            return Inertia::render('Antrian/Index');
        })->name('index');

        // Rute tambahan (opsional)
        // Route::get('/riwayat', [AntrianController::class, 'riwayat'])->name('riwayat');
    });
});
```

Tips:
- Gunakan prefix sesuai modul (mis. `antrian`).
- Beri nama rute `*.index` untuk halaman utama modul.
- Jalankan `php artisan route:list` untuk memastikan rute aktif.

---

## Langkah 2 – Buat Halaman React dan Pasang Layout
Buat komponen React di `resources/js/Pages/<Modul>/<NamaHalaman>.jsx`, lalu tempelkan `AppLayout`:

```jsx
// resources/js/Pages/Antrian/Index.jsx
import React from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function AntrianIndex() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Manajemen Antrian</h1>
      <p className="text-gray-600">Halaman ini berada di dalam AppLayout.</p>
    </div>
  );
}

// Pastikan halaman memakai layout global (sidebar + header)
AntrianIndex.layout = (page) => <AppLayout title="Antrian" children={page} />;
```

Jika Anda menambah lebih dari satu halaman, terapkan pola yang sama di tiap halaman.

---

## Langkah 3 – Tambah Permission (Opsional tetapi Direkomendasikan)
Permission digunakan untuk menyembunyikan/menampilkan menu sesuai role user.

Tambahkan nama permission di `database/seeders/PermissionSeeder.php`:
```php
// Contoh tambahan di array $permissions
'antrian.index',
```
Jalankan seeder permission:
```bash
php artisan db:seed --class=PermissionSeeder
```
Atau pastikan role terkait (mis. `admin`) sudah diberi seluruh permission.

---

## Langkah 4 – Tambah Menu (via UI atau Seeder)
Anda bisa menambah menu melalui halaman "Manajemen Menu" atau lewat seeder.

### Opsi A – Lewat UI (Manajemen Menu)
1. Buka menu: Navigasi → Administrasi → Manajemen Menu (`menus.index`).
2. Klik "Buat Menu".
3. Isi field utama:
   - `name`: nama menu, mis. "Antrian".
   - `slug`: unik, mis. `antrian` (boleh kosong, akan dibuat otomatis saat update di controller).
   - `icon`: kelas Font Awesome atau Heroicons, mis. `fas fa-list`.
   - `route`: mis. `antrian.index` (pakai jika ingin menggunakan Ziggy).
   - `url`: opsional. Jika diisi, sidebar akan memakai URL ini lebih dulu. Untuk rute internal, disarankan isi dengan hasil `route('antrian.index')` dari backend (lihat Opsi B – seeder).
   - `parent_id`: pilih jika ini submenu di bawah menu induk.
   - `sort_order`: urutan tampil (angka kecil tampil di atas).
   - `is_active`: centang agar menu tampil.
   - `permission_name`: opsional, mis. `antrian.index`.
   - `description`: deskripsi singkat.
4. Simpan.

### Opsi B – Lewat Seeder
Contoh seeder untuk membuat root menu baru:
```php
// database/seeders/MenuSeeder.php (atau seeder terpisah)
Menu::firstOrCreate(
    ['route' => 'antrian.index'],
    [
        'name' => 'Antrian',
        'slug' => 'antrian',
        'icon' => 'fas fa-list',
        'route' => 'antrian.index',
        'url' => route('antrian.index'), // disarankan isi agar sidebar punya URL langsung
        'sort_order' => 9,
        'is_active' => true,
        'permission_name' => 'antrian.index',
        'description' => 'Modul manajemen antrian',
    ]
);
```
Jalankan seeder:
```bash
php artisan db:seed --class=MenuSeeder
```

> Catatan: Untuk membuat menu induk yang hanya berisi submenu (tidak langsung navigasi), biarkan `route` dan `url` kosong pada parent, lalu buat item anak dengan `parent_id` mengarah ke parent.

---

## Langkah 5 – Pastikan Ziggy dan Frontend Siap
- Jika Anda menggunakan nama rute di frontend (`route('...')`), pastikan Ziggy memuat rute yang baru:
  ```bash
  php artisan ziggy:generate resources/js/ziggy.js
  ```
  Jika paket Ziggy belum tersedia, Anda bisa gunakan `menu.url` dengan path relatif, mis. `/antrian`.
- Jalankan server:
  ```bash
  php artisan serve --port=8010
  npm run dev
  ```

---

## Verifikasi
1. Buka aplikasi dan login.
2. Pastikan menu baru tampil di sidebar sesuai `sort_order` dan `parent_id`.
3. Klik menu baru → harus membuka halaman React di dalam `AppLayout`.
4. Jika 404, cek ulang rute dan permission.

---

## Troubleshooting
- Menu tidak muncul:
  - Periksa `menus.is_active` harus `true`.
  - Jika `permission_name` diisi, pastikan role user memiliki permission tersebut.
  - Cek `Menu::getMenuHierarchy($userId)` memang mengembalikan data (lihat endpoint/komponen terkait).

- Klik menu tidak navigasi/URL `#`:
  - Pastikan Anda mengisi salah satu: `url` atau `route`.
  - Jika `route` dipakai namun Ziggy belum memuat, jalankan generate Ziggy atau gunakan `url` dengan path relatif.

- 404 Not Found:
  - Jalankan `php artisan route:list` untuk cek nama rute dan path.
  - Pastikan rute ada di dalam blok middleware auth.
  - Pastikan komponen React sesuai path Inertia, mis. `Inertia::render('Antrian/Index')` dan file ada di `resources/js/Pages/Antrian/Index.jsx`.

- Konflik/Cache:
  - `php artisan route:clear && php artisan config:clear && php artisan view:clear`.

---

## Praktik Terbaik
- Konsisten penamaan: gunakan `prefix` dan nama rute `modul.index`.
- Isi `url` dengan `route('modul.index')` dari backend agar Sidebar memiliki URL eksplisit.
- Gunakan `permission_name` untuk kontrol akses.
- Tetapkan `sort_order` agar urutan sidebar rapi.
- Untuk parent-only menu (collapse), kosongkan `route`/`url` pada parent, isi pada child.
- Selalu tempelkan `AppLayout` pada halaman baru dengan `Page.layout`.

---

## Contoh Lengkap – Modul "Bridging PCare" (yang sudah ada)
- Route:
```php
Route::prefix('pcare')->name('pcare.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Pcare/Menu');
    })->name('index');
});
```
- Halaman React:
```jsx
// resources/js/Pages/Pcare/Menu.jsx
import AppLayout from '@/Layouts/AppLayout';
// ... komponen kartu & tab ...
PcareMenu.layout = (page) => <AppLayout title="Bridging Pcare" children={page} />;
```
- Menu (Seeder):
```php
Menu::firstOrCreate([
    'route' => 'pcare.index'
], [
    'name' => 'Briding Pcare',
    'slug' => 'pcare',
    'icon' => 'fas fa-link',
    'route' => 'pcare.index',
    'url' => route('pcare.index'),
    'sort_order' => 8,
    'is_active' => true,
    'permission_name' => 'pcare.index',
    'description' => 'Bridging ke layanan PCare BPJS',
]);
```

---

## Checklist Cepat
- [ ] Rute `modul.index` dibuat di `routes/web.php`.
- [ ] Halaman React dibuat dan ditempelkan `AppLayout`.
- [ ] Permission (opsional) ditambahkan dan diberikan ke role.
- [ ] Record menu ditambahkan (via UI/seeder) dengan `url` atau `route`.
- [ ] Ziggy digenerate jika memakai `route()` di frontend.
- [ ] Server Laravel dan Vite berjalan, halaman dapat diakses dari sidebar.

Selesai. Dengan panduan ini, Anda bisa menambahkan menu baru secara konsisten dan aman untuk pengembangan lanjutan.

++

php artisan config:clear && php artisan route:clear && php artisan cache:clear 