# Panduan Test Referensi SRK PCare

## Masalah yang Diperbaiki

Endpoint `/pcare/api/srk/rekap` sebelumnya selalu mengembalikan error 503. Perbaikan yang dilakukan:

1. **Validasi konfigurasi** - Memastikan base URL dikonfigurasi sebelum melakukan request
2. **Error handling yang lebih baik** - Menangani semua kasus error dengan lebih detail
3. **Logging yang lebih informatif** - Menambahkan informasi debug untuk troubleshooting
4. **Null safety** - Memastikan tidak ada null pointer exception

## Cara Test via Terminal

### Opsi 1: Menggunakan Script PHP

```bash
# Test dengan query kosong
php scripts/test_srk_rekap.php

# Test dengan query "DM"
php scripts/test_srk_rekap.php "DM"

# Test dengan parameter lengkap
php scripts/test_srk_rekap.php "DM" 0 10
```

### Opsi 2: Menggunakan cURL Script

```bash
# Test dengan query kosong
bash scripts/test_srk_curl.sh

# Test dengan query "DM"
bash scripts/test_srk_curl.sh "DM"

# Test dengan parameter lengkap
bash scripts/test_srk_curl.sh "DM" 0 10
```

### Opsi 3: Menggunakan cURL Langsung

**PENTING:** Pastikan menggunakan URL yang benar sesuai konfigurasi APP_URL (biasanya `http://127.0.0.1:8000`)

```bash
# Test endpoint tanpa auth (test route) - Gunakan port 8000
curl -v "http://127.0.0.1:8000/pcare/api/srk/rekap/test?q=DM&start=0&limit=25"

# Atau jika menggunakan domain lain, sesuaikan dengan APP_URL
curl -v "http://your-domain.com/pcare/api/srk/rekap/test?q=DM&start=0&limit=25"

# Test endpoint dengan auth (production route)
curl -v \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  "http://127.0.0.1:8000/pcare/api/srk/rekap?q=DM&start=0&limit=25"
```

## Parameter

- `q` (optional): Keyword pencarian, contoh: "DM", "HT", "Diabetes"
- `start` (optional): Offset untuk pagination, default: 0
- `limit` (optional): Jumlah data per halaman, default: 25

## Troubleshooting

### Error 503: Service Unavailable

1. **Cek konfigurasi base URL:**
   ```bash
   php artisan tinker
   >>> config('bpjs.pcare.base_url')
   ```

2. **Cek koneksi ke server BPJS:**
   ```bash
   curl -v https://apijkn.bpjs-kesehatan.go.id/pcare-rest/
   ```

3. **Cek log aplikasi:**
   ```bash
   tail -f storage/logs/bpjs.log
   ```

### Error 422: Unprocessable Entity

- Pastikan `BPJS_PCARE_BASE_URL` sudah dikonfigurasi di `.env`
- Pastikan semua kredensial BPJS sudah diisi dengan benar

### Error 401: Unauthorized

- Cek `cons_id_pcare` dan `secretkey_pcare` di tabel `setting_bridging_bpjs`
- Cek `userkey_pcare` di tabel `setting_bridging_bpjs`

## Contoh Response Sukses

```json
{
  "metaData": {
    "code": "200",
    "message": "OK"
  },
  "response": {
    "list": [
      {
        "kdPenyakit": "E11.9",
        "nmPenyakit": "Diabetes Melitus Tipe 2",
        "jumlah": 150
      }
    ],
    "count": 1
  }
}
```

## Contoh Response Error

```json
{
  "metaData": {
    "code": "503",
    "message": "Gagal terhubung ke BPJS PCare (Referensi SRK): Connection timeout"
  },
  "response": {
    "list": [],
    "count": 0
  }
}
```

