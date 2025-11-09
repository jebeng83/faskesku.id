Laravel Boost — Panduan Integrasi & Playbook Prompt untuk Faskesku

Ringkasan
- Laravel Boost adalah asisten AI khusus Laravel untuk mempercepat pengembangan melalui serangkaian tool seperti Route Inspector, Code Scanner, Database Schema Inspector, Log Reader, dan Documentation Search.
- Boost bekerja sebagai tooling pengembang (developer assistant), bukan paket runtime yang di-install ke aplikasi produksi. Integrasinya dilakukan di sisi repository dan workflow pengembangan.
- Dokumen ini menyediakan: langkah integrasi, format prompt yang terstruktur, dan playbook prompt yang relevan untuk modul Faskesku (Rawat Jalan, Registrasi, PCare/Mobile JKN, dsb.).

1) Instalasi & Integrasi (Non-runtime)
1. Buat akun di Laravel Boost.
2. Hubungkan repository aplikasi (GitHub/GitLab/Bitbucket). Berikan akses read-only agar Boost dapat memindai kode.
3. Pilih root project (direktori yang berisi composer.json). Pastikan versi PHP/Laravel terdeteksi benar.
4. Konfigurasikan indexing agar mencakup folder berikut:
   - app/ (Controllers, Models, Services, Traits)
   - resources/js/ (Components, Pages, routes, tools, wayfinder)
   - routes/ (api.php, web.php)
   - config/ (services.php, bpjs.php, app.php, dll)
   - storage/logs/ (opsional jika Boost mendukung baca log lokal)
5. Keamanan & privasi:
   - Jangan unggah .env atau secrets. Jika perlu membahas konfigurasi, gunakan placeholder.
   - Saat menganalisis log yang berisi data pasien, lakukan masking pada PII.

2) Format Prompt Terstruktur (Disarankan)
Gunakan struktur berikut agar hasil dari Boost konsisten dan actionable.

Template Prompt
- Tujuan: Jelaskan tujuan akhir (contoh: “Perbaiki navigasi Rawat Jalan agar mempertahankan Dokter/Poli”).
- Konteks proyek: Ringkas modul, halaman, dan pain points.
- Artefak kode terkait: Cantumkan path-file yang relevan (lihat daftar di bawah).
- Tindakan yang diminta: Jelaskan apa yang perlu Boost lakukan (audit, saran best practice, generate patch, buat test, dsb.).
- Output yang diharapkan: Bentuk deliverable (daftar temuan, patch diff, checklist, snippet, dsb.).

Artefak Kode Penting (Faskesku)
- Rawat Jalan UI & navigasi:
  - resources/js/Pages/RawatJalan/Index.jsx
  - resources/js/Components/SidebarMenu.jsx
  - resources/js/Components/LanjutanRalanSidebar.jsx
- Registrasi & popup BPJS:
  - resources/js/Pages/Registration/Index.jsx
- PCare/Mobile JKN API:
  - app/Http/Controllers/Pcare/MobileJknController.php
  - routes/api.php (prefix mobilejkn)
  - resources/js/actions/App/Http/Controllers/Pcare/MobileJknController.ts
