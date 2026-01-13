# Kunjungan PCare — Payload & Sumber Data

## Tujuan
- Menjelaskan bagaimana payload Kunjungan PCare disusun di frontend (CpptSoap.jsx) dan backend (PcareKunjunganController).
- Merinci asal data (database, endpoint referensi, dan input UI) yang mengisi setiap bagian payload.

## Alur Frontend (CpptSoap.jsx)
- Buka modal Bridging: memuat pendaftaran dan referensi dasar [CpptSoap.jsx:771-878](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L771-L878).
- Ambil payload awal (preview) untuk Kunjungan dari backend: [CpptSoap.jsx:890-937](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L890-L937).
  - Endpoint: GET /api/pcare/kunjungan/preview/{no_rawat}.
  - Terapkan default jika field belum tersedia (kdSadar, kdStatusPulang, kdPrognosa, alergi, nmAlergi). 
- Edit payload melalui UI dengan helper typed: [CpptSoap.jsx:1082-1096](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L1082-L1096).
- Aktifkan rujukan otomatis ketika kdStatusPulang = '4': [CpptSoap.jsx:1098-1113](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L1098-L1113).
- Validasi TACC untuk diagnosa NonSpesialis dan normalisasi nilai: [CpptSoap.jsx:1126-1168](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L1126-L1168).
- Susun bagian rujukLanjut dan nama referensi (nmSubSpesialis, nmPPK): [CpptSoap.jsx:1181-1217](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L1181-L1217).
- POST payload Kunjungan ke backend: [CpptSoap.jsx:1237-1297](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L1237-L1297).
  - Endpoint: POST /api/pcare/kunjungan.
  - Simpan noKunjungan dan update state rujukan setelah kirim.

