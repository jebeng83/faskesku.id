# Inventori Farmasi — Sisa Stok

Dokumen ini merangkum fungsi "Sisa Stok Obat, Alkes & BHP Medis" yang ada pada aplikasi desktop Java (berkas `DlgSisaStok.java` dan `DlgSisaStok.form`) dan menerjemahkannya menjadi spesifikasi pengembangan di aplikasi web Laravel + React saat ini.

## Ringkasan Fungsional
- Menampilkan sisa stok per gudang/bangsal untuk setiap barang (`databarang`).
- Kolom dinamis untuk setiap gudang aktif, ditambah kolom `Total` dan `Nilai Aset`.
- Mendukung filter berdasarkan `Jenis`, `Kategori`, `Golongan`, serta kata kunci pada `kode_brng` atau `nama_brng`.
- Menghitung nilai aset dengan harga dasar yang dikendalikan konfigurasi (`hppfarmasi`).
- Mode batch mempengaruhi cara agregasi stok dari tabel `gudangbarang`.

## Sumber Data & Kolom
- Tabel: `databarang`, `jenis`, `golongan_barang`, `kategori_barang`, `gudangbarang`, `bangsal`.
- Gudang aktif: `bangsal.status='1'` dan `bangsal.kd_bangsal<>'-'`.
- Kolom pada output:
  - Identitas barang: `kode_brng`, `nama_brng`, `kode_sat`.
  - `Harga Satuan` = alias kolom harga dasar dari konfigurasi `hppfarmasi`.
  - Sisa stok per gudang (satu kolom per `kd_bangsal`), `Total`, dan `Nilai Aset`.

Referensi kode:
- Daftar gudang aktif: `public/Sementara/Farmasi/DlgSisaStok.java:612`–`619`.
- Mode batch (memilih query stok): `public/Sementara/Farmasi/DlgSisaStok.java:639`–`643`.
- Query daftar barang + filter: `public/Sementara/Farmasi/DlgSisaStok.java:645`–`651`.
- Agregasi stok per gudang: `public/Sementara/Farmasi/DlgSisaStok.java:667`–`671`.
- Perhitungan total & nilai aset: `public/Sementara/Farmasi/DlgSisaStok.java:672`–`676`, `681`–`686`.
- Lebar tabel dinamis: `public/Sementara/Farmasi/DlgSisaStok.java:705`–`710`.
- Judul dan kontrol UI (form): `public/Sementara/Farmasi/DlgSisaStok.java:239`–`242`, `351`–`398`.

## Filter
- `Jenis` berdasarkan `jenis.nama`.
- `Kategori` berdasarkan `kategori_barang.nama`.
- `Golongan` berdasarkan `golongan_barang.nama`.
- Kata kunci: cocokkan ke `databarang.kode_brng` atau `databarang.nama_brng`.

## Algoritma Perhitungan
1. Ambil daftar gudang aktif (`kd_bangsal`, `nm_bangsal`).
2. Ambil daftar barang sesuai filter dengan join ke `jenis`, `golongan_barang`, `kategori_barang`.
3. Untuk setiap barang dan setiap gudang:
   - Jika mode batch aktif: jumlahkan `stok` di `gudangbarang` dengan `no_batch<>''` dan `no_faktur<>''`.
   - Jika mode batch nonaktif: jumlahkan `stok` dengan `no_batch=''` dan `no_faktur=''`.
4. Hitung `Total` stok per barang (penjumlahan semua gudang).
5. Hitung `Nilai Aset` per barang = `Harga Satuan` × `Total`.
6. Tampilkan tabel HTML dengan kolom dinamis (lebih lebar jika gudang banyak).

## Konfigurasi
- `aktifkanbatch`: diambil dari konfigurasi database, menentukan mode agregasi stok batch/nonbatch (`public/Sementara/Farmasi/DlgSisaStok.java:45`–`50`, `639`–`643`).
- `hppfarmasi`: nama kolom harga dasar yang digunakan untuk `Harga Satuan` (`public/Sementara/Farmasi/DlgSisaStok.java:193`–`198`, `645`–`651`).

