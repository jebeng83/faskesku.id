# Perbaikan Submenu - Instruksi

## Masalah yang Ditemukan
1. **MenuSeeder tidak dipanggil** - MenuSeeder tidak ada dalam DatabaseSeeder
2. **Permission tidak sesuai** - Permission di PermissionSeeder tidak sesuai dengan yang digunakan di MenuSeeder
3. **State management submenu** - Submenu tidak auto-expand ketika halaman child aktif
4. **Debug logging** - Tidak ada logging untuk troubleshooting

## Perbaikan yang Dilakukan

### 1. Menambahkan MenuSeeder ke DatabaseSeeder
- File: `database/seeders/DatabaseSeeder.php`
- Menambahkan `MenuSeeder::class` ke dalam array call

### 2. Menambahkan Permission yang Diperlukan
- File: `database/seeders/PermissionSeeder.php`
- Menambahkan permission: `patient.view`, `employee.view`, `reg-periksa.view`, `user.view`, `permission.view`, `menu.view`

### 3. Perbaikan State Management Submenu
- File: `resources/js/Components/SidebarMenu.jsx`
- Menambahkan auto-expand untuk parent menu yang memiliki child aktif
- Menambahkan useEffect untuk mendeteksi current_menu dan membuka parent secara otomatis

### 4. Menambahkan Debug Logging
- File: `resources/js/Components/SidebarMenu.jsx`
- Menambahkan console.log untuk debugging data menu dan state

## Langkah-langkah untuk Menerapkan Perbaikan

### 1. Jalankan Seeder
```bash
php artisan db:seed --class=MenuSeeder
php artisan db:seed --class=PermissionSeeder
```

### 2. Atau Reset Database dan Jalankan Semua Seeder
```bash
php artisan migrate:fresh --seed
```

### 3. Pastikan User Memiliki Role Admin
```bash
php artisan tinker
```
Dalam tinker:
```php
$user = App\Models\User::where('email', 'admin@example.com')->first();
$user->assignRole('admin');
```

### 4. Bersihkan Cache
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
npm run build
```

## Cara Memeriksa Hasil

### 1. Buka Browser Developer Tools
- Tekan F12
- Buka tab Console
- Refresh halaman
- Periksa log berikut:
  - `SidebarMenu - menu_hierarchy:` - Harus menampilkan array menu dengan children
  - `Menu: [nama menu], hasChildren: true/false` - Untuk setiap menu item
  - `Auto-expanding parent menus:` - Jika ada menu yang auto-expand

### 2. Test Fungsionalitas
1. Login sebagai admin (admin@example.com / password)
2. Periksa sidebar - harus ada menu dengan submenu:
   - Master Data (dengan submenu: Data Pasien, Data Pegawai)
   - Registrasi (dengan submenu: Registrasi Periksa)
   - Administrasi (dengan submenu: Manajemen User, Permission, Menu)
3. Klik menu yang memiliki submenu - harus expand/collapse
4. Navigasi ke halaman submenu - parent menu harus otomatis terbuka

### 3. Troubleshooting

**Jika submenu masih tidak muncul:**
1. Periksa console browser untuk error
2. Pastikan data menu_hierarchy tidak kosong
3. Periksa permission user dengan:
   ```php
   $user = auth()->user();
   dd($user->getAllPermissions()->pluck('name'));
   ```

**Jika permission error:**
1. Pastikan user memiliki role admin
2. Pastikan role admin memiliki semua permission
3. Jalankan ulang PermissionSeeder

**Jika data menu kosong:**
1. Periksa tabel menus di database
2. Jalankan ulang MenuSeeder
3. Pastikan relasi parent-child benar

## File yang Dimodifikasi
1. `database/seeders/DatabaseSeeder.php`
2. `database/seeders/PermissionSeeder.php`
3. `resources/js/Components/SidebarMenu.jsx`

## Catatan
- Debug logging akan dihapus setelah masalah teratasi
- Pastikan untuk test di berbagai browser
- Periksa responsive design untuk mobile