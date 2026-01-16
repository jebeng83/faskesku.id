# Cara Migrasi (Panduan Perintah)

Panduan ini merangkum perintah yang benar untuk menjalankan migrasi skema database, baik untuk database baru/kosong maupun database yang sudah memiliki tabel. Perintah-perintah di bawah berjalan dalam konteks aplikasi Laravel proyek ini.

## Prasyarat
- Pastikan konfigurasi database di `.env` valid (DB_CONNECTION, DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD). Jangan biarkan DB_PASSWORD kosong jika server DB membutuhkan password.
- Jalankan perintah dari direktori root proyek.
- Disarankan update file skema agar konsisten dengan database aktif: `php artisan schema:dump:update`

## Database Baru atau Kosong
- Impor skema lengkap (base + generated) dan jalankan seeder opsional:

```bash
php artisan migrate:smart --seed
```

- Opsi yang sering dipakai:
  - `--database=mysql` memilih koneksi tertentu
  - `--force` jika perlu pada environment production

## Database Sudah Memiliki Tabel
- Sinkronisasi struktur ke canonical, tandai migrasi create-table yang sudah ada, dan impor tabel baru:

```bash
php artisan migrate:smart
```

- Proses relasi (foreign keys) mengikuti urutan dependensi dari `schema_dump.txt`:

```bash
php artisan migrate:order
```

- Lihat rencana tanpa eksekusi (untuk inspeksi urutan):

```bash
php artisan migrate:order --dry-run
```

## Utilitas Pendukung
- Tandai migrasi create-table sebagai selesai jika tabel sudah ada (menghindari kegagalan saat migrate):

```bash
php artisan migrate:repair-existing --path=database/migrations
php artisan migrate:repair-existing --path=database/migrations/generated
```

- Jalankan migrasi dasar diikuti migrasi generated satu-per-satu (digunakan internal oleh migrate:smart):

```bash
php artisan migrate:all-tables
```

- Perbarui file skema dari database aktif (opsional, untuk referensi dan urutan FK):

```bash
php artisan schema:dump:update
```

## Validasi & Diagnostik
- Status migrasi:

```bash
php artisan migrate:status
```

- Cek log kesalahan Laravel jika ada error saat migrasi:

```bash
tail -n 200 storage/logs/laravel.log
```

## Penanganan FK (Foreign Keys) Gagal
Jika ada migrasi FK gagal karena engine tabel atau data orphan:
- Konversi engine tabel ke InnoDB agar FK didukung.
- Bersihkan data orphan (baris anak tanpa induk) sebelum menambahkan FK.
- Jalankan ulang `php artisan migrate:order` atau `php artisan migrate:smart`.

Contoh pembersihan orphan (sesuaikan nama tabel/kolom):

```sql
DELETE c
FROM child_table c
LEFT JOIN parent_table p ON p.id = c.parent_id
WHERE p.id IS NULL;
```

## Mode Pengembangan (opsional, hati-hati)
- Reset database dan seed ulang (menghapus semua tabel):

```bash
php artisan migrate:fresh --seed
```

Gunakan hanya di lingkungan development/non-produksi.

## Referensi Perintah Kustom Proyek
- Migrasi cerdas (baru/kosong vs existing): `php artisan migrate:smart`
- Urutan migrasi berdasarkan schema_dump: `php artisan migrate:order`
- Sinkronisasi all tables (base + generated): `php artisan migrate:all-tables`
- Perbaikan migrasi existing: `php artisan migrate:repair-existing`
- Perbarui file skema: `php artisan schema:dump:update`

