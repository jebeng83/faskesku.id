# Dokumentasi Pengembangan Billing Rawat Jalan (Billing Ralan)

Tujuan dokumen ini adalah merangkum konsep, alur data, API, dan pemetaan fungsi dari implementasi lama berbasis Java (DlgBilingRalan) ke implementasi web (React + Laravel) agar memudahkan pengembangan dan verifikasi fitur billing pasien rawat jalan.

## Berkas Terkait di Proyek

- Frontend (React):
  - `resources/js/Pages/Akutansi/Billing.jsx` — halaman Billing pasien (tagihan, pembayaran, status permintaan)
  - `resources/js/Pages/Akutansi/KasirRalan.jsx` — daftar pasien rawat jalan (reg_periksa) untuk kasir
- Backend (Laravel):
  - Rute/Controller (contoh yang relevan):
    - `/akutansi/invoice/{no_rawat}` — header kunjungan & nota untuk billing
    - `/api/akutansi/billing` — API snapshot billing (CRUD) dan ringkasan
    - `/api/permintaan-lab/rawat/{no_rawat}` — status permintaan lab
    - `/api/permintaan-radiologi/rawat/{no_rawat}` — status permintaan radiologi
    - `/api/resep/rawat/{no_rawat}` — status permintaan resep/apotek
    - `/registration/get-registrations` — daftar `reg_periksa` (digunakan oleh KasirRalan)
- Implementasi lama (Java, referensi logic bisnis):
  - `public/DlgBilingRalan.java`
  - `public/DlgBilingRalan.form`
  - `public/cache/*.iyem` — cache master data (penjab, poli, dokter, dll.) untuk aplikasi desktop

## Konsep Utama Billing

1) Snapshot vs Preview
- Snapshot: data tagihan yang sudah diposting ke tabel `billing` (persisten), bisa di-edit/hapus melalui halaman Billing.
- Preview: data tindakan yang diakumulasi dari tabel sumber (Ralan Dokter/Paramedis, Lab, Radiologi, Obat/BHP, Operasi, dll.) ketika belum ada snapshot di `billing`. Pada mode preview, item di UI Billing tidak bisa di-edit/hapus. Pengguna perlu melakukan “Posting Billing” (di kasir) untuk membuat snapshot terlebih dahulu.

2) Kategori Biaya (Status)
- Registrasi
- Ralan Dokter
- Ralan Paramedis
- Ralan Dokter + Paramedis
- Laboratorium
- Radiologi
- Obat/BHP
- Obat Langsung
- Operasi/VK
- Tambahan
- Potongan

Kategori-kategori di atas merupakan padanan dari agregasi query di `DlgBilingRalan.java` dan digunakan untuk ringkasan pembayaran serta pengelompokan item di halaman Billing.

## Arsitektur Tingkat Tinggi

- Frontend (React):
  - Billing.jsx menyediakan tiga tab:
    - Data Tagihan: menampilkan item billing (snapshot/preview), pencarian, filter kategori, dan aksi tambah/edit/hapus (hanya untuk snapshot)
    - Pembayaran: ringkasan (subtotal per kategori, total, PPN bila ada, kembalian)
    - Status Permintaan: daftar permintaan Lab, Radiologi, dan Resep untuk `no_rawat` yang dimaksud
  - KasirRalan.jsx: daftar `reg_periksa` Ralan dengan filter dan tautan cepat ke halaman Billing dan Detail Pembayaran

- Backend (Laravel):
  - Endpoint invoice mengembalikan informasi header kunjungan & nota untuk ditampilkan di UI.
  - Endpoint billing mengembalikan item, ringkasan per status, serta menentukan apakah data berasal dari `billing` (snapshot) atau `preview` (agregasi dari tabel lain).
  - Endpoint permintaan (lab/radiologi/resep) mengembalikan status permintaan terkait `no_rawat`.

## API yang Digunakan

1) GET `/akutansi/invoice/{no_rawat}`
- Mengembalikan header kunjungan: no_rawat, tgl_registrasi, pasien (nama & no_rkm_medis), dokter, poli, penjamin.
- Jika ada nota, menyertakan informasi nota (jenis, no_nota, tanggal, jam).

2) GET `/api/akutansi/billing?no_rawat=...&q=...&status=...`
- Mengembalikan:
  - `items`: daftar item tagihan. Field penting: `tgl_byr`, `no`, `nm_perawatan`, `biaya`, `jumlah`, `tambahan`, `totalbiaya`, `status`, `source` (`billing`/`preview`), `noindex` (jika snapshot).
  - `summary`: `by_status` (subtotal per kategori), `grand_total`.
- Catatan: Jika `items[0].source === 'preview'`, UI Billing menampilkan keterangan bahwa edit/hapus dinonaktifkan karena belum ada snapshot.

3) POST `/api/akutansi/billing`
- Menambah item snapshot ke tabel `billing`.
- Body mirip dengan form di Billing.jsx: `{ no_rawat, tgl_byr, no, nm_perawatan, pemisah, biaya, jumlah, tambahan, status }`. Total per item dihitung di klien, disertakan dalam payload (`totalbiaya`).

