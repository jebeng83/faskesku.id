# Panduan Mengambil File dari Branch Lain (Gabungkan Parsial)

Dokumen ini menjelaskan cara mengambil satu atau beberapa file dari branch lain tanpa melakukan merge penuh. Teknik ini mempermudah pengembangan lanjutan ketika kita hanya membutuhkan perubahan spesifik.

## Tujuan

- Menyalin file tertentu dari branch sumber ke branch target
- Menghindari merge besar yang berisiko konflik dan regressi
- Menjaga riwayat perubahan tetap jelas

## Prasyarat

- Git 2.23+ (untuk perintah `git restore`) atau gunakan alternatif `git checkout -- <path>`
- Branch target sudah aktif (checkout)
- Perubahan lokal bersih atau sudah di-commit

## Metode Utama: git restore (disarankan)

1. Checkout ke branch target (misal: `Algojo`):

```bash
git checkout Algojo
```

2. Pratinjau konten file di branch sumber (opsional):

```bash
# Lihat isi file di branch sumber
git show aqua:resources/js/Layouts/LanjutanRalanLayout.jsx | head -n 40

# Bandingkan versi file di branch sumber vs target
git diff aqua -- resources/js/Layouts/LanjutanRalanLayout.jsx
```

3. Ambil file dari branch sumber ke branch aktif:

```bash
# Sintaks umum
git restore -s <branch_sumber> -- <path_file>

# Contoh nyata
git restore -s aqua -- resources/js/Layouts/LanjutanRalanLayout.jsx
git restore -s aqua -- resources/js/Components/LanjutanRalanSidebar.jsx
```

4. Tinjau perubahan lalu stage & commit:

```bash
git diff -- resources/js/Layouts/LanjutanRalanLayout.jsx resources/js/Components/LanjutanRalanSidebar.jsx
git add resources/js/Layouts/LanjutanRalanLayout.jsx resources/js/Components/LanjutanRalanSidebar.jsx
git commit -m "Sinkronisasi layout & sidebar dari branch aqua untuk Lanjutan Ralan"
```

5. Push ke remote:

```bash
git push origin Algojo
```

> Catatan: Untuk proyek ini, jalankan pemeriksaan kualitas setelah perubahan kode: `npm run lint` dan `npm run typecheck`. Tidak perlu menjalankan keduanya untuk perubahan dokumentasi.

## Metode Alternatif: checkout gaya legacy

Jika `git restore` tidak tersedia, gunakan:

```bash
git checkout <branch_sumber> -- <path_file>

# Contoh
git checkout aqua -- resources/js/Layouts/LanjutanRalanLayout.jsx
```

Lanjutkan dengan `git add`, `git commit`, dan `git push` seperti biasa.

## Metode Alternatif: git show + redirect (force replace)

Untuk kasus darurat (mis. scripting), Anda bisa menulis ulang file langsung dari branch sumber:

```bash
git show aqua:resources/js/Layouts/LanjutanRalanLayout.jsx > resources/js/Layouts/LanjutanRalanLayout.jsx
git add resources/js/Layouts/LanjutanRalanLayout.jsx
git commit -m "Replace LanjutanRalanLayout.jsx dari branch aqua"
```

Gunakan dengan hati-hati karena ini menimpa konten file tanpa staging interaktif.

## Contoh Nyata di Repo Ini

- Mengambil `LanjutanRalanLayout.jsx` dan `LanjutanRalanSidebar.jsx` dari branch `aqua` untuk memperbaiki menu Odontogram di branch `Algojo`.
- Melakukan push dari branch lokal berbeda ke remote `Algojo`:

```bash
git push origin algojo-aqua-rawatjalan:Algojo
```

## Sinkronisasi Multi-File

Ambil beberapa file sekaligus dengan satu perintah:

```bash
git restore -s aqua -- \
  resources/js/Layouts/LanjutanRalanLayout.jsx \
  resources/js/Components/LanjutanRalanSidebar.jsx
```

## Tips dan Praktik Baik

- Hindari merge penuh jika tujuan hanya menyalin 1–2 file.
- Periksa dependensi/import terkait; jika file baru membutuhkan komponen lain, sinkronkan juga komponen pendukungnya.
- Gunakan pesan commit yang deskriptif untuk memudahkan audit perubahan.
- Setelah perubahan yang berpengaruh ke UI/logic, jalankan `npm run lint` dan `npm run typecheck` untuk menjaga kualitas.
- Pertimbangkan membuat branch sementara untuk pekerjaan integrasi, lalu merge fast-forward ke branch utama.

## Pembersihan Branch Sementara

Setelah integrasi selesai, hapus branch sementara agar repo rapi:

```bash
# Hapus lokal
git branch -d algojo-aqua-rawatjalan

# Hapus remote (jika ada)
git push origin --delete algojo-aqua-rawatjalan
```

Dengan panduan ini, tim dapat menyalin perubahan spesifik lintas branch secara aman dan terkontrol tanpa membawa keseluruhan riwayat atau risiko konflik besar.

