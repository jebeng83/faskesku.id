# API BPJS – Resume Teknis (Faskesku.id)

Dokumen ini merangkum arsitektur, autentikasi, endpoint, validasi, alur data, serta catatan operasional dan risiko untuk layanan API BPJS (Mobile JKN) yang diimplementasikan dalam tiga berkas utama:

- [index.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php)
- [conf.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php)
- [.htaccess](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/.htaccess)

## Ringkasan Sistem

- API berbasis PHP yang menangani integrasi antrean dan pendaftaran peserta BPJS dengan sistem internal (SIMRS Khanza/kerjo_db).
- Routing dilakukan via `.htaccess` ke `index.php` menggunakan parameter `url` untuk memetakan segmen path.
- Autentikasi menggunakan header `x-username` dan `x-password` untuk mengambil JWT, lalu setiap permintaan selanjutnya memakai `x-token` dan `x-username`.
- Koneksi database `kerjo_db` dan fungsi utilitas tersedia di `conf.php`. Beberapa tabel kunci yang digunakan: `reg_periksa`, `jadwal`, `poliklinik`, `dokter`, `pasien`, `maping_poliklinik_pcare`, `maping_dokter_pcare`, `set_urut_no_rkm_medis`, `set_no_rkm_medis`.

## Routing & Entry Point

