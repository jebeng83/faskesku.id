<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Setting::create([
            'nama_instansi' => 'Faskesku.id',
            'alamat_instansi' => 'Jl. Contoh No. 123',
            'kabupaten' => 'Jakarta Selatan',
            'propinsi' => 'DKI Jakarta',
            'kontak' => '08123456789',
            'email' => 'admin@faskesku.id',
            'aktifkan' => 'Yes',
            'kode_ppk' => 'PPK001',
            'kode_ppkinhealth' => 'IH001',
            'kode_ppkkemenkes' => 'KM001',
            'wallpaper' => '',
            'logo' => ''
        ]);
    }
}