4) PUT `/api/akutansi/billing/{noindex}`
- Mengubah item snapshot (hanya untuk `source='billing'`).

5) DELETE `/api/akutansi/billing/{noindex}`
- Menghapus item snapshot (hanya untuk `source='billing'`).

6) GET `/api/permintaan-lab/rawat/{no_rawat}`
7) GET `/api/permintaan-radiologi/rawat/{no_rawat}`
8) GET `/api/resep/rawat/{no_rawat}`
- Menampilkan status dan daftar permintaan terkait kunjungan.

9) GET `/registration/get-registrations?date=YYYY-MM-DD&search=...&status=...&per_page=...`
- Digunakan oleh halaman Kasir Ralan untuk memuat daftar `reg_periksa` per tanggal dengan relasi pasien/dokter/poli/penjamin.

## Pemetaan Fungsi Java (DlgBilingRalan.java) ke Implementasi Web

Berikut rangkuman fungsi inti di Java dan padanan/implikasi di web (React/Laravel):

- `isRawat()` / `isRawat2()`
  - Tujuan: Mengisi header kunjungan (dokter, poli, pasien, penjamin), menentukan nota, dan cek apakah sudah ada snapshot di `billing`.
  - Padanan web: `GET /akutansi/invoice/{no_rawat}` dipanggil oleh Billing.jsx untuk menampilkan header; keberadaan snapshot ditentukan dari hasil `GET /api/akutansi/billing` (`source='billing'` vs `source='preview'`).

- `prosesCariReg()`
  - Tujuan: Mengambil detail `reg_periksa` (tgl, jam, biaya_reg, umur, dsb.).
  - Padanan web: Informasi serupa tampil di header invoice dan tabel Kasir Ralan (melalui `get-registrations`).

- `prosesCariRwJlDr()` / `prosesCariRwJlPr()` / `prosesCariRwJlDrPr()`
  - Tujuan: Mengagregasi tindakan Ralan (dokter, paramedis, gabungan) dari tabel `rawat_jl_*` dan `jns_perawatan` untuk menghitung jumlah, biaya, tambahan (material, manajemen, KSO), dan total.
  - Padanan web: Pada mode preview, API `billing` menyiapkan agregasi kategori “Ralan Dokter”, “Ralan Paramedis”, dan “Ralan Dokter + Paramedis” agar tampil di UI.

- `prosesCariPeriksaLab()` / `prosesCariRadiologi()`
  - Tujuan: Mengagregasi item lab/radiologi (jumlah, biaya, total dokter/petugas, KSO, BHP) berdasarkan `periksa_lab`/`periksa_radiologi` dan jenis perawatan.
  - Padanan web: Mode preview menambahkan kategori “Laboratorium” dan “Radiologi” ke item Billing beserta subtotal untuk ringkasan.

- `prosesCariObat()`
  - Tujuan: Mengakumulasi obat/BHP dari `detail_pemberian_obat` + `databarang`/`jenis`, menghitung jumlah, tambahan (embalase+tuslah), total bersih, dan total beli.
  - Padanan web: Mode preview menambahkan kategori “Obat/BHP”. Bila ada “Obat Langsung”, ditambahkan kategori tersendiri.

- `prosesCariOperasi()`
  - Tujuan: Menyusun tagihan operasi dari `operasi` + `paket_operasi` dan `beri_obat_operasi` (obat OK), menghitung komponen biaya.
  - Padanan web: Mode preview menambahkan kategori “Operasi/VK” bila ada.

- `isHitung()`
  - Tujuan: Menyatukan seluruh subtotal kategori (registrasi, ralan, lab, radiologi, obat, operasi, tambahan, potongan), menghitung grand total, PPN (jika ada), dan kekurangan/bayar.
  - Padanan web: Ringkasan di tab “Pembayaran” (`PembayaranTab` di Billing.jsx) menampilkan subtotal per kategori dan grand total. Perhitungan PPN dan kembalian mengikuti konfigurasi (bisa ditambahkan sesuai kebutuhan).

- `isKembali()`
  - Tujuan: Menghitung kembalian jika pembayaran > total tagihan.
  - Padanan web: Ditunjukkan di ringkasan pembayaran (bila ada input bayar/kembalian). Saat ini UI berfokus pada ringkasan; input bayar per akun dapat ditambahkan kemudian.

- `tampilAkunBankJateng*()`, `tampilAkunBankPapua*()`, `tampilAkunBankJabar*()`, `tampilAkunBankBRI*()`, `tampilAkunBankMandiri*()`
  - Tujuan: Menampilkan/memilih akun bank spesifik untuk pembayaran/host-to-host.
  - Padanan web: Belum diimplementasikan. Perlu modul integrasi per bank dan mapping akun. Rujuk berkas `public/cache/*.iyem` untuk referensi master data yang dulu digunakan desktop.

- `tampilAkunBayar*()`, `tampilAkunPiutang*()`, `tampilAkunBayarTersimpan()`, `tampilAkunPiutangTersimpan()`
  - Tujuan: Menyiapkan daftar akun pembayaran/piutang dan yang sudah tersimpan.
  - Padanan web: Belum diimplementasikan. Rencana: endpoint akun bayar/piutang, serta UI untuk rekonsiliasi di tab Pembayaran.

