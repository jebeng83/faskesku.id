# Dokumentasi Database Faskesku ID (Live Schema)

Dokumen ini menjelaskan struktur database **Live (MySQL)** dari aplikasi Faskesku ID.
Database ini berbasis **SIMRS Khanza** dengan total **1.114 tabel**. Dokumen ini menyajikan **Entity Relationship Diagram (ERD)** per modul untuk memudahkan pemahaman.

## 1. Modul Pendaftaran & Pelayanan (Core)

Modul ini menangani alur utama pasien mulai dari registrasi hingga masuk ke poli.

```mermaid
erDiagram
    pasien {
        varchar(15) no_rkm_medis PK
        varchar(40) nm_pasien
        varchar(20) no_ktp
        enum jk "L/P"
        date tgl_lahir
        varchar(200) alamat
    }
    reg_periksa {
        varchar(17) no_rawat PK "YYYY/MM/DD/XXXXXX"
        varchar(15) no_rkm_medis FK
        varchar(20) kd_dokter FK
        char(5) kd_poli FK
        char(3) kd_pj FK
        date tgl_registrasi
        enum stts "Belum/Sudah/Dirawat/Pulang"
        enum status_lanjut "Ralan/Ranap"
    }
    dokter {
        varchar(20) kd_dokter PK
        varchar(50) nm_dokter
        varchar(5) kd_sps
    }
    poliklinik {
        char(5) kd_poli PK
        varchar(50) nm_poli
    }
    penjab {
        char(3) kd_pj PK
        varchar(50) png_jawab "Nama Asuransi"
    }

    pasien ||--o{ reg_periksa : "Mendaftar"
    dokter ||--o{ reg_periksa : "DPJP"
    poliklinik ||--o{ reg_periksa : "Tujuan"
    penjab ||--o{ reg_periksa : "Penjamin"
```

---

## 2. Modul Rawat Inap

Menangani manajemen bangsal, kamar, dan perawatan inap pasien.

```mermaid
erDiagram
    reg_periksa {
        varchar(17) no_rawat PK
    }
    kamar_inap {
        varchar(17) no_rawat PK,FK
        varchar(15) kd_kamar FK
        date tgl_masuk
        time jam_masuk
        date tgl_keluar
        enum stts_pulang
    }
    kamar {
        varchar(15) kd_kamar PK
        char(5) kd_bangsal FK
        double trf_kamar
        enum status "ISI/KOSONG"
        enum kelas "Kelas 1/2/3/VIP"
    }
    bangsal {
        char(5) kd_bangsal PK
        varchar(30) nm_bangsal
    }

    reg_periksa ||--o{ kamar_inap : "Masuk Ranap"
    kamar ||--o{ kamar_inap : "Ditempati"
    bangsal ||--o{ kamar : "Memiliki"
```

---

## 3. Modul Farmasi (Resep & Obat)

Menangani peresepan obat dari dokter ke pasien.

```mermaid
erDiagram
    reg_periksa {
        varchar(17) no_rawat PK
    }
    resep_obat {
        varchar(14) no_resep PK
        varchar(17) no_rawat FK
        varchar(20) kd_dokter FK
        date tgl_peresepan
        enum status "Ralan/Ranap"
    }
    resep_dokter {
        varchar(14) no_resep PK,FK
        varchar(15) kode_brng PK,FK
        double jml
        varchar(20) aturan_pakai
    }
    databarang {
        varchar(15) kode_brng PK
        varchar(80) nama_brng
        double h_beli
        double ralan "Harga Jual"
        double stok
    }

    reg_periksa ||--o{ resep_obat : "Mendapat"
    resep_obat ||--|{ resep_dokter : "Detail Item"
    databarang ||--o{ resep_dokter : "Stok Obat"
```

---

## 4. Modul Laboratorium

Menangani permintaan dan hasil pemeriksaan lab.

```mermaid
erDiagram
    reg_periksa {
        varchar(17) no_rawat PK
    }
    periksa_lab {
        varchar(17) no_rawat PK,FK
        varchar(15) kd_jenis_prw PK,FK
        date tgl_periksa PK
        time jam PK
        varchar(20) nip "Petugas Lab"
        varchar(20) dokter_perujuk
    }
    detail_periksa_lab {
        varchar(17) no_rawat PK,FK
        varchar(15) kd_jenis_prw PK,FK
        date tgl_periksa PK
        time jam PK
        int id_template PK
        varchar(200) nilai "Hasil"
        varchar(30) nilai_rujukan
        varchar(60) keterangan "Normal/High/Low"
    }
    jns_perawatan_lab {
        varchar(15) kd_jenis_prw PK
        varchar(80) nm_perawatan
        double total_byr
    }

    reg_periksa ||--o{ periksa_lab : "Order Lab"
    jns_perawatan_lab ||--o{ periksa_lab : "Jenis Pemeriksaan"
    periksa_lab ||--|{ detail_periksa_lab : "Detail Hasil"
```