## Rencana Implementasi Web (Laravel + React)
### Endpoint API
- `GET /api/inventori/sisa-stok`
- Query params:
  - `jenis` (string, opsional)
  - `kategori` (string, opsional)
  - `golongan` (string, opsional)
  - `q` (string, kata kunci untuk `kode_brng` atau `nama_brng`)
  - `batch` (`on|off`, opsional; default mengikuti konfigurasi aplikasi)
- Response (JSON):
  - `gudangs`: array `{ kd_bangsal, nm_bangsal }`
  - `items`: array per barang:
    - `kode_brng`, `nama_brng`, `kode_sat`, `harga_satuan`
    - `stok_per_gudang`: objek `{ [kd_bangsal]: number }`
    - `total`: number
    - `nilai_aset`: number

### Query Referensi (SQL)
- Gudang aktif:
```sql
SELECT kd_bangsal, nm_bangsal
FROM bangsal
WHERE status = '1' AND kd_bangsal <> '-';
```
- Daftar barang + filter:
```sql
SELECT db.kode_brng,
       db.nama_brng,
       db.kode_sat,
       /* kolom harga ditentukan oleh konfigurasi hppfarmasi */ dasar AS harga_satuan
FROM databarang db
JOIN jenis j ON db.kdjns = j.kdjns
JOIN golongan_barang g ON db.kode_golongan = g.kode
JOIN kategori_barang k ON db.kode_kategori = k.kode
WHERE j.nama LIKE :jenis
  AND k.nama LIKE :kategori
  AND g.nama LIKE :golongan
  AND (db.kode_brng LIKE :q OR db.nama_brng LIKE :q)
ORDER BY db.kode_brng;
```
- Agregasi stok per gudang (mode batch ON):
```sql
SELECT SUM(stok)
FROM gudangbarang
WHERE kode_brng = :kode_brng
  AND kd_bangsal = :kd_bangsal
  AND no_batch <> ''
  AND no_faktur <> '';
```
- Agregasi stok per gudang (mode batch OFF):
```sql
SELECT SUM(stok)
FROM gudangbarang
WHERE kode_brng = :kode_brng
  AND kd_bangsal = :kd_bangsal
  AND no_batch = ''
  AND no_faktur = '';
```

Catatan: Untuk performa, pertimbangkan conditional aggregation atau materialized view jika jumlah gudang besar.

### UI React
- Halaman di `Farmasi > Laporan > Mutasi & Stok` atau halaman khusus "Sisa Stok".
- Kontrol filter: `Jenis`, `Kategori`, `Golongan` (menggunakan komponen pencarian referensi), dan input kata kunci.
- Tabel dengan kolom dinamis (sticky kolom identitas barang, scroll horizontal untuk gudang).
- Aksi: ekspor CSV/HTML, cetak.

### Pertimbangan Kinerja
- Index yang disarankan:
  - `gudangbarang(kode_brng, kd_bangsal, no_batch, no_faktur)`
  - `bangsal(status, kd_bangsal)`
  - `databarang(kdjns, kode_golongan, kode_kategori, kode_brng, nama_brng)`
- Hindari N×M query: gunakan join + grup jika memungkinkan, atau batch queries per gudang.
- Batasi hasil dengan pagination atau server-side chunking jika dataset besar.

### Pengujian
- Seed beberapa gudang (aktif/nonaktif) dan beberapa barang lintas jenis/kategori/golongan.
- Uji kedua mode batch (`on`/`off`) pada agregasi stok.
- Verifikasi konsistensi `Total` dan `Nilai Aset`.
- Uji performa saat jumlah gudang tinggi.

### Integrasi & Keamanan
- `harga_satuan` hanya ditampilkan kepada role yang berhak; cek kebijakan akses sebelum menampilkan nilai aset.
- Gunakan konfigurasi aplikasi untuk `hppfarmasi` dan `aktifkanbatch` agar konsisten lintas modul.

---
## Sirkulasi Barang
- Menampilkan ringkasan per barang untuk periode tanggal: `Stok Terakhir`, `Pengadaan` (pembelian), `Penerimaan` (pemesanan), `Penjualan`, `Ke Pasien`, `Piutang Jual`, `Retur Beli`, `Retur Jual`, `Retur Piutang`, `Pengambilan UTD`, `Stok Keluar Medis`, `Resep Pulang`, `Mutasi Masuk`, `Mutasi Keluar`, `Hibah`.
- Mendukung filter `Jenis`, `Kategori`, `Golongan`, serta kata kunci pada `kode_brng`/`nama_brng`.
- Mendukung tampilan per lokasi gudang (bangsal) melalui aksi "Tampilkan Per Lokasi".
- Nilai aset pada kolom `Stok Terakhir` dihitung dari `stok × hppfarmasi`.

