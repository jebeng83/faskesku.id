# Module Pendaftaran Pasien ke Poliklinik

## Deskripsi

Module ini menyediakan interface untuk pendaftaran pasien ke poliklinik dengan layout 40:60. Sisi kiri digunakan untuk mencari data pasien dan sisi kanan menampilkan data registrasi dari tabel `reg_periksa`.

## Fitur Utama

### 1. Layout 40:60

- **Sisi Kiri (40%)**: Pencarian dan pemilihan pasien
- **Sisi Kanan (60%)**: Daftar registrasi hari ini dengan filter

### 2. Pencarian Pasien

- Pencarian real-time dengan debounce (500ms)
- Pencarian berdasarkan nama, nomor RM, atau nomor KTP
- Tampilan hasil pencarian yang informatif
- Loading indicator saat pencarian

### 3. Modal Pendaftaran

- Menggunakan logik pendaftaran yang sama dengan module pasien
- Form lengkap dengan validasi
- Pengecekan status poli otomatis (Baru/Lama)
- Perhitungan biaya registrasi otomatis
- Dropdown untuk dokter, poliklinik, dan penanggung jawab

### 4. Daftar Registrasi

- Menampilkan registrasi hari ini secara default
- Filter berdasarkan tanggal, poliklinik, dan dokter
- Status registrasi dan status poli
- Informasi lengkap pasien dan biaya
- Tombol batal registrasi untuk status "Belum"

### 5. Fitur Batal Registrasi ⭐ **NEW**

- Hanya dapat membatalkan registrasi dengan status "Belum"
- Konfirmasi sebelum membatalkan
- Update status menjadi "Batal"
- Refresh data otomatis setelah pembatalan

### 6. Update Umur Pasien ⭐ **NEW**

- Otomatis update umur pasien saat registrasi
- Menggunakan perhitungan umur yang akurat
- Sinkronisasi data antara tabel pasien dan registrasi

### 7. Responsive Design ⭐ **NEW**

- Layout adaptif untuk mobile, tablet, dan desktop
- Stack layout pada mobile (vertical)
- Side-by-side layout pada desktop (horizontal 40:60)
- Typography scaling berdasarkan ukuran layar
- Touch-friendly button sizes pada mobile

### 8. Smooth Animations ⭐ **NEW**

- Framer Motion untuk animasi yang smooth
- Page load animations dengan staggered delays
- Hover dan tap animations pada interactive elements
- Modal animations dengan spring physics
- Search results dengan entrance animations
- Loading states dengan smooth transitions

### 9. Modal Detail Registrasi ⭐ **NEW**

- Klik pada item registrasi untuk melihat detail lengkap
- Informasi pasien, registrasi, medis, dan pembayaran
- Layout responsive dengan color-coded sections
- Tombol batalkan registrasi langsung dari modal detail
- Animasi smooth dengan staggered entrance effects
- Prevent event bubbling untuk interaksi yang tepat

### 10. Modern Modal Overlay ⭐ **NEW**

- Glassmorphism design dengan backdrop blur effect
- Transparent blur background (bukan hitam solid)
- Enhanced shadow dan border effects
- Smooth blur animation (0px → 12px blur)
- High z-index (9998-9999) berada di atas sidebar & header
- Layered z-index untuk multiple modals
- Professional glassmorphism aesthetic

### 11. Stats Dashboard Registrasi ⭐ **NEW**

- Real-time statistics dari data registrasi
- 7 metrics: Total, Belum, Selesai, Batal, Baru, Lama, Total Biaya
- Color-coded gradient cards dengan icon
- Responsive grid layout (2 cols mobile → 7 cols desktop)
- Hover animations dengan scale dan lift effects
- Auto-update stats saat data berubah
- Indonesian currency formatting

### 12. Fixed Age Calculation ⭐ **FIXED**

- Perbaikan perhitungan umur yang menghasilkan nilai negatif
- Menggunakan parameter order yang benar pada Carbon diff methods
- Format output: "32 Th", "6 Bl", "15 Hr"
- Validasi tanggal lahir di masa depan
- Error handling untuk tanggal invalid
- Auto-update umur pasien saat registrasi

## Teknologi yang Digunakan

### Backend

- **Controller**: `RegistrationController.php`
- **Models**: `Patient`, `RegPeriksa`, `Dokter`, `Poliklinik`, `Penjab`
- **Routes**: RESTful API endpoints untuk pendaftaran

### Frontend

- **React Component**: `Registration/Index.jsx`
- **UI Framework**: Tailwind CSS
- **Animation Library**: Framer Motion ⭐ **NEW**
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Axios
- **Navigation**: Inertia.js
- **Responsive Design**: Tailwind CSS breakpoints

## File yang Dibuat/Dimodifikasi

### 1. Controller Baru

```
app/Http/Controllers/RegistrationController.php
```

### 2. Route Baru

```php
// routes/web.php
Route::get('/registration', [RegistrationController::class, 'index'])->name('registration.index');
Route::get('/registration/search-patients', [RegistrationController::class, 'searchPatients'])->name('registration.search-patients');
Route::post('/registration/{patient}/register', [RegistrationController::class, 'registerPatient'])->name('registration.register-patient');
Route::get('/registration/{patient}/check-poli-status', [RegistrationController::class, 'checkPatientPoliStatus'])->name('registration.check-poli-status');
Route::get('/registration/get-registrations', [RegistrationController::class, 'getRegistrations'])->name('registration.get-registrations');
```

### 3. Component React Baru

```
resources/js/Pages/Registration/Index.jsx
```

### 4. Menu Navigation

