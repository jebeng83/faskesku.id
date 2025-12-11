# Analisa Komprehensif Modul Akuntansi Faskesku ID

## 1. Ringkasan Eksekutif

Modul Akuntansi di Faskesku ID adalah sistem keuangan terintegrasi yang menangani pencatatan jurnal, billing pasien, buku besar, neraca, dan laporan keuangan lainnya. Sistem ini dibangun dengan teknologi modern (Laravel + React/Inertia) namun mengikuti logika bisnis dari aplikasi legacy SIMRS Khanza berbasis Java Swing.

### Teknologi Stack
- **Backend**: Laravel 12 (PHP 8.2.4)
- **Frontend**: React 19 dengan Inertia.js v2
- **Database**: MySQL (SIMRS Khanza schema, 1.114 tabel)
- **Referensi Legacy**: Java Swing (SIMRS Khanza)

---

## 2. Arsitektur Modul Akuntansi

### 2.1 Struktur Komponen Frontend

Modul akuntansi terletak di `resources/js/Pages/Akutansi/` dengan komponen-komponen berikut:

#### A. **Billing.jsx** - Manajemen Tagihan Pasien
**Fungsi Utama:**
- Menampilkan dan mengelola item billing pasien (snapshot/preview)
- Proses snapshot billing ke tabel `billing`
- Posting jurnal otomatis setelah simpan item
- Integrasi dengan nota_jalan
- Tab Pembayaran untuk ringkasan dan posting snapshot
- Tab Status Permintaan (Lab, Radiologi, Resep)

**Alur Kunci:**
1. Input `no_rawat` → Load invoice header & billing items
2. Mode Preview: Agregasi dari tabel operasional (rawat_jl_*, resep, lab, dll)
3. Mode Snapshot: Data dari tabel `billing` (persisten, bisa edit/hapus)
4. Posting Billing: Snapshot → nota_jalan → stage jurnal → post jurnal

**Integrasi API:**
- `GET /akutansi/invoice/{no_rawat}` - Header kunjungan & nota
- `GET /api/akutansi/billing` - Items billing (snapshot/preview)
- `POST /api/akutansi/billing` - Simpan item snapshot
- `POST /api/akutansi/nota-jalan` - Buat nota jalan
- `POST /api/akutansi/jurnal/stage-from-billing` - Stage jurnal dari billing
- `POST /api/akutansi/jurnal/post-staging` - Posting jurnal ke tabel permanen

#### B. **Jurnal.jsx** - Manajemen Jurnal Umum
**Fungsi Utama:**
- View, create, edit, delete jurnal umum (jenis 'U')
- Preview & posting dari `tampjurnal` (staging)
- Validasi keseimbangan debet=kredit
- Filter berdasarkan tanggal, jenis, pencarian

**Fitur Khusus:**
- Jurnal jenis 'P' (Posting Transaksi) bersifat read-only
- Jurnal jenis 'U' (Umum/Manual) dapat diubah/hapus
- Modal preview tampjurnal sebelum posting
- Validasi real-time keseimbangan debet/kredit

#### C. **Rekening.jsx** - Master Chart of Account (COA)
**Fungsi Utama:**
- CRUD akun rekening (master COA)
- Manajemen hierarki akun induk-sub (level 0 & 1)
- Tampilan daftar dan tree view hierarkis
- Mapping ke tabel `subrekening` untuk relasi induk-anak

**Struktur Data:**
- `rekening`: Master akun (kd_rek, nm_rek, tipe, balance, level)
- `subrekening`: Relasi induk → anak (kd_rek, kd_rek2)
- Tipe: N (Neraca), R (Rugi/Laba), M (Perubahan Modal)
- Balance: D (Debet), K (Kredit)

#### D. **RekeningTahun.jsx** - Saldo Awal per Tahun
**Fungsi Utama:**
- Input/edit saldo awal per akun per tahun
- Menampilkan mutasi debet/kredit tahun berjalan
- Perhitungan saldo akhir berdasarkan saldo awal + mutasi

#### E. **BukuBesar.jsx** - Laporan Buku Besar
**Fungsi Utama:**
- Menampilkan pergerakan akun per periode
- Saldo berjalan (running balance)
- Filter berdasarkan akun, tahun, bulan, tanggal

#### F. **Neraca.jsx** - Laporan Keuangan
**Fungsi Utama:**
- Laba Rugi (Income Statement)
- Perubahan Modal (Statement of Changes in Equity)
- Neraca (Balance Sheet)
- Input/edit saldo awal untuk akun Neraca

#### G. **CashFlow.jsx** - Laporan Arus Kas
**Fungsi Utama:**
- Kas Awal, Kas Masuk, Kas Keluar, Kas Akhir
- Filter berdasarkan rentang tanggal

#### H. **JurnalPenyesuaian.jsx** - Jurnal Penyesuaian
**Fungsi Utama:**
- Membuat jurnal penyesuaian manual (jenis 'P')
- Template untuk penyesuaian umum (akrual, prepayment, depresiasi)

#### I. **JurnalPenutup.jsx** - Jurnal Penutup
**Fungsi Utama:**
- Generate jurnal penutup otomatis untuk akun nominal (tipe='R')
- Transfer laba/rugi ke modal
- Preview sebelum posting

#### J. **PengaturanRekening.jsx** - Mapping COA ke Proses Operasional
**Fungsi Utama:**
- Mapping akun COA ke berbagai proses (Umum, Ralan, Ranap)
- Konfigurasi akun untuk: Pendapatan, Beban, Utang, KSO, HPP, Persediaan
- Tab: Umum, Tarif Ralan, Tarif Ranap

#### K. **AkunBayar.jsx** - Master Metode Pembayaran
**Fungsi Utama:**
- CRUD metode pembayaran (nama_bayar)
- Mapping ke akun COA (kd_rek)
- Konfigurasi PPN/MDR per metode bayar (persentase)

#### L. **AkunPiutang.jsx** - Master Akun Piutang
**Fungsi Utama:**
- CRUD mapping piutang berdasarkan penjamin (kd_pj)
- Mapping ke akun COA (kd_rek)

#### M. **KasirRalan.jsx** - Daftar Pasien Rawat Jalan untuk Kasir
**Fungsi Utama:**
- Daftar `reg_periksa` Ralan dengan filter
- Link cepat ke halaman Billing dan Detail Pembayaran

