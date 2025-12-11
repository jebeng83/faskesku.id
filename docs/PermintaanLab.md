# Modul Permintaan Laboratorium — Dokumentasi Lengkap

Dokumen ini menjelaskan modul lengkap Permintaan Laboratorium (Patologi Klinis) yang terdiri dari tiga komponen utama: **Input Permintaan**, **Pencarian & Manajemen Permintaan**, dan **Input Hasil Pemeriksaan**. Modul ini diimplementasikan dalam aplikasi Java Swing dengan integrasi ke berbagai sistem LIS (Laboratory Information System).

## Ringkasan Analisa 6 File Java

### 1. DlgPermintaanLaboratorium (Input Permintaan Baru)
**File:** `public/DlgPermintaanLaboratorium.java` & `public/DlgPermintaanLaboratorium.form`

**Fungsi Utama:**
- Form untuk membuat permintaan laboratorium baru untuk pasien Rawat Jalan atau Rawat Inap
- Input data permintaan termasuk: pasien, dokter perujuk, jenis pemeriksaan (PK/PA/MB), informasi tambahan, dan diagnosa klinis
- Memilih jenis pemeriksaan dari template laboratorium yang tersedia

**Komponen UI Utama:**
- **Input Pasien:** `TNoRw`, `TNoRM`, `TPasien` (read-only, diisi dari registrasi)
- **Input Dokter:** `KodePerujuk`, `NmPerujuk` (dokter perujuk)
- **Input Pemeriksaan:** 
  - Tab "Patologi Klinis (PK)" dengan `tbTarifPK` dan `tbDetailPK`
  - Tab "Patologi Anatomi (PA)" dengan `tbTarifPA` dan form khusus PA
  - Tab "Mikrobiologi (MB)" dengan `tbTarifMB` dan `tbDetailMB`
- **Informasi Tambahan:** `InformasiTambahan`, `DiagnosisKlinis`
- **Tanggal & Jam:** `Tanggal`, `CmbJam`, `CmbMenit`, `CmbDetik`, `ChkJln` (checkbox Rawat Jalan)

**Alur Kerja:**
1. User memilih pasien (No. Rawat) → data pasien terisi otomatis
2. User memilih dokter perujuk
3. User mencari dan memilih jenis pemeriksaan (PK/PA/MB) dari template
4. User memilih detail pemeriksaan dari template yang dipilih
5. User mengisi informasi tambahan dan diagnosa klinis
6. User klik **Simpan** → data disimpan ke:
   - `permintaan_lab` (header)
   - `permintaan_pemeriksaan_lab` (jenis pemeriksaan)
   - `permintaan_detail_permintaan_lab` (detail template)

**Method Penting:**
- `BtnSimpanActionPerformed()` - Menyimpan permintaan baru ke database
- `tampiltarif()` - Menampilkan daftar jenis pemeriksaan berdasarkan pencarian
- `tampil()` - Menampilkan detail pemeriksaan yang dipilih
- `BtnPrintActionPerformed()` - Mencetak permintaan lab

---

### 2. DlgCariPermintaanLab (Pencarian & Manajemen Permintaan)
**File:** `public/DlgCariPermintaanLab.java` & `public/DlgCariPermintaanLab.form`

**Fungsi Utama:**
- Mencari dan menampilkan daftar permintaan lab yang sudah dibuat
- Mengelola status permintaan: waktu permintaan, pengambilan sampel, dan hasil
- Update waktu pengambilan sampel
- Hapus permintaan (dengan validasi pembayaran)
- Cetak permintaan/hasil
- Bridging ke berbagai sistem LIS untuk kirim permintaan dan ambil hasil

**Komponen UI Utama:**
- **Filter Utama:**
  - `Tgl1`, `Tgl2` - Rentang tanggal permintaan
  - `TCari` - Pencarian (noorder, no_rawat, no_rkm_medis, nama pasien, diagnosa, dokter, penjamin)
  - `BtnCari` - Eksekusi pencarian
- **Tab Rawat Jalan (`TabRawatJalan`):**
  - Filter tambahan: `CrDokter`, `CrPoli`
  - Sub-tab "Data Permintaan" (`tbLabRalan`) - menampilkan header permintaan
  - Sub-tab "Item Permintaan" (`tbLabRalan2`) - menampilkan detail item pemeriksaan
- **Tab Rawat Inap (`TabRawatInap`):**
  - Filter tambahan: `CrDokter2`, `Kamar`, `cmbStatus` (Semua/Belum Pulang)
  - Sub-tab "Data Permintaan" (`tbLabRanap`)
  - Sub-tab "Item Permintaan" (`tbLabRanap2`)
- **Toolbar Aksi:**
  - `BtnHapus` - Hapus permintaan (validasi pembayaran)
  - `BtnSampel` - Update waktu pengambilan sampel
  - `BtnHasil` - Buka dialog input hasil (`DlgPeriksaLaboratorium`)
  - `BtnAll` - Reset filter
  - `BtnPrint` - Cetak permintaan/hasil
- **Panel Bridging LIS (`PanelAccor`):**
  - Tombol kirim/ambil untuk berbagai LIS: LICA, Sysmex, ELIMS, TERAS, MEDQLAB, SMARTLAB, SOFTMEDIX, VansLab, SLIMS

**Alur Kerja:**
1. **Pencarian:**
   - User set rentang tanggal dan filter
   - User klik **Cari** → query ke `permintaan_lab` dengan join ke tabel terkait
   - Hasil ditampilkan di tabel sesuai tab (Rawat Jalan/Inap)

2. **Update Waktu Sampel:**
   - User pilih permintaan dari tabel
   - User klik **Sampel** → muncul dialog `WindowAmbilSampel`
   - User set tanggal & jam pengambilan sampel
   - User klik **Simpan** → update `tgl_sampel` dan `jam_sampel` di `permintaan_lab`

3. **Input Hasil:**
   - User pilih permintaan yang sudah diambil sampelnya
   - User klik **Hasil** → membuka `DlgPeriksaLaboratorium` dengan data permintaan terisi
   - User input hasil pemeriksaan di dialog tersebut

4. **Hapus Permintaan:**
   - Validasi: tidak boleh ada item yang sudah dibayar (`stts_bayar='Sudah'`)
   - Validasi: tidak boleh dihapus jika sudah diambil sampel (kecuali Admin Utama)
   - Jika validasi lolos → hapus dari `permintaan_lab` dan tabel terkait

5. **Bridging LIS:**
   - **Kirim:** Ambil data dari `permintaan_lab` + detail, kirim ke LIS sesuai format masing-masing
   - **Ambil:** Ambil hasil dari LIS, populate ke `temporary_permintaan_lab`, buka `DlgPeriksaLaboratorium`

**Method Penting:**
- `tampil()` - Query dan tampilkan permintaan Rawat Jalan
- `tampil2()` - Query dan tampilkan item permintaan Rawat Jalan
- `tampil3()` - Query dan tampilkan permintaan Rawat Inap
- `tampil4()` - Query dan tampilkan item permintaan Rawat Inap
- `BtnSampelActionPerformed()` - Buka dialog update waktu sampel
- `BtnSimpan4ActionPerformed()` - Simpan waktu pengambilan sampel
- `BtnHasilActionPerformed()` - Buka dialog input hasil
- `BtnHapusActionPerformed()` - Hapus permintaan dengan validasi
- `getData()` - Ambil data permintaan yang dipilih dari tabel

---

### 3. DlgPeriksaLaboratorium (Input Hasil Pemeriksaan)
**File:** `public/DlgPeriksaLaboratorium.java` & `public/DlgPeriksaLaboratorium.form`

**Fungsi Utama:**
- Form untuk input hasil pemeriksaan laboratorium
- Menampilkan daftar pemeriksaan yang diminta berdasarkan permintaan
- Input hasil, nilai rujukan, dan keterangan untuk setiap item pemeriksaan
- Simpan hasil ke database dan update status permintaan
- Cetak hasil pemeriksaan
- Integrasi dengan sistem akuntansi (jurnal) untuk pembayaran

