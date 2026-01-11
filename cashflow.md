# Analisa Mendalam DlgCashflow.java (Arus Kas)

## Ringkasan Eksekutif
- Modul DlgCashflow menampilkan arus kas berbasis accrual: Kas Masuk diambil dari akun Pendapatan (balance K) dan Kas Keluar dari akun Beban/Biaya (balance D), keduanya dijumlahkan dengan saldo awal akun terkait pada rentang tahun.
- Kas Awal dijumlah dari saldo awal akun Neraca dengan sifat debit (balance D), tanpa penyaringan khusus Kas/Bank.
- Total Kas dihitung sebagai A + (B − C). Pendekatan ini mencampur saldo awal aset (debit) dengan kinerja accrual (pendapatan dan beban), bukan pergerakan kas murni.
- Terdapat blok kode alternatif yang dikomentari: menambahkan pergerakan jurnal ke Kas Awal, dan memasukkan akun Neraca balance K/D ke Kas Masuk/Keluar; saat ini tidak digunakan.

## Struktur & Alur
- UI: JDialog Swing dengan tabel 3 kolom yang diisi bertahap per seksi (A, B, C, Total).
- Filter periode: menggunakan tanggal jurnal (posting) untuk B/C; saldo awal diambil berdasarkan rentang tahun dari tanggal dari/sampai.
- Threading: eksekusi pencarian dilakukan di background (single-thread executor) untuk menjaga responsif UI.

## Rincian Perhitungan

