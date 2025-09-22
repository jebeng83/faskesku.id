# Integrasi Doctor dengan Employee

## Overview

Form Doctor telah diintegrasikan dengan tabel Employee (Pegawai) dimana kode dokter merupakan foreign key yang merujuk ke NIK pegawai. Setelah memilih pegawai, form akan otomatis terisi dengan data dari tabel pegawai.

## Perubahan yang Dilakukan

### 1. Backend - DoctorController

#### Method Index

- Menambahkan query untuk mengambil pegawai yang belum terdaftar sebagai dokter
- Mengirimkan data `availableEmployees` ke frontend

```php
$availableEmployees = Employee::whereNotIn('nik', function($query) {
    $query->select('kd_dokter')->from('dokter');
})->select('nik', 'nama', 'jk', 'tmp_lahir', 'tgl_lahir', 'alamat')
  ->get();
```

#### Validation

- Menambahkan validasi `exists:pegawai,nik` untuk memastikan kd_dokter ada di tabel pegawai
- Validasi: `'kd_dokter' => 'required|string|max:20|unique:dokter,kd_dokter|exists:pegawai,nik'`

### 2. Frontend - DoctorModal

#### Dropdown Pegawai

- Mengubah input kode dokter menjadi dropdown untuk mode create
- Menampilkan list pegawai yang belum terdaftar sebagai dokter
- Format: `Nama Pegawai (NIK)`

#### Auto-Fill Form

- Function `handleEmployeeSelect()` untuk mengisi form otomatis
- Field yang terisi otomatis:
  - Kode Dokter (NIK)
  - Nama Dokter
  - Jenis Kelamin
  - Tempat Lahir
  - Tanggal Lahir
  - Alamat

#### Visual Indicators

- Field auto-fill memiliki background biru muda (`bg-blue-50`)
- Label menampilkan teks "(Terisi otomatis)" atau "(Terisi otomatis dari data pegawai)"
- Field yang auto-fill bersifat readonly saat mode create

### 3. Data Mapping

#### Jenis Kelamin

- Employee: 'Pria' / 'Wanita'
- Doctor: 'L' / 'P'
- Mapping: `jk: selectedEmployee.jk === 'Pria' ? 'L' : 'P'`

#### Tanggal Lahir

- Validasi format tanggal untuk menghindari '0000-00-00'
- Format tetap menggunakan YYYY-MM-DD

## UI/UX Features

### Mode Create

- Dropdown untuk memilih pegawai
- Field auto-fill dengan visual indicator
- Field yang terisi otomatis tidak bisa diedit
- Placeholder yang informatif

### Mode Edit

- Kode dokter ditampilkan sebagai text readonly
- Semua field dapat diedit kecuali kode dokter
- Tidak ada dropdown pegawai

### Animasi & Styling

- Smooth transitions dengan framer-motion
- Consistent styling dengan tema aplikasi
- Hover effects pada dropdown
- Loading states untuk form submission

## Testing

### Data Dummy

- File seeder: `EmployeeDummySeeder.php`
- Membuat 4 pegawai dummy untuk testing
- Data mencakup dokter dengan berbagai spesialisasi

### Validation Testing

1. **Foreign Key Constraint**: Kode dokter harus ada di tabel pegawai
2. **Unique Constraint**: Tidak boleh ada duplikasi kode dokter
3. **Auto-fill Accuracy**: Data yang terisi otomatis harus sesuai dengan data pegawai
4. **Form Reset**: Form harus ter-reset dengan benar saat modal ditutup

## Error Handling

### Validation Errors

- Error message untuk kode dokter yang tidak valid
- Error message untuk duplikasi data
- Real-time validation feedback

### Data Consistency

- Handling untuk data pegawai yang tidak lengkap
- Default values untuk field yang kosong
- Format validation untuk tanggal

## Benefits

1. **Data Consistency**: Memastikan data dokter konsisten dengan data pegawai
2. **User Experience**: Mengurangi input manual dan kemungkinan error
3. **Data Integrity**: Foreign key constraint memastikan referential integrity
4. **Efficiency**: Auto-fill menghemat waktu input data
5. **Visual Feedback**: User mendapat feedback yang jelas tentang field mana yang auto-fill

## Future Enhancements

1. **Search Functionality**: Menambahkan search pada dropdown pegawai
2. **Bulk Import**: Import dokter dari list pegawai secara bulk
3. **Validation Enhancement**: Validasi tambahan berdasarkan jabatan pegawai
4. **Audit Trail**: Log perubahan relasi pegawai-dokter