### Sumber Data & Kolom
- Tabel sumber utama per kolom:
  - `Stok Terakhir`: `gudangbarang` × `databarang` (nilai aset via `hppfarmasi`).
  - `Pengadaan`: `pembelian` × `detailbeli`.
  - `Penerimaan`: `pemesanan` × `detailpesan`.
  - `Penjualan`: `penjualan` × `detailjual` (status `Sudah Dibayar`).
  - `Ke Pasien`: `detail_pemberian_obat` (total dikurangi `embalase`+`tuslah`).
  - `Piutang Jual`: `piutang` × `detailpiutang`.
  - `Retur Beli`: `returbeli` × `detreturbeli`.
  - `Retur Jual`: `returjual` × `detreturjual`.
  - `Retur Piutang`: `returpiutang` × `detreturpiutang`.
  - `Pengambilan UTD`: `utd_pengambilan_medis`.
  - `Stok Keluar Medis`: `pengeluaran_obat_bhp` × `detail_pengeluaran_obat_bhp`.
  - `Resep Pulang`: `resep_pulang`.
  - `Mutasi Masuk/Keluar`: `mutasibarang` (`kd_bangsalke` / `kd_bangsaldari`).
  - `Hibah`: `hibah_obat_bhp` × `detailhibah_obat_bhp`.

### Filter & Per Lokasi
- Filter barang: join `databarang` ↔ `jenis` ↔ `golongan_barang` ↔ `kategori_barang`, dengan kata kunci untuk `kode_brng`/`nama_brng`.
- Per lokasi: semua agregasi di atas memiliki varian query dengan tambahan kondisi `kd_bangsal` sesuai lokasi terpilih.

### Algoritma Perhitungan
- Ambil daftar barang sesuai filter (`jenis`, `kategori`, `golongan`, kata kunci, urut `kode_brng`).
- Tentukan query stok berdasarkan mode batch:
  - Batch ON: `no_batch<>'' AND no_faktur<>''`.
  - Batch OFF: `no_batch='' AND no_faktur=''`.
- Untuk setiap barang, hitung agregasi jumlah dan total nilai per sumber data pada rentang tanggal yang dipilih.
- Jika mode Per Lokasi aktif, tambahkan syarat `kd_bangsal`/`kd_bangsal_dr`/`kd_bangsal_ke` sesuai tabel.
- Tampilkan satu baris per barang, dengan format `jumlah (total)` untuk tiap kolom; baris rekap total disisipkan di akhir.

### Grafik (Desktop)
- Menu grafik 10 besar/tersedikit untuk: Penjualan, Pembelian, Piutang, Resep ke Pasien.
- Grafik menggunakan rentang tanggal yang sama dengan filter halaman.

### Cetak (Desktop)
- Tombol `Print` menulis data ke tabel `temporary` lalu menghasilkan laporan JasperReports:
  - Umum: `rptSirkulasi.jasper`.
  - Per lokasi: `rptSirkulasi3.jasper` dengan parameter `bangsal`.

### Konfigurasi
- `aktifkanbatch`: menentukan mode query stok batch/nonbatch.
- `hppfarmasi`: nama kolom harga yang dipakai untuk menghitung nilai aset.