---

## 3. Struktur Database Kunci

### 3.1 Tabel Jurnal & Buku Besar

#### `jurnal` (Header Jurnal)
```sql
- no_jurnal (PK): Format JRYYYYMMDDNNNNNN
- no_bukti: Nomor bukti transaksi (bisa no_nota, no_rawat, dll)
- tgl_jurnal: Tanggal jurnal
- jam_jurnal: Waktu jurnal
- jenis: 'U' (Umum/Manual) atau 'P' (Posting Transaksi)
- keterangan: Deskripsi transaksi
```

#### `detailjurnal` (Detail Jurnal)
```sql
- no_jurnal (FK): Relasi ke jurnal
- kd_rek (FK): Relasi ke rekening (COA)
- debet: Nilai debet
- kredit: Nilai kredit
```

#### `tampjurnal` (Staging Jurnal)
```sql
- kd_rek (PK): Kode rekening
- nm_rek: Nama rekening (temporary, untuk preview)
- debet: Nilai debet staging
- kredit: Nilai kredit staging
```

**Catatan Penting:**
- `tampjurnal` adalah staging area sebelum posting ke `jurnal` & `detailjurnal`
- Harus selalu seimbang (total debet = total kredit) sebelum posting
- Dikosongkan setelah posting sukses

### 3.2 Tabel Billing & Nota

#### `billing` (Snapshot Tagihan Pasien)
```sql
- noindex (PK): Auto-increment
- no_rawat (FK): Nomor rawat pasien
- tgl_byr: Tanggal pembayaran
- no: Keterangan/kode tambahan
- nm_perawatan: Nama item tagihan
- pemisah: Kode kategori (char(1))
- biaya: Harga satuan
- jumlah: Kuantitas
- tambahan: Biaya tambahan
- totalbiaya: Total per item
- status: Kategori enum (Laborat, Radiologi, Obat, Ralan Dokter, dll)
```

**Konsep Snapshot vs Preview:**
- **Snapshot**: Data persisten di tabel `billing`, bisa di-edit/hapus
- **Preview**: Agregasi real-time dari tabel operasional (rawat_jl_*, resep, lab), read-only

#### `nota_jalan` (Nota Rawat Jalan)
```sql
- no_rawat (PK): Nomor rawat
- no_nota (UNIQUE): Nomor nota (format: YYYY/MM/DD/RJ/NNNN)
- tanggal: Tanggal nota
- jam: Waktu nota
```

#### `nota_inap` (Nota Rawat Inap)
```sql
- no_rawat (PK): Nomor rawat
- no_nota (UNIQUE): Nomor nota
- tanggal: Tanggal nota
- jam: Waktu nota
- Uang_Muka: Deposit pasien
```

### 3.3 Tabel Chart of Account

#### `rekening` (Master COA)
```sql
- kd_rek (PK): Kode akun (varchar(15))
- nm_rek: Nama akun
- tipe: 'N' (Neraca), 'R' (Rugi/Laba), 'M' (Perubahan Modal)
- balance: 'D' (Debet), 'K' (Kredit)
- level: '0' (Akun Utama/Induk), '1' (Sub Akun)
```

#### `subrekening` (Relasi Induk-Sub)
```sql
- kd_rek: Kode akun induk
- kd_rek2: Kode akun anak (sub-akun)
```

#### `rekeningtahun` (Saldo Awal per Tahun)
```sql
- thn: Tahun buku
- kd_rek (FK): Kode rekening
- saldo_awal: Saldo awal tahun
```

### 3.4 Tabel Konfigurasi

#### `set_akun_ralan` (Mapping COA untuk Rawat Jalan)
Kolom-kolom mapping untuk berbagai pos akuntansi:
- Suspen_Piutang_Tindakan_Ralan
- Pendapatan_Tindakan_Ralan
- Beban_Jasa_Medik_Dokter_Tindakan_Ralan
- Utang_Jasa_Medik_Dokter_Tindakan_Ralan
- Beban_KSO_Tindakan_Ralan
- Utang_KSO_Tindakan_Ralan
- HPP_BHP_Tindakan_Ralan
- Persediaan_BHP_Tindakan_Ralan
- ... (dan banyak lagi untuk kategori lain: Laborat, Radiologi, Obat, dll)

#### `set_akun_ranap` (Mapping COA untuk Rawat Inap)
Struktur mirip dengan `set_akun_ralan` namun untuk layanan Rawat Inap.

#### `akun_bayar` (Master Metode Pembayaran)
```sql
- nama_bayar (PK): Nama metode bayar
- kd_rek (FK): Akun COA untuk pembayaran
- ppn: Persentase PPN/MDR (biasanya 0, 1, 2)
```

#### `akun_piutang` (Master Akun Piutang)
```sql
- nama_bayar (PK): Nama untuk piutang
- kd_pj (FK): Kode penjamin
- kd_rek (FK): Akun COA untuk piutang
```

---

## 4. Alur Bisnis Utama

### 4.1 Alur Billing & Posting Jurnal Otomatis

**Skenario: Pasien Rawat Jalan melakukan pembayaran**

1. **Input Tindakan di Poli**
   - Dokter/Petugas input tindakan → tercatat di `rawat_jl_dr`, `rawat_jl_pr`, `rawat_jl_drpr`
   - Status awal: "Belum"

2. **Kasir Membuka Billing**
   - Buka halaman Billing.jsx
   - Input `no_rawat` → Load invoice header & billing items
   - Jika belum ada snapshot: Mode Preview (agregasi dari tabel operasional)
   - Jika sudah ada snapshot: Mode Snapshot (data dari tabel `billing`)

3. **Posting Billing (Snapshot)**
   - Pilih kategori biaya yang akan disnapshot
   - Input pembayaran (bayar, piutang, PPN)
   - Klik "Simpan" di tab Pembayaran
   - Alur backend:
     a. Snapshot ke tabel `billing` (POST `/api/akutansi/nota-jalan/snapshot`)
     b. Buat `nota_jalan` jika belum ada (POST `/api/akutansi/nota-jalan`)
     c. Stage jurnal ke `tampjurnal` (POST `/api/akutansi/jurnal/stage-from-billing`)
     d. Posting jurnal ke `jurnal` & `detailjurnal` (POST `/api/akutansi/jurnal/post-staging`)

