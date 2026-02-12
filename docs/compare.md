# Catatan Compare Branch: Algojo vs aqua

Dokumen ini berisi catatan taktis hasil perbandingan antara branch `Algojo` (lokal) dan `origin/aqua` (remote), dengan fokus pada modul: **PCare**, **Surat**, **Sidebar**, dan **CPPT SOAP**.

## Prinsip Aman (Tidak Mengubah File Lokal)

Analisis dilakukan memakai perintah read-only (`git fetch`, `git log`, `git diff`, `git show`) tanpa `checkout`, `merge`, atau `restore`, sehingga tidak menimpa perubahan lokal yang sedang berjalan.

## Ringkasan

- **Ref compare**: `Algojo` vs `origin/aqua`
- **Merge-base**: `747358f7e62773a323d09c35869d22c44e201109`
- **Commit di `origin/aqua` yang belum ada di `Algojo` (terdeteksi)**
  - `ebab77f7` Merge branch `cleo` into `aqua`
  - `90f67620` Merge branch `Algojo` into `aqua`
  - `2b7490dc` sidebar tambah dashboard
  - `52a2830f` fix: remove duplicate imports and correct variable names
  - `815879c5` Merge branch `Algojo` into `aqua`
  - `e942251c` tanggal kedaluarsa rujukan
  - `a0a2e4ca` Print rujukan pcare di soap
  - `7b62ea77` button kunjungan Pcare
  - `3e7cf736` brodging pcare rout
  - `811400c7` perbaikan notifikasi masalah kunjungan pcare
  - `921f0f57` popup-style banner di bagian Pendaftaran PCare
  - `061759e8` hapus update status periksa di simpan pemeriksaan
  - `4fbb0ee1` kunjungan succses
  - `2faeac1c` panggil antrian succes
  - `75ae23be` ambil antrian 1 kali
- **Skala perubahan (merge-base..origin/aqua)**: **87 files changed, 1557 insertions(+), 1644 deletions(-)**

### Distribusi Modul (berdasarkan path)

- PCare (backend PHP): 3 file
- PCare (Traits/Config/View + routes/api.php): 4 file
- PCare (frontend routes): 31 file
- MobileJKN (frontend routes): 1 file
- Rawat Jalan (frontend routes): 9 file
- Surat: 6 file
- Sidebar/UI Layout: 16 file
- CPPT SOAP UI: 1 file
- Registration UI: 1 file
- Lainnya (routes lain): 11 file
- Lainnya (actions): 6 file
- Backend RawatJalan: 1 file

## Catatan Taktis per Modul

### 1) PCare

#### Perubahan Utama

- Penambahan endpoint berbasis **query string** untuk menghindari masalah karakter `'/'` pada path param (contoh `no_rawat`):
  - `GET /api/pcare/pendaftaran/rawat?no_rawat=...`
  - `GET /api/pcare/kunjungan/preview?no_rawat=...`
- Penambahan opsi konfigurasi MobileJKN untuk retry saat respons mengandung indikasi **Service Expired**.

#### File Terkait

- Backend routes:
  - `routes/api.php` (tambah route `pendaftaran/rawat` via query dan `kunjungan/preview` via query)
- Backend controller:
  - `app/Http/Controllers/Pcare/PcareController.php` (tambah `getPendaftaranByRawatQuery(Request $request)` yang memvalidasi `no_rawat`, lalu memanggil `getPendaftaranByRawat($noRawat)`)
  - `app/Http/Controllers/Pcare/PcareKunjunganController.php` (tambah `previewQuery(Request $request)` yang memvalidasi `no_rawat`, lalu memanggil `preview($noRawat)`)
- Frontend routes (Wayfinder):
  - `resources/js/routes/api/pcare/pendaftaran/by-rawat/index.ts` (file baru untuk `'/api/pcare/pendaftaran/rawat'`)
  - `resources/js/routes/api/pcare/kunjungan/preview/index.ts` (file baru untuk `'/api/pcare/kunjungan/preview'`)
  - Banyak penyesuaian file route lain di `resources/js/routes/api/pcare/*` dan `resources/js/routes/pcare/*`
- Konfigurasi:
  - `config/bpjs.php` (tambah `mobilejkn.retry_service_expired` default `true`)
- Trait behavior (dampak runtime):
  - `app/Traits/BpjsTraits.php` (penambahan mekanisme retry request MobileJKN saat terdeteksi Service Expired dengan refresh kredensial/base url; logging warning ke channel `bpjs`)

#### Rekomendasi Integrasi

- Aman diambil langsung (low risk, perubahan terlokalisir):
  - `routes/api.php`
  - `app/Http/Controllers/Pcare/PcareController.php`
  - `app/Http/Controllers/Pcare/PcareKunjunganController.php`
  - `resources/js/routes/api/pcare/pendaftaran/by-rawat/index.ts`
  - `resources/js/routes/api/pcare/kunjungan/preview/index.ts`
  - `config/bpjs.php`
