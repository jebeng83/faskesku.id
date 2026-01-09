## Faskesku.id – Dokumentasi & Instalasi

Faskesku.id adalah aplikasi manajemen fasilitas kesehatan berbasis **Laravel** (backend) dan **React + Inertia + Vite** (frontend) yang memodernisasi integrasi dengan **SIMRS**, **BPJS**, **SATUSEHAT**, dan modul-modul internal (rawat jalan, farmasi, akuntansi, dsb.).

> **Ringkasan Teknologi**
>
> - Backend: Laravel  
> - Frontend: React + Inertia + Vite  
> - Database: MySQL/MariaDB  
> - Integrasi: BPJS, SATUSEHAT, SIMRS

> **Platform**
>
> - `Linux` – pengembangan & server (Nginx/Apache, PHP-FPM)  
> - `Windows` – pengembangan lokal (XAMPP / php artisan serve)

### Navigasi Cepat

- [Prasyarat](#prasyarat)
- [Clone Repository](#clone-repository)
- [Konfigurasi Environment](#konfigurasi-environment-env)
- [Install Backend & Frontend](#install-dependensi-backend-php)
- [Menjalankan Aplikasi (Development)](#menjalankan-aplikasi-development--umum)
- [Instalasi di Linux (Ringkas)](#instalasi-di-linux-ringkas)
- [Instalasi di Windows / XAMPP](#instalasi-di-windows--xampp)
- [Build untuk Produksi](#build-untuk-produksi-ringkas)
- [Kualitas Kode](#kualitas-kode-lint--typecheck)

---

## Prasyarat

- PHP 8.2.4+
- Composer 2+
- Node.js 18+ dan npm 10+
- MySQL/MariaDB (database sudah dibuat, mis. `faskesku`)
- Web server yang mengarah ke direktori `public/` (untuk produksi)

Cek versi:

```bash
php -v
composer -V
node -v
npm -v
```

---

## Clone Repository

```bash
git clone <url-repo-ini> faskesku.id
cd faskesku.id
```

Ganti `<url-repo-ini>` dengan URL Git yang kamu gunakan (mis. GitHub internal).

---

## Konfigurasi Environment (.env)

Salin template:

```bash
cp .env.example .env
```

Edit `.env` dan minimal sesuaikan:

- `APP_NAME=Faskesku.id`
- `APP_ENV=local`
- `APP_URL=http://127.0.0.1:8000`
- Konfigurasi database:
  - `DB_CONNECTION=mysql`
  - `DB_HOST=127.0.0.1`
  - `DB_PORT=3306`
  - `DB_DATABASE=faskesku`
  - `DB_USERNAME=...`
  - `DB_PASSWORD=...`
- Koordinat peta (opsional tapi direkomendasikan):
  - `LATITUDE=...`
  - `LONGITUDE=...`

Untuk pengembangan lokal, port Vite dan backend sudah disiapkan di `.env.example`:

- `VITE_PORT=5177`
- `VITE_DEV_ORIGIN=http://127.0.0.1:5177`
- `VITE_BACKEND_URL=http://127.0.0.1:8000`

Generate application key:

```bash
php artisan key:generate
```

---

## Install Dependensi Backend (PHP)

```bash
composer install
php artisan storage:link
```

Jalankan migrasi dasar Laravel:

```bash
php artisan migrate
```

Kalau kamu juga ingin menjalankan migrasi tambahan yang berasal dari database existing (folder `database/migrations/generated`), gunakan perintah khusus:

```bash
php artisan migrate:all-tables
```

Perintah ini akan:

- Menjalankan migrasi dasar (`database/migrations`).
- Mencoba menjalankan migrasi generated.
- Melewati migrasi generated yang foreign key‑nya sudah ada di database (untuk menghindari error duplikat relasi di database lama).

---

## Seed Data Awal

Untuk data referensi dasar (role, permission, wilayah, dokter, dsb.) jalankan:

```bash
php artisan db:seed
```

Seeder utama dapat dilihat di:

- `database/seeders/DatabaseSeeder.php`

---

## Install Dependensi Frontend (Node)

Install paket Node:

```bash
npm install
```

Jika kamu mendapatkan error terkait `@laravel/vite-plugin-wayfinder` atau devDependencies diabaikan (mis. di server produksi dengan `NODE_ENV=production`), gunakan:

```bash
npm ci --include=dev
# atau
npm install --include=dev
```

---

## Menjalankan Aplikasi (Development – Umum)

Jalankan backend Laravel (pilih salah satu):

```bash
php artisan serve
# atau gunakan Caddy/FrankenPHP sesuai kebutuhan servermu
```

Secara default aplikasi tersedia di `http://127.0.0.1:8000`.

Jalankan dev server Vite:

```bash
npm run dev
```

Dev server default ada di `http://127.0.0.1:5177` dan sudah diproksikan ke backend melalui `vite.config.js`.

---

## Instalasi di Linux (Ringkas)

Bagian ini untuk developer yang menggunakan Linux (Ubuntu/Debian, Rocky, dsb.) sebagai environment pengembangan.

> **Mode Cepat (Linux)**  
> Jalankan perintah di bawah ini secara berurutan untuk setup standar pengembangan lokal.

### Langkah 1 — Clone & Konfigurasi

```bash
git clone <url-repo-ini> faskesku.id
cd faskesku.id
cp .env.example .env
composer install
php artisan key:generate
php artisan storage:link
```

Atur koneksi database di `.env` (contoh):

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=faskesku
DB_USERNAME=faskesku
DB_PASSWORD=rahasia
```

### Langkah 2 — Migrasi & Seed Database

```bash
php artisan migrate
php artisan db:seed
```

Jika menggunakan migrasi generated dari database existing:

```bash
php artisan migrate:all-tables
```

### Langkah 3 — Jalankan Aplikasi (Backend & Frontend)

- Backend (Laravel):

  ```bash
  php artisan serve
  ```

  Aplikasi akan tersedia di `http://127.0.0.1:8000`.

- Frontend (Vite + React):

  ```bash
  npm install
  npm run dev
  ```

  Dev server Vite biasanya berjalan di `http://127.0.0.1:5177` dan sudah mem-proxy ke backend sesuai pengaturan di `.env` dan `vite.config.js`.

---

## Build untuk Produksi (Ringkas)

Di server produksi:

```bash
composer install --no-dev --optimize-autoloader
php artisan storage:link
php artisan migrate --force
# atau jika memakai database existing:
php artisan migrate:all-tables --force

npm ci --include=dev
npm run build

php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Pastikan web server mengarah ke direktori `public/` dan PHP‑FPM dikonfigurasi dengan benar.

Untuk panduan produksi yang lebih detail, lihat:

- `install.md`
- `docs/SETUP_LARAVEL_OCTANE.md` (jika ingin memakai Laravel Octane/FrankenPHP)

---

## Kualitas Kode (Lint & Typecheck)

Untuk menjaga kualitas kode frontend:

```bash
npm run lint
npm run typecheck
```

Mode pengembangan dengan quality tools berjalan bersamaan:

```bash
npm run dev:quality
```

Detail aturan lint dan typecheck ada di:

- `docs/lint dan typecheck.md`

---

## Instalasi di Windows / XAMPP

Bagian ini untuk pengguna Windows yang memakai **XAMPP (Apache + MySQL + PHP)** atau menjalankan Laravel langsung dengan `php artisan serve`.

> **Ringkasan Cara Jalan di Windows**
>
> - `php artisan serve` → akses `http://127.0.0.1:8000`  
> - `http://localhost/faskesku/public` → jika project diletakkan di `htdocs\faskesku`  
> - `http://localhost/faskesku` → jika menambahkan `index.php` kecil yang me‑require `public/index.php`

### Struktur Folder di htdocs (Opsional)

Contoh penempatan project:

- `C:\xampp\htdocs\faskesku` → root project
  - `public\` → web root Laravel

Ada dua cara utama menjalankan lewat XAMPP tanpa mengubah konfigurasi Apache:

- **Opsi A – Akses via `/public` (paling sederhana)**
  - Akses di browser: `http://localhost/faskesku/public`
- **Opsi B – Tambah `index.php` kecil di root**
  - Supaya bisa akses `http://localhost/faskesku` tanpa `/public` dan tanpa ubah VirtualHost.

Untuk Opsi B, buat file `C:\xampp\htdocs\faskesku\index.php` dengan isi:

```php
<?php

require __DIR__ . '/public/index.php';
```

Setelah itu kamu bisa akses:

- `http://localhost/faskesku`

> Pastikan semua file Laravel tetap berada seperti biasa (jangan memindahkan isi folder `public` ke root).

### Siapkan XAMPP

- Install XAMPP versi terbaru (minimal PHP 8.2 jika memungkinkan).
- Jalankan **Apache** dan **MySQL** dari XAMPP Control Panel.
- Buka `http://localhost/phpmyadmin` dan buat database baru, misalnya: `faskesku`.

### Clone Project ke Folder Kerja

Tidak wajib meletakkan source di dalam `htdocs`. Direkomendasikan di folder kerja biasa, misalnya `C:\workspace\faskesku.id`.

```bash
cd C:\workspace
git clone <url-repo-ini> faskesku.id
cd faskesku.id
```

> Jika ingin tetap memakai `htdocs`, kamu bisa clone ke `C:\xampp\htdocs\faskesku.id` dan sesuaikan path perintah di atas.

### Install PHP & Composer di Windows

Pastikan perintah berikut bisa jalan di **Command Prompt** atau **PowerShell**:

```bash
php -v
composer -V
```

Jika belum:

- Tambahkan `C:\xampp\php` ke `PATH` (Environment Variables).
- Install Composer dari https://getcomposer.org/download/ dan pilih PHP dari XAMPP (`C:\xampp\php\php.exe`).

Setelah itu, dari folder project (`C:\workspace\faskesku.id`):

```bash
composer install
php artisan key:generate
php artisan storage:link
```

### Konfigurasi .env untuk XAMPP

Salin file env:

```bash
cp .env.example .env
```

Edit `.env` (bisa pakai VS Code / editor lain) dan sesuaikan bagian database, contoh tipikal XAMPP:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=faskesku
DB_USERNAME=root
DB_PASSWORD=
```

Simpan file `.env` setelah selesai.

### Migrasi & Seed di Windows

Jalankan migrasi:

```bash
php artisan migrate
```

Jika kamu menggunakan skema database existing yang sudah di-dump ke migrasi generated:

```bash
php artisan migrate:all-tables
```

Lalu seed data dasar (role, permission, menu, dokter, dsb.):

```bash
php artisan db:seed
```

### Jalankan Backend Laravel

Masih di folder project:

```bash
php artisan serve
```

Secara default akan berjalan di:

- `http://127.0.0.1:8000` atau
- `http://localhost:8000`

Kamu *tidak wajib* mengkonfigurasi VirtualHost Apache XAMPP jika menggunakan `php artisan serve`. Jika ingin full via Apache, arahkan DocumentRoot ke folder `public/` dan pastikan `mod_rewrite` aktif.

### Jalankan Frontend (Vite) di Windows

Pastikan Node.js sudah terinstall (cek dengan `node -v` dan `npm -v`). Lalu:

```bash
npm install
npm run dev
```

Vite biasanya berjalan di `http://127.0.0.1:5177` dan sudah dikonfigurasi proxy ke backend Laravel sesuai pengaturan di `.env` dan `vite.config.js`.

---

## Perbedaan Instalasi Linux vs Windows

Secara konsep, langkah instalasi di Linux dan Windows hampir sama (install PHP, Composer, Node, buat database, konfigurasi `.env`, migrate, seed, lalu jalan `php artisan serve` dan `npm run dev`). Perbedaannya terutama di:

- **Path & Environment**
  - Linux: path biasanya `/var/www/faskesku` atau `/home/user/faskesku.id`.
  - Windows: path `C:\xampp\htdocs\faskesku` atau `C:\workspace\faskesku.id`.

- **Web Server**
  - Linux server produksi sering memakai **Nginx + PHP-FPM** atau **Apache2** dengan VirtualHost, mengarah langsung ke folder `public/`.
  - Windows + XAMPP umumnya memakai **Apache**, dan untuk lokal cukup:
    - `php artisan serve` (paling sederhana), atau
    - `http://localhost/faskesku/public`, atau
    - `http://localhost/faskesku` dengan `index.php` kecil yang me‑require `public/index.php`.

- **Perintah CLI**
  - Linux:
    ```bash
    git clone <url-repo-ini> faskesku.id
    cd faskesku.id
    composer install
    cp .env.example .env
    php artisan key:generate
    php artisan migrate
    php artisan db:seed
    php artisan serve
    npm install
    npm run dev
    ```
  - Windows (Command Prompt/PowerShell) perintahnya sama, hanya bedanya di path:
    ```bash
    cd C:\workspace
    git clone <url-repo-ini> faskesku.id
    cd faskesku.id
    composer install
    copy .env.example .env
    php artisan key:generate
    php artisan migrate
    php artisan db:seed
    php artisan serve
    npm install
    npm run dev
    ```

Untuk deployment Linux produksi yang lebih lengkap (Nginx/Apache, supervisor, queue, dsb.), lihat juga:

- `install.md`
- `docs/SETUP_LARAVEL_OCTANE.md`
