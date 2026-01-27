# Catatan Pengembangan: Permintaan Obat/Alkes/BHP

## Gambaran Umum

- Modul Permintaan Obat/Alkes/BHP mengelola pengajuan item dari gudang/ruangan asal menuju gudang/ruangan tujuan, dengan nomor permintaan harian unik, detail item, dan petugas penanggung jawab.
- Implementasi referensi berada di aplikasi Java Swing [DlgPermintaan.java](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java).
- Fitur utama: pencarian item, input jumlah dan keterangan, pemilihan gudang asal/tujuan, pemilihan petugas, penyimpanan transaksi header + detail, dan akses cek stok.

## Entitas & Tabel Basis Data (Referensi)

- Header: `permintaan_medis`
  - Field yang disimpan: `no_permintaan`, `kd_bangsal_asal` (kdgudangasal), `kd_petugas` (kdptg), `tanggal`, `status` ("Baru"), `kd_bangsal_tujuan` (kdgudangTujuan)
  - Simpan header: [DlgPermintaan.java:L585-L588](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L585-L588)

- Detail: `detail_permintaan_medis`
  - Field yang disimpan: `no_permintaan`, `kode_brng`, `satuan`, `jumlah`, `keterangan`
  - Simpan detail per item: [DlgPermintaan.java:L591-L599](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L591-L599)

- Master item: `databarang` + join `jenis`, `kategori_barang`, `golongan_barang` (hanya `databarang.status='1'`)
  - Query dasar pemuatan item: [DlgPermintaan.java:L952-L959](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L952-L959)

## Penomoran & Status

- Nomor permintaan otomatis: format `PMYYYYMMDD###` (3 digit incremental per tanggal)
  - Generator nomor: [autoNomor](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L1081-L1084)
- Status awal transaksi: `Baru` pada insert header.
- Jika insert header gagal (duplikasi nomor), proses dibatalkan dan diberi notifikasi: [DlgPermintaan.java:L605-L608](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L605-L608)

## Alur Proses

- Pemilihan Gudang Tujuan (ruangan/depo) dan Gudang Asal
  - Gudang tujuan: melalui dialog [DlgCariBangsal](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L772-L802)
  - Gudang asal: melalui dialog serupa atau default dari `DEPOAKTIFOBAT` (setting aplikasi): [isCek](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L1063-L1079)

- Pemilihan Petugas
  - Petugas dicari dari dialog [DlgCariPegawai](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L732-L770)

- Pencarian & Pemuatan Item
  - Bangun cache JSON lokal dari master item: [tampil](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L946-L986)
  - Muat dan filter item ke tabel, pertahankan input jumlah/keterangan: [tampil2](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L988-L1058)

- Input Detail
  - Kolom editable: `Jml` (kolom 0) dan `Keterangan` (kolom 7): [Inisialisasi TableModel](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L67-L76)
  - Aksi bersihkan jumlah/keterangan (popup menu): [ppBersihkan](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L666-L671)

- Simpan Transaksi
  - Validasi input wajib: nomor, gudang tujuan, petugas, minimal satu item dengan jumlah > 0: [BtnSimpan](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L561-L579)
  - Simpan header lalu detail dalam transaksi (autocommit off/commit/rollback): [BtnSimpan](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L583-L623)
  - Reset input jumlah/keterangan setelah commit sukses.

- Cek Stok
  - Akses dialog cek stok lokasi: [ppStok1](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L722-L730)

## Validasi & Aturan Bisnis

- Kolom jumlah harus angka > 0 untuk disimpan sebagai detail.
- `keterangan` dibersihkan dari karakter `'` dan `"` sebelum disimpan: [DlgPermintaan.java:L596-L597](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L596-L597)
- Nomor permintaan unik per tanggal; kegagalan insert header menandakan duplikasi.
- Akses & default:
  - Hak akses mempengaruhi enable state tombol dan field petugas.
  - `DEPOAKTIFOBAT` men-set gudang asal dan menonaktifkan pemilihannya bila aktif.

## Integrasi UI (Aplikasi Ini)

- Halaman Farmasi — Cek Stok telah tersedia: [CekStok.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/farmasi/CekStok.jsx)
  - Sudah mendukung pencarian, tabel hasil, dan cetak dengan letterhead.

- Disarankan membuat halaman Permintaan Obat dengan pola berikut:
  - Grid dua kartu: “Lokasi & Petugas” dan “Daftar Item” (tabel editable untuk jumlah dan keterangan).
  - Aksi: Tambah Item (modal daftar barang), Cek Stok (buka halaman cek stok), Simpan, Cari Permintaan.
  - Header form: Nomor permintaan (readonly, dari backend), Tanggal, Gudang Tujuan (select), Gudang Asal (default dari setting bila tersedia), Petugas (select).

## Desain API Backend (Rancangan)

- GET `/farmasi/permintaan/items` — daftar item aktif dengan join jenis, kategori, golongan (filter q, pagination)
- POST `/farmasi/permintaan` — buat header + detail
  - Body: `tanggal`, `kd_bangsal_asal`, `kd_bangsal_tujuan`, `kd_petugas`, `items:[{kode_brng,satuan,jumlah,keterangan}]`
  - Respon: `no_permintaan` terbit dari generator nomor (format `PMYYYYMMDD###`)
- GET `/farmasi/permintaan/{no_permintaan}` — detail transaksi
- GET `/farmasi/permintaan/search` — cari berdasarkan tanggal, gudang, petugas, nomor

## Penomoran di Backend

- Generator nomor mengikuti referensi: prefix `PM` + tanggal (YYYYMMDD) + 3 digit urut per hari: [autoNomor](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L1081-L1084)
- Pastikan atomic/transaction-safe untuk mencegah duplikasi saat load tinggi.

## UX & Performa

- Pencarian item: gunakan caching dan pencarian lokal untuk respons cepat, dengan debounce input.
- Tabel: kolom penting diurutkan, zebra striping, dan inline edit untuk jumlah/keterangan.
- Cetak: gunakan letterhead & layout cetak sesuai panduan UI (bagian 22) bila diperlukan untuk dokumen permintaan.

## Edge Cases & Error Handling

- Tidak ada item dengan jumlah > 0: batalkan simpan, tampilkan pesan.
- No.Permintaan duplikat: tampilkan error dan regenerasi nomor.
- Gudang/petugas tidak dipilih: blokir simpan dan beri penjelasan.
- Sanitasi keterangan dari karakter tanda kutip.

## Referensi Kode

- Inisialisasi kolom tabel & editable: [DlgPermintaan.java:L67-L76](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L67-L76)
- Simpan header + detail: [DlgPermintaan.java:L561-L623](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L561-L623)
- Generator nomor: [DlgPermintaan.java:L1081-L1084](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L1081-L1084)
- Muat master item ke cache: [DlgPermintaan.java:L946-L986](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L946-L986)
- Muat & filter item dari cache: [DlgPermintaan.java:L988-L1058](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L988-L1058)
- Dialog cek stok: [DlgPermintaan.java:L722-L730](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L722-L730)
- Pemilihan petugas: [DlgPermintaan.java:L732-L770](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L732-L770)
- Pemilihan gudang tujuan: [DlgPermintaan.java:L772-L802](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L772-L802)
- Akses & default `DEPOAKTIFOBAT`: [DlgPermintaan.java:L1063-L1079](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPermintaan.java#L1063-L1079)

