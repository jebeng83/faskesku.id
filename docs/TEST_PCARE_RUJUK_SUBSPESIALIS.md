# Test Save PCare Rujuk Subspesialis

Dokumen ini menjelaskan cara melakukan uji coba menyimpan hasil response kirim kunjungan + Rujuk ke tabel `pcare_rujuk_subspesialis` via terminal.

## Command yang Tersedia

```bash
php artisan test:pcare-rujuk-subspesialis {no_rawat} [options]
```

## Parameter

- `no_rawat` (required): Nomor rawat untuk testing

## Options

- `--no-kunjungan`: Nomor kunjungan dari BPJS (opsional, jika tidak diberikan akan menggunakan contoh)
- `--payload-json`: JSON payload untuk testing (opsional, jika tidak diberikan akan dibuat otomatis dari data database)

## Contoh Penggunaan

### 1. Menggunakan data otomatis dari database

```bash
php artisan test:pcare-rujuk-subspesialis "2025/11/13/000001"
```

Command ini akan:
- Mengambil data dari `reg_periksa` berdasarkan `no_rawat`
- Membuat payload otomatis dari data yang ada di database
- Menyimpan ke tabel `pcare_rujuk_subspesialis`

### 2. Dengan noKunjungan spesifik

```bash
php artisan test:pcare-rujuk-subspesialis "2025/11/13/000001" --no-kunjungan="112516161125Y001193"
```

### 3. Dengan payload JSON custom

```bash
php artisan test:pcare-rujuk-subspesialis "2025/11/13/000001" \
  --no-kunjungan="112516161125Y001193" \
  --payload-json='{
    "no_rawat": "2025/11/13/000001",
    "noKartu": "0001441909697",
    "kdPoli": "001",
    "keluhan": "Pasien mengeluh sakit kepala",
    "kdSadar": "01",
    "kdStatusPulang": "4",
    "kdDokter": "DR001",
    "kdDiag1": "A00.9",
    "tglDaftar": "2025-11-13",
    "tglPulang": "2025-11-13",
    "rujukLanjut": {
      "kdppk": "11251616",
      "tglEstRujuk": "20-11-2025",
      "subSpesialis": {
        "kdSubSpesialis1": "65",
        "kdSarana": "1"
      }
    },
    "kdTacc": -1,
    "alergiMakan": "00",
    "alergiUdara": "00",
    "alergiObat": "00",
    "kdPrognosa": "01"
  }'
```

## Struktur Payload

Payload harus mengikuti struktur berikut:

```json
{
  "no_rawat": "2025/11/13/000001",
  "noKartu": "0001441909697",
  "kdPoli": "001",
  "keluhan": "Keluhan pasien",
  "kdSadar": "01",
  "kdStatusPulang": "4",
  "kdDokter": "DR001",
  "kdDiag1": "A00.9",
  "kdDiag2": null,
  "kdDiag3": null,
  "tglDaftar": "2025-11-13",
  "tglPulang": "2025-11-13",
  "rujukLanjut": {
    "kdppk": "11251616",
    "tglEstRujuk": "20-11-2025",
    "subSpesialis": {
      "kdSubSpesialis1": "65",
      "kdSarana": "1"
    }
  },
  "kdTacc": -1,
  "alasanTacc": null,
  "alergiMakan": "00",
  "alergiUdara": "00",
  "alergiObat": "00",
  "kdPrognosa": "01"
}
```

## Output

Command akan menampilkan:
1. Status pengecekan tabel dan data
2. Payload yang digunakan
3. Hasil penyimpanan ke database
4. Data yang tersimpan dalam format tabel

## Troubleshooting

### Error: Tabel tidak ditemukan
Pastikan tabel `pcare_rujuk_subspesialis` sudah dibuat di database.

### Error: Data reg_periksa tidak ditemukan
Pastikan `no_rawat` yang digunakan valid dan ada di tabel `reg_periksa`.

### Data tidak tersimpan
Periksa log di `storage/logs/bpjs-*.log` untuk melihat error detail.

## Catatan

- Command ini menggunakan reflection untuk mengakses method protected `savePcareRujukSubspesialis`
- Data yang disimpan akan di-upsert berdasarkan `no_rawat`
- Jika data sudah ada, akan di-update; jika belum ada, akan di-insert