### Referensi Kode (Desktop)
- Header kolom tabel: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:61`–`63`.
- Filter barang (join + kata kunci): `public/Sementara/Farmasi/DlgSirkulasiBarang.java:972`–`978`.
- Inisialisasi konfigurasi: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:146`–`151`, `public/Sementara/Farmasi/DlgSirkulasiBarang.java:258`–`260`.
- Query stok batch/nonbatch: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1001`–`1009`.
- Agregasi per sumber (umum):
  - Pembelian: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1031`–`1040`
  - Pemesanan: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1057`–`1066`
  - Penjualan: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1083`–`1092`
  - Piutang: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1109`–`1118`
  - Retur Beli: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1135`–`1144`
  - Retur Jual: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1161`–`1170`
  - Retur Piutang: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1186`–`1195`
  - Ke Pasien: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1211`–`1219`
  - Pengambilan UTD: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1235`–`1243`
  - Stok Keluar Medis: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1259`–`1268`
  - Resep Pulang: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1284`–`1291`
  - Hibah: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1307`–`1316`
- Agregasi per sumber (per lokasi):
  - Stok: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1426`–`1433`
  - Pembelian: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1464`–`1474`
  - Pemesanan: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1492`–`1502`
  - Penjualan: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1519`–`1529`
  - Piutang: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1546`–`1556`
  - Retur Beli: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1573`–`1583`
  - Retur Jual: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1600`–`1610`
  - Retur Piutang: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1626`–`1636`
  - Ke Pasien: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1652`–`1661`
  - Pengambilan UTD: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1677`–`1686`
  - Stok Keluar Medis: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1702`–`1712`
  - Resep Pulang: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1728`–`1736`
  - Mutasi Masuk: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1754`–`1762`
  - Mutasi Keluar: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1778`–`1786`
  - Hibah: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1803`–`1813`
- Penambahan baris data & rekap: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1336`–`1352`, `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1372`–`1381`; varian per lokasi `public/Sementara/Farmasi/DlgSirkulasiBarang.java:1832`–`1877`.
- Cetak: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:707`–`742`.
- Menu grafik & event: `public/Sementara/Farmasi/DlgSirkulasiBarang.java:806`–`880`, form: `public/Sementara/Farmasi/DlgSirkulasiBarang.form:25`–`258`.

#### Varian Desktop: DlgSirkulasiBarang2
- Header kolom tabel: `public/Sementara/Farmasi/DlgSirkulasiBarang2.java:58`–`62`.
- Pengaturan lebar kolom: `public/Sementara/Farmasi/DlgSirkulasiBarang2.java:70`–`81`.
- Pencarian cepat (auto cari saat panjang kata kunci > 2 dan `CARICEPAT=aktif`): `public/Sementara/Farmasi/DlgSirkulasiBarang2.java:85`–`106`.
- Pemilihan bangsal (lokasi) dan pemanggilan proses per lokasi: window listener men-set `lokasi` dan memanggil `prosesCari2(kd_bangsal)` ketika dialog ditutup: `public/Sementara/Farmasi/DlgSirkulasiBarang2.java:108`–`136`, detail set nilai: `public/Sementara/Farmasi/DlgSirkulasiBarang2.java:117`–`121`.
- Pemilihan filter referensi: jenis/kategori/golongan melalui dialog pencarian masing-masing: `public/Sementara/Farmasi/DlgSirkulasiBarang2.java:138`–`200`.

Catatan: Berkas `.form` terkait dialog ini saat ini kosong atau tidak memuat isi terstruktur di repositori (`public/Sementara/Farmasi/DlgSirkulasiBarang2.form`). Implementasi UI web mengikuti pola React yang sudah ada.

---
### Perluasan API Sirkulasi Barang (Backend)
- Controller web saat ini: `app/Http/Controllers/Farmasi/SirkulasiObatController.php`.
  - Ekstraksi parameter: `app/Http/Controllers/Farmasi/SirkulasiObatController.php:12`–`22`.
  - Paginasi dan daftar barang: `app/Http/Controllers/Farmasi/SirkulasiObatController.php:33`–`54`.
  - Agregasi stok terakhir dan nilai aset: `app/Http/Controllers/Farmasi/SirkulasiObatController.php:57`–`75`.
  - Placeholder kolom lain (nilai saat ini 0): `app/Http/Controllers/Farmasi/SirkulasiObatController.php:82`–`96`.

