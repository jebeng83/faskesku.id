# Odontogram: Konsep & Implementasi di Rekam Medis Gigi

Dokumen ini merangkum konsep odontogram, standar pencatatan yang relevan, serta cara kerja implementasi odontogram di modul Rekam Medis Gigi pada aplikasi ini. Tujuannya agar tim dapat mengkloning, memelihara, dan mengembangkan fitur dengan konsisten.

## Ringkasan Konsep

- Odontogram adalah peta kondisi gigi geligi pasien sebagai bagian rekam medis kedokteran gigi.
- Manfaat: edukasi pasien/keluarga, efisiensi alur klinik, analisis perawatan dan arah klinik.
- Tujuan: mengetahui keadaan gigi dan mulut, menjadi dokumen legal, dasar rencana perawatan, bahan penelitian, serta sarana identifikasi.

## Standar Pencatatan (Praktik Klinis)

- Penomoran gigi menggunakan FDI Numbering System (dua digit; contoh 11–48 untuk permanen, 51–85 untuk sulung).
- Permukaan gigi yang dicatat mengikuti lokasi MODVL:
  - M: Mesial
  - O: Oklusal
  - D: Distal
  - V: Vestibular/Bukal
  - L: Lingual
- Aturan visualisasi restorasi saat menggunakan warna:
  - Logam berwarna emas: merah
  - Amalgam/logam biasa: hitam
  - Restorasi sewarna gigi (mis. resin/komposit): hijau
  - Fissure sealant: merah muda

Catatan: singkatan kondisi tambahan dapat digunakan sesuai kebutuhan klinik, dengan konsistensi di master data.

## Arsitektur Implementasi (Aplikasi)

- Tampilan input dan riwayat:
  - Form input dan papan SVG: [rekam-gigi.blade.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/resources/views/rekam/rekam-gigi.blade.php)
  - Riwayat agregat pasien dalam bentuk papan SVG: [odontogram.blade.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/resources/views/rekam/odontogram.blade.php)
