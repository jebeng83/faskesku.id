# Integrasi BPJS PCare — Catatan Lengkap

Dokumen ini merangkum arsitektur, konfigurasi, header otentikasi, pola endpoint, proses decrypt + decompress, serta panduan uji dan troubleshooting integrasi BPJS PCare di aplikasi faskesku_id.

## Ringkasan
- Mendukung dua versi base URL PCare:
  - Legacy: `https://apijkn.bpjs-kesehatan.go.id/pcare-rest`
  - v3.0: `https://apijkn.bpjs-kesehatan.go.id/pcare-rest-v3.0`
- Header wajib: `X-cons-id`, `X-timestamp`, `X-signature`, `X-authorization`, `user_key`, `Accept`, `Content-Type`.
- Format `X-authorization` HARUS: `Basic <base64(username:password:kdAplikasi)>`.
- Decrypt + decompress server-side: kunci = `cons_id . cons_pwd . timestamp`, AES-256-CBC → LZString → JSON.
- Controller utama: `App/Http/Controllers/Pcare/PcareController.php`.
- Helper utama: `App/Traits/BpjsTraits.php`.

## Konfigurasi `.env`
Pastikan variabel berikut terisi (contoh):
```
BPJS_PCARE_BASE_URL=https://apijkn.bpjs-kesehatan.go.id/pcare-rest
BPJS_PCARE_CONS_ID=7925
BPJS_PCARE_CONS_PWD=2eF2C8E837
BPJS_PCARE_USER_KEY=403bf17ddf158790afcfe1e8dd682a67
BPJS_PCARE_USER=11251616
BPJS_PCARE_PASS=Pcare156#
BPJS_PCARE_KODE_PPK=xxxxx
BPJS_PCARE_APP_CODE=095
```
Catatan:
- `BPJS_PCARE_CONS_PWD` berfungsi sebagai secret key untuk perhitungan signature (HMAC-SHA256).
- `BPJS_PCARE_APP_CODE` default `095` bila tidak diisi.

### Verifikasi SSL/TLS dan CA Bundle

Agar koneksi ke host BPJS (apijkn.bpjs-kesehatan.go.id) aman dan stabil, pastikan verifikasi SSL aktif dan PHP mengetahui lokasi CA bundle yang valid.

Langkah-langkah:

1) Pastikan verifikasi SSL tidak dimatikan
- Set `.env` berikut:
```
BPJS_HTTP_DISABLE_SSL_VERIFY=false
```
Ini memastikan request menggunakan verifikasi sertifikat TLS (default). Hanya gunakan `true` sementara saat troubleshooting di lingkungan non-produksi.

2) Pastikan PHP cURL/OpenSSL tahu lokasi CA bundle
- Cek nilai saat ini:
  - Jalankan: `php -i | grep -i -E "(curl.cainfo|openssl.cafile)"`
  - Atau jalankan: `php -r "var_dump(ini_get('curl.cainfo'), ini_get('openssl.cafile'));"`
- Jika kosong, set di `php.ini` Anda:
```
curl.cainfo="/path/to/cacert.pem"
openssl.cafile="/path/to/cacert.pem"
```

Referensi lokasi CA bundle umum:
- Linux (Debian/Ubuntu): `/etc/ssl/certs/ca-certificates.crt`
- Linux (CentOS/RHEL): `/etc/pki/tls/certs/ca-bundle.crt`
- macOS (Homebrew, Apple Silicon): `/opt/homebrew/etc/openssl@3/cert.pem`
- macOS (Homebrew, Intel): `/usr/local/etc/openssl@3/cert.pem`

Jika belum tersedia, instal paket CA certificates:
- Debian/Ubuntu: `sudo apt-get install ca-certificates`
- CentOS/RHEL: `sudo yum install ca-certificates`
- macOS (Homebrew): `brew install ca-certificates openssl@3`

