# Ringkasan Modul IGD (DlgIGD.java)

- Lokasi sumber: [DlgIGD.java](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java)
- Deskripsi singkat: dialog Swing untuk manajemen IGD (Instalasi Gawat Darurat) mencakup registrasi, penelusuran data, integrasi BPJS/rujukan, akses rekam medis, permintaan layanan penunjang, keuangan, dan pencetakan.

## Tanggung Jawab Utama
- Registrasi pasien IGD, termasuk dokter dituju, penanggung jawab, jenis bayar, status daftar, dan biaya registrasi.
- Penelusuran dan filter data kunjungan IGD berdasarkan periode tanggal dan kata kunci.
- Integrasi ke puluhan form rekam medis (penilaian awal, monitor, skrining, edukasi, operasi, persalinan, hemodialisa, dsb.).
- Bridging eksternal: BPJS (SEP, PRB, SPRI, Surat Kontrol), ICare, INACBG, Inhealth, PCare, Sisrute.
- Permintaan layanan penunjang: laboratorium, radiologi, ranap, informasi obat/farmasi.
- Fitur keuangan: billing rawat jalan/parsial, lihat piutang; validasi closing tagihan sebelumnya.
- Pencetakan tracer/berkas dengan kendali printer ESC/P (font, bold, condensed, spacing, feed, margin).

## Struktur Data & Tabel
- Tabel utama di UI: 21 kolom menampilkan status kunjungan IGD.
- Query utama memuat data dari reg_periksa, dokter, pasien, poliklinik, penjab, dibatasi poliklinik IGDK dan rentang tanggal.
- Lihat implementasi muat data di method [tampil](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12593-L12674).

## Alur Kerja Kunci
- Inisialisasi: initComponents → initIGD → setup tabel/kolom, input bounds, listener pencarian, timer jam.
- Penentuan jam registrasi menggunakan [jam](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12716-L12768) dengan Timer interval 1 detik.
- Pemilihan pasien via DlgPasien, lalu validasi catatan/tagihan dan set field pasien dengan [isPas](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12770-L12802) dan [isCekPasien](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12804-L12857).
- Toggle form input (expand/collapse) dengan [isForm](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12868-L12879).
- Aksi simpan registrasi melalui handler [BtnSimpanActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L5131-L5240) dan refresh data dengan [tampil](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12593-L12674).

## Validasi & Aturan
- Saat validasiregistrasi aktif: pasien dengan status bayar “Belum Bayar” pada kunjungan sebelumnya diblokir registrasi (minta closing ke kasir).
- Saat validasicatatan aktif: jika ada catatan pasien, dialog catatan ditampilkan sebelum melanjutkan.
- Batasan input diterapkan via fungsi batasInput (panjang karakter tiap field).

## Integrasi & Menu Terkait
- Rekam medis: puluhan komponen RM* (penilaian awal IGD, triase IGD, checklist anestesi, skrining, monitoring, edukasi, operasi, dll.).
- Bridging: BPJS (SEP/PRB/SPRI/Surat Kontrol), ICare, INACBG, Inhealth, PCare, Sisrute.
- Penunjang: DlgPermintaanLaboratorium, DlgPermintaanRadiologi, DlgPermintaanRanap, DlgPermintaanPelayananInformasiObat.
- Keuangan: DlgBilingRalan, DlgBilingParsialRalan, DlgLhtPiutang.

## Pencetakan
- Kendali printer dot-matrix menggunakan ESC/P: pengaturan bold, italic, condensed, ukuran font (5–12 CPI), tinggi font, line spacing, form feed, margin unit.
- Variabel kontrol printing: BOLD_ON/OFF, CONDENSED_ON/OFF, SIZE_*_CPI, SPACING_* dll.

## Catatan Implementasi
- Koneksi DB melalui koneksiDB.condb(), utilitas query via sekuel, validasi via validasi.
- Render tabel menggunakan WarnaTable untuk warna baris/sel.
- Pengambilan data pasien (alamat lengkap, penjamin, umur dalam Th/Bl/Hr) mencakup join kelurahan/kecamatan/kabupaten.
- Rute poliklinik IGD di-hardcode sebagai ‘IGDK’ dalam filter query.

## Popup Masuk Rawat Inap (Rujukan Masuk)

### Deskripsi
Popup masuk rawat inap digunakan untuk mengelola data rujukan masuk pasien yang akan masuk ke rawat inap. Fitur ini memungkinkan pengguna untuk mencatat informasi asal rujukan pasien dan menyimpan data ke tabel `rujuk_masuk`.

### Cara Akses
1. **Via Menu Popup**: Klik kanan pada baris pasien di tabel → Menu "Rujukan" → "Rujukan Masuk" (`MnRujukMasuk`)
2. **Via Keyboard Shortcut**: Pilih kolom ke-5 di tabel → Tekan tombol **SPACE** (jika akses `getrujukan_masuk()` aktif)
3. **Via Field Input**: Saat registrasi, field `AsalRujukan` dapat dipanggil untuk membuka dialog pemilihan perujuk