---

## 5. Modul Akuntansi (Keuangan)

Menangani pencatatan jurnal keuangan, billing pasien, dan buku besar.

```mermaid
erDiagram
    jurnal {
        varchar(20) no_jurnal PK
        varchar(30) no_bukti
        date tgl_jurnal
        time jam_jurnal
        enum jenis "U/P"
        varchar(350) keterangan
    }
    detailjurnal {
        varchar(20) no_jurnal FK
        varchar(15) kd_rek FK
        double debet
        double kredit
    }
    rekening {
        varchar(15) kd_rek PK "Chart of Account"
        varchar(100) nm_rek
        enum tipe "N/M/R"
        enum balance "D/K"
    }
    billing {
        int noindex PK
        varchar(17) no_rawat FK
        date tgl_byr
        varchar(200) nm_perawatan
        char(1) pemisah "Kategori Item"
        double biaya
    }
    nota_jalan {
        varchar(17) no_rawat PK
        varchar(17) no_nota
    }
    reg_periksa {
        varchar(17) no_rawat PK
    }

    jurnal ||--|{ detailjurnal : "Memiliki Detail"
    rekening ||--o{ detailjurnal : "Digunakan di"
    reg_periksa ||--o{ billing : "Tagihan Pasien"
    reg_periksa ||--o{ nota_jalan : "Nota Pembayaran"
```

### Analisis Tabel `billing`
Tabel `billing` adalah tabel **Agregasi / Snapshot** yang berfungsi sebagai rincian final tagihan pasien saat pembayaran dilakukan.

*   **Fungsi Utama:** Menyimpan snapshot harga dan item pelayanan (Tindakan, Obat, Kamar, Admin) pada saat transaksi ditutup/dibayar. Ini mencegah perubahan nominal tagihan di masa depan jika master harga berubah.
*   **Cara Kerja:**
    1.  Saat pasien dilayani, data masuk ke tabel operasional (`resep_dokter`, `rawat_jl_dr`, `periksa_lab`).
    2.  Saat Kasir membuat **Nota/Kuitansi**, sistem akan menarik data dari tabel operasional tersebut.
    3.  Sistem menghitung total dan menyimpan rinciannya ke tabel `billing` baris per baris.
    4.  Tabel ini kemudian menjadi sumber data untuk cetak kuitansi dan laporan pendapatan harian.
*   **Kolom Penting:**
    *   `no_rawat`: Kunci tamu ke registrasi pasien.
    *   `nm_perawatan`: Nama item (misal: "Paracetamol 500mg", "Jasa Dokter Umum").
    *   `biaya`: Nominal rupiah yang ditagihkan.
    *   `pemisah`: Kode kategori item (misal: `Obat`, `Tindakan`, `Registrasi`, `Kamar`). Kolom ini vital untuk pengelompokan di laporan keuangan.

---

## 6. Alur Billing End-to-End (Tagihan & Pembayaran)

Diagram ini menggambarkan bagaimana data dari berbagai unit layanan (Poli, Lab, Farmasi) bermuara menjadi tagihan dan pembayaran.

