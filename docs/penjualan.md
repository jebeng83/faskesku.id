# Analisis Model-View-Controller (MVC) - DlgPenjualan.java

Dokumen ini berisi analisis struktur MVC dari file `DlgPenjualan.java` untuk diimplementasikan ke dalam aplikasi berbasis React/Laravel.

## 1. Model (Data & Logika Bisnis)

Model dalam `DlgPenjualan.java` dikelola melalui variabel state internal dan interaksi langsung dengan database MySQL.

### Data Utama:
- **Item Penjualan**: Disimpan dalam `DefaultTableModel (tabMode)`. Kolom meliputi:
    - Jumlah, Kode Barang, Nama Barang, Kategori, Satuan.
    - Harga Jual, Subtotal, Potongan (%), Potongan (Rp).
    - Tambahan, Embalase, Tuslah, Aturan Pakai, Total.
    - Stok, Harga Beli, No. Batch, No. Faktur, Kadaluarsa.
- **Obat Racikan**: Model khusus untuk mengelola item yang diracik (`tabModeObatRacikan` & `tabModeDetailRacikan`).
- **Variabel State**: Menampung total (`ttl`), HPP (`ttlhpp`), stok, embalase, tuslah, biaya kirim (`ongkir`), PPN, dan kembalian.

### Database (Schema Terkait):
- `databarang`: Master data obat/alkes.
- `gudangbarang`: Stok obat berdasarkan lokasi (gudang/bangsal).
- `detailjual`: Transaksi detail penjualan (output).
- `penjualan`: Header transaksi penjualan (nomor nota, tanggal, member, petugas).
- `obat_racikan_jual`: Header racikan untuk transaksi tertentu.
- `detail_obat_racikan_jual`: Detail item di dalam racikan.
- `riwayat_obat`: Logging perpindahan stok.

### Logika Bisnis:
- **Penentuan Harga**: Harga berubah berdasarkan `Jenisjual` (Karyawan, Jual Bebas, Beli Luar, Ralan, dll).
- **Perhitungan Otomatis**: Subtotal dihitung dari `(Jumlah * Harga) + Embalase + Tuslah + Tambahan - Potongan`.
- **Manajemen Stok**: Pengurangan stok di `gudangbarang` dan sinkronisasi dengan `data_batch` jika fitur batch aktif.

## 2. View (Antarmuka Pengguna)

View menggunakan Java Swing dengan komponen kustom dari package `widget`.

- **Header**: Input Nomor Nota, Tanggal, Jam, Nama Pasien/Member, Petugas, Gudang Asal, dan Jenis Jual.
- **Main Area**: `JTabbedPane` dengan dua tab utama:
    - **Daftar Obat**: Tabel interaktif untuk memilih obat dan mengisi jumlah.
    - **Obat Racikan**: Antarmuka untuk membuat racikan baru dan mengisi detailnya.
- **Footer**: Panel ringkasan finansial (Grand Total, PPN, Ongkir, Jumlah Bayar, Kembalian) dan tombol aksi (Simpan, Nota, Cari, Keluar).
- **Interaktivitas**:
    - Pencarian real-time menggunakan `DocumentListener` pada `TCari`.
    - Warna baris pada tabel untuk membedakan status (misal: stok kosong/ada).

## 3. Controller (Logika Aplikasi)

Controller diimplementasikan sebagai metode dalam kelas `DlgPenjualan` yang menjembatani View dan Model.

- **`tampil1() / tampil2()`**: Berfungsi sebagai data fetcher. Mengambil data dari `databarang` & `gudangbarang` lalu menampilkannya ke tabel.
- **`simpan()`**: Mengumpulkan semua data dari tabel (Model di View), melakukan validasi, lalu menyimpannya ke berbagai tabel database secara transaksional.
- **`isKembali()`**: Menghitung jumlah kembalian setiap kali ada input pada field `Bayar`.
- **Event Listeners**: Contohnya `BtnSimpanActionPerformed` yang memicu proses penyimpanan, dan `TCariKeyPressed` untuk navigasi atau pencarian cepat.

---

## RENCANA IMPLEMENTASI (React + Laravel)

Berdasarkan analisis di atas, berikut adalah gambaran implementasi di project ini:

### Frontend (React/Inertia):
1. **State Management**: Gunakan `useState` atau `useReducer` untuk mengelola keranjang belanja (cart) dan data racikan.
2. **Components**:
    - `SearchBox`: Input pencarian dengan debounce.
    - `SaleTable`: Tabel untuk item non-racikan dengan inline editing untuk jumlah/diskon.
    - `CompoundedTable`: Tabel khusus untuk mengelola item racikan.
    - `SummaryPanel`: Card untuk total biaya dan input pembayaran.
3. **Validation**: Gunakan library seperti `Zod` atau manual check sebelum data dikirim ke backend.

### Backend (Laravel):
1. **API Endpoints**:
    - `GET /api/obat/search`: Mencari obat berdasarkan gudang dan jenis jual.
    - `POST /api/penjualan/simpan`: Menyimpan transaksi menggunakan DB Transaction untuk memastikan integritas data (update stok, catat riwayat, simpan detail).