- Kontrol alur data dan persistensi:
  - Controller: [RekamGigiController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/app/Http/Controllers/RekamGigiController.php)
  - Rute terkait: [routes/web.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/routes/web.php#L97-L101)
- Aset front-end yang digunakan:
  - jQuery SVG & Knockout: [jquery.svg.min.js](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/public/odontograma/js/jquery.svg.min.js), [knockout-2.0.0.js](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/public/odontograma/js/knockout-2.0.0.js)
  - CSS papan: [odontograma.css](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/public/odontograma/css/odontograma.css)

### Alur Data

- Input perawatan gigi:
  - Pengguna memilih elemen gigi (FDI), kondisi gigi (kode dari master), diagnosa (ICD), dan tindakan.
  - Klik + Tambah akan menambahkan baris ke tabel dan menyiapkan payload untuk penyimpanan.
  - Submit menyimpan ke tabel `RekamGigi` via `store()`.
- Riwayat dan visualisasi papan:
  - Odontogram riwayat mengambil seluruh rekam gigi pasien lalu membentuk dua list string: `elemen_gigis` dan `pemeriksaan_gigi`.
  - Di front-end, setiap posisi gigi FDI di SVG dicek terhadap list tersebut; bila ada pemeriksaan untuk elemen tersebut, label gigi diganti dengan kode pemeriksaan.

Referensi implementasi: [RekamGigiController.php:odontogram()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/app/Http/Controllers/RekamGigiController.php#L14-L43), [RekamGigiController.php:index()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/app/Http/Controllers/RekamGigiController.php#L45-L65), [rekam-gigi.blade.php (script)](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/resources/views/rekam/rekam-gigi.blade.php#L189-L355), [odontogram.blade.php (script)](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/resources/views/rekam/odontogram.blade.php#L95-L510).

### Papan SVG (Struktur dan Interaksi)

- Setiap gigi digambar sebagai satu grup dengan 5 poligon permukaan dan 1 label:
  - S: Superior (atas)
  - I: Inferior (bawah)
  - D: Derecha (kanan)
  - Z: Izquierda (kiri)
  - C: Central (tengah)
  - X: Label teks (seluruh gigi)
- Hover menyorot permukaan (kuning), klik memvalidasi dan dapat menandai permukaan tergantung pemilihan treatment (mekanisme Knockout tersedia dalam skrip asli). Implementasi saat ini memfokuskan pada penandaan label berdasarkan kode pemeriksaan.

Lihat: [odontogram.blade.php: drawDiente()](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/resources/views/rekam/odontogram.blade.php#L189-L356)

### Penomoran FDI yang dirender

- Rahang kiri atas: 18 → 11 (berturut ke tengah)
- Rahang kiri sulung atas: 55 → 51
- Rahang kiri sulung bawah: 85 → 81
- Rahang kiri bawah: 48 → 41
- Rahang kanan atas: 11 → 18 (ke kanan)
- Rahang kanan sulung atas: 61 → 65
- Rahang kanan sulung bawah: 71 → 75
- Rahang kanan bawah: 31 → 38

Lihat penempatan di: [rekam-gigi.blade.php (ViewModel)](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/resources/views/rekam/rekam-gigi.blade.php#L142-L171) dan [odontogram.blade.php (ViewModel)](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/resources/views/rekam/odontogram.blade.php#L401-L493).

## Kode Kondisi & Pewarnaan (Aplikasi)

Implementasi pewarnaan permukaan pada papan mengikuti kode pemeriksaan yang ditampilkan sebagai label gigi. Pemetaan yang digunakan saat ini:

- amf: hitam (amalgam/logam biasa; terutama pusat/permukaan terkait)
- gif: hijau (restorasi sewarna gigi/ionomer/resin)
- fis: merah (fissure sealant)
- car: garis tepi hitam tebal (lesi karies)
- nvt: hitam pada permukaan S (not vital atau kondisi nekrosis permukaan tertentu)
- cfr: hitam pada beberapa permukaan (crown fracture)
- poc: hijau pada seluruh permukaan (porcelain/keramik terkait)
- fmc: hitam pada seluruh gigi (full metal crown)
- abu: abu-abu pada seluruh gigi (komponen/abutment/keadaan khusus)
- mis: merah pada seluruh gigi (missing/kehilangan elemen)

Pemetaan warna berada di fungsi `drawDiente(...)` pada tampilan: [rekam-gigi.blade.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/resources/views/rekam/rekam-gigi.blade.php#L298-L355) dan [odontogram.blade.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/resources/views/rekam/odontogram.blade.php#L204-L261).

Catatan:
- Daftar kode dan nama kondisi gigi bersumber dari master data `KondisiGigi` (lihat `KondisiGigi::all()` saat menyiapkan form). Pastikan konsistensi kode dengan standar klinis.

## Cara Menggunakan (Klinik)

1. Buka detail Rekam Medis pasien.
2. Klik “Tambah Rekam Gigi” untuk membuka papan input.
3. Pilih elemen gigi (FDI), pilih kondisi gigi (kode), pilih diagnosa (ICD), pilih tindakan.
4. Klik “+ Tambah” untuk memasukkan rincian ke tabel.
5. Klik “Simpan” untuk menyimpan ke rekam pasien.
6. Buka “Lihat Riwayat Odontogram” untuk melihat papan riwayat agregat pasien.

Tautan cepat: [rekam-gigi.blade.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/resources/views/rekam/rekam-gigi.blade.php), [odontogram.blade.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/resources/views/rekam/odontogram.blade.php).

## Integrasi & Rute

- Input: `GET /rekam/gigi/{rekamId}` → form; `POST /rekam/gigi/{rekamId}/store` → simpan.
- Riwayat: `GET /rekam/gigi/{pasienId}/odontogram` → papan riwayat.
- Endpoint generik legacy: `GET /odontogram/{id}` tersedia untuk akses langsung.

Lihat: [routes/web.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/public/rekam-medis-master/routes/web.php#L97-L101).

## Catatan Arsitektur & Pengembangan

- Implementasi papan menggunakan jQuery SVG dan Knockout 2.0 (stabil, namun legacy). Refactor ke framework modern dapat dipertimbangkan, namun saat ini fitur berjalan baik.
- Konsistensi data riwayat: label pemeriksaan yang ditampilkan per elemen adalah hasil kecocokan pertama dari list historis. Jika ada multipencatatan untuk elemen yang sama, urutan data mempengaruhi label yang terlihat. Disarankan menormalisasi tampilan (mis. ambil pemeriksaan terbaru per elemen) bila dibutuhkan.
- Penambahan kode kondisi baru: tambahkan di master `KondisiGigi`, lalu perluas logika pewarnaan di `drawDiente(...)` agar representasi visual konsisten.
- Warna klinis: sesuaikan dengan kaidah klinik (emas=merah, amalgam=hitam, restorasi sewarna gigi=hijau, fissure sealant=merah muda) dan kebijakan internal bila berbeda.

## Reliabilitas & Audit

- Rekam Gigi bersifat legal dan harus akurat. Pastikan input (FDI, diagnosa ICD, tindakan) valid.
- Pertimbangkan logging perubahan dan verifikasi pemeriksaan untuk audit klinis.

---

Dokumen ini dapat langsung dikloning bersama modul Rekam Medis Gigi untuk referensi operasional dan pengembangan.

## Grand Desain Pengembangan (Laravel 12, React, TailwindCSS, Framer Motion, Livewire)

### Prinsip Arsitektur

- Pisahkan tanggung jawab: React menangani kanvas interaktif SVG; Livewire menangani form CRUD dan orkestrasi UI; Laravel 12 menyajikan API dan otorisasi; Tailwind menjadi dasar styling; Framer Motion dipakai untuk mikro‑interaksi.
- Gunakan FDI Numbering System dan MODVL sebagai standar domain; pertahankan konsistensi kode kondisi pada master data.
- Desain untuk skalabilitas: API idempotent, penyimpanan per‑elemen terstruktur, siap perluasan ke per‑permukaan (opsional).

### Langkah Implementasi Bertahap

1) Fondasi Data & API
- Audit model yang ada: Rekam, RekamGigi, KondisiGigi, Tindakan.
- Tambah endpoint API versi 1 (REST) untuk odontogram:
  - GET /api/odontogram/{pasienId}: ringkasan riwayat per elemen gigi.
  - GET /api/rekam-gigi/{rekamId}: detail untuk sesi aktif.
  - POST /api/rekam-gigi/{rekamId}: simpan batch elemen+kode kondisi+diagnosa+tindakan.
- Standarisasi payload: elemen_gigi (FDI), pemeriksaan (kode), diagnosa (ICD), tindakan (kode), metadata waktu/dokter.
- Validasi server‑side: pastikan kode valid terhadap master; rate‑limit untuk mencegah spam.

2) Komponen React OdontogramCanvas (SVG)
- Buat komponen React (resources/js/components/OdontogramCanvas.tsx) untuk menggambar grid gigi FDI menggunakan SVG.
- Render 5 permukaan (S, I, D, Z, C) dan label X per gigi; terapkan pemetaan warna sesuai kode kondisi.
- State manajemen lokal (React state) cukup untuk interaksi dasar; gunakan props untuk data dari Livewire/API.
- Ekspose event onSelect(elemen, permukaan?) agar form bisa menangkap klik pada gigi/permukaan.

3) Integrasi Livewire (Form & Orkestrasi)
- Livewire component (app/Livewire/RekamGigiForm.php) untuk:
  - Memuat master data (KondisiGigi, Tindakan) dan riwayat sesi.
  - Menangani input elemen, kondisi, diagnosa (modal ICD), tindakan.
  - Mengirim ke API saat Simpan.
- Bridge React ↔ Livewire:
  - Mount React di Blade/Livewire view via <div id="odontogram-root"></div> lalu hydrate dengan data JSON.
  - Komunikasi: gunakan CustomEvent browser (dispatchEvent) dari React ke Livewire; Livewire memutakhirkan form.

4) Styling TailwindCSS
- Ganti CSS kustom odontograma.css dengan utilitas Tailwind untuk layout, tipografi, dan spacing.
- Buat palet warna utilitas untuk kondisi klinis (hitam, hijau, merah, merah muda, abu‑abu); gunakan class Tailwind di React.

5) Mikro‑Interaksi Framer Motion
- Animasi hover/klik pada permukaan gigi (fade/scale) untuk feedback yang jelas.
- Transisi saat menambahkan baris rincian ke tabel; gunakan motion.div pada container baris.
- Hindari animasi berlebihan; prioritaskan aksesibilitas dan kinerja.

6) Visualisasi Riwayat (Read‑only)
- Odontogram riwayat pasien: gunakan komponen React yang sama dalam mode read‑only, sumber data dari GET /api/odontogram/{pasienId}.
- Tampilkan lapisan waktu (opsional) dengan slider untuk melihat perubahan.

