# Alur Inventori Farmasi – Ringkasan Teknis dan Implementasi

Dokumen ini merangkum alur lengkap modul inventori (farmasi/medis) berdasarkan paket Java di `public/inventory`. Fokusnya pada penerapan di aplikasi ini: pembelian/pengadaan, transaksi (penjualan & distribusi), manajemen stok, pengeluaran, dan pencatatan (auditing & akuntansi).

## Ikhtisar Arsitektur
- Tabel inti: `databarang` (master barang), `gudangbarang` (stok per gudang + batch/faktur), `data_batch` (informasi batch: harga pokok, sisa), `jenis`, `kategori_barang`, `golongan_barang`, `bangsal` (gudang/depots).
- Modul utama GUI: dialog `Dlg*` dan `Inventory*` yang mengelola transaksi dan laporan.
- Riwayat stok: penelusuran per peristiwa melalui `riwayat_barang_medis` yang diisi via `Trackobat.catatRiwayat(...)`.
  - Contoh query riwayat: `public/inventory/DlgRiwayatBarangMedis.java:653`.
- Konfigurasi penting diambil dari `koneksiDB` dan tabel pengaturan:
- `AKTIFKANBATCHOBAT` menentukan apakah stok per-batch diaktifkan (stok disimpan per kombinasi `no_batch` + `no_faktur`).
- `HPPFARMASI` menentukan kolom biaya yang dipakai (misal `dasar`, pilihan lain via `data_batch.<hppfarmasi>`). Contoh pemakaian: `public/inventory/DlgSirkulasiBarang6.java:1450`.
- `set_harga_obat`, `set_nota`, `set_akun`, `akun_bayar` mempengaruhi penentuan harga jual, PPN, dan jurnal akuntansi.

### Catatan Perubahan (2025-12-05)
- Staging jurnal Farmasi kini memakai skema yang kompatibel dengan layanan Akutansi (`kd_rek`, opsional `nm_rek`, `debet`, `kredit`) dan melakukan agregasi per akun sebelum staging.
  - Penulisan: `app/Http/Controllers/Farmasi/BaseInventoryController.php:56–66`.
  - Agregasi per `kd_rek`: `app/Http/Controllers/Farmasi/BaseInventoryController.php:68–92`.
- Pemesanan/PO:
  - Validasi input menerima field opsional (`subtotal`, `dis`, `total`, `ppn`, `meterai`, `tagihan`) dan menyusun nilai dasar dari payload atau dari item jika diperlukan: `app/Http/Controllers/Farmasi/PemesananController.php:14–29, 34–55`.
  - Staging jurnal: Debet `Pemesanan_Obat = baseTotal + meterai`, Debet `PPN_Masukan = ppn` (jika > 0), Kredit `Kontra_Pemesanan_Obat = tagihan`: `app/Http/Controllers/Farmasi/PemesananController.php:79–88`.
  - Generator nomor faktur memakai koneksi default: `app/Http/Controllers/Farmasi/PemesananController.php:122–147`.
- Operasi stok gudang dan penyesuaian batch memakai koneksi default agar konsisten:
  - `adjustStockPlus/Minus`: `app/Http/Controllers/Farmasi/BaseInventoryController.php:12–29`.
  - `adjustBatchSisaDelta`: `app/Http/Controllers/Farmasi/BaseInventoryController.php:31–34`.
-
Pengujian integrasi jurnal Farmasi memperlihatkan keseimbangan Debet=Kredit untuk kasus Pemesanan dan Pengeluaran.

## Master Data
- Entri master barang dikelola di `DlgBarang.java`, menampilkan atribut harga beli, dasar/HPP, persentase markup untuk berbagai kelas layanan, satuan besar/kecil, dan kategori/golongan.
  - Contoh kolom yang diambil: `public/inventory/DlgBarang.java:2518` dan `public/inventory/DlgBarang.java:2907`.
- Pencarian dan seleksi supplier tersedia di `InventoryCariSuplier.java` dan daftar supplier di `InventorySuplier.java`.

## Set Harga Obat → Data Obat
- Konfigurasi harga jual disimpan ke tiga tabel:
  - Umum: simpan ke `setpenjualanumum` saat klik Simpan di tab Umum `public/DlgSetHarga.java:1773-1776`.
  - Per Jenis: simpan ke `setpenjualan` dengan kunci `kdjns` `public/DlgSetHarga.java:1805-1808`.
  - Per Barang: simpan ke `setpenjualanperbarang` dengan kunci `kode_brng` `public/DlgSetHarga.java:1836-1839`.
- Bulk update ke master `databarang` disediakan via menu popup:
  - Update berdasarkan persentase per jenis (tab Admin): `ppUPdateActionPerformed` mengisi semua kolom harga (`ralan`, `kelas1`, `kelas2`, `kelas3`, `utama`, `vip`, `vvip`, `beliluar`, `jualbebas`, `karyawan`) dengan rumus `round(h_beli+(h_beli*(persen/100)))` `public/DlgSetHarga.java:2228-2244`.
  - Update berdasarkan pengaturan harga umum: `ppUPdate1ActionPerformed` mengisi seluruh harga jual di `databarang` menggunakan matrix persentase tab Umum `public/DlgSetHarga.java:2757-2772`.
  - Update per barang: `ppUPdate2ActionPerformed` mengisi harga jual untuk setiap `kode_brng` sesuai persentase barisnya `public/DlgSetHarga.java:2774-2790`.
- Perhitungan dinamis di form master barang (`DlgBarang.java`) mengikuti pengaturan aktif:
  - Per Jenis: ambil persentase dari `setpenjualan` lalu hitung `harga_jual = h_beli * (1 + persen/100)` untuk setiap kelas `public/inventory/DlgBarang.java:3281-3293`.
  - Umum: ambil dari `setpenjualanumum` `public/inventory/DlgBarang.java:3308-3319`.
  - Per Barang: ambil dari `setpenjualanperbarang` `public/inventory/DlgBarang.java:3335-3347`.
