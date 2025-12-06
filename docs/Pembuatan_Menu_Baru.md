# Pembuatan Menu Baru – Panduan Lengkap

Dokumen ini menjelaskan langkah-langkah membuat menu baru di aplikasi Faskesku_id (Laravel + Inertia React), agar halaman baru muncul di sidebar dan menggunakan layout aplikasi yang sama.

## Ringkasan Arsitektur Menu
- Backend: Laravel, Spatie Permission.
- Frontend: Inertia.js (React), Ziggy (`route()` helper), Tailwind.
- Sumber data sidebar: Tabel `menus` (model `App\Models\Menu`) melalui helper `Menu::getMenuHierarchy($userId)`.
- Layout umum: `resources/js/Layouts/AppLayout.jsx` atau `resources/js/Layouts/SidebarPengaturan.jsx` untuk halaman pengaturan.
- Halaman React melekatkan layout dengan wrapper component atau `Page.layout`.

### Kolom penting di tabel `menus`
`name`, `slug`, `icon`, `route`, `url`, `parent_id`, `sort_order`, `is_active`, `permission_name`, `description`.

Sidebar akan membangun URL dengan urutan:
1) `menu.url` (jika ada) → digunakan langsung;
2) `menu.route` (jika ada) → diubah ke URL relatif dengan Ziggy;
3) fallback `#`.

Catatan: Saat ini ada perlakuan khusus untuk root menu "Farmasi" dan "PCare" di `resources/js/Components/SidebarMenu.jsx` agar langsung menuju ke halaman index masing-masing. Untuk menu standar, cukup isi `url` atau `route`.

---

## Langkah 1 – Buat Route Laravel
Definisikan rute di `routes/web.php` (di dalam middleware auth). Contoh untuk modul baru "Antrian":

### Opsi A: Route Resource (untuk CRUD lengkap)
```php
// routes/web.php
Route::middleware(['auth', 'verified'])->group(function () {
    // Route resource untuk CRUD lengkap
    Route::resource('antrian', AntrianController::class);
});
```

Route resource akan otomatis membuat route:
- `GET /antrian` → `antrian.index`
- `GET /antrian/create` → `antrian.create`
- `POST /antrian` → `antrian.store`
- `GET /antrian/{id}` → `antrian.show`
- `GET /antrian/{id}/edit` → `antrian.edit`
- `PUT/PATCH /antrian/{id}` → `antrian.update`
- `DELETE /antrian/{id}` → `antrian.destroy`

### Opsi B: Explicit Routes (untuk primary key string atau kontrol lebih detail)
```php
// routes/web.php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('antrian')->name('antrian.')->group(function () {
        Route::get('/', [AntrianController::class, 'index'])->name('index');
        Route::get('/create', [AntrianController::class, 'create'])->name('create');
        Route::post('/', [AntrianController::class, 'store'])->name('store');
        Route::get('/{id}', [AntrianController::class, 'show'])->name('show');
        Route::get('/{id}/edit', [AntrianController::class, 'edit'])->name('edit');
        Route::put('/{id}', [AntrianController::class, 'update'])->name('update');
        Route::patch('/{id}', [AntrianController::class, 'update'])->name('update');
        Route::delete('/{id}', [AntrianController::class, 'destroy'])->name('destroy');
    });
});
```

**Tips:**
- Gunakan prefix sesuai modul (mis. `antrian`).
- Beri nama rute `*.index` untuk halaman utama modul.
- Untuk primary key string (bukan integer), gunakan explicit routes.
- Jalankan `php artisan route:list --name=antrian` untuk memastikan rute aktif.
- Tambahkan import statement untuk Controller di bagian atas `routes/web.php`:
  ```php
  use App\Http\Controllers\AntrianController;
  ```

---

## Langkah 2 – Buat Model dan Controller
### Buat Model
```bash
php artisan make:model Antrian --no-interaction
```