4. **Komposisi Jurnal Otomatis**
   ```
   Debet:
   - Kas/Bank (dari akun_bayar.kd_rek) = nilai bayar
   - Piutang (dari akun_piutang.kd_rek) = nilai piutang
   - Suspen Piutang (dari set_akun_ralan) = total tagihan
   
   Kredit:
   - Pendapatan per kategori (dari set_akun_ralan atau master rekening) = total per kategori
   - PPN Keluaran (jika ada) = nilai PPN
   ```

### 4.2 Alur Posting Jurnal Manual

**Skenario: Membuat jurnal umum manual**

1. Buka halaman Jurnal.jsx
2. Klik "Tambah Jurnal Umum"
3. Input header: tanggal, waktu, no_bukti, keterangan
4. Input detail: minimal 2 baris (debet & kredit)
5. Validasi: total debet harus = total kredit
6. Simpan → Langsung posting ke `jurnal` & `detailjurnal` (tidak melalui `tampjurnal`)

### 4.3 Alur Posting dari TampJurnal

**Skenario: Posting jurnal yang sudah di-stage dari modul lain**

1. Buka halaman Jurnal.jsx
2. Klik "Preview & Posting dari TampJurnal"
3. Sistem menampilkan preview isi `tampjurnal`:
   - Jumlah baris
   - Total debet & kredit
   - Status seimbang/tidak seimbang
4. Input: tanggal posting, no_bukti (opsional), keterangan (opsional)
5. Klik "Posting ke Jurnal" → Posting ke `jurnal` & `detailjurnal`, lalu kosongkan `tampjurnal`

---

## 5. Mapping dari Java Legacy ke Implementasi Web

### 5.1 Jurnal.java → Laravel JournalService

**Java (`public/Jurnal.java`):**
- Method `simpanJurnal(nobukti, jenis, keterangan)`
- Validasi debet=kredit dari `tampjurnal`
- Generate `no_jurnal` format `JRYYYYMMDDNNNNNN`
- Insert ke `jurnal` & `detailjurnal`
- Kosongkan `tampjurnal` setelah posting

**Laravel Equivalent:**
- Service: `App/Services/Akutansi/JournalService.php`
- Method: `postFromStaging($noBukti, $jenis, $keterangan)`
- Endpoint: `POST /api/akutansi/jurnal/post-staging`

**Perbedaan:**
- Java menggunakan retry logic untuk penomoran jika insert gagal
- Laravel menggunakan transaksi database untuk atomicity

### 5.2 DlgRekening.java → Rekening.jsx

**Java (`public/DlgRekening.java`):**
- Form CRUD rekening dengan hierarki induk-sub
- Method `tampil()`: Query rekursif untuk menampilkan hierarki (sampai 13 level!)
- Popup menu: "Buat Sub Akun", "Jadikan Sub", "Jadikan Utama"
- Mapping ke tabel `subrekening` untuk relasi

**React Equivalent (`Rekening.jsx`):**
- Form CRUD dengan mode "utama" atau "sub"
- API endpoint untuk hierarki: `/api/akutansi/rekening/{kd_rek}/children`
- Tree view dengan lazy loading (expand untuk load children)
- Endpoint khusus: `POST /api/akutansi/rekening/{kd_rek}/make-sub`, `make-induk`

**Perbedaan:**
- Java: Query rekursif langsung di database (sangat kompleks, nested sampai 13 level)
- React: Lazy loading per level, lebih efisien untuk UI

### 5.3 DlgRekeningTahun.java → RekeningTahun.jsx

**Java (`public/DlgRekeningTahun.java`):**
- Form input saldo awal per tahun per akun
- Method `tampil()`: Join `rekening` & `rekeningtahun`, hitung mutasi dari `jurnal`/`detailjurnal`
- Perhitungan saldo akhir: `saldo_awal + (mutasi_debet - mutasi_kredit)` berdasarkan `balance` akun

**React Equivalent:**
- Form input/edit saldo awal
- API endpoint: `GET /api/akutansi/rekeningtahun?thn=YYYY`
- Backend menghitung mutasi dan saldo akhir

**Logika Perhitungan:**
```php
// Jika balance = 'D' (Debet)
mutasi_debet = SUM(detailjurnal.debet)
mutasi_kredit = SUM(detailjurnal.kredit)
saldo_akhir = saldo_awal + (mutasi_debet - mutasi_kredit)

// Jika balance = 'K' (Kredit)
mutasi_debet = SUM(detailjurnal.kredit)  // Dibalik!
mutasi_kredit = SUM(detailjurnal.debet)  // Dibalik!
saldo_akhir = saldo_awal + (mutasi_debet - mutasi_kredit)
```

### 5.4 DlgBilingRalan.java → Billing.jsx

**Java (`public/DlgBilingRalan.java` - referensi dari docs):**
- Agregasi biaya dari berbagai sumber: rawat_jl_*, resep, lab, radiologi
- Method `isSimpan()`: Snapshot ke `billing`, buat nota, posting jurnal
- Konsep "preview" vs "snapshot" sudah ada di Java

**React Equivalent (`Billing.jsx`):**
- Mode Preview: Agregasi via API dari tabel operasional
- Mode Snapshot: Data dari tabel `billing`
- Tab Pembayaran: Ringkasan kategori, input bayar/piutang, posting snapshot
- Alur posting: Snapshot → nota_jalan → stage jurnal → post jurnal

**Perbedaan:**
- Java: Semua agregasi dilakukan di satu form, langsung snapshot & posting
- React: Pemisahan jelas antara preview dan snapshot, posting dilakukan secara eksplisit

---

## 6. Konsep Penting & Best Practices

### 6.1 Suspen Piutang (Suspense Receivable)

**Konsep:**
Akun penampung sementara (`kd_rek: 117004`) untuk nilai tagihan pasien sebelum diklasifikasikan menjadi Piutang atau dibayar.

**Alur:**
1. **Posting Billing**: Debet Suspen Piutang, Kredit Pendapatan
2. **Re-klasifikasi**: Debet Piutang, Kredit Suspen Piutang
3. **Pembayaran**: Debet Kas/Bank, Kredit Piutang