## Payload Kunjungan — Struktur & Mapping
- Payload dasar (dari preview backend): [PcareKunjunganController.php:453-489](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Pcare/PcareKunjunganController.php#L453-L489).
  - noKunjungan: null (diisi oleh PCare saat sukses).
  - noKartu: diambil dari pasien.no_peserta.
  - tglDaftar: format dd-mm-YYYY dari reg_periksa.tgl_registrasi.
  - kdPoli: hasil mapping maping_poliklinik_pcare.kd_poli_pcare dari reg_periksa.kd_poli.
  - keluhan, vital sign, terapi: dari pemeriksaan_ralan terbaru (keluhan, tensi→sistole/diastole, berat/tinggi, respirasi, nadi, lingkar_perut, instruksi, suhu_tubuh) dan gabungan resep_obat.
  - kdSadar, kdStatusPulang, kdPrognosa, kdTacc: default sesuai katalog/konvensi internal.
  - kdDokter: dari maping_dokter_pcare.kd_dokter_pcare.
  - kdDiag1: dari diagnosa_pasien prioritas=1.
  - rujukLanjut: default null, diisi dari UI bila ada.

- Penambahan dari UI (CpptSoap.jsx):
  - no_rawat: ditambahkan ke payload sebelum POST untuk persist ke DB lokal [CpptSoap.jsx:1121-1124](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L1121-L1124).
  - rujukLanjut: diisi jika kdStatusPulang='4' dan form rujukan lengkap: kdppk, tglEstRujuk (konversi ke dd-mm-YYYY), subSpesialis.kdSubSpesialis1, subSpesialis.kdSarana [CpptSoap.jsx:1181-1213](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L1181-L1213).
  - nmSubSpesialis, nmPPK: ikut dilampirkan agar backend bisa menyimpan label nama [CpptSoap.jsx:1214-1217](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L1214-L1217).
  - Normalisasi kdTacc/alasanTacc: -1 untuk “Tanpa TACC”, alasanTacc null bila tanpa TACC [CpptSoap.jsx:1149-1168](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L1149-L1168).

## Sumber Data & Endpoint Referensi
- Pendaftaran PCare (untuk menampilkan tombol Bridging): GET /api/pcare/pendaftaran/rawat/{no_rawat} [CpptSoap.jsx:779-791](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L779-L791).
- Rujuk Subspesialis (cek setelah kirim kunjungan & untuk cetak): GET /api/pcare/rujuk-subspesialis/rawat/{no_rawat} [CpptSoap.jsx:795-818](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L795-L818) dan [CpptSoap.jsx:1261-1286](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L1261-L1286).
- Referensi Poli: GET /api/pcare/poli [CpptSoap.jsx:825-837](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L825-L837).
- Referensi Dokter: GET /api/pcare/dokter [CpptSoap.jsx:838-850](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L838-L850).
- Referensi Spesialis: GET /api/pcare/spesialis [CpptSoap.jsx:855-865](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L855-L865).
- Referensi Sarana: GET /api/pcare/spesialis/sarana [CpptSoap.jsx:866-877](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L866-L877).
- Subspesialis berdasarkan Spesialis: GET /api/pcare/spesialis/subspesialis?kdsSpesialis=… [CpptSoap.jsx:939-956](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L939-L956).
- Daftar PPK rujukan berdasarkan Subspesialis+Sarana+Tgl: GET /api/pcare/spesialis/rujuk/subspesialis/{kdSub}/sarana/{kdSa}/tglEstRujuk/{tgl} [CpptSoap.jsx:963-1058](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L963-L1058).

## Backend — Endpoint & Payload
- Preview payload: [PcareKunjunganController.php:337-364](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Pcare/PcareKunjunganController.php#L337-L364).
  - Sumber DB: reg_periksa + pasien + poli + dokter (+ maping_dokter_pcare); pemeriksaan_ralan (terbaru); diagnosa_pasien + penyakit; mapping poli ke KD PCare.
  - Bentuk payload standar: [PcareKunjunganController.php:403-489](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Pcare/PcareKunjunganController.php#L403-L489).
- Kirim Kunjungan: [PcareKunjunganController.php:39-161](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Pcare/PcareKunjunganController.php#L39-L161).
  - Normalisasi kdTacc dan tglDaftar; POST ke PCare endpoint kunjungan/v1 (Content-Type: text/plain); update status reg_periksa; log ke pcare_bpjs_log.
- Definisi route frontend untuk endpoint: [resources/js/routes/api/pcare/kunjungan/index.ts:36-76](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/routes/api/pcare/kunjungan/index.ts#L36-L76) dan [resources/js/routes/api/pcare/kunjungan/index.ts:12-21](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/routes/api/pcare/kunjungan/index.ts#L12-L21).

## Format Tanggal
- Frontend rujukForm.tglEstRujuk: HTML date (yyyy-mm-dd) dikonversi ke dd-mm-YYYY sebelum masuk payload [CpptSoap.jsx:1060-1079](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L1060-L1079) dan [CpptSoap.jsx:1206-1210](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L1206-L1210).
- Backend juga menormalkan tglDaftar jika menerima format yyyy-mm-dd [PcareKunjunganController.php:60-66](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Pcare/PcareKunjunganController.php#L60-L66).

## Validasi & Default Penting
- kdSadar, kdStatusPulang, kdPrognosa, alergiMakan/Udara/Obat: default di preview agar UI selalu punya nilai awal [CpptSoap.jsx:910-927](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L910-L927).
- Diagnosa NonSpesialis: kdTacc wajib (1/2/3/4) dan alasanTacc wajib saat diisi [CpptSoap.jsx:1126-1147](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L1126-L1147).
- Normalisasi KD TACC ke -1 saat kosong/tanpa TACC [PcareKunjunganController.php:47-55](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Pcare/PcareKunjunganController.php#L47-L55).

## Alur Status & Logging
- Backend menyimpan status ke reg_periksa.status_pcare dan response ke reg_periksa.response_pcare [PcareKunjunganController.php:102-117](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Pcare/PcareKunjunganController.php#L102-L117).
- Logging request/response ke pcare_bpjs_log termasuk masking noKartu [PcareKunjunganController.php:119-151](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/Pcare/PcareKunjunganController.php#L119-L151).
- Frontend mengekstrak noKunjungan dari variasi struktur response dan memperbarui state rujukan [CpptSoap.jsx:1218-1297](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/RawatJalan/components/CpptSoap.jsx#L1218-L1297).

## Ringkasan
- Payload Kunjungan PCare dibangun dari data DB (reg_periksa, pasien, poli, dokter, pemeriksaan_ralan, diagnosa, resep) melalui endpoint preview, lalu diperkaya di UI (TACC, rujukLanjut, label nama) sebelum dikirim.
- Backend melakukan normalisasi, mengirim ke PCare, menyimpan status, dan logging untuk audit/monitoring.