- Catatan implementasi:
  - Pembulatan memakai `Valid.roundUp(..., 100)` yang mengangkat ke kelipatan 100 untuk harga jual per kelas.
- Field `dasar` di `databarang` dipakai sebagai HPP aktif sesuai konfigurasi `HPPFARMASI` pada banyak laporan; nilai `dasar` dapat diisi dari hasil pembelian (lihat bagian Pembelian → Data Obat).

### Diagram Mini – SetHarga → BulkUpdate → databarang

```mermaid
flowchart LR
  A[DlgSetHarga (UI)] --> B[Simpan pengaturan]
  B --> C[Umum → setpenjualanumum (DlgSetHarga.java:1773-1776)]
  B --> D[Per Jenis → setpenjualan (DlgSetHarga.java:1805-1808)]
  B --> E[Per Barang → setpenjualanperbarang (DlgSetHarga.java:1836-1839)]
  A --> F[Bulk Update (menu popup)]
  F --> G[ppUPdate (Admin) → update databarang harga per kelas (DlgSetHarga.java:2228-2244)]
  F --> H[ppUPdate1 (Umum) → update semua harga di databarang (DlgSetHarga.java:2757-2772)]
  F --> I[ppUPdate2 (Per Barang) → update harga per kode_brng (DlgSetHarga.java:2774-2790)]
  G --> J[databarang.(ralan, kelas1, kelas2, kelas3, utama, vip, vvip, beliluar, jualbebas, karyawan)]
  H --> J
  I --> J
```

## Pembelian → Data Obat
- Simpan transaksi pembelian dan detail item:
  - Header `pembelian` dan detail `detailbeli` disimpan saat `BtnSimpan` `public/inventory/DlgPembelian.java:975-997`.
  - Stok gudang (`gudangbarang`) bertambah per gudang, menyertakan `no_batch` dan `no_faktur` bila batch diaktifkan `public/inventory/DlgPembelian.java:999-1006`.
- Penulisan data batch dan harga jual per batch:
  - `simpanbatch()` menulis baris `data_batch` berisi metadata batch, `h_beli`/`dasar`, dan semua kolom harga jual per kelas sesuai hasil perhitungan `public/inventory/DlgPembelian.java:1751-1764`.
- Opsi pembaruan langsung ke master `databarang`:
  - Jika pengguna memiliki akses obat dan checkbox baris aktif (`tbDokter.getValueAt(i,5) == true`), maka `databarang` diupdate: `expire`, `h_beli`, semua kolom harga jual per kelas, dan `dasar` diisi dari hasil perhitungan `public/inventory/DlgPembelian.java:1766-1772`.
- Cara perhitungan harga saat pembelian (fungsi `setKonversi`):
  - Basis perhitungan mengikuti `hargadasar`:
    - `Harga Beli`: harga dasar berasal dari `h_beli` item; jika `pakaippn = Yes`, PPN ditambahkan pada `hargappn` `public/inventory/DlgPembelian.java:1799-1811, 1896-1901, 1993-1998`.
    - `Harga Diskon`: harga dasar berasal dari total setelah diskon dibagi jumlah; jika `pakaippn = Yes`, PPN turut dihitung `public/inventory/DlgPembelian.java:2186-2191, 2272-2289, 2420-2424`.
  - Pengaturan kenaikan (`pengaturanharga`) menentukan sumber persentase:
    - Per Jenis: ambil dari `setpenjualan` berdasarkan `kdjns` barang `public/inventory/DlgPembelian.java:1784-1789, 2171-2176`.
    - Umum: ambil dari `setpenjualanumum` `public/inventory/DlgPembelian.java:1884-1886, 2271-2273`.
    - Per Barang: ambil dari `setpenjualanperbarang` `public/inventory/DlgPembelian.java:1982-1983, 2368-2370`.
  - Hasil perhitungan diisikan ke kolom harga per kelas pada tabel dan ke `data_batch`/`databarang` saat simpan, dengan pembulatan `Valid.roundUp(..., 100)` `public/inventory/DlgPembelian.java:1860-1869, 1957-1966, 2054-2063, 2247-2256, 2344-2353, 2441-2450`.
- Pembatalan/hapus pembelian akan membalik stok dan menghapus data batch:
  - Pengurangan stok `gudangbarang` dan penghapusan baris terkait di `data_batch` saat hapus `public/inventory/DlgCariPembelian.java:996-1008, 1003-1007`.

### Diagram Mini – Pembelian → gudangbarang/data_batch → (opsional) databarang

```mermaid
flowchart LR
  A[DlgPembelian (UI)] --> B[Simpan header + detail]
  B --> C[pembelian, detailbeli (DlgPembelian.java:975-997)]
  A --> D[Tambah stok gudang]
  D --> E[gudangbarang + batch/faktur (DlgPembelian.java:999-1006)]
  A --> F[Tulis data batch]
  F --> G[simpanbatch → data_batch (harga per kelas, sisa) (DlgPembelian.java:1751-1764)]
  A --> H[Opsi update master (jika cek “update databarang” aktif)]
  H --> I[update databarang (expire, h_beli, harga per kelas, dasar) (DlgPembelian.java:1766-1772)]
  K[Hapus Pembelian] --> L[gudangbarang stok dikurangi + delete data_batch (DlgCariPembelian.java:996-1008, 1003-1007)]
```

### Implikasi Pengembangan
- Pengaturan harga (Umum/Jenis/Barang) dan `PPN` mempengaruhi seluruh rantai harga jual; gunakan fitur bulk update untuk menyelaraskan `databarang` setelah perubahan kebijakan.
- Frontend menyediakan aksi cepat “Update Harga Semua” pada halaman Data Obat untuk mengeksekusi bulk update via endpoint `PUT farmasi/data-obat/update-harga-semua` `resources/js/Pages/farmasi/dataobat.jsx:1196-1236`.
- Saat implementasi modul baru yang bergantung pada HPP, perhatikan sumber nilai `dasar` yang bisa berasal dari hasil pembelian (Harga Diskon per unit) dan konfigurasi `HPPFARMASI` di laporan.

