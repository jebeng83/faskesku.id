# Verifikasi Implementasi "Alur Billing End-to-End (Tagihan & Pembayaran)"

## Perbandingan dengan Blueprint `docs/database.md` Baris 372-490

### ✅ Checklist Kesesuaian dengan Blueprint

#### 1. Input Layanan (Baris 458)
**Blueprint:**
> Dokter/Perawat menginput tindakan di `rawat_jl_dr` (Ralan) atau `rawat_inap_dr` (Ranap). Farmasi menginput `resep_dokter`. Lab & Radiologi menginput hasil periksa.

**Implementasi:**

**A. Tindakan Rawat Jalan:**
- ✅ `RawatJlDr` - Tindakan Dokter Ralan (`app/Models/RawatJlDr.php`)
- ✅ `RawatJlPr` - Tindakan Perawat Ralan (`app/Models/RawatJlPr.php`)
- ✅ `RawatJlDrpr` - Tindakan Dokter + Perawat Ralan (`app/Models/RawatJlDrpr.php`)
- ✅ Controller: `TarifTindakanController` dengan endpoint:
  - `POST /api/tarif-tindakan/dokter`
  - `POST /api/tarif-tindakan/perawat`
  - `POST /api/tarif-tindakan/dokter-perawat`

**B. Resep Obat (Farmasi):**
- ✅ `ResepObat` - Header resep (`app/Models/ResepObat.php`)
- ✅ `ResepDokter` - Detail resep (`app/Models/ResepDokter.php`)
- ✅ Controller: `ResepController` dengan endpoint:
  - `POST /api/resep` - Membuat resep baru
  - Otomatis staging dan posting jurnal setelah simpan resep

**C. Pemeriksaan Lab:**
- ✅ `PermintaanLab` - Header permintaan lab (`app/Models/PermintaanLab.php`)
- ✅ `PermintaanDetailPermintaanLab` - Detail permintaan (`app/Models/PermintaanDetailPermintaanLab.php`)
- ✅ `PeriksaLab` - Hasil pemeriksaan (`app/Models/PeriksaLab.php`)
- ✅ Controller: `PermintaanLabController` dengan endpoint:
  - `POST /api/permintaan-lab` - Membuat permintaan lab
  - Otomatis staging dan posting jurnal setelah simpan permintaan lab

**D. Pemeriksaan Radiologi:**
- ✅ `PermintaanRadiologi` - Header permintaan radiologi (`app/Models/PermintaanRadiologi.php`)
- ✅ Controller: `PermintaanRadiologiController` dengan endpoint:
  - `POST /api/permintaan-radiologi` - Membuat permintaan radiologi

**E. Rawat Inap:**
- ⚠️ **BELUM DITEMUKAN** - `rawat_inap_dr` belum ditemukan di codebase
- ⚠️ **BELUM DITEMUKAN** - `kamar_inap` model belum ditemukan di codebase

**Status:** ⚠️ **SEBAGIAN SESUAI** - Rawat Jalan, Farmasi, Lab, dan Radiologi sudah diimplementasikan. Rawat Inap belum lengkap.

#### 2. Kalkulasi Billing (Baris 459)
**Blueprint:**
> Saat pasien hendak pulang, sistem kasir menarik semua data layanan tersebut.

**Implementasi:**

**A. Preview Billing (`BillingController::index()`):**
- ✅ Membaca dari tabel `billing` jika sudah ada snapshot
- ✅ Jika belum ada snapshot, membangun PREVIEW dari:
  - ✅ `reg_periksa.biaya_reg` → Status: "Registrasi"
  - ✅ `rawat_jl_dr` → Status: "Ralan Dokter"
  - ✅ `rawat_jl_pr` → Status: "Ralan Paramedis"
  - ✅ `rawat_jl_drpr` → Status: "Ralan Dokter Paramedis"
  - ✅ `resep_dokter` → Status: "Obat" (via `buildObatPreview()` di `Billing.jsx`)
- ⚠️ **BELUM DITEMUKAN** - Preview dari `periksa_lab` belum diimplementasikan di `BillingController`
- ⚠️ **BELUM DITEMUKAN** - Preview dari `periksa_radiologi` belum diimplementasikan di `BillingController`
- ⚠️ **BELUM DITEMUKAN** - Preview dari `kamar_inap` belum diimplementasikan