### Implementasi

#### Method Handler: `MnRujukMasukActionPerformed`
- **Lokasi**: [baris 6826-6842](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L6826-L6842)
- **Validasi**: 
  - Memastikan pasien sudah dipilih dari tabel (`TPasien.getText()` tidak kosong)
  - Jika pasien belum dipilih, menampilkan pesan error dan fokus ke tabel
- **Proses**:
  1. Set cursor ke `WAIT_CURSOR` untuk indikasi loading
  2. Instansiasi dialog `DlgRujukMasuk` dengan modal `false`
  3. Set ukuran dialog sesuai dengan ukuran internal frame
  4. Posisikan dialog di tengah internal frame (`setLocationRelativeTo`)
  5. Reset field dialog dengan `emptTeks()`
  6. Cek akses dengan `isCek()`
  7. Set nomor rawat dan rentang tanggal dengan `setNoRm(TNoRw.getText(), DTPCari1.getDate(), DTPCari2.getDate())`
  8. Tampilkan data dengan `tampil3()`
  9. Tampilkan dialog dengan `setVisible(true)`
  10. Reset cursor ke default

#### Field Input: `AsalRujukan`
- **Tipe**: `widget.TextBox`
- **Batasan Input**: Maksimal 60 karakter (via `batasInput`)
- **Lokasi di Form**: Koordinat (520, 132) dengan ukuran 331x23
- **Fungsi**: 
  - Menyimpan nama asal rujukan/faskes perujuk
  - Dapat dibuka via key press untuk memilih dari daftar perujuk

#### Dialog Pemilihan Perujuk
- **Method**: `BtnPerujukActionPerformed` (sekitar baris 7100)
- **Proses**:
  1. Set form identifier ke "DlgReg"
  2. Instansiasi `DlgRujukMasuk` untuk pemilihan perujuk
  3. Setup `WindowListener` untuk menangkap hasil pemilihan:
     - Saat window ditutup, ambil nilai dari tabel perujuk yang dipilih
     - Set `AsalRujukan.setText()` dengan nama perujuk (kolom 0)
     - Set `alamatperujuk` dengan alamat perujuk (kolom 1)
  4. Tampilkan data perujuk dengan `tampil4()`
  5. Fokus ke field pencarian perujuk

### Penyimpanan Data Rujuk Masuk

#### Saat Simpan Registrasi
- **Lokasi**: [baris 5210-5219](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L5210-L5219)
- **Kondisi**: Data rujuk masuk hanya disimpan jika field `AsalRujukan` tidak kosong
- **Proses**:
  1. Generate nomor balasan otomatis dengan format: `BR/YYYY/MM/DD/XXXX`
     - Query mengambil nomor maksimal dari `rujuk_masuk` untuk tanggal registrasi yang sama
     - Format: `BR/` + tanggal + `/` + 4 digit nomor urut
  2. Cek apakah ada nomor Sisrute (`nosisrute`):
     - **Jika kosong**: Simpan dengan format `'-'` untuk nomor Sisrute
     - **Jika ada**: Simpan dengan nomor Sisrute yang ada, lalu reset variabel `nosisrute` ke string kosong
  3. Simpan ke tabel `rujuk_masuk` dengan kolom:
     - `no_rawat`: Nomor rawat pasien (`TNoRw.getText()`)
     - `perujuk`: Nama asal rujukan (`AsalRujukan.getText()`)
     - `alamat_perujuk`: Alamat perujuk (`alamatperujuk`)
     - `no_sisrute`: Nomor Sisrute (jika ada) atau `'-'`
     - `kd_perujuk`: Default `'0'`
     - `kd_poli_perujuk`: Nama asal rujukan (sama dengan perujuk)
     - Kolom lainnya: `'-'` (default)
     - `no_balasan`: Nomor balasan yang di-generate

#### Struktur Tabel `rujuk_masuk`
Berdasarkan query insert, tabel memiliki kolom:
- `no_rawat` (VARCHAR) - Primary key, nomor rawat pasien
- `perujuk` (VARCHAR) - Nama faskes/perujuk
- `alamat_perujuk` (VARCHAR) - Alamat lengkap perujuk
- `no_sisrute` (VARCHAR) - Nomor Sisrute (jika ada)
- `kd_perujuk` (VARCHAR) - Kode perujuk (default '0')
- `kd_poli_perujuk` (VARCHAR) - Kode poli perujuk
- Kolom lainnya dengan nilai default `'-'`
- `no_balasan` (VARCHAR) - Nomor balasan rujukan

### Integrasi dengan Data Lain

#### Query Tampil Data
- **Lokasi**: [baris 5293](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L5293)
- Data perujuk ditampilkan di kolom ke-8 tabel utama dengan query:
  ```sql
  ifnull((select perujuk from rujuk_masuk where rujuk_masuk.no_rawat=reg_periksa.no_rawat),'') as perujuk
  ```