### Buat Controller
```bash
php artisan make:controller AntrianController --no-interaction
```

### Implementasi Controller
```php
// app/Http/Controllers/AntrianController.php
namespace App\Http\Controllers;

use App\Models\Antrian;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AntrianController extends Controller
{
    public function index(Request $request)
    {
        $antrian = Antrian::query()
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Antrian/Index', [
            'antrian' => $antrian,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Antrian/Index', [
            'mode' => 'create',
        ]);
    }

    // ... method lainnya (store, show, edit, update, destroy)
}
```

---

## Langkah 3 – Buat Halaman React dan Pasang Layout
Buat komponen React di `resources/js/Pages/<Modul>/<NamaHalaman>.jsx`.

### Untuk Halaman Umum (menggunakan AppLayout)
```jsx
// resources/js/Pages/Antrian/Index.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function AntrianIndex({ antrian, filters }) {
  return (
    <AppLayout>
      <Head title="Manajemen Antrian" />
      <div className="p-4">
        <h1 className="text-xl font-semibold">Manajemen Antrian</h1>
        <p className="text-gray-600">Halaman ini berada di dalam AppLayout.</p>
      </div>
    </AppLayout>
  );
}
```

### Untuk Halaman Pengaturan (menggunakan SidebarPengaturan)
```jsx
// resources/js/Pages/Antrian/Index.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import SidebarPengaturan from '@/Layouts/SidebarPengaturan';

export default function AntrianIndex({ antrian, filters }) {
  return (
    <SidebarPengaturan title="Pengaturan">
      <Head title="Manajemen Antrian" />
      <div className="p-4">
        <h1 className="text-xl font-semibold">Manajemen Antrian</h1>
        <p className="text-gray-600">Halaman ini berada di dalam SidebarPengaturan.</p>
      </div>
    </SidebarPengaturan>
  );
}
```

**Catatan:**
- Gunakan `AppLayout` untuk halaman umum aplikasi.
- Gunakan `SidebarPengaturan` untuk halaman pengaturan/administrasi.
- Jika Anda menambah lebih dari satu halaman, terapkan pola yang sama di tiap halaman.

---

## Langkah 4 – Tambah Permission di PermissionSeeder
Permission digunakan untuk menyembunyikan/menampilkan menu sesuai role user dan kontrol akses.

### Tambahkan Permission di PermissionSeeder.php
```php
// database/seeders/PermissionSeeder.php
public function run(): void
{
    $permissions = [
        // ... permission yang sudah ada ...

        // Antrian permissions
        'view-antrian',
        'create-antrian',
        'edit-antrian',
        'delete-antrian',
        'antrian.index',
        'antrian.view',
        'antrian.create',
        'antrian.edit',
        'antrian.delete',
    ];

    foreach ($permissions as $permission) {
        Permission::findOrCreate($permission);
    }

    // Create roles and assign permissions
    $adminRole = Role::findOrCreate('admin');
    $adminRole->givePermissionTo(Permission::all()); // Admin mendapat semua permission
}
```

**Penjelasan Permission:**
- `view-antrian`, `create-antrian`, `edit-antrian`, `delete-antrian`: Permission umum untuk CRUD
- `antrian.index`, `antrian.view`, `antrian.create`, `antrian.edit`, `antrian.delete`: Permission spesifik untuk route (digunakan di `permission_name` menu)

**Jalankan seeder:**
```bash
php artisan db:seed --class=PermissionSeeder
```

---

## Langkah 5 – Tambah Menu di MenuSeeder
Menu dapat ditambahkan melalui UI (Manajemen Menu) atau melalui seeder. **Direkomendasikan menggunakan seeder** untuk konsistensi dan version control.