**Komponen UI Utama:**
- **Data Pasien:** `TNoRw`, `TNoRM`, `TPasien`, `Jk`, `Umur`, `Alamat`, `Penjab` (read-only)
- **Data Petugas:** `KdPtg`, `NmPtg` (petugas yang melakukan pemeriksaan)
- **Data Dokter:** 
  - `KodePerujuk`, `NmPerujuk` (dokter perujuk)
  - `KodePj`, `NmDokterPj` (dokter penanggung jawab)
- **Tanggal & Jam Hasil:** `Tanggal`, `CmbJam`, `CmbMenit`, `CmbDetik`, `ChkJln`
- **Pencarian Pemeriksaan:** `Pemeriksaan`, `TCari`, `BtnCari1`, `BtnCari2`
- **Tabel Pemeriksaan:** `tbTarif` (daftar jenis pemeriksaan), `tbPemeriksaan` (detail dengan hasil)
- **Radio Button:** `rbDewasa`, `rbAnak` (untuk nilai rujukan)

**Alur Kerja:**
1. **Load Data Permintaan:**
   - Dialog dibuka dari `DlgCariPermintaanLab` dengan parameter `noorder` dan `no_rawat`
   - Method `setOrder()` dipanggil untuk load data permintaan
   - Data pasien, dokter, dan daftar pemeriksaan terisi otomatis

2. **Input Hasil:**
   - User pilih jenis pemeriksaan dari `tbTarif` (checkbox)
   - User klik **Cari** atau ketik di `Pemeriksaan` → tampilkan detail pemeriksaan di `tbPemeriksaan`
   - User input hasil di kolom "Hasil" untuk setiap item
   - User bisa edit nilai rujukan dan keterangan jika diperlukan

3. **Simpan Hasil:**
   - Validasi: semua field wajib terisi (pasien, petugas, dokter perujuk, dokter PJ, ada pemeriksaan dengan hasil)
   - Simpan hasil ke `periksa_lab` dan `detail_periksa_lab`
   - Update `tgl_hasil` dan `jam_hasil` di `permintaan_lab`
   - Jika ada integrasi akuntansi → buat jurnal transaksi
   - Tampilkan notifikasi sukses

4. **Cetak Hasil:**
   - User klik **Cetak** → generate laporan hasil pemeriksaan
   - Format laporan menampilkan: data pasien, dokter, tanggal, daftar pemeriksaan dengan hasil dan nilai rujukan

**Method Penting:**
- `setOrder(String noorder, String no_rawat, String status)` - Load data permintaan ke dialog
- `tampil(String order)` - Tampilkan daftar pemeriksaan berdasarkan permintaan
- `tampiltarif()` - Tampilkan daftar jenis pemeriksaan berdasarkan pencarian
- `BtnSimpanActionPerformed()` - Simpan hasil pemeriksaan ke database
- `BtnPrintActionPerformed()` - Cetak hasil pemeriksaan
- `tampilSysmex()`, `tampilELIMS()`, dll - Load hasil dari LIS eksternal

---

## Alur Lengkap Sistem Permintaan Lab

### Flowchart Alur Utama:

```
1. INPUT PERMINTAAN (DlgPermintaanLaboratorium)
   │
   ├─ Pilih Pasien (No. Rawat)
   ├─ Pilih Dokter Perujuk
   ├─ Pilih Jenis Pemeriksaan (PK/PA/MB)
   ├─ Pilih Detail Pemeriksaan dari Template
   ├─ Input Informasi Tambahan & Diagnosa
   └─ Simpan → permintaan_lab, permintaan_pemeriksaan_lab, permintaan_detail_permintaan_lab
   
2. PENCARIAN & MANAJEMEN (DlgCariPermintaanLab)
   │
   ├─ Cari Permintaan (Filter: Tanggal, Dokter, Poli/Kamar, Keyword)
   ├─ Pilih Permintaan dari Tabel
   │
   ├─ Opsi 1: UPDATE WAKTU SAMPEL
   │   ├─ Klik "Sampel"
   │   ├─ Set Tanggal & Jam Pengambilan
   │   └─ Simpan → Update tgl_sampel, jam_sampel di permintaan_lab
   │
   ├─ Opsi 2: BRIDGING LIS (Kirim)
   │   ├─ Pilih LIS (LICA, Sysmex, ELIMS, dll)
   │   ├─ Klik "Kirim"
   │   └─ Data dikirim ke LIS eksternal
   │
   ├─ Opsi 3: BRIDGING LIS (Ambil Hasil)
   │   ├─ Pilih LIS
   │   ├─ Klik "Ambil"
   │   ├─ Data hasil diambil dari LIS
   │   └─ Populate ke temporary_permintaan_lab → Buka DlgPeriksaLaboratorium
   │
   └─ Opsi 4: INPUT HASIL MANUAL
       ├─ Pastikan sampel sudah diambil (tgl_sampel terisi)
       ├─ Klik "Hasil"
       └─ Buka DlgPeriksaLaboratorium

3. INPUT HASIL (DlgPeriksaLaboratorium)
   │
   ├─ Load Data Permintaan (setOrder)
   ├─ Tampilkan Daftar Pemeriksaan
   ├─ Input Hasil untuk Setiap Item
   ├─ Input Petugas & Dokter PJ
   ├─ Set Tanggal & Jam Hasil
   └─ Simpan → periksa_lab, detail_periksa_lab, Update tgl_hasil di permintaan_lab
```

### Status Permintaan:

1. **Baru Dibuat** (`tgl_permintaan` terisi, `tgl_sampel` kosong)
   - Status: Permintaan sudah dibuat, belum diambil sampel
   - Aksi: Bisa dihapus (jika belum dibayar), bisa update waktu sampel

2. **Sampel Diambil** (`tgl_sampel` terisi, `tgl_hasil` kosong)
   - Status: Sampel sudah diambil, menunggu hasil
   - Aksi: Bisa input hasil, bisa bridging ambil dari LIS, tidak bisa dihapus

3. **Hasil Tersedia** (`tgl_hasil` terisi)
   - Status: Hasil sudah diinput, permintaan selesai
   - Aksi: Bisa cetak hasil, bisa lihat detail

---

## Skema Database Terkait

### Tabel Utama:

1. **`permintaan_lab`** (Header Permintaan)
   - **Primary Key:** `noorder` (VARCHAR)
   - **Kolom Penting:**
     - `no_rawat` - FK ke `reg_periksa`
     - `tgl_permintaan`, `jam_permintaan` - Waktu permintaan dibuat
     - `tgl_sampel`, `jam_sampel` - Waktu pengambilan sampel
     - `tgl_hasil`, `jam_hasil` - Waktu hasil tersedia
     - `dokter_perujuk` - FK ke `dokter`
     - `status` - 'ralan' atau 'ranap'
     - `informasi_tambahan`, `diagnosa_klinis` - Informasi tambahan

2. **`permintaan_pemeriksaan_lab`** (Jenis Pemeriksaan)
   - **Primary Key:** (`noorder`, `kd_jenis_prw`)
   - **Kolom:**
     - `noorder` - FK ke `permintaan_lab`
     - `kd_jenis_prw` - FK ke `jns_perawatan_lab`
     - `stts_bayar` - 'Sudah' atau 'Belum'

3. **`permintaan_detail_permintaan_lab`** (Detail Template)
   - **Primary Key:** (`noorder`, `kd_jenis_prw`, `id_template`)
   - **Kolom:**
     - `noorder` - FK ke `permintaan_lab`
     - `kd_jenis_prw` - FK ke `jns_perawatan_lab`
     - `id_template` - FK ke `template_laboratorium`
     - `stts_bayar` - 'Sudah' atau 'Belum'

