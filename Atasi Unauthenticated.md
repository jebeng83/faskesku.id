# Mengatasi HTTP 401 Unauthenticated pada API (Laravel + Session/CSRF)

## Ringkasan Gejala
- Response HTTP: 401 Unauthenticated saat memanggil endpoint yang berada di grup middleware `web + auth`.
- Header respons contoh:
  - Access-Control-Allow-Origin: *
  - Cache-Control: no-cache, private
  - Set-Cookie: faskeskuid-session=...
  - Content-Type: application/json
  - Body: {"message":"Unauthenticated."}

Gejala ini muncul karena permintaan tidak membawa sesi login yang valid dan/atau token CSRF yang sesuai untuk metode state-changing (POST/PUT/DELETE).

## Penyebab Umum
- Belum login (tidak ada cookie sesi yang valid).
- Tidak melakukan preflight CSRF (khusus SPA Sanctum: belum mengakses `/sanctum/csrf-cookie`).
- Permintaan tidak mengirim cookie (credential) karena `withCredentials` tidak diaktifkan.
- Header CSRF tidak dikirim (untuk SPA, biasanya `X-XSRF-TOKEN` bersumber dari cookie `XSRF-TOKEN`).
- Salah domain atau skema sehingga cookie tidak terkirim (mis. pakai `localhost` sementara sesi diset pada `127.0.0.1`).
- CORS tidak mengizinkan kredensial.

## Solusi untuk SPA (Axios/Fetch)
- Selalu panggil preflight CSRF sebelum request POST/PUT/DELETE:

```js
await axios.get('/sanctum/csrf-cookie', { withCredentials: true })
```

- Gunakan konfigurasi berikut pada setiap request API:
  - `withCredentials: true`
  - Header `Accept: application/json`
  - Header `X-Requested-With: XMLHttpRequest`

Contoh DELETE (Axios):

```js
await axios.get('/sanctum/csrf-cookie', { withCredentials: true })
await axios.delete(`/api/odontogram/medis/${rm}/${tanggal}/${elemen}`, {
  withCredentials: true,
  headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
})
```

Catatan:
- Pastikan user sudah login di aplikasi (cookie sesi valid). Tanpa login, Sanctum akan tetap mengembalikan 401 saat memanggil endpoint yang dilindungi `auth`.

## Solusi via Terminal (cURL)
Metode ini membutuhkan cookie sesi dan token CSRF.

1) Ambil cookie CSRF:

```bash
curl -i -c cookies.txt -b cookies.txt \
  -H "Accept: application/json" \
  -H "X-Requested-With: XMLHttpRequest" \
  http://127.0.0.1:8000/sanctum/csrf-cookie
```

2) Pastikan sudah login (opsi):
- Cara praktis: login via browser, salin cookie dari DevTools (faskeskuid-session dan XSRF-TOKEN) ke file `cookies.txt` atau langsung tempel ke header `Cookie:` pada cURL.
- Alternatif: jika ada endpoint API login, panggil melalui cURL lalu simpan cookie hasilnya di `cookies.txt`.

3) Kirim DELETE dengan cookie dan header CSRF:

```bash
curl -i -X DELETE \
  -b cookies.txt \
  -H "Accept: application/json" \
  -H "X-Requested-With: XMLHttpRequest" \
  -H "X-XSRF-TOKEN: <nilai_XSRF-TOKEN_yang_sudah_di-URL-decode>" \
  "http://127.0.0.1:8000/api/odontogram/medis/000019/2026-01-06/13"
```

Catatan:
- Nilai `XSRF-TOKEN` (dari cookie) harus di-URL-decode sebelum dikirim sebagai `X-XSRF-TOKEN`.
- Jika tetap 401, pastikan cookie sesi (`faskeskuid-session=...`) benar-benar milik sesi user yang sudah login.

## Solusi di Postman
- Aktifkan Interceptor/Manage Cookies agar Postman menyimpan cookie.
- Panggil `GET /sanctum/csrf-cookie` terlebih dahulu.
- Tambahkan header `X-Requested-With: XMLHttpRequest`.
- Pastikan cookie `XSRF-TOKEN` dan cookie sesi terbawa saat memanggil POST/PUT/DELETE.

## Konfigurasi Server yang Perlu Dicek
- `config/cors.php`:
  - `supports_credentials` = true
  - `allowed_origins`/`allowed_origins_pattern` sesuai domain Anda
  - `allowed_methods` mencakup metode yang dibutuhkan
- `config/session.php`:
  - `same_site` = 'lax' (default dev), atau disesuaikan jika lintas subdomain
  - `domain` = null (dev), atau diset ke domain aplikasi jika perlu
- Gunakan host yang konsisten (contoh: selalu `http://127.0.0.1:8000`) agar cookie tidak tertolak.

## Verifikasi Route dan Metode
- Pastikan pemanggilan metode HTTP sesuai definisi route:

```bash
php artisan route:list | grep odontogram
```

- Contoh yang benar:
  - GET daftar by pasien: `/api/odontogram/pasien/{no_rkm_medis}`
  - POST simpan by pasien: `/api/odontogram/medis/{no_rkm_medis}`
  - DELETE hapus by pasien+tanggal+elemen: `/api/odontogram/medis/{no_rkm_medis}/{tanggal}/{elemen_gigi}`

## Jalan Pintas Debug (Tanpa Autentikasi)
Untuk pengujian lokal yang tidak bergantung sesi+CSRF, gunakan perintah Artisan khusus yang mengakses database langsung:

```bash
php artisan debug:odontogram-delete <no_rkm_medis> <YYYY-MM-DD> <elemen_FDI>
```

Contoh:

```bash
php artisan debug:odontogram-delete 000019 2026-01-06 13
```

Jika berhasil, akan menampilkan "Berhasil menghapus entri odontogram".

## Checklist Penyelesaian
- [ ] User sedang login di aplikasi.
- [ ] Preflight CSRF sudah dipanggil (`/sanctum/csrf-cookie`).
- [ ] `withCredentials: true` aktif dan header `X-Requested-With: XMLHttpRequest` dikirim.
- [ ] Cookie `faskeskuid-session` dan `XSRF-TOKEN` ikut dalam request.
- [ ] Domain/host konsisten (hindari mismatch `localhost` vs `127.0.0.1`).
- [ ] CORS mendukung kredensial dan metode yang diperlukan.
- [ ] Route dan metode HTTP sesuai (hindari 405 Method Not Allowed).

## Referensi Kode Terkait
- Contoh penggunaan CSRF di frontend: `resources/js/Pages/Odontogram/odontogram.jsx` (panggilan `axios.get('/sanctum/csrf-cookie')` dan `withCredentials`).
- Endpoint DELETE di server: `routes/api.php` dan `app/Http/Controllers/Odontogram/OdontogramController.php`.
- Command debug CLI: `app/Console/Commands/OdontogramDeleteCommand.php`.