2. **Logic Service**: Buat `PenjualanService` untuk menangani logika perhitungan harga dan stok agar tidak menumpuk di Controller.
3. **Repository Pattern**: Jika diperlukan untuk akses database yang lebih rapi (misal `ObatRepository`, `StokRepository`).

---

## Integrasi Akutansi: Alur POS Penjualan Obat → Jurnal

Tujuan: setiap transaksi di POS Farmasi otomatis membentuk staging jurnal (tampjurnal) dan dapat diposting ke jurnal akuntansi dari modul Akutansi.

### Alur Data End-to-End
- Frontend menyimpan transaksi melalui tombol “SELESAIKAN TRANSAKSI” di halaman POS.
  - Lihat pengiriman payload di [PenjualanObat.jsx:handleSubmit](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/farmasi/PenjualanObat.jsx#L224-L262).
- Backend `PenjualanController::store` menyimpan header `penjualan` dan setiap baris `detail_jual`, melakukan pengurangan stok, mencatat riwayat per gudang/batch, lalu menyusun baris staging jurnal ke `tampjurnal`.
  - Komposisi akun yang digunakan:
    - Kredit: `Penjualan_Obat` dengan nilai total penjualan + ongkir.
    - Kredit: `PPN_Keluaran` jika PPN > 0.
    - Debet: akun bayar (dipilih di POS) sebesar total penjualan + ongkir + PPN.
    - Debet: `HPP_Obat_Jual_Bebas` sebesar total HPP.
    - Kredit: `Persediaan_Obat_Jual_Bebas` sebesar total HPP.
  - Lihat komposisi baris di [PenjualanController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Farmasi/PenjualanController.php#L157-L168).
- Setelah staging siap, modul Akutansi melakukan posting ke jurnal/detailjurnal.
  - Endpoint posting staging (tampjurnal saja): [routes/api.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/api.php#L829) → `POST /api/akutansi/jurnal/post-staging` yang memanggil [JurnalController::postStaging](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Akutansi/JurnalController.php#L520-L540).

### Pola Integrasi Frontend
- Opsi A (Auto-post): setelah `PenjualanObat.jsx` berhasil menyimpan transaksi, panggil endpoint posting staging dengan `no_bukti` diisi nomor nota.

```js
// Contoh pemanggilan setelah sukses simpan di POS
await axios.post('/api/akutansi/jurnal/post-staging', {
  no_bukti: data.nota_jual,
  jenis: 'U',
  keterangan: `Posting otomatis Penjualan Obat nota ${data.nota_jual}`,
});
```

- Opsi B (Manual dari Akutansi): petugas keuangan membuka modul Akutansi untuk melakukan posting dari staging.
  - Untuk kasus Setoran Bank, tersedia alur lengkap stage→preview→post di halaman [SetoranBank.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Akutansi/SetoranBank.jsx) sebagai referensi pola.
  - Untuk POS, gunakan endpoint `POST /api/akutansi/jurnal/post-staging` dengan `no_bukti` dari nota.

### Tanggung Jawab Komponen
- Frontend POS: membentuk payload transaksi dan menentukan akun bayar (kd_rek, nama_bayar) yang turut memengaruhi baris Debet.
- Backend Farmasi:
  - Menyimpan header/detail, mengurangi stok, audit trail (riwayat), dan menyusun staging jurnal (fungsi `stageJurnal` di [BaseInventoryController](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Farmasi/BaseInventoryController.php#L82-L107)).
- Backend Akutansi:
  - Memvalidasi keseimbangan staging dan melakukan posting ke `jurnal` + `detailjurnal` via [JournalService::postFromStaging](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Akutansi/JurnalController.php#L524-L540).

### Catatan Implementasi
- Sumber akun-akun Farmasi dibaca dari `SetAkun` dan dapat dikonfigurasi; pastikan nilai akun tersedia: `Penjualan_Obat`, `PPN_Keluaran`, `HPP_Obat_Jual_Bebas`, `Persediaan_Obat_Jual_Bebas`.
- `no_bukti` yang dikirim saat posting staging disarankan menggunakan `nota_jual` agar tertelusur.
- Perubahan stok dan audit trail dicatat per `kd_bangsal` dan per batch (jika batch aktif), sehingga ledger persediaan konsisten dengan riwayat gudang.
 - Staging `tampjurnal` bersifat global dan akan di-reset (dihapus) setiap kali fungsi `stageJurnal` dipanggil; lakukan posting segera setelah penyimpanan untuk menghindari bentrok dengan proses lain yang juga membentuk staging.
 - Disarankan menggunakan pola Opsi A (auto-post) pada Frontend agar staging tidak bertumpuk dan jurnal terbentuk segera setelah transaksi tersimpan.
 - UX Pembayaran POS: tombol “Pecahan Terdekat” membulatkan jumlah bayar ke kelipatan 500 terdekat (contoh: 1.998 → 2.000; 2.497,5 → 2.500).

### Ringkasan Koneksi POS → Akutansi
- POS simpan → Farmasi menyusun staging (tampjurnal).
- Akutansi posting staging → terbentuk jurnal resmi di buku besar.
- Integrasi dapat dibuat otomatis (auto-post) atau manual (petugas akuntansi) sesuai kebijakan operasional.
