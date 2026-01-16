<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create menu permissions first
        $menuPermissions = [
            'menu.view' => 'Lihat Menu',
            'menu.create' => 'Buat Menu',
            'menu.edit' => 'Edit Menu',
            'menu.delete' => 'Hapus Menu',
        ];

        foreach ($menuPermissions as $name => $description) {
            Permission::firstOrCreate(
                ['name' => $name],
                ['guard_name' => 'web']
            );
        }

        

        // Create root menus
        $dashboard = Menu::updateOrCreate(
            ['slug' => 'dashboard'],
            [
            'name' => 'Dashboard',
            'icon' => 'fas fa-tachometer-alt',
            'route' => 'dashboard',
            'url' => route('dashboard'),
            'sort_order' => 1,
            'is_active' => true,
            'description' => 'Halaman utama aplikasi',
            ]
        );

        $masterData = Menu::updateOrCreate(
            ['slug' => 'master-data'],
            [
            'name' => 'Master Data',
            'icon' => 'fas fa-database',
            'route' => 'master-data.index',
            'url' => route('master-data.index'),
            'sort_order' => 2,
            'is_active' => true,
            'description' => 'Pengelolaan data master sistem',
            ]
        );

        $registration = Menu::updateOrCreate(
            ['slug' => 'registrasi'],
            [
            'name' => 'Registrasi',
            'icon' => 'fas fa-clipboard-list',
            'sort_order' => 3,
            'is_active' => true,
            'description' => 'Modul registrasi pasien dan pemeriksaan',
            ]
        );

        $rawatJalan = Menu::updateOrCreate(
            ['slug' => 'rawat-jalan'],
            [
            'name' => 'Rawat Jalan',
            'icon' => 'fas fa-hospital',
            'sort_order' => 4,
            'is_active' => true,
            'description' => 'Modul pelayanan rawat jalan',
            ]
        );

        $reports = Menu::updateOrCreate(
            ['slug' => 'laporan'],
            [
            'name' => 'Laporan',
            'icon' => 'fas fa-chart-bar',
            'sort_order' => 5,
            'is_active' => true,
            'description' => 'Laporan dan statistik sistem',
            ]
        );

        $administration = Menu::updateOrCreate(
            ['slug' => 'administrasi'],
            [
            'name' => 'Administrasi',
            'icon' => 'fas fa-cogs',
            'sort_order' => 6,
            'is_active' => true,
            'description' => 'Pengaturan sistem dan administrasi',
            ]
        );

        // Farmasi root menu -> navigates directly to Farmasi Index
        $farmasi = Menu::updateOrCreate(
            ['slug' => 'farmasi'],
            [
            'name' => 'Farmasi',
            'icon' => 'fas fa-pills',
            'route' => 'farmasi.index',
            'url' => route('farmasi.index'),
            'sort_order' => 7,
            'is_active' => true,
            'description' => 'Modul farmasi dan pengelolaan obat',
            ]
        );

        // Bridging PCare root menu -> navigates to PCare Menu page
        $pcare = Menu::updateOrCreate(
            ['slug' => 'pcare'],
            [
            'name' => 'Briding Pcare',
            'icon' => 'fas fa-link',
            'route' => 'pcare.index',
            'url' => route('pcare.index'),
            'sort_order' => 8,
            'is_active' => true,
            'description' => 'Bridging ke layanan PCare BPJS',
            ]
        );

        // SATUSEHAT root menu -> navigates to SATUSEHAT Menu page
        $satusehat = Menu::updateOrCreate(
            ['slug' => 'satusehat'],
            [
            'name' => 'SatuSehat',
            'icon' => 'fas fa-heartbeat',
            'route' => 'satusehat.index',
            'url' => route('satusehat.index'),
            'sort_order' => 9,
            'is_active' => true,
            'permission_name' => 'satusehat.index',
            'description' => 'Modul integrasi SATUSEHAT (Kemenkes)',
            ]
        );

        // Master Data sub-menus
        Menu::updateOrCreate(
            ['slug' => 'data-pasien'],
            [
            'name' => 'Data Pasien',
            'icon' => 'fas fa-users',
            'route' => 'patients.index',
            'url' => route('patients.index'),
            'parent_id' => $masterData->id,
            'sort_order' => 1,
            'is_active' => true,
            'permission_name' => 'patient.view',
            'description' => 'Pengelolaan data pasien',
            ]
        );

        Menu::updateOrCreate(
            ['slug' => 'data-pegawai'],
            [
            'name' => 'Data Pegawai',
            'icon' => 'fas fa-user-tie',
            'route' => 'employees.index',
            'url' => route('employees.index'),
            'parent_id' => $masterData->id,
            'sort_order' => 2,
            'is_active' => true,
            'permission_name' => 'employee.view',
            'description' => 'Pengelolaan data pegawai',
            ]
        );

        Menu::updateOrCreate(
            ['slug' => 'data-dokter'],
            [
            'name' => 'Data Dokter',
            'icon' => 'fas fa-user-md',
            'route' => 'doctors.index',
            'parent_id' => $masterData->id,
            'sort_order' => 3,
            'is_active' => true,
            'permission_name' => 'view-doctors',
            'description' => 'Pengelolaan data dokter',
            ]
        );

        Menu::updateOrCreate(
            ['slug' => 'data-spesialis'],
            [
            'name' => 'Data Spesialis',
            'icon' => 'fas fa-stethoscope',
            'route' => 'spesialis.index',
            'parent_id' => $masterData->id,
            'sort_order' => 4,
            'is_active' => true,
            'permission_name' => 'view-spesialis',
            'description' => 'Pengelolaan data spesialis medis',
            ]
        );

        Menu::updateOrCreate(
            ['slug' => 'data-asuransi'],
            [
            'name' => 'Data Asuransi',
            'icon' => 'fas fa-shield-alt',
            'route' => 'penjab.index',
            'url' => route('penjab.index'),
            'parent_id' => $masterData->id,
            'sort_order' => 5,
            'is_active' => true,
            'permission_name' => 'penjab.view',
            'description' => 'Pengelolaan data penjamin (asuransi)',
            ]
        );

        Menu::updateOrCreate(
            ['slug' => 'data-poliklinik'],
            [
            'name' => 'Data Poliklinik',
            'icon' => 'fas fa-clinic-medical',
            'route' => 'poliklinik.index',
            'url' => route('poliklinik.index'),
            'parent_id' => $masterData->id,
            'sort_order' => 6,
            'is_active' => true,
            'permission_name' => 'poliklinik.view',
            'description' => 'Pengelolaan data poliklinik dan tarif registrasi',
            ]
        );

        // Jadwal Dokter (Master Data)
        Menu::updateOrCreate(
            ['slug' => 'jadwal-dokter'],
            [
            'name' => 'Jadwal Dokter',
            'icon' => 'fas fa-calendar-alt',
            'route' => 'jadwal.index',
            'url' => route('jadwal.index'),
            'parent_id' => $masterData->id,
            'sort_order' => 7,
            'is_active' => true,
            'permission_name' => 'jadwal.index',
            'description' => 'Pengaturan jadwal praktik dokter per poliklinik',
            ]
        );

        // Registration sub-menus
        Menu::updateOrCreate(
            ['slug' => 'pendaftaran-pasien'],
            [
            'name' => 'Pendaftaran Pasien',
            'icon' => 'fas fa-clipboard-list',
            'route' => 'registration.index',
            'parent_id' => $registration->id,
            'sort_order' => 1,
            'is_active' => true,
            'permission_name' => 'registration.view',
            'description' => 'Pendaftaran pasien ke poliklinik',
            ]
        );

        Menu::updateOrCreate(
            ['slug' => 'registrasi-periksa'],
            [
            'name' => 'Registrasi Periksa',
            'icon' => 'fas fa-stethoscope',
            'route' => 'reg-periksa.index',
            'parent_id' => $registration->id,
            'sort_order' => 2,
            'is_active' => true,
            'permission_name' => 'reg-periksa.view',
            'description' => 'Registrasi pemeriksaan pasien',
            ]
        );

        // Administration sub-menus
        Menu::updateOrCreate(
            ['slug' => 'manajemen-user'],
            [
            'name' => 'Manajemen User',
            'icon' => 'fas fa-users-cog',
            'route' => 'users.index',
            'parent_id' => $administration->id,
            'sort_order' => 1,
            'is_active' => true,
            'permission_name' => 'user.view',
            'description' => 'Pengelolaan pengguna sistem',
            ]
        );

        Menu::updateOrCreate(
            ['slug' => 'manajemen-permission'],
            [
            'name' => 'Manajemen Permission',
            'icon' => 'fas fa-shield-alt',
            'route' => 'permissions.index',
            'parent_id' => $administration->id,
            'sort_order' => 2,
            'is_active' => true,
            'permission_name' => 'permission.view',
            'description' => 'Pengelolaan hak akses sistem',
            ]
        );

        Menu::updateOrCreate(
            ['slug' => 'manajemen-menu'],
            [
            'name' => 'Manajemen Menu',
            'icon' => 'fas fa-bars',
            'route' => 'menus.index',
            'url' => route('menus.index'),
            'parent_id' => $administration->id,
            'sort_order' => 3,
            'is_active' => true,
            'permission_name' => 'menu.view',
            'description' => 'Pengelolaan struktur menu sidebar',
            ]
        );

        // Kepegawaian menu (parent)
        $kepegawaian = Menu::updateOrCreate(
            ['slug' => 'kepegawaian'],
            [
            'name' => 'Kepegawaian',
            'icon' => 'fas fa-user-tie',
            'parent_id' => $administration->id,
            'sort_order' => 4,
            'is_active' => true,
            'description' => 'Pengelolaan data kepegawaian',
            ]
        );

        // Kepegawaian sub-menus
        Menu::updateOrCreate(
            ['slug' => 'pegawai'],
            [
            'name' => 'Pegawai',
            'icon' => 'fas fa-users',
            'route' => 'employees.index',
            'url' => route('employees.index'),
            'parent_id' => $kepegawaian->id,
            'sort_order' => 1,
            'is_active' => true,
            'permission_name' => 'employees.index',
            'description' => 'Pengelolaan data pegawai',
            ]
        );

        Menu::updateOrCreate(
            ['slug' => 'sip-pegawai'],
            [
            'name' => 'SIP Pegawai',
            'icon' => 'fas fa-file-medical',
            'route' => 'sip-pegawai.index',
            'url' => route('sip-pegawai.index'),
            'parent_id' => $kepegawaian->id,
            'sort_order' => 2,
            'is_active' => true,
            'permission_name' => 'sip-pegawai.index',
            'description' => 'Pengelolaan Surat Izin Praktik (SIP) pegawai',
            ]
        );

        // Note: Farmasi submenu entries are intentionally omitted to keep sidebar clean.

        // Profile menu (separate from main navigation)
        Menu::updateOrCreate(
            ['slug' => 'profil'],
            [
            'name' => 'Profil',
            'icon' => 'fas fa-user',
            'route' => 'profile.show',
            'sort_order' => 99,
            'is_active' => true,
            'description' => 'Profil pengguna',
            ]
        );

        $this->command->info('Menu seeder completed successfully!');
    }
}