- Jika tidak ada data rujuk masuk, kolom akan menampilkan string kosong

#### Update Data Rujuk Masuk
- **Lokasi**: [baris 6127-6132](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L6127-L6132)
- Saat terjadi perubahan nomor rawat (misalnya saat merge data), sistem akan:
  1. Update `rujuk_masuk.no_rawat` ke nomor rawat baru
  2. Jika update gagal, hapus record lama dengan `meghapus("rujuk_masuk","no_rawat", norawatdipilih)`

#### Set Pasien dari Eksternal
- **Method**: `SetPasien(String norm, String nosisrute, String FaskesAsal)` [baris 13246-13253]
- **Method**: `setPasien(...)` dengan parameter `FaskesAsal` [baris 13262-13275]
- Kedua method ini dapat digunakan untuk set field `AsalRujukan` dan variabel `nosisrute` saat pasien didaftarkan dari sistem eksternal (misalnya dari bridging Sisrute)

### Akses & Keamanan
- Akses dikontrol melalui method `akses.getrujukan_masuk()`
- Menu hanya aktif jika user memiliki akses rujukan masuk
- Validasi dilakukan sebelum membuka dialog untuk memastikan pasien sudah dipilih

### Catatan Penting
1. Field `AsalRujukan` bersifat opsional - registrasi tetap bisa dilakukan tanpa mengisi asal rujukan
2. Data rujuk masuk hanya tersimpan saat proses simpan registrasi berhasil (`ceksukses==true`)
3. Nomor balasan rujuk masuk di-generate otomatis dengan format tanggal dan nomor urut
4. Integrasi dengan Sisrute: jika ada nomor Sisrute, akan tersimpan di kolom `no_sisrute`
5. Dialog `DlgRujukMasuk` memiliki dua mode:
   - Mode tampil/edit data rujuk masuk (`tampil3()`)
   - Mode pemilihan perujuk untuk input (`tampil4()`)

## Popup Masuk Kamar Inap

### Deskripsi
Popup masuk kamar inap digunakan untuk mendaftarkan pasien IGD ke rawat inap. Fitur ini memungkinkan pengguna untuk mengalihkan pasien dari rawat jalan/IGD ke rawat inap dengan mengelola data kamar, kelas perawatan, dan informasi terkait rawat inap.

### Cara Akses
1. **Via Menu Popup**: Klik kanan pada baris pasien di tabel → Menu "Kamar Inap" (`MnKamarInap`)
2. **Via Keyboard Shortcut**: Pilih kolom ke-1 di tabel → Tekan tombol **SPACE** (jika menu `MnKamarInap` aktif/enabled)
3. **Via Menu Status**: Menu "Status" → "Dirawat" (`MnDIrawat`) - akan memanggil `MnKamarInapActionPerformed` setelah mengubah status menjadi "Dirawat"

### Implementasi

#### Method Handler: `MnKamarInapActionPerformed`
- **Lokasi**: [baris 6393-6422](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L6393-L6422)
- **Validasi Multi-Layer**:
  1. **Validasi Tabel Kosong**: 
     - Cek apakah tabel memiliki data (`tabMode.getRowCount() == 0`)
     - Jika kosong, tampilkan pesan error dan fokus ke field `TNoReg`
  2. **Validasi Pasien Dipilih**: 
     - Cek apakah pasien sudah dipilih (`TPasien.getText().trim().equals("")`)
     - Jika belum dipilih, tampilkan pesan error dan fokus ke tabel
  3. **Validasi Baris Terpilih**: 
     - Cek apakah ada baris yang dipilih di tabel (`tbPetugas.getSelectedRow() != -1`)
  4. **Validasi Status Pasien**: 
     - Cek status pasien di kolom ke-18 tabel
     - Jika status = "Batal", tampilkan pesan "Pasien berstatus batal periksa...!" dan blokir akses
  5. **Validasi Billing Terverifikasi**: 
     - Cek apakah data billing sudah terverifikasi dengan `Sequel.cariRegistrasi(TNoRw.getText())`
     - Jika sudah terverifikasi (`> 0`), tampilkan pesan "Data billing sudah terverifikasi..!!" dan blokir akses

- **Proses Eksekusi**:
  1. Set status akses menjadi `true` dengan `akses.setstatus(true)`
  2. Set cursor ke `WAIT_CURSOR` untuk indikasi loading
  3. Instansiasi dialog `DlgKamarInap` dengan modal `false`
  4. Set ukuran dialog sesuai dengan ukuran internal frame
  5. Posisikan dialog di tengah internal frame (`setLocationRelativeTo`)
  6. Reset field dialog dengan `emptTeks()`
  7. Cek akses dengan `isCek()`
  8. Set data pasien dengan `setNoRm(TNoRw.getText(), TNoRM.getText(), TPasien.getText())`
     - Parameter 1: Nomor rawat (`TNoRw.getText()`)
     - Parameter 2: Nomor rekam medis (`TNoRM.getText()`)
     - Parameter 3: Nama pasien (`TPasien.getText()`)
  9. Tampilkan dialog dengan `setVisible(true)`
  10. Reset cursor ke default setelah dialog ditutup