**B. Frontend (`Billing.jsx`):**
- ✅ `loadData()` - Memuat billing per `no_rawat`
- ✅ `buildObatPreview()` - Membangun preview obat dari resep
- ✅ Menampilkan preview dan snapshot billing dalam satu tampilan

**Status:** ⚠️ **SEBAGIAN SESUAI** - Preview untuk Rawat Jalan dan Obat sudah ada. Lab, Radiologi, dan Ranap belum lengkap.

#### 3. Snapshot Billing (Baris 460)
**Blueprint:**
> Rincian biaya disimpan ke tabel `billing` agar statis (tidak berubah meski tarif master naik).

**Implementasi:**

**A. Endpoint Snapshot:**
- ✅ Route: `POST /api/akutansi/nota-jalan/snapshot`
- ✅ Method: `NotaJalanController::snapshot()`
- ✅ Body: `{ no_rawat, items?, toggles?, selected_statuses? }`
- ✅ Menyimpan ke tabel `billing` dengan kolom lengkap:
  - `noindex`, `no_rawat`, `tgl_byr`, `no`, `nm_perawatan`, `pemisah`, `biaya`, `jumlah`, `tambahan`, `totalbiaya`, `status`

**B. Validasi:**
- ✅ Blokir snapshot jika `nota_jalan` sudah ada (mengikuti perilaku Java)
- ✅ Validasi `no_rawat` wajib diisi

**C. Frontend (`Billing.jsx::handleSnapshot()`):**
- ✅ Filter items berdasarkan kategori yang dipilih
- ✅ Kirim ke endpoint snapshot
- ✅ Menampilkan feedback jumlah item dan grand total

**Status:** ✅ **SESUAI** - Snapshot billing sudah diimplementasikan dengan benar.

#### 4. Penerbitan Nota (Baris 461)
**Blueprint:**
> Dibuat record di `nota_jalan` (PK: `no_rawat`, `no_nota` unik) untuk Ralan, atau `nota_inap` untuk Ranap, sebagai bukti transaksi sah.

**Implementasi:**

**A. Nota Jalan:**
- ✅ Route: `POST /api/akutansi/nota-jalan`
- ✅ Method: `NotaJalanController::store()`
- ✅ Format `no_nota`: `YYYY/MM/DD/RJ/NNNN` (4 digit urut harian)
- ✅ PK: `no_rawat`, `no_nota` unik
- ✅ Kolom: `tanggal`, `jam`

**B. Nota Inap:**
- ✅ Model: `NotaInap` (`app/Models/Akutansi/NotaInap.php`)
- ✅ Kolom: `no_rawat`, `no_nota`, `tanggal`, `jam`, `Uang_Muka`
- ⚠️ **BELUM DITEMUKAN** - Controller untuk `nota_inap` belum ditemukan

**C. Frontend:**
- ✅ `Billing.jsx::handleCreate()` - Membuat nota setelah simpan item billing
- ✅ `Billing.jsx::handleSnapshot()` - Membuat nota setelah snapshot billing
- ✅ Menggunakan `no_nota` sebagai `no_bukti` saat posting jurnal

**Status:** ✅ **SESUAI** - Nota Jalan sudah lengkap. Nota Inap model ada tapi controller belum ditemukan.

#### 5. Integrasi Pembayaran (Baris 462)
**Blueprint:**
> Data nota masuk ke `tagihan_sadewa` untuk pencatatan status pembayaran (Lunas/Belum) dan integrasi dengan gateway pembayaran jika ada.

**Implementasi:**
- ⚠️ **BELUM DITEMUKAN** - Model `tagihan_sadewa` belum ditemukan
- ⚠️ **BELUM DITEMUKAN** - Model `bayar_piutang` belum ditemukan
- ⚠️ **BELUM DITEMUKAN** - Integrasi gateway pembayaran belum ditemukan

**Status:** ❌ **BELUM DIIMPLEMENTASIKAN** - Integrasi pembayaran belum ada.

