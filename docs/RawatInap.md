# Dokumentasi Modul Rawat Inap (DlgRawatInap)

**Tanggal Dibuat:** 14 Februari 2026  
**Source:** `public/DlgRawatInap.java`  
**Total Lines:** 12,164 baris  
**Framework:** Java Swing / SIMRS Khanza

---

## 📋 Daftar Isi

1. [Ringkasan Modul](#ringkasan-modul)
2. [Struktur Kelas dan Komponen](#struktur-kelas-dan-komponen)
3. [Tabel Data Model](#tabel-data-model)
4. [Fungsi Utama](#fungsi-utama)
5. [Alur Bisnis Proses](#alur-bisnis-proses)
6. [Database Schema](#database-schema)
7. [Integrasi dengan Modul Lain](#integrasi-dengan-modul-lain)
8. [Rekomendasi Pengembangan](#rekomendasi-pengembangan)

---

## 🎯 Ringkasan Modul

### Tujuan
Modul ini mengelola seluruh proses **Perawatan/Tindakan Rawat Inap** di Rumah Sakit, mencakup:
- Pencatatan tindakan medis oleh Dokter
- Pencatatan tindakan oleh Perawat/Petugas
- Pencatatan tindakan kombinasi Dokter dan Perawat
- Pemeriksaan vital signs dan SOAP (Subjective, Objective, Assessment, Plan)
- Pemeriksaan Obstetri untuk pasien kebidanan
- Pemeriksaan Ginekologi

### Karakteristik
- **Multi-tab Interface:** 6 Tab utama (Penanganan Dokter, Perawat, Dokter+Perawat, Pemeriksaan, Obstetri, Ginekologi)
- **Transaction Support:** Menggunakan transaction dengan Commit/Rollback
- **Jurnal Akuntansi Terintegrasi:** Setiap transaksi tindakan mencatat jurnal keuangan
- **Rekam Medis Lengkap:** Terintegrasi dengan 60+ form rekam medis lainnya
- **Akses Menu Cepat:** 70+ button akses ke modul terkait

---

## 🏗️ Struktur Kelas dan Komponen

### Package dan Import
```java
package simrskhanza;

// Import utama:
- rekammedis.*  (60+ class rekam medis)
- inventory.*   (Obat, stok, resep)
- keuangan.*    (Billing, kasir, jurnal)
- permintaan.*  (Lab, Radiologi, Operasi, dll)
- kepegawaian.* (Dokter, Perawat, Pegawai)
```

### Class Declaration
```java
public final class DlgRawatInap extends javax.swing.JDialog
```

### Properties Utama
```java
// Table Models
- tabModeDr         : Tindakan oleh Dokter
- tabModePr         : Tindakan oleh Perawat
- tabModeDrPr       : Tindakan Dokter + Perawat
- tabModePemeriksaan: Pemeriksaan SOAP
- tabModeObstetri   : Pemeriksaan Obstetri
- tabModeGinekologi : Pemeriksaan Ginekologi

// Database
- koneksi: Connection
- Sequel : sekuel (custom DB helper)
- jur    : Jurnal (accounting helper)

// Financial Variables
- ttljmdokter   : Total jasa medik dokter
- ttljmperawat  : Total jasa medik perawat
- ttlkso        : Total KSO (Kerjasama Operasional)
- ttlpendapatan : Total pendapatan
- ttljasasarana : Total jasa sarana
- ttlbhp        : Total BHP (Bahan Habis Pakai)
- ttlmenejemen  : Total jasa menejemen
```

---

## 📊 Tabel Data Model

### 1. Table Tindakan Dokter (tbRawatDr)
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| P | Boolean | Checkbox pilih |
| No.Rawat | String | Nomor rawat inap |
| No.R.M. | String | Nomor rekam medis |
| Nama Pasien | String | Nama pasien |
| Perawatan/Tindakan | String | Nama tindakan |
| Kode Dokter | String | Kode dokter |
| Dokter Yg Menangani | String | Nama dokter |
| Tgl.Rawat | String | Tanggal tindakan |
| Jam Rawat | String | Jam tindakan |
| Biaya | Double | Total biaya |
| Kode | String | Kode tindakan (hidden) |
| Tarif Dokter | String | Jasa medik dokter (hidden) |
| KSO | String | Kerjasama operasional (hidden) |
| Jasa Sarana | String | Jasa sarana (hidden) |
| BHP | String | Bahan habis pakai (hidden) |
| Menejemen | String | Jasa menejemen (hidden) |

### 2. Table Tindakan Perawat (tbRawatPr)
Struktur sama dengan tbRawatDr, hanya mengganti Dokter dengan Petugas/Perawat.

### 3. Table Tindakan Dokter + Perawat (tbRawatDrPr)
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| P | Boolean | Checkbox pilih |
| No.Rawat | String | Nomor rawat inap |
| No.R.M. | String | Nomor rekam medis |
| Nama Pasien | String | Nama pasien |
| Perawatan/Tindakan | String | Nama tindakan |
| Kode Dokter | String | Kode dokter |
| Dokter Yg Menangani | String | Nama dokter |
| NIP | String | NIP Petugas |
| Petugas Yg Menangani | String | Nama petugas |
| Tgl.Rawat | String | Tanggal |
| Jam Rawat | String | Jam |
| Biaya | Double | Total biaya |
| ... | ... | (13 kolom hidden untuk komponen biaya) |

### 4. Table Pemeriksaan SOAP (tbPemeriksaan)
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| P | Boolean | Checkbox |
| No.Rawat | String | Nomor rawat |
| No.R.M. | String | Nomor RM |
| Nama Pasien | String | Nama |
| Tgl.Rawat | String | Tanggal |
| Jam | String | Jam |
| Suhu (C) | String | Suhu tubuh |
| Tensi | String | Tekanan darah |
| Nadi (/menit) | String | Nadi |
| Respirasi (/menit) | String | Respirasi |
| Tinggi (Cm) | String | Tinggi badan |
| Berat (Kg) | String | Berat badan |
| SpO2 (%) | String | Saturasi oksigen |
| GCS (E,V,M) | String | Glasgow Coma Scale |
| Kesadaran | String | Tingkat kesadaran |
| Subjek | String | S (Subjective) |
| Objek | String | O (Objective) |
| Alergi | String | Riwayat alergi |
| Asesmen | String | A (Assessment) |
| Plan | String | P (Plan) |
| Inst/Impl | String | Instruksi/Implementasi |
| Evaluasi | String | Evaluasi |
| NIP | String | NIP Petugas |
| Dokter/Paramedis | String | Nama |
| Profesi/Jabatan | String | Jabatan |

### 5. Table Pemeriksaan Obstetri (tbPemeriksaanObstetri)
Untuk pasien kebidanan/kehamilan:
- Tinggi Fundus, Janin, Letak, Panggul, Denyut, Kontraksi
- Fluksus, Albus, Vulva, Portio
- Pemeriksaan Dalam (Tebal, Arah, Pembukaan, Penurunan)
- Denominator, Ketuban, Feto

### 6. Table Pemeriksaan Ginekologi (tbPemeriksaanGinekologi)
Untuk pasien ginekologi:
- Inspeksi, Inspeksi Vulva/Uretra/Vagina, Inspekulo
- Fluxus, Fluor Albus, Vulva/Vagina, Portio, Sondage
- Pemeriksaan Dalam (Portio, Bentuk, Cavum Uteri, Mobilitas)
- Ukuran, Nyeri Tekan, Adnexa Kanan/Kiri, Cavum Douglas

---

## ⚙️ Fungsi Utama

### 1. Fungsi Simpan (private void simpan())
**Lokasi:** Baris 11192

**Alur Proses:**
1. **Validasi Input**
   - Cek kelengkapan Dokter/Perawat
   - Cek kelengkapan Tindakan/Tagihan
   
2. **Cek Status Billing**
   ```java
   if(Sequel.cariRegistrasi(TNoRw.getText().trim()) > 0) {
       // Billing sudah terverifikasi -> REJECT
   }
   ```

3. **Transaction Start**
   ```java
   Sequel.AutoComitFalse();
   sukses = true;
   ```

4. **Insert Data** (berbeda per tab)
   - **Tab 0 (Dokter):** Insert ke `rawat_inap_dr`
   - **Tab 1 (Perawat):** Insert ke `rawat_inap_pr`
   - **Tab 2 (Dokter+Perawat):** Insert ke `rawat_inap_drpr`

5. **Jurnal Akuntansi**
   - Hapus tampjurnal: `DELETE FROM tampjurnal`
   - Input jurnal per komponen:
     - **Suspen Piutang Tindakan Ranap** (Debet)
     - **Pendapatan Tindakan Rawat Inap** (Kredit)
     - **Beban Jasa Medik Dokter** (Debet)
     - **Utang Jasa Medik Dokter** (Kredit)
     - **Beban Jasa Medik Paramedis** (Debet)
     - **Utang Jasa Medik Paramedis** (Kredit)
     - **Beban KSO** (Debet)
     - **Utang KSO** (Kredit)
     - **Beban Jasa Sarana** (Debet)
     - **Utang Jasa Sarana** (Kredit)
     - **HPP BHP** (Debet)
     - **Persediaan BHP** (Kredit)
     - **Beban Jasa Menejemen** (Debet)
     - **Utang Jasa Menejemen** (Kredit)

6. **Simpan Jurnal Final**
   ```java
   jur.simpanJurnal(TNoRw, "U", "TINDAKAN RAWAT INAP PASIEN " + TPasien + " DIPOSTING OLEH " + akses.getkode())
   ```

7. **Commit/Rollback**
   ```java
   if(sukses == true) {
       Sequel.Commit();
       // Update table model
   } else {
       Sequel.RollBack();
   }
   Sequel.AutoComitTrue();
   ```

### 2. Fungsi Ganti/Edit
**Lokasi:** 
- `gantitindakandokter()` - Baris 11585
- `gantitindakanpetugas()` - Baris 11741
- `gantitindakandokterpetugas()` - Baris 11895

**Proses:**
1. Hapus jurnal lama
2. Hapus data tindakan lama
3. Insert data baru
4. Insert jurnal baru
5. Commit/Rollback

### 3. Fungsi Hapus (Belum ditemukan)
Kemungkinan menggunakan soft delete atau ada di method lain.

### 4. Fungsi Tampil/Load Data
Menggunakan query SQL untuk load data dari:
- `rawat_inap_dr`
- `rawat_inap_pr`
- `rawat_inap_drpr`
- `pemeriksaan_ranap`
- Join dengan tabel `pegawai`, `dokter`, `jns_perawatan_inap`

### 5. Fungsi isCek() 
**Lokasi:** Baris 9616
Kemungkinan untuk validasi hak akses atau status data.

### 6. Fungsi emptTeks()
**Lokasi:** Baris 12070
Reset semua input field ke nilai default.

---

## 🔄 Alur Bisnis Proses

### Proses Pencatatan Tindakan Rawat Inap

```
┌─────────────────┐
│  Pasien Rawat   │
│      Inap       │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  Pilih Tab Jenis Tindakan:              │
│  [1] Penanganan Dokter                  │
│  [2] Penanganan Perawat                 │
│  [3] Penanganan Dokter + Perawat        │
│  [4] Pemeriksaan SOAP                   │
│  [5] Pemeriksaan Obstetri               │
│  [6] Pemeriksaan Ginekologi             │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  Input Data:                            │
│  • Pilih Dokter/Perawat                 │
│  • Pilih Tindakan/Tagihan               │
│  • Input Tanggal & Jam                  │
│  • (Opsional) Input Vital Signs & SOAP  │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  Sistem Auto-Hitung:                    │
│  • Total Tarif Tindakan                 │
│  • Jasa Medik Dokter                    │
│  • Jasa Medik Perawat                   │
│  • KSO (Kerjasama Operasional)          │
│  • Jasa Sarana RS                       │
│  • BHP (Bahan Habis Pakai)              │
│  • Jasa Menejemen                       │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  Validasi:                              │
│  ✓ Billing belum terverifikasi?         │
│  ✓ Data lengkap?                        │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  Transaction START                      │
│  • Insert ke tabel rawat_inap_*         │
│  • Insert jurnal akuntansi              │
│  • Simpan jurnal final                  │
└────────┬────────────────────────────────┘
         │
         ├─[SUKSES]──► COMMIT ──► Update Table
         │
         └─[GAGAL]───► ROLLBACK ──► Alert Error
```

### Komponen Biaya Tindakan Rawat Inap

```
TOTAL BIAYA TINDAKAN
├── Jasa Medik Dokter (JmDokter)
├── Jasa Medik Perawat (JmPerawat)
├── KSO - Kerjasama Operasional
├── Jasa Sarana RS (BagianRS)
├── BHP - Bahan Habis Pakai (Bhp)
└── Jasa Menejemen
```

---

## 💾 Database Schema

### Tabel: rawat_inap_dr
```sql
CREATE TABLE rawat_inap_dr (
    no_rawat VARCHAR(17),
    kd_jenis_prw VARCHAR(15),
    kd_dokter VARCHAR(20),
    tgl_perawatan DATE,
    jam_rawat TIME,
    bagian_rs DECIMAL,
    bhp DECIMAL,
    tarif_tindakandr DECIMAL,
    kso DECIMAL,
    menejemen DECIMAL,
    biaya_rawat DECIMAL,
    PRIMARY KEY (no_rawat, kd_jenis_prw, kd_dokter, tgl_perawatan, jam_rawat)
);
```

### Tabel: rawat_inap_pr
```sql
CREATE TABLE rawat_inap_pr (
    no_rawat VARCHAR(17),
    kd_jenis_prw VARCHAR(15),
    nip VARCHAR(20),
    tgl_perawatan DATE,
    jam_rawat TIME,
    bagian_rs DECIMAL,
    bhp DECIMAL,
    tarif_tindakanpr DECIMAL,
    kso DECIMAL,
    menejemen DECIMAL,
    biaya_rawat DECIMAL,
    PRIMARY KEY (no_rawat, kd_jenis_prw, nip, tgl_perawatan, jam_rawat)
);
```

### Tabel: rawat_inap_drpr
```sql
CREATE TABLE rawat_inap_drpr (
    no_rawat VARCHAR(17),
    kd_jenis_prw VARCHAR(15),
    kd_dokter VARCHAR(20),
    nip VARCHAR(20),
    tgl_perawatan DATE,
    jam_rawat TIME,
    bagian_rs DECIMAL,
    bhp DECIMAL,
    tarif_tindakandr DECIMAL,
    tarif_tindakanpr DECIMAL,
    kso DECIMAL,
    menejemen DECIMAL,
    biaya_rawat DECIMAL,
    PRIMARY KEY (no_rawat, kd_jenis_prw, kd_dokter, nip, tgl_perawatan, jam_rawat)
);
```

### Tabel: pemeriksaan_ranap
```sql
CREATE TABLE pemeriksaan_ranap (
    no_rawat VARCHAR(17),
    tgl_perawatan DATE,
    jam_rawat TIME,
    suhu_tubuh VARCHAR(5),
    tensi VARCHAR(8),
    nadi VARCHAR(3),
    respirasi VARCHAR(3),
    tinggi VARCHAR(5),
    berat VARCHAR(5),
    spo2 VARCHAR(3),
    gcs VARCHAR(10),
    kesadaran ENUM('Compos Mentis', 'Somnolence', 'Sopor', 'Coma'),
    keluhan TEXT,
    pemeriksaan TEXT,
    alergi VARCHAR(50),
    penilaian TEXT,
    rtl TEXT,
    instruksi TEXT,
    evaluasi TEXT,
    nip VARCHAR(20),
    PRIMARY KEY (no_rawat, tgl_perawatan, jam_rawat)
);
```

### Tabel: tampjurnal (Temporary)
```sql
CREATE TABLE tampjurnal (
    kd_rek VARCHAR(15),
    nm_rek VARCHAR(100),
    debet DECIMAL(15,2),
    kredit DECIMAL(15,2)
);
```

---

## 🔗 Integrasi dengan Modul Lain

### 1. Rekam Medis (60+ Modul)
Akses cepat melalui accordion menu:

#### Penilaian Awal
- `RMPenilaianAwalKeperawatanRanap`
- `RMPenilaianAwalKeperawatanKebidananRanap`
- `RMPenilaianAwalKeperawatanRanapBayiAnak`
- `RMPenilaianAwalKeperawatanRanapNeonatus`
- `RMPenilaianAwalMedisRanapDewasa`
- `RMPenilaianAwalMedisRanapJantung`
- `RMPenilaianAwalMedisRanapKandungan`
- `RMPenilaianAwalMedisRanapNeonatus`
- `RMPenilaianAwalMedisRanapPsikiatrik`
- `RMPenilaianAwalMedisHemodialisa`

#### Pre/Post Operasi
- `RMChecklistPreOperasi`
- `RMChecklistPostOperasi`
- `RMSignInSebelumAnastesi`
- `RMTimeOutSebelumInsisi`
- `RMSignOutSebelumMenutupLuka`
- `RMPenilaianPreOperasi`
- `RMPenilaianPreAnestesi`
- `RMPenilaianPreInduksi`
- `RMChecklistKesiapanAnestesi`

#### Monitoring & Observasi
- `RMDataCatatanObservasiRanap`
- `RMDataCatatanObservasiRanapKebidanan`
- `RMDataCatatanObservasiRanapPostPartum`
- `RMDataCatatanObservasiBayi`
- `RMDataCatatanObservasiCHBP`
- `RMDataCatatanObservasiHemodialisa`
- `RMDataCatatanObservasiInduksiPersalinan`
- `RMDataCatatanObservasiVentilator`
- `RMDataCatatanObservasiRestrainNonFarmakologi`

#### Penilaian Risiko
- `RMPenilaianLanjutanRisikoJatuhDewasa`
- `RMPenilaianLanjutanRisikoJatuhAnak`
- `RMPenilaianLanjutanRisikoJatuhLansia`
- `RMPenilaianLanjutanRisikoJatuhGeriatri`
- `RMPenilaianLanjutanRisikoJatuhPsikiatri`
- `RMPenilaianLanjutanRisikoJatuhNeonatus`
- `RMPenilaianRisikoDekubitus`

#### Gizi
- `RMSkriningNutrisiDewasa`
- `RMSkriningNutrisiLansia`
- `RMSkriningNutrisiAnak`
- `RMDataSkriningGiziLanjut`
- `RMDataSkriningGiziKehamilan`
- `RMDataAsuhanGizi`
- `RMDataMonitoringAsuhanGizi`
- `RMCatatanADIMEGizi`

#### Farmasi
- `RMKonselingFarmasi`
- `RMRekonsiliasiObat`
- `DlgPeresepanDokter`
- `DlgPemberianObat`
- `DlgPermintaanResepPulang`
- `DlgCopyResep`

#### Pemeriksaan Penunjang
- `RMHasilPemeriksaanUSG`
- `RMHasilPemeriksaanUSGGynecologi`
- `RMHasilPemeriksaanUSGUrologi`
- `RMHasilPemeriksaanUSGNeonatus`
- `RMHasilPemeriksaanEKG`
- `RMHasilPemeriksaanEcho`
- `RMHasilPemeriksaanEchoPediatrik`
- `RMHasilPemeriksaanTreadmill`
- `RMHasilPemeriksaanSlitLamp`
- `RMHasilPemeriksaanOCT`
- `RMHasilEndoskopiHidung`
- `RMHasilEndoskopiTelinga`
- `RMHasilEndoskopiFaringLaring`

#### Lain-lain
- `RMDataResumePasienRanap`
- `RMCatatanPersalinan`
- `RMPenilaianBayiBaruLahir`
- `RMTransferPasienAntarRuang`
- `RMPerencanaanPemulangan`
- `RMRiwayatPerawatan`

### 2. Inventory (Obat & BHP)
- `DlgPemberianObat`: Input obat untuk pasien
- `DlgPeresepanDokter`: Resep dokter
- `DlgCopyResep`: Copy resep sebelumnya
- `DlgPermintaanStokPasien`: Permintaan stok
- `DlgPermintaanResepPulang`: Resep pulang
- `DlgCariObat2`, `DlgCariObat3`: Pencarian obat

### 3. Permintaan
- `DlgPermintaanLaboratorium`: Order lab
- `DlgPermintaanRadiologi`: Order radiologi
- `DlgBookingOperasi`: Jadwal operasi
- `DlgPermintaanKonsultasiMedik`: Konsul antar dokter
- `DlgPermintaanPelayananInformasiObat`: PPIO

### 4. Keuangan
- `Jurnal`: Pencatatan jurnal akuntansi otomatis
- `DlgCariPerawatanRanap`: Cari tagihan rawat inap
- `DlgCariPerawatanRanap2`: Cari tagihan (alternatif)

### 5. Kepegawaian
- `DlgCariDokter`: Master dokter
- `DlgCariPetugas`: Master perawat/petugas
- `DlgCariPegawai`: Master pegawai

### 6. Laporan
- `DlgBerkasRawat`: Berkas dokumen
- `DlgDiagnosaPenyakit`: Diagnosa

### 7. Surat
- `SuratKontrol`: Surat kontrol BPJS

---

## 🚀 Rekomendasi Pengembangan

### 1. Migrasi ke Modern Stack
**Prioritas: HIGH**

#### Masalah Saat Ini
- **Java Swing:** Desktop-only, sulit maintenance, UI kaku
- **12,164 baris dalam 1 file:** Violation of Single Responsibility Principle
- **Tight coupling:** Sulit testing dan refactoring

#### Solusi yang Direkomendasikan

**Backend:** Laravel (sudah ada di project)
- RESTful API untuk semua operasi CRUD
- Eloquent ORM untuk database abstraction
- Transaction handling dengan DB::transaction()
- Event & Listener untuk audit trail

**Frontend:** React/Inertia.js (sudah ada di project)
- Component-based architecture
- Better UX dengan real-time validation
- Responsive design (mobile-friendly)

#### Roadmap Migrasi
```
Phase 1: API Development (2-3 minggu)
├── Create Models: RawatInapDokter, RawatInapPerawat, RawatInapDokterPerawat
├── Create Controllers: RawatInapController
├── Create API Routes
├── Implement Transaction & Jurnal Logic
└── Unit Testing

Phase 2: Frontend Development (3-4 minggu)
├── Create React Components:
│   ├── RawatInapForm.jsx
│   ├── TindakanDokterTab.jsx
│   ├── TindakanPerawatTab.jsx
│   ├── TindakanDokterPerawatTab.jsx
│   ├── PemeriksaanSoapTab.jsx
│   ├── PemeriksaanObstetriTab.jsx
│   └── PemeriksaanGinekologiTab.jsx
├── Integrate with API
├── Form Validation
└── Component Testing

Phase 3: Integration & Testing (1-2 minggu)
├── Integration Testing
├── User Acceptance Testing
├── Performance Testing
└── Security Testing

Phase 4: Deployment & Training (1 minggu)
├── Deployment to Production
├── User Training
└── Documentation
```

### 2. Database Optimization

#### Indexing
```sql
-- Index untuk performa query
CREATE INDEX idx_rawat_inap_dr_norawat ON rawat_inap_dr(no_rawat);
CREATE INDEX idx_rawat_inap_dr_tgl ON rawat_inap_dr(tgl_perawatan);
CREATE INDEX idx_rawat_inap_dr_dokter ON rawat_inap_dr(kd_dokter);

CREATE INDEX idx_rawat_inap_pr_norawat ON rawat_inap_pr(no_rawat);
CREATE INDEX idx_rawat_inap_pr_tgl ON rawat_inap_pr(tgl_perawatan);
CREATE INDEX idx_rawat_inap_pr_petugas ON rawat_inap_pr(nip);

CREATE INDEX idx_pemeriksaan_ranap_norawat ON pemeriksaan_ranap(no_rawat);
CREATE INDEX idx_pemeriksaan_ranap_tgl ON pemeriksaan_ranap(tgl_perawatan);
```

#### Normalisasi
Pisahkan komponen biaya ke tabel terpisah:
```sql
CREATE TABLE komponen_biaya_tindakan (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    no_rawat VARCHAR(17),
    kd_jenis_prw VARCHAR(15),
    tgl_perawatan DATE,
    jam_rawat TIME,
    jasa_medik_dokter DECIMAL(15,2),
    jasa_medik_perawat DECIMAL(15,2),
    kso DECIMAL(15,2),
    jasa_sarana DECIMAL(15,2),
    bhp DECIMAL(15,2),
    jasa_menejemen DECIMAL(15,2),
    total_biaya DECIMAL(15,2),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### 3. Business Logic Refactoring

#### Service Layer Pattern
```php
// app/Services/RawatInap/TindakanService.php
class TindakanService {
    public function __construct(
        private JurnalService $jurnalService,
        private BiayaCalculator $biayaCalculator
    ) {}
    
    public function simpanTindakanDokter(array $data): bool {
        DB::beginTransaction();
        try {
            // 1. Validasi billing
            if ($this->isBillingVerified($data['no_rawat'])) {
                throw new BillingVerifiedException();
            }
            
            // 2. Hitung komponen biaya
            $biaya = $this->biayaCalculator->hitungBiayaDokter($data);
            
            // 3. Simpan tindakan
            $tindakan = RawatInapDokter::create([
                'no_rawat' => $data['no_rawat'],
                'kd_jenis_prw' => $data['kd_jenis_prw'],
                'kd_dokter' => $data['kd_dokter'],
                'tgl_perawatan' => $data['tgl_perawatan'],
                'jam_rawat' => $data['jam_rawat'],
                'biaya_rawat' => $biaya['total'],
                'bagian_rs' => $biaya['jasa_sarana'],
                'bhp' => $biaya['bhp'],
                'tarif_tindakandr' => $biaya['jasa_dokter'],
                'kso' => $biaya['kso'],
                'menejemen' => $biaya['menejemen'],
            ]);
            
            // 4. Posting jurnal
            $this->jurnalService->postingTindakanRawatInap(
                $data['no_rawat'],
                $biaya,
                'DOKTER'
            );
            
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
```

#### Calculator Pattern
```php
// app/Services/RawatInap/BiayaCalculator.php
class BiayaCalculator {
    public function hitungBiayaDokter(array $data): array {
        $jenisTindakan = JnsPerawatanInap::find($data['kd_jenis_prw']);
        
        return [
            'total' => $jenisTindakan->total_byrdr,
            'jasa_dokter' => $jenisTindakan->tarif_tindakandr,
            'kso' => $jenisTindakan->kso,
            'jasa_sarana' => $jenisTindakan->bagian_rs,
            'bhp' => $jenisTindakan->bhp,
            'menejemen' => $jenisTindakan->menejemen,
        ];
    }
    
    public function hitungBiayaPerawat(array $data): array {
        // Similar logic
    }
    
    public function hitungBiayaDokterPerawat(array $data): array {
        $dokter = $this->hitungBiayaDokter($data);
        $perawat = $this->hitungBiayaPerawat($data);
        
        return [
            'total' => $dokter['total'] + $perawat['total'],
            'jasa_dokter' => $dokter['jasa_dokter'],
            'jasa_perawat' => $perawat['jasa_perawat'],
            // ... combine other components
        ];
    }
}
```

### 4. API Endpoints Design

```php
// routes/api.php

Route::prefix('rawat-inap')->group(function () {
    // Tindakan Dokter
    Route::prefix('tindakan-dokter')->group(function () {
        Route::get('/', [TindakanDokterController::class, 'index']);
        Route::post('/', [TindakanDokterController::class, 'store']);
        Route::get('/{id}', [TindakanDokterController::class, 'show']);
        Route::put('/{id}', [TindakanDokterController::class, 'update']);
        Route::delete('/{id}', [TindakanDokterController::class, 'destroy']);
    });
    
    // Tindakan Perawat
    Route::prefix('tindakan-perawat')->group(function () {
        Route::get('/', [TindakanPerawatController::class, 'index']);
        Route::post('/', [TindakanPerawatController::class, 'store']);
        Route::get('/{id}', [TindakanPerawatController::class, 'show']);
        Route::put('/{id}', [TindakanPerawatController::class, 'update']);
        Route::delete('/{id}', [TindakanPerawatController::class, 'destroy']);
    });
    
    // Tindakan Dokter + Perawat
    Route::prefix('tindakan-dokter-perawat')->group(function () {
        Route::get('/', [TindakanDokterPerawatController::class, 'index']);
        Route::post('/', [TindakanDokterPerawatController::class, 'store']);
        Route::get('/{id}', [TindakanDokterPerawatController::class, 'show']);
        Route::put('/{id}', [TindakanDokterPerawatController::class, 'update']);
        Route::delete('/{id}', [TindakanDokterPerawatController::class, 'destroy']);
    });
    
    // Pemeriksaan SOAP
    Route::prefix('pemeriksaan')->group(function () {
        Route::get('/', [PemeriksaanController::class, 'index']);
        Route::post('/', [PemeriksaanController::class, 'store']);
        Route::get('/{id}', [PemeriksaanController::class, 'show']);
        Route::put('/{id}', [PemeriksaanController::class, 'update']);
        Route::delete('/{id}', [PemeriksaanController::class, 'destroy']);
    });
    
    // Pemeriksaan Obstetri
    Route::prefix('pemeriksaan-obstetri')->group(function () {
        Route::get('/', [PemeriksaanObstetriController::class, 'index']);
        Route::post('/', [PemeriksaanObstetriController::class, 'store']);
        Route::get('/{id}', [PemeriksaanObstetriController::class, 'show']);
        Route::put('/{id}', [PemeriksaanObstetriController::class, 'update']);
        Route::delete('/{id}', [PemeriksaanObstetriController::class, 'destroy']);
    });
    
    // Pemeriksaan Ginekologi
    Route::prefix('pemeriksaan-ginekologi')->group(function () {
        Route::get('/', [PemeriksaanGinekologiController::class, 'index']);
        Route::post('/', [PemeriksaanGinekologiController::class, 'store']);
        Route::get('/{id}', [PemeriksaanGinekologiController::class, 'show']);
        Route::put('/{id}', [PemeriksaanGinekologiController::class, 'update']);
        Route::delete('/{id}', [PemeriksaanGinekologiController::class, 'destroy']);
    });
    
    // Helper endpoints
    Route::get('/pasien/{no_rawat}', [RawatInapController::class, 'getPasienInfo']);
    Route::get('/cek-billing/{no_rawat}', [RawatInapController::class, 'cekBillingStatus']);
    Route::get('/jenis-tindakan', [RawatInapController::class, 'getJenisTindakan']);
});
```

### 5. Frontend Component Structure

```jsx
// resources/js/Pages/RawatInap/Index.jsx
import React, { useState } from 'react';
import { Tabs } from '@headlessui/react';
import TindakanDokterTab from './components/TindakanDokterTab';
import TindakanPerawatTab from './components/TindakanPerawatTab';
import TindakanDokterPerawatTab from './components/TindakanDokterPerawatTab';
import PemeriksaanSoapTab from './components/PemeriksaanSoapTab';
import PemeriksaanObstetriTab from './components/PemeriksaanObstetriTab';
import PemeriksaanGinekologiTab from './components/PemeriksaanGinekologiTab';

export default function RawatInapIndex() {
    const [selectedPasien, setSelectedPasien] = useState(null);
    
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">
                Perawatan/Tindakan Rawat Inap
            </h1>
            
            <Tabs>
                <Tabs.List className="flex space-x-2 border-b">
                    <Tabs.Tab>Penanganan Dokter</Tabs.Tab>
                    <Tabs.Tab>Penanganan Perawat</Tabs.Tab>
                    <Tabs.Tab>Dokter + Perawat</Tabs.Tab>
                    <Tabs.Tab>Pemeriksaan</Tabs.Tab>
                    <Tabs.Tab>Obstetri</Tabs.Tab>
                    <Tabs.Tab>Ginekologi</Tabs.Tab>
                </Tabs.List>
                
                <Tabs.Panels>
                    <Tabs.Panel>
                        <TindakanDokterTab pasien={selectedPasien} />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <TindakanPerawatTab pasien={selectedPasien} />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <TindakanDokterPerawatTab pasien={selectedPasien} />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <PemeriksaanSoapTab pasien={selectedPasien} />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <PemeriksaanObstetriTab pasien={selectedPasien} />
                    </Tabs.Panel>
                    <Tabs.Panel>
                        <PemeriksaanGinekologiTab pasien={selectedPasien} />
                    </Tabs.Panel>
                </Tabs.Panels>
            </Tabs>
        </div>
    );
}
```

### 6. Integrasi SATU SEHAT

**Titik Integrasi:**
- **Encounter:** Setiap tindakan rawat inap = 1 encounter
- **Condition:** Diagnosa dari pemeriksaan
- **Procedure:** Tindakan medis yang dilakukan
- **Observation:** Vital signs (suhu, tensi, nadi, dll)

**Implementasi:**
```php
// app/Services/SatuSehat/RawatInapSyncService.php
class RawatInapSyncService {
    public function syncTindakan($tindakanId) {
        // 1. Create/Update Encounter
        $encounter = $this->encounterService->create([
            'patient_ihs_number' => $pasien->ihs_number,
            'location_id' => $kamar->satusehat_location_id,
            'class' => 'IMP', // Inpatient
            'period_start' => $tindakan->tgl_perawatan,
            // ...
        ]);
        
        // 2. Create Procedure
        $procedure = $this->procedureService->create([
            'encounter_id' => $encounter->id,
            'code' => $tindakan->icd9cm_code,
            'performed_datetime' => $tindakan->tgl_perawatan,
            // ...
        ]);
        
        // 3. Create Observations (vital signs)
        if ($pemeriksaan) {
            $this->observationService->createVitalSigns([
                'encounter_id' => $encounter->id,
                'temperature' => $pemeriksaan->suhu,
                'blood_pressure' => $pemeriksaan->tensi,
                'pulse' => $pemeriksaan->nadi,
                'respiratory_rate' => $pemeriksaan->respirasi,
                'spo2' => $pemeriksaan->spo2,
                // ...
            ]);
        }
    }
}
```

### 7. Security & Audit Trail

```php
// Audit setiap perubahan data
class RawatInapObserver {
    public function created(RawatInapDokter $tindakan) {
        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'CREATE',
            'model' => 'RawatInapDokter',
            'model_id' => $tindakan->id,
            'old_values' => null,
            'new_values' => $tindakan->toArray(),
            'ip_address' => request()->ip(),
        ]);
    }
    
    public function updated(RawatInapDokter $tindakan) {
        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'UPDATE',
            'model' => 'RawatInapDokter',
            'model_id' => $tindakan->id,
            'old_values' => $tindakan->getOriginal(),
            'new_values' => $tindakan->getChanges(),
            'ip_address' => request()->ip(),
        ]);
    }
    
    public function deleted(RawatInapDokter $tindakan) {
        AuditLog::create([
            'user_id' => auth()->id(),
            'action' => 'DELETE',
            'model' => 'RawatInapDokter',
            'model_id' => $tindakan->id,
            'old_values' => $tindakan->toArray(),
            'new_values' => null,
            'ip_address' => request()->ip(),
        ]);
    }
}
```

### 8. Testing Strategy

```php
// tests/Feature/RawatInap/TindakanDokterTest.php
class TindakanDokterTest extends TestCase {
    use RefreshDatabase;
    
    public function test_can_create_tindakan_dokter() {
        $response = $this->postJson('/api/rawat-inap/tindakan-dokter', [
            'no_rawat' => '2026/02/14/000001',
            'kd_jenis_prw' => 'DR001',
            'kd_dokter' => 'DK001',
            'tgl_perawatan' => '2026-02-14',
            'jam_rawat' => '10:30:00',
        ]);
        
        $response->assertStatus(201);
        $this->assertDatabaseHas('rawat_inap_dr', [
            'no_rawat' => '2026/02/14/000001',
        ]);
    }
    
    public function test_cannot_create_tindakan_when_billing_verified() {
        // Setup billing verified
        
        $response = $this->postJson('/api/rawat-inap/tindakan-dokter', [/*...*/]);
        
        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Data billing sudah terverifikasi'
        ]);
    }
    
    public function test_jurnal_posted_correctly() {
        $response = $this->postJson('/api/rawat-inap/tindakan-dokter', [/*...*/]);
        
        $response->assertStatus(201);
        
        // Assert jurnal entries
        $this->assertDatabaseHas('jurnal', [
            'no_rawat' => '2026/02/14/000001',
            'keterangan' => 'TINDAKAN RAWAT INAP PASIEN',
        ]);
    }
}
```

---

## 📝 Catatan Penting

### Constraint Bisnis
1. **Billing Lock:** Tindakan tidak bisa diinput/diedit jika billing sudah terverifikasi
2. **Transaction Atomicity:** Semua operasi (insert tindakan + jurnal) harus sukses semua atau gagal semua
3. **Jurnal Double Entry:** Setiap transaksi harus balance (Debet = Kredit)

### Komponen Biaya yang Harus Diperhatikan
1. **Jasa Medik Dokter:** Dibayarkan ke dokter penanggungjawab
2. **Jasa Medik Perawat:** Dibayarkan ke perawat/petugas
3. **KSO (Kerjasama Operasional):** Pembagian dengan pihak ketiga
4. **Jasa Sarana:** Pendapatan rumah sakit
5. **BHP (Bahan Habis Pakai):** HPP material
6. **Jasa Menejemen:** Fee manajemen

### Validasi yang Perlu Ditambahkan
1. ✅ Cek billing status
2. ❌ Cek kamar masih aktif (belum pulang)
3. ❌ Cek duplikasi tindakan (same doctor, same procedure, same time)
4. ❌ Cek hak akses user sesuai role
5. ❌ Cek jam rawat tidak melebihi jam saat ini
6. ❌ Cek tanggal tidak backdate lebih dari X hari

---

## 🔧 Troubleshooting

### Issue 1: Transaction Timeout
**Symptom:** Transaksi lama, akhirnya timeout  
**Cause:** Terlalu banyak jurnal entry dalam 1 transaksi  
**Solution:** 
- Optimalkan query jurnal
- Gunakan batch insert
- Tingkatkan MySQL timeout

### Issue 2: Duplicate Entry
**Symptom:** Error "Duplicate entry for PRIMARY KEY"  
**Cause:** Insert dengan composite key yang sama  
**Solution:**
- Validasi sebelum insert
- Atau gunakan `INSERT ... ON DUPLICATE KEY UPDATE`

### Issue 3: Jurnal Tidak Balance
**Symptom:** Total Debet ≠ Total Kredit  
**Cause:** Error perhitungan komponen biaya  
**Solution:**
- Add validation `SUM(debet) = SUM(kredit)`
- Log semua jurnal entry untuk debugging

---

## 📚 Referensi

1. **SIMRS Khanza Documentation**
   - Repository: https://github.com/mas-elkhanza/SIMRS-Khanza
   
2. **ICD-9-CM Procedure Codes**
   - Untuk mapping tindakan ke kode standar
   
3. **SATU SEHAT API**
   - Documentation: https://satusehat.kemkes.go.id/
   - Encounter Resource
   - Procedure Resource
   - Observation Resource
   
4. **Laravel Best Practices**
   - Service Layer Pattern
   - Repository Pattern
   - Observer Pattern

---

## ✅ Checklist Implementasi

### Phase 1: Foundation
- [ ] Setup Models (RawatInapDokter, RawatInapPerawat, RawatInapDokterPerawat)
- [ ] Setup Migrations
- [ ] Setup Seeders (test data)
- [ ] Setup Factories (for testing)

### Phase 2: Business Logic
- [ ] Create BiayaCalculator Service
- [ ] Create JurnalService
- [ ] Create TindakanService
- [ ] Add Transaction Support
- [ ] Add Validation Rules

### Phase 3: API
- [ ] Create Controllers
- [ ] Create API Routes
- [ ] Create Form Requests (validation)
- [ ] Create API Resources (transformation)
- [ ] Create API Tests

### Phase 4: Frontend
- [ ] Create Tab Components
- [ ] Create Forms
- [ ] Integrate with API
- [ ] Add Client-side Validation
- [ ] Add Loading States
- [ ] Add Error Handling

### Phase 5: Integration
- [ ] Integrate with SATU SEHAT
- [ ] Integrate with existing Rekam Medis
- [ ] Integrate with Farmasi
- [ ] Integrate with Keuangan

### Phase 6: Testing & Deployment
- [ ] Unit Tests
- [ ] Integration Tests
- [ ] UAT (User Acceptance Testing)
- [ ] Performance Testing
- [ ] Security Audit
- [ ] Deploy to Staging
- [ ] User Training
- [ ] Deploy to Production
- [ ] Post-deployment Monitoring

---

**Last Updated:** 14 Februari 2026  
**Created By:** AI Assistant  
**Status:** Draft untuk Review & Development