- `isSimpan()`
  - Tujuan: Menyimpan snapshot ke tabel `billing`, mengisi temporary, jurnal, dan nota pembayaran.
  - Padanan web: Aksi “Posting Billing” di Kasir (belum di halaman Billing.jsx) perlu menulis snapshot, membuat entri jurnal (bila sistem akutansi mengharuskan), dan menyiapkan nota. Saat ini halaman Billing.jsx mendukung CRUD item snapshot, namun posting agregat penuh sebaiknya dilakukan di halaman Kasir.

## Ringkasan UI (Billing.jsx)

- Input nomor rawat, tombol “Muat” memanggil `/akutansi/invoice/{no_rawat}` dan `/api/akutansi/billing`.
- Tab “Data Tagihan”:
  - Tambah Item (POST snapshot)
  - Filter kategori dan pencarian item
  - Edit/Hapus item hanya untuk `source='billing'` (snapshot)
  - Notifikasi jika dalam mode preview
- Tab “Pembayaran”:
  - Menampilkan subtotal per kategori dan grand total; komponen PPN dan kembalian dapat diaktifkan sesuai kebutuhan.
- Tab “Status Permintaan”:
  - Memuat status permintaan dari API lab/radiologi/resep berdasarkan `no_rawat`.

## Ringkasan UI (KasirRalan.jsx)

- Menampilkan daftar `reg_periksa` Ralan per rentang tanggal dengan filter penjamin, poli, dokter, status, status bayar, pencarian, dan urutan.
- Aksi cepat per baris: tautan ke halaman Billing dan Detail Pembayaran ralan.
- Menggunakan endpoint `/registration/get-registrations` untuk memuat data.

## Perhitungan & Ringkasan

- Subtotal per kategori dihitung dari item (snapshot) atau agregasi (preview).
- Grand total = penjumlahan semua subtotal, dikurangi Potongan, ditambah Tambahan, ditambah PPN (jika ada).
- Kembalian = Bayar − Grand Total (jika Bayar > Grand Total).
- Piutang: jika sebagian tagihan belum dibayar, catat sebagai piutang sesuai penjamin/akun.

## Catatan tentang `public/cache/*.iyem`

- Berkas cache `.iyem` di aplikasi desktop menyimpan master data (penjab, poli, dokter, dll.) untuk akses cepat.
- Di implementasi web, master data diambil melalui endpoint API. Jika diperlukan, mekanisme cache sisi server/klien dapat disiapkan agar performa tetap baik.

## Pengujian

1) Halaman Kasir Ralan: `http://127.0.0.1:8002/akutansi/kasir-ralan`
- Muat rentang tanggal aktif, verifikasi daftar pasien dan filter.
- Buka Billing dari tautan “Billing” untuk `no_rawat` terpilih.

2) Halaman Billing: `http://127.0.0.1:8001/akutansi/billing` atau sesuai server dev Anda
- Masukkan `no_rawat` dan klik “Muat”.
- Verifikasi:
  - Data Tagihan menampilkan item sesuai snapshot/preview, tombol edit/hapus nonaktif untuk preview.
  - Tab Pembayaran menampilkan ringkasan kategori dan grand total.
  - Tab Status Permintaan menampilkan permintaan lab/radiologi/resep.

## Rencana Pengembangan Lanjutan

- Menambahkan aksi “Posting Billing” di halaman Kasir untuk membuat snapshot lengkap dari agregasi preview (meniru `isSimpan()` di Java).
- Menyediakan modul akun bayar dan piutang, termasuk integrasi bank (Jateng/BRI/Jabar/Papua/Mandiri) sesuai kebutuhan.
- Menambahkan konfigurasi PPN untuk obat/jasa yang relevan dan mengalirkannya ke ringkasan pembayaran.
- Menyediakan cetak nota, jurnal akutansi, dan rekonsiliasi pembayaran.

## Perbedaan Penting vs Implementasi Desktop (Java)

- Desktop melakukan agregasi langsung via SQL dan menyimpan sementara ke tabel temporary; web melakukan agregasi melalui service/controller dan mengirimkan hasil ke UI.
- Desktop menggunakan cache `.iyem` untuk master data; web mengandalkan endpoint API dan dapat menambahkan cache sisi klien.
- Mode preview di web dirancang untuk mencegah edit/hapus sebelum ada snapshot, menjaga integritas data.

## Referensi Cepat

- Billing.jsx: komponen utama billing, form CRUD item snapshot, tab ringkasan pembayaran, status permintaan.
- KasirRalan.jsx: daftar `reg_periksa` Ralan, filter, dan tautan ke Billing.
- DlgBilingRalan.java: sumber referensi agregasi kategori dan alur bisnis (registrasi, ralan, lab, radiologi, obat, operasi, tambahan/potongan, akun bayar/piutang, bank, PPN, kembalian).

Jika Anda memerlukan detail tambahan (misal struktur payload dari endpoint tertentu, atau penyesuaian kategori/PPN), mohon informasikan agar dokumentasi diperbarui sesuai implementasi terbaru.