- Rewrite rule [.htaccess:L1-L9](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/.htaccess#L1-L9) mengarahkan seluruh request non-file/non-dir ke `index.php?url=$1`.
- `index.php` membaca method, header, dan memecah `$_GET['url']` menjadi segmen untuk menentukan handler endpoint [index.php:L8-L17](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L8-L17).

## Konfigurasi & Utilitas (conf.php)

- Koneksi DB dan konstanta: [conf.php:L3-L12](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php#L3-L12). Username/password BPJS diambil dari tabel `password_asuransi` lalu didefinisikan sebagai `USERNAME`, `PASSWORD`, serta `CARABAYAR`.
- Koneksi dan eksekusi query:
  - `bukakoneksi()` [conf.php:L13-L23](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php#L13-L23)
  - `bukaquery()`, `bukaquery2()`, `bukaquery3()` [conf.php:L71-L90](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php#L71-L90)
  - Helper `getOne()`, `getOne2()` [conf.php:L92-L101](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php#L92-L101), [conf.php:L65-L69](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php#L65-L69)
- Sanitasi/validasi input berbasis string: `validTeks*`, `cleankar()` [conf.php:L25-L30](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php#L25-L30), [conf.php:L388-L606](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php#L388-L606).
- JWT sederhana:
  - `encode_jwt()`, `decode_jwt()`, `verify()` [conf.php:L225-L286](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php#L225-L286)
  - `createtoken()`, `cektoken()` [conf.php:L298-L339](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php#L298-L339)
  - Konfigurasi token: `privateKey()`, `payloadtoken()` [conf.php:L369-L386](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php#L369-L386)
- Waktu & utilitas lain: `hariindo()`, `FormatTgl()`, `noRegPoli()` [conf.php:L111-L145](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php#L111-L145), [conf.php:L105-L110](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php#L105-L110).

## Header & CORS

- Default header CORS dan tipe konten ditetapkan di awal [index.php:L2-L7](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L2-L7).
- Header yang wajib:
  - `x-username`: Username BPJS yang dikonfigurasi RS
  - `x-password`: Password BPJS (hanya untuk GET /auth)
  - `x-token`: JWT yang diperoleh dari GET /auth

## Autentikasi

- Endpoint: GET `/auth`
  - Lokasi handler: [index.php:L18-L34](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L18-L34)
  - Header: `x-username`, `x-password`
  - Proses: validasi kredensial terhadap `USERNAME` dan `PASSWORD` dari [conf.php:L7-L10](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php#L7-L10); jika cocok, buat JWT via `createtoken()` dengan payload berisi `username` dan masa berlaku 3660 detik.
  - Respon sukses: `{ response: { token }, metadata: { message: 'Ok', code: 200 } }`
  - Kegagalan: HTTP 201 dan pesan kesalahan standar.

## Endpoint Antrean

- GET `/antrean/status/{kodePoliPCare}/{tanggal}`
  - Lokasi handler: [index.php:L35-L129](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L35-L129)
  - Header: `x-username`, `x-token`
  - Validasi: format tanggal `yyyy-mm-dd`, tanggal tidak mundur, poli ada di `maping_poliklinik_pcare`.
  - Query utama: agregasi dari `reg_periksa` dengan pemetaan poli/dokter PCare.
  - Respon: daftar status antrean poli dengan `namapoli`, `totalantrean`, `sisaantrean`, `antreanpanggil`, `keterangan`, `kodedokter`, `namadokter`, `jampraktek`.

- GET `/antrean/sisapeserta/{nomorKartu}/{kodePoliPCare}/{tanggal}`
  - Lokasi handler: [index.php:L131-L239](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L131-L239)
  - Header: `x-username`, `x-token`
  - Validasi: kartu 13 digit numerik, format tanggal, tanggal tidak mundur, poli valid.
  - Respon: `nomorantrean` (no_reg), `namapoli`, `sisaantrean`, `antreanpanggil`, `keterangan`. Jika tidak ditemukan, HTTP 201 dengan pesan.

- POST `/antrean`
  - Lokasi handler: [index.php:L243-L567](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L243-L567)
  - Header: `x-username`, `x-token`
  - Body (JSON) wajib: `nomorkartu`, `nik`, `nohp`, `kodepoli`, `kodedokter`, `tanggalperiksa` (`yyyy-mm-dd`), `jampraktek` (`HH:MM-HH:MM`), `keluhan`, opsional `norm`.
  - Langkah proses:
    - Map `kodepoli` PCare → `kd_poli` RS [index.php:L406-L416](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L406-L416)
    - Map `kodedokter` PCare → `kd_dokter` RS [index.php:L406-L409](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L406-L409)
    - Validasi ketersediaan `jadwal` dan `kuota` [index.php:L426-L437](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L426-L437)
    - Cek keberadaan pasien (NIK + No.Kartu) [index.php:L438-L454](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L438-L454)
    - Cegah duplikasi pendaftaran di poli/tanggal/dokter yang sama [index.php:L473-L481](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L473-L481)
    - Hitung nomor antrean (`no_reg`), `no_rawat`, status poli dan umur [index.php:L495-L516](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L495-L516)
    - Insert ke `reg_periksa` [index.php:L515-L516](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L515-L516)
  - Respon: `nomorantrean`, `angkaantrean`, `namapoli`, `sisaantrean`, `antreanpanggil`, `keterangan`.
  - Error: format salah, jadwal tidak tersedia, kuota penuh, duplikasi, dsb.

- PUT `/antrean/batal`
  - Lokasi handler: [index.php:L997-L1139](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L997-L1139)
  - Header: `x-username`, `x-token`
  - Body: `nomorkartu`, `kodepoli`, `tanggalperiksa`, `keterangan`
  - Proses: Temukan `no_rawat` terakhir untuk peserta di poli/tanggal tersebut; jika status `Belum`, ubah menjadi `Batal`. Jika sudah `Batal` atau sudah dilayani, kembalikan pesan sesuai.
  - Respon sukses: metadata `Ok` code 200; berbagai kegagalan memakai code 201.

## Endpoint Peserta

- POST `/peserta`
  - Lokasi handler: [index.php:L568-L994](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L568-L994)
  - Header: `x-username`, `x-token`
  - Body wajib: `nomorkartu` (13 digit), `nik` (16 digit), `nomorkk` (16 digit), `nama`, `jeniskelamin` (`L`/`P`), `tanggallahir` (`yyyy-mm-dd`), `alamat`, `kodeprop`/`namaprop`, `kodedati2`/`namadati2`, `kodekec`/`namakec`, `kodekel`/`namakel`, `rw`, `rt`.
  - Proses: Validasi seluruh field; cek apakah pasien sudah ada (NIK + No.Kartu). Jika belum, hitung dan buat `norm` sesuai konfigurasi penomoran [index.php:L894-L955](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L894-L955); insert referensi wilayah (`kelurahan`, `kecamatan`, `kabupaten`, `propinsi`) jika belum ada; buat data `pasien` [index.php:L959-L971](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L959-L971); update `set_no_rkm_medis`.
  - Respon: `{ response: { norm }, metadata: { message: 'Ok', code: 200 } }`.

## Struktur Respon & Kode Status

- Sukses umum: HTTP 200 dengan `metadata.message = 'Ok'`.
- Validasi dan kondisi gagal: banyak memakai HTTP 201 (tidak standar; biasanya 4xx). Beberapa kondisi khusus memakai 202 (mis. peserta tidak ditemukan saat daftar), dan 401 untuk kesalahan eksekusi query.
- Ketika tidak ada handler yang menghasilkan `response`, API menampilkan panduan penggunaan teks (lihat [index.php:L1141-L1282](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L1141-L1282)).

## Alur Operasional Singkat

1. Client memanggil GET `/auth` dengan `x-username` dan `x-password` benar → menerima `token` JWT.
2. Client menggunakan `x-token` + `x-username` untuk semua endpoint lain.
3. Untuk pengecekan status antrean atau sisa antrean per peserta gunakan endpoint GET sesuai kebutuhan.
4. Pembuatan nomor antrean (POST `/antrean`) akan memeriksa jadwal, kuota, duplikasi, serta membuat record di `reg_periksa`.
5. Pembatalan antrean (PUT `/antrean/batal`) mengubah status `reg_periksa.stts` menjadi `Batal` bila masih `Belum`.
6. Pendaftaran peserta baru (POST `/peserta`) membuat `norm` dan record pasien lengkap beserta referensi wilayah.

## Validasi & Sanitasi Input

- Pola regex untuk nomor kartu (13 digit) dan NIK/KK (16 digit) tersebar pada handler endpoint.
- Fungsi `validTeks*` dan `cleankar` digunakan untuk membatasi karakter berbahaya sebelum query.
- Format tanggal selalu `yyyy-mm-dd`, waktu praktik `HH:MM-HH:MM`.

## Catatan Risiko & Rekomendasi

- Perbandingan token: handler memakai `(cektoken($token) == 'true')` [index.php berbagai lokasi], sementara `cektoken()` mengembalikan boolean `TRUE` [conf.php:L325-L328]. Ini berpotensi selalu gagal; sebaiknya gunakan perbandingan boolean (mis. `== true`) atau ubah `cektoken()` mengembalikan string konsisten.
- Penggunaan HTTP 201 untuk error validasi tidak standar. Disarankan memakai 400/422 untuk validasi, 401/403 untuk auth, 404 untuk not found.
- Sekret/kredensial didefinisikan langsung di kode konfigurasi. Hindari mencetak atau menyimpan nilai rahasia di repo; gunakan environment variables atau store terproteksi.
- Query menggunakan interpolasi string tanpa prepared statements. Disarankan migrasi ke prepared statements untuk mitigasi SQL Injection.
- `decode_jwt()` memakai parameter `allowed_algs` berisi pasangan `['typ' => 'JWT', 'alg' => 'HS256']` [conf.php:L323-L327], namun fungsi mengharapkan daftar algoritma (mis. `['HS256']`). Perbaiki agar validasi algoritma tepat.

## Contoh Permintaan

```bash
# 1) Ambil token
curl -i \
  -H "x-username: <USERNAME_RS>" \
  -H "x-password: <PASSWORD_RS>" \
  "http://<host>/api_baskesku_v2/auth"

# 2) Status antrean poli
curl -i \
  -H "x-username: <USERNAME_RS>" \
  -H "x-token: <JWT_TOKEN>" \
  "http://<host>/api_baskesku_v2/antrean/status/<KODE_POLI_PCARE>/<YYYY-MM-DD>"

# 3) Sisa antrean peserta
curl -i \
  -H "x-username: <USERNAME_RS>" \
  -H "x-token: <JWT_TOKEN>" \
  "http://<host>/api_baskesku_v2/antrean/sisapeserta/<NO_KARTU>/<KODE_POLI_PCARE>/<YYYY-MM-DD>"

# 4) Ambil nomor antrean
curl -i \
  -H "x-username: <USERNAME_RS>" \
  -H "x-token: <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "nomorkartu":"0000000000000",
    "nik":"0000000000000000",
    "nohp":"081234567890",
    "kodepoli":"POLI_PCARE",
    "kodedokter":"DOKTER_PCARE",
    "tanggalperiksa":"2026-01-31",
    "jampraktek":"08:00-12:00",
    "keluhan":"Keluhan singkat",
    "norm":"<opsional>"
  }' \
  "http://<host>/api_baskesku_v2/antrean"

# 5) Batalkan antrean
curl -i \
  -X PUT \
  -H "x-username: <USERNAME_RS>" \
  -H "x-token: <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "nomorkartu":"0000000000000",
    "kodepoli":"POLI_PCARE",
    "tanggalperiksa":"2026-01-31",
    "keterangan":"Tidak dapat hadir"
  }' \
  "http://<host>/api_baskesku_v2/antrean/batal"

# 6) Daftar peserta baru
curl -i \
  -H "x-username: <USERNAME_RS>" \
  -H "x-token: <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "nomorkartu":"0000000000000",
    "nik":"0000000000000000",
    "nomorkk":"0000000000000000",
    "nama":"Nama Peserta",
    "jeniskelamin":"L",
    "tanggallahir":"1990-01-01",
    "alamat":"Alamat",
    "kodeprop":"11","namaprop":"Nama Propinsi",
    "kodedati2":"1101","namadati2":"Nama Kab/Kota",
    "kodekec":"110101","namakec":"Nama Kecamatan",
    "kodekel":"11010101","namakel":"Nama Kelurahan",
    "rw":"001","rt":"002"
  }' \
  "http://<host>/api_baskesku_v2/peserta"
```

## Catatan Tambahan

- Timezone diset ke `Asia/Jakarta` [conf.php:L2](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/conf.php#L2).
- Respons default (ketika tidak ada payload JSON) menampilkan panduan penggunaan langsung dari `index.php` [index.php:L1141-L1282](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/api_faskesku_v2/index.php#L1141-L1282).

