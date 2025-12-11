<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PcareReferensiDiagnosaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan permission tersedia
        Permission::findOrCreate('pcare.referensi.diagnosa');

        // Cari parent PCare, atau buat jika belum ada
        $parent = Menu::where('route', 'pcare.index')
            ->orWhere('slug', 'pcare')
            ->first();

        if (! $parent) {
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
        }

        // Buat menu Referensi Diagnosa di bawah PCare
        Menu::firstOrCreate(
            ['route' => 'pcare.referensi.diagnosa'],
            [
                'name' => 'Referensi Diagnosa',
                'slug' => 'referensi-diagnosa',
                'icon' => 'fas fa-notes-medical',
                'route' => 'pcare.referensi.diagnosa',
                'url' => route('pcare.referensi.diagnosa'),
                'parent_id' => $parent->id,
                'sort_order' => 1,
                'is_active' => true,
                'permission_name' => 'pcare.referensi.diagnosa',
                'description' => 'Daftar referensi diagnosa dari BPJS PCare',
            ]
        );
    }
}