3) Restart layanan PHP setelah mengubah php.ini
- PHP-FPM: `sudo brew services restart php` (macOS/Homebrew) atau `sudo systemctl restart php-fpm`
- Built-in server/Artisan: hentikan lalu jalankan kembali `php artisan serve`
- Docker/Sail: rebuild atau restart container

4) Uji koneksi SSL ke BPJS
- Skrip bantu tersedia: `scripts/test_pcare_curl.php`
- Jalankan: `php scripts/test_pcare_curl.php`
- Pastikan `CURLOPT_SSL_VERIFYPEER=true` dan `CURLOPT_SSL_VERIFYHOST=2` menghasilkan HTTP 200/JSON valid. Jika error terkait sertifikat, periksa kembali path CA bundle.

Dengan verifikasi SSL aktif dan CA bundle benar, request PCare melalui `App\Traits\BpjsTraits::pcareRequest()` akan berjalan dengan aman (TLS v1.2 dipaksa, IPv4 preferen, dan retry ringan diaktifkan).

## Pembuatan Header
Header dibuat di `App/Traits/BpjsTraits.php`:
- `X-cons-id`: dari env `BPJS_PCARE_CONS_ID`.
- `X-timestamp`: UNIX epoch (detik, UTC), gunakan `time()`.
- `X-signature`: `base64(HMAC-SHA256(consId & timestamp, cons_pwd))`.
- `X-authorization`: `Basic <base64(username:password:kdAplikasi)>`.
- `user_key`: dari env `BPJS_PCARE_USER_KEY`.
- `Accept`: `application/json`.
- `Content-Type`: `application/json`.

Contoh perhitungan penting:
```
signature = base64( HMAC_SHA256( consId + '&' + timestamp, secret=cons_pwd ) )
authorization = 'Basic ' + base64( user + ':' + pass + ':' + appCode )
```

## Decrypt + Decompress (Server-side)
PCare sering mengembalikan JSON wrapper:
```
{ "response": "<string terenkripsi>", "metaData": {...} }
```
Langkah pemrosesan di `BpjsTraits::maybeDecryptAndDecompress`:
1. Parse wrapper sebagai JSON.
2. Jika `response` adalah string terenkripsi:
   - kunci = `cons_id . cons_pwd . timestamp`.
   - Dekripsi AES-256-CBC (key = SHA256(kunci), iv = pertama 16 byte dari SHA256(kunci)).
   - Decompress dengan `LZString::decompressFromEncodedURIComponent` (paket: `nullpunkt/lz-string-php`).
   - `json_decode` hasil decompress.
3. Replace field `response` pada wrapper dengan array hasil decode, lalu returkan wrapper.
4. Bila tidak ada wrapper atau `response` bukan string, fallback: kembalikan decode JSON biasa atau string mentah.

Keuntungan server-side:
- Tidak perlu expose kunci/credential ke frontend.
- UI langsung menerima JSON siap pakai.

## Controller & Endpoint
`App/Http/Controllers/Pcare/PcareController.php` menyediakan:
- `ping`: memeriksa header & konfigurasi.
- `proxy`: mem-forward endpoint PCare (GET/POST/PUT/DELETE) dan memproses decrypt+decompress.
- `getDokter`: GET `dokter/{start}/{limit}`.
- `getFaskes`: GET `faskes/{start}/{limit}`.
- `pesertaByNoKartu`: GET `peserta/nokartu/{noka}/tglPelayanan/{tglPelayanan}`.
- `daftarKunjungan`: POST `kunjungan` (payload sesuai katalog PCare).
- `getDiagnosa` (dual-mode):
  - Legacy: GET `diagnosa/{keyword}/{start}/{limit}`.
  - v3.0: GET `diagnosa?keyword={keyword}&offset={start}&limit={limit}`.

## Routing
- `routes/api.php`:
  - Prefix `/pcare` untuk API.
  - `match` untuk `/pcare/proxy/{endpoint}` → `PcareController@proxy`.
  - `GET /pcare/diagnosa` → `PcareController@getDiagnosa`.
