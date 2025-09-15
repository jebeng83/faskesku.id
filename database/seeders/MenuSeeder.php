<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Menu;
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

        // Clear existing menus
        Menu::truncate();

        // Create root menus
        $dashboard = Menu::create([
            'name' => 'Dashboard',
            'slug' => 'dashboard',
            'icon' => 'fas fa-tachometer-alt',
            'route' => 'dashboard',
            'sort_order' => 1,
            'is_active' => true,
            'description' => 'Halaman utama aplikasi'
        ]);

        $masterData = Menu::create([
            'name' => 'Master Data',
            'slug' => 'master-data',
            'icon' => 'fas fa-database',
            'sort_order' => 2,
            'is_active' => true,
            'description' => 'Pengelolaan data master sistem'
        ]);

        $registration = Menu::create([
            'name' => 'Registrasi',
            'slug' => 'registrasi',
            'icon' => 'fas fa-clipboard-list',
            'sort_order' => 3,
            'is_active' => true,
            'description' => 'Modul registrasi pasien dan pemeriksaan'
        ]);

        $rawatJalan = Menu::create([
            'name' => 'Rawat Jalan',
            'slug' => 'rawat-jalan',
            'icon' => 'fas fa-hospital',
            'sort_order' => 4,
            'is_active' => true,
            'description' => 'Modul pelayanan rawat jalan'
        ]);

        $reports = Menu::create([
            'name' => 'Laporan',
            'slug' => 'laporan',
            'icon' => 'fas fa-chart-bar',
            'sort_order' => 5,
            'is_active' => true,
            'description' => 'Laporan dan statistik sistem'
        ]);

        $administration = Menu::create([
            'name' => 'Administrasi',
            'slug' => 'administrasi',
            'icon' => 'fas fa-cogs',
            'sort_order' => 6,
            'is_active' => true,
            'description' => 'Pengaturan sistem dan administrasi'
        ]);

        // Master Data sub-menus
        Menu::create([
            'name' => 'Data Pasien',
            'slug' => 'data-pasien',
            'icon' => 'fas fa-users',
            'route' => 'patients.index',
            'parent_id' => $masterData->id,
            'sort_order' => 1,
            'is_active' => true,
            'permission_name' => 'patient.view',
            'description' => 'Pengelolaan data pasien'
        ]);

        Menu::create([
            'name' => 'Data Pegawai',
            'slug' => 'data-pegawai',
            'icon' => 'fas fa-user-tie',
            'route' => 'employees.index',
            'parent_id' => $masterData->id,
            'sort_order' => 2,
            'is_active' => true,
            'permission_name' => 'employee.view',
            'description' => 'Pengelolaan data pegawai'
        ]);

        // Registration sub-menus
        Menu::create([
            'name' => 'Registrasi Periksa',
            'slug' => 'registrasi-periksa',
            'icon' => 'fas fa-stethoscope',
            'route' => 'reg-periksa.index',
            'parent_id' => $registration->id,
            'sort_order' => 1,
            'is_active' => true,
            'permission_name' => 'reg-periksa.view',
            'description' => 'Registrasi pemeriksaan pasien'
        ]);

        // Administration sub-menus
        Menu::create([
            'name' => 'Manajemen User',
            'slug' => 'manajemen-user',
            'icon' => 'fas fa-users-cog',
            'route' => 'users.index',
            'parent_id' => $administration->id,
            'sort_order' => 1,
            'is_active' => true,
            'permission_name' => 'user.view',
            'description' => 'Pengelolaan pengguna sistem'
        ]);

        Menu::create([
            'name' => 'Manajemen Permission',
            'slug' => 'manajemen-permission',
            'icon' => 'fas fa-shield-alt',
            'route' => 'permissions.index',
            'parent_id' => $administration->id,
            'sort_order' => 2,
            'is_active' => true,
            'permission_name' => 'permission.view',
            'description' => 'Pengelolaan hak akses sistem'
        ]);

        Menu::create([
            'name' => 'Manajemen Menu',
            'slug' => 'manajemen-menu',
            'icon' => 'fas fa-bars',
            'route' => 'menus.index',
            'parent_id' => $administration->id,
            'sort_order' => 3,
            'is_active' => true,
            'permission_name' => 'menu.view',
            'description' => 'Pengelolaan struktur menu sidebar'
        ]);

        // Profile menu (separate from main navigation)
        Menu::create([
            'name' => 'Profil',
            'slug' => 'profil',
            'icon' => 'fas fa-user',
            'route' => 'profile.show',
            'sort_order' => 99,
            'is_active' => true,
            'description' => 'Profil pengguna'
        ]);

        $this->command->info('Menu seeder completed successfully!');
    }
}