4. **`periksa_lab`** (Header Hasil Pemeriksaan)
   - **Primary Key:** `no_rawat`, `tgl_periksa`, `jam`
   - **Kolom:**
     - `no_rawat` - FK ke `reg_periksa`
     - `tgl_periksa`, `jam` - Waktu pemeriksaan
     - `kd_dokter` - Dokter penanggung jawab
     - `kd_ptg` - Petugas pemeriksa
     - `status` - 'Ralan' atau 'Ranap'

5. **`detail_periksa_lab`** (Detail Hasil)
   - **Primary Key:** (`no_rawat`, `tgl_periksa`, `jam`, `id_template`)
   - **Kolom:**
     - `no_rawat`, `tgl_periksa`, `jam` - FK ke `periksa_lab`
     - `id_template` - FK ke `template_laboratorium`
     - `hasil` - Hasil pemeriksaan
     - `nilai_rujukan` - Nilai rujukan yang digunakan
     - `keterangan` - Keterangan tambahan

6. **`template_laboratorium`** (Template Pemeriksaan)
   - **Primary Key:** `id_template`
   - **Kolom:**
     - `kd_jenis_prw` - FK ke `jns_perawatan_lab`
     - `Pemeriksaan` - Nama pemeriksaan
     - `satuan` - Satuan hasil
     - `nilai_rujukan_la`, `nilai_rujukan_ld` - Nilai rujukan laki-laki (anak/dewasa)
     - `nilai_rujukan_pa`, `nilai_rujukan_pd` - Nilai rujukan perempuan (anak/dewasa)
     - `biaya_item`, `bagian_rs`, `bhp`, dll - Komponen biaya
     - `urut` - Urutan tampilan

7. **`temporary_permintaan_lab`** (Staging Hasil dari LIS)
   - Digunakan untuk staging data hasil dari LIS sebelum diinput ke `periksa_lab`
   - Kolom: `temp1` sampai `temp37` untuk menyimpan data sementara

---

## Bridging LIS (Laboratory Information System)

### Pola Umum Kirim Permintaan ke LIS:

1. **Ambil Data Header:**
   ```sql
   SELECT permintaan_lab.*, reg_periksa.*, pasien.*, dokter.*, poliklinik.*
   FROM permintaan_lab
   JOIN reg_periksa ON permintaan_lab.no_rawat = reg_periksa.no_rawat
   JOIN pasien ON reg_periksa.no_rkm_medis = pasien.no_rkm_medis
   JOIN dokter ON permintaan_lab.dokter_perujuk = dokter.kd_dokter
   LEFT JOIN poliklinik ON reg_periksa.kd_poli = poliklinik.kd_poli
   WHERE permintaan_lab.noorder = ?
   ```

2. **Ambil Data Detail:**
   ```sql
   SELECT permintaan_pemeriksaan_lab.*, permintaan_detail_permintaan_lab.*,
          template_laboratorium.*, jns_perawatan_lab.*
   FROM permintaan_pemeriksaan_lab
   JOIN permintaan_detail_permintaan_lab ON ...
   JOIN template_laboratorium ON ...
   JOIN jns_perawatan_lab ON ...
   WHERE permintaan_pemeriksaan_lab.noorder = ?
   ```

3. **Kirim ke LIS:**
   - **API:** POST/PUT ke endpoint LIS dengan format JSON/XML
   - **Database:** INSERT langsung ke tabel LIS (jika shared database)

### Pola Umum Ambil Hasil dari LIS:

1. **Ambil Hasil dari LIS:**
   - **API:** GET dari endpoint LIS, parse JSON/XML response
   - **Database:** SELECT dari tabel LIS

2. **Populate ke Temporary:**
   - Insert data hasil ke `temporary_permintaan_lab`

3. **Buka Dialog Input:**
   - Buka `DlgPeriksaLaboratorium` dengan data dari temporary
   - User review dan simpan ke `periksa_lab`

### Daftar LIS yang Didukung:

1. **LICA** (`ApiLICA`)
   - Kirim/ambil via API REST
   - Format: JSON

2. **Sysmex** (`koneksiDBSysmex`)
   - Kirim/ambil via database langsung
   - Tabel: `permintaan_lab`, `detail_permintaan_lab` (remote)

3. **ELIMS** (`koneksiDBELIMS`)
   - Kirim/ambil via database langsung
   - Tabel: `permintaan_lab`, `detail_permintaan_lab` (remote)

4. **TERAS**
   - Kirim via API
   - Notifikasi `WindowTerkirim` saat sukses

5. **MEDQLAB** (`ApiMEDQLAB`)
   - Ambil hasil via JSON API
   - Populate ke `temporary_permintaan_lab`

6. **SMARTLAB** (`koneksiDBSMARTLAB`)
   - Kirim ke tabel `HisToLisHeader` dan `HisToLisDetail`

7. **SOFTMEDIX** (`ApiSOFTMEDIX`)
   - Kirim/ambil via API

8. **VansLab** (`koneksiDBVANSLAB`)
   - Kirim/ambil via database langsung

9. **SLIMS** (`koneksiDBSLIMS`)
   - Kirim/ambil via database langsung

---

## Validasi & Business Rules

### Validasi Input Permintaan:
- No. Rawat harus terisi dan valid
- Dokter perujuk harus terisi
- Minimal ada 1 jenis pemeriksaan yang dipilih
- Informasi tambahan dan diagnosa klinis opsional

### Validasi Update Waktu Sampel:
- Permintaan harus sudah dibuat (`noorder` ada)
- Tidak ada validasi khusus (bisa diupdate kapan saja)

### Validasi Hapus Permintaan:
- **Tidak boleh dihapus jika:**
  - Ada item yang sudah dibayar (`stts_bayar='Sudah'` di `permintaan_pemeriksaan_lab` atau `permintaan_detail_permintaan_lab`)
  - Sudah diambil sampel (`tgl_sampel` terisi) - kecuali Admin Utama
- **Boleh dihapus jika:**
  - Belum ada pembayaran
  - Belum diambil sampel

### Validasi Input Hasil:
- Pasien harus terisi
- Petugas harus terisi
- Dokter perujuk harus terisi
- Dokter penanggung jawab harus terisi
- Minimal ada 1 pemeriksaan dengan hasil terisi
- Sampel harus sudah diambil (`tgl_sampel` terisi)

### Validasi Bridging:
- **Kirim:** Permintaan harus sudah dibuat
- **Ambil:** Sampel harus sudah diambil (untuk beberapa LIS)

---

## Query Utama (Referensi)

### Query Pencarian Permintaan Rawat Jalan:
```sql
SELECT 
    permintaan_lab.noorder,
    permintaan_lab.no_rawat,
    reg_periksa.no_rkm_medis,
    pasien.nm_pasien,
    permintaan_lab.tgl_permintaan,
    IF(permintaan_lab.jam_permintaan='00:00:00','',permintaan_lab.jam_permintaan) as jam_permintaan,
    IF(permintaan_lab.tgl_sampel='0000-00-00','',permintaan_lab.tgl_sampel) as tgl_sampel,
    IF(permintaan_lab.jam_sampel='00:00:00','',permintaan_lab.jam_sampel) as jam_sampel,
    IF(permintaan_lab.tgl_hasil='0000-00-00','',permintaan_lab.tgl_hasil) as tgl_hasil,
    IF(permintaan_lab.jam_hasil='00:00:00','',permintaan_lab.jam_hasil) as jam_hasil,
    permintaan_lab.dokter_perujuk,
    dokter.nm_dokter,
    poliklinik.nm_poli,
    permintaan_lab.informasi_tambahan,
    permintaan_lab.diagnosa_klinis,
    reg_periksa.kd_pj,
    penjab.png_jawab
FROM permintaan_lab
INNER JOIN reg_periksa ON permintaan_lab.no_rawat = reg_periksa.no_rawat
INNER JOIN pasien ON reg_periksa.no_rkm_medis = pasien.no_rkm_medis
INNER JOIN dokter ON permintaan_lab.dokter_perujuk = dokter.kd_dokter
INNER JOIN poliklinik ON reg_periksa.kd_poli = poliklinik.kd_poli
INNER JOIN penjab ON reg_periksa.kd_pj = penjab.kd_pj
WHERE permintaan_lab.status = 'ralan'
  AND permintaan_lab.tgl_permintaan BETWEEN ? AND ?
  AND (permintaan_lab.noorder LIKE ? 
       OR permintaan_lab.no_rawat LIKE ? 
       OR reg_periksa.no_rkm_medis LIKE ?
       OR pasien.nm_pasien LIKE ?
       OR permintaan_lab.diagnosa_klinis LIKE ?
       OR dokter.nm_dokter LIKE ?
       OR penjab.png_jawab LIKE ?)
ORDER BY permintaan_lab.tgl_permintaan DESC, permintaan_lab.jam_permintaan DESC
```