**Manfaat:**
- Memudahkan rekonsiliasi
- Pemisahan proses pengakuan pendapatan dengan pengakuan piutang
- Saldo Suspen idealnya kembali ke nol setelah re-klasifikasi

### 6.2 Single Posting Point

**Prinsip:**
Posting jurnal harus dilakukan dari satu titik sumber kebenaran untuk setiap transaksi.

**Contoh:**
- Posting jurnal untuk tindakan Ralan dilakukan saat simpan tindakan di controller Rawat Jalan
- Kasir hanya melakukan agregasi dan cetak, tidak melakukan posting ulang

**Manfaat:**
- Mencegah double-posting
- Memudahkan audit trail
- Konsistensi data

### 6.3 Idempotensi & Guard Rails

**Idempotency Key:**
Gunakan kombinasi `no_rawat + jenis + tgl/jam + kd_jenis_prw` untuk mencegah double posting.

**Guard Rails:**
1. Validasi COA mandatory sebelum posting
2. Debet=Kredit wajib lulus (hard validation)
3. Transaksi atomic (rollback jika ada kegagalan)
4. Normalisasi waktu server (timezone konsisten)
5. Penomoran `no_jurnal` aman terhadap concurrency (locking)

### 6.4 PPN (Pajak Pertambahan Nilai)

**Kolom PPN di Database:**
- `akun_bayar.ppn`: Persentase PPN default per metode bayar (biasanya 0, 1, 2 sebagai persentase)
- `pembelian.ppn`: Nilai nominal PPN per faktur pembelian
- `detail_nota_jalan.besarppn`: Nilai nominal PPN per nota

**Catatan:**
- Beberapa instalasi menggunakan kolom `ppn` sebagai biaya admin/MDR, bukan PPN nasional
- Konsistensi penting: pastikan makna `ppn` sama di seluruh modul

**Akun PPN di COA:**
- PPN Masukan (aktiva lancar): Didebet saat pembelian
- PPN Keluaran (kewajiban lancar): Dikredit saat penjualan

---

## 7. Endpoint API Utama

### 7.1 Billing
- `GET /akutansi/invoice/{no_rawat}` - Header invoice & nota
- `GET /api/akutansi/billing` - Items billing (snapshot/preview)
- `POST /api/akutansi/billing` - Simpan item snapshot
- `PUT /api/akutansi/billing/{noindex}` - Edit item snapshot
- `DELETE /api/akutansi/billing/{noindex}` - Hapus item snapshot
- `POST /api/akutansi/nota-jalan` - Buat nota jalan
- `GET /api/akutansi/nota-jalan/exists` - Cek keberadaan nota
- `POST /api/akutansi/nota-jalan/snapshot` - Snapshot billing dari preview

### 7.2 Jurnal
- `GET /api/akutansi/jurnal` - List jurnal dengan filter
- `POST /api/akutansi/jurnal` - Buat jurnal umum manual
- `GET /api/akutansi/jurnal/{no_jurnal}` - Detail jurnal
- `PUT /api/akutansi/jurnal/{no_jurnal}` - Edit jurnal (hanya jenis 'U')
- `DELETE /api/akutansi/jurnal/{no_jurnal}` - Hapus jurnal (hanya jenis 'U')
- `POST /api/akutansi/jurnal/preview` - Preview isi tampjurnal
- `POST /api/akutansi/jurnal/post` - Posting dari tampjurnal
- `POST /api/akutansi/jurnal/stage-from-billing` - Stage jurnal dari billing
- `POST /api/akutansi/jurnal/post-staging` - Posting dari staging

### 7.3 Rekening (COA)
- `GET /api/akutansi/rekening` - List rekening (dengan filter level, induk_kd)
- `POST /api/akutansi/rekening` - Buat rekening baru
- `PUT /api/akutansi/rekening/{kd_rek}` - Edit rekening
- `DELETE /api/akutansi/rekening/{kd_rek}` - Hapus rekening
- `GET /api/akutansi/rekening/{kd_rek}/children` - Sub-akun dari induk
- `POST /api/akutansi/rekening/{kd_rek}/make-sub` - Jadikan sebagai sub-akun
- `POST /api/akutansi/rekening/{kd_rek}/make-induk` - Jadikan sebagai akun utama

### 7.4 Rekening Tahun
- `GET /api/akutansi/rekeningtahun` - List saldo awal per tahun
- `POST /api/akutansi/rekeningtahun` - Upsert saldo awal
- `PUT /api/akutansi/rekeningtahun/{thn}/{kd_rek}` - Update saldo awal
- `DELETE /api/akutansi/rekeningtahun/{thn}/{kd_rek}` - Hapus saldo awal

### 7.5 Pengaturan Rekening
- `GET /api/akutansi/pengaturan-rekening` - Mapping COA (scope: umum/ralan/ranap)
- `PUT /api/akutansi/pengaturan-rekening/{sectionKey}` - Update mapping

### 7.6 Laporan
- `GET /api/akutansi/buku-besar` - Laporan buku besar
- `GET /api/akutansi/cashflow` - Laporan arus kas
- `GET /api/akutansi/neraca` - Laporan neraca/laba rugi

### 7.7 Setoran Bank
- `POST /api/akutansi/setoran-bank/stage` — Menyiapkan baris staging di `tampjurnal` untuk setoran kas ke bank. Payload: `tanggal`, `no_bukti`, `keterangan`, `kd_rek_kas`, `kd_rek_bank`, `nominal`.
- `POST /api/akutansi/setoran-bank/post` — Posting dari staging menggunakan layanan posting jurnal. Opsional payload: `tanggal`, `no_bukti`, `keterangan`.
- Alternatif: `POST /api/akutansi/setoran-bank` — Kombinasi stage+post dalam satu transaksi untuk alur sederhana.

---

## 8. Pola Desain & Implementasi

### 8.1 Staging Pattern (tampjurnal)

**Tujuan:**
Menyiapkan komposisi jurnal sebelum posting final, memungkinkan validasi dan preview.

**Alur:**
1. Modul operasional mengisi `tampjurnal` dengan komposisi debet/kredit
2. Validasi: Pastikan total debet = total kredit
3. Preview: Tampilkan komposisi sebelum posting
4. Posting: Salin dari `tampjurnal` ke `jurnal` & `detailjurnal`
5. Cleanup: Kosongkan `tampjurnal`

