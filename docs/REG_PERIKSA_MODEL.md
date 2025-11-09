# Model RegPeriksa - Dokumentasi

## Overview

Model `RegPeriksa` adalah model untuk mengelola data registrasi periksa pasien di sistem SIMRS. Model ini dilengkapi dengan logic otomatis untuk menghitung umur pasien berdasarkan tanggal lahir dan tanggal registrasi.

## Struktur Database

### Tabel: `reg_periksa`

- **Primary Key**: `no_reg` (varchar 8)
- **Unique Key**: `no_rawat` (varchar 17)

### Kolom Utama:

- `no_reg`: Nomor registrasi (Primary Key)
- `no_rawat`: Nomor rawat (Unique)
- `tgl_registrasi`: Tanggal registrasi
- `jam_reg`: Jam registrasi
- `kd_dokter`: Kode dokter
- `no_rkm_medis`: Nomor rekam medis pasien
- `kd_poli`: Kode poliklinik
- `p_jawab`: Penanggung jawab
- `almt_pj`: Alamat penanggung jawab
- `hubunganpj`: Hubungan penanggung jawab
- `biaya_reg`: Biaya registrasi
- `stts`: Status periksa
- `stts_daftar`: Status daftar (Lama/Baru)
- `status_lanjut`: Status lanjut (Ralan/Ranap)
- `kd_pj`: Kode penanggung jawab
- `umurdaftar`: Umur saat daftar
- `sttsumur`: Satuan umur (Th/Bl/Hr)
- `status_bayar`: Status pembayaran
- `status_poli`: Status poli

## Fitur Utama

### 1. Perhitungan Umur Otomatis

Model ini memiliki method `hitungUmur()` yang secara otomatis menghitung umur pasien berdasarkan:

- Tanggal lahir pasien
- Tanggal registrasi

```php
// Contoh penggunaan
$regPeriksa = new RegPeriksa();
$umurData = $regPeriksa->hitungUmur('1990-01-15', '2024-01-15');
// Output: ['umur' => 34, 'satuan' => 'Th', 'umur_display' => '34 tahun']
```

### 2. Accessor untuk Display

Model menyediakan accessor untuk menampilkan data dalam format yang mudah dibaca:

- `umur_display`: Umur dalam format "34 tahun"
- `umur_singkat`: Umur dalam format "34 Th"
- `status_display`: Status dalam format yang mudah dibaca
- `status_daftar_display`: Status daftar dalam format yang mudah dibaca
- `status_lanjut_display`: Status lanjut dalam format yang mudah dibaca
- `status_bayar_display`: Status bayar dalam format yang mudah dibaca
- `status_poli_display`: Status poli dalam format yang mudah dibaca

### 3. Relasi Database

Model memiliki relasi dengan:

- `Patient`: Melalui `no_rkm_medis`
- `Doctor`: Melalui `kd_dokter`
- `Poli`: Melalui `kd_poli`

### 4. Query Scopes

Model menyediakan berbagai scope untuk filtering:

```php
// Filter berdasarkan status
RegPeriksa::byStatus('Sudah')->get();

// Filter berdasarkan status daftar
RegPeriksa::byStatusDaftar('Baru')->get();

// Filter berdasarkan status lanjut
RegPeriksa::byStatusLanjut('Ralan')->get();

// Filter berdasarkan dokter
RegPeriksa::byDokter('D001')->get();

// Filter berdasarkan poli
RegPeriksa::byPoli('P001')->get();

// Filter berdasarkan status bayar
RegPeriksa::byStatusBayar('Sudah Bayar')->get();

// Filter berdasarkan tanggal
RegPeriksa::byTanggalRegistrasi('2024-01-15')->get();

// Filter berdasarkan range tanggal
RegPeriksa::byRangeTanggal('2024-01-01', '2024-01-31')->get();
```

## API Endpoints

### Web Routes