### Query Detail Item Permintaan:
```sql
SELECT 
    permintaan_lab.noorder,
    permintaan_lab.no_rawat,
    reg_periksa.no_rkm_medis,
    pasien.nm_pasien,
    jns_perawatan_lab.nm_perawatan,
    template_laboratorium.Pemeriksaan,
    template_laboratorium.satuan,
    template_laboratorium.nilai_rujukan_ld,
    template_laboratorium.nilai_rujukan_la,
    template_laboratorium.nilai_rujukan_pd,
    template_laboratorium.nilai_rujukan_pa,
    permintaan_lab.tgl_permintaan,
    permintaan_lab.jam_permintaan,
    permintaan_lab.tgl_sampel,
    permintaan_lab.jam_sampel,
    permintaan_lab.tgl_hasil,
    permintaan_lab.jam_hasil,
    permintaan_lab.dokter_perujuk,
    dokter.nm_dokter,
    poliklinik.nm_poli,
    permintaan_lab.informasi_tambahan,
    permintaan_lab.diagnosa_klinis
FROM permintaan_detail_permintaan_lab
INNER JOIN permintaan_lab ON permintaan_detail_permintaan_lab.noorder = permintaan_lab.noorder
INNER JOIN reg_periksa ON permintaan_lab.no_rawat = reg_periksa.no_rawat
INNER JOIN pasien ON reg_periksa.no_rkm_medis = pasien.no_rkm_medis
INNER JOIN template_laboratorium ON permintaan_detail_permintaan_lab.id_template = template_laboratorium.id_template
INNER JOIN jns_perawatan_lab ON permintaan_detail_permintaan_lab.kd_jenis_prw = jns_perawatan_lab.kd_jenis_prw
INNER JOIN dokter ON permintaan_lab.dokter_perujuk = dokter.kd_dokter
LEFT JOIN poliklinik ON reg_periksa.kd_poli = poliklinik.kd_poli
WHERE permintaan_lab.status = 'ralan'
  AND permintaan_lab.tgl_permintaan BETWEEN ? AND ?
ORDER BY permintaan_lab.tgl_permintaan DESC, template_laboratorium.urut
```

---

## Hak Akses & Permission

- **`akses.getpermintaan_lab()`** - Kontrol akses ke modul permintaan lab
  - Jika `false`: tombol-tombol aksi (Cetak, Hapus, Kirim, dll.) akan disabled/hidden
- **`akses.gettarif_lab()`** - Kontrol akses ke master tarif lab
- **Admin Utama** - Bisa hapus permintaan meskipun sudah diambil sampel

---

## Catatan Implementasi & Pengembangan

### Penambahan Integrasi LIS Baru:

1. **Tambah Tombol di UI:**
   - Tambah tombol "Kirim [LIS]" dan "Ambil [LIS]" di `FormMenu` (Panel Accor)
   - Tambah handler `ActionPerformed` di `DlgCariPermintaanLab.java`

2. **Implementasi Koneksi:**
   - Buat class koneksi (API atau Database) sesuai kebutuhan
   - Contoh: `Api[NamaLIS]` untuk API, `koneksiDB[NamaLIS]` untuk database

3. **Implementasi Kirim:**
   - Query data dari `permintaan_lab` dan detail
   - Transform ke format yang diminta LIS
   - Kirim via API atau INSERT ke database

4. **Implementasi Ambil:**
   - Ambil hasil dari LIS (API atau database)
   - Populate ke `temporary_permintaan_lab`
   - Buka `DlgPeriksaLaboratorium` dengan data temporary

5. **Validasi & Error Handling:**
   - Validasi sampel sudah diambil (jika diperlukan)
   - Handle error koneksi dan tampilkan notifikasi
   - Logging untuk debugging

### Normalisasi Data:

- Nilai default `'0000-00-00'` dan `'00:00:00'` di-normalisasi menjadi kosong di UI
- Gunakan `IF(column='0000-00-00','',column)` atau `IF(column='00:00:00','',column)` di query

### Penentuan Alur Rawat Jalan vs Rawat Inap:

- Gunakan `TabPilihRawat.getSelectedIndex()`:
  - `0` = Rawat Jalan
  - `1` = Rawat Inap
- Gunakan `status` di `permintaan_lab`:
  - `'ralan'` = Rawat Jalan
  - `'ranap'` = Rawat Inap

---

## Komponen Kode Penting

### Model Tabel:
- **DlgPermintaanLaboratorium:**
  - `tbTarifPK`, `tbDetailPK` - Patologi Klinis
  - `tbTarifPA`, `tbTarifPA` - Patologi Anatomi
  - `tbTarifMB`, `tbDetailMB` - Mikrobiologi

- **DlgCariPermintaanLab:**
  - `tbLabRalan`, `tbLabRalan2` - Rawat Jalan (header & detail)
  - `tbLabRanap`, `tbLabRanap2` - Rawat Inap (header & detail)

- **DlgPeriksaLaboratorium:**
  - `tbTarif` - Daftar jenis pemeriksaan
  - `tbPemeriksaan` - Detail pemeriksaan dengan hasil

### Handler Utama:

**DlgPermintaanLaboratorium:**
- `BtnSimpanActionPerformed()` - Simpan permintaan baru
- `tampiltarif()` - Tampilkan jenis pemeriksaan
- `tampil()` - Tampilkan detail pemeriksaan
- `BtnPrintActionPerformed()` - Cetak permintaan

**DlgCariPermintaanLab:**
- `tampil()` - Query permintaan Rawat Jalan
- `tampil2()` - Query item permintaan Rawat Jalan
- `tampil3()` - Query permintaan Rawat Inap
- `tampil4()` - Query item permintaan Rawat Inap
- `BtnSampelActionPerformed()` - Update waktu sampel
- `BtnHasilActionPerformed()` - Buka dialog input hasil
- `BtnHapusActionPerformed()` - Hapus permintaan
- `getData()` - Ambil data dari tabel

**DlgPeriksaLaboratorium:**
- `setOrder()` - Load data permintaan
- `tampil()` - Tampilkan daftar pemeriksaan
- `tampiltarif()` - Tampilkan jenis pemeriksaan
- `BtnSimpanActionPerformed()` - Simpan hasil
- `BtnPrintActionPerformed()` - Cetak hasil

---

## Rancangan Implementasi untuk Aplikasi Laravel + Inertia + React

Rancangan ini menjelaskan implementasi modul Permintaan Lab **tanpa bridging LIS** untuk aplikasi Laravel dengan Inertia.js dan React. Fokus pada alur manual lengkap dari input permintaan hingga input hasil.

### Arsitektur Umum

```
Frontend (React/Inertia)
    ↓
Controllers (Laravel)
    ↓
Models (Eloquent)
    ↓
Database (MySQL)
```

### 1. Struktur Models (Eloquent)

#### 1.1 Model PermintaanLab