**Keuntungan:**
- Validasi sebelum posting final
- Preview untuk user
- Atomic posting (semua atau tidak sama sekali)

### 8.2 Snapshot Pattern (billing)

**Tujuan:**
Menyimpan snapshot harga dan item pada saat transaksi untuk mencegah perubahan nominal jika master harga berubah.

**Alur:**
1. Agregasi dari tabel operasional (preview)
2. User memilih kategori yang akan disnapshot
3. Snapshot ke tabel `billing` dengan harga saat itu
4. Data snapshot menjadi sumber untuk cetak kuitansi dan laporan

**Keuntungan:**
- Integritas data historis
- Laporan konsisten dengan transaksi aktual
- Audit trail lengkap

### 8.3 Hierarchical COA Pattern

**Struktur:**
- Level 0: Akun Utama (Induk)
- Level 1: Sub Akun (Anak)
- Relasi via tabel `subrekening`

**Implementasi:**
- Lazy loading untuk tree view (load children saat expand)
- API endpoint terpisah untuk induk dan children
- Validasi: Tidak bisa hapus induk jika masih punya sub-akun

---

## 9. Catatan Implementasi Penting

### 9.1 Penomoran Jurnal

**Format:** `JRYYYYMMDDNNNNNN`
- Prefix: `JR`
- Tanggal: `YYYYMMDD` (tanpa tanda `-`)
- Nomor urut: 6 digit (running number harian)

**Implementasi:**
```php
// Ambil nomor terakhir hari ini
$lastNo = DB::table('jurnal')
    ->whereDate('tgl_jurnal', $tanggal)
    ->max(DB::raw("CONVERT(RIGHT(no_jurnal, 6), SIGNED)"));

$nextNo = ($lastNo ?? 0) + 1;
$noJurnal = 'JR' . str_replace('-', '', $tanggal) . str_pad($nextNo, 6, '0', STR_PAD_LEFT);
```

**Catatan:**
- Perlu locking untuk mencegah race condition pada concurrent requests
- Retry logic jika insert gagal (seperti di Java)

### 9.2 Validasi Keseimbangan

**Aturan:**
- Total debet HARUS sama dengan total kredit (hard validation)
- Toleransi: Gunakan pembulatan untuk perbandingan (misal: `Math.round(debet * 100) === Math.round(kredit * 100)`)

**Implementasi:**
```php
$totalDebet = DB::table('tampjurnal')->sum('debet');
$totalKredit = DB::table('tampjurnal')->sum('kredit');

if (abs($totalDebet - $totalKredit) > 0.01) {
    throw new ValidationException('Debet dan Kredit tidak seimbang');
}
```

### 9.3 Perhitungan Saldo Berjalan

**Buku Besar:**
1. Ambil saldo awal dari `rekeningtahun` untuk tahun yang dipilih
2. Jika filter bulan/hari: Hitung akumulasi mutasi sebelum periode
3. Iterasi jurnal per baris: Update saldo berdasarkan `rekening.balance`

**Logika:**
```php
// Saldo awal periode
$saldoAwal = RekeningTahun::where('thn', $year)
    ->where('kd_rek', $kdRek)
    ->value('saldo_awal') ?? 0;

// Akumulasi sebelum periode (jika filter bulan/hari)
$mutasiBefore = DB::table('detailjurnal')
    ->join('jurnal', 'detailjurnal.no_jurnal', '=', 'jurnal.no_jurnal')
    ->where('detailjurnal.kd_rek', $kdRek)
    ->whereBetween('jurnal.tgl_jurnal', [$yearStart, $periodStart])
    ->selectRaw('SUM(detailjurnal.debet) as debet, SUM(detailjurnal.kredit) as kredit')
    ->first();

// Hitung saldo awal periode berdasarkan balance akun
if ($rekening->balance === 'D') {
    $saldoAwalPeriode = $saldoAwal + ($mutasiBefore->debet - $mutasiBefore->kredit);
} else {
    $saldoAwalPeriode = $saldoAwal + ($mutasiBefore->kredit - $mutasiBefore->debet);
}

// Iterasi jurnal untuk saldo berjalan
foreach ($jurnalEntries as $entry) {
    if ($rekening->balance === 'D') {
        $saldo = $saldo + $entry->debet - $entry->kredit;
    } else {
        $saldo = $saldo + $entry->kredit - $entry->debet;
    }
}
```

---

## 10. Rekomendasi Pengembangan

### 10.1 Prioritas Tinggi

1. **Implementasi Guard Rails Runtime**
   - Idempotency key untuk semua posting jurnal
   - Locking untuk penomoran `no_jurnal`
   - Validasi COA mandatory sebelum posting

2. **Perluasan Cakupan Posting Otomatis**
   - Posting jurnal untuk Lab, Radiologi, Resep, Operasi
   - Posting jurnal untuk Rawat Inap (Ranap)
   - Posting jurnal untuk Pembelian

3. **Audit Trail & Monitoring**
   - Log metadata (user, waktu, sumber modul) saat posting
   - Dashboard untuk ketidakseimbangan atau akun MISSING
   - Alert untuk posting yang gagal

### 10.2 Prioritas Menengah

1. **Optimasi Query**
   - Indeks pada kolom yang sering dipakai agregasi/filter
   - Eager loading untuk relasi yang sering digunakan
   - Cache untuk master data (rekening, akun_bayar, dll)

2. **UI/UX Improvements**
   - Loading states yang lebih baik
   - Error handling yang lebih informatif
   - Keyboard shortcuts untuk operasi umum

3. **Testing**
   - Unit test untuk service akuntansi
   - Feature test untuk alur posting jurnal end-to-end
   - Test untuk edge cases (concurrent posting, invalid COA, dll)

### 10.3 Prioritas Rendah

1. **Migrasi Tabel Temporary**
   - Ganti tabel `temporary` generik dengan tabel semantik khusus
   - Contoh: `nota_snapshot` & `nota_snapshot_item` untuk cetak nota

2. **Dokumentasi API**
   - Swagger/OpenAPI untuk semua endpoint akuntansi
   - Contoh request/response untuk setiap endpoint

3. **Performance Monitoring**
   - Monitoring query time untuk laporan keuangan
   - Alert untuk query yang lambat

---

## 12. Setoran Bank

**Definisi:** Memindahkan saldo dari akun Kas Tunai ke akun Bank sebagai setoran.

