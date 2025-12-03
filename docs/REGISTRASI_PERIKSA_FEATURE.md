# Fitur Registrasi Periksa Rawat Jalan

## Deskripsi

Fitur ini memungkinkan pengguna untuk mendaftarkan pasien ke poliklinik untuk rawat jalan melalui modal form yang terintegrasi dengan halaman data pasien.

## Komponen yang Dibuat/Diperbarui

### 1. Controller

- **RegPeriksaController.php** - Controller utama untuk mengelola registrasi periksa
- **PatientController.php** - Ditambahkan method `registerPeriksa()` untuk registrasi dari halaman pasien

### 2. Model

- **RegPeriksa.php** - Model untuk tabel registrasi periksa (sudah ada, diperbarui)
- **Dokter.php** - Model untuk tabel dokter (diperbarui dengan fillable)
- **Poliklinik.php** - Model untuk tabel poliklinik (diperbarui dengan fillable)
- **Penjab.php** - Model untuk tabel penanggung jawab (sudah ada)

### 3. Migration

- **create_dokter_table.php** - Migration untuk tabel dokter
- **create_poliklinik_table.php** - Migration untuk tabel poliklinik
- **create_penjab_table.php** - Migration untuk tabel penanggung jawab

### 4. Seeder

- **DokterSeeder.php** - Seeder untuk data dokter
- **PoliklinikSeeder.php** - Seeder untuk data poliklinik
- **PenjabSeeder.php** - Seeder untuk data penanggung jawab

### 5. Frontend

- **Index.jsx** - Halaman data pasien dengan modal registrasi periksa

## Fitur Modal Registrasi Periksa

### Form Fields

1. **Dokter** - Select dropdown dengan data dari tabel dokter
2. **Poliklinik** - Select dropdown dengan data dari tabel poliklinik
3. **Penanggung Jawab** - Select dropdown dengan data dari tabel penjab
4. **Biaya Registrasi** - Input number untuk biaya
5. **Nama Penanggung Jawab** - Input text (auto-filled dengan nama pasien)
6. **Alamat Penanggung Jawab** - Textarea (auto-filled dengan alamat pasien)
7. **Hubungan** - Select dropdown dengan opsi:
   - Diri Sendiri
   - Ayah
   - Ibu
   - Istri
   - Suami
   - Saudara
   - Anak
   - Lain-lain
8. **Status Lanjut** - Select dropdown (Ralan/Ranap)
9. **Status Bayar** - Select dropdown (Belum Bayar/Sudah Bayar)
10. **Status Poli** - Select dropdown (Baru/Lama)

### Auto-Generated Fields

- **no_reg** - Nomor registrasi (auto-generated berdasarkan dokter dan poliklinik)
- **no_rawat** - Nomor rawat (auto-generated dengan format YYYY/MM/DD/XXXXXX)
- **tgl_registrasi** - Tanggal registrasi (hari ini)
- **jam_reg** - Jam registrasi (waktu sekarang)
- **umurdaftar** - Umur pasien (dihitung otomatis)
- **sttsumur** - Status umur (Th/Bl/Hr)
- **stts** - Status periksa (default: Belum)
- **stts_daftar** - Status daftar (default: Baru)

## Cara Menggunakan

1. Buka halaman Data Pasien
2. Klik dropdown pada kolom No. RM pasien yang ingin didaftarkan
3. Pilih "Daftar Periksa"
4. Modal akan terbuka dengan form registrasi
5. Isi semua field yang diperlukan
6. Klik "Simpan Registrasi"

## Route yang Ditambahkan

```php
Route::post('/patients/{patient}/register-periksa', [PatientController::class, 'registerPeriksa'])->name('patients.register-periksa');
```

## Validasi

- Semua field wajib diisi
- Dokter, poliklinik, dan penanggung jawab harus ada di database
- Biaya registrasi harus berupa angka positif
- Status lanjut hanya boleh Ralan atau Ranap
- Status bayar hanya boleh Sudah Bayar atau Belum Bayar
- Status poli hanya boleh Lama atau Baru

## Database Schema

### Tabel dokter

- kd_dokter (PK)
- nm_dokter
- jk, tmp_lahir, tgl_lahir
- gol_drh, agama, almt_tgl
- no_telp, stts_nikah
- kd_sps, alumni, no_ijn_praktek
- status

### Tabel poliklinik

- kd_poli (PK)
- nm_poli
- registrasi
- registrasilama
- status

### Tabel penjab

- kd_pj (PK)
- png_jawab
- nama_perusahaan
- alamat_perusahaan
- no_telp, attn
- status

## Instalasi

1. Jalankan migration:

```bash
php artisan migrate
```

2. Jalankan seeder:

```bash
php artisan db:seed
```

3. Pastikan data dokter, poliklinik, dan penjab sudah terisi

## Catatan

- Modal menggunakan z-index tinggi (z-50) untuk memastikan tampil di atas elemen lain
- Form memiliki validasi client-side dan server-side
- Data pasien otomatis diisi ke form untuk kemudahan pengguna
- Responsive design untuk berbagai ukuran layar