**File:** `app/Models/PermintaanLab.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PermintaanLab extends Model
{
    protected $table = 'permintaan_lab';
    protected $primaryKey = 'noorder';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'noorder',
        'no_rawat',
        'tgl_permintaan',
        'jam_permintaan',
        'tgl_sampel',
        'jam_sampel',
        'tgl_hasil',
        'jam_hasil',
        'dokter_perujuk',
        'status',
        'informasi_tambahan',
        'diagnosa_klinis',
    ];

    protected $casts = [
        'tgl_permintaan' => 'date',
        'tgl_sampel' => 'date',
        'tgl_hasil' => 'date',
    ];

    /**
     * Relasi ke RegPeriksa
     */
    public function regPeriksa(): BelongsTo
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }

    /**
     * Relasi ke Dokter (perujuk)
     */
    public function dokter(): BelongsTo
    {
        return $this->belongsTo(Dokter::class, 'dokter_perujuk', 'kd_dokter');
    }

    /**
     * Relasi ke PermintaanPemeriksaanLab
     */
    public function pemeriksaanLab(): HasMany
    {
        return $this->hasMany(PermintaanPemeriksaanLab::class, 'noorder', 'noorder');
    }

    /**
     * Relasi ke PermintaanDetailPermintaanLab
     */
    public function detailPermintaan(): HasMany
    {
        return $this->hasMany(PermintaanDetailPermintaanLab::class, 'noorder', 'noorder');
    }

    /**
     * Scope untuk filter status
     */
    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope untuk filter tanggal permintaan
     */
    public function scopeByTanggalPermintaan($query, string $tanggal)
    {
        return $query->whereDate('tgl_permintaan', $tanggal);
    }

    /**
     * Scope untuk filter dokter
     */
    public function scopeByDokter($query, string $kdDokter)
    {
        return $query->where('dokter_perujuk', $kdDokter);
    }

    /**
     * Accessor untuk status lengkap
     */
    public function getStatusLengkapAttribute(): string
    {
        return $this->status === 'ralan' ? 'Rawat Jalan' : 'Rawat Inap';
    }

    /**
     * Accessor untuk cek apakah sampel sudah diambil
     */
    public function getSampelSudahDiambilAttribute(): bool
    {
        return $this->tgl_sampel && $this->tgl_sampel !== '0000-00-00';
    }

    /**
     * Accessor untuk cek apakah hasil sudah tersedia
     */
    public function getHasilSudahTersediaAttribute(): bool
    {
        return $this->tgl_hasil && $this->tgl_hasil !== '0000-00-00';
    }

    /**
     * Generate nomor order otomatis
     */
    public static function generateNoOrder(): string
    {
        $date = now()->format('Ymd');
        $lastOrder = self::where('noorder', 'like', "LAB{$date}%")
            ->orderBy('noorder', 'desc')
            ->first();
        
        if ($lastOrder) {
            $lastNumber = (int) substr($lastOrder->noorder, -4);
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }
        
        return "LAB{$date}" . str_pad($newNumber, 4, '0', STR_PAD_LEFT);
    }
}
```

#### 1.2 Model PermintaanPemeriksaanLab

**File:** `app/Models/PermintaanPemeriksaanLab.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PermintaanPemeriksaanLab extends Model
{
    protected $table = 'permintaan_pemeriksaan_lab';
    protected $primaryKey = ['noorder', 'kd_jenis_prw'];
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'noorder',
        'kd_jenis_prw',
        'stts_bayar',
    ];

    /**
     * Relasi ke PermintaanLab
     */
    public function permintaanLab(): BelongsTo
    {
        return $this->belongsTo(PermintaanLab::class, 'noorder', 'noorder');
    }

    /**
     * Relasi ke JnsPerawatanLab
     */
    public function jnsPerawatanLab(): BelongsTo
    {
        return $this->belongsTo(JnsPerawatanLab::class, 'kd_jenis_prw', 'kd_jenis_prw');
    }
}
```

#### 1.3 Model PermintaanDetailPermintaanLab

**File:** `app/Models/PermintaanDetailPermintaanLab.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PermintaanDetailPermintaanLab extends Model
{
    protected $table = 'permintaan_detail_permintaan_lab';
    protected $primaryKey = ['noorder', 'kd_jenis_prw', 'id_template'];
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'noorder',
        'kd_jenis_prw',
        'id_template',
        'stts_bayar',
    ];

    /**
     * Relasi ke PermintaanLab
     */
    public function permintaanLab(): BelongsTo
    {
        return $this->belongsTo(PermintaanLab::class, 'noorder', 'noorder');
    }

    /**
     * Relasi ke TemplateLaboratorium
     */
    public function templateLaboratorium(): BelongsTo
    {
        return $this->belongsTo(TemplateLaboratorium::class, 'id_template', 'id_template');
    }

    /**
     * Relasi ke JnsPerawatanLab
     */
    public function jnsPerawatanLab(): BelongsTo
    {
        return $this->belongsTo(JnsPerawatanLab::class, 'kd_jenis_prw', 'kd_jenis_prw');
    }
}
```

#### 1.4 Model PeriksaLab (Hasil Pemeriksaan)

**File:** `app/Models/PeriksaLab.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PeriksaLab extends Model
{
    protected $table = 'periksa_lab';
    protected $primaryKey = ['no_rawat', 'tgl_periksa', 'jam'];
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'no_rawat',
        'tgl_periksa',
        'jam',
        'kd_dokter',
        'kd_ptg',
        'status',
    ];

    protected $casts = [
        'tgl_periksa' => 'date',
    ];

    /**
     * Relasi ke RegPeriksa
     */
    public function regPeriksa(): BelongsTo
    {
        return $this->belongsTo(RegPeriksa::class, 'no_rawat', 'no_rawat');
    }

    /**
     * Relasi ke Dokter (penanggung jawab)
     */
    public function dokter(): BelongsTo
    {
        return $this->belongsTo(Dokter::class, 'kd_dokter', 'kd_dokter');
    }

    /**
     * Relasi ke Petugas
     */
    public function petugas(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'kd_ptg', 'nik');
    }

    /**
     * Relasi ke DetailPeriksaLab
     */
    public function detailPeriksa(): HasMany
    {
        return $this->hasMany(DetailPeriksaLab::class, 'no_rawat', 'no_rawat')
            ->where('tgl_periksa', $this->tgl_periksa)
            ->where('jam', $this->jam);
    }
}
```

#### 1.5 Model DetailPeriksaLab

**File:** `app/Models/DetailPeriksaLab.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DetailPeriksaLab extends Model
{
    protected $table = 'detail_periksa_lab';
    protected $primaryKey = ['no_rawat', 'tgl_periksa', 'jam', 'id_template'];
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'no_rawat',
        'tgl_periksa',
        'jam',
        'id_template',
        'hasil',
        'nilai_rujukan',
        'keterangan',
    ];

    protected $casts = [
        'tgl_periksa' => 'date',
    ];

    /**
     * Relasi ke PeriksaLab
     */
    public function periksaLab(): BelongsTo
    {
        return $this->belongsTo(PeriksaLab::class, ['no_rawat', 'tgl_periksa', 'jam'], 
            ['no_rawat', 'tgl_periksa', 'jam']);
    }

    /**
     * Relasi ke TemplateLaboratorium
     */
    public function templateLaboratorium(): BelongsTo
    {
        return $this->belongsTo(TemplateLaboratorium::class, 'id_template', 'id_template');
    }
}
```

---

### 2. Controllers

#### 2.1 PermintaanLabController (Web)

**File:** `app/Http/Controllers/PermintaanLabController.php`

**Method yang perlu ditambahkan/diperbaiki:**