**Sumber Data & Konfigurasi:**
- `rekening` (tipe, balance, hierarki) untuk memilih akun Kas (`tipe='N'`, `balance='D'`, biasanya mengandung kata "Kas") dan akun Bank (`tipe='N'`, `balance='D'`, biasanya mengandung kata "Bank").
- Endpoint pencarian rekening untuk autocomplete: `SetAkunController::rekening` di `app/Http/Controllers/Akutansi/SetAkunController.php:150`.

**Komposisi Jurnal (Setoran Kas → Bank):**
- Debet: `Bank` = `nominal`
- Kredit: `Kas` = `nominal`

**Guard Rails:**
- Akun Kas dan Bank harus berbeda dan bertipe `N` dengan `balance='D'`.
- `nominal > 0` dan hasil komposisi harus `debet == kredit`.
- Simpan `no_bukti` dan `keterangan` untuk audit trail.

**Alur Backend:**
1. Stage ke `tampjurnal`:
   - Baris 1: `{ kd_rek: kd_rek_bank, debet: nominal, kredit: 0 }`
   - Baris 2: `{ kd_rek: kd_rek_kas, debet: 0, kredit: nominal }`
2. Posting ke `jurnal/detailjurnal` menggunakan `JurnalPostingService::post(no_bukti, keterangan, tanggal)` di `app/Services/Akutansi/JurnalPostingService.php:97`–`146`.
3. `tampjurnal` dikosongkan otomatis setelah posting.

**Desain UI (Inertia React):**
- Form dengan field: `Tanggal`, `No Bukti`, `Keterangan`, `Akun Kas` (autocomplete), `Akun Bank` (autocomplete), `Nominal`.
- Tombol aksi: `Stage & Post` (atau pisah `Stage` dan `Post`).
- Validasi inline, state loading/error, dan animasi ringan mengikuti pedoman `docs/UI_UX_IMPROVEMENTS_GUIDE.md` (lihat referensi di halaman akuntansi lain seperti `BukuBesar.jsx`).

**Integrasi Laporan:**
- Mutasi Kas: Setoran akan tampil sebagai `Kredit` pada akun Kas dan `Debet` pada akun Bank.
- Cash Flow: Pergerakan kas masuk/keluar ikut teragregasi sesuai definisi di `app/Http/Controllers/Akutansi/CashFlowController.php:60`–`76` dan `83`–`100`.

**Catatan Opsional (Biaya Admin Bank):**
- Jika bank mengenakan biaya administrasi saat setoran, catat sebagai transaksi terpisah: Debet `Beban Administrasi Bank`, Kredit `Kas/Bank` sesuai sumber biaya.


## 11. Kesimpulan

Modul Akuntansi Faskesku ID adalah sistem keuangan terintegrasi yang mengikuti prinsip double-entry bookkeeping dengan integrasi erat ke modul operasional (Billing, Lab, Radiologi, Farmasi). Sistem ini menggunakan pola staging (`tampjurnal`) untuk validasi sebelum posting, snapshot (`billing`) untuk integritas data historis, dan hierarki COA untuk fleksibilitas struktur akun.

**Kekuatan:**
- Arsitektur yang jelas (staging → posting)
- Validasi yang ketat (debet=kredit)
- Integrasi dengan modul operasional
- Fleksibilitas COA dengan hierarki

**Area Perbaikan:**
- Guard rails runtime untuk idempotensi
- Perluasan cakupan posting otomatis
- Audit trail & monitoring
- Optimasi query untuk laporan besar

Dengan mengikuti best practices yang telah didokumentasikan dan guard rails yang direkomendasikan, modul akuntansi ini dapat berkembang menjadi sistem keuangan yang robust, mudah diaudit, dan siap untuk skala produksi.
## 5. Mutasi Rekening

- Definisi: "Mutasi rekening" adalah pergerakan Debet/Kredit suatu akun dalam periode tertentu, yang bersumber dari baris `detailjurnal` dan terikat pada tanggal `jurnal.tgl_jurnal`. Mutasi dipakai untuk menyusun Neraca, Buku Besar, Arus Kas, dan Jurnal Penutup.
- Sumber data: `jurnal` (header tanggal/jenis), `detailjurnal` (baris debet/kredit), `rekening` (tipe & balance), `rekeningtahun` (saldo awal per tahun).
- Formula per akun berdasarkan `balance`:
  - Akun `balance = 'D'`: `mutasi_debet = SUM(debet)`, `mutasi_kredit = SUM(kredit)`, `saldo_akhir = saldo_awal + (mutasi_debet - mutasi_kredit)`.
  - Akun `balance = 'K'`: `mutasi_debet = SUM(kredit)`, `mutasi_kredit = SUM(debet)`, `saldo_akhir = saldo_awal + (mutasi_debet - mutasi_kredit)`.
- Perbedaan rentang tanggal antar fitur:
  - Listing Saldo Awal & Mutasi (YTD): Akumulasi dari awal tahun sampai akhir periode yang dipilih. Lihat `app/Http/Controllers/Akutansi/RekeningTahunController.php:54`–`66` untuk penentuan rentang, dan mapping mutasi berdasarkan `balance` di `app/Http/Controllers/Akutansi/RekeningTahunController.php:81`–`89`.
  - Buku Besar (running balance): Menentukan `saldo_awal_periode = saldo_awal_tahun ± akumulasi sebelum periode` lalu menghitung saldo berjalan dari baris transaksi periode tampil. Lihat `app/Http/Controllers/Akutansi/BukuBesarController.php:65`, `82`–`96`, dan rumus saldo awal periode di `app/Http/Controllers/Akutansi/BukuBesarController.php:99`–`105`.
  - Jurnal Penutup (per-periode, bukan YTD): Mutasi hanya untuk hari/bulan/tahun yang dipilih, kemudian ditutup ke Ikhtisar dan Modal. Penentuan rentang periode di `app/Http/Controllers/Akutansi/JurnalController.php:631`–`650`, agregasi mutasi per akun di `app/Http/Controllers/Akutansi/JurnalController.php:663`–`671`, dan mapping mutasi berdasarkan `balance` di `app/Http/Controllers/Akutansi/JurnalController.php:680`–`688`.
  - Arus Kas (Cash Flow): Menggunakan pergerakan bersih (kredit−debet untuk akun `balance = 'K'`, debet−kredit untuk akun `balance = 'D'`) ditambah saldo awal terkait akun tipe `R`. Lihat `app/Http/Controllers/Akutansi/CashFlowController.php:60`–`76` dan `app/Http/Controllers/Akutansi/CashFlowController.php:83`–`100`.