Rencana pengayaan kolom berbasis rentang tanggal (`tgl_awal`–`tgl_akhir`) dan lokasi (`kd_bangsal`):
- `Pengadaan` (pembelian): join `pembelian` × `detailbeli`, filter tanggal, opsi lokasi via `kd_bangsal` pada penerimaan ke gudang.
- `Penerimaan` (pemesanan): `pemesanan` × `detailpesan`, tanggal realisasi dan lokasi.
- `Penjualan`: `penjualan` × `detailjual`, status lunas dan lokasi keluaran.
- `Ke Pasien`: `detail_pemberian_obat` (kurangi `embalase`+`tuslah` untuk total bersih jika diperlukan kebijakan).
- `Piutang Jual`: `piutang` × `detailpiutang` dalam periode.
- `Retur Beli/Jual/Piutang`: tabel retur masing-masing.
- `Pengambilan UTD`, `Stok Keluar Medis`, `Resep Pulang`, `Mutasi Masuk/Keluar`, `Hibah`: gunakan tabel modul terkait, semuanya difilter tanggal dan lokasi.

Perhitungan stok periode:
- `stok_terakhir` (per lokasi opsional) sudah tersedia dari `gudangbarang`.
- `stok_awal` dan `stok_akhir` periode dapat dihitung dari log riwayat:
  - Jika tersedia `riwayat_barang`/`toko_riwayat_barang`: gunakan agregasi `stok_awal/masuk/keluar/stok_akhir` per `kode_brng` pada rentang tanggal.
  - Alternatif: gunakan data `opname` sebagai anchor stok pada tanggal tertentu lalu akumulasikan mutasi sebelum/sesudah periode (lihat seeders `database/seeders/AutoSeeders/OpnameTableSeeder.php`).

Konfigurasi terkait:
- `AKTIFKANBATCHOBAT` menentukan mode batch/nonbatch saat mengambil stok dari `gudangbarang`.
- `HPPFARMASI` menentukan kolom harga satuan yang dipakai untuk menghitung `aset_stok`.

---
### Keputusan UI Web (Diselaraskan dengan Desktop)
- Default rentang tanggal: bulan berjalan (awal bulan → hari ini).
- Default lokasi: `AP — Apotek`.
- Tanpa pagination pada halaman Sirkulasi Obat; semua hasil terfilter ditampilkan.

---
### Langkah Lanjut
- Implementasi agregasi semua kolom sirkulasi di controller berdasarkan `tgl_awal/tgl_akhir` dan `lokasi`.
- Tambahkan opsi grafik 10 besar (Penjualan/Pembelian/Piutang/Resep ke Pasien) pada web berdasarkan hasil agregasi.
- Tambahkan ekspor CSV/Excel untuk laporan sirkulasi.
- Tinjau indeks database untuk tabel transaksi terkait agar agregasi performa baik.

### Rencana Implementasi Web
- Endpoint API: `GET /api/inventori/sirkulasi-barang`
- Query params:
  - `jenis`, `kategori`, `golongan`, `q`
  - `batch` (`on|off`), default dari konfigurasi aplikasi
  - `lokasi` (`kd_bangsal`, opsional) untuk mode per lokasi
  - `tgl_awal`, `tgl_akhir` (rentang tanggal; default bulan berjalan)
- Response (JSON) per barang:
  - `kode_brng`, `nama_brng`, `kode_sat`, `stok_terakhir`, `aset_stok`
  - `pengadaan`, `penerimaan`, `penjualan`, `ke_pasien`, `piutang`, `retur_beli`, `retur_jual`, `retur_piutang`, `pengambilan_utd`, `stok_keluar_medis`, `resep_pulang`, `mutasi_masuk`, `mutasi_keluar`, `hibah`
- UI React:
  - Tabel ringkasan per barang dengan filter dan opsi per lokasi.
  - Default filter UI: `tgl_awal/tgl_akhir` mengisi bulan berjalan; lokasi default `AP — Apotek`; tanpa pagination (menampilkan seluruh hasil terfilter).
  - Aksi grafik dapat diadopsi sebagai fitur lanjutan menggunakan library chart di web.

Catatan akses: fitur cetak di desktop dikendalikan oleh `akses.getsirkulasi_obat()`; pastikan kebijakan role/permission setara tersedia di aplikasi web.
Dokumen ini menjadi acuan implementasi halaman Sisa Stok di aplikasi web, dengan logika yang konsisten terhadap referensi desktop:
- Proses inti: `public/Sementara/Farmasi/DlgSisaStok.java:592`–`717`.
- Layout dan kontrol: `public/Sementara/Farmasi/DlgSisaStok.form` dan `public/Sementara/Farmasi/DlgSisaStok.java:205`–`347`.