7) Penyimpanan Per‑Permukaan (Opsional, Tahap Lanjut)
- Skema tambahan: tabel odontogram_surfaces untuk mencatat kondisi per permukaan (elemen, permukaan MODVL, kode kondisi, waktu).
- Ubah API POST agar mendukung granularitas permukaan; fallback tetap mendukung per‑elemen.
- Perbarui pemetaan warna agar akurat per permukaan.

8) Keandalan & Audit
- Logging tindakan simpan/ubah/hapus dengan user/dokter, timestamp, dan diff.
- Simpan rekam historis versi; sediakan endpoint audit.

9) Keamanan & Akses
- Otorisasi berbasis peran (dokter, perawat, admin); batasi akses ubah untuk sesi rekam aktif saja.
- Validasi kuat terhadap input; sanitasi teks diagnosa; jangan tampilkan data sensitif di klien.

10) Kinerja & Skalabilitas
- Cache master data (KondisiGigi, Tindakan) di klien dan server.
- Memoisasi render SVG; hanya rerender gigi yang berubah.
- Pertimbangkan splitting bundle untuk halaman odontogram; lazy load Framer Motion.

11) Observabilitas & QA
- Tambah telemetry: waktu render, latensi API, error rate.
- Uji unit (PHP/Laravel untuk API; React Testing Library untuk komponen); uji integrasi Livewire+React (Cypress atau Playwright bila tersedia).

