# Alur Migrasi Database (Migrate All)

Panduan ini menjelaskan langkah detail untuk menjalankan migrasi seluruh database pada aplikasi Laravel ini, termasuk base migrations dan seluruh tabel hasil generate di `database/migrations/generated`. Disertakan juga cara paling mudah menjalankan migrasi dan seeder.

## Tujuan
- Menyiapkan environment baru dengan database kosong agar struktur tabel sama persis dengan sumber.
- Menjalankan migrasi secara aman dan terurut, termasuk foreign key.

## Prasyarat
- PHP `>= 8.2`, Laravel `12.x`.
- MySQL/MariaDB tersedia dan kredensial database valid.
- File `.env` terisi dengan konfigurasi `DB_*` yang benar.

## Persiapan
- Pastikan dependency terinstal:

```bash
composer install
```

- Pastikan konfigurasi database di `.env` benar, contoh:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fufufafa
DB_USERNAME=root
DB_PASSWORD=secret
```

- Opsional: cek status migrasi yang sudah ada:

```bash
php artisan migrate:status
```

## Quick Start — Paling Mudah
- Jalankan migrasi base + generated sekaligus, lalu seeder:

```bash
composer install
php artisan migrate:all-tables
php artisan db:seed
```

- Production:

```bash
php artisan migrate:all-tables --force
php artisan db:seed --force
```

- Opsi umum: `--database=`, `--pretend`, `--step`. Gunakan `--pretend` untuk melihat SQL tanpa eksekusi.

##  Bagi Developer

## Langkah 1 — Jalankan Base Migrations
Base migrations adalah file standar di `database/migrations` (users, jobs, cache, sesi, permission, dll.). Jalankan:

```bash
php artisan migrate
```

Untuk production gunakan:

```bash
php artisan migrate --force
```

Alternatif langkah cepat: gunakan `php artisan migrate:all-tables` untuk menjalankan base + generated sekaligus.

## Langkah 2 — Dry‑run Generated Migrations
Sebelum eksekusi, lakukan simulasi untuk melihat SQL yang akan dijalankan oleh hasil generate:

```bash
php artisan migrate --pretend --path=database/migrations/generated
```

Pastikan tidak ada error dan urutan logis pembuatan tabel sudah tepat.

## Langkah 3 — Jalankan Generated Migrations
Eksekusi seluruh migrasi hasil generate agar semua tabel eksisting dibuat di environment baru.

- Development:

```bash
php artisan migrate --path=database/migrations/generated
```

- Production:

```bash
php artisan migrate --path=database/migrations/generated --force
```

Catatan:
- File hasil generate menggunakan `Schema::hasTable(...)` sehingga jika tabel sudah ada, langkah akan dilewati secara aman.
- File pembuatan tabel diberi timestamp `2025_12_31_235959_create_*` dan file foreign key diberi timestamp `2026_01_01_000000_add_foreign_keys_to_*` agar urutan eksekusi konsisten.

Alternatif langkah cepat: gunakan `php artisan migrate:all-tables` untuk base + generated dalam satu perintah.

## Jalankan Seeder
- Menjalankan seluruh seeder (termasuk auto‑seeders tabel):

```bash
php artisan db:seed
```

- Production:

```bash
php artisan db:seed --force
```

- Menjalankan hanya aggregator seeder (opsional):

```bash
php artisan db:seed --class="Database\\Seeders\\SeedAllTablesSeeder"
```

Catatan: sebagian auto‑seeders melakukan `truncate` tabel sebelum insert ulang. Jalankan di environment yang sesuai.

## Validasi Setelah Migrasi
- Lihat daftar migrasi yang sudah dijalankan:

```bash
php artisan migrate:status
```

- Cek keberadaan tabel dan relasi di database dengan tool admin DB atau query `SHOW TABLES;`.

## Rollback (Opsional)
Jika perlu membatalkan langkah generated migrations secara bertahap:

```bash
php artisan migrate:rollback --path=database/migrations/generated --step=1
```

Untuk mereset seluruh generated migrations (gunakan dengan hati‑hati):

```bash
php artisan migrate:reset --path=database/migrations/generated
```

Untuk reset penuh seluruh database (development saja):

```bash
php artisan migrate:fresh
```

## Troubleshooting
- Table already exists: aman karena ada `hasTable`, file akan dilewati. Jika ada duplikasi dari base migrations, jalankan hanya salah satu jalur sesuai kebutuhan.
- Collation/charset mismatch: samakan versi MySQL dan set collation/charset di DB, lalu re‑generate jika perlu dengan opsi `--use-db-collation` (penggunaan paket generator hanya di development).
- Foreign key error: pastikan semua tabel referensi sudah tercipta (urutannya dijaga oleh penamaan timestamp). Jalankan langkah base lalu generated secara berurutan.

## Re‑Generate Hasil Migrations (Development)
Jika skema sumber berubah dan Anda ingin memperbarui isi `database/migrations/generated`, di environment development jalankan:

```bash
php artisan migrate:generate \
  --path="database/migrations/generated" \
  --with-has-table \
  --skip-log \
  --skip-views \
  --skip-proc
```

Jangan jalankan generator di production; production cukup menjalankan migrasi yang sudah ada.

## warning: Penting
- **Jangan jalankan migrasi di environment production tanpa memeriksa ulang SQL.**
- **Gunakan `--force` di production untuk mengabaikan peringatan.**

## Checklist Cepat
- `composer install`
- Set `.env` untuk koneksi DB
- `php artisan migrate:all-tables` (atau gunakan langkah manual base+generated di atas)
- `php artisan db:seed`
- Verifikasi dengan `php artisan migrate:status`