- `GET /reg-periksa` - Index (daftar registrasi)
- `GET /reg-periksa/create` - Form create
- `POST /reg-periksa` - Store (simpan data)
- `GET /reg-periksa/{id}` - Show (detail)
- `GET /reg-periksa/{id}/edit` - Form edit
- `PUT /reg-periksa/{id}` - Update (update data)
- `DELETE /reg-periksa/{id}` - Destroy (hapus data)
- `POST /reg-periksa/hitung-umur` - Hitung umur
- `GET /reg-periksa-statistik` - Statistik

### API Routes

- `GET /api/reg-periksa` - List dengan filter
- `POST /api/reg-periksa` - Create
- `GET /api/reg-periksa/{id}` - Show
- `PUT /api/reg-periksa/{id}` - Update
- `DELETE /api/reg-periksa/{id}` - Destroy
- `POST /api/reg-periksa/hitung-umur` - Hitung umur
- `GET /api/reg-periksa/statistik` - Statistik
- `GET /api/reg-periksa/filter-data` - Data untuk filter

## Contoh Penggunaan

### 1. Membuat Registrasi Baru

```php
$regPeriksa = new RegPeriksa([
    'no_reg' => 'REG001',
    'no_rawat' => 'RAWAT001',
    'tgl_registrasi' => '2024-01-15',
    'jam_reg' => '08:00:00',
    'kd_dokter' => 'D001',
    'no_rkm_medis' => 'P001',
    'kd_poli' => 'P001',
    'p_jawab' => 'John Doe',
    'almt_pj' => 'Jl. Merdeka No. 123',
    'hubunganpj' => 'Diri Sendiri',
    'biaya_reg' => 50000,
    'stts' => 'Belum',
    'stts_daftar' => 'Baru',
    'status_lanjut' => 'Ralan',
    'kd_pj' => 'PJ1',
    'status_bayar' => 'Belum Bayar',
    'status_poli' => 'Baru',
]);

// Umur akan dihitung otomatis saat save
$regPeriksa->save();
```

### 2. Mengambil Data dengan Relasi

```php
$regPeriksas = RegPeriksa::with(['patient', 'doctor', 'poli'])
    ->byStatus('Sudah')
    ->byTanggalRegistrasi('2024-01-15')
    ->get();
```

### 3. Menghitung Umur Manual

```php
$regPeriksa = new RegPeriksa();
$umurData = $regPeriksa->hitungUmur('1990-01-15', '2024-01-15');

echo $umurData['umur_display']; // "34 tahun"
echo $umurData['umur']; // 34
echo $umurData['satuan']; // "Th"
```

### 4. Menggunakan Accessor

```php
$regPeriksa = RegPeriksa::find('REG001');

echo $regPeriksa->umur_display; // "34 tahun"
echo $regPeriksa->status_display; // "Sudah Diperiksa"
echo $regPeriksa->status_daftar_display; // "Pasien Baru"
```

## Validasi

Model menggunakan validasi yang ketat untuk memastikan data integrity:

- `no_reg`: Required, unique, max 8 karakter
- `no_rawat`: Required, unique, max 17 karakter
- `tgl_registrasi`: Required, date format
- `jam_reg`: Required, time format (H:i)
- `kd_dokter`: Required, exists in dokter table
- `no_rkm_medis`: Required, exists in patients table
- `kd_poli`: Required, exists in poliklinik table
- `biaya_reg`: Required, numeric, min 0
- Status fields: Required, enum values

## Event Hooks

Model menggunakan `boot()` method untuk:

- Menghitung umur otomatis saat data disimpan
- Memastikan data konsisten saat update

## Seeder

Model dilengkapi dengan seeder yang membuat data contoh:

- 3 registrasi periksa dengan data lengkap
- Data dokter, poli, dan pasien yang terkait
- Umur dihitung otomatis berdasarkan tanggal lahir

## Migration

Migration membuat tabel dengan struktur yang sesuai dengan spesifikasi:

- Primary key pada `no_reg`
- Unique constraint pada `no_rawat`
- Enum values untuk status fields
- Proper data types untuk semua kolom