```php
/**
 * Update waktu pengambilan sampel
 */
public function updateSampel(Request $request, string $noorder)
{
    $validator = Validator::make($request->all(), [
        'tgl_sampel' => 'required|date',
        'jam_sampel' => 'required|date_format:H:i',
    ]);

    if ($validator->fails()) {
        return back()->withErrors($validator)->withInput();
    }

    try {
        $permintaanLab = PermintaanLab::findOrFail($noorder);
        
        // Validasi: tidak boleh update jika sudah ada hasil
        if ($permintaanLab->hasil_sudah_tersedia) {
            return back()->withErrors(['error' => 'Tidak dapat mengubah waktu sampel karena hasil sudah tersedia.']);
        }

        $permintaanLab->update([
            'tgl_sampel' => $request->tgl_sampel,
            'jam_sampel' => $request->jam_sampel,
        ]);

        return redirect()->route('laboratorium.permintaan-lab.index')
            ->with('success', 'Waktu pengambilan sampel berhasil diperbarui.');
    } catch (\Exception $e) {
        Log::error('Update sampel error: ' . $e->getMessage());
        return back()->withErrors(['error' => 'Gagal memperbarui waktu sampel.'])->withInput();
    }
}

/**
 * Hapus permintaan dengan validasi
 */
public function destroy(string $noorder)
{
    try {
        $permintaanLab = PermintaanLab::with(['pemeriksaanLab', 'detailPermintaan'])->findOrFail($noorder);
        
        // Validasi: tidak boleh dihapus jika sudah dibayar
        $sudahDibayar = $permintaanLab->pemeriksaanLab()
            ->where('stts_bayar', 'Sudah')
            ->exists();
        
        $detailSudahDibayar = $permintaanLab->detailPermintaan()
            ->where('stts_bayar', 'Sudah')
            ->exists();

        if ($sudahDibayar || $detailSudahDibayar) {
            return back()->withErrors(['error' => 'Tidak dapat menghapus permintaan karena sudah ada item yang dibayar.']);
        }

        // Validasi: tidak boleh dihapus jika sudah diambil sampel (kecuali admin)
        if ($permintaanLab->sampel_sudah_diambil && !auth()->user()->hasRole('Admin Utama')) {
            return back()->withErrors(['error' => 'Tidak dapat menghapus permintaan karena sampel sudah diambil.']);
        }

        DB::beginTransaction();
        
        // Hapus detail terlebih dahulu
        $permintaanLab->detailPermintaan()->delete();
        $permintaanLab->pemeriksaanLab()->delete();
        $permintaanLab->delete();

        DB::commit();

        return redirect()->route('laboratorium.permintaan-lab.index')
            ->with('success', 'Permintaan laboratorium berhasil dihapus.');
    } catch (\Exception $e) {
        DB::rollBack();
        Log::error('Hapus permintaan error: ' . $e->getMessage());
        return back()->withErrors(['error' => 'Gagal menghapus permintaan.']);
    }
}
```

#### 2.2 PeriksaLabController (Input Hasil)

**File:** `app/Http/Controllers/PeriksaLabController.php` (BARU)

```php
<?php

namespace App\Http\Controllers;

use App\Models\PermintaanLab;
use App\Models\PeriksaLab;
use App\Models\DetailPeriksaLab;
use App\Models\TemplateLaboratorium;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Carbon\Carbon;

class PeriksaLabController extends Controller
{
    /**
     * Tampilkan form input hasil berdasarkan permintaan
     */
    public function create(Request $request, string $noorder)
    {
        $permintaanLab = PermintaanLab::with([
            'regPeriksa.patient',
            'regPeriksa.poliklinik',
            'dokter',
            'detailPermintaan.templateLaboratorium',
            'detailPermintaan.jnsPerawatanLab',
        ])->findOrFail($noorder);

        // Validasi: sampel harus sudah diambil
        if (!$permintaanLab->sampel_sudah_diambil) {
            return redirect()->route('laboratorium.permintaan-lab.index')
                ->withErrors(['error' => 'Sampel belum diambil. Silakan update waktu pengambilan sampel terlebih dahulu.']);
        }

        // Group detail by kd_jenis_prw untuk tampilan
        $groupedDetails = $permintaanLab->detailPermintaan
            ->groupBy('kd_jenis_prw')
            ->map(function ($details, $kdJenisPrw) {
                $firstDetail = $details->first();
                return [
                    'kd_jenis_prw' => $kdJenisPrw,
                    'nm_perawatan' => $firstDetail->jnsPerawatanLab->nm_perawatan ?? '',
                    'templates' => $details->map(function ($detail) {
                        return [
                            'id_template' => $detail->id_template,
                            'pemeriksaan' => $detail->templateLaboratorium->Pemeriksaan ?? '',
                            'satuan' => $detail->templateLaboratorium->satuan ?? '',
                            'nilai_rujukan_la' => $detail->templateLaboratorium->nilai_rujukan_la ?? '',
                            'nilai_rujukan_ld' => $detail->templateLaboratorium->nilai_rujukan_ld ?? '',
                            'nilai_rujukan_pa' => $detail->templateLaboratorium->nilai_rujukan_pa ?? '',
                            'nilai_rujukan_pd' => $detail->templateLaboratorium->nilai_rujukan_pd ?? '',
                        ];
                    }),
                ];
            });

        return Inertia::render('Laboratorium/InputHasil', [
            'permintaanLab' => $permintaanLab,
            'groupedDetails' => $groupedDetails,
        ]);
    }

    /**
     * Simpan hasil pemeriksaan
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'noorder' => 'required|string|exists:permintaan_lab,noorder',
            'no_rawat' => 'required|string|exists:reg_periksa,no_rawat',
            'tgl_periksa' => 'required|date',
            'jam' => 'required|date_format:H:i:s',
            'kd_dokter' => 'required|string|exists:dokter,kd_dokter',
            'kd_ptg' => 'required|string|exists:pegawai,nik',
            'status' => 'required|in:Ralan,Ranap',
            'hasil' => 'required|array|min:1',
            'hasil.*.id_template' => 'required|integer|exists:template_laboratorium,id_template',
            'hasil.*.hasil' => 'required|string',
            'hasil.*.nilai_rujukan' => 'nullable|string',
            'hasil.*.keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        DB::beginTransaction();
        try {
            $data = $validator->validated();
            $permintaanLab = PermintaanLab::findOrFail($data['noorder']);

            // Validasi: sampel harus sudah diambil
            if (!$permintaanLab->sampel_sudah_diambil) {
                return back()->withErrors(['error' => 'Sampel belum diambil.'])->withInput();
            }

            // Create header periksa_lab
            $periksaLab = PeriksaLab::create([
                'no_rawat' => $data['no_rawat'],
                'tgl_periksa' => $data['tgl_periksa'],
                'jam' => $data['jam'],
                'kd_dokter' => $data['kd_dokter'],
                'kd_ptg' => $data['kd_ptg'],
                'status' => $data['status'],
            ]);

            // Create detail_periksa_lab
            foreach ($data['hasil'] as $hasilItem) {
                DetailPeriksaLab::create([
                    'no_rawat' => $data['no_rawat'],
                    'tgl_periksa' => $data['tgl_periksa'],
                    'jam' => $data['jam'],
                    'id_template' => $hasilItem['id_template'],
                    'hasil' => $hasilItem['hasil'],
                    'nilai_rujukan' => $hasilItem['nilai_rujukan'] ?? '',
                    'keterangan' => $hasilItem['keterangan'] ?? '',
                ]);
            }

            // Update tgl_hasil dan jam_hasil di permintaan_lab
            $permintaanLab->update([
                'tgl_hasil' => $data['tgl_periksa'],
                'jam_hasil' => $data['jam'],
            ]);

            DB::commit();

            return redirect()->route('laboratorium.permintaan-lab.index')
                ->with('success', 'Hasil pemeriksaan berhasil disimpan.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Simpan hasil error: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Gagal menyimpan hasil pemeriksaan.'])->withInput();
        }
    }
}
```

---

### 3. Routes

**File:** `routes/web.php`

