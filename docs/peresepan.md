# Analisis Implementasi Peresepan Dokter

Dokumen ini merangkum logika bisnis dan teknis dari modul peresepan dokter berdasarkan analisis file `DlgPeresepanDokter.java` untuk diimplementasikan ke dalam aplikasi Faskesku.id.

## 1. Alur Utama (Workflow)

Peresepan dibagi menjadi dua kategori utama:
1.  **Resep Obat (Regular)**: Obat jadi yang diresepkan langsung dengan jumlah unit tertentu.
2.  **Resep Racikan**: Campuran dari beberapa obat yang dikelompokkan dalam satu nama racikan (misal: "Puyer Batuk", "Salep Campur").

### Urutan Transaksi:
1.  Sistem mendeteksi `no_rawat` pasien yang sedang dilayani.
2.  Sistem mendeteksi `kd_dokter` peresep.
3.  Generate `no_resep` otomatis dengan format: `YYYYMMDDXXXX` (TahunBulanTanggal + 4 digit nomor urut harian).
4.  Input obat (Regular atau Racikan).
5.  Simpan ke database dalam satu transaksi database (Atomic).

---

## 2. Struktur Database

### A. Header Resep (`resep_obat`)
Menyimpan informasi utama lembar resep.
| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| `no_resep` | varchar(14) | Primary Key (YYYYMMDDXXXX) |
| `no_rawat` | varchar(17) | Link ke transaksi pelayanan pasien |
| `kd_dokter` | varchar(20) | Kode dokter peresep |
| `tgl_peresepan` | date | Tanggal input |
| `jam_peresepan` | time | Jam input |
| `status` | enum | 'ralan' (Rawat Jalan) atau 'ranap' (Rawat Inap) |

### B. Detail Resep Regular (`resep_dokter`)
| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| `no_resep` | varchar(14) | Link ke Header |
| `kode_brng` | varchar(15) | Kode obat |
| `jml` | double | Jumlah unit obat yang diberikan |
| `aturan_pakai` | varchar(150) | Frekuensi & cara pakai (mis: 3x1 tablet) |

### C. Detail Resep Racikan - Header (`resep_dokter_racikan`)
Menyimpan kelompok racikan.
| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| `no_resep` | varchar(14) | Link ke Header |
| `no_racik` | varchar(2) | Nomor urut racikan (1, 2, dst) |
| `nama_racik` | varchar(100) | Nama kelompok (mis: Puyer Demam) |
| `kd_racik` | varchar(3) | Kode metode racik (Link ke `metode_racik`) |
| `jml_dr` | int | **Total dosis/bungkus** yang dibuat (mis: 10 puyer) |
| `aturan_pakai` | varchar(150) | Cara pakai kelompok racikan ini |
| `keterangan` | varchar(50) | Keterangan tambahan |

### D. Detail Resep Racikan - Isi (`resep_dokter_racikan_detail`)
Menyimpan komponen penyusun setiap racikan.
| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| `no_resep` | varchar(14) | Link ke Header |
| `no_racik` | varchar(2) | Link ke Header Racikan |
| `kode_brng` | varchar(15) | Kode bahan obat |
| `p1`, `p2` | double | Komponen dosis (misal: 1/2 tablet -> p1=1, p2=2) |
| `kandungan` | varchar(10) | Kekuatan dosis mg (jika manual) |
| `jml` | double | **Total unit bahan** yang dibutuhkan |

---

## 3. Logika Penghitungan (Calculation)

### A. Racikan Berdasarkan Dosis (P1/P2)
Jika dokter menentukan bahwa setiap dosis racikan berisi bagian tertentu dari obat:
- **Kandungan (mg)** = `Kapasitas_Obat` * (`P1` / `P2`)
- **Total JML (Unit Bahan)** = `Jml_Dr_Racikan` * (`P1` / `P2`)

*Contoh*: 
Membuat 10 puyer (`Jml_Dr` = 10). 
Setiap puyer berisi 1/2 tablet Paracetamol (`P1` = 1, `P2` = 2).
Maka total kebutuhan Paracetamol = 10 * (1/2) = **5 tablet**.

### B. Racikan Berdasarkan Kandungan (mg)
Jika dokter menentukan kekuatan mg per dosis:
- **Total JML (Unit Bahan)** = (`Jml_Dr_Racikan` * `Kandungan_Target`) / `Kapasitas_Obat`

*Contoh*: 
Membuat 10 puyer. 
Setiap puyer berisi 250mg Paracetamol. 
Kapasitas obat (sediaan) Paracetamol adalah 500mg/tablet.
Maka total kebutuhan Paracetamol = (10 * 250) / 500 = **5 tablet**.

---

## 4. Penentuan Harga (Pricing)
Harga obat yang ditampilkan kepada dokter saat melakukan pencarian disesuaikan dengan **Kelas/Tarif** pasien:
- Pilihan: Rawat Jalan, Beli Luar, Karyawan, Utama/BPJS, Kelas 1, Kelas 2, Kelas 3, VIP, VVIP.
- Sistem akan mengambil kolom harga yang sesuai dari tabel `databarang` (misal: `h_jual`, `harga_beli`, `kelas1`, `kelas2`, `vip`, dsb).

