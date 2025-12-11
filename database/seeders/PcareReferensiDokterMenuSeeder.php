<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PcareReferensiDokterMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan permission untuk akses PCare tersedia
        Permission::findOrCreate('pcare.index');

        // Cari root menu PCare berdasarkan route atau slug
        $pcareRoot = Menu::where('route', 'pcare.index')
            ->orWhere('slug', 'pcare')
            ->first();

        if (! $pcareRoot) {
            // Jika belum ada, buat root menu PCare
            $pcareRoot = Menu::firstOrCreate(
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
        }

        // Buat submenu Referensi Dokter PCare di bawah root PCare
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.dokter'],
            [
                'name' => 'Referensi Dokter PCare',
                'slug' => 'referensi-dokter-pcare',
                'icon' => 'fas fa-user-md',
                'route' => 'pcare.referensi.dokter',
                'url' => route('pcare.referensi.dokter'),
                'parent_id' => $pcareRoot->id,
                'sort_order' => 1,
                'is_active' => true,
                'permission_name' => 'pcare.index',
                'description' => 'Daftar dokter dari referensi BPJS PCare',
            ]
        );

        $this->command->info('Submenu "Referensi Dokter PCare" berhasil ditambahkan.');
    }
}
