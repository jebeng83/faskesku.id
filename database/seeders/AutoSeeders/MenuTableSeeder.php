<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MenuTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('menus')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('menus')->insert(array (
          0 => 
          array (
            'id' => 1,
            'name' => 'Dashboard',
            'slug' => 'dashboard',
            'icon' => 'fas fa-tachometer-alt',
            'route' => 'dashboard',
            'url' => 'http://127.0.0.1:8000',
            'parent_id' => NULL,
            'sort_order' => 1,
            'is_active' => 1,
            'permission_name' => NULL,
            'description' => 'Halaman utama aplikasi',
            'created_at' => '2025-11-05 12:46:39',
            'updated_at' => '2025-11-16 07:48:32',
          ),
          1 => 
          array (
            'id' => 2,
            'name' => 'Master Data',
            'slug' => 'master-data',
            'icon' => 'fas fa-database',
            'route' => 'master-data.index',
            'url' => 'http://127.0.0.1:8000/master-data',
            'parent_id' => NULL,
            'sort_order' => 2,
            'is_active' => 1,
            'permission_name' => NULL,
            'description' => 'Pengelolaan data master sistem',
            'created_at' => '2025-11-05 12:46:39',
            'updated_at' => '2025-11-05 12:46:39',
          ),
          2 => 
          array (
            'id' => 3,
            'name' => 'Registrasi',
            'slug' => 'registrasi',
            'icon' => 'fas fa-clipboard-list',
            'route' => 'registration.index',
            'url' => '/registration',
            'parent_id' => NULL,
            'sort_order' => 3,
            'is_active' => 1,
            'permission_name' => NULL,
            'description' => 'Modul registrasi pasien dan pemeriksaan',
            'created_at' => '2025-11-05 12:46:39',
            'updated_at' => '2025-11-05 22:20:12',
          ),
          3 => 
          array (
            'id' => 4,
            'name' => 'Rawat Jalan',
            'slug' => 'rawat-jalan',
            'icon' => 'fas fa-hospital',
            'route' => 'Rawat-Jalan',
            'url' => '/rawat-jalan',
            'parent_id' => NULL,
            'sort_order' => 4,
            'is_active' => 1,
            'permission_name' => NULL,
            'description' => 'Modul pelayanan rawat jalan',
            'created_at' => '2025-11-05 12:46:39',
            'updated_at' => '2025-11-05 22:14:00',
          ),
          4 => 
          array (
            'id' => 5,
            'name' => 'Laporan',
            'slug' => 'laporan',
            'icon' => 'fas fa-chart-bar',
            'route' => NULL,
            'url' => NULL,
            'parent_id' => NULL,
            'sort_order' => 5,
            'is_active' => 1,
            'permission_name' => NULL,
            'description' => 'Laporan dan statistik sistem',
            'created_at' => '2025-11-05 12:46:39',
            'updated_at' => '2025-11-05 12:46:39',
          ),
          5 => 
          array (
            'id' => 6,
            'name' => 'Administrasi',
            'slug' => 'administrasi',
            'icon' => 'fas fa-cogs',
            'route' => NULL,
            'url' => NULL,
            'parent_id' => NULL,
            'sort_order' => 6,
            'is_active' => 1,
            'permission_name' => NULL,
            'description' => 'Pengaturan sistem dan administrasi',
            'created_at' => '2025-11-05 12:46:39',
            'updated_at' => '2025-11-05 12:46:39',
          ),
          6 => 
          array (
            'id' => 7,
            'name' => 'Farmasi',
            'slug' => 'farmasi',
            'icon' => 'fas fa-pills',
            'route' => 'farmasi.index',
            'url' => 'http://127.0.0.1:8000/farmasi',
            'parent_id' => NULL,
            'sort_order' => 7,
            'is_active' => 1,
            'permission_name' => NULL,
            'description' => 'Modul farmasi dan pengelolaan obat',
            'created_at' => '2025-11-05 12:46:39',
            'updated_at' => '2025-11-05 12:46:39',
          ),
          7 => 
          array (
            'id' => 8,
            'name' => 'Briding Pcare',
            'slug' => 'pcare',
            'icon' => 'fas fa-link',
            'route' => 'pcare.index',
            'url' => 'http://127.0.0.1:8000/pcare',
            'parent_id' => NULL,
            'sort_order' => 8,
            'is_active' => 1,
            'permission_name' => NULL,
            'description' => 'Bridging ke layanan PCare BPJS',
            'created_at' => '2025-11-05 12:46:39',
            'updated_at' => '2025-11-05 12:46:39',
          ),
          8 => 
          array (
            'id' => 17,
            'name' => 'Manajemen User',
            'slug' => 'manajemen-user',
            'icon' => 'fas fa-users-cog',
            'route' => 'users.index',
            'url' => NULL,
            'parent_id' => 6,
            'sort_order' => 1,
            'is_active' => 1,
            'permission_name' => 'user.view',
            'description' => 'Pengelolaan pengguna sistem',
            'created_at' => '2025-11-05 12:46:39',
            'updated_at' => '2025-11-05 12:46:39',
          ),
          9 => 
          array (
            'id' => 18,
            'name' => 'Manajemen Permission',
            'slug' => 'manajemen-permission',
            'icon' => 'fas fa-shield-alt',
            'route' => 'permissions.index',
            'url' => NULL,
            'parent_id' => 6,
            'sort_order' => 2,
            'is_active' => 1,
            'permission_name' => 'permission.view',
            'description' => 'Pengelolaan hak akses sistem',
            'created_at' => '2025-11-05 12:46:39',
            'updated_at' => '2025-11-05 12:46:39',
          ),
          10 => 
          array (
            'id' => 19,
            'name' => 'Manajemen Menu',
            'slug' => 'manajemen-menu',
            'icon' => 'fas fa-bars',
            'route' => 'menus.index',
            'url' => 'http://127.0.0.1:8000/menus',
            'parent_id' => 6,
            'sort_order' => 3,
            'is_active' => 1,
            'permission_name' => 'menu.view',
            'description' => 'Pengelolaan struktur menu sidebar',
            'created_at' => '2025-11-05 12:46:39',
            'updated_at' => '2025-11-05 12:46:39',
          ),
          11 => 
          array (
            'id' => 20,
            'name' => 'Profil',
            'slug' => 'profil',
            'icon' => 'fas fa-user',
            'route' => 'profile.show',
            'url' => NULL,
            'parent_id' => NULL,
            'sort_order' => 9,
            'is_active' => 1,
            'permission_name' => NULL,
            'description' => 'Profil pengguna',
            'created_at' => '2025-11-05 12:46:39',
            'updated_at' => '2025-11-14 17:11:42',
          ),
          12 => 
          array (
            'id' => 21,
            'name' => 'Satu Sehat',
            'slug' => 'satu-sehat',
            'icon' => 'fas fa-hospital',
            'route' => NULL,
            'url' => '/satusehat',
            'parent_id' => NULL,
            'sort_order' => 10,
            'is_active' => 1,
            'permission_name' => NULL,
            'description' => NULL,
            'created_at' => '2025-11-14 17:11:24',
            'updated_at' => '2025-11-14 17:11:50',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}