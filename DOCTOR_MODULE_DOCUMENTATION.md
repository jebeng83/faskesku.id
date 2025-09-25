# Dokumentasi Module Doctor

## Overview

Module Doctor adalah sistem CRUD untuk mengelola data dokter dengan desain UI yang elegan menggunakan kombinasi warna hitam putih dan animasi smooth dengan framer-motion.

## Features

- ✅ Layout 50:50 (List dokter di kiri, detail di kanan)
- ✅ Modal untuk Create dan Update
- ✅ Animasi smooth dengan framer-motion
- ✅ Desain minimalis hitam putih
- ✅ Search dan filter dokter
- ✅ Responsive design
- ✅ Permission-based access control

## Komponen yang Dibuat

### 1. Backend

- **DoctorController**: `/app/Http/Controllers/DoctorController.php`

  - CRUD operations dengan permission middleware
  - Route model binding dengan custom primary key
  - Validation untuk semua field

- **Doctor Model**: `/app/Models/Doctor.php`
  - Relasi dengan Employee dan RegPeriksa
  - Custom primary key (kd_dokter)
  - No timestamps karena tabel legacy

### 2. Frontend

- **Doctor Index**: `/resources/js/Pages/Doctor/Index.jsx`

  - Layout 50:50 dengan framer-motion
  - Search functionality
  - Responsive grid system

- **DoctorModal**: `/resources/js/Components/DoctorModal.jsx`

  - Modal untuk create/update
  - Form validation
  - Smooth animations

- **DoctorDetail**: `/resources/js/Components/DoctorDetail.jsx`
  - Detail view dengan animasi
  - Status badges
  - Organized information sections

### 3. Database & Permissions

- **Permissions**: view-doctors, create-doctors, edit-doctors, delete-doctors
- **Menu**: Ditambahkan ke "Master Data" dengan icon user-md
- **Sample Data**: 6 dokter dummy untuk testing

## Routes

```php
Route::resource('doctors', DoctorController::class);
```

## Permissions

- `view-doctors`: Melihat daftar dan detail dokter
- `create-doctors`: Menambah dokter baru
- `edit-doctors`: Mengubah data dokter
- `delete-doctors`: Menghapus dokter

## UI Design Features

- **Color Scheme**: Hitam (#1f2937) dan Putih (#ffffff)
- **Typography**: Font Tailwind dengan hierarchy yang jelas
- **Animations**: Framer-motion untuk hover, focus, dan transitions
- **Layout**: Grid 50:50 dengan responsive breakpoints
- **Components**: Modal overlay dengan backdrop blur

## Cara Menggunakan

### 1. Akses Module

- Login ke aplikasi
- Navigasi ke "Master Data" > "Data Dokter"

### 2. Menambah Dokter

- Klik tombol "Tambah Dokter"
- Isi form yang muncul di modal
- Klik "Simpan"

### 3. Edit Dokter

- Klik icon edit (pensil) pada card dokter
- Ubah data di modal yang muncul
- Klik "Perbarui"

### 4. Hapus Dokter

- Klik icon delete (trash) pada card dokter
- Konfirmasi penghapusan

### 5. Lihat Detail

- Klik pada card dokter di sisi kiri
- Detail akan muncul di sisi kanan

## Field yang Tersedia

- **Kode Dokter**: Primary key, wajib diisi (tidak bisa diubah saat edit)
- **Nama Dokter**: Nama lengkap dokter
- **Jenis Kelamin**: L/P
- **Tempat & Tanggal Lahir**: Opsional
- **Golongan Darah**: A, B, AB, O
- **Agama**: Pilihan agama
- **Alamat**: Alamat lengkap
- **No. Telepon**: Nomor kontak
- **Status Pernikahan**: Status nikah
- **Kode Spesialisasi**: Kode spesialisasi dokter
- **Alumni**: Universitas asal
- **No. Ijin Praktek**: Nomor surat ijin praktek
- **Status**: Aktif/Non-Aktif

## Teknologi yang Digunakan

- **Backend**: Laravel 11, Inertia.js
- **Frontend**: React, Tailwind CSS, Framer Motion
- **Icons**: Heroicons
- **Database**: MySQL dengan foreign key ke tabel pegawai

## Notes

- Module ini terintegrasi dengan sistem permission Laravel Spatie
- Menggunakan tabel `dokter` yang sudah ada (legacy)
- Relasi dengan tabel `pegawai` melalui field `kd_dokter` = `nik`
- Animasi responsif dan smooth di semua interaksi
- Design mengikuti prinsip minimalis dengan fokus pada UX

## Testing

Data dummy tersedia melalui `DoctorSeeder` dengan 6 dokter sample untuk testing fungsionalitas module.
