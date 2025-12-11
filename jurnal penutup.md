# Jurnal Penutup (Closing Entries)

Jurnal penutup adalah ayat jurnal yang dibuat pada akhir periode akuntansi untuk menutup akun sementara (akun nominal) seperti pendapatan dan beban, serta akun pembantu modal (prive dan ikhtisar laba/rugi), lalu mentransfer hasilnya ke akun permanen (modal atau laba ditahan). Langkah ini memastikan akun sementara kembali ke saldo nol ketika memulai periode berikutnya dan neraca akhir periode mencerminkan posisi keuangan yang riil.

## Tujuan dan Fungsi
- Memulai periode baru dengan akun pendapatan dan beban bernilai nol.
- Menentukan saldo akhir akun modal/laba ditahan dengan benar berdasarkan laba/rugi bersih.
- Memisahkan transaksi antar periode dan memudahkan proses audit.
- Menyajikan laporan akhir periode yang hanya berisi aset, liabilitas, dan ekuitas.
- Menyiapkan neraca saldo setelah penutupan (post-closing trial balance) yang berisi akun riil saja.

## Akun yang Ditutup
- Pendapatan: ditutup ke `Ikhtisar Laba/Rugi` dengan mendebit seluruh akun pendapatan.
- Beban: ditutup ke `Ikhtisar Laba/Rugi` dengan mengkredit seluruh akun beban.
- Ikhtisar Laba/Rugi → Modal/Laba Ditahan:
  - Jika laba bersih: debit `Ikhtisar Laba/Rugi`, kredit `Modal`/`Laba Ditahan`.
  - Jika rugi bersih: debit `Modal`/`Laba Ditahan`, kredit `Ikhtisar Laba/Rugi`.
- Prive (untuk perorangan/persekutuan): debit `Modal`, kredit `Prive`. Pada perseroan, gunakan `Dividen` yang umumnya ditutup ke `Laba Ditahan`.

## Langkah Penyusunan
1. Tutup seluruh akun pendapatan ke `Ikhtisar Laba/Rugi`.
2. Tutup seluruh akun beban ke `Ikhtisar Laba/Rugi`.
3. Tutup saldo `Ikhtisar Laba/Rugi` (laba/rugi bersih) ke `Modal` atau `Laba Ditahan` sesuai bentuk perusahaan.
4. Tutup akun `Prive` (atau `Dividen`) ke `Modal`/`Laba Ditahan` bila ada.

## Contoh Praktis
Asumsi di akhir periode: Pendapatan Rp500.000.000; Beban Gaji Rp120.000.000; Beban Sewa Rp60.000.000; Beban Listrik Rp20.000.000; Beban Penyusutan Rp30.000.000; Prive Rp10.000.000. Laba bersih = Rp500.000.000 − Rp230.000.000 = Rp270.000.000.

Penutupan dilakukan sebagai berikut:

```text
1) Menutup pendapatan
   Dr Pendapatan                         500.000.000
      Cr Ikhtisar Laba/Rugi                              500.000.000

2) Menutup beban
   Dr Ikhtisar Laba/Rugi                 230.000.000
      Cr Beban Gaji                                       120.000.000
      Cr Beban Sewa                                        60.000.000
      Cr Beban Listrik                                     20.000.000
      Cr Beban Penyusutan                                  30.000.000

3) Menutup ikhtisar laba/rugi ke modal/laba ditahan (laba)
   Dr Ikhtisar Laba/Rugi                 270.000.000
      Cr Modal/Laba Ditahan                                270.000.000

4) Menutup prive
   Dr Modal/Laba Ditahan                  10.000.000
      Cr Prive                                             10.000.000
```

Jika perusahaan rugi, ayat pada langkah (3) dibalik: `Dr Modal/Laba Ditahan`, `Cr Ikhtisar Laba/Rugi` sebesar rugi bersih.

## Catatan untuk Perusahaan Dagang
- Pendapatan yang ditutup adalah pendapatan usaha (mis. penjualan bersih setelah retur/potongan) dan pendapatan lain-lain.
- Seluruh beban termasuk `Beban Pokok Penjualan (HPP)` dan beban operasional ditutup ke `Ikhtisar Laba/Rugi`.
- Metode persediaan periodik memerlukan penyesuaian persediaan dan perhitungan HPP terlebih dahulu sebelum penutupan; metode perpetual biasanya lebih langsung karena saldo selalu mutakhir.

## Jurnal Penutup vs Jurnal Pembalik
- Jurnal Penutup: dibuat di akhir periode; wajib untuk menutup akun sementara agar saldo nol di periode berikutnya.
- Jurnal Pembalik: dibuat di awal periode berikutnya; opsional, digunakan untuk membalik jurnal penyesuaian tertentu (mis. beban terakru, pendapatan terakru) agar pencatatan transaksi aktual menjadi lebih sederhana.

## Neraca Saldo Setelah Penutupan
Setelah semua ayat penutup diposting, neraca saldo setelah penutupan hanya memuat akun riil: aset, liabilitas, dan ekuitas (`Modal/Laba Ditahan`). Akun pendapatan, beban, `Ikhtisar Laba/Rugi`, `Prive/Dividen` memiliki saldo nol dan tidak muncul.

