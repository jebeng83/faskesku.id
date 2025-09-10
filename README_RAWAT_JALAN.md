# Modul Data Rawat Jalan

Modul ini menyediakan fitur lengkap untuk mengelola data rawat jalan di sistem Faskesku.

## Fitur Utama

### 1. CRUD Operations
- **Create**: Tambah data rawat jalan baru
- **Read**: Lihat daftar dan detail data rawat jalan
- **Update**: Edit data rawat jalan yang sudah ada
- **Delete**: Hapus data rawat jalan

### 2. Filtering & Search
- Filter berdasarkan tanggal registrasi
- Filter berdasarkan status (Belum, Sudah, Batal, dll)
- Filter berdasarkan status bayar
- Pencarian berdasarkan nama pasien

### 3. Relasi Data
- Terintegrasi dengan data pasien
- Menampilkan riwayat rawat jalan pasien
- Informasi penanggung jawab

## Struktur Database

### Tabel `reg_periksa`
```sql
- no_reg (varchar 8) - Nomor registrasi
- no_rawat (varchar 17) - Nomor rawat (Primary Key)
- tgl_registrasi (date) - Tanggal registrasi
- jam_reg (time) - Jam registrasi
- kd_dokter (varchar 20) - Kode dokter
- no_rkm_medis (varchar 15) - Nomor rekam medis pasien
- kd_poli (char 5) - Kode poli
- p_jawab (varchar 100) - Penanggung jawab
- almt_pj (varchar 200) - Alamat penanggung jawab
- hubunganpj (varchar 20) - Hubungan penanggung jawab
- biaya_reg (double) - Biaya registrasi
- stts (enum) - Status periksa
- stts_daftar (enum) - Status daftar
- status_lanjut (enum) - Status lanjut
- kd_pj (char 3) - Kode penjamin
- umurdaftar (int) - Umur saat daftar
- sttsumur (enum) - Status umur (Th/Bl/Hr)
- status_bayar (enum) - Status pembayaran
- status_poli (enum) - Status poli
- keputusan (enum) - Keputusan medis
```

## File yang Dibuat

### Models
- `app/Models/RawatJalan.php` - Model untuk tabel reg_periksa

### Controllers
- `app/Http/Controllers/RawatJalanController.php` - Controller dengan CRUD operations

### Migrations
- `database/migrations/2024_01_01_000000_create_reg_periksa_table.php` - Migration untuk tabel reg_periksa

### Seeders
- `database/seeders/RawatJalanSeeder.php` - Seeder untuk data sample

### Views (Blade)
- `resources/views/rawat-jalan/index.blade.php` - Halaman daftar rawat jalan
- `resources/views/rawat-jalan/create.blade.php` - Form tambah data
- `resources/views/rawat-jalan/edit.blade.php` - Form edit data
- `resources/views/rawat-jalan/show.blade.php` - Detail data
- `resources/views/layouts/app.blade.php` - Layout utama

### React Components
- `resources/js/Pages/RawatJalan/Index.jsx` - Komponen daftar rawat jalan
- `resources/js/Pages/RawatJalan/Create.jsx` - Komponen form tambah
- `resources/js/Pages/RawatJalan/Edit.jsx` - Komponen form edit
- `resources/js/Pages/RawatJalan/Show.jsx` - Komponen detail

### Routes
Routes ditambahkan di `routes/web.php`:
```php
Route::resource('rawat-jalan', RawatJalanController::class);
Route::get('rawat-jalan-statistics', [RawatJalanController::class, 'getStatistics'])->name('rawat-jalan.statistics');
```

## Cara Penggunaan

### 1. Menjalankan Migration
```bash
php artisan migrate
```

### 2. Menjalankan Seeder
```bash
php artisan db:seed --class=RawatJalanSeeder
```

### 3. Akses Modul
- URL: `/rawat-jalan`
- Menu: Rawat Jalan (di sidebar)

### 4. Fitur Utama

#### Tambah Data Rawat Jalan
1. Klik tombol "Tambah Data"
2. Isi form dengan data yang diperlukan
3. Klik "Simpan"

#### Filter Data
1. Gunakan form filter di halaman index
2. Filter otomatis submit saat ada perubahan
3. Klik "Reset" untuk menghapus filter

#### Edit Data
1. Klik tombol "Edit" di tabel
2. Ubah data yang diperlukan
3. Klik "Update"

#### Hapus Data
1. Klik tombol "Hapus" di tabel
2. Konfirmasi penghapusan
3. Data akan dihapus secara permanen

## Validasi Data

### Field Wajib
- Pasien (no_rkm_medis)
- Tanggal Registrasi
- Jam Registrasi
- Kode Dokter
- Kode Poli
- Kode Penjamin
- Status
- Status Daftar
- Status Lanjut
- Status Bayar
- Status Poli

### Validasi Khusus
- Pasien harus ada di database
- Tanggal tidak boleh kosong
- Jam harus format yang benar
- Biaya registrasi harus angka positif

## Relasi Database

### RawatJalan -> Patient
```php
// Di model RawatJalan
public function patient()
{
    return $this->belongsTo(Patient::class, 'no_rkm_medis', 'no_rkm_medis');
}

// Di model Patient
public function rawatJalan()
{
    return $this->hasMany(RawatJalan::class, 'no_rkm_medis', 'no_rkm_medis');
}
```

## Fitur Tambahan

### 1. Auto Generate No. Rawat
Nomor rawat otomatis dibuat berdasarkan format: `YYYYMMDDXXXX`
- YYYY: Tahun
- MM: Bulan
- DD: Tanggal
- XXXX: Nomor urut (4 digit)

### 2. Statistics API
Endpoint untuk mendapatkan statistik rawat jalan:
```
GET /rawat-jalan-statistics
```

Response:
```json
{
    "total_hari_ini": 15,
    "belum_bayar": 8,
    "sudah_bayar": 7,
    "total_bulan_ini": 450
}
```

### 3. Status Badge
Status ditampilkan dengan badge berwarna:
- Belum: Kuning
- Sudah: Hijau
- Batal: Merah
- Berkas Diterima: Biru
- Dirujuk: Biru
- Meninggal: Hitam
- Dirawat: Biru
- Pulang Paksa: Kuning

## Troubleshooting

### 1. Error "Table doesn't exist"
Pastikan migration sudah dijalankan:
```bash
php artisan migrate
```

### 2. Error "Patient not found"
Pastikan ada data pasien di database:
```bash
php artisan db:seed --class=PatientSeeder
```

### 3. Error "Route not found"
Pastikan routes sudah terdaftar di `routes/web.php`

### 4. Error "View not found"
Pastikan file view ada di direktori yang benar

## Dependencies

- Laravel 10+
- Inertia.js
- React
- Bootstrap 5
- AdminLTE 3
- Font Awesome 6

## Support

Untuk pertanyaan atau masalah, silakan hubungi tim development.