### Opsi A – Lewat UI (Manajemen Menu)
1. Buka menu: Navigasi → Administrasi → Manajemen Menu (`menus.index`).
2. Klik "Buat Menu".
3. Isi field utama:
   - `name`: nama menu, mis. "Antrian".
   - `slug`: unik, mis. `antrian` (boleh kosong, akan dibuat otomatis saat update di controller).
   - `icon`: kelas Font Awesome, mis. `fas fa-list`.
   - `route`: mis. `antrian.index` (pakai jika ingin menggunakan Ziggy).
   - `url`: opsional. Jika diisi, sidebar akan memakai URL ini lebih dulu. Untuk rute internal, disarankan isi dengan hasil `route('antrian.index')` dari backend.
   - `parent_id`: pilih jika ini submenu di bawah menu induk.
   - `sort_order`: urutan tampil (angka kecil tampil di atas).
   - `is_active`: centang agar menu tampil.
   - `permission_name`: opsional, mis. `antrian.index`.
   - `description`: deskripsi singkat.
4. Simpan.

### Opsi B – Lewat Seeder (Direkomendasikan)

#### Contoh 1: Root Menu (Menu Utama)
```php
// database/seeders/MenuSeeder.php
public function run(): void
{
    // ... menu yang sudah ada ...

    // Root menu baru
    Menu::create([
        'name' => 'Antrian',
        'slug' => 'antrian',
        'icon' => 'fas fa-list',
        'route' => 'antrian.index',
        'url' => route('antrian.index'),
        'sort_order' => 9,
        'is_active' => true,
        'permission_name' => 'antrian.index',
        'description' => 'Modul manajemen antrian',
    ]);
}
```

#### Contoh 2: Parent Menu dengan Submenu
```php
// database/seeders/MenuSeeder.php
public function run(): void
{
    // ... menu yang sudah ada ...

    // Parent menu (tidak punya route/url langsung)
    $kepegawaian = Menu::create([
        'name' => 'Kepegawaian',
        'slug' => 'kepegawaian',
        'icon' => 'fas fa-user-tie',
        'parent_id' => $administration->id, // Di bawah menu Administrasi
        'sort_order' => 4,
        'is_active' => true,
        'description' => 'Pengelolaan data kepegawaian',
    ]);

    // Submenu 1: Pegawai
    Menu::create([
        'name' => 'Pegawai',
        'slug' => 'pegawai',
        'icon' => 'fas fa-users',
        'route' => 'employees.index',
        'url' => route('employees.index'),
        'parent_id' => $kepegawaian->id,
        'sort_order' => 1,
        'is_active' => true,
        'permission_name' => 'employees.index',
        'description' => 'Pengelolaan data pegawai',
    ]);

    // Submenu 2: SIP Pegawai
    Menu::create([
        'name' => 'SIP Pegawai',
        'slug' => 'sip-pegawai',
        'icon' => 'fas fa-file-medical',
        'route' => 'sip-pegawai.index',
        'url' => route('sip-pegawai.index'),
        'parent_id' => $kepegawaian->id,
        'sort_order' => 2,
        'is_active' => true,
        'permission_name' => 'sip-pegawai.index',
        'description' => 'Pengelolaan Surat Izin Praktik (SIP) pegawai',
    ]);
}
```

**Jalankan seeder:**
```bash
php artisan db:seed --class=MenuSeeder
```

**Catatan:**
- Untuk membuat menu induk yang hanya berisi submenu (tidak langsung navigasi), biarkan `route` dan `url` kosong pada parent, lalu buat item anak dengan `parent_id` mengarah ke parent.
- Gunakan `Menu::create()` untuk membuat menu baru (akan error jika sudah ada).
- Gunakan `Menu::firstOrCreate()` untuk membuat menu jika belum ada (aman untuk dijalankan berulang kali).

---

## Langkah 6 – Generate Ziggy Routes
Jika Anda menggunakan nama rute di frontend (`route('...')`), pastikan Ziggy memuat rute yang baru:

```bash
php artisan ziggy:generate resources/js/ziggy.js
```

