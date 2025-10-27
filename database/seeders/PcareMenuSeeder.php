<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;
use Spatie\Permission\Models\Permission;

class PcareMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure permission exists for access control (optional)
        Permission::findOrCreate('pcare.index');

        // Create Bridging PCare menu if it doesn't exist
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

        // Child menu: Referensi Poli PCare
        Permission::findOrCreate('pcare.referensi.poli');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.poli'],
            [
                'name' => 'Referensi Poli PCare',
                'slug' => 'pcare-ref-poli',
                'icon' => 'fas fa-hospital',
                'route' => 'pcare.referensi.poli',
                'url' => route('pcare.referensi.poli'),
                'parent_id' => $parent->id,
                'sort_order' => 9,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.poli',
                'description' => 'Daftar poli FKTP dari katalog PCare',
            ]
        );

        // Child menu: Referensi Kesadaran PCare
        Permission::findOrCreate('pcare.referensi.kesadaran');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.kesadaran'],
            [
                'name' => 'Referensi Kesadaran PCare',
                'slug' => 'pcare-ref-kesadaran',
                'icon' => 'fas fa-heartbeat',
                'route' => 'pcare.referensi.kesadaran',
                'url' => route('pcare.referensi.kesadaran'),
                'parent_id' => $parent->id,
                'sort_order' => 10,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.kesadaran',
                'description' => 'Daftar tingkat kesadaran dari katalog PCare',
            ]
        );

        // Child menu: Referensi Provider PCare
        Permission::findOrCreate('pcare.referensi.provider');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.provider'],
            [
                'name' => 'Referensi Provider PCare',
                'slug' => 'pcare-ref-provider',
                'icon' => 'fas fa-hospital',
                'route' => 'pcare.referensi.provider',
                'url' => route('pcare.referensi.provider'),
                'parent_id' => $parent->id,
                'sort_order' => 12,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.provider',
                'description' => 'Daftar provider rayonisasi dari katalog PCare',
            ]
        );

        // Child menu: Referensi DPHO PCare
        Permission::findOrCreate('pcare.referensi.dpho');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.dpho'],
            [
                'name' => 'Referensi DPHO PCare',
                'slug' => 'pcare-ref-dpho',
                'icon' => 'fas fa-pills',
                'route' => 'pcare.referensi.dpho',
                'url' => route('pcare.referensi.dpho'),
                'parent_id' => $parent->id,
                'sort_order' => 11,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.dpho',
                'description' => 'Daftar obat DPHO dari katalog PCare',
            ]
        );

        // Child menu: Referensi Spesialis PCare
        Permission::findOrCreate('pcare.referensi.spesialis');
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.spesialis'],
            [
                'name' => 'Referensi Spesialis PCare',
                'slug' => 'pcare-ref-spesialis',
                'icon' => 'fas fa-user-md',
                'route' => 'pcare.referensi.spesialis',
                'url' => route('pcare.referensi.spesialis'),
                'parent_id' => $parent->id,
                'sort_order' => 13,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.spesialis',
                'description' => 'Daftar spesialis dari katalog PCare',
            ]
        );
    }
}