### Validasi Terkait

#### Validasi Saat Registrasi Baru
- **Lokasi**: [baris 5136-5140](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L5136-L5140)
- **Query Validasi**:
  ```sql
  select count(pasien.no_rkm_medis) 
  from pasien 
  inner join reg_periksa 
  inner join kamar_inap 
  on reg_periksa.no_rkm_medis=pasien.no_rkm_medis 
  and reg_periksa.no_rawat=kamar_inap.no_rawat 
  where kamar_inap.stts_pulang='-' 
  and pasien.no_rkm_medis=?
  ```
- **Kondisi**: Jika pasien sedang dalam masa perawatan di kamar inap (`stts_pulang='-'`), registrasi baru akan diblokir
- **Pesan Error**: "Pasien sedang dalam masa perawatan di kamar inap..!!"
- **Aksi**: Fokus kembali ke field `TNoRM`

#### Validasi di Menu Lain
Beberapa menu lain juga melakukan validasi untuk mencegah akses jika pasien sudah masuk kamar inap:
- **MnRawatJalan**: [baris 6433](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L6433)
  - Pesan: "Maaf, Pasien sudah masuk Kamar Inap. Gunakan billing Ranap..!!!"
- **MnPemberianObat**: [baris 6481](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L6481)
- **MnBilling**: [baris 6505, 6508](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L6505-L6508)
- **MnMeninggal**: [baris 7808](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L7808)

### Integrasi dengan Menu Status "Dirawat"

#### Method: `MnDIrawatActionPerformed`
- **Lokasi**: [baris 7789-7802](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L7789-L7802)
- **Proses**:
  1. Validasi nomor rawat tidak kosong
  2. Cek apakah pasien sudah masuk kamar inap
  3. Jika belum masuk kamar inap:
     - Update status di tabel `reg_periksa` menjadi `'Dirawat'`
     - Panggil `MnKamarInapActionPerformed(evt)` untuk membuka dialog kamar inap
     - Update status di tabel UI menjadi "Dirawat" (kolom ke-18)
  4. Jika sudah masuk kamar inap, tampilkan pesan error

### Struktur Tabel `kamar_inap`
Berdasarkan query yang digunakan, tabel `kamar_inap` memiliki kolom:
- `no_rawat` (VARCHAR) - Nomor rawat pasien (foreign key ke `reg_periksa`)
- `stts_pulang` (VARCHAR) - Status pulang pasien (`'-'` = masih dirawat, nilai lain = sudah pulang)
- Kolom lainnya untuk data kamar, kelas, tanggal masuk, dll.

### Update Data Kamar Inap
- **Lokasi**: [baris 5770](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L5770)
- Saat terjadi perubahan nomor rawat (misalnya saat merge data), sistem akan:
  - Update `kamar_inap.no_rawat` ke nomor rawat baru dengan query:
    ```sql
    update kamar_inap set no_rawat=? where no_rawat=?
    ```

### Akses & Keamanan
- Menu dikontrol melalui method `MnKamarInap.isEnabled()`
- Status akses di-set dengan `akses.setstatus(true)` sebelum membuka dialog
- Validasi ketat dilakukan untuk memastikan:
  - Pasien belum masuk kamar inap sebelumnya
  - Billing belum terverifikasi
  - Status pasien bukan "Batal"

### Catatan Penting
1. **Billing Terverifikasi**: Jika billing sudah terverifikasi, pasien tidak bisa masuk kamar inap melalui menu ini
2. **Status Batal**: Pasien dengan status "Batal" tidak bisa masuk kamar inap
3. **Pasien Sedang Dirawat**: Sistem mencegah registrasi baru jika pasien masih dalam masa perawatan (`stts_pulang='-'`)
4. **Integrasi dengan Menu Lain**: Menu rawat jalan, pemberian obat, dan billing akan diblokir jika pasien sudah masuk kamar inap
5. **Dialog DlgKamarInap**: Dialog ini menangani semua proses pendaftaran pasien ke kamar inap, termasuk pemilihan kamar, kelas, dan data terkait
6. **Keyboard Shortcut**: Kolom ke-1 di tabel adalah shortcut untuk membuka menu kamar inap
7. **Menu Status Dirawat**: Menu "Dirawat" secara otomatis membuka dialog kamar inap setelah mengubah status

## Dialog Kamar Inap (DlgKamarInap.java)

### Deskripsi
`DlgKamarInap` adalah dialog utama untuk mengelola seluruh proses rawat inap pasien, mulai dari pendaftaran masuk kamar inap, pemilihan kamar, pengelolaan diagnosa, hingga proses pulang pasien. Dialog ini terintegrasi dengan berbagai modul rekam medis, keuangan, dan layanan penunjang.