```php
// database/seeders/MenuSeeder.php
Menu::create([
    'name' => 'Pendaftaran Pasien',
    'slug' => 'pendaftaran-pasien',
    'icon' => 'fas fa-clipboard-list',
    'route' => 'registration.index',
    'parent_id' => $registration->id,
    'sort_order' => 1,
    'is_active' => true,
    'permission_name' => 'registration.view',
    'description' => 'Pendaftaran pasien ke poliklinik'
]);
```

## API Endpoints

### 1. GET `/registration`

Menampilkan halaman utama pendaftaran

### 2. GET `/registration/search-patients`

Mencari pasien berdasarkan keyword

- **Parameters**: `search` (string)
- **Response**: Array of patients

### 3. POST `/registration/{patient}/register`

Mendaftarkan pasien untuk pemeriksaan

- **Parameters**:
  - `kd_dokter` (required)
  - `kd_poli` (required)
  - `kd_pj` (required)
  - `p_jawab` (required)
  - `almt_pj` (required)
  - `hubunganpj` (required)
- **Features**:
  - Otomatis update umur pasien
  - Generate nomor registrasi dan rawat
  - Hitung biaya registrasi berdasarkan status poli

### 4. GET `/registration/{patient}/check-poli-status`

Mengecek status pasien di poliklinik tertentu

- **Parameters**: `kd_poli` (required)
- **Response**: Status poli dan biaya registrasi

### 5. GET `/registration/get-registrations`

Mendapatkan daftar registrasi dengan filter

- **Parameters**:
  - `date` (optional, default: today)
  - `kd_poli` (optional)
  - `kd_dokter` (optional)

### 6. POST `/registration/cancel` ⭐ **NEW**

Membatalkan registrasi pasien

- **Body Parameters**:
  - `no_rawat` (required, string) - Nomor rawat dengan format "YYYY/MM/DD/XXXXXX"
- **Logic**:
  - Hanya dapat membatalkan registrasi dengan status "Belum"
  - Mengubah status registrasi menjadi "Batal"
  - Validasi format nomor rawat
- **Response**: Success/error message

## Desain UI

### Warna Utama

- **Hitam**: `bg-black`, `text-black` untuk button utama
- **Putih**: `bg-white`, `text-white` untuk background dan text
- **Gray**: Berbagai shade gray untuk border dan secondary elements
- **Blue**: `bg-blue-600` untuk accent dan focus states

### Komponen UI

- **Search Input**: Full width dengan icon search dan loading indicator
- **Patient Cards**: Hover effects dan informasi lengkap pasien
- **Registration Cards**: Status badges dan informasi registrasi
- **Modal**: Centered dengan backdrop dan form validation
- **Filters**: Grid layout dengan dropdown dan date picker

## Cara Penggunaan

### 1. Akses Halaman

Buka menu "Registrasi" → "Pendaftaran Pasien" di sidebar

### 2. Cari Pasien

Ketik nama, nomor RM, atau nomor KTP di kolom pencarian

### 3. Pilih Pasien

Klik tombol "Pilih" pada hasil pencarian

### 4. Isi Form Registrasi

- Pilih dokter
- Pilih poliklinik (akan menampilkan status dan biaya otomatis)
- Pilih penanggung jawab
- Isi data penanggung jawab

### 5. Simpan Registrasi

Klik "Simpan Registrasi" untuk mendaftarkan pasien

### 6. Lihat Hasil

Registrasi baru akan muncul di daftar registrasi di sisi kanan

## Fitur Tambahan

### 1. Responsive Design

Layout akan menyesuaikan pada layar mobile dengan stack vertical

### 2. Dark Mode Support

Mendukung dark mode dengan class `dark:` pada semua komponen

### 3. Real-time Updates

Daftar registrasi akan diupdate otomatis setelah pendaftaran berhasil

### 4. Error Handling

Toast notification untuk success dan error messages

### 5. Loading States

Loading indicators pada pencarian dan form submission

## Integrasi dengan Module Pasien

Module ini menggunakan logik yang sama dengan module pasien untuk:

- Validasi form
- Pengecekan status poli
- Perhitungan biaya registrasi
- Generate nomor registrasi dan rawat
- Penyimpanan data ke database

## Keamanan

### 1. Validasi Input

Semua input divalidasi di controller menggunakan Laravel validation

### 2. CSRF Protection

Menggunakan CSRF token untuk semua form submission

### 3. Permission Based

Menu hanya muncul untuk user dengan permission `registration.view`

### 4. Sanitization

Input di-sanitize untuk mencegah XSS attacks

## Testing

### 1. Manual Testing

- Test pencarian pasien
- Test pendaftaran dengan berbagai skenario
- Test filter registrasi
- Test responsive design

### 2. Browser Compatibility

- Chrome/Chromium
- Firefox
- Safari
- Edge

## Maintenance

### 1. Database

Module ini menggunakan tabel existing:

- `pasien` untuk data pasien
- `reg_periksa` untuk data registrasi
- `dokter`, `poliklinik`, `penjab` untuk referensi

### 2. Performance

- Debounce pada pencarian untuk mengurangi request
- Pagination pada hasil registrasi
- Efficient database queries dengan relationships

### 3. Monitoring

- Log semua registrasi baru
- Monitor performance API endpoints
- Track user interactions

## Future Enhancements

### 1. Print Registration

Fitur untuk mencetak kartu registrasi

### 2. Queue Management

Integrasi dengan sistem antrian

### 3. SMS/WhatsApp Notification

Notifikasi otomatis ke pasien

### 4. Barcode/QR Code

Generate barcode untuk registrasi

### 5. Advanced Filters

Filter berdasarkan status bayar, jenis pasien, dll.

---

**Dibuat**: September 2025
**Bahasa**: Indonesia (sesuai permintaan user)
**Framework**: Laravel + Inertia.js + React
**UI**: Tailwind CSS dengan tema hitam-putih profesional
