# Atasi 404

Panduan singkat mengatasi error 404 pada fitur atau rute yang memakai parameter dinamis seperti `no_rawat` dan membutuhkan akses publik (mis. Validasi TTD Surat Sakit).

## Gejala
- Akses ke URL mengembalikan 404 atau redirect ke login meski ingin endpoint publik.
- Contoh: `/rawat-jalan/surat-sakit/20251231000001/verify?t=...`.

## Penyebab Umum
- Parameter `no_rawat` mengandung karakter `/` sehingga path pecah dan tidak cocok dengan rute standar.
- Rute diletakkan dalam grup `auth` sehingga pengguna publik diarahkan ke login.

## Solusi
- Publikasikan rute verifikasi di luar middleware `auth`.
- Tambahkan wildcard pada parameter rute untuk menerima karakter `/`.
- Di backend, normalisasi `no_rawat` (mis. `YYYYMMDDNNNNNN` → `YYYY/MM/DD/NNNNNN`) dan siapkan fallback pencarian dari token.

## Implementasi (contoh)
- Rute publik verifikasi:
  - `routes/web.php` menambahkan:
    - `Route::get('rawat-jalan/surat-sakit/{no_rawat}/verify', ...)` dengan `->where('no_rawat', '.*')` di area publik.
  - Rute surat sehat/sakit memakai `->where('no_rawat', '.*')` untuk konsisten menerima `/`.
- Backend verifikasi (`RawatJalanController::verifySuratSakit`):
  - Normalisasi `no_rawat` tanpa `/` → `YYYY/MM/DD/SEQ`.
  - Fallback: cari berdasar `no_surat` dari token atau `MR + tanggal surat/mulai/akhir`.

## Uji Coba
- Reload Octane agar rute baru aktif: `php artisan octane:reload`.
- Coba akses publik:
  - `curl -H "Accept: application/json" "http://127.0.0.1:8000/rawat-jalan/surat-sakit/20251231000001/verify?t=<TOKEN>"`.
- Alternatif query-style (menghindari `/` di path):
  - `GET /api/rawat-jalan/surat-sakit/verify?no_rawat=20251231000001&t=<TOKEN>`.

## Catatan
- Gunakan wildcard `->where('no_rawat', '.*')` untuk semua rute yang menerima `no_rawat` di path.
- Pastikan endpoint publik tidak berada di dalam grup `Route::middleware('auth')`.