## Pengadaan & Penerimaan
Terdapat dua jalur umum: berdasarkan Surat Pemesanan (PO) atau pembelian langsung.

1) Surat Pemesanan (PO)
- Pembuatan dan pencetakan surat pemesanan: `InventorySuratPemesanan.java`.
  - Penyusunan item dan subtotal untuk dokumen cetak: `public/inventory/InventorySuratPemesanan.java:1306-1325`.
- Penerjemahan PO menjadi transaksi penerimaan dilakukan di `DlgPemesanan.java`.
  - Simpan header `pemesanan` dan detail `detailpesan`: `public/inventory/DlgPemesanan.java:989-1011`.
  - Update stok gudang (`gudangbarang`) bertambah; riwayat dicatat sebagai "Penerimaan": `public/inventory/DlgPemesanan.java:1014-1021`.
  - Jurnal akuntansi (persediaan, PPN masukan, hutang usaha) dibentuk via `tampjurnal` dan `Jurnal.simpanJurnal(...)`: `public/inventory/DlgPemesanan.java:1034-1041`.

2) Pembelian Langsung
- Entri faktur pembelian dan item: `DlgPembelian.java`.
  - Simpan header `pembelian` dan detail `detailbeli`: `public/inventory/DlgPembelian.java:975-997`.
  - Stok gudang bertambah; riwayat dicatat sebagai "Pengadaan": `public/inventory/DlgPembelian.java:999-1006`.
  - Jurnal akuntansi pembelian dan PPN masukan serta akun bayar: `public/inventory/DlgPembelian.java:1017-1025`.
- Penetapan harga jual dan perhitungan PPN/diskon per item dilakukan saat input pembelian.
  - Perhitungan markup per kelas layanan: `public/inventory/DlgPembelian.java:2010-2022`.
  - Pengambilan kebijakan harga dari `setpenjualan` berdasarkan jenis barang: `public/inventory/DlgPembelian.java:2171-2189`.

Catatan batch/HPP:
- Jika `AKTIFKANBATCHOBAT=yes`, setiap transaksi menulis stok per kombinasi `no_batch` + `no_faktur` dengan penyesuaian `data_batch.sisa` saat keluar/terjual.
- Banyak laporan memakai `data_batch.<hppfarmasi>` untuk menghitung nilai stok dan sirkulasi.

## Transaksi Penjualan
- Entri penjualan ke pasien/umum dilakukan di `DlgPenjualan.java`.
  - Simpan header `penjualan` lalu panggil `simpan()` untuk menyimpan item `detailjual`: `public/inventory/DlgPenjualan.java:1574-1587` dan `public/inventory/DlgPenjualan.java:4129-4148`.
  - Pengurangan stok gudang dan pencatatan riwayat "Penjualan" dilakukan per item; jika batch aktif, juga mengurangi `data_batch.sisa`: `public/inventory/DlgPenjualan.java:4151-4160`.
  - Penjualan racikan didukung dengan tabel `obat_racikan_jual` dan `detail_obat_racikan_jual`: `public/inventory/DlgPenjualan.java:4171-4201`.
- Verifikasi di kasir
  - Jika `set_nota.verifikasi_penjualan_di_kasir=Yes`, maka pengurangan stok dan jurnal dapat ditunda sampai verifikasi; logika guard: `public/inventory/DlgPenjualan.java:4149` dan `public/inventory/DlgPenjualan.java:4206-4220`.
- Akuntansi penjualan
  - Pembentukan jurnal penjualan, PPN keluaran, HPP dan pengurangan persediaan: `public/inventory/DlgPenjualan.java:4230-4236`.
  - Pencatatan tagihan/pelunasan di `tagihan_sadewa`: `public/inventory/DlgPenjualan.java:4238-4240`.

## Pengeluaran Non‑Penjualan
- Distribusi keluar non-penjualan dikelola di `DlgPengeluaranApotek.java`.
  - Simpan header `pengeluaran_obat_bhp` dan detail `detail_pengeluaran_obat_bhp`: `public/inventory/DlgPengeluaranApotek.java:733-741`.
  - Pengurangan stok gudang + penyesuaian batch (`data_batch.sisa`) serta riwayat "Stok Keluar": `public/inventory/DlgPengeluaranApotek.java:742-753`.
  - Jurnal persediaan keluar (kontra persediaan) jika ada nilai: `public/inventory/DlgPengeluaranApotek.java:760-765`.
- Alur permintaan
  - Modul permintaan pasien/reses pulang (`DlgPermintaanStokPasien.java`, `DlgPermintaanResepPulang.java`) menyediakan daftar barang dan stok; status permintaan dapat diset "Disetujui" saat mutasi/pengeluaran: `public/inventory/DlgMutasiBarang.java:616-618` dan `public/inventory/DlgPengeluaranApotek.java:779-781`.

## Manajemen Stok
1) Mutasi/Pindah Gudang
- Pemindahan stok antar gudang dilakukan di `DlgMutasiBarang.java`.
  - Simpan `mutasibarang` lalu kurangi stok gudang asal, tambah stok gudang tujuan; riwayat dicatat dua arah sebagai "Mutasi": `public/inventory/DlgMutasiBarang.java:586-604`.
- Laporan/monitor mutasi disediakan di `DlgPindahGudang.java`: contoh query pemanggilan data: `public/inventory/DlgPindahGudang.java:1268-1278`.

2) Stok Opname
- Input hasil opname dan penyesuaian stok fisik dilakukan di `DlgInputStok.java`.
  - Simpan baris `opname` per barang, set stok `gudangbarang` sesuai real, riwayat "Opname": `public/inventory/DlgInputStok.java:983-995`.
- Laporan stok opname ditampilkan di `DlgStokOpname.java`: contoh query tampilan: `public/inventory/DlgStokOpname.java:1198-1215`.

