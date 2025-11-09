# Troubleshooting Error Resep

## Masalah yang Ditemukan

### 1. Error Application Encryption Key (UTAMA)
**Gejala:** "No application encryption key has been specified"

**Penyebab:** 
- Laravel tidak dapat membaca APP_KEY dari file .env
- Cache konfigurasi yang corrupt
- Environment mismatch (production vs local)

**Solusi:** 
- Mengubah `APP_ENV=local` menjadi `APP_ENV=production` di file `.env`
- Regenerasi APP_KEY dengan script otomatis
- Clear semua cache Laravel

### 2. Error Session Database
**Gejala:** Error "SQLSTATE[42S02]: Base table or view not found: 1146 Table 'sik.sessions' doesn't exist"

**Penyebab:** Laravel menggunakan driver session database tetapi tabel sessions tidak ada atau bermasalah.

**Solusi:** 
- Mengubah `SESSION_DRIVER=database` menjadi `SESSION_DRIVER=file` di file `.env`
- Menjalankan cache clear untuk menerapkan perubahan

### 3. Error Import Inertia
**Gejala:** "Cannot use Inertia\Inertia as Inertia because the name is already in use"

**Status:** Tidak ditemukan masalah pada file yang ada

## Langkah Perbaikan yang Dilakukan

1. **Mengubah Session Driver**
   ```
   SESSION_DRIVER=file
   ```

2. **Membuat Script Clear Cache**
   - File: `clear_cache.bat`
   - Menjalankan: config:clear, cache:clear, route:clear, view:clear

3. **Membuat Test Script**
   - File: `test_resep.php`
   - Untuk testing koneksi database dan ResepController

## Cara Menjalankan Perbaikan

### LANGKAH 1: Fix APP_KEY (WAJIB)
```bash
# Jalankan script perbaikan APP_KEY
php fix_app_key.php
```

### LANGKAH 2: Clear Cache Laravel
```bash
# Jalankan file batch yang sudah diperbarui
clear_cache.bat

# Atau manual:
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan key:generate --force
```

### LANGKAH 3: Test Environment
```bash
# Test konfigurasi environment
php check_env.php

# Test koneksi database dan resep
php test_resep.php
```

### LANGKAH 4: Restart Web Server
- Restart Apache/Nginx atau development server
- Jalankan: `php artisan serve`
- Test penyimpanan resep melalui aplikasi

## Monitoring Error

- **Log File:** `storage/logs/laravel.log`
- **Periksa error terbaru:** Lihat bagian akhir file log
- **Filter error resep:** Cari kata kunci "resep", "ResepController", "store"

## Jika Masalah Masih Berlanjut

1. **Periksa koneksi database:**
   - Pastikan MySQL/MariaDB berjalan
   - Verifikasi kredensial di `.env`
   - Test koneksi: `php artisan tinker` → `DB::connection()->getPdo()`

2. **Periksa tabel database:**
   - Pastikan tabel `resep_obat`, `resep_dokter`, `databarang`, `gudangbarang` ada
   - Jalankan migration jika perlu: `php artisan migrate`

3. **Periksa permission file:**
   - Folder `storage` harus writable
   - Folder `bootstrap/cache` harus writable

4. **Debug mode:**
   - Set `APP_DEBUG=true` di `.env` untuk error detail
   - Periksa browser console untuk error JavaScript

## Catatan Tambahan

- Session driver file lebih stabil untuk development
- Pastikan semua cache di-clear setelah perubahan konfigurasi
- Monitor log file secara berkala untuk error baru