- Perlu patch manual / review ketat (medium-high risk):
  - `app/Traits/BpjsTraits.php` (mengubah perilaku request MobileJKN + retry + log; perlu dicek efek ke timeout, duplikasi request, dan error handling)
  - File generator/action Wayfinder PCare yang churn besar: `resources/js/actions/App/Http/Controllers/Pcare/PcareController.ts`

#### Checklist Validasi Setelah Disesuaikan

- Uji kasus `no_rawat` yang mengandung `'/'`:
  - endpoint path param (`/rawat/{no_rawat}`) vs query param (`/rawat?no_rawat=`)
- Uji `preview` kunjungan tanpa mengirim (payload) menggunakan query param.
- Uji MobileJKN saat respons “Service Expired”:
  - memastikan retry tidak loop, dan kredensial/URL yang dipakai sesuai.

### 2) Surat

#### Temuan Penting

- `resources/js/routes/surat/index.ts` pada `origin/aqua` terindikasi **broken** (isi file menjadi dua baris import yang duplikat, tanpa export route):

```ts
import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
```

Ini berisiko memutus pemanggilan route `surat.preview` / `surat.pdf` dari sisi frontend.

#### File Terkait

- `resources/js/routes/surat/index.ts` (churn besar: penghapusan export)
- `resources/js/routes/public/surat-sakit/index.ts`
- `resources/js/routes/public/surat-sehat/index.ts`
- `resources/js/routes/rawat-jalan/surat-sakit/index.ts`
- `resources/js/routes/rawat-jalan/surat-sakit/verify/index.ts`
- `resources/js/routes/rawat-jalan/surat-sehat/index.ts`

#### Rekomendasi Integrasi

- Jangan ambil langsung `resources/js/routes/surat/index.ts` dari `origin/aqua`.
- Jika perubahan Surat memang dibutuhkan, lakukan salah satu:
  - Regenerasi file route/wayfinder (lebih aman, konsisten), atau
  - Patch manual dengan mempertahankan export yang dibutuhkan (`preview`, `pdf`, dan default export bila dipakai).

### 3) Sidebar / UI Layout

#### Perubahan Utama

- Ada perubahan styling/animasi item aktif, serta indikasi penambahan/penonjolan menu **Dashboard**.
- Contoh perubahan: `LanjutanRalanSidebar.jsx` menambahkan kontrol ukuran icon berdasarkan menu dashboard, serta aksen visual pada item aktif.

#### File Terkait (sebagian)

- Komponen sidebar:
  - `resources/js/Components/LanjutanRalanSidebar.jsx`
  - `resources/js/Components/LanjutanRegistrasiSidebar.jsx`
  - `resources/js/Components/SidebarDaftarTarifMenu.jsx`
  - `resources/js/Components/SidebarFarmasiMenu.jsx`
  - `resources/js/Components/SidebarKeuanganMenu.jsx`
  - `resources/js/Components/SidebarLaboratoriumMenu.jsx`
  - `resources/js/Components/SidebarLaporanMenu.jsx`
  - `resources/js/Components/SidebarRawatInapMenu.jsx`
- Layout sidebar:
  - `resources/js/Layouts/SidebarBriding.jsx`
  - `resources/js/Layouts/SidebarFarmasi.jsx`
  - `resources/js/Layouts/SidebarKeuangan.jsx`
  - `resources/js/Layouts/SidebarLaboratorium.jsx`
  - `resources/js/Layouts/SidebarLaporan.jsx`
  - `resources/js/Layouts/SidebarPengaturan.jsx`
  - `resources/js/Layouts/SidebarRalan.jsx`
  - `resources/js/Layouts/SidebarRawatInap.jsx`

#### Rekomendasi Integrasi

- Ambil sebagai “paket” (medium risk): perubahan menu dan layout cenderung saling terkait.
- Jika hanya butuh Dashboard/menu tertentu:
  - Patch manual lebih aman supaya tidak mengubah keseluruhan theme/animasi.

### 4) CPPT SOAP (Rawat Jalan)

#### Perubahan Utama

- `resources/js/Pages/RawatJalan/components/CpptSoap.jsx` mengalami perubahan sangat besar (**191 insertions, 626 deletions**).
- Indikasi refactor: penghapusan `React` default import, dan perubahan struktur isi komponen.

#### Rekomendasi Integrasi

- Perlakukan sebagai high risk.
- Jangan ambil langsung kecuali memang dibutuhkan oleh perbaikan tertentu.
- Jika harus diadopsi:
  - Patch manual berbasis kebutuhan (ambil bagian yang diperlukan saja), lalu uji skenario form CPPT lengkap.

## Perintah Compare Aman (Referensi)

```bash
# Commit yang ada di aqua tapi belum ada di Algojo
git log --oneline Algojo..origin/aqua

# Diff berbasis merge-base (lebih representatif untuk compare branch)
git diff --name-status Algojo...origin/aqua

# Audit satu file tanpa checkout
git diff Algojo...origin/aqua -- routes/api.php
git show origin/aqua:resources/js/routes/surat/index.ts
```

