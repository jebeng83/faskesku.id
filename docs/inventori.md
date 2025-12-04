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

## Master Data
- Entri master barang dikelola di `DlgBarang.java`, menampilkan atribut harga beli, dasar/HPP, persentase markup untuk berbagai kelas layanan, satuan besar/kecil, dan kategori/golongan.
  - Contoh kolom yang diambil: `public/inventory/DlgBarang.java:2518` dan `public/inventory/DlgBarang.java:2907`.
- Pencarian dan seleksi supplier tersedia di `InventoryCariSuplier.java` dan daftar supplier di `InventorySuplier.java`.

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
  - Helper saat ini menulis kolom `rekening`/`keterangan` yang tidak kompatibel dengan skema Akutansi.
    - Lihat penulisan di `app/Http/Controllers/Farmasi/BaseInventoryController.php:57-62`.
    - Model staging Farmasi saat ini: `app/Models/Farmasi/TampJurnal.php:7-12`.
  - Rekomendasi: ubah penulisan staging menjadi `kd_rek` dan (opsional) `nm_rek` agar terbaca oleh layanan posting Akutansi (tanpa mengubah alur transaksi Farmasi).
- Mapping akun bersumber dari `set_akun` (COA pusat) dan dipakai konsisten di seluruh transaksi Farmasi:
  - Daftar kunci akun penting tersedia di `app/Models/Akutansi/SetAkun.php:20-85`.
  - Contoh staging baris jurnal di transaksi Farmasi:
    - Pemesanan/PO: `app/Http/Controllers/Farmasi/PemesananController.php:78-86`.
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