- Routing frontend (Ziggy routes):
  - resources/js/ziggy.js
  - resources/js/routes/*
- Konfigurasi & layanan:
  - config/services.php, config/bpjs.php
  - app/Traits/BpjsTraits.php

3) Playbook Prompt (Siap Pakai)

A. Route & Navigasi (Rawat Jalan)
Tujuan: Konsistensi navigasi ke Rawat Jalan, memastikan filter Dokter/Poli dipertahankan.
Prompt:
- Audit semua konstruksi URL ke halaman Rawat Jalan. Artefak: SidebarMenu.jsx, LanjutanRalanSidebar.jsx, RawatJalan/Index.jsx, ziggy.js, routes/web.php. Temukan tempat yang menggunakan window.location.href dan yang memakai Link dari Inertia/Ziggy. Berikan saran konsistensi (gunakan route('rawat-jalan.index', {}, false)) dan pastikan path relatif. Output: daftar lokasi dengan rekomendasi konkret, patch diff jika perlu.
- Periksa penggunaan localStorage untuk key 'rawatJalanFilters'. Artefak: RawatJalan/Index.jsx, SidebarMenu.jsx, LanjutanRalanSidebar.jsx. Pastikan schema key yang dipakai konsisten (kd_dokter, kd_poli). Output: helper util untuk get/set/clear agar seragam, plus snippet yang menggantikan akses langsung localStorage.
- Validasi query parameters dan sinkronisasi state. Artefak: RawatJalan/Index.jsx. Pastikan saat masuk dari menu, state tersinkron dengan URL (kd_dokter/kd_poli), namun tidak mereset jika key tersedia. Output: rekomendasi useEffect dan guard logic.

B. Integrasi Mobile JKN (Antrean)
Tujuan: Hardening addAntrean agar robust, logging terstruktur, dan UI popup informatif tanpa mengekspos method/endpoint.
Prompt:
- Review App\Http\Controllers\Pcare\MobileJknController::addAntrean. Audit validasi input, error handling, retry/backoff, dan pemetaan response (metadata.code vs HTTP status). Output: rekomendasi try/catch terstruktur, standar format log (context: no_rawat, kd_poli, kd_dokter), serta patch contoh.
- Audit jalur pemanggilan dari Registration/Index.jsx (axios.post('/api/mobilejkn/antrean/add')). Rekomendasikan standardisasi error messaging agar popup menyajikan pesan dari metadata/message tanpa menampilkan method/endpoint. Output: snippet pengganti setBpjsPopup.
- Buat checklist konfigurasi aman untuk kredensial Mobile JKN (env, services.php). Output: daftar pemeriksaan + contoh validasi saat config incomplete.

C. Performa & Database
Tujuan: Mengurangi N+1, menambah index pada kolom filter, dan mempercepat list Rawat Jalan/Registrasi.
Prompt:
- Inspeksi query di modul Rawat Jalan dan Registrasi: identifikasi model dan relasi yang sering di-load (RegPeriksa, Dokter/Doctor, Poliklinik, Penjab, dsb.). Output: saran eager loading (with), cache ringan, dan index di kolom filter (kd_dokter, kd_poli, tgl_registrasi).
- Review skema dan relasi Eloquent agar konsisten dengan best practice (foreign keys, cascade, unique constraints). Output: daftar rekomendasi migrasi/constraint.

D. Keamanan & Konfigurasi
Tujuan: Tidak membocorkan kredensial, menstandardisasi penanganan config.
Prompt:
- Scan code untuk akses langsung credentials Mobile JKN. Artefak: SettingBridingMobileJkn.jsx, SettingBridgingMobileJknController.php, services.php. Output: rekomendasi pemisahan env, validasi sebelum request.
- Audit logging untuk PII dan data sensitif. Output: aturan masker di log.

E. Dokumentasi & Developer UX
Tujuan: Dokumentasi internal yang akurat dan mudah diikuti oleh tim.
Prompt:
- Hasilkan dokumentasi modul Rawat Jalan dan Registrasi (high-level arsitektur, flow filter, integrasi Mobile JKN). Artefak: semua file terkait. Output: dokumen ringkas 2–3 halaman.
- Buat panduan troubleshooting navigasi dan filter (FAQ) berdasarkan temuan Boost. Output: markdown siap commit.

F. Testing
Tujuan: Menutup risk dengan test minimal.
Prompt:
- Buat skenario unit/feature test untuk addAntrean (mock response, metadata.code != 200). Output: contoh test di tests/Feature.
- Buat test E2E minim untuk navigasi Rawat Jalan: saat klik menu, kd_dokter/kd_poli tetap; saat reset, localStorage dibersihkan. Output: rencana test atau snippet jika memakai Dusk/Playwright.

4) Contoh Prompt Lengkap (Copas Siap Pakai)

Prompt 1 — Audit Navigasi Rawat Jalan
Tujuan: Konsistensikan URL dan pertahankan filter Dokter/Poli.
Konteks: Pengguna ingin saat klik menu Rawat Jalan, filter kd_dokter/kd_poli tidak ter-reset.
Artefak: resources/js/Components/SidebarMenu.jsx, resources/js/Components/LanjutanRalanSidebar.jsx, resources/js/Pages/RawatJalan/Index.jsx, routes/web.php, resources/js/ziggy.js.
Tindakan: Inventaris semua pembuatan URL Rawat Jalan, evaluasi penggunaan route vs path manual, audit penggunaan localStorage 'rawatJalanFilters', sarankan helper util, dan berikan patch yang konsisten.
Output: Checklist temuan, patch diff minimal, dan snippet helper untuk get/set/clear filter.

Prompt 2 — Hardening addAntrean Mobile JKN
Tujuan: Robust error handling dan logging standar.
Konteks: Beberapa respon HTTP 200 namun metadata.code != 200.
Artefak: app/Http/Controllers/Pcare/MobileJknController.php, resources/js/Pages/Registration/Index.jsx, routes/api.php.
Tindakan: Audit validasi, try/catch, pengembalian response, dan konsumsi response di frontend (popup). Rekomendasikan pola logging dengan context. Berikan patch atau pseudocode.
Output: Daftar rekomendasi, patch snippet controller/axios handler, format log.

Prompt 3 — Performa Rawat Jalan & Registrasi
Tujuan: Kurangi N+1 dan optimasi filter.
Artefak: Model terkait (RegPeriksa, Dokter, Poliklinik, Penjab), controller/indexer yang memuat data.
Tindakan: Identifikasi query berat, usulkan eager loading, dan index di kolom filter. Berikan contoh migrasi index.
Output: Daftar query bermasalah, saran eager loading, dan patch migrasi untuk index.

Prompt 4 — Dokumentasi Developer
Tujuan: Buat ringkasan arsitektur modul Rawat Jalan dan Registrasi.
Artefak: File modul terkait.
Tindakan: Hasilkan dokumentasi ringkas alur data, layer yang terlibat, titik integrasi BPJS, dan praktik terbaik.
Output: Markdown 2–3 halaman siap commit.

5) Workflow Disarankan
1. Buat branch khusus untuk hasil rekomendasi Boost (contoh: feature/boost-recommendations).
2. Jalankan prompt dari playbook ini, review hasil, dan pilih rekomendasi yang relevan.
3. Terapkan patch secara bertahap, jalankan test dan build.
4. Dokumentasikan perubahan di README atau file .md ini.

6) Tips Pemakaian
- Sertakan jalur file (path) yang tepat dalam prompt untuk meningkatkan akurasi hasil.
- Nyatakan format output yang Anda inginkan (patch diff, bullet list, code snippet).
- Pisahkan prompt besar menjadi beberapa langkah agar lebih fokus.

Referensi
- Laravel Boost — https://laravel.com/ai/boost