# Sirkulasi Obat, Alkes & BHP Medis — Panduan Pengguna

## Tujuan
- Menyajikan pergerakan persediaan obat/alkes/BHP dalam rentang tanggal tertentu per lokasi.
- Membantu melihat stok awal periode, transaksi masuk/keluar, stok akhir periode, dan nilai aset persediaan.

## Filter yang Tersedia
- Jenis, Kategori, Golongan: menyaring kelompok barang.
- Kata Kunci: cari berdasarkan kode atau nama barang.
- Per Lokasi: memilih bangsal/gudang yang dianalisis.
- Mode Batch: aktif/nonaktif untuk memfilter data berdasarkan nomor batch dan faktur.
- Tanggal Awal & Tanggal Akhir: menentukan rentang analisis periode.
- Tombol Cari: memuat ulang data sesuai filter.
- Tombol Reset: mengembalikan filter ke default (rentang bulan berjalan, lokasi AP).

## Penjelasan Kolom Tabel
- Kode Barang: kode unik barang.
- Nama Barang: nama barang.
- Satuan: satuan pengukuran barang.
- Tgl Opname: tanggal opname yang dipakai sebagai referensi stok awal periode.
  - Jika ada opname dalam periode, diambil opname pertama dalam rentang tanggal.
  - Jika tidak ada opname dalam periode, diambil opname terakhir sebelum Tanggal Awal.
  - Jika tidak ada opname sama sekali, ditampilkan Tanggal Awal sebagai fallback.
- Nilai Aset: `harga satuan × stok akhir periode`.
- Stok Awal: nilai stok pada awal periode.
  - Sumber utama: stok dari opname pertama dalam periode (atau opname terakhir sebelum periode jika tidak ada dalam periode).
  - Jika tidak ada data opname sama sekali, stok awal dihitung dari koreksi aritmetika terhadap stok gudang terkini dan transaksi periode, lalu dinormalisasi minimal 0.
- Pengadaan: pembelian (detail beli) yang menambah stok pada periode.
- Penerimaan: pemesanan/terima barang (detail pesan) yang menambah stok pada periode.
- Penjualan: transaksi penjualan (status “Sudah Dibayar”) yang mengurangi stok.
- Ke Pasien: pemberian obat ke pasien (rawat jalan/ranap) yang mengurangi stok.
- Piutang Jual: penjualan piutang yang mengurangi stok.
- Retur Beli: retur ke pemasok yang mengurangi stok.
- Retur Jual: retur dari pelanggan yang menambah stok.
- Retur Piutang: retur piutang yang menambah stok.
- Pengambilan UTD: pengambilan medis (UTD) yang mengurangi stok.
- Stok Keluar Medis: pengeluaran medis yang mengurangi stok.
- Resep Pulang: obat untuk resep pulang yang mengurangi stok.
- Mutasi Masuk: mutasi antar gudang/lokasi yang menambah stok.
- Mutasi Keluar: mutasi antar gudang/lokasi yang mengurangi stok.
- Hibah: penerimaan hibah yang menambah stok.
- Stok Terakhir: `stok awal + (total masuk) − (total keluar)` dalam periode.

## Cara Menggunakan
- Pilih `Per Lokasi` sesuai gudang/bangsal yang diinginkan.
- Tentukan `Tanggal Awal` dan `Tanggal Akhir` untuk periode analisis.
- Opsional: setel `Jenis`, `Kategori`, `Golongan`, dan `Kata Kunci` untuk mempersempit hasil.
- Tentukan `Mode Batch` bila ingin analisis per batch/faktur; biarkan nonaktif untuk agregasi non-batch.
- Klik `Cari` untuk memuat data, atau `Reset` untuk kembali ke default.

## Contoh Membaca Data
- Barang 2018001:
  - Stok Awal: 50, Tgl Opname: 2025-12-07 (opname pertama dalam periode), Transaksi masuk/keluar: 0, Stok Terakhir: 50.
- Barang A000000001:
  - Tidak ada opname, Stok Awal ditetapkan 0 (fallback kalkulasi), Pengadaan: 40, Ke Pasien: 1, Stok Terakhir: 39, Tgl Opname: fallback ke Tanggal Awal.

## Catatan & Tips
- Semua transaksi dihitung dalam rentang tanggal yang dipilih dan disinkronkan dengan stok akhir periode.
- Nilai Aset dihitung dari stok akhir periode, bukan stok gudang global.
- Jika angka terasa tidak sesuai, periksa filter `Per Lokasi`, `Tanggal`, dan `Mode Batch`.
- `Stok Awal` tanpa opname akan bernilai minimal 0 agar tidak negatif.

## Troubleshooting
- Data kosong: pastikan lokasi dan rentang tanggal benar, lalu klik `Cari`.
- Tgl Opname tampil sebagai tanggal awal: artinya tidak ada data opname dalam periode maupun sebelum periode.
- Stok Awal nol: tanpa opname, stok awal mengikuti fallback kalkulasi yang dinormalisasi.

## Referensi Teknis (untuk admin)
- Pengambilan opname pertama periode: `app/Http/Controllers/Farmasi/SirkulasiObatController.php:119`
- Fallback opname sebelum periode: `app/Http/Controllers/Farmasi/SirkulasiObatController.php:147-191`
- Perhitungan stok akhir periode & nilai aset: `app/Http/Controllers/Farmasi/SirkulasiObatController.php:484-496`
- Tampilan kolom di UI: `resources/js/Pages/farmasi/SirkulasiObat.jsx:431-439, 569-571`

## Catatan: Cek Stok Obat (Ringkas per Kode Barang)
- Halaman `Cek Stok Obat` menampilkan total stok secara ringkas per `kode_brng` pada lokasi yang dipilih (default diarahkan ke `AP — Apotek` bila tersedia).
- Tombol “Cari” akan memanggil endpoint `GET /api/opname/data-barang` dengan parameter:
  - `kd_bangsal`: kode lokasi/gudang yang dipilih
  - `search`: kata kunci (opsional, minimal 2 karakter)
  - `aggregate=true`: agar stok dijumlahkan per `kode_brng` (bukan per-batch/faktur)
- Kolom yang tampil:
  - `Kode Barang`, `Nama Barang`, `Kategori/Jenis`, `Satuan`, `Harga`, dan `Stok` (stok merupakan hasil penjumlahan dari semua baris gudang per-batch/faktur di lokasi tersebut).
- Jika diperlukan tampilan detail per-batch/faktur, gunakan halaman “Stok Opname” atau dapat ditambahkan opsi tampilan per-batch di halaman ini.
- Rujukan teknis:
  - Pemanggilan API dan agregasi di klien: `resources/js/Pages/farmasi/CekStok.jsx:81-118`
  - Agregasi stok di backend (SUM + GROUP BY saat `aggregate=true`): `app/Http/Controllers/OpnameController.php:75-83`
  - Definisi route API: `routes/api.php:186-195`
  - Proxy dev ke backend (untuk pengembangan lokal): `vite.config.js:52-77`