## 5. Validasi Stok
Sistem harus memeriksa ketersediaan stok di unit/bangsal yang telah ditetapkan (lihat modul `Set Lokasi`).
- `gudangbarang.stok` harus >= `jml` yang diresepkan.
- Jika stok kosong, sistem memberikan peringatan (tergantung setting `STOKKOSONGRESEP`).

---

## 5. Rencana Implementasi Frontend (React/Inertia)

### Komponen UI
1.  **Form Header**: Menampilkan Data Pasien, Dokter, dan No Resep.
2.  **Tab Obat Regular**: Table dengan fitur search obat (autocomplete), input jumlah, dan aturan pakai.
3.  **Tab Obat Racikan**: 
    - Master table untuk list Kelompok Racikan.
    - Detail table yang tampil saat salah satu Kelompok Racikan dipilih.
    - Input `P1`, `P2`, atau `Kandungan` akan memicu update `JML` secara real-time.

### State Management
Gunakan `useForm` dari Inertia untuk mengelola seluruh data resep dalam satu object besar:
```javascript
const { data, setData, post } = useForm({
    no_rawat: '',
    kd_dokter: '',
    tgl_peresepan: '',
    obat_regular: [
        { kode_brng: '', jml: 0, aturan_pakai: '' }
    ],
    obat_racikan: [
        {
            no_racik: 1,
            nama_racik: '',
            kd_racik: '',
            jml_dr: 0,
            items: [
                { kode_brng: '', p1: 1, p2: 1, kandungan: 0, jml: 0 }
            ]
        }
    ]
});
```

### Keamanan
Pastikan validasi di sisi Laravel juga memeriksa kembali hubungan `no_rawat` dengan pasien agar tidak terjadi salah input resep ke pasien lain.

---

---

## 6. Grand Desain Template Racikan (Menggunakan Tabel Eksisting)

Fitur ini menggunakan tabel bawaan sistem yang sudah tersedia untuk menyimpan template peresepan dokter.

### A. Struktur Database Eksisting

#### 1. Tabel Master Template (`template_pemeriksaan_dokter`)
Digunakan untuk mengelompokkan template (biasanya per dokter).
| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| `no_template` | varchar(20) | Primary Key (ID Template) |
| `kd_dokter` | varchar(20) | Kode Dokter pemilik template |
| `rencana` | varchar(2000) | Bisa digunakan untuk Nama Group Template |

#### 2. Tabel Header Template Racikan (`template_pemeriksaan_dokter_resep_racikan`)
| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| `no_template` | varchar(20) | FK ke `template_pemeriksaan_dokter` |
| `no_racik` | varchar(2) | Nomor urut racikan dalam satu template |
| `nama_racik` | varchar(100) | **Nama Template Racikan** (mis: Puyer Flu) |
| `kd_racik` | varchar(3) | Kode metode racik (Puyer, Salep, dsb) |
| `jml_dr` | int | Default jumlah dosis |
| `aturan_pakai` | varchar(150) | Default aturan pakai |

#### 3. Tabel Detail Template Racikan (`template_pemeriksaan_dokter_resep_racikan_detail`)
| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| `no_template` | varchar(20) | FK ke Header |
| `no_racik` | varchar(2) | FK ke Header Racikan |
| `kode_brng` | varchar(15) | Kode obat bahan |
| `p1`, `p2` | double | Komposisi dosis (Pembilang/Penyebut) |
| `kandungan` | varchar(10) | Kekuatan dosis dlm mg |
| `jml` | double | Default total unit bahan |

---

### B. Komponen Backend

#### 1. Model
- `App\Models\Farmasi\TemplateRacikan`: Mengarah ke `template_pemeriksaan_dokter_resep_racikan`.
- `App\Models\Farmasi\TemplateRacikanDetail`: Mengarah ke `template_pemeriksaan_dokter_resep_racikan_detail`.

#### 2. Controller (`TemplateRacikanController`)
- `index()`: Mengambil list template berdasarkan `kd_dokter`.
- `show($id)`: Mengambil detail bahan racikan. **Logika Penting**: Saat memuat detail, sistem harus melakukan JOIN ke `gudangbarang` untuk mendapatkan `stok` terbaru di unit/poli terkait.
- `store()`: Menyimpan racikan yang sedang dibuat menjadi template baru.

> **Catatan Implementasi**: Karena fitur ini menggunakan session (web-auth) dari Inertia.js, route didaftarkan di `routes/web.php` dengan prefix `/api` agar tetap sinkron dengan pemanggilan frontend namun aman dari isu session mismatch di `api.php`.

---

### C. Logika UI & Flow (View)

#### 1. Integrasi di `NewResep.jsx`
- Menambahkan tombol "Cari Template" yang membuka modal daftar template.
- Menambahkan tombol "Simpan ke Template" pada card racikan yang sedang diisi.

#### 2. Flow Konfirmasi Stok:
1.  User memilih "Puyer Batuk" dari daftar template.
2.  Frontend memanggil API Detail.
3.  Backend merespon dengan data bahan + stok real-time.
4.  **Jika ada bahan yang stoknya 0 atau kurang**:
    - Tampilkan Alert (misal: "Obat [Nama Obat] stok habis di Bangsal/Poli ini!").
    - User tetap bisa memuat template, tapi baris obat yang kosong akan ditandai.

#### 3. Keamanan
- Hak akses CRUD template mengikuti permission peresepan dokter.
- Filter `kd_dokter` agar dokter hanya melihat template miliknya sendiri (atau template public jika diizinkan).