- `routes/web.php`:
  - Grup `/pcare` untuk halaman Inertia.
  - `GET /pcare/referensi/diagnosa` (halaman ReferensiDiagnosa).
  - `GET /pcare/api/diagnosa` (API page Inertia yang memanggil controller yang sama).

## Uji Integrasi (cURL)
Bersihkan cache dulu:
```
php artisan optimize:clear && php artisan config:clear && php artisan route:clear && php artisan cache:clear
```
Jalankan server dev (contoh):
```
php -S 127.0.0.1:8011 -t public
```

### Legacy (pcare-rest)
Diagnosa dengan path segment:
```
curl -sS -D - http://127.0.0.1:8011/api/pcare/proxy/diagnosa/k/0/10
```
Hasil yang diharapkan: HTTP 200 dengan `data.response` berupa array objek diagnosa, mis. `{ kdDiag, nmDiag, nonSpesialis }`.

### v3.0 (pcare-rest-v3.0)
Ubah `.env` terlebih dahulu:
```
BPJS_PCARE_BASE_URL=https://apijkn.bpjs-kesehatan.go.id/pcare-rest-v3.0
```
Bersihkan cache, lalu uji dengan query params:
```
curl -sS -D - "http://127.0.0.1:8011/api/pcare/proxy/diagnosa?keyword=k&offset=0&limit=10"
```
Hasil: HTTP 200, `data.response` array siap pakai.

## Troubleshooting
- Error: `StartIndex cannot be less than zero` (400/50000)
  - Penyebab umum: `X-authorization` tidak diawali `Basic `. Pastikan format sesuai.
- Error: `HTTP 404` saat memanggil `/referensi/diagnosa` di base legacy
  - Jalur tersebut tidak tersedia di `pcare-rest`. Gunakan `diagnosa/{keyword}/{start}/{limit}`.
- Respon bukan array (string panjang)
  - Pastikan decrypt+decompress berjalan. Paket `nullpunkt/lz-string-php` harus terpasang.
- Waktu/timestamp
  - Pastikan jam server sinkron (NTP), karena timestamp dipakai untuk signature dan kunci dekripsi.

## Keamanan
- Seluruh decrypt + decompress dilakukan di server. Frontend tidak menerima komponen kunci.
- Jangan mencetak nilai signature/authorization ke log produksi.
- Simpan credential di `.env` dan jangan commit.

## Integrasi Mobile JKN (Antrean FKT)
Controller contoh ada di `public/Pcare/ReferensiPoliController.php` dan `ReferensiDokterController.php`:
- Signature: `base64(HMAC-SHA256(consId & timestamp, secret_key))`.
- Kunci dekripsi: `cons_id . secret_key . timestamp`.
- Decompress: `LZString::decompressFromEncodedURIComponent`.
- Rekomendasi: konsistenkan pola ke trait jika ingin arsitektur seragam seperti PCare.

## Perubahan Kode Terkait
- `BpjsTraits::buildPcareHeaders` → `X-authorization` menggunakan `Basic <base64(user:pass:appCode)>`.
- `PcareController::getDiagnosa` → mendukung dual-mode (legacy/v3.0) berdasarkan `BPJS_PCARE_BASE_URL`.
- `BpjsTraits::maybeDecryptAndDecompress` → memproses wrapper JSON (field `response`) dan menggantinya dengan hasil decode agar UI siap pakai.

## Contoh Bentuk Respon ke UI (setelah pemrosesan)
```
{
  "ok": true,
  "status": 200,
  "endpoint": "https://apijkn.bpjs-kesehatan.go.id/pcare-rest/diagnosa/k/0/10",
  "data": {
    "response": [
      { "kdDiag": "A18.4", "nmDiag": "Tuberculosis of skin and subcutaneous tissue", "nonSpesialis": true },
      { "kdDiag": "A48.3", "nmDiag": "Toxic shock syndrome", "nonSpesialis": false }
      // ... dst
    ],
    "metaData": { "message": "OK", "code": 200 }
  }
}
```

