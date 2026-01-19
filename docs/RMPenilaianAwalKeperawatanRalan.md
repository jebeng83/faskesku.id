# RMPenilaianAwalKeperawatanRalan

- Tujuan: modul Pengkajian Awal Keperawatan Rawat Jalan (Umum) untuk mencatat kondisi awal pasien, riwayat, penilaian risiko jatuh, skrining gizi, serta penilaian nyeri.
- Sumber referensi: desain UI lama NetBeans dan implementasi Java.
  - Form: [RMPenilaianAwalKeperawatanRalan.form](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/RMPenilaianAwalKeperawatanRalan.form)
  - Implementasi: [RMPenilaianAwalKeperawatanRalan.java](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/RMPenilaianAwalKeperawatanRalan.java)
  - Skema DB (Laravel Migration): [create_penilaian_awal_keperawatan_ralan_table.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/database/migrations/generated/2025_12_31_235959_create_penilaian_awal_keperawatan_ralan_table.php)
  - Seeder contoh data: [PenilaianAwalKeperawatanRalanTableSeeder.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/database/seeders/AutoSeeders/PenilaianAwalKeperawatanRalanTableSeeder.php)

## Skema Tabel penilaian_awal_keperawatan_ralan

- Kunci & waktu
  - no_rawat: string(17), primary key; referensi ke reg_periksa.no_rawat
  - tanggal: datetime, waktu pengisian asuhan keperawatan
- Keadaan umum & vital sign
  - informasi: enum [Autoanamnesis, Alloanamnesis]
  - td: string(8) — Tekanan darah (mmHg)
  - nadi: string(5) — x/menit
  - rr: string(5) — x/menit
  - suhu: string(5) — °C
  - gcs: string(5)
  - bb: string(5) — Kg
  - tb: string(5) — cm
  - bmi: string(10) — Kg/m²
- Riwayat kesehatan
  - keluhan_utama: string(150)
  - rpd: string(100) — Riwayat Penyakit Dahulu
  - rpk: string(100) — Riwayat Penyakit Keluarga
  - rpo: string(100) — Riwayat Pengobatan
  - alergi: string(25)
- Fungsional
  - alat_bantu: enum [Tidak, Ya]
  - ket_bantu: string(50)
  - prothesa: enum [Tidak, Ya]
  - ket_pro: string(50)
  - adl: enum [Mandiri, Dibantu]
  - status_psiko: enum [Tenang, Takut, Cemas, Depresi, Lain-lain]
  - ket_psiko: string(70)
- Psiko-sosial, spiritual, budaya
  - hub_keluarga: enum [Baik, Tidak Baik]
  - tinggal_dengan: enum [Sendiri, Orang Tua, Suami / Istri, Lainnya]
  - ket_tinggal: string(40)
  - ekonomi: enum [Baik, Cukup, Kurang]
  - budaya: enum [Tidak Ada, Ada]
  - ket_budaya: string(50)
  - edukasi: enum [Pasien, Keluarga]
  - ket_edukasi: string(50)
- Pengkajian risiko jatuh (Cara Berjalan, Hasil, Lapor)
  - berjalan_a: enum [Ya, Tidak] — tidak seimbang/sempoyongan/limbung
  - berjalan_b: enum [Ya, Tidak] — menopang saat akan duduk
  - berjalan_c: enum [Ya, Tidak] — penggunaan alat bantu
  - hasil: enum [Tidak beresiko (tidak ditemukan a dan b), Resiko rendah (ditemukan a/b), Resiko tinggi (ditemukan a dan b)]
  - lapor: enum [Ya, Tidak]
  - ket_lapor: string(15) — catatan/jam pelaporan
  - sg1: enum [Tidak, Tidak Yakin, Ya, 1-5 Kg, Ya, 6-10 Kg, Ya, 11-15 Kg, Ya, >15 Kg] — skrining gizi 1
  - nilai1: enum ['0','1','2','3','4'] — skor sg1
  - sg2: enum [Ya, Tidak] — skrining gizi 2
  - nilai2: enum ['0','1'] — skor sg2
  - total_hasil: tinyInteger — total skor skrining gizi
- Pengkajian tingkat nyeri
  - nyeri: enum [Tidak Ada Nyeri, Nyeri Akut, Nyeri Kronis]
  - provokes: enum [Proses Penyakit, Benturan, Lain-lain] (+ ket_provokes: string(40))
  - quality: enum [Seperti Tertusuk, Berdenyut, Teriris, Tertindih, Tertiban, Lain-lain] (+ ket_quality: string(50))
  - lokasi: string(50)
  - menyebar: enum [Tidak, Ya]
  - skala_nyeri: enum ['0'..'10']
  - durasi: string(25) — menit/waktu
  - nyeri_hilang: enum [Istirahat, Medengar Musik, Minum Obat] (+ ket_nyeri: string(40))
  - pada_dokter: enum [Tidak, Ya] (+ ket_dokter: string(15) — jam/catatan)
