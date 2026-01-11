# Pengeluaran Harian — Catatan Teknis

## Ringkasan
- Fitur mencatat pengeluaran harian dengan validasi, transaksi database, dan penulisan jurnal.
- Mendukung dua alur: pembayaran umum (non-Mandiri) dan Host-to-Host Bank Mandiri melalui dialog khusus.
- Lokasi kode utama: [DlgPengeluaranHarian.java](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java).

## Lokasi & Titik Masuk
- Aksi simpan: [BtnSimpanActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L871-L969)
- Aksi simpan Mandiri: [BtnSimpanMandiriActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L1256-L1329)
- Aksi hapus/batal: [BtnHapusActionPerformed](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L991-L1070)

## Validasi Input
- Wajib: Keterangan, Petugas Keuangan, Kategori, Nomor Transaksi, Pengeluaran > 0 ([L872-L881](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L872-L881)).
- Lookup akun & kontra-akun berdasar kategori; jika kontra-akun kosong, proses dihentikan ([L883-L917](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L883-L917)).

## Alur Non‑Mandiri (Umum)
1. Mulai transaksi: AutoCommit False ([L927](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L927)).
2. Simpan pengeluaran ke tabel pengeluaran_harian ([L929-L932](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L929-L932)).
3. Kosongkan tampjurnal, lalu isi dua baris:
   - Debit: akun dengan nilai pengeluaran ([L933-L936](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L933-L936)).
   - Kredit: kontra-akun dengan nilai pengeluaran ([L937-L939](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L937-L939)).
4. Simpan jurnal menggunakan jur.simpanJurnal (tipe "U") ([L940-L942](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L940-L942)).
5. Commit jika sukses, Rollback jika gagal, kembalikan AutoCommit True ([L947-L956](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L947-L956)).
6. Update UI tabel, kosongkan form, dan hitung ulang ([L958-L965](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L958-L965)).

## Alur Mandiri (Host‑to‑Host Bank Mandiri)
- Deteksi kontra-akun Mandiri, generate nomor pembayaran, buka dialog pembayaran ([L918-L926](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L918-L926)).
- Validasi field pembayaran: no rekening, atas nama, kota, metode, biaya transaksi, kode bank, bank tujuan ([L1256-L1272](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L1256-L1272)).
- Simpan pengeluaran, tulis jurnal termasuk biaya transaksi Mandiri, update status pengajuan bila ada, lalu commit/rollback sesuai hasil ([L1273-L1323](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L1273-L1323)).
- Update tabel, tutup dialog, reset form, dan hitung ulang ([L1324-L1329](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L1324-L1329)).

## Hapus/Batal & Jurnal Pembatalan
- Hapus record pengeluaran, jika transaksi Mandiri maka juga hapus pembayaran pihak ke-3 dan ambil biaya transaksi terkait ([L1002-L1016](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L1002-L1016)).
- Isi tampjurnal untuk pembatalan:
  - Biaya transaksi (jika ada) sebagai kredit pada akun biaya Mandiri ([L1018-L1023](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L1018-L1023)).
  - Akun pengeluaran sebagai kredit, kontra-akun sebagai debit dengan nilai pengeluaran + biaya ([L1025-L1030](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L1025-L1030)).
- Simpan jurnal pembatalan dengan jur.simpanJurnal (tipe "U") dan commit/rollback sesuai status ([L1031-L1033](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L1031-L1033)).

## Dependensi Penting
- Sequel: util transaksi DB untuk menyimpan, menghapus, commit/rollback.
- jur.simpanJurnal: penulisan jurnal dari tampjurnal.
- kategori: konstanta kode akun, termasuk Host_to_Host_Bank_Mandiri dan Akun_Biaya_Mandiri.
- akses: identitas pengguna untuk metadata jurnal.

## Penanganan Error
- Pesan user-friendly jika akun/kontra-akun tidak tersedia.
- Disiplin transaksi: AutoCommit False → Commit/Rollback → AutoCommit True.
- Cleanup resource pada PreparedStatement/ResultSet.

