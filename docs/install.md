# Panduan Instalasi & Deploy

Langkah praktis untuk menyiapkan dan build aplikasi ini di server produksi. Ikuti urutan di bawah agar proses berjalan mulus.

## Prasyarat
- Node.js ≥ 18 dan npm ≥ 10
- PHP 8.2.4 dan Composer ≥ 2
- Web server mengarah ke direktori `public/`
- Database (MySQL/MariaDB) sudah tersedia

Cek versi cepat:
```bash
node -v
npm -v
php -v
composer -V
```

## 1) Siapkan .env
- Salin contoh `.env` lalu sesuaikan konfigurasi:
```bash
cp .env.example .env
```
- Perbarui variabel minimal:
  - `APP_ENV=production`
  - `APP_URL=https://domain-anda`
  - `DB_*` sesuai kredensial database
  - `LATITUDE` dan `LONGITUDE` untuk peta Google Maps
- Generate key aplikasi:
```bash
php artisan key:generate
```

## 2) Install dependency PHP
```bash
composer install --no-dev --optimize-autoloader
php artisan storage:link
```
(opsional) Jalankan migrasi bila diperlukan:
```bash
php artisan migrate --force
```

## 3) Install dependency Node
Aplikasi ini memakai Vite dengan plugin tambahan. Pastikan dependency dev terpasang.

- Jika server memasang `NODE_ENV=production`, devDependencies biasanya diabaikan. Pakai salah satu dari perintah berikut untuk tetap memasang devDependencies:
```bash
# Pilihan A (disarankan):
npm ci --include=dev

# Pilihan B:
npm install --include=dev

# Jika masih gagal, pastikan plugin wayfinder ada:
npm i -D @laravel/vite-plugin-wayfinder@^0.1.3
```

Tips pembersihan bila instalasi bermasalah:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm ci --include=dev
```

## 4) Build aset frontend
```bash
npm run build
```
Aset hasil build akan muncul di `public/build/`.

## 5) Optimisasi Laravel
```bash
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 6) Permission & Web Server
- Pastikan direktori dapat ditulis:
```bash
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache
```
- Arahkan root web server ke `public/` dan pastikan `index.php` dijalankan oleh PHP-FPM.

## Troubleshooting Umum
- Error: `Cannot find package '@laravel/vite-plugin-wayfinder'` saat `npm run build`
  - Penyebab: devDependencies tidak terpasang di server.
  - Solusi cepat:
    ```bash
    npm ci --include=dev
    npm i -D @laravel/vite-plugin-wayfinder@^0.1.3
    npm run build
    ```
- Jika embed Google Maps tidak muncul saat produksi:
  - Pastikan kebijakan CSP mengizinkan domain Google pada `frame-src`.
  - Cek middleware keamanan Anda dan tambahkan: `https://www.google.com` dan `https://maps.google.com` jika diperlukan.

## Alternatif: Build di lokal, upload hasil
- Jalankan `npm ci && npm run build` di komputer lokal.
- Upload `public/build/` ke server.
- Di server, cukup jalankan langkah PHP (bagian 2 dan 5).

Selesai. Aplikasi siap digunakan di server produksi.
