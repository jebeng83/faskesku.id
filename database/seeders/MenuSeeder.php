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
            'url' => route('dashboard'),
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

        $kepegawaian = Menu::create([
            'name' => 'Kepegawaian',
            'slug' => 'kepegawaian',
            'icon' => 'fas fa-id-badge',
            'sort_order' => 7,
            'is_active' => true,
            'description' => 'Modul kepegawaian dan departemen'
        ]);

        $farmasi = Menu::create([
            'name' => 'Farmasi',
            'slug' => 'farmasi',
            'icon' => 'fas fa-pills',
            'sort_order' => 8,
            'is_active' => true,
            'description' => 'Modul farmasi dan obat-obatan'
        ]);

        // Master Data sub-menus
        Menu::create([
            'name' => 'Data Pasien',
            'slug' => 'data-pasien',
            'icon' => 'fas fa-users',
            'route' => 'patients.index',
            'url' => route('patients.index'),
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
            'url' => route('employees.index'),
            'parent_id' => $masterData->id,
            'sort_order' => 2,
            'is_active' => true,
            'permission_name' => 'employee.view',
            'description' => 'Pengelolaan data pegawai'
        ]);

        Menu::create([
            'name' => 'Data Dokter',
            'slug' => 'data-dokter',
            'icon' => 'fas fa-user-md',
            'route' => 'doctors.index',
            'parent_id' => $masterData->id,
            'sort_order' => 3,
            'is_active' => true,
            'permission_name' => 'view-doctors',
            'description' => 'Pengelolaan data dokter'
        ]);

        Menu::create([
            'name' => 'Data Spesialis',
            'slug' => 'data-spesialis',
            'icon' => 'fas fa-stethoscope',
            'route' => 'spesialis.index',
            'parent_id' => $masterData->id,
            'sort_order' => 4,
            'is_active' => true,
            'permission_name' => 'view-spesialis',
            'description' => 'Pengelolaan data spesialis medis'
        ]);

        // Rawat Jalan sub-menus
        Menu::create([
            'name' => 'Pemeriksaan',
            'slug' => 'pemeriksaan',
            'icon' => 'fas fa-stethoscope',
            'route' => 'rawat-jalan.pemeriksaan.index',
            'parent_id' => $rawatJalan->id,
            'sort_order' => 1,
            'is_active' => true,
            'permission_name' => 'rawat-jalan.view',
            'description' => 'Pemeriksaan rawat jalan'
        ]);

        Menu::create([
            'name' => 'Resep',
            'slug' => 'resep',
            'icon' => 'fas fa-prescription',
            'route' => 'rawat-jalan.resep.index',
            'parent_id' => $rawatJalan->id,
            'sort_order' => 2,
            'is_active' => true,
            'permission_name' => 'rawat-jalan.view',
            'description' => 'Pengelolaan resep'
        ]);

        Menu::create([
            'name' => 'Tindakan',
            'slug' => 'tindakan',
            'icon' => 'fas fa-procedures',
            'route' => 'rawat-jalan.tindakan.index',
            'parent_id' => $rawatJalan->id,
            'sort_order' => 3,
            'is_active' => true,
            'permission_name' => 'rawat-jalan.view',
            'description' => 'Tindakan medis'
        ]);

        // Kepegawaian sub-menus
        Menu::create([
            'name' => 'Departemen',
            'slug' => 'departemen',
            'icon' => 'fas fa-building',
            'route' => 'kepegawaian.departemen.index',
            'parent_id' => $kepegawaian->id,
            'sort_order' => 1,
            'is_active' => true,
            'permission_name' => 'departemen.view',
            'description' => 'Pengelolaan departemen'
        ]);

        Menu::create([
            'name' => 'Jabatan',
            'slug' => 'jabatan',
            'icon' => 'fas fa-user-tag',
            'route' => 'kepegawaian.jabatan.index',
            'parent_id' => $kepegawaian->id,
            'sort_order' => 2,
            'is_active' => true,
            'permission_name' => 'jabatan.view',
            'description' => 'Pengelolaan jabatan'
        ]);

        Menu::create([
            'name' => 'Bidang',
            'slug' => 'bidang',
            'icon' => 'fas fa-layer-group',
            'route' => 'kepegawaian.bidang.index',
            'parent_id' => $kepegawaian->id,
            'sort_order' => 3,
            'is_active' => true,
            'permission_name' => 'bidang.view',
            'description' => 'Pengelolaan bidang'
        ]);

        Menu::create([
            'name' => 'Jenjang Jabatan',
            'slug' => 'jenjang-jabatan',
            'icon' => 'fas fa-chart-line',
            'route' => 'kepegawaian.jenjang-jabatan.index',
            'parent_id' => $kepegawaian->id,
            'sort_order' => 4,
            'is_active' => true,
            'permission_name' => 'jenjang-jabatan.view',
            'description' => 'Pengelolaan jenjang jabatan'
        ]);

        Menu::create([
            'name' => 'Staf',
            'slug' => 'staf',
            'icon' => 'fas fa-users',
            'route' => 'kepegawaian.staf.index',
            'parent_id' => $kepegawaian->id,
            'sort_order' => 5,
            'is_active' => true,
            'permission_name' => 'staf.view',
            'description' => 'Pengelolaan staf'
        ]);

        // Farmasi sub-menus
        Menu::create([
            'name' => 'Kategori Obat',
            'slug' => 'kategori-obat',
            'icon' => 'fas fa-tags',
            'route' => 'farmasi.kategori-obat.index',
            'parent_id' => $farmasi->id,
            'sort_order' => 1,
            'is_active' => true,
            'permission_name' => 'kategori-obat.view',
            'description' => 'Pengelolaan kategori obat'
        ]);

        Menu::create([
            'name' => 'Golongan Obat',
            'slug' => 'golongan-obat',
            'icon' => 'fas fa-layer-group',
            'route' => 'farmasi.golongan-obat.index',
            'parent_id' => $farmasi->id,
            'sort_order' => 2,
            'is_active' => true,
            'permission_name' => 'golongan-obat.view',
            'description' => 'Pengelolaan golongan obat'
        ]);

        Menu::create([
            'name' => 'Industri Farmasi',
            'slug' => 'industri-farmasi',
            'icon' => 'fas fa-industry',
            'route' => 'farmasi.industri-farmasi.index',
            'parent_id' => $farmasi->id,
            'sort_order' => 3,
            'is_active' => true,
            'permission_name' => 'industri-farmasi.view',
            'description' => 'Pengelolaan industri farmasi'
        ]);

        Menu::create([
            'name' => 'Satuan Barang',
            'slug' => 'satuan-barang',
            'icon' => 'fas fa-balance-scale',
            'route' => 'farmasi.satuan-barang.index',
            'parent_id' => $farmasi->id,
            'sort_order' => 4,
            'is_active' => true,
            'permission_name' => 'satuan-barang.view',
            'description' => 'Pengelolaan satuan barang'
        ]);

        Menu::create([
            'name' => 'Data Barang',
            'slug' => 'data-barang',
            'icon' => 'fas fa-boxes',
            'route' => 'farmasi.data-barang.index',
            'parent_id' => $farmasi->id,
            'sort_order' => 5,
            'is_active' => true,
            'permission_name' => 'data-barang.view',
            'description' => 'Pengelolaan data barang'
        ]);

        Menu::create([
            'name' => 'Supplier',
            'slug' => 'supplier',
            'icon' => 'fas fa-truck',
            'route' => 'farmasi.supplier.index',
            'parent_id' => $farmasi->id,
            'sort_order' => 6,
            'is_active' => true,
            'permission_name' => 'supplier.view',
            'description' => 'Pengelolaan supplier'
        ]);

        Menu::create([
            'name' => 'Pembelian',
            'slug' => 'pembelian',
            'icon' => 'fas fa-shopping-cart',
            'route' => 'farmasi.pembelian.index',
            'parent_id' => $farmasi->id,
            'sort_order' => 7,
            'is_active' => true,
            'permission_name' => 'pembelian.view',
            'description' => 'Pengelolaan pembelian'
        ]);

        Menu::create([
            'name' => 'Penjualan',
            'slug' => 'penjualan',
            'icon' => 'fas fa-cash-register',
            'route' => 'farmasi.penjualan.index',
            'parent_id' => $farmasi->id,
            'sort_order' => 8,
            'is_active' => true,
            'permission_name' => 'penjualan.view',
            'description' => 'Pengelolaan penjualan'
        ]);

        Menu::create([
            'name' => 'Stok Opname',
            'slug' => 'stok-opname',
            'icon' => 'fas fa-clipboard-check',
            'route' => 'farmasi.stok-opname.index',
            'parent_id' => $farmasi->id,
            'sort_order' => 9,
            'is_active' => true,
            'permission_name' => 'stok-opname.view',
            'description' => 'Pengelolaan stok opname'
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
            'url' => route('menus.index'),
            'parent_id' => $administration->id,
            'sort_order' => 3,
            'is_active' => true,
            'permission_name' => 'menu.view',
            'description' => 'Pengelolaan struktur menu sidebar'
        ]);

        Menu::create([
            'name' => 'Setting Aplikasi',
            'slug' => 'setting-aplikasi',
            'icon' => 'fas fa-cog',
            'route' => 'settings.index',
            'parent_id' => $administration->id,
            'sort_order' => 4,
            'is_active' => true,
            'permission_name' => 'view-settings',
            'description' => 'Pengelolaan pengaturan aplikasi'
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