## Migrasi ke v3.0 — Checklist
- Ganti `BPJS_PCARE_BASE_URL` ke `.../pcare-rest-v3.0`.
- Cek bahwa `getDiagnosa` memakai query params (otomatis).
- Bersihkan cache Laravel.
- Uji cURL `/api/pcare/proxy/diagnosa?keyword=...&offset=...&limit=...`.

## Catatan Akhir
- Simpan kredensial dengan aman dan audit akses.
- Pastikan semua environment (dev/staging/prod) sinkron dalam konfigurasi.
- Dokumentasi ini menjadi referensi tim saat maintenance, debugging, dan pengembangan fitur baru di modul PCare.

## Monitoring Pengiriman Data ke BPJS

- Tujuan
  - Melacak tingkat keberhasilan pengiriman (success rate), kegagalan (failure rate), latensi, throughput per endpoint (mis. `pendaftaran`, `kunjungan`, referensi).
  - Menyediakan visibility per `no_rawat` dan per periode (harian/mingguan) untuk audit dan operasional.

- Sumber Data
  - Tabel `pcare_kunjungan_umum` (status `Terkirim`/`Gagal`, `noKunjungan`, `tglDaftar`, diagnosa, dokter, poli) — lihat migrasi.
  - Fallback di `reg_periksa` (`status_pcare`, `response_pcare`) bila tabel `pcare_kunjungan_umum` belum tersedia.
  - Log channel `bpjs` (request/response id, status, durasi, endpoint) untuk korelasi dan forensik.

- Rancangan Skema Tambahan (opsional)
  - Tabel `pcare_send_attempts` untuk mencatat tiap percobaan kirim:
    - Kolom: `id`, `no_rawat`, `endpoint`, `payload_hash`, `attempt_no`, `status` (`pending|success|failed`), `http_status`, `meta_code`, `error_message`, `duration_ms`, `timestamp`, `triggered_by` (user/id sistem), `correlation_id`.
    - Index: `no_rawat`, `endpoint`, `status`, `timestamp`, `payload_hash`.
    - Manfaat: statistik granular, audit trail, dan dasar fitur kirim ulang.

- KPI & Laporan
  - Success rate harian per endpoint dan per poli/dokter.
  - Distribusi kode HTTP dan `metaData.code` dari BPJS.
  - Rata-rata/median durasi (ms) per endpoint; p95/p99 untuk outlier.
  - Daftar top-10 error message dan root cause terbanyak.

- API Monitoring (usulan)
  - `GET /api/pcare/monitoring/summary?start=YYYY-MM-DD&end=YYYY-MM-DD` — agregasi KPI.
  - `GET /api/pcare/monitoring/attempts?status=failed&endpoint=pendaftaran` — daftar percobaan gagal.
  - `GET /api/pcare/monitoring/raw/{no_rawat}` — detail lengkap (payload ringkas, respons, log id).

- UI Monitoring (Inertia)
  - Halaman `Pcare/MonitoringPcare.jsx` dengan filter tanggal, endpoint, status; tabel attempts; panel detail.
  - Kolom utama: waktu, endpoint, `no_rawat`, status, HTTP/meta code, durasi, aksi `Kirim Ulang`.

- Alerting (opsional)
  - Daily digest ke Slack/Email jika failure rate > threshold (mis. >5%).
  - Notifikasi realtime untuk spike error tertentu (mis. 503 beruntun > N menit).

- Operasional
  - Retensi log `bpjs.log` mengikuti `config/logging.php` (daily, days 30). Gunakan `id` dari `pcareRequest` untuk korelasi.
  - Amankan logging: jangan cetak `X-signature`, `X-authorization`, `user_key`.