#### 6. Checklist Implementasi Laravel Model & Relasi (Baris 464-469)
**Blueprint:**
> - RegPeriksa hasMany Billing (foreignKey: `no_rawat`).
> - RegPeriksa hasOne NotaJalan dan hasOne NotaInap (foreignKey: `no_rawat`).
> - Billing belongsTo RegPeriksa.
> - Jurnal hasMany DetailJurnal; DetailJurnal belongsTo Jurnal dan belongsTo Rekening.
> - Rekening sebagai master Chart of Account.

**Implementasi:**

**A. RegPeriksa Relations:**
- ✅ `RegPeriksa::billing()` - `hasMany(Billing::class, 'no_rawat', 'no_rawat')`
- ✅ `RegPeriksa::notaJalan()` - `hasOne(NotaJalan::class, 'no_rawat', 'no_rawat')`
- ✅ `RegPeriksa::notaInap()` - `hasOne(NotaInap::class, 'no_rawat', 'no_rawat')`

**B. Billing Relations:**
- ✅ `Billing::regPeriksa()` - `belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat')`

**C. Jurnal Relations:**
- ✅ `Jurnal` hasMany `DetailJurnal` (dari struktur tabel)
- ✅ `DetailJurnal` belongsTo `Jurnal` dan `Rekening` (dari struktur tabel)

**D. Rekening:**
- ✅ Model `Rekening` sebagai master Chart of Account (`app/Models/Akutansi/Rekening.php`)

**Status:** ✅ **SESUAI** - Semua relasi yang disebutkan di blueprint sudah diimplementasikan.

#### 7. Contoh Query Praktis (Baris 471-490)
**Blueprint:**
> - Ringkasan tagihan per kategori status
> - Memuat nota ralan beserta konteks kunjungan

**Implementasi:**

**A. Ringkasan Tagihan:**
- ✅ `BillingController::index()` melakukan query dengan filter `status`
- ✅ Frontend `Billing.jsx` menampilkan ringkasan per kategori
- ✅ Dapat diimplementasikan dengan query SQL seperti di blueprint

**B. Memuat Nota dengan Konteks:**
- ✅ Relasi sudah tersedia di model (`RegPeriksa`, `NotaJalan`, `Patient`, `Dokter`, `Poliklinik`, `Penjab`)
- ✅ Dapat diimplementasikan dengan query seperti di blueprint menggunakan eager loading

**Status:** ✅ **SESUAI** - Query dapat diimplementasikan menggunakan relasi yang sudah ada.

### 📋 Ringkasan Implementasi

#### File yang Terlibat:

1. **Models:**
   - ✅ `app/Models/RegPeriksa.php` - Relasi ke Billing, NotaJalan, NotaInap
   - ✅ `app/Models/Akutansi/Billing.php` - Model billing dengan relasi ke RegPeriksa
   - ✅ `app/Models/Akutansi/NotaJalan.php` - Model nota jalan
   - ✅ `app/Models/Akutansi/NotaInap.php` - Model nota inap
   - ✅ `app/Models/RawatJlDr.php` - Tindakan dokter ralan
   - ✅ `app/Models/RawatJlPr.php` - Tindakan perawat ralan
   - ✅ `app/Models/RawatJlDrpr.php` - Tindakan dokter+perawat ralan
   - ✅ `app/Models/ResepObat.php` - Header resep
   - ✅ `app/Models/ResepDokter.php` - Detail resep
   - ✅ `app/Models/PermintaanLab.php` - Permintaan lab
   - ✅ `app/Models/PeriksaLab.php` - Hasil pemeriksaan lab
   - ✅ `app/Models/PermintaanRadiologi.php` - Permintaan radiologi

2. **Controllers:**
   - ✅ `app/Http/Controllers/Akutansi/BillingController.php` - Preview dan CRUD billing
   - ✅ `app/Http/Controllers/Akutansi/NotaJalanController.php` - CRUD nota jalan dan snapshot
   - ✅ `app/Http/Controllers/TarifTindakanController.php` - Input tindakan ralan
   - ✅ `app/Http/Controllers/RawatJalan/ResepController.php` - Input resep obat
   - ✅ `app/Http/Controllers/PermintaanLabController.php` - Input permintaan lab
   - ✅ `app/Http/Controllers/PermintaanRadiologiController.php` - Input permintaan radiologi

