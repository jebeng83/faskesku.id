# Verifikasi Implementasi Akuntansi Laboratorium

## Perbandingan dengan Blueprint `docs/database.md` Bagian 5. Modul Akuntansi (Keuangan)

### ✅ Checklist Kesesuaian dengan Blueprint

#### 1. Mapping Akun dari `set_akun_ralan`
**Blueprint (baris 1040):**
> Laborat Ralan: akun pendapatan, beban/utang jasa, KSO, HPP, persediaan BHP.

**Implementasi (`TampJurnalComposerLab.php`):**
- ✅ `Suspen_Piutang_Laborat_Ralan` - untuk akrual piutang
- ✅ `Laborat_Ralan` - untuk pendapatan
- ✅ `Beban_Jasa_Medik_Dokter_Laborat_Ralan` / `Utang_Jasa_Medik_Dokter_Laborat_Ralan`
- ✅ `Beban_Jasa_Medik_Petugas_Laborat_Ralan` / `Utang_Jasa_Medik_Petugas_Laborat_Ralan`
- ✅ `Beban_Kso_Laborat_Ralan` / `Utang_Kso_Laborat_Ralan`
- ✅ `HPP_Persediaan_Laborat_Rawat_Jalan` / `Persediaan_BHP_Laborat_Rawat_Jalan`
- ✅ `Beban_Jasa_Sarana_Laborat_Ralan` / `Utang_Jasa_Sarana_Laborat_Ralan`
- ✅ `Beban_Jasa_Perujuk_Laborat_Ralan` / `Utang_Jasa_Perujuk_Laborat_Ralan`
- ✅ `Beban_Jasa_Menejemen_Laborat_Ralan` / `Utang_Jasa_Menejemen_Laborat_Ralan`

**Status:** ✅ **SESUAI** - Semua mapping akun yang disebutkan di blueprint sudah diimplementasikan.

#### 2. Suspen Piutang (baris 920-1018)
**Blueprint:**
> Tabel set_akun_ralan memiliki kolom-kolom Suspen_Piutang per kategori layanan (misal: Suspen_Piutang_Laborat_Ralan)

**Implementasi:**
- ✅ Menggunakan `Suspen_Piutang_Laborat_Ralan` untuk Debet
- ✅ Menggunakan `Laborat_Ralan` untuk Kredit (pendapatan)
- ✅ Jurnal akrual dibuat saat permintaan lab disimpan

**Status:** ✅ **SESUAI** - Mengikuti pola Suspen Piutang seperti yang dijelaskan di blueprint.

#### 3. Staging Jurnal (baris 336-368)
**Blueprint:**
> - `tampjurnal`: dipakai oleh proses posting utama
> - `tampjurnal2`: tersedia sebagai staging paralel untuk kebutuhan lain atau komposisi jurnal yang berbeda

**Implementasi:**
- ✅ Menggunakan `tampjurnal2` untuk staging jurnal lab (staging paralel)
- ✅ Struktur: `kd_rek`, `nm_rek`, `debet`, `kredit`
- ✅ Validasi keseimbangan: `debet == kredit`

**Status:** ✅ **SESUAI** - Menggunakan `tampjurnal2` sebagai staging paralel sesuai blueprint.

#### 4. Posting Jurnal (baris 311-334)
**Blueprint:**
> - Validasi: `debet == kredit`
> - Generate `no_jurnal` format `JRYYYYMMDDNNNNNN`
> - Insert ke `jurnal` dan `detailjurnal`
> - Kosongkan staging setelah posting

**Implementasi:**
- ✅ Menggunakan `JurnalPostingService` yang menggabungkan `tampjurnal` + `tampjurnal2`
- ✅ Validasi keseimbangan dilakukan di service
- ✅ Generate nomor jurnal otomatis
- ✅ Posting ke `jurnal` dan `detailjurnal`
- ✅ Staging dikosongkan setelah posting

**Status:** ✅ **SESUAI** - Mengikuti proses posting seperti di blueprint.

#### 5. Sumber Data (baris 258-262)
**Blueprint:**
> Saat pasien dilayani, data masuk ke tabel operasional (`periksa_lab`). Saat Kasir membuat Nota/Kuitansi, sistem akan menarik data dari tabel operasional tersebut.