### Lokasi File
- **File**: [DlgKamarInap.java](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java)
- **Package**: `simrskhanza`
- **Extends**: `javax.swing.JDialog`

### Struktur Data & Tabel

#### Tabel Utama (`tbKamIn`)
- **Model**: `DefaultTableModel` dengan 22 kolom
- **Kolom-kolom**:
  1. `No.Rawat` - Nomor rawat pasien
  2. `Nomer RM` - Nomor rekam medis
  3. `Nama Pasien` - Nama pasien (dengan umur)
  4. `Alamat Pasien` - Alamat lengkap pasien
  5. `Penanggung Jawab` - Nama penanggung jawab
  6. `Hubungan P.J.` - Hubungan dengan penanggung jawab
  7. `Jenis Bayar` - Jenis pembayaran/penjamin
  8. `Kamar` - Kode kamar dan nama bangsal
  9. `Tarif Kamar` - Tarif kamar per hari
  10. `Diagnosa Awal` - Diagnosa saat masuk
  11. `Diagnosa Akhir` - Diagnosa saat pulang
  12. `Tgl.Masuk` - Tanggal masuk kamar
  13. `Jam Masuk` - Jam masuk kamar
  14. `Tgl.Keluar` - Tanggal keluar kamar
  15. `Jam Keluar` - Jam keluar kamar
  16. `Ttl.Biaya` - Total biaya kamar
  17. `Stts.Pulang` - Status pulang
  18. `Lama` - Lama rawat inap (hari)
  19. `Dokter P.J.` - Dokter penanggung jawab
  20. `Kamar` - Kode kamar (duplikat untuk keperluan internal)
  21. `Status Bayar` - Status pembayaran
  22. `Agama` - Agama pasien

### Method-Method Utama

#### 1. Constructor & Inisialisasi
- **Method**: `DlgKamarInap(java.awt.Frame parent, boolean modal)`
- **Lokasi**: [baris 253-256](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L253-L256)
- **Proses**:
  1. Memanggil `super(parent, modal)` untuk inisialisasi JDialog
  2. Memanggil `initComponents()` untuk setup komponen UI
  3. Memanggil `initKamarInap()` untuk inisialisasi khusus kamar inap
  4. Setup `DefaultTableModel` dengan 22 kolom
  5. Konfigurasi tabel: set model, preferred size, auto-resize mode
  6. Setup lebar kolom untuk setiap kolom (105-170 pixel)

#### 2. Method `setNoRm(String norwt, String norm, String nmpasien)`
- **Lokasi**: [baris 19423-19502](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L19423-L19502)
- **Fungsi**: Set data pasien dan menentukan mode dialog (Masuk atau Pulang)
- **Parameter**:
  - `norwt`: Nomor rawat pasien
  - `norm`: Nomor rekam medis
  - `nmpasien`: Nama pasien
- **Proses**:
  1. Set field `norawat`, `TNoRM`, `TPasien` dengan data yang diberikan
  2. Set radio button `R1` (filter pasien sedang dirawat) menjadi selected
  3. Set field pencarian `TCari` dengan nomor rawat
  4. Query data kamar inap terakhir pasien:
     ```sql
     select kamar_inap.no_rawat,kamar_inap.kd_kamar,kamar_inap.diagnosa_awal,
            kamar_inap.diagnosa_akhir,kamar_inap.tgl_masuk,kamar_inap.jam_masuk,
            kamar_inap.tgl_keluar,kamar_inap.jam_keluar,kamar_inap.ttl_biaya
     from kamar_inap 
     where kamar_inap.no_rawat=? 
     order by kamar_inap.tgl_masuk,kamar_inap.jam_masuk desc limit 1
     ```
  5. **Jika ada data kamar inap aktif** (belum pulang):
     - Set mode **Pulang/Check Out**
     - Field `norawat` dan `kdkamar` menjadi non-editable
     - Tampilkan field diagnosa akhir dan status pulang
     - Load data kamar, diagnosa awal, tanggal/jam masuk
     - Panggil `isKmr()` dan `isjml()` untuk load data kamar dan hitung biaya
  6. **Jika tidak ada data** (pasien baru):
     - Set mode **Masuk/Check In**
     - Field `norawat` dan `kdkamar` menjadi editable
     - Sembunyikan field diagnosa akhir dan status pulang
     - Reset field tanggal dan jam ke waktu sekarang

#### 3. Method `tampil()`
- **Lokasi**: [baris 19132-19251](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L19132-L19251)
- **Fungsi**: Menampilkan data kamar inap berdasarkan filter yang dipilih
- **Filter Berdasarkan Radio Button**:
  - **R1** (Pasien Sedang Dirawat): `kamar_inap.stts_pulang='-'`
  - **R2** (Tanggal Masuk): `kamar_inap.tgl_masuk between ...`
  - **R3** (Tanggal Keluar): `kamar_inap.tgl_keluar between ...`
