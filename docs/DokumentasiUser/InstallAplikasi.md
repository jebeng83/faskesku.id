# Install Aplikasi Faskesku.id (Octane + FrankenPHP)

Panduan singkat untuk menyiapkan aplikasi di server produksi dengan Laravel Octane (driver FrankenPHP). Ikuti urutan langkah di bawah. Jika perlu detail tambahan, lihat tombol "Tampilkan detail lengkap" di halaman Dokumentasi.

## Prasyarat
- Node.js ≥ 18 dan npm ≥ 10
- PHP ≥ 8.2, Composer ≥ 2
- MySQL/MariaDB tersedia dan kredensial valid
- Laravel Octane terpasang, server FrankenPHP tersedia

## 1) Siapkan .env
- Salin `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
- Edit nilai penting:
  - `APP_ENV=production`
  - `APP_URL=https://domain-anda`
  - `DB_*` sesuai kredensial database
  - `LATITUDE` dan `LONGITUDE` bila pakai peta Google
  - Opsional peta statis di produksi: `VITE_GOOGLE_MAPS_STATIC_ONLY=true`
- Generate key aplikasi:
```bash
php artisan key:generate
```

## 2) Install dependency PHP
```bash
composer install --no-dev --optimize-autoloader
php artisan storage:link
```
- Migrasi database (lihat juga panduan lengkap di `Alur_Migrate_Database.md`):
```bash
# Base migrations
php artisan migrate --force

# Generated migrations (jika digunakan)
php artisan migrate --path=database/migrations/generated --force
```

## 3) Install dependency Node
Aplikasi memakai Vite dan membutuhkan devDependencies saat build.
- Pasang devDependencies di production:
```bash
npm ci --include=dev
```
- Jika build memberi peringatan baseline lama:
```bash
npm i baseline-browser-mapping@latest -D
```
- Jika gagal, coba:
```bash
npm install --include=dev
npm i -D @laravel/vite-plugin-wayfinder@^0.1.3
```
- Tips bersih cache bila masih error:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm ci --include=dev
```

## 4) Build aset frontend
```bash
npm run build
```
- Hasil build ada di `public/build/`.

## 5) Optimisasi Laravel
```bash
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 6) Jalankan Octane (FrankenPHP)
- Development (watch):
```bash
php artisan octane:frankenphp --watch --port=8080
```
- Production (contoh 8 worker, reload setiap 500 request):
```bash
php artisan octane:start --server=frankenphp --workers=8 --max-requests=500 --port=8080
```
- Setelah deploy kode baru:
```bash
php artisan octane:reload
```

## 7) Permission & Reverse Proxy
- Izinkan penulisan pada direktori penting:
```bash
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache
```
- Konfigurasikan reverse proxy (contoh Nginx) ke FrankenPHP `:8080` dan arahkan static ke `public/`.

## Troubleshooting Cepat
- Error Vite plugin saat build:
  ```bash
  npm ci --include=dev
  npm i -D @laravel/vite-plugin-wayfinder@^0.1.3
  npm run build
  ```
- Peringatan baseline data lama:
  ```bash
  npm i baseline-browser-mapping@latest -D
  ```
- Embed Google Maps tidak muncul di produksi:
  - Tambahkan domain Google ke CSP `frame-src` (mis. `https://www.google.com`, `https://maps.google.com`), atau gunakan fallback statis (`VITE_GOOGLE_MAPS_STATIC_ONLY=true`).
- Octane-friendly code: hindari state per-request di constructor dan static property; lihat `docs/ANALISIS_LARAVEL_OCTANE.md`.

## Alternatif (Build di Lokal)
- Jalankan di komputer lokal:
```bash
npm ci && npm run build
```
- Upload folder `public/build/` ke server.
- Di server, jalankan langkah PHP (bagian 2 dan 5) lalu Octane (bagian 6).

## Referensi
- `docs/ANALISIS_LARAVEL_OCTANE.md`
- `Alur_Migrate_Database.md`
- Laravel Octane: https://laravel.com/docs/12.x/octane
- FrankenPHP: https://frankenphp.dev/

Selesai. Aplikasi siap digunakan.