### Log Respon ke Tabel `pcare_bpjs_log`

Tujuan: menyimpan jejak setiap permintaan/resp BPJS (pendaftaran/kunjungan/antrean) per `no_rawat` untuk audit dan troubleshooting.

- Struktur tabel (usulan jika belum ada):
  - `id` bigint auto increment
  - `no_rawat` varchar(17) FK → `reg_periksa.no_rawat`
  - `endpoint` varchar(50) (contoh: `pendaftaran`, `kunjungan`, `antrean_add`, `antrean_panggil`)
  - `status` enum(`success`,`failed`)
  - `http_status` int
  - `meta_code` int null
  - `meta_message` varchar(255) null
  - `duration_ms` int null
  - `request_payload` json (disanitasi; tanpa header rahasia)
  - `response_body_raw` longtext (hasil sebelum/ sesudah decrypt)
  - `response_body_json` json null (hasil parse `maybeDecryptAndDecompress` bila valid)
  - `triggered_by` varchar(50) null (user/nik yang memicu)
  - `correlation_id` varchar(64) null (untuk mengaitkan percobaan ulang)
  - `created_at` timestamp, `updated_at` timestamp

- Indeks yang disarankan:
  - (`no_rawat`), (`endpoint`), (`status`,`created_at`), (`meta_code`)

- Keamanan: jangan simpan nilai `X-signature`, `X-authorization`, `user_key` dan mask nomor kartu jika perlu.

### Rencana Integrasi Otomatis Saat Registrasi (BPJ/PBI)

Alur: ketika menyimpan registrasi dan `kd_pj ∈ {BPJ,PBI}`, kirim payload pendaftaran ke BPJS lalu simpan hasilnya ke `pcare_bpjs_log`.

- Titik hook: setelah create di `RegistrationController::registerPatient` pada `app/Http/Controllers/RegistrationController.php:106`.
- Validasi penjamin: baca `kd_pj` dari `reg_periksa` yang baru dibuat.
- Pengiriman ke BPJS:
  - Gunakan endpoint internal `POST /api/pcare/pendaftaran` yang memetakan data RS → payload PCare. Rujukan: `app/Http/Controllers/Pcare/PcareController.php:1812`.
  - Decrypt+decompress respons memakai `BpjsTraits::maybeDecryptAndDecompress`. Rujukan: `app/Traits/BpjsTraits.php:1` dan pemakaian di `PcareController`.
- Pencatatan hasil:
  - Bentuk rekam log dengan field di atas (`endpoint='pendaftaran'`, `no_rawat`, `http_status`, `meta_code`, `meta_message`, `response_body_json`).
  - Simpan ke `pcare_bpjs_log` via `DB::table('pcare_bpjs_log')->insert([...])`.
  - Jika respons memuat `noUrut`, lanjutkan simpan ringkasan ke `pcare_pendaftaran`. Rujukan: `PcareController::savePcarePendaftaran` dipanggil pada `app/Http/Controllers/Pcare/PcareController.php:1965`.
- Konkurensi & reliabilitas:
  - Terapkan cache lock per `no_rawat` agar tidak terjadi duplikasi kirim.
  - Batasi retry otomatis untuk error 5xx/timeout; error 4xx dicatat sebagai `failed` tanpa retry.
- Otentikasi:
  - Jalankan dari proses server-side (controller/job) agar kredensial tidak pernah keluar ke frontend.

Implementasi bertahap yang disarankan:

1) Buat migrasi `create_pcare_bpjs_log_table` sesuai struktur di atas.
2) Buat model opsional `PcareBpjsLog` (atau langsung gunakan `DB::table`).
3) Tambahkan hook setelah `RegPeriksa::create(...)` di `RegistrationController::registerPatient` untuk:
   - Mengecek `kd_pj` (BPJ/PBI)
   - Memanggil `POST /api/pcare/pendaftaran` dengan `no_rawat` yang baru
   - Menangkap respons, mendekripsi, dan menulis ke `pcare_bpjs_log`