- **Filter Tambahan**:
  - Filter bangsal (jika `BangsalCari` tidak kosong)
  - Filter status bayar (dari `cmbStatusBayar`)
  - Filter pencarian teks (dari `TCari`) - mencakup: no_rawat, no_rkm_medis, nm_pasien, alamat, kd_kamar, nm_bangsal, diagnosa, tarif, tanggal, dokter, status pulang, penjab, agama
- **Query Utama**:
  ```sql
  select kamar_inap.no_rawat,reg_periksa.no_rkm_medis,pasien.nm_pasien,
         concat(pasien.alamat,', ',kelurahan.nm_kel,', ',kecamatan.nm_kec,', ',kabupaten.nm_kab) as alamat,
         reg_periksa.p_jawab,reg_periksa.hubunganpj,penjab.png_jawab,
         concat(kamar_inap.kd_kamar,' ',bangsal.nm_bangsal) as kamar,
         kamar_inap.trf_kamar,kamar_inap.diagnosa_awal,kamar_inap.diagnosa_akhir,
         kamar_inap.tgl_masuk,kamar_inap.jam_masuk,
         if(kamar_inap.tgl_keluar='0000-00-00','',kamar_inap.tgl_keluar) as tgl_keluar,
         if(kamar_inap.jam_keluar='00:00:00','',kamar_inap.jam_keluar) as jam_keluar,
         kamar_inap.ttl_biaya,kamar_inap.stts_pulang,kamar_inap.lama,
         dokter.nm_dokter,kamar_inap.kd_kamar,reg_periksa.kd_pj,
         concat(reg_periksa.umurdaftar,' ',reg_periksa.sttsumur)as umur,
         reg_periksa.status_bayar,pasien.agama
  from kamar_inap 
  inner join reg_periksa on kamar_inap.no_rawat=reg_periksa.no_rawat
  inner join pasien on reg_periksa.no_rkm_medis=pasien.no_rkm_medis
  inner join kamar on kamar_inap.kd_kamar=kamar.kd_kamar
  inner join bangsal on kamar.kd_bangsal=bangsal.kd_bangsal
  inner join kelurahan on pasien.kd_kel=kelurahan.kd_kel
  inner join kecamatan on pasien.kd_kec=kecamatan.kd_kec
  inner join kabupaten on pasien.kd_kab=kabupaten.kd_kab
  inner join dokter on reg_periksa.kd_dokter=dokter.kd_dokter
  inner join penjab on reg_periksa.kd_pj=penjab.kd_pj
  where [filter conditions]
  order by bangsal.nm_bangsal,kamar_inap.tgl_masuk,kamar_inap.jam_masuk
  ```
- **Fitur Khusus**: 
  - Menggunakan `SwingWorker` untuk loading data secara asynchronous
  - Menampilkan data bayi yang digabung dengan ibu (jika ada) dengan tarif persentase
  - Query data bayi dari tabel `ranap_gabung` jika ada

#### 4. Method `emptTeks()`
- **Lokasi**: [baris 19253-19278](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L19253-L19278)
- **Fungsi**: Reset semua field input ke nilai default
- **Field yang di-reset**:
  - `norawat`, `TNoRM`, `TPasien` → kosong
  - `kdkamar`, `TKdBngsal`, `TBangsal` → kosong
  - `diagnosaawal`, `diagnosaakhir` → kosong
  - Tanggal dan jam → waktu sekarang
  - `TOut`, `TIn`, `JamMasuk` → kosong
  - `TTarif`, `TJmlHari`, `ttlbiaya` → "0"
- **Fokus**: Set fokus ke field `norawat`

#### 5. Method `isCek()`
- **Lokasi**: [baris 19508-19522](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L19508-L19522)
- **Fungsi**: Cek akses bangsal berdasarkan user yang login
- **Proses**:
  1. Ambil nama kamar aktif dari `koneksiDB.KAMARAKTIFRANAP()`
  2. Jika user adalah "Admin Utama":
     - Field `BangsalCari` dapat diisi manual
     - Button `btnBangsalCari` enabled
  3. Jika bukan admin:
     - Set `BangsalCari` dengan nama kamar aktif user
     - Field `BangsalCari` non-editable
     - Button `btnBangsalCari` disabled

### Proses Masuk Kamar Inap (Check In)

#### Method: `BtnSimpanActionPerformed` - Mode Masuk
- **Lokasi**: [baris 5898-5929](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L5898-L5929)
- **Validasi**:
  1. Pasien harus dipilih (`TPasien.getText()` tidak kosong)
  2. Kamar harus dipilih (`TKdBngsal.getText()` tidak kosong)
  3. Diagnosa awal harus diisi (`diagnosaawal.getText()` tidak kosong)
  4. Status kamar harus "KOSONG" (bukan "ISI")
