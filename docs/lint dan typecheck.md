# Lint dan Typecheck

Dokumentasi ini menjelaskan lint dan typecheck di proyek, meliputi manfaat, kekurangan, cara pakai, serta contoh output aktual dari perintah yang tersedia.

## Apa Itu
- Lint: Analisis statis untuk mendeteksi masalah gaya, potensi bug, dan pola anti‑pattern pada JavaScript/TypeScript/React.
- Typecheck: Pemeriksaan tipe menggunakan TypeScript agar kesesuaian kontrak antar modul terjaga tanpa meng‑emit berkas.

## Manfaat
- Menangkap error lebih awal sebelum build atau runtime (no‑undef, no‑unused‑vars, dsb.).
- Menjaga konsistensi gaya dan praktik pengkodean di seluruh tim.
- Memastikan definisi routes TS tetap konsisten (URL, method, parameter) dan mudah dirawat.
- Meningkatkan kepercayaan saat refactor karena regresi terdeteksi otomatis.

## Kekurangan
- Dapat menghasilkan banyak warning di codebase besar/legacy; perlu perbaikan bertahap.
- Beberapa rule dapat terlalu ketat untuk fase awal, sehingga perlu dikonfigurasi ulang atau dibisukan.
- Typecheck yang sangat luas bisa lambat; karena itu cakupan awal dibatasi ke folder paling relevan.

## Cara Pakai
- Jalankan lint satu kali:

```bash
npm run lint
```

- Perbaikan otomatis yang aman:

```bash
npm run lint:fix
```

- Jalankan typecheck:

```bash
npm run typecheck
```

- Mode kualitas berkelanjutan (dev server + lint watch + typecheck watch):

```bash
npm run dev:quality
```

## Ruang Lingkup & Konfigurasi
- ESLint:
  - Konfigurasi: eslint.config.js
  - Menganalisis: resources/js/**/*.{js,jsx,ts,tsx}
  - Mengabaikan: node_modules, public, storage, vendor, resources/js/actions/**, resources/js/routes/farmasi/**
  - Environment: browser (globals seperti window, document, fetch, FormData, AbortController, route, dll. diset sebagai readonly)
  - Opsi CLI: --no-inline-config untuk menghindari konflik directive lint lama.

- TypeScript:
  - Konfigurasi: tsconfig.json
  - Include awal: resources/js/routes/**/*.ts(x), plus deklarasi resources/js/wayfinder.d.ts
  - Exclude: actions/** dan routes/farmasi/** agar pemeriksaan fokus dan cepat.
  - Opsi: noEmit, skipLibCheck untuk kinerja.

## Contoh Output Lint

Contoh hasil lint (dipersingkat) dari proyek ini:

```text
/resources/js/Pages/farmasi/SisaStok.jsx
  30:24  error    'AbortController' is not defined  no-undef
  53:18  warning  'e' is defined but never used     no-unused-vars

/resources/js/app.jsx
  5:10   warning  'router' is defined but never used  no-unused-vars

/resources/js/bootstrap.js
  135:15  warning  'is401' is assigned a value but never used  no-unused-vars

✖ 756 problems (121 errors, 635 warnings)
```

Catatan:
- Banyak peringatan adalah hal normal saat awal adopsi lint di codebase besar.
- Perbaiki bertahap, mulai dari error no‑undef, lalu lanjutkan no‑unused‑vars, dst.

## Contoh Output Typecheck

Typecheck pada subset routes (tanpa emit) berhasil:

```bash
> tsc -p tsconfig.json --noEmit
```

Jika tidak ada pesan error, typecheck dinyatakan sukses.

## Rekomendasi Perbaikan Bertahap
- Prioritaskan error no‑undef (tambahkan globals, atau impor API yang benar).
- Gunakan lint:fix untuk perbaikan otomatis aman.
- Perluas cakupan typecheck secara bertahap (include folder lain) setelah peringatan mayor berkurang.
- Tambahkan rule yang lebih ketat (mis. no‑console, eqeqeq) setelah baseline stabil.

## Troubleshooting
- “react‑hooks/exhaustive‑deps” error pada ESLint 9: beberapa versi plugin tidak kompatibel. Solusi awal: nonaktifkan aturan hooks, atau upgrade plugin yang kompatibel.
- Terlalu banyak “no‑unused‑vars”: lakukan perbaikan bertahap dan manfaatkan lint:fix; jika variabel memang diperlukan nanti, beri komentar TODO dan gunakan variabel saat implementasi.
- Typecheck lambat: jaga include agar fokus; aktifkan strict secara bertahap.

## Referensi File
- Skrip: package.json (lint, lint:fix, lint:watch, typecheck, typecheck:watch, dev:quality)
- ESLint: eslint.config.js
- TypeScript: tsconfig.json
- Deklarasi helper: resources/js/wayfinder.d.ts

