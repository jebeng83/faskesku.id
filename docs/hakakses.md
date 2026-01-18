# Grand Desain Hak Akses Aplikasi

Tujuan: rancangan hak akses yang modern, elegan, dan profesional untuk aplikasi berbasis Laravel + React/Inertia, dengan RBAC granular, pengamanan berlapis, dan skalabilitas jangka panjang.

## Prinsip Arsitektur
- Defense-in-depth: otorisasi di server (Policies/Gates), middleware, dan visibilitas UI.
- Separation of concerns: definisi izin tersentral (seeder), pengecekan di middleware/policy, rendering UI mengikuti data yang dibagikan Inertia.
- Konsistensi penamaan: kebab-case, berpola modul.resource.action agar mudah dikelola.
- Skalabilitas: siap penambahan modul/tenant, kompatibel session-based untuk SPA dan token-based API.

## Tumpukan Teknologi & Integrasi
- Backend: Laravel + Spatie Laravel Permission, session-based auth, dukungan token via Sanctum.
- Frontend: React 18 + Inertia.js, Tailwind, Ziggy route helper.
- Data access UI: menu disusun dan difilter berdasarkan permission.
- Referensi kode:
  - Sharing auth & permissions ke frontend: [HandleInertiaRequests.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Middleware/HandleInertiaRequests.php#L64-L80)
  - Middleware visibilitas halaman berbasis menu: [MenuPermissionMiddleware.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Middleware/MenuPermissionMiddleware.php)
  - Model menu dan relasi permission: [Menu.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Models/Menu.php#L70-L88)
  - RBAC sumber izin & peran: [PermissionSeeder.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/database/seeders/PermissionSeeder.php#L124-L173) dan [config/permission.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/config/permission.php)
  - Guard & stateful config Sanctum: [config/sanctum.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/config/sanctum.php)
  - Grup API dilindungi auth (web session): [routes/api.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/api.php#L159-L190)
  - User traits: HasApiTokens + HasRoles: [User.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Models/User.php)

## Model RBAC
- Roles standar: admin, dokter, petugas; bisa diperluas (keuangan, laboratorium, farmasi).
- Konvensi permission:
  - Modul landing: modul.index (contoh: farmasi.index, pcare.index, satusehat.index) — lihat [PermissionSeeder.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/database/seeders/PermissionSeeder.php#L124-L140).
  - CRUD: view-resource, create-resource, edit-resource, delete-resource.
  - Aksi khusus: export-data, manage-settings, generate-reports.
- Group-level modul access: group.<modul>.access untuk mengendalikan seluruh modul. Lihat rancangan di [HakAksesUser.md](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/docs/HakAksesUser.md).

## Hierarki Izin & Menu
- Root modul diberi permission_name group.<modul>.access guna kontrol visibilitas modul.
- Submenu diberi permission granular (mis. farmasi.jenis-obat.index) untuk kontrol detail.
- Filtering menu di backend, frontend merender dari data yang dibagikan.
- Rujukan UI & API:
  - Props Inertia: auth.permissions, menu_hierarchy — [HandleInertiaRequests.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Middleware/HandleInertiaRequests.php#L64-L80)
  - Manajemen menu: [MenuController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/MenuController.php#L21-L70)
  - Sidebar mengikuti menu_hierarchy: contoh [SidebarMenu.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Components/SidebarMenu.jsx#L186-L216)

## Middleware & Guards
- SPA: group ['web','auth'] untuk API internal Inertia — [routes/api.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/api.php#L159-L190).
- Eksternal API: gunakan 'auth:sanctum' untuk token-based bila diperlukan.
- MenuPermissionMiddleware: validasi permission berbasis definisi menu ke route-name.
- Tambahan penguatan: gunakan middleware 'permission:<izin>' pada grup modul untuk server-side hard gate.

## Kebijakan (Policies) & Gate
- Gunakan Policy per resource untuk otorisasi granular dan row-level.
- Pola:
  - Policy menentukan aturan view/update/delete berdasarkan role/permission dan ownership.
  - Controller memanggil authorize('action', $model); query scope memfilter data sesuai hak.
- Contoh pola implementasi:

```php
public function show(Patient $patient)
{
    $this->authorize('view', $patient);
    // ...
}
```

- Rujukan pedoman: bagian Authorization di [keamanan.md](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/docs/keamanan.md#L601-L665).

## Enforce di Frontend
- Render kondisional menu/aksi menggunakan auth.permissions yang dibagikan.
- Navigasi menggunakan Ziggy, fallback aman ketika route tidak tersedia.
- Catatan: hiding di UI bukan kontrol utama; server tetap memverifikasi via middleware/policy.

## API Hak Akses & Manajemen
- Endpoint roles/permissions tersedia: lihat [PermissionController routes](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/api.php#L175-L190).
- Frontend integrasi: routes helper TS untuk permissions — [PermissionController.ts](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/actions/App/Http/Controllers/API/PermissionController.ts).
- User API menyediakan roles/permissions: [UserController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/API/UserController.php#L159-L177).

## Auditing & Monitoring
- Security logging untuk aktivitas penting: lihat dokumentasi [updatekeamanan.md](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/docs/updatekeamanan.md#L130-L170).
- Rate limiting di login/API, HSTS & CSP via middleware; referensi tersedia di dokumen keamanan.

## Multi-Branch/Multi-Tenant (Roadmap)
- Skema tenant/branch opsional:
  - Tambah kolom branch_id pada User dan resource utama.
  - Scope queries berdasarkan branch; admin pusat bypass.
  - Izin bertingkat: permission dapat diberi konteks tenant.
- Integrasi premium module gating untuk fitur berbayar — [PremiumModuleHelper.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Helpers/PremiumModuleHelper.php#L244-L266).

## Prosedur Penambahan Modul Baru (Checklist)
- Backend
  - Tambah permission group modul: group.<modul>.access.
  - Tambah izin granular: modul.index/create/edit/delete dsb.
  - Proteksi routes modul: middleware ['auth'] + permission:group.<modul>.access.
  - Buat Policy untuk resource utama, panggil authorize() di controller.
- Menu & UI
  - Seed menu root dengan permission_name group.<modul>.access.
  - Seed submenu dengan permission_name granular.
  - Gunakan Ziggy untuk navigasi; render kondisional dari auth.permissions.
- Verifikasi
  - Jalankan seeder permissions/menus.
  - Pastikan API grup berada dalam blok auth.
  - Uji akses dengan user tanpa izin dan dengan izin lengkap.

## Rekomendasi Penamaan Izin
- Modul landing: modul.index
- CRUD: view-*, create-*, edit-*, delete-*
- Aksi domain: export-data, approve-transaksi, generate-reports
- Group modul: group.<modul>.access

## Catatan Implementasi
- Izin sebaiknya didefinisikan di seeder terpusat dan di-assign ke role melalui seeder.
- MenuPermissionMiddleware menjaga konsistensi antara sidebar dan akses halaman — tetap sertakan middleware/policy agar tidak hanya mengandalkan visibilitas UI.
- Untuk API pihak ketiga, aktifkan Sanctum dan gunakan guard 'auth:sanctum' pada endpoint yang relevan.

## Catatan Implementasi Terbaru (2026-01)
- Frontend membagikan izin aktif via Inertia props: `auth.permissions`, sehingga UI dapat merender kondisional tanpa request tambahan. Lihat [HandleInertiaRequests.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Middleware/HandleInertiaRequests.php#L64-L75).
- Ditambahkan hook reusable untuk pengecekan izin di React: [usePermission.js](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/hooks/usePermission.js). Hook menyediakan `can(name)`, `canAny(...)`, `canAll(...)` berbasis `auth.permissions`.
- Backend user API kini menyinkronkan direct permissions selain roles saat create/update user, sehingga toggle di halaman Users tersimpan sebagai izin aktual. Lihat [UserController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/API/UserController.php).
- Pola UI gating di modul Kepegawaian (contoh “Bidang”):
  - `bidang.view` mengontrol visibilitas field Bidang.
  - `bidang.create` mengontrol tombol/Modal “Tambah Bidang”.
  - `bidang.edit`/`bidang.delete` disiapkan untuk halaman manajemen Bidang jika dibuat terpisah.
  - Implementasi contoh: [Employees/Create.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Employees/Create.jsx), [Employees/Edit.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Employees/Edit.jsx).

### Studi Kasus: Farmasi — Harga Obat (server-side + UI gating)
- Server-side enforcement (middleware permission) telah ditambahkan pada halaman dan endpoint konfigurasi Harga Obat:
  - Halaman pengaturan harga: [web.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/web.php#L2032-L2036) → `permission:farmasi.set-harga-obat`
  - Update pengaturan harga umum: [web.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/web.php#L2037-L2039) → `permission:farmasi.set-penjualan-umum.update`
  - Update pengaturan global harga obat: [web.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/web.php#L2034-L2036) → `permission:farmasi.set-harga-obat.update`
  - Pengaturan per jenis: store/destroy/show dilindungi oleh izin granular [web.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/web.php#L1596-L1600) dan [web.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/web.php#L2041-L2046)
  - Endpoint JSON konfigurasi: [web.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/web.php#L1598-L1600) → `permission:farmasi.set-harga-obat`
- Sumber izin di seeder (terpusat) ditambah untuk konsistensi RBAC:
  - Lihat [PermissionSeeder.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/database/seeders/PermissionSeeder.php#L154-L176) — izin baru: `farmasi.set-harga-obat`, `farmasi.set-harga-obat.update`, `farmasi.set-penjualan.show`, `farmasi.set-penjualan.store`, `farmasi.set-penjualan.destroy`, `farmasi.set-penjualan-umum.update`.
- UI gating (frontend) memastikan UX konsisten dengan hak akses:
  - Halaman Set Harga Obat: tombol Simpan/aksi Hapus digate menggunakan `usePermission()` — lihat [SetHargaObat.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/farmasi/SetHargaObat.jsx#L366-L374), [SetHargaObat.jsx:Hapus Jenis](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/farmasi/SetHargaObat.jsx#L501-L518), [SetHargaObat.jsx:Hapus Barang](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/farmasi/SetHargaObat.jsx#L595-L612).
  - Halaman Data Obat: tombol “Update Harga Semua” digate oleh `farmasi.data-obat.update-harga-semua` — lihat [dataobat.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/farmasi/dataobat.jsx#L130-L168) dan penggunaan di header [dataobat.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/farmasi/dataobat.jsx#L1268-L1276).

#### Template replikasi ke modul/menu lain
- Penamaan izin (konsisten, granular):
  - Halaman/landing: `<modul>.<page>` (contoh: `farmasi.set-harga-obat`)
  - Aksi update halaman: `<modul>.<page>.update`
  - Aksi entitas per jenis/barang: `<modul>.<entity>.show|store|destroy`
  - Bulk action: `<modul>.<resource>.update-harga-semua` atau sesuai domain
- Proteksi routes (server-side):
  - Tambahkan `middleware('permission:<izin>')` pada route halaman, API JSON, dan aksi tulis (store/update/destroy)
  - Pastikan juga berada dalam grup `auth` atau policy sesuai kebutuhan
- Gating UI (frontend):
  - Gunakan `usePermission()` untuk men-disable tombol/aksi jika `!can('<izin>')`
  - Tampilkan feedback yang jelas saat aksi tidak diizinkan
- Seeder & Assignment:
  - Definisikan izin di seeder central; assign ke role yang tepat melalui seeder/UI
  - Selaraskan sidebar/menu dengan `permission_name` agar tampilan konsisten
- Verifikasi:
  - Uji user tanpa izin: halaman dan endpoint ter-block, tombol ter-disable/tersembunyi
  - Uji user berizin: alur normal berfungsi, termasuk bulk actions

- Implementasi Akutansi (Jurnal):
  - UI gating di halaman Jurnal:
    - Tombol “Tambah Jurnal Umum” hanya tampil jika `can('akutansi.jurnal')` [Jurnal.jsx:L255-L261](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Akutansi/Jurnal.jsx#L255-L261)
    - Tombol “Hapus” per baris hanya tampil jika `jenis === 'U'` dan `can('akutansi.jurnal')` [Jurnal.jsx:L340-L345](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Akutansi/Jurnal.jsx#L340-L345)
  - Izin yang digunakan: `akutansi.jurnal` tersedia di seeder [PermissionSeeder.php:L152-L177](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/database/seeders/PermissionSeeder.php#L152-L177)
  - Rekomendasi granular (opsional): definisikan `akutansi.jurnal.create` dan `akutansi.jurnal.delete` untuk memisahkan hak tombol “Tambah” vs “Hapus”; lindungi endpoint `store`/`destroy` dengan middleware `permission:<izin>`.
  - Server-side enforcement (disarankan): tambahkan middleware permission pada grup API Akutansi, minimal untuk Jurnal `store/update/destroy` — rujukan route: [routes/web.php:L979-L998](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/web.php#L979-L998).
  - Menu-level gating: set `permission_name` pada record menu yang mengarah ke `akutansi.jurnal.page` agar visibilitas sidebar konsisten dengan hak akses. Middleware menu akan memverifikasi akses [MenuPermissionMiddleware.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Middleware/MenuPermissionMiddleware.php).

### Contoh Penggunaan di Frontend (React/Inertia)
```jsx
import usePermission from '@/hooks/usePermission';

function FormKepegawaian() {
  const { can } = usePermission();

  return (
    <div>
      {can('bidang.view') && (
        <FieldBidang />
      )}
      {can('bidang.create') && (
        <ButtonTambahBidang />
      )}
    </div>
  );
}
```

### Catatan Penamaan (konsisten dengan konvensi dokumen)
- Resource CRUD: `view-<resource>`, `create-<resource>`, `edit-<resource>`, `delete-<resource>`.
- Atau dengan namespace modul: `<modul>.<resource>.<action>`; contoh yang digunakan: `bidang.view`, `bidang.create`.
- Group modul: `group.<modul>.access` untuk root menu agar seluruh modul bisa digate di tingkat menu.

## Panduan Implementasi Menu Lainnya (Praktis)
1. Definisikan izin di seeder (roles, permissions) untuk modul/menu baru.
2. Isi `permission_name` pada record menu yang relevan agar middleware menu memverifikasi akses. Lihat [MenuPermissionMiddleware.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Middleware/MenuPermissionMiddleware.php).
3. Proteksi server-side:
   - Tambahkan middleware `permission:<nama_izin>` pada route group modul, atau gunakan Policy dan `authorize()` di controller.
4. Render UI kondisional di frontend menggunakan `auth.permissions` melalui hook `usePermission`.
5. Untuk aksi CRUD:
   - Tampilkan tombol “Tambah” hanya jika `can('create-<resource>')` atau `can('<modul>.<resource>.create')`.
   - Tampilkan tombol “Edit/Hapus” per item hanya jika `can('edit-<resource>')` / `can('delete-<resource>')`.
6. Verifikasi end-to-end:
   - Uji dengan user tanpa izin (harus ter-block di middleware/policy dan UI tersembunyi).
   - Uji dengan user dengan izin lengkap (akses terbuka, tombol/field tampil).

## Rekomendasi Modul & Pola Middleware/Policy

**Farmasi**
- Izin minimal: `farmasi.index` (tersedia di seeder)
- Rekomendasi granular (tambahkan di seeder saat siap):
  - `farmasi.jenis-obat.index|create|edit|delete`
  - `farmasi.golongan-obat.index|create|edit|delete`
  - `farmasi.industri.index|create|edit|delete`
  - `farmasi.hutang-obat.index` (akses halaman), `farmasi.hutang-obat.posting`
- Middleware: pada grup route Farmasi gunakan `permission:farmasi.index`; untuk endpoint khusus gunakan izin granular (mis. `permission:farmasi.hutang-obat.posting`).
- Policy: buat policy untuk resource obat/golongan/industri bila ada model khusus; panggil `authorize('view|create|update|delete', $model)`.

**Laboratorium**
- Izin di seeder: `laboratorium.index`, `laboratorium.create`, `laboratorium.edit`, `laboratorium.show`, `laboratorium.cetak`.
- UI gating contoh: tombol “Detail” → `laboratorium.show`, “Update Sampel”/“Input Hasil” → `laboratorium.edit`, “Cetak Hasil” → `laboratorium.cetak`. Lihat implementasi: [Laboratorium/Index.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Laboratorium/Index.jsx#L760-L824)
- Middleware: lindungi halaman dan API dengan izin yang sesuai, mis. `permission:laboratorium.index` untuk halaman, `permission:laboratorium.edit` untuk update.
- Policy: jika ada model PermintaanLab/Detail, gunakan policy untuk membatasi update/delete per ownership/status.

**Keuangan (Akutansi)**
- Izin di seeder: `akutansi.index`, `akutansi.jurnal`, `akutansi.detail-jurnal`, `akutansi.setoran-bank`, dll.
- UI gating Jurnal: “Tambah” dan “Hapus” menggunakan `akutansi.jurnal`. Rujukan: [Akutansi/Jurnal.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Akutansi/Jurnal.jsx#L253-L261) dan [Jurnal.jsx:Hapus](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Akutansi/Jurnal.jsx#L337-L345)
- Rekomendasi granular: tambahkan `akutansi.jurnal.create` dan `akutansi.jurnal.delete` untuk memisahkan hak aksi; gunakan middleware route `permission:<izin>`.
- Policy: untuk transaksi keuangan yang spesifik, gunakan policy agar hanya unit/role terkait yang dapat melihat/mengubah.

## Referensi Kode Tambahan
- Halaman Users untuk toggle izin dan grouping: [Users/Index.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Users/Index.jsx).
- Hook izin: [usePermission.js](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/hooks/usePermission.js).
- Gating UI di Pegawai:
  - [Employees/Create.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Employees/Create.jsx)
  - [Employees/Edit.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Pages/Employees/Edit.jsx)
- Inertia share auth & permissions: [HandleInertiaRequests.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Middleware/HandleInertiaRequests.php#L64-L75)
- API users (roles/permissions): [UserController.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/app/Http/Controllers/API/UserController.php)


## Catatan Arsitektural Saat Membuat Menu Baru
- Pilih pola penamaan izin yang konsisten: modul.index untuk landing, dan modul.resource.action untuk aksi spesifik.
- Definisikan izin di seeder terpusat agar dapat di-assign ke role secara konsisten. Lihat [PermissionSeeder.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/database/seeders/PermissionSeeder.php).
- Terapkan enforcement server-side pada routes menggunakan middleware `permission:<nama_izin>` untuk halaman dan endpoint aksi.
- Terapkan gating UI di frontend menggunakan `auth.permissions` via hook `usePermission()` agar menu dan tombol mengikuti hak akses pengguna.
- Untuk sidebar yang dikode-kan manual, sertakan properti `permission` pada item dan filter sebelum render.
- Gunakan Ziggy route helper dan fallback aman agar UI tidak rusak jika route belum tersedia.

### Langkah-Langkah Praktis
1. Tentukan nama izin untuk menu/aksi baru (misal: `laporan.index` atau `laboratorium.permintaan-lab.index`).
2. Tambahkan nama izin ke [PermissionSeeder.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/database/seeders/PermissionSeeder.php) dan jalankan seeder sesuai alur proyek.
3. Assign izin ke role yang sesuai melalui halaman Users atau seeder role.
4. Tambahkan route halaman/aksi dan proteksi dengan `middleware('permission:<nama_izin>')` di [routes/web.php](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/routes/web.php).
5. Di komponen Sidebar terkait, tambahkan item menu dengan properti `permission` sesuai nama izin.
6. Filter item/children berdasarkan hook `usePermission()`:

```jsx
import usePermission from '@/hooks/usePermission';

const { permissions, can } = usePermission();
const filteredItems = useMemo(() => {
  return items
    .map((item) => {
      if (!item.children) {
        if (item.permission && !can(item.permission)) return null;
        return item;
      }
      const children = (item.children || []).filter(
        (c) => !c.permission || can(c.permission)
      );
      if (children.length === 0) return null;
      return { ...item, children };
    })
    .filter(Boolean);
}, [items, permissions]);
```

7. Jika menggunakan navigasi mobile, terapkan pola yang sama pada daftar nav mobile.
8. Verifikasi end-to-end dengan user tanpa izin (menu/aksi tersembunyi dan route tertolak) dan user dengan izin (akses normal).
9. Dokumentasikan izin dan pemetaan menu di dokumen ini agar mudah direplikasi.

### Contoh Penerapan di Sidebar
- Laboratorium: [SidebarLaboratorium.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Layouts/SidebarLaboratorium.jsx) — item “Permintaan Lab” digate oleh `laboratorium.index`, dan “Tarif/Template Lab” oleh `daftar-tarif.index`.
- Briding: [SidebarBriding.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Layouts/SidebarBriding.jsx) — tautan PCare digate oleh izin `pcare.*` dan SATUSEHAT oleh `satusehat.index`.
- Pengaturan: [SidebarPengaturan.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Layouts/SidebarPengaturan.jsx) — Dashboard (`dashboard.index`), Home (`profile.home`), Setting Aplikasi (`view-settings`), Suara Poli (`antrian.suara-display`), Users (`users.index`), Permissions (`permission.view`), Kepegawaian (`employees.index`, `sip-pegawai.index`).
- Rawat Jalan: [SidebarRalan.jsx](file:///Users/mistermaster/Documents/trae_projects/Faskesku.id/faskesku.id/resources/js/Layouts/SidebarRalan.jsx) — Rawat Jalan (`reg-periksa.index`), Tarif Ralan (`daftar-tarif.index`), SATUSEHAT Encounter (`satusehat.index`).


