# Dashboard

Panduan singkat penggunaan halaman Dashboard aplikasi. Halaman ini menjadi pusat informasi cepat dan akses ke modul-modul utama.

## Ringkasan Fitur
- Navigasi cepat melalui Top Navbar, termasuk tombol `DOC` untuk membuka dokumentasi.
- Panel informasi dengan statistik, tren, dan pintasan ke modul.
- Marquee informasi `SIP Pegawai` yang akan habis ≤ 30 hari.
- Peta lokasi fasilitas kesehatan via Google Maps di atas footer.
- Sticky Notes di pojok kanan atas untuk menyimpan catatan pribadi.

## Top Navbar
- Shortcut Cepat untuk membuka halaman layanan sesuai dengan Hak Akses
- Petugas Pendaftaran ====> Pendaftaran
- Perawat / dokter / Bidan / Nakes Lain =====> Rawat Jalan
- Petugas Laboratorium ====> Laboratorium
- Petugas Farmasi =====> Farmasi
- Petugas Kasir ====> Kasir


## Marquee SIP Pegawai
- Menampilkan daftar pegawai yang masa berlaku SIP akan habis dalam 30 hari.
- Sumber data dari `sip_pegawai` (status aktif) bergabung dengan `pegawai` untuk mendapatkan `nama` dan `jabatan`.
- Format tampilan: `nama · jabatan · berlaku s/d YYYY-MM-DD (X hari lagi)`.

### Cara Membaca
- Jika muncul nama Anda, segera lakukan perpanjangan SIP.
- Jika tidak ada data, berarti tidak ada yang akan habis dalam rentang waktu 30 hari.

## Peta Lokasi
- Peta Google Maps diletakkan di atas footer.
- Titik koordinat diambil dari konfigurasi `.env`:
  - `LATITUDE=-7.535561951939349`
  - `LONGITUDE=111.05827946682133`
- Koordinat dapat diperbarui tanpa mengubah kode, cukup ubah nilai di `.env`.

## Sticky Notes
- Catatan kecil pribadi yang tampil di pojok kanan atas (seperti kertas ditancap paku merah).
- Catatan disimpan di peramban (`localStorage`), sehingga tetap ada saat halaman di-reload.

### Menambahkan Catatan
- Isi teks di kolom `Tulis catatan…`.
- Klik tombol `Tambah`.
- Hapus catatan dengan tombol `×` di tiap item.

## Tips Penggunaan
- Gunakan `DOC` saat membutuhkan panduan penggunaan menu.
- Periksa marquee secara berkala agar tidak terlambat memperpanjang SIP.
- Pastikan `.env` memiliki koordinat yang benar agar peta menunjukkan lokasi yang akurat.
- Catatan di Sticky Notes hanya tersimpan di perangkat Anda. Untuk catatan tim, gunakan modul yang disediakan aplikasi.

## Bantuan
- Hubungi admin@faskesku.id jika ada fitur yang tidak tampil atau Anda membutuhkan hak akses tambahan.