## Rekomendasi Arsitektur
- Abstraksikan pembayaran Mandiri ke service layer agar event handler UI tetap tipis dan mudah diuji.
- Buat adapter Jurnal terpusat berbasis DTO transaksi untuk konsistensi debit/kredit lintas fitur.
- Terapkan idempoten nomor transaksi (constraint unik + retry) mencegah duplikasi.
- Validasi integritas kategori_pengeluaran_harian: kd_rek/kd_rek2 wajib saat kategori aktif.
- Satukan standar logging dengan correlation ID tiap transaksi untuk audit.

## Implementasi Aplikasi (Laravel + React)

### Tujuan
- Menyediakan fitur Pengeluaran Harian yang setara dengan implementasi Java Swing, dengan alur transaksi, penomoran, jurnal, dan integrasi Mandiri H2H yang konsisten.

### Skema Data & Constraints
- Tabel utama: [create_pengeluaran_harian_table.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/database/migrations/generated/2025_12_31_235959_create_pengeluaran_harian_table.php)
  - Kolom: no_keluar (PK), tanggal (datetime), kode_kategori (FK), biaya (double), nip (FK), keterangan (string)
- Foreign keys: [add_foreign_keys_to_pengeluaran_harian_table.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/database/migrations/generated/2026_01_01_000000_add_foreign_keys_to_pengeluaran_harian_table.php)
  - pengeluaran_harian.nip → petugas.nip (cascade)
  - pengeluaran_harian.kode_kategori → kategori_pengeluaran_harian.kode_kategori (cascade)
- Master kategori: [create_kategori_pengeluaran_harian_table.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/database/migrations/generated/2025_12_31_235959_create_kategori_pengeluaran_harian_table.php)
- FK kategori→rekening: [add_foreign_keys_to_kategori_pengeluaran_harian_table.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/database/migrations/generated/2026_01_01_000000_add_foreign_keys_to_kategori_pengeluaran_harian_table.php)

### Penomoran Transaksi (no_keluar)
- Pola historis (Java): PHYYYYMMDD + counter 3 digit per hari.
  - Lihat fungsi [autoNomor](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L1551-L1554)