### Stok Opname – Implementasi Aplikasi Ini
- Endpoint API (rute):
  - `GET /api/opname/lokasi` → daftar bangsal aktif (`routes/api.php:183`)
  - `GET /api/opname/data-barang` → barang per bangsal, termasuk stok & batch/faktur (`routes/api.php:185`)
  - `POST /api/opname/store` → simpan hasil opname per item (`routes/api.php:186`)
  - `GET /api/opname/list` → daftar hasil opname dengan join master (`routes/api.php:188`)
  - `GET /api/opname/search` → pencarian hasil opname (`routes/api.php:189`)
  - `DELETE /api/opname/delete` → hapus batch data opname (`routes/api.php:190`)

- Controller yang menangani:
  - Lokasi: `app/Http/Controllers/OpnameController.php:28`
  - Data barang: `app/Http/Controllers/OpnameController.php:51`
  - Simpan opname: `app/Http/Controllers/OpnameController.php:112`
  - Listing hasil: `app/Http/Controllers/OpnameController.php:285`
  - Pencarian: `app/Http/Controllers/OpnameController.php:344`
  - Hapus: `app/Http/Controllers/OpnameController.php:413`

- Kontrak payload simpan (`POST /api/opname/store`):
  - Body: `{ tanggal: date, kd_bangsal: string, keterangan?: string, items: Array<{ kode_brng: string, real: number, h_beli: number, no_batch?: string|null, no_faktur?: string|null }>} }
  - Catatan: kirim `no_batch`/`no_faktur` sebagai `null` jika kosong (bukan string kosong) agar cocok dengan kolom yang `NULL` di DB (`app/Http/Controllers/OpnameController.php:146-149`).

- Alur penyimpanan per item (server-side):
  - Normalisasi `no_batch`/`no_faktur` ke `null` saat kosong dan ambil stok sistem pada `gudangbarang` dengan mempertimbangkan `NULL` vs `''` (`app/Http/Controllers/OpnameController.php:150-167`).
  - Hitung `selisih`, `lebih`, `nomihilang`, `nomilebih` (`app/Http/Controllers/OpnameController.php:169-176`).
  - Upsert baris `opname` berdasarkan kunci `{kode_brng, tanggal, kd_bangsal, no_batch, no_faktur}` (`app/Http/Controllers/OpnameController.php:198-216`).
  - Set stok `gudangbarang.stok = real` via `updateOrCreate` dengan kunci komposit `{kode_brng, kd_bangsal, no_batch, no_faktur}` (`app/Http/Controllers/OpnameController.php:218-229`; model komposit: `app/Models/RawatJalan/Gudangbarang.php:12,45-52`).
  - Catat audit: `RiwayatTransaksiGudangBarang::catatUpdate/Insert` dengan konteks transaksi "opname" (`app/Http/Controllers/OpnameController.php:231-258`; model: `app/Models/RiwayatTransaksiGudangBarang.php:69-110`).
  - Transaksi DB dan koneksi: operasi berjalan pada koneksi `fufufafa` dan dibungkus `beginTransaction/commit/rollback` (`app/Http/Controllers/OpnameController.php:140,264,271`).

- Penanganan batch/faktur:
  - Kunci stok memakai kombinasi `{kode_brng, kd_bangsal, no_batch, no_faktur}`; pastikan aplikasi UI mengirim `null` untuk field batch/faktur yang kosong agar tidak membuat baris duplikat.
  - Opname tidak mengubah `data_batch.sisa` (sesuai pola Java); hanya menyelaraskan stok fisik pada `gudangbarang` dan mencatat hasil di `opname`.

- Integrasi UI (halaman Stok Opname):
  - Komponen: `resources/js/Pages/farmasi/StokOpname.jsx`.
  - Cek duplikasi item opname per kombinasi `{kode_brng, no_batch, no_faktur}` (`resources/js/Pages/farmasi/StokOpname.jsx:228-232`).
  - Payload simpan mengirim `no_batch`/`no_faktur` sebagai `null` bila kosong (`resources/js/Pages/farmasi/StokOpname.jsx:330-336`).

- Checklist Opname (implementasi):
  - Pastikan `kd_bangsal` dipilih dan `keterangan` diisi sebelum simpan.
  - Per-item: `real >= 0`; selaraskan nilai jual/harga beli untuk kalkulasi nominal.
  - Gunakan `null` untuk batch/faktur kosong agar kunci komposit konsisten.
  - Audit selalu tercatat saat stok berubah; verifikasi riwayat saat troubleshooting.

### Contoh Payload Opname (API)

```json
{
  "tanggal": "2025-12-03",
  "kd_bangsal": "-",
  "keterangan": "Opname akhir tahun",
  "items": [
    {
      "kode_brng": "2018001",
      "real": 2,
      "h_beli": 20000,
      "no_batch": "BATCH001",
      "no_faktur": "PB-20251202-001"
    },
    {
      "kode_brng": "2018002",
      "real": 0,
      "h_beli": 15000,
      "no_batch": null,
      "no_faktur": null
    }
  ]
}
```

Respons sukses:

```json
{ "success": true, "message": "Data stok opname berhasil disimpan" }
```

Respons gagal (contoh validasi):

```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": {
    "kd_bangsal": ["The kd bangsal field is required."],
    "items.0.real": ["The items.0.real must be at least 0."]
  }
}
```

### Diagram Alir Opname (Ringkas)

```
UI StokOpname.jsx
  → Validasi form & item
  → Normalisasi batch/faktur (null jika kosong)
  → POST /api/opname/store (routes/api.php:186)
      → OpnameController@store (app/Http/Controllers/OpnameController.php:112)
          → Validasi request (120-130)
          → beginTransaction('fufufafa') (140)
          → loop items:
              → Ambil stok gudang per kunci komposit (150-167)
              → Hitung selisih/lebih/nominal (169-176)
              → Upsert opname (198-216)
              → Upsert gudangbarang.stok=real (218-229)
              → Audit riwayat (231-258)
          → commit (264)
      ← JSON sukses/gagal
