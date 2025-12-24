# Script Test Registrasi Pasien

Script untuk testing fungsi registrasi pasien via terminal.

## Cara Menggunakan

### 1. Test via PHP Script (Direkomendasikan)

```bash
php scripts/test_registration.php
```

Script ini akan:
- Mengambil data sample dari database (pasien, dokter, poli, penjab)
- Membuat request registrasi
- Memanggil controller langsung (bypass HTTP layer)
- Menampilkan hasil

### 2. Test via cURL Script

```bash
./scripts/test_registration_curl.sh
```

Atau dengan custom base URL:
```bash
BASE_URL=http://localhost:8000 ./scripts/test_registration_curl.sh
```

Script ini akan:
- Mengambil data sample dari database
- Mengambil CSRF token
- Mengirim HTTP POST request ke endpoint registrasi
- Menampilkan response

## Debug Logging

Semua aktivitas registrasi akan di-log ke `storage/logs/laravel.log` dengan prefix `[REGISTRATION DEBUG]`:

- `Start registerPatient` - Request mulai diproses
- `Validation passed` - Validasi berhasil
- `Validation failed` - Validasi gagal (dengan detail error)
- `Patient registration check` - Cek apakah pasien pernah registrasi di poli ini
- `Poli status and biaya` - Status poli (Baru/Lama) dan biaya registrasi
- `Generated numbers` - No. Reg dan No. Rawat yang di-generate
- `Data to be saved` - Data yang akan disimpan ke database
- `Registration created successfully` - Registrasi berhasil dibuat
- `Registration completed successfully` - Proses selesai

## Troubleshooting

### Error: "Data tidak lengkap"
- Pastikan database memiliki data pasien, dokter, poli, dan penjab yang valid
- Script akan otomatis mencari data yang tidak null dan tidak kosong

### Error: "Validation failed"
- Cek log untuk detail error validasi
- Pastikan semua field required terisi dengan benar

### Error: "Poliklinik tidak ditemukan"
- Pastikan kd_poli yang digunakan ada di database
- Cek apakah poliklinik aktif

### Error: "Failed to create registration"
- Cek log untuk detail error database
- Pastikan semua field yang diperlukan ada di tabel reg_periksa
- Cek constraint database (foreign key, unique, dll)

## Melihat Log Debug

```bash
# Lihat log terbaru dengan filter REGISTRATION DEBUG
tail -100 storage/logs/laravel.log | grep "REGISTRATION DEBUG"

# Atau lihat semua log registrasi
grep "REGISTRATION DEBUG" storage/logs/laravel.log | tail -50
```

