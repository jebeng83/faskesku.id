# Arsitektur Modul Rawat Jalan & Registrasi — Ringkas untuk Developer

Dokumen ini merangkum arsitektur, alur navigasi, integrasi eksternal, dan troubleshooting umum untuk modul Rawat Jalan dan Registrasi.

## Komponen Utama
- Controllers:
  - App\Http\Controllers\RawatJalan\RawatJalanController
  - App\Http\Controllers\RegistrationController
  - App\Http\Controllers\Pcare\MobileJknController (integrasi Mobile JKN)
- Models:
  - App\Models\RawatJalan\RawatJalan (tabel: reg_periksa)
  - App\Models\RegPeriksa (tabel: reg_periksa)
  - App\Models\Patient (tabel: pasien)
  - App\Models\Dokter, App\Models\Poliklinik, App\Models\Penjab
- Frontend Pages (Inertia + React):
  - resources/js/Pages/RawatJalan/* (Index, Create, Edit, Show, Lanjutan)
  - resources/js/Pages/Registration/Index.jsx

## Routing & Navigasi
- Prefix rute: "/rawat-jalan" (lihat routes/web.php).
- Contoh rute penting:
  - rawat-jalan.index
  - rawat-jalan.lanjutan
  - rawat-jalan.riwayat
- Best Practice: gunakan Ziggy route() alih-alih hardcoded path.
  - Contoh perbaikan: Link ke lanjutan diganti dari "/rawat-jalan/lanjutan?t=..." menjadi `route('rawat-jalan.lanjutan', { t })`.
- Token navigasi: gunakan base64-url (param `t`) untuk membawa `no_rawat` dan `no_rkm_medis` secara ringkas.
  - Dekode token dilakukan di server (RawatJalanController::lanjutan).

## Filter & State
- Helper: resources/js/tools/rawatJalanFilters.js
  - Fungsi: `getRawatJalanFilters`, `setRawatJalanFilters`, `clearRawatJalanFilters`.
  - Menggantikan akses langsung ke localStorage untuk `kd_dokter` dan `kd_poli`.
- RawatJalan/Index.jsx:
  - Pastikan set/get/clear filter menggunakan helper tersebut.
  - Query server mendukung filter tanggal, dokter, poli, status, status bayar, nama pasien.

## Integrasi Mobile JKN (Antrean)
- Endpoint frontend: `/api/mobilejkn/antrean/add` (axios.post)
- Server: MobileJknController::addAntrean
  - Validasi input, mapping pasien/dokter/poli, penentuan jam praktik, pembuatan nomor antrean.
  - Normalisasi HTTP status berdasarkan `metaData.code` dari API Mobile JKN.
  - Logging terstruktur: simpan context penting (no_rkm_medis, kd_poli, kd_dokter, antrean_no, response metadata).
- UI Popup (Registration/Index.jsx):
  - Distandarisasi: hanya tampilkan status (success/error), pesan (metadata), dan raw data jika perlu.
  - Field teknis seperti endpoint/method disembunyikan.

## Performa & Database
- Tabel utama: `reg_periksa`.
- Index yang ditambahkan (lihat migration: `2025_11_09_000001_add_indexes_to_reg_periksa.php`):
  - (tgl_registrasi)
  - (tgl_registrasi, kd_dokter)
  - (tgl_registrasi, kd_poli)
  - (no_rkm_medis, tgl_registrasi, jam_reg)
  - (tgl_registrasi, jam_reg)
- Relasi tambahan pada model RawatJalan:
  - `poliklinik()` dan `penjab()` untuk mendukung eager loading.
- Rekomendasi:
  - Gunakan eager loading bila hanya membutuhkan nama relasi (nm_dokter, nm_poli, png_jawab) secara massal.
  - Evaluasi index tambahan dengan EXPLAIN sebelum ditambahkan (mis. komposit dengan `stts`).

## Troubleshooting Navigasi & Filter
- Link tidak sesuai (404 atau tidak memuat data):
  - Pastikan menggunakan `route('rawat-jalan.*')` via Ziggy.
  - Periksa token `t`: format base64-url; server melakukan padding dan decode.
  - Cek routes: `php artisan route:list | grep rawat-jalan`.
- Filter tidak persist:
  - Pastikan import dan penggunaan helper `rawatJalanFilters`.
  - Hindari akses langsung localStorage di komponen; gunakan API helper.
- Popup BPJS tidak informatif:
  - Gunakan `openBpjsPopup({ status, message, raw })` berfokus pada metadata.
  - Periksa MobileJKNController logging untuk jejak eksekusi di server.

## Verifikasi Pasca Perubahan
1) Jalankan migrasi index secara spesifik (hindari konflik):
   `php artisan migrate --force --path=database/migrations/2025_11_09_000001_add_indexes_to_reg_periksa.php`
2) Buka halaman:
   - Rawat Jalan Index — verifikasi navigasi dan filter.
   - Registration — verifikasi popup BPJS dan alur antrean.
3) Gunakan EXPLAIN pada query berat untuk memastikan index terpakai.

## Catatan
- Jika ada migrasi lain yang gagal (tabel sudah ada), gunakan migrasi per-path untuk menghindari bentrok.
- Dokumentasi tambahan terkait modul tersedia di folder `docs/` (README_RAWAT_JALAN.md, REGISTRATION_MODULE_README.md, dll.).

## Changelog Singkat
- Navigasi Rawat Jalan: hardcoded path diganti Ziggy route.
- Mobile JKN: normalisasi status HTTP, logging terstruktur, popup disederhanakan.
- Performa: index komposit pada reg_periksa; relasi model ditambah untuk eagerly loading.