```mermaid
erDiagram
    %% INPUT MEDIS & LAYANAN
    rawat_jl_dr {
        varchar(17) no_rawat FK
        varchar(15) kd_jenis_prw FK
        double tarif_tindakandr
    }
    resep_dokter {
        varchar(14) no_resep FK
        varchar(15) kode_brng FK
        double jml
    }
    periksa_lab {
        varchar(17) no_rawat FK
        double total_byr
    }
    periksa_radiologi {
        varchar(17) no_rawat FK
        double total_byr
    }
    kamar_inap {
        varchar(17) no_rawat FK
        double trf_kamar
        double lama
    }

    %% PROSES BILLING
    reg_periksa {
        varchar(17) no_rawat PK
    }
    billing {
        int noindex PK
        varchar(17) no_rawat FK
        varchar(200) nm_perawatan
        double biaya
        char(1) pemisah
    }
    nota_jalan {
        varchar(17) no_nota PK
        varchar(17) no_rawat FK
    }

    %% PEMBAYARAN & TAGIHAN KHUSUS
    tagihan_sadewa {
        varchar(17) no_nota PK
        varchar(15) no_rkm_medis
        double jumlah_tagihan
        double jumlah_bayar
        enum status "Sudah/Belum"
    }
    bayar_piutang {
        varchar(17) no_rkm_medis FK
        double besar_cicilan
    }

    %% RELASI INPUT KE REGISTRASI
    reg_periksa ||--o{ rawat_jl_dr : "Tindakan Dokter"
    reg_periksa ||--o{ resep_dokter : "Obat Farmasi"
    reg_periksa ||--o{ periksa_lab : "Pemeriksaan Lab"
    reg_periksa ||--o{ periksa_radiologi : "Pemeriksaan Radiologi"
    reg_periksa ||--o{ kamar_inap : "Akomodasi Kamar"

    %% RELASI KE BILLING (AGREGASI)
    reg_periksa ||--o{ billing : "Rincian Tagihan (Snapshot)"
    reg_periksa ||--o{ nota_jalan : "Nota Final"
    
    %% RELASI KE PEMBAYARAN
    nota_jalan ||--|| tagihan_sadewa : "Integrasi Payment"
    reg_periksa ||--o{ bayar_piutang : "Cicilan Piutang"
```

### Penjelasan Alur
1.  **Input Layanan:** Dokter/Perawat menginput tindakan di `rawat_jl_dr` (Ralan) atau `rawat_inap_dr` (Ranap). Farmasi menginput `resep_dokter`. Lab & Radiologi menginput hasil periksa.
2.  **Kalkulasi Billing:** Saat pasien hendak pulang, sistem kasir menarik semua data layanan tersebut.
3.  **Snapshot Billing:** Rincian biaya disimpan ke tabel `billing` agar statis (tidak berubah meski tarif master naik).
4.  **Penerbitan Nota:** Dibuat record di `nota_jalan` (atau `nota_inap`) sebagai bukti transaksi sah.
5.  **Integrasi Pembayaran:** Data nota masuk ke `tagihan_sadewa` untuk pencatatan status pembayaran (Lunas/Belum) dan integrasi dengan gateway pembayaran jika ada.

---

## 7. Modul Kepegawaian (HRD)

Menangani data pegawai, jadwal shift, dan absensi.

```mermaid
erDiagram
    pegawai {
        int id PK
        varchar(20) nik UNI
        varchar(50) nama
        varchar(25) jbtn
        char(4) departemen FK
        varchar(15) bidang FK
        double gapok "Gaji Pokok"
    }
    departemen {
        char(4) dep_id PK
        varchar(25) nama
    }
    bidang {
        varchar(15) nama PK
    }
    jadwal_pegawai {
        int id PK,FK
        year tahun PK
        enum bulan PK
        enum h1 "Shift Tgl 1"
        enum h2 "Shift Tgl 2"
        enum h30 "Shift Tgl 30"
    }
    presensi {
        int id PK,FK
        date tgl PK
        enum jns "HR/HB"
        int lembur
    }

    pegawai ||--o{ jadwal_pegawai : "Punya Jadwal"
    pegawai ||--o{ presensi : "Melakukan Absensi"
    departemen ||--o{ pegawai : "Memiliki Staff"
    bidang ||--o{ pegawai : "Bagian Dari"
    }
```

---

## 8. Ringkasan Tabel Lainnya

Karena jumlah tabel sangat banyak (1.114), berikut adalah prefix tabel untuk modul lainnya:

| Prefix | Modul | Fungsi Utama |
| :--- | :--- | :--- |
| `ak_`, `akun_` | **Akuntansi** | Jurnal, Buku Besar, Neraca |
| `antri` | **Antrean** | Manajemen antrean loket, poli, farmasi |
| `bridging` | **BPJS VClaim** | SEP, Rujukan, Klaim |
| `pcare` | **BPJS PCare** | Pendaftaran & Kunjungan FKTP |
| `utd` | **Bank Darah** | Stok darah, Donor, Crossmatch |
| `zis` | **Zakat & Sosial** | Penerima bantuan, Donatur |
| `satu_sehat` | **Integrasi Kemenkes** | Mapping ID SATUSEHAT |

## Catatan Teknis
*   **Database Engine:** MySQL (InnoDB & MyISAM).
*   **Primary Keys:** Mayoritas menggunakan `varchar` manual (bukan auto-increment).
*   **Foreign Keys:** Relasi antar tabel dijaga secara logik aplikasi (Logical Relationship), tidak selalu ada constraint fisik di database (terutama pada tabel MyISAM lama).