- Konsumsi di Frontend:
  - Neraca harian menggunakan `mutasi_debet - mutasi_kredit` sebagai "Transaksi Hari Ini", sedangkan tampilan periode menampilkan `saldo_akhir`. Contoh referensi di `resources/js/Pages/Akutansi/Neraca.jsx:641`–`653` dan `resources/js/Pages/Akutansi/Neraca.jsx:723`–`735`.

### Referensi Kode

## 6. Mutasi Kas

- Definisi: "Mutasi Kas" adalah pergerakan kas masuk dan kas keluar dalam periode tertentu. Implementasi di sistem menyajikan arus kas berbasis pergerakan akun pendapatan dan beban (pendekatan tidak langsung), ditambah saldo awal kas/akun terkait.
- Sumber data: `rekening` (tipe & balance), `rekeningtahun` (saldo awal), `jurnal` dan `detailjurnal` (baris debet/kredit).
- Komponen utama Arus Kas:
  - Kas Awal: akumulasi saldo awal akun Neraca dengan `balance = 'D'` pada rentang tahun yang mencakup periode. Lihat `app/Http/Controllers/Akutansi/CashFlowController.php:37`–`app/Http/Controllers/Akutansi/CashFlowController.php:47`.
  - Kas Masuk: pergerakan akun Pendapatan (`tipe = 'R'`, `balance = 'K'`) selama periode, dihitung `SUM(kredit) - SUM(debet)`, kemudian ditambah saldo awal akun terkait `R`. Lihat `app/Http/Controllers/Akutansi/CashFlowController.php:60`–`app/Http/Controllers/Akutansi/CashFlowController.php:76`.
  - Kas Keluar: pergerakan akun Beban (`tipe = 'R'`, `balance = 'D'`) selama periode, dihitung `SUM(debet) - SUM(kredit)`, kemudian ditambah saldo awal akun terkait `R`. Lihat `app/Http/Controllers/Akutansi/CashFlowController.php:83`–`app/Http/Controllers/Akutansi/CashFlowController.php:100`.
  - Kas Akhir: `kas_awal + kas_masuk − kas_keluar`. Lihat `app/Http/Controllers/Akutansi/CashFlowController.php:104`–`app/Http/Controllers/Akutansi/CashFlowController.php:117`.

- Penerimaan kas (contoh jurnal operasional):
  - Billing Ralan: staging jurnal mengisi Debet ke Kas/Bank dan Debet ke Piutang lalu Kredit ke Pendapatan/PPN/Registrasi. Deteksi default Kas/Bank: `app/Http/Controllers/Akutansi/JurnalController.php:390`–`app/Http/Controllers/Akutansi/JurnalController.php:418`. Penulisan Debet Kas: `app/Http/Controllers/Akutansi/JurnalController.php:209`–`app/Http/Controllers/Akutansi/JurnalController.php:217`. Ringkasan dan cek keseimbangan: `app/Http/Controllers/Akutansi/JurnalController.php:365`–`app/Http/Controllers/Akutansi/JurnalController.php:387`.
  - Penjualan Obat Bebas: Debet Kas/Bank (akun bayar), Kredit Penjualan/PPN, plus HPP vs Persediaan. Lihat `app/Http/Controllers/Farmasi/PenjualanController.php:88`–`app/Http/Controllers/Farmasi/PenjualanController.php:95`.

- Pengeluaran kas (contoh jurnal operasional):
  - Pembelian Obat: Debet Pengadaan/PPN Masukan, Kredit Akun Bayar (Kas/Bank). Lihat `app/Http/Controllers/Farmasi/PembelianController.php:91`–`app/Http/Controllers/Farmasi/PembelianController.php:96`.

- Ledger kas per akun: Mutasi kas spesifik per akun kas/bank dapat ditelusuri via Buku Besar dengan filter `kd_rek` untuk akun kas/bank. Perhitungan saldo awal periode dan saldo berjalan: `app/Http/Controllers/Akutansi/BukuBesarController.php:99`–`app/Http/Controllers/Akutansi/BukuBesarController.php:106` dan running balance di `app/Http/Controllers/Akutansi/BukuBesarController.php:144`–`app/Http/Controllers/Akutansi/BukuBesarController.php:161`.

- Konsumsi di Frontend:
  - Komponen CashFlow menampilkan Kas Awal, Kas Masuk, Kas Keluar, Kas Akhir dengan data dari endpoint backend. Lihat `resources/js/Pages/Akutansi/CashFlow.jsx:135`–`resources/js/Pages/Akutansi/CashFlow.jsx:149` untuk ringkasan dan `resources/js/Pages/Akutansi/CashFlow.jsx:154`–`resources/js/Pages/Akutansi/CashFlow.jsx:165` untuk tiga seksi utama.
- RekeningTahunController@index: penentuan rentang YTD dan mapping mutasi `balance` D/K di `app/Http/Controllers/Akutansi/RekeningTahunController.php:54`–`66`, `81`–`89`.
- BukuBesarController@index: akumulasi sebelum periode dan saldo awal periode di `app/Http/Controllers/Akutansi/BukuBesarController.php:82`–`106`.
- JurnalController@closingPreview: agregasi mutasi per-periode dan penggunaan untuk jurnal penutup di `app/Http/Controllers/Akutansi/JurnalController.php:631`–`671`, `680`–`689`.
- CashFlowController@index: pergerakan kas masuk/keluar berbasis mutasi di `app/Http/Controllers/Akutansi/CashFlowController.php:60`–`100`.
# Analisa Modul Akuntansi

Dokumen ini merangkum struktur halaman frontend modul Akuntansi, endpoint backend yang relevan, model database terkait, serta referensi teknis untuk implementasi "Detail Jurnal".

## Struktur Halaman Frontend (resources/js/Pages/Akutansi)