- **Proses Penyimpanan**:
  1. Insert ke tabel `kamar_inap`:
     ```sql
     INSERT INTO kamar_inap VALUES (
       'no_rawat', 'kd_kamar', 'trf_kamar', 'diagnosa_awal', 'diagnosa_akhir',
       'tgl_masuk', 'jam_masuk', '0000-00-00', '00:00:00', 'lama', 'ttl_biaya', '-'
     )
     ```
  2. Update `reg_periksa.status_lanjut` menjadi `'Ranap'`
  3. Update `kamar.status` menjadi `'ISI'`
  4. Reset form dengan `emptTeks()`
  5. Refresh tabel dengan `tampil()`

### Proses Pulang Kamar Inap (Check Out)

#### Method: `BtnSimpanActionPerformed` - Mode Pulang
- **Lokasi**: [baris 5930-5983](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L5930-L5983)
- **Validasi**:
  1. Status pulang harus dipilih (bukan "-")
  2. Diagnosa akhir harus diisi
- **Proses Update**:
  1. Update tabel `kamar_inap`:
     ```sql
     UPDATE kamar_inap SET
       tgl_keluar='...', trf_kamar='...', jam_keluar='...',
       ttl_biaya='...', stts_pulang='...', diagnosa_akhir='...', lama='...'
     WHERE no_rawat='...' AND kd_kamar='...' 
       AND tgl_masuk='...' AND jam_masuk='...'
     ```
  2. Hapus baris dari tabel UI
  3. **Jika status pulang = "Meninggal"**:
     - Buka dialog `DlgPasienMati` untuk input data kematian
  4. **Jika status pulang = "Rujuk"**:
     - Buka dialog `DlgRujuk` untuk input data rujukan
  5. Update `kamar.status` menjadi `'KOSONG'`
  6. Tutup window input kamar
  7. Reset form

#### Status Pulang yang Tersedia
- Sehat, Rujuk, APS, +, Meninggal, Sembuh, Membaik, Pulang Paksa, -, Pindah Kamar, Status Belum Lengkap, Atas Persetujuan Dokter, Atas Permintaan Sendiri, Isoman, Lain-lain

### Fitur Tambahan

#### 1. Pindah Kamar
- **Window**: `WindowPindahKamar`
- **Fungsi**: Memindahkan pasien dari satu kamar ke kamar lain
- **Proses**:
  1. Update `kamar_inap.stts_pulang` menjadi `'Pindah Kamar'` untuk kamar lama
  2. Update `kamar.status` kamar lama menjadi `'KOSONG'`
  3. Update `kamar_inap.no_rawat` ke nomor rawat baru (jika berbeda)
  4. Update `reg_periksa.status_lanjut` menjadi `'Ranap'`

#### 2. Ranap Gabung (Ibu & Bayi)
- **Window**: `WindowRanapGabung`
- **Tabel**: `ranap_gabung`
- **Fungsi**: Menggabungkan rawat inap ibu dan bayi dalam satu tagihan
- **Struktur**:
  - `no_rawat`: Nomor rawat ibu (primary)
  - `no_rawat2`: Nomor rawat bayi
- **Proses**:
  1. Insert ke `ranap_gabung` dengan nomor rawat ibu dan bayi
  2. Update `reg_periksa.status_lanjut` bayi menjadi `'Ranap'`
  3. Data bayi ditampilkan sebagai baris tambahan di tabel dengan tarif persentase
- **Hapus Gabung**:
  - Update `reg_periksa.status_lanjut` bayi menjadi `'Ralan'`
  - Hapus record dari `ranap_gabung`

#### 3. Hapus Data Salah
- **Menu**: `MnHapusDataSalah`
- **Fungsi**: Menghapus data kamar inap yang salah input
- **Kondisi**: Hanya aktif jika `aktifkan_hapus_data_salah='Yes'` di setting
- **Proses**:
  1. Hapus record dari `kamar_inap`
  2. Update `kamar.status` menjadi `'KOSONG'`
  3. Update `reg_periksa.status_lanjut` menjadi `'Ralan'`

#### 4. Update Diagnosa
- **Diagnosa Awal Sementara**: Field `DiagnosaAwalSementara` dapat di-update tanpa harus pulang
- **Method**: `BtnSimpan5ActionPerformed` - Update diagnosa awal
- **Method**: `BtnSimpan6ActionPerformed` - Update diagnosa akhir

### Integrasi dengan Modul Lain

#### 1. Rekam Medis
Dialog terintegrasi dengan puluhan modul rekam medis rawat inap:
- Penilaian awal keperawatan/medis (dewasa, anak, neonatus, kebidanan, jantung, psikiatrik)
- Catatan observasi (ranap, bayi, CHBP, hemodialisa, induksi persalinan, ventilator, restrain)
- Monitoring (Aldrette, Bromage, Steward, reaksi transfusi, asuhan gizi)
- Skrining (nutrisi, risiko jatuh, dekubitus, MPP)
- Checklist (kriteria masuk/keluar HCU/ICU/NICU/PICU, pre/post operasi, anestesi)
- Dan banyak lagi...