- Pola saat ini (SPA): PHXXXXXXXXX (global sequence) via endpoint generate.
  - Endpoint: [PengeluaranHarianController::generateNoKeluar](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Akutansi/PengeluaranHarianController.php#L1-L37)
  - Route: [api.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/api.php#L1-L200)
- Rekomendasi:
  - Pilih satu standar dan terapkan konsisten lintas modul. Jika perlu kompatibilitas dengan Java, gunakan pola harian PHYYYYMMDD + 3 digit dan sesuaikan endpoint generator.

### Endpoint Backend
- Disediakan:
  - GET /api/akutansi/pengeluaran-harian/generate-no → nomor transaksi otomatis.
  - GET /api/akutansi/kategori-pengeluaran-harian?q= → daftar kategori (kode, nama, kd_rek, kd_rek2).
  - GET /api/pembelian/petugas?q= → daftar petugas (nip, nama) untuk dropdown.
- Direncanakan (mengikuti alur Java):
  - POST /api/akutansi/pengeluaran-harian → simpan transaksi umum (non‑Mandiri) dan posting jurnal.
  - POST /api/akutansi/pengeluaran-harian/mandiri → simpan transaksi Mandiri H2H, posting jurnal, dan insert pembayaran pihak ke-3.
  - DELETE /api/akutansi/pengeluaran-harian/{no_keluar} → pembatalan transaksi + jurnal pembatalan, hapus pembayaran pihak ke-3 jika ada.

### Alur Non‑Mandiri (Umum)
- Validasi: keterangan, petugas, kategori, nomor, pengeluaran > 0.
  - Lihat [BtnSimpanActionPerformed (validasi)](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L871-L882)
- Lookup akun & kontra‑akun dari kategori_pengeluaran_harian.
  - Lihat [kd_rek/kd_rek2](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L883-L917)
- Simpan pengeluaran_harian (no_keluar, tanggal+jam, kode_kategori, biaya, nip, keterangan).
  - Lihat [insert](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L927-L933)
- Susun tampjurnal:
  - Debit akun (kd_rek) sebesar Pengeluaran.
  - Kredit kontra‑akun (kd_rek2) sebesar Pengeluaran.
  - Lihat [tampjurnal umum](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L933-L942)
- Posting jurnal dan commit; rollback jika gagal.

### Alur Mandiri (Host‑to‑Host Bank Mandiri)
- Deteksi kontra‑akun Mandiri; buka dialog pembayaran dan generate nomor pembayaran harian.
  - Lihat [deteksi & dialog](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L918-L926)
- Validasi field Mandiri: no rekening, atas nama, kota, metode, biaya transaksi, kode bank, bank tujuan.
  - Lihat [validasi dialog](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L1256-L1273)
- Simpan pengeluaran_harian.
- Susun tampjurnal:
  - Debit Akun_Biaya_Mandiri jika biaya transaksi > 0.
  - Debit akun (kd_rek) sebesar Pengeluaran.
  - Kredit kontra‑akun (kd_rek2) sebesar Pengeluaran + BiayaTransaksi.
  - Lihat [tampjurnal Mandiri](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L1280-L1296)
- Insert pembayaran pihak ke‑3 Mandiri.
  - Lihat [insert ke pembayaran_pihak_ke3_bankmandiri](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L1297-L1303)
- Commit; tutup dialog; update UI.

### Pembatalan Transaksi
- Hapus pengeluaran_harian (by no_keluar).
- Jika kontra‑akun Mandiri, ambil biaya transaksi & hapus pembayaran pihak ke‑3.
- Susun tampjurnal pembatalan:
  - Kredit Akun_Biaya_Mandiri sebesar biaya transaksi (jika ada).
  - Kredit akun (kd_rek) sebesar Pengeluaran.
  - Debit kontra‑akun (kd_rek2) sebesar Pengeluaran + BiayaTransaksi.
  - Lihat [pembatalan & jurnal](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java#L1002-L1033)

### Frontend Form & UX
- Halaman: [PengeluaranHarian.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Akutansi/PengeluaranHarian.jsx#L1-L248)
- Nomor Transaksi: auto‑generate saat load dan via tombol “Generate” memanggil endpoint.
- Kategori: SearchableSelect dari endpoint kategori; saat dipilih, auto‑fill nama kategori.
- Petugas: SearchableSelect dari endpoint petugas (nip, nama).
- Tanggal/Waktu: input date+time terpisah.
- Pengeluaran & Keterangan: input teks; validasi wajib.

### Posting Jurnal (Laravel)
- Ikuti pola [PemasukanLainController::store](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Akutansi/PemasukanLainController.php#L135-L166): stage dua baris tampjurnal lalu panggil service posting.
- Untuk Mandiri: tambah baris biaya transaksi sesuai Java sebelum debit/kredit utama.

### Idempoten & Race Conditions
- Penomoran: gunakan transaksi + lockForUpdate untuk menghindari duplikasi nomor.
- Jurnal: lakukan clear tampjurnal terlokalisasi per transaksi sebelum stage.
- Hapus: susun jurnal pembatalan simetris agar neraca tetap seimbang.

### Pengujian
- Kasus umum: simpan pengeluaran non‑Mandiri → verifikasi tampjurnal debit/kredit dan baris di pengeluaran_harian.
- Kasus Mandiri: isi dialog lengkap → verifikasi tampjurnal 3 baris dan insert ke pembayaran_pihak_ke3_bankmandiri.
- Pembatalan: hapus transaksi → verifikasi jurnal pembatalan dan status pembayaran pihak ke‑3.

### Referensi Kode Utama
- Dialog lama: [DlgPengeluaranHarian.java](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/DlgPengeluaranHarian.java)
- Nomor transaksi SPA: [PengeluaranHarianController](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Akutansi/PengeluaranHarianController.php)
- Kategori endpoint: [KategoriPengeluaranHarianController](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Akutansi/KategoriPengeluaranHarianController.php)
- Routes: [api.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/api.php)
