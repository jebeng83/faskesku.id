<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PembayaranMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::findOrCreate('pembayaran.view', 'web');
        Permission::findOrCreate('pembayaran.ralan.view', 'web');
        Permission::findOrCreate('pembayaran.ranap.view', 'web');

        $pembayaranMenu = Menu::updateOrCreate(
            ['slug' => 'pembayaran'],
            [
                'name' => 'Pembayaran',
                'slug' => 'pembayaran',
                'icon' => 'fas fa-cash-register',
                'route' => 'pembayaran.index',
                'url' => route('pembayaran.index'),
                'sort_order' => 10,
                'is_active' => true,
                'permission_name' => 'pembayaran.view',
                'description' => 'Modul pembayaran pasien',
            ]
        );

        Menu::updateOrCreate(
            ['slug' => 'pembayaran-ralan'],
            [
                'name' => 'Pembayaran Ralan',
                'slug' => 'pembayaran-ralan',
                'icon' => 'fas fa-file-invoice-dollar',
                'route' => 'pembayaran.ralan',
                'url' => route('pembayaran.ralan'),
                'parent_id' => $pembayaranMenu->id,
                'sort_order' => 1,
                'is_active' => true,
                'permission_name' => 'pembayaran.ralan.view',
                'description' => 'Pembayaran layanan rawat jalan',
            ]
        );

        Menu::updateOrCreate(
            ['slug' => 'pembayaran-ranap'],
            [
                'name' => 'Pembayaran Ranap',
                'slug' => 'pembayaran-ranap',
                'icon' => 'fas fa-procedures',
                'route' => 'pembayaran.ranap',
                'url' => route('pembayaran.ranap'),
                'parent_id' => $pembayaranMenu->id,
                'sort_order' => 2,
                'is_active' => true,
                'permission_name' => 'pembayaran.ranap.view',
                'description' => 'Pembayaran layanan rawat inap',
            ]
        );
    }
}
