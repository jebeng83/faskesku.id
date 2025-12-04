# Rencana Penggabungan Form Pemesanan & Pembelian

## Ringkasan
- Tujuan: Menggabungkan alur Pemesanan (PO) dan Pembelian/Barang Masuk ke satu halaman `PembelianObat.jsx` dengan toggle mode.
- Manfaat: Satu sumber kebenaran, mengurangi duplikasi UI, mempercepat alur dari order → penerimaan.

## Sumber Referensi
- Form Web: `resources/js/Pages/farmasi/PembelianObat.jsx`
- Form Desktop: `public/inventory/DlgPemesanan.java`, `public/inventory/DlgPemesanan.form`

## Perbandingan Field
- Header yang sudah ada di web:
  - `no_faktur`, `tgl_beli`, `kd_rek`, `kode_suplier`, `nip`, `kd_bangsal`, `ppn`, `potongan`, `tagihan` (lihat `resources/js/Pages/farmasi/PembelianObat.jsx:498` dan grid header di sekitar baris `518–674`).
- Header pada desktop (PO):
  - `NoFaktur`, `TglPesan`/`Tgl Datang`, `TglFaktur`, `Jth.Tempo`, `Supplier (kdsup/nmsup)`, `Petugas (kdptg/nmptg)`, `Lokasi (kdgudang/nmgudang)`, `NoOrder` (lihat `public/inventory/DlgPemesanan.form:630–967`).
- Detail Item (web):
  - `kode_brng`, `nama_brng`, `kode_sat`, `no_batch`, `kadaluarsa`, `jumlah`, `h_beli`, `subtotal`, `dis`, `besardis`, `total` (contoh di `resources/js/Pages/farmasi/PembelianObat.jsx:690–916`).
- Detail Item (desktop):
  - Kolom tambahan pricing kelas: `Ralan`, `Kelas1/2/3`, `Utama`, `VIP`, `VVIP`, `Beli Luar`, `Jual Bebas`, `Karyawan`, `HPP`, `Isi`, `Isibesar`, `Dasar` (lihat inisialisasi kolom `public/inventory/DlgPemesanan.java:80–104`).

## Desain UI Terpadu
- Tambahkan dropdown `Mode` di header: `Pemesanan` | `Pembelian`.
- Dinamika kolom grid:
  - Mode `Pemesanan`: sembunyikan `no_batch`, `kadaluarsa`; gunakan `jumlah_pesan` dan `harga_rencana` (tetap pakai `jumlah`/`h_beli` untuk kompatibilitas, namun labelnya berubah di UI).
  - Mode `Pembelian`: tampilkan `no_batch`, `kadaluarsa`, `jumlah_terima`, `harga_beli`.
- Atribut tambahan header untuk PO:
  - `no_order` (SP/Order), `tgl_pesan`, `tgl_faktur`, `tgl_jatuh_tempo`. Mapping ke state baru pada `PembelianObat.jsx`.
- Opsi lanjut (opsional tahap 2): panel “Harga Kelas” untuk update price list (mirip kolom harga pada desktop) bila dibutuhkan.

## Alur Data & API
- Endpoint tetap terpisah namun di satu controller agar ringkas:
  - `POST /api/pemesanan/store` → simpan header `pemesanan` dan `detailpesan`.
  - `GET /api/pemesanan/list` → daftar PO.
  - `POST /api/pembelian/store` → simpan header `pembelian` dan `detailbeli` (sudah ada).
  - `POST /api/pembelian/from-po` → konversi PO menjadi pembelian (load detailpesan ke form pembelian; pengguna melengkapi batch & kadaluarsa).
- Alternatif: Satu endpoint dengan parameter `mode=order|purchase`, namun tetap dua tabel agar rapi dan kompatibel.

## Validasi
- Mode `Pemesanan`:
  - Wajib: `no_order`, `tgl_pesan`, `supplier`, `petugas`, `lokasi`, minimal 1 item.
  - Tidak wajib: `no_batch`, `kadaluarsa` (belum diketahui saat PO).
- Mode `Pembelian`:
  - Wajib: `no_faktur`, `tgl_beli`, `supplier`, `petugas`, `lokasi`, `items` dengan `no_batch` dan `kadaluarsa`.
- PPN mengikuti pola desktop: dihitung atas nilai setelah diskon, aktif jika konfigurasi `pakaippn='Yes'` (lihat logika di `public/inventory/DlgPemesanan.java:2038`).

## Mapping Field Utama
- `Lokasi`: `kd_bangsal` ↔ `kdgudang`/`nmgudang`.
- `Supplier`: `kode_suplier` ↔ `kdsup`/`nmsup`.
- `Petugas`: `nip` ↔ `kdptg`/`nmptg`.
- `No Order`: state baru `no_order` ↔ `NoOrder`.
- `Tanggal`: `tgl_beli` (purchase) ↔ `TglPesan`/`TglFaktur`/`TglTempo` (order).

## Dampak Basis Data
- Gunakan tabel terpisah yang lazim: `pemesanan`/`detailpesan` untuk PO, `pembelian`/`detailbeli` untuk penerimaan.
- Relasi konversi PO→Pembelian: simpan referensi `no_order` pada pembelian agar audit trail jelas.

## Rencana Implementasi Bertahap
1. Tambah dropdown `Mode` pada header `PembelianObat.jsx` dengan state `mode`.
2. Tambah field `no_order`, `tgl_pesan`, `tgl_faktur`, `tgl_tempo` di state saat mode `Pemesanan`.
3. Sembunyikan/tampilkan kolom grid sesuai mode (batch & kadaluarsa hanya untuk pembelian).
4. Buat controller PO (`Farmasi\PemesananController`) dan rute API dasar (list/store).
5. Implementasikan `from-po` untuk memuat PO ke form pembelian dan melengkapi data batch/kadaluarsa.
6. Uji end-to-end: buat PO, konversi ke pembelian, cek stok & jurnal sesuai `docs/inventori.md`.
7. Tambah cetak PO & penerimaan (print preview) selaras dengan komponen cetak farmasi.

## Catatan Integrasi dengan Kode Saat Ini
- Komponen grid dan aksi di `resources/js/Pages/farmasi/PembelianObat.jsx:690–916` sudah siap menerima adaptasi label & visibilitas per mode.
- Tombol aksi dan modal pencarian sudah mengacu komponen UI bersama (aksesibilitas lebih baik) di `resources/js/Pages/farmasi/PembelianObat.jsx:979–1013` dan `1016–1154`.
- Perhitungan PPN mengikuti pola “setelah diskon” yang sudah ada di web (`resources/js/Pages/farmasi/PembelianObat.jsx:929–961`).

## Risiko & Mitigasi
- Risiko data ganda jika PO & pembelian ditulis ke tabel yang sama → mitigasi: pisahkan tabel dan relasikan `no_order`.
- Risiko kebingungan pengguna pada satu form → mitigasi: gunakan toggle mode, label kontekstual, dan wizard sederhana saat konversi PO→Pembelian.

## Keputusan
- Bisa digabungkan dalam satu form dengan toggle mode dan konversi PO→Pembelian, mempertahankan konsistensi data dan alur operasional.