### A. Kas Awal
- Query: saldo_awal dari tabel rekeningtahun untuk akun Neraca (tipe='N') dengan sifat debit (balance='D'), dijumlahkan per akun sepanjang rentang tahun.
- Implementasi: baca, jumlahkan per akun, tambahkan ke total Kas Awal, tampilkan baris jika ≠ 0.
- Kode referensi: [DlgCashflow.java:310-361](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgCashflow.java#L310-L361)

### B. Kas Masuk (Pendapatan)
- Query: untuk akun Laporan (tipe='R') dengan balance='K', agregasi per akun: (SUM(kredit) − SUM(debet)) selama periode tanggal jurnal.
- Penyesuaian: setiap akun ditambah saldo_awal akun yang sama (rekeningtahun) dalam rentang tahun.
- Akumulasi: jumlahkan semua baris menjadi total Penerimaan.
- Kode referensi: [DlgCashflow.java:363-415](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgCashflow.java#L363-L415)

### C. Kas Keluar (Beban/Biaya)
- Query: untuk akun Laporan (tipe='R') dengan balance='D', agregasi per akun: (SUM(debet) − SUM(kredit)) selama periode tanggal jurnal.
- Penyesuaian: setiap akun ditambah saldo_awal akun yang sama (rekeningtahun) dalam rentang tahun.
- Akumulasi: jumlahkan semua baris menjadi total Pengeluaran.
- Kode referensi: [DlgCashflow.java:416-466](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgCashflow.java#L416-L466)

### Total Kas
- Rumus: A + (B − C)
- Kode referensi: [DlgCashflow.java:467-470](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgCashflow.java#L467-L470)

## Catatan Komentar & Perilaku Tersembunyi
- Konversi nilai negatif ke absolut pada beberapa bagian dikomentari, sehingga nilai negatif dapat muncul sesuai realitas accrual.
- Ada blok yang menggabungkan pergerakan jurnal (debet−kredit) ke Kas Awal; saat ini dinonaktifkan.
- Ada blok yang menambahkan akun Neraca (tipe='N') balance K/D ke Kas Masuk/Keluar; saat ini dinonaktifkan.
- Kode referensi bagian komentar: [DlgCashflow.java:326-333](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgCashflow.java#L326-L333), [DlgCashflow.java:341-360](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgCashflow.java#L341-L360), [DlgCashflow.java:381-384](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgCashflow.java#L381-L384), [DlgCashflow.java:444-464](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgCashflow.java#L444-L464)

## Evaluasi Akuntansi
- Basis: accrual base untuk B (Pendapatan) dan C (Beban). Ini sesuai praktik laporan laba rugi, bukan cash flow langsung.
- Kas Awal: menjumlah saldo awal seluruh akun debit Neraca, bukan hanya Kas/Bank. Secara semantik, label “Kas Awal” berpotensi membingungkan karena bukan saldo kas murni.
- Konsekuensi: Total Kas (A + (B − C)) merefleksikan saldo awal aset debit ditambah selisih accrual, sehingga tidak merepresentasikan arus kas aktual seperti “cash flow statement” IFRS/PSAK.

## Perbedaan vs Implementasi Web Kita
- Saat ini di web, perhitungan B/C sudah dikembalikan ke accrual (Pendapatan/Beban) dan menambahkan saldo awal akun terkait, sejalan dengan DlgCashflow.
- Perbedaan utama: Kas Awal di web disaring ke akun Kas/Bank (nm_rek mengandung KAS/BANK atau kd_rek prefix 11), sedangkan DlgCashflow menjumlah semua akun Neraca debit.
- Rekomendasi: selaraskan definisi Kas Awal sesuai kebutuhan bisnis. Jika ingin 100% meniru DlgCashflow, gunakan seluruh akun ‘N’ balance D; jika ingin kas murni, batasi ke akun Kas/Bank.

## Rekomendasi Implementasi
- Selaraskan kriteria akun:
  - Pendapatan: tipe='R' & balance='K' (atau prefix 41/42/43, atau nm_rek mengandung “Pendapatan”).
  - Beban/biaya: tipe='R' & balance='D' (atau prefix 5, atau nm_rek “Beban”/“Biaya”).
  - Kas Awal: putuskan antara semua Neraca debit (N/D) vs spesifik Kas/Bank.
- Periode saldo awal: gunakan tahun start saja (bukan rentang multi-tahun) agar definisi “saldo awal periode” akurat; jika periode lintas tahun, pertimbangkan saldo awal di tahun awal + akumulasi mutasi antar tahun.
- Optimasi query:
  - Hindari query per akun dalam loop untuk saldo_awal; gunakan map saldo_awal per akun (sudah kita lakukan di server web).
  - Agregasi SUM di DB lalu olah di memori untuk gabungan per akun.
- Konsistensi tampilan:
  - Pertahankan tanda negatif pada B/C untuk transparansi accrual; gunakan styling warna positif/negatif.
  - Tampilkan total akhir dengan rumus eksplisit A + (B − C).
- Validasi & rekonsiliasi:
  - Pastikan jurnal balanced (SUM debet == SUM kredit) sebelum agregasi.
  - Audit akun yang masuk kategori agar tidak ada akun salah klasifikasi.

## SQL Setara (Contoh)

```sql
-- Kas Awal (opsi kas murni):
SELECT r.kd_rek, r.nm_rek, SUM(rt.saldo_awal) AS amount
FROM rekening r
JOIN rekeningtahun rt ON rt.kd_rek = r.kd_rek
WHERE r.tipe = 'N' AND r.balance = 'D'
  AND (r.nm_rek LIKE '%KAS%' OR r.nm_rek LIKE '%BANK%' OR r.kd_rek LIKE '11%')
  AND rt.thn = :start_year
GROUP BY r.kd_rek, r.nm_rek;

-- Kas Masuk (Pendapatan accrual):
SELECT d.kd_rek, r.nm_rek, (SUM(d.kredit) - SUM(d.debet)) AS movement
FROM jurnal j
JOIN detailjurnal d ON d.no_jurnal = j.no_jurnal
JOIN rekening r ON r.kd_rek = d.kd_rek
WHERE r.tipe = 'R' AND r.balance = 'K'
  AND j.tgl_jurnal BETWEEN :from AND :to
GROUP BY d.kd_rek, r.nm_rek;

-- Kas Keluar (Beban accrual):
SELECT d.kd_rek, r.nm_rek, (SUM(d.debet) - SUM(d.kredit)) AS movement
FROM jurnal j
JOIN detailjurnal d ON d.no_jurnal = j.no_jurnal
JOIN rekening r ON r.kd_rek = d.kd_rek
WHERE r.tipe = 'R' AND r.balance = 'D'
  AND j.tgl_jurnal BETWEEN :from AND :to
GROUP BY d.kd_rek, r.nm_rek;
```

## Dampak dan Langkah Adopsi
- Dampak bisnis: laporan B/C accrual memudahkan analisis kinerja periode; tidak setara dengan laporan arus kas langsung.
- Langkah adopsi di aplikasi kita:
  - Pertahankan accrual untuk B/C dengan saldo awal per akun.
  - Tentukan definisi Kas Awal: aset debit vs Kas/Bank dan sesuaikan label agar tidak ambigu.
  - Tambahkan opsi tampilan “Kas Murni” (berbasis akun Kas/Bank) sebagai alternatif jika dibutuhkan.
  - Pastikan ketahanan performa dengan pre-aggregasi saldo awal dan indeks yang tepat pada jurnal/detailjurnal.

## Referensi Kode
- UI & event: [DlgCashflow.java:220-275](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgCashflow.java#L220-L275)
- Alur utama perhitungan: [DlgCashflow.java:310-470](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgCashflow.java#L310-L470)
- Threading helper: [DlgCashflow.java:482-498](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgCashflow.java#L482-L498)

