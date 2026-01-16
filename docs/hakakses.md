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