```php
// Permintaan Lab Routes
Route::prefix('laboratorium')->name('laboratorium.')->group(function () {
    // Permintaan Lab
    Route::get('/permintaan-lab', [PermintaanLabController::class, 'index'])->name('permintaan-lab.index');
    Route::get('/permintaan-lab/create', [PermintaanLabController::class, 'create'])->name('permintaan-lab.create');
    Route::post('/permintaan-lab', [PermintaanLabController::class, 'store'])->name('permintaan-lab.store');
    Route::get('/permintaan-lab/{noorder}', [PermintaanLabController::class, 'show'])->name('permintaan-lab.show');
    Route::get('/permintaan-lab/{noorder}/edit', [PermintaanLabController::class, 'edit'])->name('permintaan-lab.edit');
    Route::put('/permintaan-lab/{noorder}', [PermintaanLabController::class, 'update'])->name('permintaan-lab.update');
    Route::delete('/permintaan-lab/{noorder}', [PermintaanLabController::class, 'destroy'])->name('permintaan-lab.destroy');
    
    // Update waktu sampel
    Route::put('/permintaan-lab/{noorder}/sampel', [PermintaanLabController::class, 'updateSampel'])->name('permintaan-lab.update-sampel');
    
    // Input hasil
    Route::get('/permintaan-lab/{noorder}/hasil', [PeriksaLabController::class, 'create'])->name('permintaan-lab.input-hasil');
    Route::post('/periksa-lab', [PeriksaLabController::class, 'store'])->name('periksa-lab.store');
});
```

**File:** `routes/api.php`

```php
// API Routes untuk Permintaan Lab
Route::prefix('permintaan-lab')->name('api.permintaan-lab.')->group(function () {
    Route::get('/reg-periksa', [PermintaanLabController::class, 'getRegPeriksa'])->name('reg-periksa');
    Route::get('/lab-tests', [PermintaanLabController::class, 'getLabTests'])->name('lab-tests');
    Route::get('/by-no-rawat/{noRawat}', [PermintaanLabController::class, 'getByNoRawat'])->name('by-no-rawat');
    Route::get('/riwayat/{noRawat}', [PermintaanLabController::class, 'getRiwayat'])->name('riwayat');
});
```

---

### 4. Frontend Pages & Components

#### 4.1 Page: Daftar Permintaan Lab

**File:** `resources/js/Pages/Laboratorium/PermintaanLab/Index.jsx`

**Fitur:**
- Tabel daftar permintaan dengan filter (tanggal, status, dokter, keyword)
- Tab Rawat Jalan / Rawat Inap
- Sub-tab Data Permintaan / Item Permintaan
- Aksi: Update Sampel, Input Hasil, Hapus, Cetak

**Struktur Komponen:**
```jsx
- FilterBar (tanggal, search, dokter, poli/kamar)
- TabNavigation (Rawat Jalan / Rawat Inap)
- SubTabNavigation (Data Permintaan / Item Permintaan)
- DataTable (permintaan atau item)
- ActionButtons (Sampel, Hasil, Hapus, Cetak)
- ModalUpdateSampel
```

#### 4.2 Page: Input Permintaan Baru

**File:** `resources/js/Pages/Laboratorium/PermintaanLab/Create.jsx`

**Fitur:**
- Form input pasien (No. Rawat) - autocomplete
- Form input dokter perujuk - autocomplete
- Tab jenis pemeriksaan (PK/PA/MB)
- Pencarian jenis pemeriksaan
- Pilih detail pemeriksaan dari template
- Input informasi tambahan & diagnosa klinis
- Simpan permintaan

**Struktur Komponen:**
```jsx
- PatientSelector (autocomplete No. Rawat)
- DoctorSelector (autocomplete dokter perujuk)
- TabNavigation (PK / PA / MB)
- TestSearchBar (pencarian jenis pemeriksaan)
- TestList (daftar jenis pemeriksaan dengan checkbox)
- TemplateDetailList (daftar detail template untuk jenis yang dipilih)
- FormInput (informasi tambahan, diagnosa)
- SubmitButton
```

#### 4.3 Page: Input Hasil Pemeriksaan

**File:** `resources/js/Pages/Laboratorium/InputHasil.jsx`

**Fitur:**
- Tampilkan data pasien & permintaan (read-only)
- Form input petugas & dokter PJ
- Tampilkan daftar pemeriksaan yang diminta
- Input hasil untuk setiap item
- Pilih nilai rujukan (dewasa/anak, laki/perempuan)
- Simpan hasil

**Struktur Komponen:**
```jsx
- PatientInfoCard (read-only)
- RequestInfoCard (read-only)
- PetugasSelector (autocomplete)
- DoctorPJSelector (autocomplete)
- ExaminationList (grouped by jenis pemeriksaan)
- ResultInputForm (untuk setiap template)
- ReferenceValueSelector (dewasa/anak, laki/perempuan)
- SubmitButton
```

---

### 5. Alur Workflow Lengkap (Tanpa Bridging LIS)

```
┌─────────────────────────────────────────────────────────────┐
│ 1. INPUT PERMINTAAN BARU                                    │
└─────────────────────────────────────────────────────────────┘
│
├─ User buka: /laboratorium/permintaan-lab/create
├─ User pilih pasien (No. Rawat) → data pasien terisi otomatis
├─ User pilih dokter perujuk
├─ User pilih jenis pemeriksaan (PK/PA/MB) dari template
├─ User pilih detail pemeriksaan dari template yang dipilih
├─ User isi informasi tambahan & diagnosa klinis
├─ User klik Simpan
│
└─→ POST /laboratorium/permintaan-lab
    ├─ Generate noorder otomatis
    ├─ Insert ke permintaan_lab
    ├─ Insert ke permintaan_pemeriksaan_lab
    └─ Insert ke permintaan_detail_permintaan_lab

┌─────────────────────────────────────────────────────────────┐
│ 2. PENCARIAN & MANAJEMEN PERMINTAAN                         │
└─────────────────────────────────────────────────────────────┘
│
├─ User buka: /laboratorium/permintaan-lab
├─ User set filter (tanggal, status, dokter, keyword)
├─ User klik Cari → tampilkan daftar permintaan
│
├─ OPSI A: UPDATE WAKTU SAMPEL
│   ├─ User pilih permintaan dari tabel
│   ├─ User klik "Update Sampel"
│   ├─ Modal muncul: form tanggal & jam sampel
│   ├─ User isi tanggal & jam pengambilan sampel
│   ├─ User klik Simpan
│   │
│   └─→ PUT /laboratorium/permintaan-lab/{noorder}/sampel
│       └─ Update tgl_sampel & jam_sampel di permintaan_lab
│
├─ OPSI B: INPUT HASIL
│   ├─ User pilih permintaan yang sudah diambil sampelnya
│   ├─ User klik "Input Hasil"
│   │
│   └─→ GET /laboratorium/permintaan-lab/{noorder}/hasil
│       ├─ Validasi: sampel harus sudah diambil
│       └─ Tampilkan form input hasil
│
└─ OPSI C: HAPUS PERMINTAAN
    ├─ User pilih permintaan dari tabel
    ├─ User klik "Hapus"
    ├─ Konfirmasi hapus
    │
    └─→ DELETE /laboratorium/permintaan-lab/{noorder}
        ├─ Validasi: tidak ada item yang sudah dibayar
        ├─ Validasi: belum diambil sampel (kecuali admin)
        ├─ Hapus detail permintaan
        ├─ Hapus pemeriksaan lab
        └─ Hapus permintaan lab

┌─────────────────────────────────────────────────────────────┐
│ 3. INPUT HASIL PEMERIKSAAN                                  │
└─────────────────────────────────────────────────────────────┘
│
├─ User buka form input hasil (dari langkah 2 OPSI B)
├─ Data pasien & permintaan terisi otomatis (read-only)
├─ User pilih petugas (autocomplete)
├─ User pilih dokter penanggung jawab (autocomplete)
├─ User set tanggal & jam hasil
├─ User input hasil untuk setiap item pemeriksaan
├─ User pilih nilai rujukan (dewasa/anak, laki/perempuan)
├─ User isi keterangan (opsional)
├─ User klik Simpan
│
└─→ POST /periksa-lab
    ├─ Validasi: sampel sudah diambil
    ├─ Insert ke periksa_lab (header)
    ├─ Insert ke detail_periksa_lab (detail hasil)
    └─ Update tgl_hasil & jam_hasil di permintaan_lab
```

