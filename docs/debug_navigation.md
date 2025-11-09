# Debug Navigation Issue

## Masalah
Klik pada sidebar "Data Rawat Jalan" tidak mengarah ke route rawat-jalan

## Verifikasi yang Sudah Dilakukan

### 1. Route Laravel ✅
- Route `rawat-jalan.index` sudah terdaftar dengan benar
- Controller `RawatJalanController@index` sudah ada
- Route mengembalikan `Inertia::render('RawatJalan/Index')`

### 2. Komponen React ✅
- Komponen `RawatJalan/Index.jsx` sudah ada
- Menggunakan `AppLayout` dengan benar
- Import dan struktur sudah benar

### 3. Sidebar Navigation ✅
- Item "Data Rawat Jalan" sudah memiliki `href={route('rawat-jalan.index')}`
- Komponen `NavItem` sudah menggunakan `Link` dari Inertia.js
- Sidebar collapsed juga sudah diperbaiki

## Kemungkinan Penyebab

### 1. JavaScript Error
- Buka browser developer tools (F12)
- Lihat Console tab untuk error JavaScript
- Lihat Network tab untuk request yang gagal

### 2. Inertia.js Issue
- Pastikan Inertia.js sudah terinstall dan berfungsi
- Cek apakah ada error di console browser

### 3. Route Helper Issue
- Pastikan Ziggy.js sudah terinstall
- Cek apakah `route()` function berfungsi

## Langkah Debugging

### Langkah 1: Cek Console Browser
1. Buka aplikasi di browser
2. Tekan F12 untuk developer tools
3. Buka tab Console
4. Klik item "Data Rawat Jalan" di sidebar
5. Lihat apakah ada error atau log

### Langkah 2: Cek Network Tab
1. Buka tab Network di developer tools
2. Klik item "Data Rawat Jalan"
3. Lihat apakah ada request ke `/rawat-jalan`
4. Cek response status

### Langkah 3: Test Manual Route
1. Buka browser
2. Ketik langsung URL: `http://localhost:8000/rawat-jalan`
3. Lihat apakah halaman terbuka

### Langkah 4: Test Console Log
1. Buka Console browser
2. Ketik: `route('rawat-jalan.index')`
3. Lihat output yang dihasilkan

## Solusi yang Dapat Dicoba

### 1. Clear Cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### 2. Rebuild Assets
```bash
npm run build
```

### 3. Restart Server
```bash
php artisan serve
```

### 4. Cek Dependencies
```bash
composer install
npm install
```

## Expected Behavior
- Klik "Data Rawat Jalan" → halaman rawat jalan terbuka
- URL berubah menjadi `/rawat-jalan`
- Tidak ada error di console
- Request ke `/rawat-jalan` berhasil (200 OK)