## Praktik Baik
- Pastikan seluruh jurnal penyesuaian telah dibuat sebelum menyusun jurnal penutup.
- Gunakan `Ikhtisar Laba/Rugi` sebagai akun perantara untuk mentransfer hasil ke `Modal/Laba Ditahan` sesuai bentuk entitas (perorangan, persekutuan, perseroan).
- Bedakan penggunaan `Prive` (untuk perorangan/persekutuan) dan `Dividen` (untuk perseroan) saat penutupan.
- Dokumentasikan setiap ayat penutup dan rekonsiliasi terhadap laporan laba rugi.

## Contoh Metode Periodik vs Perpetual

### Metode Periodik (Contoh Angka)
Asumsi: Pendapatan Rp300.000.000; Persediaan Awal Rp40.000.000; Pembelian Rp180.000.000; Retur Pembelian Rp10.000.000; Beban Angkut Pembelian Rp5.000.000; Persediaan Akhir Rp50.000.000; Beban Operasional Rp30.000.000.

Perhitungan HPP (periodik):
`HPP = Persediaan Awal + Pembelian + Beban Angkut − Retur − Persediaan Akhir = 40 + 180 + 5 − 10 − 50 = 165 (juta)`.

Ayat penutup (setelah jurnal penyesuaian persediaan/HPP disusun):

```text
1) Menutup pendapatan
   Dr Pendapatan                         300.000.000
      Cr Ikhtisar Laba/Rugi                              300.000.000

2) Menutup beban (termasuk HPP periodik)
   Dr Ikhtisar Laba/Rugi                 195.000.000
      Cr HPP                                               165.000.000
      Cr Beban Operasional                                30.000.000

3) Menutup ikhtisar laba/rugi ke modal/laba ditahan (laba 105 juta)
   Dr Ikhtisar Laba/Rugi                 105.000.000
      Cr Modal/Laba Ditahan                                105.000.000
```

Catatan: Pada metode periodik, penentuan `HPP` dilakukan di jurnal penyesuaian (mengakui persediaan akhir dan menghapus persediaan awal serta menggabungkan akun pembelian terkait). Ayat penutup di atas menganggap `HPP` sudah siap sebagai beban untuk ditutup.

### Metode Perpetual (Contoh Angka)
Asumsi: Pendapatan Rp300.000.000; `Beban Pokok Penjualan (COGS)` yang telah terekam sepanjang periode Rp160.000.000; Beban Operasional Rp30.000.000.

Ayat penutup:

```text
1) Menutup pendapatan
   Dr Pendapatan                         300.000.000
      Cr Ikhtisar Laba/Rugi                              300.000.000

2) Menutup beban (COGS dicatat sepanjang periode)
   Dr Ikhtisar Laba/Rugi                 190.000.000
      Cr Beban Pokok Penjualan                             160.000.000
      Cr Beban Operasional                                 30.000.000

3) Menutup ikhtisar laba/rugi ke modal/laba ditahan (laba 110 juta)
   Dr Ikhtisar Laba/Rugi                 110.000.000
      Cr Modal/Laba Ditahan                                110.000.000
```

Catatan: Pada metode perpetual, persediaan dan `COGS` telah diperbarui setiap transaksi, sehingga tidak perlu perhitungan `HPP` di akhir periode; penutupan cukup terhadap akun pendapatan dan beban (termasuk `COGS`).

## Checklist Penutupan
- Pastikan jurnal penyesuaian selesai (akru, penyusutan, amortisasi, persediaan/HPP untuk periodik).
- Verifikasi saldo `Persediaan Akhir` dan perhitungan `HPP` (khusus periodik).
- Tutup seluruh akun pendapatan ke `Ikhtisar Laba/Rugi`.
- Tutup seluruh akun beban ke `Ikhtisar Laba/Rugi` (termasuk `HPP/COGS`).
- Tutup saldo `Ikhtisar Laba/Rugi` ke `Modal/Laba Ditahan`.
- Tutup `Prive` atau `Dividen` ke `Modal/Laba Ditahan` bila ada.
- Susun `Neraca Saldo Setelah Penutupan` (hanya aset, liabilitas, ekuitas).
- Arsipkan bukti pendukung dan rekonsiliasi terhadap laporan laba rugi.

## Referensi
- https://www.jurnal.id/id/blog/2017-pengertian-dan-cara-membuat-jurnal-penutup/
- https://finance.detik.com/berita-ekonomi-bisnis/d-6737137/jurnal-penutup-pengertian-tujuan-contoh-dan-cara-membuatnya
- https://www.gramedia.com/literasi/jurnal-penutup/
- https://www.zenius.net/blog/jurnal-penutup/
- https://www.kompas.com/skola/read/2022/04/19/113000169/jurnal-penutup-pengertian-tujuan-dan-fungsi-tahap-serta-contohnya
- https://accurate.id/akuntansi/pengertian-jurnal-penutup/
- https://www.hashmicro.com/id/blog/jurnal-penutup/
- https://www.impactfirst.co/id/c/jurnal-penutup-adalah
- https://www.ppmschool.ac.id/jurnal-penutup/
