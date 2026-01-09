## Faskesku.id – Dokumentasi & Instalasi

Faskesku.id adalah aplikasi manajemen fasilitas kesehatan berbasis Laravel + React (Inertia + Vite) yang memodernisasi integrasi dengan SIMRS, BPJS, SATUSEHAT, dan modul-modul internal (rawat jalan, farmasi, akuntansi, dsb.).

Dokumen ini merangkum cara cepat menyiapkan proyek untuk keperluan pengembangan maupun deployment.

---

## 1. Prasyarat

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

## 2. Clone Repository

```bash
git clone <url-repo-ini> faskesku.id
cd faskesku.id
```

Ganti `<url-repo-ini>` dengan URL Git yang kamu gunakan (mis. GitHub internal).

---

## 3. Konfigurasi Environment (.env)

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

## 4. Install Dependensi PHP

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

## 5. Seed Data Awal

Untuk data referensi dasar (role, permission, wilayah, dokter, dsb.) jalankan:

```bash
php artisan db:seed
```

Seeder utama dapat dilihat di:

- `database/seeders/DatabaseSeeder.php`

---

## 6. Install Dependensi Frontend

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

## 7. Menjalankan Aplikasi (Development)

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

## 8. Build untuk Produksi (Ringkas)

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

## 9. Lint, Typecheck, dan Kualitas Kode

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

