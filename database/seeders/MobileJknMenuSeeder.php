<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class MobileJknMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure permissions exist for access control
        Permission::findOrCreate('pcare.setting.mobilejkn.index', 'web');
        Permission::findOrCreate('pcare.referensi.mobilejkn.dokter.index', 'web');

        // Find parent PCare menu (created by PcareMenuSeeder)
        $parent = Menu::firstOrCreate(
            ['route' => 'pcare.index'],
            [
                'name' => 'Briding Pcare',
                'slug' => 'pcare',
                'icon' => 'fas fa-link',
                'route' => 'pcare.index',
                'url' => route('pcare.index'),
                'sort_order' => 8,
                'is_active' => true,
                'permission_name' => 'pcare.index',
                'description' => 'Bridging ke layanan PCare BPJS',
            ]
        );

        // Child menu: Setting Bridging Mobile JKN
        Menu::firstOrCreate(
            ['route' => 'pcare.setting.mobilejkn.index'],
            [
                'name' => 'Setting Bridging Mobile JKN',
                'slug' => 'pcare-setting-mobilejkn',
                'icon' => 'fas fa-cogs',
                'route' => 'pcare.setting.mobilejkn.index',
                'url' => route('pcare.setting.mobilejkn.index'),
                'parent_id' => $parent->id,
                'sort_order' => 22,
                'is_active' => true,
                'permission_name' => 'pcare.setting.mobilejkn.index',
                'description' => 'Form pengaturan kredensial untuk bridging Mobile JKN',
            ]
        );

        // Child menu: Referensi Dokter Mobile JKN (Inertia page)
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.mobilejkn.dokter'],
            [
                'name' => 'Referensi Dokter Mobile JKN',
                'slug' => 'pcare-referensi-mobilejkn-dokter',
                'icon' => 'fas fa-user-md',
                'route' => 'pcare.referensi.mobilejkn.dokter',
                'url' => route('pcare.referensi.mobilejkn.dokter'),
                'parent_id' => $parent->id,
                'sort_order' => 23,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.mobilejkn.dokter.index',
                'description' => 'Lihat daftar dokter per poli dari Mobile JKN',
            ]
        );
    }
}
