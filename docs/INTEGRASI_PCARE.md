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