**Catatan:**
- Ziggy akan otomatis di-generate jika menggunakan Wayfinder plugin.
- Jika paket Ziggy belum tersedia, Anda bisa gunakan `menu.url` dengan path relatif, mis. `/antrian`.

---

## Langkah 7 – Clear Cache dan Restart Server
Setelah membuat perubahan route, sebaiknya clear cache:

```bash
php artisan route:clear
php artisan config:clear
php artisan cache:clear
```

Jalankan server:
```bash
php artisan serve --port=8010
npm run dev
```

---

## Verifikasi
1. **Cek Route Terdaftar:**
   ```bash
   php artisan route:list --name=antrian
   ```

2. **Cek Permission Terdaftar:**
   ```bash
   php artisan tinker
   >>> Permission::where('name', 'like', 'antrian%')->get();
   ```

3. **Cek Menu Terdaftar:**
   ```bash
   php artisan tinker
   >>> Menu::where('slug', 'antrian')->first();
   ```

4. **Buka aplikasi dan login:**
   - Pastikan menu baru tampil di sidebar sesuai `sort_order` dan `parent_id`.
   - Klik menu baru → harus membuka halaman React di dalam layout yang sesuai.
   - Jika 404, cek ulang rute dan permission.

---

## Troubleshooting

### Menu tidak muncul:
- Periksa `menus.is_active` harus `true`.
- Jika `permission_name` diisi, pastikan role user memiliki permission tersebut.
- Cek `Menu::getMenuHierarchy($userId)` memang mengembalikan data (lihat endpoint/komponen terkait).
- Pastikan seeder sudah dijalankan: `php artisan db:seed --class=MenuSeeder`

### Klik menu tidak navigasi/URL `#`:
- Pastikan Anda mengisi salah satu: `url` atau `route`.
- Jika `route` dipakai namun Ziggy belum memuat, jalankan generate Ziggy atau gunakan `url` dengan path relatif.
- Pastikan route sudah terdaftar: `php artisan route:list --name=antrian`

### 404 Not Found:
- Jalankan `php artisan route:list` untuk cek nama rute dan path.
- Pastikan rute ada di dalam blok middleware auth.
- Pastikan komponen React sesuai path Inertia, mis. `Inertia::render('Antrian/Index')` dan file ada di `resources/js/Pages/Antrian/Index.jsx`.
- Clear cache route: `php artisan route:clear`

### Permission tidak bekerja:
- Pastikan permission sudah dibuat di PermissionSeeder.
- Pastikan seeder sudah dijalankan: `php artisan db:seed --class=PermissionSeeder`
- Pastikan role user memiliki permission tersebut.
- Cek di tinker: `Permission::where('name', 'antrian.index')->first()`

### Konflik/Cache:
```bash
php artisan route:clear
php artisan config:clear
php artisan view:clear
php artisan cache:clear
```

---

## Praktik Terbaik

### Penamaan Konsisten
- Gunakan `prefix` dan nama rute `modul.index`.
- Gunakan format yang sama untuk permission: `modul.index`, `modul.create`, dll.
- Gunakan format yang sama untuk slug: `modul-nama` (kebab-case).

### Route dan URL
- Isi `url` dengan `route('modul.index')` dari backend agar Sidebar memiliki URL eksplisit.
- Gunakan `route` untuk konsistensi dengan Ziggy.
- Untuk primary key string, gunakan explicit routes bukan resource routes.

### Permission
- Gunakan `permission_name` untuk kontrol akses.
- Buat permission di PermissionSeeder, bukan langsung di database.
- Berikan permission ke role admin secara otomatis: `$adminRole->givePermissionTo(Permission::all())`

### Menu Structure
- Tetapkan `sort_order` agar urutan sidebar rapi.
- Untuk parent-only menu (collapse), kosongkan `route`/`url` pada parent, isi pada child.
- Gunakan icon Font Awesome yang konsisten dengan menu lain.

### Layout
- Gunakan `AppLayout` untuk halaman umum aplikasi.
- Gunakan `SidebarPengaturan` untuk halaman pengaturan/administrasi.
- Selalu tempelkan layout pada halaman baru.