---
### Riwayat Transaksi Gudang & Riwayat Barang Medis
- Sumber audit stok gudang: `riwayat_transaksi_gudangbarang` (INSERT/UPDATE/DELETE) ditampilkan oleh halaman `RiwayatTransaksiGudang.jsx` via `GET /farmasi/riwayat-transaksi-gudang/data`.
- Sumber ringkasan mutasi per kejadian: `riwayat_barang_medis` (kolom `stok_awal/masuk/keluar/stok_akhir/posisi`) ditampilkan oleh `RiwayatBarangMedis.jsx` via `GET /farmasi/riwayat-barang-medis/data`.
- Alur pembelian (`POST /api/pembelian/store`) kini melakukan:
  - Insert `detailbeli`, update/insert stok `gudangbarang` per `no_batch/no_faktur`.
  - Catat audit ke `riwayat_transaksi_gudangbarang` dengan `sumber_transaksi='pembelian'` dan selisih sesuai perubahan stok.
  - Catat ringkasan ke `riwayat_barang_medis` dengan `posisi='Pengadaan'` dan perhitungan `stok_awal/akhir` berdasarkan stok terkini di `gudangbarang`.
- Alur opname (`POST /api/opname/store`) mencatat keduanya dengan `sumber_transaksi='opname'` dan `posisi='Opname'`.

Implikasi: data pembelian akan muncul di halaman Riwayat Transaksi Gudang dan Riwayat Barang Medis setelah penyimpanan pada gudang tujuan (`kd_bangsal`).

---
## Cek Stok Per Lokasi (Desktop)
- Tujuan: menampilkan stok barang pada satu lokasi gudang/bangsal berdasarkan kata kunci.
- Kolom: `Kode Barang`, `Nama Barang`, `Kategori`, `Satuan`, `Harga` (mengacu `HPPFARMASI`), `Stok` per lokasi.
- Filter: `Lokasi` (kd/nama bangsal) dan `Key Word` untuk `kode_brng`/`nama_brng`/`kode_sat`/`jenis.nama`.

### Layout & Kontrol
- Judul dialog: `::[ Cek Stok Per Lokasi ]::` `public/Sementara/Farmasi/DlgCekStok.form:35`.
- Input lokasi: `kdgudang` dan `nmgudang`, tombol pilih lokasi: `BtnGudang` `public/Sementara/Farmasi/DlgCekStok.form:103`–`147`.
- Kata kunci: `TCari` dan tombol `Cari` `public/Sementara/Farmasi/DlgCekStok.form:148`–`183`.
- Tabel hasil: `tbDokter` dalam `scrollPane1` `public/Sementara/Farmasi/DlgCekStok.form:72`–`83`.

### Proses Inti
- Inisialisasi kolom tabel dan lebar: `public/Sementara/Farmasi/DlgCekStok.java:53`–`91`.
- Auto-cari saat `CARICEPAT=aktif` dan panjang kata kunci > 2: `public/Sementara/Farmasi/DlgCekStok.java:97`–`118`.
- Pemilihan lokasi melalui dialog bangsal: `public/Sementara/Farmasi/DlgCekStok.java:122`–`144`.
- Ambil `HPPFARMASI` untuk kolom harga: `public/Sementara/Farmasi/DlgCekStok.java:146`–`150`.

### Query & Agregasi
- Daftar barang sesuai kata kunci dengan join `jenis` dan kolom harga `HPPFARMASI`: `public/Sementara/Farmasi/DlgCekStok.java:408`–`418`.
- Hitung stok per lokasi dari `gudangbarang` jika lokasi terisi: `public/Sementara/Farmasi/DlgCekStok.java:421`–`441`.
- Tambah baris hasil ke tabel: `public/Sementara/Farmasi/DlgCekStok.java:443`–`447`.

### Catatan Implementasi Web
- UI web menyediakan pemilihan lokasi dan input kata kunci.
- Endpoint referensi lokasi menggunakan `GET /api/pembelian/lokasi`.
- Endpoint data cek stok menggunakan `GET /api/opname/data-barang` dengan respons JSON berisi `data` (array) yang memuat kolom di atas.