4) Tambahkan monitoring di UI (opsional): relasi 1→N ke `no_rawat` dan tampilkan meta code/message.
5) Dokumentasikan masking data sensitif dan periode retensi untuk tabel ini.

Catatan sinkronisasi:

- Jika `pcare_pendaftaran` sudah dibuat (lihat migrasi), tetap gunakan tabel tersebut sebagai ringkasan status kunjungan (noUrut, status). `pcare_bpjs_log` melengkapi sebagai audit trail detail.
- Endpoint `addPendaftaran` sudah memverifikasi penjamin BPJ/PBI dan mengembalikan struktur respons yang telah diproses. Rujukan: `app/Http/Controllers/Pcare/PcareController.php:1850-1994`.
## Rancangan Kirim Ulang Saat Gagal

- Prinsip Umum
  - Idempoten: hindari duplikasi pendaftaran/kunjungan. Periksa adanya `noKunjungan` atau gunakan endpoint `PUT` jika tersedia.
  - Batasi waktu kirim ulang (mis. hanya pada hari pelayanan atau kebijakan internal) untuk mencegah inkonsistensi.

- Pemicu Kirim Ulang
  - Manual: tombol `Kirim Ulang` pada halaman monitoring untuk baris `status=Gagal`.
  - Otomatis: job terjadwal (scheduler) dengan backoff eksponensial untuk kegagalan sementara (5xx/timeout).

- Alur Teknis Kirim Ulang (pendaftaran/kunjungan)
  - Endpoint API (usulan): `POST /api/pcare/resend/{no_rawat}?endpoint=pendaftaran`.
  - Server side:
    - Kunci concurrency (`cache lock`) per `no_rawat` untuk mencegah kirim paralel.
    - Bangun ulang payload dari data lokal (pasien, mapping poli/dokter, pemeriksaan, diagnosa) — gunakan pola di `PcareController::kirimKunjunganSehat`.
    - Jika sebelumnya sudah mendapatkan `noKunjungan`, lakukan validasi: skip atau alihkan ke `update`/`PUT` sesuai katalog.
    - Kirim via `BpjsTraits::pcareRequest` dengan header yang benar dan `Content-Type` sesuai endpoint.
    - Catat hasil ke `pcare_send_attempts` (opsional) dan update `pcare_kunjungan_umum.status` menjadi `Terkirim` bila sukses; simpan `noKunjungan`.

- Backoff & Kriteria Ulang
  - Kriteria retry otomatis: HTTP 5xx, timeout, kesalahan jaringan; batasi percobaan (mis. 3–5 kali) dengan jeda 1m, 5m, 15m.
  - Kesalahan 4xx (validasi/data) tidak diulang otomatis; tampilkan alasan di UI dan minta koreksi data.

- Audit & Keamanan
  - Simpan `triggered_by` (user) untuk kirim ulang manual.
  - Simpan ringkasan payload (hash + ringkas) alih-alih payload penuh untuk mengurangi risiko data sensitif.
  - Enforce peran/otorisasi untuk akses endpoint kirim ulang.

- Pencegahan Duplikasi
  - Dedup berdasarkan kombinasi `no_rawat + endpoint + payload_hash` di `pcare_send_attempts`.
  - Validasi `noKunjungan` sebelum kirim; jika ada, gunakan jalur update daripada membuat kunjungan baru.

- Observabilitas
  - Setiap kirim ulang menghasilkan entri attempt baru dengan `correlation_id` yang mengacu ke percobaan awal.
  - Grafik retry vs sukses per hari untuk memastikan strategi backoff efektif.

Dengan rancangan ini, tim operasional memiliki alat pemantau yang jelas, kemampuan kirim ulang yang aman dan idempoten, serta audit trail lengkap untuk maintenance dan kepatuhan.