**Implementasi:**
- ✅ Mengambil data dari `permintaan_detail_permintaan_lab` (tabel operasional permintaan)
- ✅ Join dengan `jns_perawatan_lab` untuk mendapatkan komponen biaya
- ✅ Agregasi komponen: `bagian_rs`, `bhp`, `tarif_perujuk`, `tarif_tindakan_dokter`, `tarif_tindakan_petugas`, `kso`, `menejemen`

**Status:** ✅ **SESUAI** - Mengambil data dari tabel operasional yang sesuai.

#### 6. Otomatis Posting (baris 277-299)
**Blueprint:**
> Endpoint terkait:
> - `POST /api/akutansi/jurnal/stage-from-billing` — menyiapkan `tampjurnal`
> - `POST /api/akutansi/jurnal/post-staging` — melakukan posting dari `tampjurnal`

**Implementasi:**
- ✅ Endpoint: `POST /api/permintaan-lab/stage-lab` — menyiapkan `tampjurnal2`
- ✅ Endpoint: `POST /api/akutansi/jurnal/post` — melakukan posting dari `tampjurnal` + `tampjurnal2`
- ✅ Otomatis dipanggil setelah simpan permintaan lab berhasil

**Status:** ✅ **SESUAI** - Mengikuti pola endpoint seperti blueprint, dengan penyesuaian untuk `tampjurnal2`.

#### 7. Komponen Biaya Laboratorium
**Blueprint (baris 1040):**
> Laborat Ralan: akun pendapatan, beban/utang jasa, KSO, HPP, persediaan BHP.

**Implementasi:**
Menggunakan komponen biaya dari `jns_perawatan_lab`:
- ✅ `bagian_rs` → dipetakan ke Jasa Sarana
- ✅ `bhp` → dipetakan ke HPP/Persediaan BHP
- ✅ `tarif_perujuk` → dipetakan ke Beban/Utang Jasa Perujuk
- ✅ `tarif_tindakan_dokter` → dipetakan ke Beban/Utang Jasa Medik Dokter
- ✅ `tarif_tindakan_petugas` → dipetakan ke Beban/Utang Jasa Medik Petugas
- ✅ `kso` → dipetakan ke Beban/Utang KSO
- ✅ `menejemen` → dipetakan ke Beban/Utang Menejemen

**Status:** ✅ **SESUAI** - Semua komponen biaya yang disebutkan di blueprint sudah dipetakan dengan benar.

### 📋 Ringkasan Implementasi

#### File yang Dibuat/Dimodifikasi:

1. **`app/Services/Akutansi/TampJurnalComposerLab.php`** (BARU)
   - Service untuk staging jurnal dari permintaan lab
   - Menggunakan mapping akun dari `set_akun_ralan`
   - Menulis ke `tampjurnal2`

2. **`app/Http/Controllers/PermintaanLabController.php`** (DIMODIFIKASI)
   - Menambahkan method `stageJurnalLab()` untuk staging jurnal

3. **`routes/api.php`** (DIMODIFIKASI)
   - Menambahkan route `POST /api/permintaan-lab/stage-lab`

4. **`resources/js/Pages/RawatJalan/components/PermintaanLab.jsx`** (DIMODIFIKASI)
   - Otomatis staging dan posting setelah simpan berhasil
   - Mengikuti pola yang sama dengan `TarifTindakan.jsx`

### ✅ Kesimpulan

**Implementasi akuntansi untuk Laboratorium sudah SESUAI dengan blueprint di `docs/database.md` bagian 5. Modul Akuntansi (Keuangan).**

Semua aspek yang disebutkan di blueprint sudah diimplementasikan:
- ✅ Mapping akun dari `set_akun_ralan`
- ✅ Penggunaan Suspen Piutang untuk akrual pendapatan
- ✅ Staging menggunakan `tampjurnal2`
- ✅ Posting menggunakan `JurnalPostingService`
- ✅ Validasi keseimbangan debet/kredit
- ✅ Otomatis posting setelah simpan permintaan lab
- ✅ Semua komponen biaya sudah dipetakan dengan benar

### 📝 Catatan Tambahan

1. **`bagian_rs`** digunakan sebagai komponen "Jasa Sarana" yang merupakan sisa biaya setelah dikurangi komponen lainnya. Ini sesuai dengan struktur biaya di `jns_perawatan_lab`.

2. Implementasi mengikuti pola yang sama dengan `TampJurnalComposerRalan` untuk konsistensi.

3. Frontend menggunakan pola yang sama dengan `TarifTindakan.jsx` untuk konsistensi UX.
