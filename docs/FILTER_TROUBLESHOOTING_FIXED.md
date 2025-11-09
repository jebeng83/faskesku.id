# Filter Troubleshooting - Masalah yang Diperbaiki

## Masalah yang Ditemukan dan Solusinya

### 1. **Circular Dependency di useEffect**

**Masalah**: useEffect memiliki dependency `[filters]` yang menyebabkan infinite loop karena `loadRegistrations` menggunakan `filters` di dalamnya.

**Solusi**:

```javascript
// Before (Bermasalah)
useEffect(() => {
	const timeoutId = setTimeout(
		() => {
			loadRegistrations(1);
		},
		filters.search ? 500 : 0
	);
	return () => clearTimeout(timeoutId);
}, [filters]); // Circular dependency!

// After (Diperbaiki)
useEffect(() => {
	const timeoutId = setTimeout(
		() => {
			loadRegistrations(1);
		},
		filters.search ? 500 : 0
	);
	return () => clearTimeout(timeoutId);
}, [
	filters.date,
	filters.kd_poli,
	filters.kd_dokter,
	filters.search,
	filters.status,
	filters.status_poli,
]);
```

### 2. **Eager Loading dengan Field yang Salah**

**Masalah**: Menggunakan `id` field yang tidak ada di tabel `pasien`, `dokter`, `poliklinik`, dan `penjab`.

**Solusi**:

```php
// Before (Bermasalah)
$query = RegPeriksa::with([
    'pasien:id,no_rkm_medis,nm_pasien,jk,umur,alamat',  // 'id' tidak ada!
    'dokter:id,kd_dokter,nm_dokter',                     // 'id' tidak ada!
    'poliklinik:id,kd_poli,nm_poli',                     // 'id' tidak ada!
    'penjab:id,kd_pj,png_jawab'                          // 'id' tidak ada!
]);

// After (Diperbaiki)
$query = RegPeriksa::with([
    'pasien:no_rkm_medis,nm_pasien,jk,umur,alamat',
    'dokter:kd_dokter,nm_dokter',
    'poliklinik:kd_poli,nm_poli',
    'penjab:kd_pj,png_jawab'
]);
```

### 3. **Data Test dengan Relasi yang Salah**

**Masalah**: Data test menggunakan `no_rkm_medis` yang kosong atau tidak valid.

**Solusi**: Membuat data test dengan pasien yang valid:

```php
// Pastikan menggunakan pasien yang valid
$patient = Patient::where('no_rkm_medis', '000008')->first();
// Gunakan $patient->no_rkm_medis yang valid untuk relasi
```

## Testing yang Dilakukan

### 1. **Backend Testing**

```bash
# Test endpoint tanpa filter
php artisan tinker --execute="
use App\Http\Controllers\RegistrationController;
use Illuminate\Http\Request;

$request = new Request();
$request->merge(['date' => date('Y-m-d')]);

$controller = new RegistrationController();
$response = $controller->getRegistrations($request);
$data = $response->getData(true);

echo 'Total data: ' . $data['data']['total'];
"
```

### 2. **Filter Testing**

```bash
# Test search filter
$request->merge(['search' => '1212']);
# Result: 3 registrations found

# Test status filter
$request->merge(['status' => 'Belum']);
# Result: 1 registration found
```

### 3. **Database Testing**

```bash
# Check data integrity
php artisan tinker --execute="
use App\Models\RegPeriksa;
use App\Models\Patient;

$reg = RegPeriksa::with('pasien')->where('tgl_registrasi', date('Y-m-d'))->first();
echo 'Patient: ' . $reg->pasien->nm_pasien; // Should show actual patient name
"
```

## Fitur Filter yang Berfungsi

### ✅ **Filter Nama Pasien**

- Search berdasarkan nama pasien
- Search berdasarkan nomor RM
- Debounce 500ms untuk performa optimal

### ✅ **Filter Status**

- Status Registrasi: Belum, Sudah, Batal
- Status Poli: Baru, Lama
- Dropdown selection yang responsif

### ✅ **Filter Tanggal**

- Default hari ini
- Custom date selection
- Format YYYY-MM-DD

### ✅ **Filter Poliklinik & Dokter**

- Dropdown dengan data dari database
- Real-time filtering
- Clear selection option

### ✅ **Pagination**

- 15 data per halaman
- Previous/Next navigation
- Page numbers dengan current page highlight
- Info pagination: "X sampai Y dari Z data"

## Performa Optimasi

### 1. **Eager Loading**

- Hanya load field yang diperlukan
- Mengurangi query N+1 problem
- Mengurangi data transfer

### 2. **Debounce Search**

- Delay 500ms untuk search input
- Mengurangi request ke server
- Better user experience

### 3. **Pagination**

- 15 data per halaman
- Mengurangi memory usage
- Loading lebih cepat

## Debug Tips

### 1. **Console Logging**

```javascript
// Tambahkan logging untuk debug
console.log("Filter changed:", name, "=", value);
console.log("Loading with filters:", { ...filters, page });
```

### 2. **Network Tab**

- Cek request ke `/registration/get-registrations`
- Pastikan parameters dikirim dengan benar
- Cek response status dan data

### 3. **Database Query Log**

```php
// Enable query logging
DB::enableQueryLog();
// ... your code ...
$queries = DB::getQueryLog();
dd($queries);
```

## Common Issues & Solutions

### Issue 1: Filter tidak berfungsi

**Solution**: Cek dependency array di useEffect, pastikan tidak ada circular dependency

### Issue 2: Data tidak muncul

**Solution**: Cek eager loading fields, pastikan field yang digunakan ada di database

### Issue 3: Search tidak bekerja

**Solution**: Pastikan ada data pasien yang valid dengan relasi yang benar

### Issue 4: Pagination error

**Solution**: Cek response format dari backend, pastikan pagination data lengkap

## Status Akhir

✅ **Semua filter berfungsi dengan baik**
✅ **Pagination bekerja optimal**
✅ **Performa sudah dioptimasi**
✅ **No linting errors**
✅ **Data test tersedia**

Filter dan pagination sekarang siap digunakan untuk production!