12) Migrasi Bertahap dari Implementasi Legacy
- Tahap 1: React read‑only untuk riwayat, berdampingan dengan Blade/Knockout.
- Tahap 2: Form input tetap Livewire, kanvas React interaktif; data disimpan via API baru.
- Tahap 3: Hapus dependensi jQuery/Knockout dari halaman odontogram; pindahkan styling ke Tailwind.
- Tahap 4: Aktifkan penyimpanan per‑permukaan bila diperlukan; audit menyeluruh.

### Definisi Komponen & Tanggung Jawab
- OdontogramCanvas (React): render grid FDI, pewarnaan, event klik.
- RekamGigiForm (Livewire): form input, validasi, submit, integrasi ICD.
- OdontogramService (Laravel): mapping FDI, agregasi riwayat, validasi payload.
- OdontogramController (Laravel): endpoint API public/internal, otorisasi.

### Pemetaan Warna Standar
- emas: merah
- amalgam/logam: hitam
- restorasi sewarna gigi: hijau
- fissure sealant: merah muda
- kondisi khusus (lesi karies, crown fracture, full metal crown, abutment, missing): sesuai pemetaan internal yang ada; konsistenkan di satu tempat.

### Rencana Rilis
- Rilis 1: API dasar + React read‑only + Tailwind layout.
- Rilis 2: Interaksi klik permukaan + Livewire form + Simpan batch.
- Rilis 3: Audit trail + framer motion mikro‑interaksi + optimasi performa.
- Rilis 4: Penyimpanan per‑permukaan (opsional) + laporan visual.

### Acceptance Criteria Utama
- Render akurat FDI dan MODVL; warna sesuai standar klinis.
- Simpan dan muat ulang data tanpa kehilangan konsistensi.
- Interaksi responsif, aksesibel, dan cepat pada perangkat umum klinik.
