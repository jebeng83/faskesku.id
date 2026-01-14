# Password BPJS – Resume Aplikasi DlgPasswordBPJS

Dokumen ini merangkum fungsi, alur kerja, integrasi, dan risiko keamanan dari form pengaturan kredensial BPJS di aplikasi desktop Java (Swing):

- Sumber utama: [DlgPasswordBPJS.java](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java)
- Integrasi server/API: [conf.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php)

## Tujuan

- Menyediakan antarmuka untuk menyimpan dan mengelola kredensial BPJS (username, password) yang dipakai oleh layanan API BPJS di sisi server.
- Kredensial disimpan ke tabel `password_asuransi` dengan enkripsi AES, dan kemudian digunakan oleh server untuk autentikasi terhadap Mobile JKN.

## Antarmuka & Komponen

- Tabel data (tbSpesialis) berisi 4 kolom: Kode Bayar, Cara Bayar, User, Password [DlgPasswordBPJS.java:L57-L67](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L57-L67).
- Input:
  - Kode BPJS/Cara Bayar (kdpj, nmpj) dipilih via dialog [DlgCariCaraBayar] [DlgPasswordBPJS.java:L94-L116](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L94-L116).
  - Nama User (TKd) dan Password (TPass) [DlgPasswordBPJS.java:L241-L269](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L241-L269).
- Tombol aksi:
  - Simpan (insert konfigurasi baru) [DlgPasswordBPJS.java:L469-L487](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L469-L487)
  - Ganti (hapus lalu insert) [DlgPasswordBPJS.java:L417-L435](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L417-L435)
  - Hapus [DlgPasswordBPJS.java:L445-L449](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L445-L449)
  - Baru (reset input) [DlgPasswordBPJS.java:L457-L459](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L457-L459)
  - Keluar [DlgPasswordBPJS.java:L405-L407](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L405-L407)

## Data & Basis Data

- Tabel utama: `password_asuransi` dengan kolom minimal: `kd_pj` (kode penjamin/cara bayar), `usere`, `passworde` (keduanya disimpan dalam AES).
- Saat tampil, data dibaca dengan dekripsi: `aes_decrypt(usere,'nur')`, `aes_decrypt(passworde,'windi')` [DlgPasswordBPJS.java:L562-L569](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L562-L569).
- Saat simpan/ganti, data ditulis dengan enkripsi: `aes_encrypt(?,'nur')` untuk user, `aes_encrypt(?,'windi')` untuk password [DlgPasswordBPJS.java:L427-L429](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L427-L429), [DlgPasswordBPJS.java:L477-L479](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L477-L479).
- Dependensi tabel referensi: `penjab` (cara bayar) untuk mengisi kolom cara bayar yang ditampilkan [DlgPasswordBPJS.java:L391-L396](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L391-L396).

## Operasi Utama

- Simpan:
  - Validasi input wajib (cara bayar, user, password).
  - Jika belum ada baris konfigurasi di tabel (tabMode.getRowCount()==0), insert satu baris baru ke `password_asuransi` [DlgPasswordBPJS.java:L476-L487](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L476-L487).
  - Bila sudah ada, ditolak dengan pesan: “Hanya diijinkan satu pengaturan” [DlgPasswordBPJS.java:L484-L486](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L484-L486).
- Ganti:
  - Validasi input wajib; jika ada baris terpilih di tabel, hapus baris berdasarkan `kd_pj` di `password_asuransi`, kemudian insert kembali dengan nilai baru [DlgPasswordBPJS.java:L425-L433](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L425-L433).
- Hapus:
  - Hapus konfigurasi berdasarkan `kd_pj` [DlgPasswordBPJS.java:L446-L449](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L446-L449).
- Baru:
  - Reset semua input teks [DlgPasswordBPJS.java:L586-L592](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L586-L592).
- Tampil:
  - Muat seluruh konfigurasi yang ada; men-decrypt dan menampilkan User dan Password dalam tabel [DlgPasswordBPJS.java:L558-L584](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L558-L584).

## Validasi & Pembatasan

- Batas panjang input: `kdpj` 3 char, `TKd` 30 char, `TPass` 30 char melalui `batasInput` [DlgPasswordBPJS.java:L90-L93](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L90-L93).
- Form membatasi hanya satu konfigurasi aktif (prevent multi-row) saat Simpan [DlgPasswordBPJS.java:L476-L486](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L476-L486).
- Navigasi dan pesan kesalahan menggunakan utilitas `validasi` (mis. `Valid.textKosong`, `Valid.pindah`).

## Integrasi dengan API BPJS (Server)

- Server API membaca kredensial dari tabel yang sama untuk mendefinisikan konstanta:
  - `USERNAME`, `PASSWORD`, dan `CARABAYAR` diambil dari query `select kd_pj,aes_decrypt(usere,'nur') as user,aes_decrypt(passworde,'windi') as pass FROM password_asuransi` [conf.php:L7-L12](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php#L7-L12).
- Kredensial yang Anda set di dialog ini langsung menentukan autentikasi pada endpoint GET `/auth` dan validasi di semua endpoint lain (x-username/x-token) [index.php berbagai lokasi].

## Alur Penggunaan

1. Buka “Setup Password BPJS”.
2. Klik tombol cari cara bayar (penjamin), pilih item yang sesuai → `kd_pj`, `png_jawab` terisi.
3. Isi `Nama User` dan `Password` BPJS sesuai kredensial yang diberikan RS/BPJS.
4. Klik “Simpan” untuk pertama kali; sistem hanya mengizinkan satu konfigurasi.
5. Untuk memperbarui: pilih baris pada tabel, klik “Ganti” untuk replace; atau “Hapus” untuk menghapus.
6. Server API akan otomatis memakai kredensial ini untuk pembuatan token dan validasi permintaan.

## Risiko Keamanan & Rekomendasi

- Kunci AES statis (`'nur'` untuk user, `'windi'` untuk password) hard-coded; tingkat keamanan bergantung pada kerahasiaan kode sumber dan akses DB. Disarankan:
  - Simpan kunci enkripsi di environment/secret store, bukan di kode.
  - Batasi akses form ini hanya untuk role admin; hindari menampilkan password plaintext di UI/tabel.
  - Audit akses dan perubahan (tambahkan logging perubahan dengan user/time).
- Saat “Ganti”, pola operasi adalah delete→insert; tambahkan transaksi dan constraint unik (mis. pada tabel `password_asuransi`) untuk mencegah kondisi race.
- Pertimbangkan validasi kekuatan password, rotasi berkala, dan notifikasi perubahan.

## Referensi Kode Penting

- Definisi kolom tabel UI: [DlgPasswordBPJS.java:L57-L67](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L57-L67)
- Simpan dengan AES_ENCRYPT: [DlgPasswordBPJS.java:L477-L479](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L477-L479)
- Ganti (hapus lalu insert): [DlgPasswordBPJS.java:L425-L433](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L425-L433)
- Hapus: [DlgPasswordBPJS.java:L446-L449](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L446-L449)
- Tampil (AES_DECRYPT): [DlgPasswordBPJS.java:L562-L569](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L562-L569)
- Pengambilan kredensial oleh server API: [conf.php:L7-L12](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php#L7-L12)

## Catatan Teknis

- Package: `setting` [DlgPasswordBPJS.java:L12](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPasswordBPJS.java#L12).
- Komponen kustom: `widget.*`, utilitas: `fungsi.*` (WarnaTable, batasInput, koneksiDB, sekuel, validasi).
- Dialog pemilihan penjamin/cara bayar: `simrskhanza.DlgCariCaraBayar`.