- Rencana keperawatan & petugas
  - rencana: string(200) — rencana lain
  - nip: string(20), index — petugas pengisi

Catatan: Kolom jam pelaporan tidak terpisah; praktik lama mengisi “Jam Lapor” memakai ket_lapor/ket_dokter di output cetak Java. Sesuaikan kebutuhan aplikasi jika perlu kolom terpisah.

## Relasi & Tabel Terkait

- Join utama di Java: reg_periksa, pasien, petugas, bahasa_pasien, cacat_fisik
- Detail masalah/rencana:
  - penilaian_awal_keperawatan_ralan_masalah ↔ master_masalah_keperawatan
  - penilaian_awal_keperawatan_ralan_rencana ↔ master_rencana_keperawatan

## Aturan Validasi & Perhitungan

- BMI: dihitung dari BB(kg) dan TB(cm): BMI = BB / (TB/100)^2
- Total Skor Skrining Gizi: total_hasil = nilai1 + nilai2
- Konsistensi enum: batasi input sesuai daftar pada skema migration
- Waktu “tanggal”: gunakan zona waktu server yang konsisten dan format ISO

## Pemetaan UI Lama → Field DB

- No.Rawat: TNoRw → no_rawat
- Pasien: TNoRM, TPasien, Jk, TglLahir (hanya tampil melalui join)
- Petugas: KdPetugas, NmPetugas → nip (join untuk nama)
- Tgl Asuhan: TglAsuhan → tanggal
- Vital: TD, Nadi, RR, Suhu, GCS, BB, TB, BMI
- Riwayat: KeluhanUtama, RPD, RPK, RPO, Alergi
- Fungsional: AlatBantu + KetBantu, Prothesa + KetProthesa, ADL, CacatFisik (tampil)
- Psiko-sosial: StatusPsiko + KetPsiko, HubunganKeluarga, TinggalDengan + KetTinggal, Ekonomi
- Budaya: StatusBudaya + KetBudaya
- Edukasi: Edukasi + KetEdukasi
- Risiko jatuh: ATS/BJM/MSA → berjalan_a/b/c, Hasil, Lapor + KetLapor, SG1+Nilai1, SG2+Nilai2, TotalHasil
- Nyeri: Nyeri, Provokes + KetProvokes, Quality + KetQuality, Lokasi, Menyebar, SkalaNyeri, Durasi, NyeriHilang + KetNyeri, PadaDokter + KetDokter

## Proses CRUD (Implementasi Java Lama)

- Simpan: menyimpan 57 kolom ke penilaian_awal_keperawatan_ralan dan detail masalah/rencana
- Ganti: update seluruh kolom, refresh detail masalah/rencana
- Hapus: delete berdasarkan no_rawat dan bersihkan detail masalah/rencana
- Cetak: generate HTML melalui LoadHTML dengan CSS inline

Referensi kode simpan/update: [RMPenilaianAwalKeperawatanRalan.java:4336-4506](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/RMPenilaianAwalKeperawatanRalan.java#L4336-L4506)

## Rencana Implementasi di Aplikasi Ini

- Backend (Laravel)
  - Buat Model/Eloquent untuk penilaian_awal_keperawatan_ralan dan relasi masalah/rencana
  - Endpoint CRUD berbasis no_rawat: GET/POST/PUT/DELETE
  - Validasi enum & panjang string sesuai migration; hitung BMI dan total_hasil server-side jika diperlukan
  - Integrasi ke reg_periksa/pasien/petugas untuk data tampilan
- Frontend (React/Inertia)
  - Halaman: [AwalKeperawatanRalan.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/AsuhanKeperawatan/AwalKeperawatanRalan.jsx)
  - Form berisi kelompok: Keadaan Umum, Riwayat Kesehatan, Fungsional, Psiko-sosial & Budaya, Risiko Jatuh, Skrining Gizi, Nyeri, Rencana
  - Otomasi perhitungan: BMI dari BB/TB; total_hasil dari nilai1+nilai2
  - Kontrol enum: gunakan dropdown dengan opsi yang sesuai skema
  - Tampilkan data join (pasien/petugas) read-only; input hanya untuk kolom tabel
- Cetak/Export
  - Sediakan endpoint/komponen untuk cetak ringkas HTML/PDF meniru struktur di Java
  
Dengan dokumen ini, tim dapat memetakan UI lama ke skema DB baru dan membangun CRUD terintegrasi sesuai standar aplikasi saat ini.
