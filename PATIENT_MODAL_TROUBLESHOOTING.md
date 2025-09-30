# Troubleshooting Modal Tambah Pasien

## Masalah: Status 302 (Redirect) saat Submit Form

### Penyebab

Status 302 terjadi karena `PatientController@store` melakukan redirect ke `patients.index` setelah berhasil membuat pasien. Ini normal untuk form biasa, tetapi tidak diinginkan untuk modal.

### Solusi yang Diterapkan

1. **Deteksi Request Inertia**: Controller sekarang mengecek header `X-Inertia` untuk menentukan response type
2. **Response JSON untuk Modal**: Jika request dari Inertia (modal), controller mengembalikan JSON response
3. **Redirect untuk Form Biasa**: Jika bukan dari Inertia, tetap redirect seperti biasa

### Kode yang Diperbaiki

**PatientController.php:**

```php
// Check if request is from Inertia (modal)
if (request()->header('X-Inertia')) {
    return response()->json([
        'success' => true,
        'message' => 'Data pasien berhasil ditambahkan.',
        'data' => Patient::latest()->first()
    ]);
}

return redirect()->route('patients.index')
    ->with('success', 'Data pasien berhasil ditambahkan.');
```

**PatientCreateModal.jsx:**

```javascript
const handleSubmit = (e) => {
	e.preventDefault();
	console.log("Submitting form with data:", data);
	post(route("patients.store"), {
		onSuccess: (page) => {
			console.log("Success response:", page);
			alert("Pasien berhasil ditambahkan!");
			onSuccess();
			onClose();
		},
		onError: (errors) => {
			console.error("Form submission errors:", errors);
			alert("Terjadi kesalahan: " + JSON.stringify(errors));
		},
	});
};
```

## Field yang Diperlukan

Pastikan semua field required diisi:

### Field Wajib:

- `nm_pasien` - Nama Pasien
- `jk` - Jenis Kelamin (L/P)
- `tmp_lahir` - Tempat Lahir
- `tgl_lahir` - Tanggal Lahir
- `nm_ibu` - Nama Ibu
- `alamat` - Alamat
- `pnd` - Pendidikan
- `namakeluarga` - Nama Keluarga
- `kd_pj` - Penanggung Jawab
- `pekerjaanpj` - Pekerjaan Penanggung Jawab
- `alamatpj` - Alamat Penanggung Jawab
- `kode_wilayah` - Kode Wilayah (harus exists di tabel wilayah)

### Field Opsional:

- `no_ktp` - NIK
- `gol_darah` - Golongan Darah
- `pekerjaan` - Pekerjaan
- `stts_nikah` - Status Perkawinan
- `agama` - Agama
- `no_tlp` - No. Telepon
- `email` - Email
- `no_peserta` - No. Peserta

## Debugging

### 1. Cek Console Browser

Buka Developer Tools > Console untuk melihat log:

- Form data yang dikirim
- Response dari server
- Error messages

### 2. Cek Network Tab

- Pastikan request POST ke `/patients`
- Cek status code (seharusnya 200 untuk modal, 302 untuk form biasa)
- Cek response body

### 3. Cek Database

```sql
-- Cek data wilayah
SELECT COUNT(*) FROM wilayah;

-- Cek data penjab
SELECT COUNT(*) FROM penjab;

-- Cek pasien terbaru
SELECT * FROM pasien ORDER BY tgl_daftar DESC LIMIT 5;
```

## Testing

### Test Manual:

1. Buka halaman Registration
2. Klik button "Tambah Pasien"
3. Isi form dengan data valid
4. Pilih wilayah dari dropdown
5. Submit form
6. Cek console untuk log
7. Cek apakah modal tertutup dan data tersimpan

### Test dengan Data Valid:

```javascript
// Data test yang valid
{
    nm_pasien: "Test Pasien",
    jk: "L",
    tmp_lahir: "Jakarta",
    tgl_lahir: "1990-01-01",
    nm_ibu: "Test Ibu",
    alamat: "Test Alamat",
    pnd: "SMA",
    namakeluarga: "Test Keluarga",
    kd_pj: "UMUM",
    pekerjaanpj: "Test Pekerjaan",
    alamatpj: "Test Alamat PJ",
    kode_wilayah: "74.01.01.1001" // Pastikan exists di database
}
```

## Status Code yang Diharapkan

- **200 OK**: Modal submission berhasil (JSON response)
- **302 Found**: Form biasa submission berhasil (redirect)
- **422 Unprocessable Entity**: Validation error
- **500 Internal Server Error**: Server error

## Catatan Penting

1. **Inertia.js**: Modal menggunakan Inertia.js `useForm` hook
2. **Route Helper**: Pastikan `ziggy-js` terinstall untuk `route()` helper
3. **Validation**: Server-side validation tetap berjalan
4. **CSRF**: Token CSRF otomatis dikirim oleh Inertia
5. **Headers**: Inertia otomatis menambahkan header `X-Inertia`