- Home.jsx — halaman indeks modul Akutansi berbasis kartu dan 4 tab
- Rekening.jsx — daftar dan pengelolaan COA
- RekeningTahun.jsx — saldo awal per tahun
- PengaturanRekening.jsx — konfigurasi mapping akun
- AkunBayar.jsx — mapping metode pembayaran → akun
- AkunPiutang.jsx — mapping piutang → akun
- Jurnal.jsx — daftar jurnal, tambah jurnal umum, detail & edit, posting dari tampjurnal
- JurnalPenyesuaian.jsx — halaman khusus penyesuaian
- JurnalPenutup.jsx — halaman khusus penutup
- BukuBesar.jsx — general ledger per akun
- CashFlow.jsx — arus kas teragregasi
- MutasiRekening.jsx — mutasi pada akun nominal
- MutasiKas.jsx — mutasi pada akun kas
- Billing.jsx — data billing + integrasi posting
- KasirRalan.jsx — transaksi kasir ralan
- NotaJalan.jsx — invoice rawat jalan
- SetoranBank.jsx — setoran kas ke bank dengan staging dan posting

Referensi UI umum:

- Sidebar modul: `resources/js/Layouts/SidebarKeuangan.jsx`
- Komponen tabel: `resources/js/Components/ui/Table.jsx`
- Pola animasi: Framer Motion digunakan di beberapa halaman (mis. Home.jsx, SetoranBank.jsx)

## Model & Tabel Database

- Jurnal: `app/Models/Akutansi/Jurnal.php`
- DetailJurnal: `app/Models/Akutansi/DetailJurnal.php`
- Rekening: `app/Models/Akutansi/Rekening.php`
- SetoranBank: `app/Models/Akutansi/SetoranBank.php`
- Migrasi SetoranBank: `database/migrations/2025_12_03_000001_create_setoran_bank_table.php`

Kolom kunci untuk detail jurnal:

- Tabel `detailjurnal`: `no_jurnal`, `kd_rek`, `debet`, `kredit`
- Join nama akun dari `rekening` via `kd_rek`

## Endpoint Backend Utama (routes/web.php)

- Jurnal list: `GET /api/akutansi/jurnal` → filter `q`, `from`, `to`, `jenis`, paginasi
- Jurnal detail: `GET /api/akutansi/jurnal/{no_jurnal}` → header + baris detail + totals
- Jurnal create: `POST /api/akutansi/jurnal` → simpan header & details (jenis `U`/`P`/`C`)
- Jurnal update: `PUT /api/akutansi/jurnal/{no_jurnal}` → edit header, dan untuk `jenis=U` replace seluruh details
- Jurnal delete: `DELETE /api/akutansi/jurnal/{no_jurnal}` → hanya untuk `jenis=U`
- Posting dari staging: `POST /api/akutansi/jurnal/preview` dan `POST /api/akutansi/jurnal/post`
- Setoran Bank: CRUD di `/api/akutansi/setoran-bank` + `/{id}/stage` + `/{id}/post`

Rujukan controller:

- `app/Http/Controllers/Akutansi/JurnalController.php`
- `app/Http/Controllers/Akutansi/SetoranBankController.php`

## Referensi Implementasi "Detail Jurnal"

Kebutuhan umum:

- Tampilkan header jurnal (tanggal, jam, bukti, jenis, keterangan)
- Tampilkan baris detail (kd_rek, nm_rek, debet, kredit) + total dan status seimbang
- Izinkan edit detail hanya untuk `jenis='U'`; `jenis='P'/'C'` readonly

API yang digunakan:

- Ambil detail: `GET /api/akutansi/jurnal/{no_jurnal}`
- Simpan perubahan (jika `jenis='U'`): `PUT /api/akutansi/jurnal/{no_jurnal}` dengan payload `details`

Contoh pola frontend (rujukan langsung):

- Buka detail: `resources/js/Pages/Akutansi/Jurnal.jsx` → fungsi `openDetail` memanggil endpoint detail dan menampilkan modal
- Edit & validasi: fungsi `handleUpdateSelected` melakukan validasi keseimbangan dan mengirim `PUT` untuk menyimpan
- Tabel baris detail: tabel di modal detail menampilkan `kd_rek`, `nm_rek`, `debet`, `kredit`, lengkap dengan total dan indikator seimbang

Komponen & gaya UI:

- Gunakan layout `SidebarKeuangan` untuk konsistensi
- Gunakan `Table.jsx` untuk tabel; atau markup HTML tabel seragam seperti di `Jurnal.jsx`
- Terapkan format angka lokal `id-ID` untuk kolom jumlah

## Rancangan Halaman DetailJurnal.jsx

Tujuan: halaman mandiri untuk melihat dan (bila `jenis='U'`) mengedit detail jurnal tertentu, melengkapi modal di `Jurnal.jsx`.

Sketsa fitur:

- Param `no_jurnal` (query/route) untuk memuat data awal via `GET /api/akutansi/jurnal/{no_jurnal}`
- Header form: tanggal, waktu, no bukti, keterangan, jenis (readonly)
- Grid detail: daftar baris dengan pilihan `kd_rek`, input angka `debet`/`kredit`, aksi tambah/hapus baris
- Validasi: setiap baris harus memiliki salah satu nilai > 0; total debet == total kredit
- Aksi simpan: `PUT /api/akutansi/jurnal/{no_jurnal}`; hanya aktif untuk `jenis='U'`

Catatan routing:

- Sidebar memuat tautan `/akutansi/detail-jurnal`. Pastikan route Inertia tersedia:
  - `Route::get('/akutansi/detail-jurnal', fn () => Inertia::render('Akutansi/DetailJurnal'))->name('akutansi.detail-jurnal.page');`

## Praktik Baik

- Hindari mengedit jurnal hasil posting (`jenis='P'`) dan penutup (`jenis='C'`)
- Gunakan validasi keseimbangan sebelum menyimpan
- Logika generate `no_jurnal` tersentral di backend; frontend cukup menyiapkan payload yang valid

## Tautan Teknis Cepat

- Detail API: `app/Http/Controllers/Akutansi/JurnalController.php:896–923`
- Update API: `app/Http/Controllers/Akutansi/JurnalController.php:1114–1186`
- Daftar API jurnal: `routes/web.php:195–216`
- Modal detail contoh: `resources/js/Pages/Akutansi/Jurnal.jsx:526–725`
- Komponen tabel: `resources/js/Components/ui/Table.jsx:1–65`