```

3) Konversi Satuan
- Pengelolaan konversi satuan tersedia di `DlgKonversi.java` dan dipakai saat pengadaan/penjualan melalui pencarian data konversi (`DlgCariDataKonversi`).

## Retur
1) Retur Pembelian (ke Suplier)
- Entri retur pembelian: `DlgReturBeli.java`.
  - Simpan header `returbeli` dan detail `detreturbeli`, kurangi `data_batch.sisa` jika batch; stok gudang berkurang; riwayat "Retur Beli": `public/inventory/DlgReturBeli.java:1505-1524`.
  - Jurnal retur (retur ke suplier dan kontra rekening kas): `public/inventory/DlgReturBeli.java:1044-1045`.

2) Retur Penjualan / Piutang
- Pola serupa: simpan detail retur, kembalikan stok ke gudang, dan susun jurnal terkait. Laporan ringkasan tersedia di `InventoryRingkasanReturJualBarangMedis.java` dan `InventoryRingkasanReturSuplierBarangMedis.java`.

## Pencatatan & Akuntansi
- Setiap transaksi menulis jurnal ke `tampjurnal` lalu disimpan oleh `keuangan.Jurnal.simpanJurnal(...)`. Integrasi jurnal muncul di banyak modul, misal pembelian (`public/inventory/DlgPembelian.java:1017-1025`), penjualan (`public/inventory/DlgPenjualan.java:4230-4236`), pengeluaran (`public/inventory/DlgPengeluaranApotek.java:760-765`).
- Riwayat per barang per gudang direkam melalui `Trackobat.catatRiwayat(...)` pada tiap event: penerimaan, pengadaan, penjualan, mutasi, opname, stok keluar, retur.

### Integrasi Akuntansi (Farmasi ↔ Akutansi)
- Single Posting Point: staging jurnal dibaca dan diposting oleh layanan akuntansi terpusat.
  - Preview dan komposisi gabungan `tampjurnal` + `tampjurnal2` memakai `kd_rek` (tanpa nominal nol) sebagaimana di `app/Services/Akutansi/JurnalPostingService.php:37-43` dan pelengkap `nm_rek` di `app/Services/Akutansi/JurnalPostingService.php:61-70`.
  - Posting ke `jurnal`/`detailjurnal` sekaligus pengosongan staging dilakukan di `app/Services/Akutansi/JurnalPostingService.php:146-153` dan dilanjutkan hingga `app/Services/Akutansi/JurnalPostingService.php:170-185`.
  - Endpoint publik untuk posting: `app/Http/Controllers/Akutansi/JurnalController.php:553-566`.
- Kesesuaian skema `tampjurnal` yang diharapkan modul Akutansi:
  - Kolom wajib: `kd_rek`, `debet`, `kredit`; opsional `nm_rek`.
  - Composer paralel rawat jalan menulis ke `tampjurnal2` dengan skema yang sama (`kd_rek`, `nm_rek`, `debet`, `kredit`) di `app/Services/Akutansi/TampJurnalComposerRalan.php:124-135`.
- Catatan penyesuaian implementasi Farmasi saat staging jurnal:
  - Penulisan staging sudah menggunakan skema kompatibel (`kd_rek`, `nm_rek`, `debet`, `kredit`) dan dilakukan agregasi per akun untuk mencegah duplikasi baris sebelum posting.
    - Lihat penulisan/agregasi: `app/Http/Controllers/Farmasi/BaseInventoryController.php:56–66, 68–92`.
    - Model staging Farmasi: `app/Models/Farmasi/TampJurnal.php:7–15`.
- Mapping akun bersumber dari `set_akun` (COA pusat) dan dipakai konsisten di seluruh transaksi Farmasi:
  - Model `SetAkun`: `app/Models/Farmasi/SetAkun.php:1–14`.
  - Contoh staging baris jurnal di transaksi Farmasi:
    - Pemesanan/PO: `app/Http/Controllers/Farmasi/PemesananController.php:79-88`.
    - Pembelian langsung: `app/Http/Controllers/Farmasi/PembelianController.php:88-96`.
    - Penjualan obat bebas (penjualan, PPN keluaran, HPP/persediaan): `app/Http/Controllers/Farmasi/PenjualanController.php:87-95`.
    - Stok keluar non-penjualan (kontra persediaan vs persediaan): `app/Http/Controllers/Farmasi/PengeluaranController.php:61-66`.

### Checklist Integrasi
- Pastikan staging Farmasi menulis `kd_rek`/`nm_rek` (bukan `rekening`/`keterangan`).
- Gunakan akun dari `set_akun` untuk menyusun baris jurnal per transaksi dan jaga keseimbangan Debet=Kredit.
- Setelah transaksi selesai, panggil posting via endpoint yang menggunakan layanan `JurnalPostingService` untuk memindahkan baris dari staging ke GL.

## Agregasi & Pelaporan
- Sirkulasi Barang: modul analitik yang menghimpun jumlah dan nilai per jenis transaksi (beli, pesan, jual, mutasi, hibah, retur, keluar, resep pulang). Contoh agregasi dan perhitungan stok awal/akhir: `public/inventory/DlgSirkulasiBarang.java:1834-1851` dan `public/inventory/DlgSirkulasiBarang4.java:1937-1949`.
- Ringkasan penerimaan, pembelian, penjualan, hibah, dan vendor per bulan tersedia di `InventoryRingkasan*` dan `InventoryNilaiPenerimaanVendorFarmasiPerBulan.java`.

## Prinsip Implementasi di Aplikasi Ini
- Selalu gunakan `gudangbarang` sebagai sumber kebenaran stok; jika batch aktif, pastikan seluruh transaksi menulis `no_batch`+`no_faktur` serta menjaga `data_batch.sisa`.
- Patuhi urutan transaksi: buat header (misal `pembelian`/`penjualan`), simpan detail item, kemudian:
  - Update stok di `gudangbarang` (+/- sesuai tipe transaksi).
  - Catat riwayat dengan konteks yang jelas (jenis event, gudang, batch/faktur, deskripsi).
  - Susun dan simpan jurnal di `tampjurnal` → `Jurnal.simpanJurnal(...)` memakai akun dari `set_akun`/`akun_bayar`.
- Terapkan konfigurasi harga dan PPN dari `set_harga_obat` dan `set_nota` agar penetapan harga jual konsisten di seluruh modul.
- Untuk permintaan internal pasien/reses: set status permintaan saat stok dipenuhi melalui mutasi atau pengeluaran agar alur approval tercermin di data.

## Tabel/Entitas yang Paling Sering Tersentuh
- `pemesanan`, `detailpesan` – penerimaan berdasar PO.
- `pembelian`, `detailbeli` – pengadaan langsung.
- `penjualan`, `detailjual`, `obat_racikan_jual`, `detail_obat_racikan_jual` – transaksi penjualan.
- `pengeluaran_obat_bhp`, `detail_pengeluaran_obat_bhp` – stok keluar non‑penjualan.
- `mutasibarang` – perpindahan antar gudang.
- `opname` – hasil stok opname.
- `gudangbarang` – posisi stok per gudang (+opsional per batch/faktur).
- `data_batch` – informasi batch (HPP, sisa, kadaluarsa).
- `riwayat_barang_medis` – log audit per event barang.
- `tampjurnal` (+ `keuangan.Jurnal`) – penyusunan dan penyimpanan jurnal GL.

## Catatan Tambahan
- Banyak modul laporan memakai agregasi SQL terhadap tabel detail transaksi untuk menghasilkan jumlah kuantitas dan total nilai, serta menggunakan `data_batch.<hppfarmasi>` sebagai dasar nilai stok jika batch aktif.
- Pengaturan akses (`fungsi.akses`) mengendalikan visibilitas tombol/fitur per modul, contoh: `akses.getpenjualan_obat()` di `public/inventory/DlgPenjualan.java:3857`.

Dengan mengikuti pola di atas, implementasi inventori pada aplikasi ini akan selaras dengan modul Java yang ada: konsisten dalam pencatatan stok dan batch, akurat secara akuntansi, dan lengkap jejak auditnya.
## Urutan Pengembangan Lanjutan
- Selaraskan payload UI ↔ backend Farmasi pada pembelian: gunakan `total1`, `potongan`, `total2`, `kd_rek` di `pembelian`/`detailbeli`.
- Tetapkan satu sumber kebenaran (SSOT) harga di backend: `h_beli` disimpan sebagai HNA (harga vendor) dan `dasar = h_beli - besardis` bila ada diskon (non‑negatif). Harga jual per kelas dihitung dari `dasar` sesuai `set_harga_obat`.
- Frontend tidak lagi mengirim update harga setelah pembelian; logika update harga dan perhitungan jual sepenuhnya terpusat di controller backend.
- Standarisasi endpoint harga barang: `PUT /api/databarang/update-harga` untuk persist `h_beli` dan `dasar`, serta `PUT /api/databarang/update-harga-jual` untuk menghitung harga jual dari base sesuai konfigurasi (termasuk PPN bila diaktifkan).
- Perbaiki staging jurnal Farmasi ke skema `kd_rek`/`nm_rek` dan pastikan Debet=Kredit memakai akun dari `set_akun`.
- Pastikan rute API pembelian mengarah ke `App\Http\Controllers\Farmasi\PembelianController@store` untuk satu sumber kebenaran.
- Tambahkan validasi serta transaksi database yang ketat saat menyimpan header, item, batch, dan stok gudang.
- Uji integrasi akuntansi: posting jurnal dari staging via layanan `Akutansi\JurnalPostingService` dan verifikasi penutupan.
- Terapkan kebijakan `set_harga_obat` dan `set_nota` secara konsisten pada penetapan harga di pembelian/penjualan.
- Audit penggunaan `AKTIFKANBATCHOBAT`; sinkronkan pengurangan `data_batch.sisa` di seluruh alur keluar.
- Lengkapi pencatatan `riwayat_barang_medis` untuk setiap event transaksi sebagai dasar audit.
- Refaktor modul permintaan/reses pulang agar status approval tercermin saat mutasi/pengeluaran.
# Rencana Integrasi Hutang Obat & Posting Pelunasan

## Gambaran Umum
- Tujuan: Menampilkan daftar hutang obat (berdasarkan `pemesanan`) dan melakukan posting pelunasan ke jurnal akuntansi.
- Lingkup: Farmasi (PO/Pemesanan, Pembelian), Akuntansi (staging `tampjurnal` dan posting ke `jurnal`/`detailjurnal`).
- Status sumber: `pemesanan.status` menggunakan nilai seperti `Belum Dibayar`, `Titip Faktur`, `Sudah Dibayar` (lihat seeder `database/seeders/AutoSeeders/PemesananTableSeeder.php:208`).

## Sumber Data & Tabel
- `pemesanan`: header PO/faktur supplier (status, total, ppn, meterai, tagihan).
- `detailpesan`: detail item PO.
- `akun_bayar`: daftar metode bayar beserta `kd_rek` untuk Kas/Bank (referensi backend yang sudah ada di `app/Http/Controllers/Farmasi/PembelianController.php:140`).
- `rekening`: master COA untuk validasi dan pelabelan `nm_rek`.
- `tampjurnal`/`tampjurnal2`: staging komposisi jurnal sebelum posting.
- `jurnal`/`detailjurnal`: header/detail jurnal yang diposting (lihat generator nomor di `app/Services/Akutansi/JurnalPostingService.php:125`).

## Komposisi Jurnal
- Pemesanan (PO) saat input: debit pengadaan + meterai, debit PPN Masukan, kredit Hutang/Kontra Pemesanan.
  - Implementasi existing: `app/Http/Controllers/Farmasi/PemesananController.php:84`.
- Pelunasan Hutang: debit Hutang Usaha, kredit Kas/Bank (akun bayar). Tambahkan baris biaya transaksi bank jika ada.
  - Template:
    - Debet: `Hutang Usaha` (`210-01`) = nilai `tagihan`.
    - Kredit: `Kas/Bank` (dari `akun_bayar.kd_rek`) = nilai `tagihan`.
    - Opsional: `Biaya Admin/MDR` (debet) vs akun biaya terkait.
- Posting dari staging menggunakan service terpadu: `JurnalPostingService::post` (`app/Services/Akutansi/JurnalPostingService.php:97`).

## Endpoint Backend (Rencana)
- `GET /api/farmasi/hutang` — daftar hutang berdasarkan `pemesanan` dengan filter: tanggal, supplier, status (`Belum Dibayar`, `Titip Faktur`).
- `GET /api/farmasi/hutang/akun-bayar` — ambil daftar metode bayar dan `kd_rek` Kas/Bank (reuse `PembelianController::getAkunBayar` di `app/Http/Controllers/Farmasi/PembelianController.php:140`).
- `POST /api/farmasi/hutang/stage` — body: `{ no_faktur, kd_rek_bayar, biaya_admin? }` → susun `tampjurnal`:
  - Debet `Hutang Usaha` (`210-01`) sebesar `tagihan`.
  - Kredit `Kas/Bank` (`kd_rek_bayar`).
  - Opsional baris biaya admin.
- `POST /api/farmasi/hutang/post` — gunakan `JurnalPostingService::post(no_bukti, keterangan, tgl_jurnal)` untuk posting gabungan `tampjurnal` + `tampjurnal2`.
- `PATCH /api/farmasi/hutang/{no_faktur}/mark-paid` — update `pemesanan.status` menjadi `Sudah Dibayar` setelah posting sukses.

## Alur UI (HutangObat.jsx)
- Tabel daftar hutang: `no_faktur`, `tgl_pesan`, `supplier`, `tagihan`, `status`, centang pilih.
- Panel pembayaran: pilih `Akun Bayar` (Kas/Bank), input `No Bukti`, `Keterangan`, tanggal posting, opsional biaya admin.
- Tombol `Preview` → memanggil `JurnalPostingService::preview` via endpoint preview (`app/Http/Controllers/Akutansi/JurnalController.php:546`).
- Tombol `Posting Pelunasan` → panggil `POST /api/farmasi/hutang/post`, tampilkan `no_jurnal`, dan tandai `pemesanan` sebagai `Sudah Dibayar`.
- Audit: tampilkan ringkasan debet/kredit dan daftar baris COA sebelum konfirmasi.

## Integrasi & Validasi
- Validasi keseimbangan: pastikan total debet = total kredit sebelum posting (`JurnalPostingService::post` akan menolak jika tidak seimbang, `app/Services/Akutansi/JurnalPostingService.php:111`).
- Penomoran jurnal: format `JRYYYYMMDDNNNNNN` aman lintas driver DB (lihat penyesuaian ekspresi suffix di `app/Services/Akutansi/JurnalPostingService.php:128`).
- Status PO: setelah posting sukses, ubah `pemesanan.status` → `Sudah Dibayar` dan simpan `no_jurnal` sebagai referensi.
- Idempotensi: hindari double posting — cek jika `pemesanan` sudah `Sudah Dibayar` maka blokir.
- Otorisasi: batasi akses aksi posting ke role Keuangan/Farmasi.

## Edge Case
- Partial payment: jika diperlukan, dukung nominal bayar parsial → debit Hutang sesuai nilai bayar, dan catat sisa pada `pemesanan`.
- Biaya bank/MDR: tambahkan baris debet ke akun biaya, dan kredit akun bank jika biaya dipotong.
- Titip Faktur: jika ada `titip_faktur`, ikuti status transisi (`Titip Faktur` → `Dibayar`) sebagaimana pola di aplikasi lama (`public/KeuanganHutangObatBelumLunas.java:1489`).

## Referensi Kode
- Staging jurnal di Farmasi: `app/Http/Controllers/Farmasi/PemesananController.php:84`.
- Helper staging/aggregate: `app/Http/Controllers/Farmasi/BaseInventoryController.php:68`.
- Preview & posting: `app/Http/Controllers/Akutansi/JurnalController.php:546`, `app/Http/Controllers/Akutansi/JurnalController.php:564`.
- Posting service: `app/Services/Akutansi/JurnalPostingService.php:97` dan generator nomor `app/Services/Akutansi/JurnalPostingService.php:128`.
- Data akun bayar: `app/Http/Controllers/Farmasi/PembelianController.php:140`.

## Rencana Implementasi Bertahap
- Tahap 1: Endpoint `GET /api/farmasi/hutang`, `GET /api/farmasi/hutang/akun-bayar`.
- Tahap 2: Endpoint `POST /api/farmasi/hutang/stage`, `POST /api/farmasi/hutang/post`, `PATCH mark-paid`.
- Tahap 3: UI `resources/js/Pages/farmasi/HutangObat.jsx` (tabel + form + preview + posting).
- Tahap 4: Logging & audit trail; penanganan partial payment & biaya bank (opsional).
# Inventori — Catatan Pengembangan Lanjutan

Dokumen ini merangkum pemahaman modul inventori berbasis file Java Swing lama dan mengusulkan rencana implementasi web modern (Laravel + Inertia React) untuk kebutuhan ke depan.

## Ringkasan Fitur: Riwayat Barang Medis

- Tujuan: Menampilkan riwayat pergerakan stok Obat/Alkes/BHP (awal, masuk, keluar, akhir) termasuk detail posisi, tanggal, jam, petugas, lokasi, status, batch, faktur, dan catatan.
- Sumber referensi: `public/inventory/DlgRiwayatBarangMedis.java` dan `public/inventory/DlgRiwayatBarangMedis.form`.
- Kolom tabel (sesuai dialog Java): Barang, Awal, Masuk, Keluar, Akhir, Posisi, Tanggal, Jam, Petugas, Lokasi, Status, No.Batch, No.Faktur, Keterangan (`public/inventory/DlgRiwayatBarangMedis.java:43-46`).
- Filter utama: Rentang tanggal, kata kunci, pilih barang, pilih lokasi gudang (`public/inventory/DlgRiwayatBarangMedis.java:316-356`, `public/inventory/DlgRiwayatBarangMedis.java:248-310`).
- Aksi: Cari, Reset, Cetak, Keluar (`public/inventory/DlgRiwayatBarangMedis.java:351-425`).
- Query inti: Join `riwayat_barang_medis` ↔ `databarang` ↔ `bangsal` dengan rentang tanggal dan filter opsional (`public/inventory/DlgRiwayatBarangMedis.java:454-465`, `public/inventory/DlgRiwayatBarangMedis.java:468-483`, `public/inventory/DlgRiwayatBarangMedis.java:633-667`).

## Desain Web yang Diusulkan

- Rute backend: `GET /farmasi/riwayat-barang-medis` untuk halaman; `GET /farmasi/riwayat-barang-medis/data` untuk data JSON berpaginasi.
- Lokasi frontend: `resources/js/Pages/farmasi/RiwayatBarangMedis.jsx` dengan Inertia.
- Skema respons JSON (contoh):
  - `items`: array berisi `{ kode_brng, nama_brng, stok_awal, masuk, keluar, stok_akhir, posisi, tanggal, jam, petugas, kd_bangsal, nm_bangsal, status, no_batch, no_faktur, keterangan }`
  - `meta`: `{ total, page, perPage }`
- Filter frontend:
  - Rentang tanggal (datepicker), kata kunci, pilih barang (search field/autocomplete), pilih lokasi (`kd_bangsal`).
  - Default: tanggal hari ini s.d. hari ini, `perPage=25`.
- Tabel frontend:
  - Kolom konsisten dengan dialog Java; tambahkan kolom ringkas “Barang” (`kode_brng nama_brng`) seperti Java (`public/inventory/DlgRiwayatBarangMedis.java:692-701`).
  - Pagination dan jumlah total.
- Cetak/Export:
  - HTML print view di rute `GET /farmasi/riwayat-barang-medis/print?...` untuk cetak cepat browser.
  - Export `CSV`/`Excel` dengan job server-side; integrasi PDF opsional via library dokumen (pilih sesuai dependensi proyek).

## Implementasi Backend (Laravel)

- Controller (contoh): `app/Http/Controllers/Farmasi/RiwayatBarangMedisController.php`
  - `index()`: render halaman Inertia.
  - `data(Request $req)`: validasi filter, bangun query join ke tabel `riwayat_barang_medis`, `databarang`, `bangsal`, paginasi.
  - `print(Request $req)`: render HTML untuk cetak atau hasilkan file.
- Query acuan dari Java:
  - Tanpa filter barang/lokasi: rentang tanggal (`public/inventory/DlgRiwayatBarangMedis.java:638-649`).
  - Dengan filter: nama barang, nama gudang, kata kunci multi-field (`public/inventory/DlgRiwayatBarangMedis.java:651-667`).
- Keamanan & Akses:
  - Gate/policy mis. `riwayat_obat_alkes_bhp` mengikuti semantik Java `isCek()` (`public/inventory/DlgRiwayatBarangMedis.java:719-721`).

## Model Data & Indeks

- Tabel utama: `riwayat_barang_medis`
  - Bidang penting: `kode_brng`, `stok_awal`, `masuk`, `keluar`, `stok_akhir`, `posisi`, `tanggal`, `jam`, `petugas`, `kd_bangsal`, `status`, `no_batch`, `no_faktur`, `keterangan`.
- Relasi:
  - `riwayat_barang_medis.kode_brng` ↔ `databarang.kode_brng`
  - `riwayat_barang_medis.kd_bangsal` ↔ `bangsal.kd_bangsal`
- Indeks yang disarankan:
  - Komposit `(tanggal, jam)` untuk sort.
  - `(kode_brng)`, `(kd_bangsal)` untuk filter.
  - Opsional `(status)`, `(no_batch)`, `(no_faktur)` untuk pencarian cepat.

## Antarmuka Pengguna (React)

- Header halaman mengikuti standar UI/UX: judul ringan dengan gradien dan meta total.
- Panel filter: tanggal awal/akhir, input kata kunci, pilih barang, pilih lokasi (gunakan komponen yang sudah ada atau input sederhana dulu).
- Tabel: scrollable, kolom tetap, baris hover, indikator loading.
- Aksi kanan atas: Cetak, Export (opsional), Reset.

## Kinerja & Skalabilitas

- Batasi `perPage` default 25–50, gunakan paginasi server-side.
- Debounce pencarian kata kunci 300–500 ms.
- Hindari `SELECT *`; pilih kolom eksplisit sesuai kebutuhan UI.
- Pertimbangkan materialized view/summary bila data sangat besar.

## Uji & Observabilitas

- Uji fungsional: filter tanggal, barang, lokasi, kata kunci, cetak/export.
- Uji beban: query dengan 100k+ baris, paginasi responsif.
- Logging audit: simpan parameter filter + pengguna untuk jejak akses (opsional).

## Langkah Migrasi dari Java Swing

- Tahap 1: Buat endpoint `data` dengan hasil identik pada kolom dan join referensi Java.
- Tahap 2: Implement UI tabel dan filter dasar; validasi hasil dengan sampling manual terhadap dialog Java.
- Tahap 3: Tambah cetak/export; pilih mekanisme sesuai dependensi proyek.
- Tahap 4: Hardening keamanan, indeks DB, optimasi query.

## Backlog Lanjutan

- Autocomplete barang dari `databarang` dengan pencarian kode/nama.
- Selector lokasi (`bangsal`) menyatu dengan modul Farmasi lain (re-use pola `kd_bangsal`).
- Ringkas statistik (total masuk/keluar) pada header meta rentang tanggal.
- Opsi ekspor Excel dengan template.
- Otorisasi granular per lokasi gudang.

---
Status saat ini: file Java Swing berfungsi sebagai referensi; halaman web belum tersedia. Dokumen ini menjadi panduan implementasi dan keputusan teknis untuk modul Riwayat Barang Medis.