#### 2. Keuangan
- **DlgBilingRanap**: Billing rawat inap
- **DlgPerkiraanBiayaRanap**: Perkiraan biaya
- **DlgDeposit**: Deposit pasien
- **DlgLhtPiutang**: Lihat piutang

#### 3. Layanan Penunjang
- Permintaan laboratorium, radiologi, konsultasi medik
- Pemberian obat, resep pulang
- Diet pasien

#### 4. Surat & Dokumen
- Surat keterangan rawat inap
- Surat persetujuan umum
- Surat pulang atas permintaan sendiri
- Surat penolakan anjuran medis
- Dan lainnya

### Struktur Database

#### Tabel `kamar_inap`
Kolom utama:
- `no_rawat` (VARCHAR) - Nomor rawat pasien (FK ke `reg_periksa`)
- `kd_kamar` (VARCHAR) - Kode kamar (FK ke `kamar`)
- `trf_kamar` (DOUBLE) - Tarif kamar per hari
- `diagnosa_awal` (VARCHAR) - Diagnosa saat masuk
- `diagnosa_akhir` (VARCHAR) - Diagnosa saat pulang
- `tgl_masuk` (DATE) - Tanggal masuk
- `jam_masuk` (TIME) - Jam masuk
- `tgl_keluar` (DATE) - Tanggal keluar
- `jam_keluar` (TIME) - Jam keluar
- `lama` (INT) - Lama rawat inap (hari)
- `ttl_biaya` (DOUBLE) - Total biaya kamar
- `stts_pulang` (VARCHAR) - Status pulang (`'-'` = masih dirawat)

#### Tabel `ranap_gabung`
- `no_rawat` (VARCHAR) - Nomor rawat ibu
- `no_rawat2` (VARCHAR) - Nomor rawat bayi

#### Tabel `kamar`
- `kd_kamar` (VARCHAR) - Kode kamar (PK)
- `kd_bangsal` (VARCHAR) - Kode bangsal (FK ke `bangsal`)
- `status` (VARCHAR) - Status kamar (`'ISI'` atau `'KOSONG'`)
- `trf_kamar` (DOUBLE) - Tarif default kamar

### Catatan Penting
1. **Mode Dialog**: Dialog memiliki dua mode utama:
   - **Masuk/Check In**: Saat pasien baru masuk kamar inap
   - **Pulang/Check Out**: Saat pasien sudah dirawat dan akan pulang
2. **Status Kamar**: Sistem memastikan hanya kamar dengan status "KOSONG" yang bisa digunakan
3. **Status Lanjut**: Field `reg_periksa.status_lanjut` diubah menjadi `'Ranap'` saat masuk kamar inap
4. **Tarif Kamar**: Tarif dapat berbeda per jenis pembayaran (dari tabel `set_harga_kamar`)
5. **Perhitungan Lama**: Lama rawat inap dihitung berdasarkan tanggal/jam masuk dan keluar
6. **Filter Akses**: User non-admin hanya bisa melihat data bangsal mereka sendiri
7. **Data Bayi Gabung**: Data bayi yang digabung dengan ibu ditampilkan sebagai baris terpisah dengan tarif persentase
8. **Asynchronous Loading**: Data tabel dimuat menggunakan `SwingWorker` untuk menghindari UI freeze

## Referensi Kode
- Muat data: [tampil](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12593-L12674)
- Jam registrasi: [jam](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12716-L12768)
- Validasi pasien: [isPas](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12770-L12802)
- Detail pasien: [isCekPasien](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12804-L12857)
- Toggle form: [isForm](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L12868-L12879)
- Simpan registrasi: [BtnSimpanActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L5131-L5240)
- Handler popup rujuk masuk: [MnRujukMasukActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L6826-L6842)
- Penyimpanan data rujuk masuk: [BtnSimpanActionPerformed - bagian rujuk masuk](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L5210-L5219)
- Handler masuk kamar inap: [MnKamarInapActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L6393-L6422)
- Validasi pasien sedang dirawat: [BtnSimpanActionPerformed - validasi kamar inap](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L5136-L5140)
- Menu status dirawat: [MnDIrawatActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgIGD.java#L7789-L7802)
- **DlgKamarInap - Constructor**: [baris 253-256](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L253-L256)
- **DlgKamarInap - setNoRm**: [baris 19423-19502](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L19423-L19502)
- **DlgKamarInap - tampil**: [baris 19132-19251](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L19132-L19251)
- **DlgKamarInap - emptTeks**: [baris 19253-19278](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L19253-L19278)
- **DlgKamarInap - isCek**: [baris 19508-19522](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L19508-L19522)
- **DlgKamarInap - BtnSimpan (Masuk)**: [baris 5898-5929](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L5898-L5929)
- **DlgKamarInap - BtnSimpan (Pulang)**: [baris 5930-5983](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgKamarInap.java#L5930-L5983)