---

### 6. Validasi & Business Rules

#### 6.1 Validasi Input Permintaan:
- ✅ No. Rawat harus terisi dan valid (exists di reg_periksa)
- ✅ Dokter perujuk harus terisi (exists di dokter)
- ✅ Minimal ada 1 jenis pemeriksaan yang dipilih
- ✅ Diagnosa klinis wajib (max 80 karakter)
- ✅ Informasi tambahan opsional (max 60 karakter)
- ✅ Status harus 'ralan' atau 'ranap'

#### 6.2 Validasi Update Waktu Sampel:
- ✅ Permintaan harus sudah dibuat (noorder exists)
- ✅ Tidak boleh update jika hasil sudah tersedia
- ✅ Tanggal & jam sampel wajib

#### 6.3 Validasi Hapus Permintaan:
- ❌ **Tidak boleh dihapus jika:**
  - Ada item yang sudah dibayar (`stts_bayar='Sudah'`)
  - Sudah diambil sampel (`tgl_sampel` terisi) - kecuali Admin Utama
- ✅ **Boleh dihapus jika:**
  - Belum ada pembayaran
  - Belum diambil sampel

#### 6.4 Validasi Input Hasil:
- ✅ Permintaan harus sudah dibuat (noorder exists)
- ✅ Sampel harus sudah diambil (`tgl_sampel` terisi)
- ✅ Petugas harus terisi (exists di pegawai)
- ✅ Dokter penanggung jawab harus terisi (exists di dokter)
- ✅ Minimal ada 1 pemeriksaan dengan hasil terisi
- ✅ Tanggal & jam hasil wajib

---

### 7. Status Permintaan & State Management

#### 7.1 Status Permintaan:

| Status | `tgl_sampel` | `tgl_hasil` | Deskripsi | Aksi yang Bisa Dilakukan |
|--------|--------------|-------------|-----------|---------------------------|
| **Baru** | Kosong/null | Kosong/null | Permintaan baru dibuat | Update sampel, Hapus (jika belum dibayar) |
| **Sampel Diambil** | Terisi | Kosong/null | Sampel sudah diambil | Input hasil, Tidak bisa hapus |
| **Hasil Tersedia** | Terisi | Terisi | Hasil sudah diinput | Lihat detail, Cetak hasil |

#### 7.2 State Management di Frontend:

```javascript
// State untuk daftar permintaan
const [permintaanList, setPermintaanList] = useState([]);
const [filters, setFilters] = useState({
    start_date: '',
    end_date: '',
    status: '',
    dokter: '',
    search: '',
});
const [selectedPermintaan, setSelectedPermintaan] = useState(null);
const [activeTab, setActiveTab] = useState('ralan'); // 'ralan' atau 'ranap'
const [activeSubTab, setActiveSubTab] = useState('permintaan'); // 'permintaan' atau 'item'
```

---

### 8. Komponen Reusable

#### 8.1 PatientSelector Component

**File:** `resources/js/Components/Laboratorium/PatientSelector.jsx`

```jsx
// Autocomplete untuk memilih pasien berdasarkan No. Rawat
// Props: value, onChange, disabled
// Features: Search by No. Rawat, No. RM, Nama Pasien
```

#### 8.2 DoctorSelector Component

**File:** `resources/js/Components/Laboratorium/DoctorSelector.jsx`

```jsx
// Autocomplete untuk memilih dokter
// Props: value, onChange, disabled, label
// Features: Search by Kode Dokter, Nama Dokter
```

#### 8.3 TestSelector Component

**File:** `resources/js/Components/Laboratorium/TestSelector.jsx`

```jsx
// Component untuk memilih jenis pemeriksaan lab
// Props: selectedTests, onSelectionChange, category (PK/PA/MB)
// Features: Search, Multi-select dengan checkbox, Group by kategori
```

#### 8.4 TemplateDetailList Component

**File:** `resources/js/Components/Laboratorium/TemplateDetailList.jsx`

```jsx
// Component untuk menampilkan detail template dari jenis pemeriksaan yang dipilih
// Props: kdJenisPrw, selectedTemplates, onSelectionChange
// Features: Checkbox untuk setiap template, Tampilkan satuan & nilai rujukan
```

#### 8.5 ResultInputForm Component

**File:** `resources/js/Components/Laboratorium/ResultInputForm.jsx`

```jsx
// Component untuk input hasil pemeriksaan
// Props: template, value, onChange, patientGender, patientAge
// Features: Input hasil, Pilih nilai rujukan berdasarkan gender & usia, Input keterangan
```

---

### 9. Checklist Implementasi

#### Backend:
- [ ] Buat/Update Models (PermintaanLab, PermintaanPemeriksaanLab, PermintaanDetailPermintaanLab, PeriksaLab, DetailPeriksaLab)
- [ ] Buat/Update Controllers (PermintaanLabController, PeriksaLabController)
- [ ] Tambahkan Routes (web.php, api.php)
- [ ] Implementasi validasi di Form Request (opsional)
- [ ] Implementasi business logic di Controllers
- [ ] Test API endpoints dengan Postman/HTTP Client

#### Frontend:
- [ ] Buat Page: Daftar Permintaan Lab (Index.jsx)
- [ ] Buat Page: Input Permintaan Baru (Create.jsx)
- [ ] Buat Page: Input Hasil (InputHasil.jsx)
- [ ] Buat Components Reusable (PatientSelector, DoctorSelector, TestSelector, dll)
- [ ] Implementasi state management
- [ ] Implementasi form validation
- [ ] Implementasi error handling
- [ ] Implementasi loading states
- [ ] Test UI/UX flow

#### Testing:
- [ ] Unit test untuk Models
- [ ] Feature test untuk Controllers
- [ ] Integration test untuk alur lengkap
- [ ] Manual testing untuk setiap fitur

---

### 10. Catatan Penting

1. **Generate NoOrder:** Gunakan format `LAB{YYYYMMDD}{XXXX}` untuk nomor order otomatis
2. **Normalisasi Tanggal:** Handle nilai default `'0000-00-00'` dan `'00:00:00'` di frontend
3. **Transaction:** Gunakan DB transaction untuk operasi yang melibatkan multiple table
4. **Eager Loading:** Gunakan eager loading untuk menghindari N+1 query problem
5. **Permission:** Implementasi permission check untuk setiap aksi (create, update, delete)
6. **Logging:** Log semua error untuk debugging
7. **Response Format:** Konsisten dalam format response (success/error)

---

## Kesimpulan

Modul Permintaan Laboratorium terdiri dari tiga komponen utama yang bekerja secara terintegrasi:

1. **DlgPermintaanLaboratorium** - Input permintaan baru
2. **DlgCariPermintaanLab** - Pencarian, manajemen, dan bridging LIS
3. **DlgPeriksaLaboratorium** - Input hasil pemeriksaan

Alur lengkap dimulai dari pembuatan permintaan, update waktu sampel, hingga input hasil. Sistem juga mendukung integrasi dengan berbagai LIS eksternal untuk otomasi kirim permintaan dan ambil hasil.

**Rancangan implementasi di atas fokus pada alur manual tanpa bridging LIS**, yang mencakup:
- Struktur Models dengan relasi Eloquent
- Controllers dengan validasi & business logic
- Routes untuk web & API
- Frontend Pages & Components dengan React/Inertia
- Alur workflow lengkap
- Validasi & business rules
- Checklist implementasi

Dokumentasi ini dirancang untuk memudahkan pengembang memahami arsitektur, alur, dan integrasi modul Permintaan Lab. Untuk penambahan fitur atau integrasi LIS baru, gunakan pola-pola yang sudah ada sebagai referensi agar konsisten.