### Seeder
- **Selalu gunakan seeder** untuk menu dan permission, bukan langsung di database.
- Gunakan `Menu::create()` untuk menu baru di seeder.
- Gunakan `Menu::firstOrCreate()` jika seeder bisa dijalankan berulang kali.

---

## Contoh Lengkap – Modul "SIP Pegawai"

### 1. Route (routes/web.php)
```php
use App\Http\Controllers\SipPegawaiController;

Route::middleware(['auth', 'verified'])->group(function () {
    // SIP Pegawai routes (explicit routes karena primary key string)
    Route::prefix('sip-pegawai')->name('sip-pegawai.')->group(function () {
        Route::get('/', [SipPegawaiController::class, 'index'])->name('index');
        Route::get('/create', [SipPegawaiController::class, 'create'])->name('create');
        Route::post('/', [SipPegawaiController::class, 'store'])->name('store');
        Route::get('/{nik}', [SipPegawaiController::class, 'show'])->name('show');
        Route::get('/{nik}/edit', [SipPegawaiController::class, 'edit'])->name('edit');
        Route::put('/{nik}', [SipPegawaiController::class, 'update'])->name('update');
        Route::patch('/{nik}', [SipPegawaiController::class, 'update'])->name('update');
        Route::delete('/{nik}', [SipPegawaiController::class, 'destroy'])->name('destroy');
    });
});
```

### 2. Model (app/Models/SipPegawai.php)
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SipPegawai extends Model
{
    protected $table = 'sip_pegawai';
    public $timestamps = false;
    protected $primaryKey = 'nik';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'nik',
        'jnj_jabatan',
        'no_sip',
        'masa_berlaku',
        'status',
    ];

    protected $casts = [
        'masa_berlaku' => 'date',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'nik', 'nik');
    }
}
```

### 3. Controller (app/Http/Controllers/SipPegawaiController.php)
```php
namespace App\Http\Controllers;

use App\Models\SipPegawai;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SipPegawaiController extends Controller
{
    public function index(Request $request)
    {
        $query = SipPegawai::with('employee');

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('no_sip', 'like', "%{$search}%")
                    ->orWhere('nik', 'like', "%{$search}%")
                    ->orWhereHas('employee', function ($empQuery) use ($search) {
                        $empQuery->where('nama', 'like', "%{$search}%");
                    });
            });
        }

        $sipPegawai = $query->orderBy('masa_berlaku', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Employees/sip_pegawai', [
            'sipPegawai' => $sipPegawai,
            'filters' => $request->only(['search']),
        ]);
    }

    // ... method lainnya
}
```

### 4. Halaman React (resources/js/Pages/Employees/sip_pegawai.jsx)
```jsx
import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import SidebarPengaturan from "@/Layouts/SidebarPengaturan";