3. **Frontend:**
   - ✅ `resources/js/Pages/Akutansi/Billing.jsx` - UI billing dengan preview dan snapshot
   - ✅ `resources/js/Pages/Akutansi/KasirRalan.jsx` - UI kasir ralan

### ✅ Kesimpulan

**Implementasi "Alur Billing End-to-End" sudah SEBAGIAN SESUAI dengan blueprint di `docs/database.md` baris 372-490.**

**Yang sudah diimplementasikan:**
- ✅ Input layanan untuk Rawat Jalan (Tindakan, Obat, Lab, Radiologi)
- ✅ Kalkulasi billing dengan preview dari tabel operasional
- ✅ Snapshot billing ke tabel `billing`
- ✅ Penerbitan nota jalan (`nota_jalan`)
- ✅ Relasi model sesuai blueprint
- ✅ Posting jurnal otomatis setelah snapshot

**Yang belum lengkap:**
- ⚠️ Preview billing untuk Lab dan Radiologi belum diimplementasikan di `BillingController`
- ⚠️ Rawat Inap (`rawat_inap_dr`, `kamar_inap`) belum lengkap
- ⚠️ Controller untuk `nota_inap` belum ditemukan
- ❌ Integrasi pembayaran (`tagihan_sadewa`, `bayar_piutang`) belum diimplementasikan
- ❌ Gateway pembayaran belum diintegrasikan

### 📝 Rekomendasi

1. **Lengkapi Preview Billing:**
   - Tambahkan preview dari `periksa_lab` di `BillingController::index()`
   - Tambahkan preview dari `periksa_radiologi` di `BillingController::index()`
   - Tambahkan preview dari `kamar_inap` untuk Rawat Inap

2. **Lengkapi Rawat Inap:**
   - Implementasikan model dan controller untuk `rawat_inap_dr`
   - Implementasikan model dan controller untuk `kamar_inap`
   - Implementasikan controller untuk `nota_inap`

3. **Implementasikan Integrasi Pembayaran:**
   - Buat model `TagihanSadewa` dan `BayarPiutang`
   - Implementasikan controller untuk pencatatan pembayaran
   - Integrasikan dengan gateway pembayaran jika diperlukan

4. **Konsistensi Alur:**
   - Pastikan semua modul (Lab, Radiologi, Ranap) mengikuti alur yang sama:
     1. Input layanan → Tabel operasional
     2. Preview billing → Agregasi dari tabel operasional
     3. Snapshot billing → Tabel `billing`
     4. Buat nota → Tabel `nota_jalan`/`nota_inap`
     5. Stage jurnal → Tabel `tampjurnal`/`tampjurnal2`
     6. Posting jurnal → Tabel `jurnal` dan `detailjurnal`

### 🔄 Alur Lengkap yang Sudah Diimplementasikan

#### Untuk Rawat Jalan:

1. **Input Layanan:**
   - ✅ Tindakan → `rawat_jl_dr`, `rawat_jl_pr`, `rawat_jl_drpr`
   - ✅ Obat → `resep_obat`, `resep_dokter`
   - ✅ Lab → `permintaan_lab`, `permintaan_detail_permintaan_lab`
   - ✅ Radiologi → `permintaan_radiologi`

2. **Preview Billing:**
   - ✅ Membaca dari `billing` jika sudah ada snapshot
   - ✅ Membangun preview dari `rawat_jl_dr`, `rawat_jl_pr`, `rawat_jl_drpr`, `resep_dokter`
   - ⚠️ Preview dari `periksa_lab` dan `periksa_radiologi` belum diimplementasikan

3. **Snapshot Billing:**
   - ✅ `POST /api/akutansi/nota-jalan/snapshot`
   - ✅ Menyimpan ke tabel `billing` dengan status sesuai kategori

4. **Penerbitan Nota:**
   - ✅ `POST /api/akutansi/nota-jalan`
   - ✅ Format: `YYYY/MM/DD/RJ/NNNN`

5. **Posting Jurnal:**
   - ✅ `POST /api/akutansi/jurnal/stage-from-billing`
   - ✅ `POST /api/akutansi/jurnal/post-staging`
   - ✅ Menggunakan `no_nota` sebagai `no_bukti`

**Status:** ✅ **SESUAI** - Alur untuk Rawat Jalan sudah lengkap, kecuali preview Lab dan Radiologi.