export default function SipPegawai({ sipPegawai, filters }) {
    return (
        <SidebarPengaturan title="Kepegawaian">
            <Head title="SIP Pegawai" />
            {/* ... konten halaman ... */}
        </SidebarPengaturan>
    );
}
```

### 5. Permission (database/seeders/PermissionSeeder.php)
```php
public function run(): void
{
    $permissions = [
        // ... permission yang sudah ada ...

        // SIP Pegawai permissions
        'view-sip-pegawai',
        'create-sip-pegawai',
        'edit-sip-pegawai',
        'delete-sip-pegawai',
        'sip-pegawai.index',
        'sip-pegawai.view',
        'sip-pegawai.create',
        'sip-pegawai.edit',
        'sip-pegawai.delete',
    ];

    foreach ($permissions as $permission) {
        Permission::findOrCreate($permission);
    }

    $adminRole = Role::findOrCreate('admin');
    $adminRole->givePermissionTo(Permission::all());
}
```

### 6. Menu (database/seeders/MenuSeeder.php)
```php
public function run(): void
{
    // ... menu yang sudah ada ...

    // Kepegawaian menu (parent)
    $kepegawaian = Menu::create([
        'name' => 'Kepegawaian',
        'slug' => 'kepegawaian',
        'icon' => 'fas fa-user-tie',
        'parent_id' => $administration->id,
        'sort_order' => 4,
        'is_active' => true,
        'description' => 'Pengelolaan data kepegawaian',
    ]);

    // SIP Pegawai submenu
    Menu::create([
        'name' => 'SIP Pegawai',
        'slug' => 'sip-pegawai',
        'icon' => 'fas fa-file-medical',
        'route' => 'sip-pegawai.index',
        'url' => route('sip-pegawai.index'),
        'parent_id' => $kepegawaian->id,
        'sort_order' => 2,
        'is_active' => true,
        'permission_name' => 'sip-pegawai.index',
        'description' => 'Pengelolaan Surat Izin Praktik (SIP) pegawai',
    ]);
}
```

### 7. Migration (opsional, untuk pengembangan lanjutan)
```bash
php artisan make:migration create_sip_pegawai_table
```

```php
// database/migrations/xxxx_create_sip_pegawai_table.php
public function up(): void
{
    if (!Schema::hasTable('pegawai')) {
        throw new \Exception('Tabel pegawai harus ada sebelum membuat tabel sip_pegawai');
    }

    if (!Schema::hasTable('sip_pegawai')) {
        Schema::create('sip_pegawai', function (Blueprint $table) {
            $table->string('nik', 20)->primary();
            $table->string('jnj_jabatan', 10);
            $table->string('no_sip', 100);
            $table->date('masa_berlaku');
            $table->enum('status', ['0', '1']);

            $table->foreign('nik')
                ->references('nik')
                ->on('pegawai')
                ->onDelete('restrict')
                ->onUpdate('cascade');

            $table->index('masa_berlaku');
            $table->index('status');
        });
    }
}
```

---

## Checklist Lengkap Pembuatan Menu Baru

### Backend
- [ ] Route dibuat di `routes/web.php` (resource atau explicit routes)
- [ ] Import Controller ditambahkan di `routes/web.php`
- [ ] Model dibuat (jika diperlukan)
- [ ] Controller dibuat dengan method lengkap (index, create, store, show, edit, update, destroy)
- [ ] Permission ditambahkan di `PermissionSeeder.php`
- [ ] Permission seeder dijalankan: `php artisan db:seed --class=PermissionSeeder`
- [ ] Menu ditambahkan di `MenuSeeder.php` (parent dan/atau submenu)
- [ ] Menu seeder dijalankan: `php artisan db:seed --class=MenuSeeder`
- [ ] Route terdaftar: `php artisan route:list --name=modul`
- [ ] Ziggy route di-generate: `php artisan ziggy:generate resources/js/ziggy.js`
- [ ] Cache cleared: `php artisan route:clear && php artisan config:clear`

### Frontend
- [ ] Halaman React dibuat di `resources/js/Pages/<Modul>/<NamaHalaman>.jsx`
- [ ] Layout dipasang (`AppLayout` atau `SidebarPengaturan`)
- [ ] Route helper digunakan dengan benar: `route('modul.index')`
- [ ] Import statement benar: `import { route } from 'ziggy-js'`

### Testing
- [ ] Route dapat diakses: `php artisan route:list --name=modul`
- [ ] Permission terdaftar: `Permission::where('name', 'like', 'modul%')->get()`
- [ ] Menu terdaftar: `Menu::where('slug', 'modul')->first()`
- [ ] Halaman dapat diakses dari browser
- [ ] Menu muncul di sidebar
- [ ] Permission bekerja (menu hanya muncul untuk user yang memiliki permission)

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
- Permission (PermissionSeeder):
```php
'pcare.index',
```
- Menu (MenuSeeder):
```php
Menu::create([
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

## Urutan Eksekusi yang Direkomendasikan

1. **Buat Route** → `routes/web.php`
2. **Buat Model & Controller** → `php artisan make:model` & `php artisan make:controller`
3. **Implementasi Controller** → Method CRUD lengkap
4. **Buat Halaman React** → `resources/js/Pages/...`
5. **Tambah Permission** → `PermissionSeeder.php`
6. **Tambah Menu** → `MenuSeeder.php`
7. **Jalankan Seeder** → `php artisan db:seed --class=PermissionSeeder` & `php artisan db:seed --class=MenuSeeder`
8. **Generate Ziggy** → `php artisan ziggy:generate resources/js/ziggy.js`
9. **Clear Cache** → `php artisan route:clear && php artisan config:clear`
10. **Restart Server** → `php artisan serve` & `npm run dev`
11. **Verifikasi** → Cek route, permission, menu, dan akses halaman

---

## Catatan Penting

### Primary Key String
Jika tabel menggunakan primary key string (bukan integer), gunakan explicit routes bukan resource routes:
```php
// ✅ Benar untuk primary key string
Route::prefix('sip-pegawai')->name('sip-pegawai.')->group(function () {
    Route::get('/{nik}', [SipPegawaiController::class, 'show'])->name('show');
});

// ❌ Tidak akan bekerja dengan baik untuk primary key string
Route::resource('sip-pegawai', SipPegawaiController::class);
```

### Menu Parent vs Submenu
- **Parent Menu**: Menu yang memiliki submenu, biasanya tidak memiliki `route`/`url` langsung
- **Submenu**: Menu anak yang memiliki `parent_id` mengarah ke parent menu
- **Root Menu**: Menu utama di sidebar, tidak memiliki `parent_id`

### Permission Naming Convention
- Format umum: `view-modul`, `create-modul`, `edit-modul`, `delete-modul`
- Format route: `modul.index`, `modul.view`, `modul.create`, `modul.edit`, `modul.delete`
- Gunakan format yang konsisten di seluruh aplikasi

---

Selesai. Dengan panduan ini, Anda bisa menambahkan menu baru secara konsisten dan aman untuk pengembangan lanjutan.

**Command cepat untuk clear cache:**
```bash
php artisan config:clear && php artisan route:clear && php artisan cache:clear
```

---

## Catatan untuk Laravel Octane + FrankenPHP

- Server default menggunakan `frankenphp` sesuai `config/octane.php:41`.
- Jalankan server Octane untuk pengembangan:
  ```bash
  php artisan octane:start --server=frankenphp --host=127.0.0.1 --port=8080 --watch
  ```
- Opsi `--watch` memantau perubahan file. Daftar direktori/file yang dipantau ada di `config/octane.php:186–196`.
- Setelah menambah/ubah rute (`routes/web.php`) atau konfigurasi, lakukan reload pekerja jika tidak memakai `--watch`:
  ```bash
  php artisan octane:reload
  ```
- Untuk memastikan perubahan konfigurasi dan rute terbaca di proses panjang Octane, jalankan:
  ```bash
  php artisan config:clear && php artisan route:clear && php artisan cache:clear && php artisan octane:reload
  ```
- Kontrol akses menu tetap bekerja karena `permission_name` divalidasi di controller (`app/Http/Controllers/MenuController.php:173–201`) dan menu difilter per izin di model (`app/Models/Menu.php:111–161`).
- Hindari menyimpan state per-request di properti statik/singleton. `MenuController` sudah stateless (per-request) sehingga aman untuk Octane.
- Koneksi database akan diputus tiap operasi oleh listener Octane (`config/octane.php:105–110`), mencegah kebocoran koneksi pada proses panjang.
- Jika menggunakan Vite saat pengembangan, CSP dev-friendly sudah diatur di `app/Http/Middleware/SecurityHeadersMiddleware.php:41–64` sehingga HMR bekerja bersama FrankenPHP.
