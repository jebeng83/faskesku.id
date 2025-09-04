<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Setting;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Buat user admin untuk login
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@faskesku.id',
            'password' => Hash::make('admin123'),
        ]);

        // Buat user test
        User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);

        // Buat setting default jika belum ada
        if (!Setting::where('aktifkan', 'Yes')->exists()) {
            Setting::create([
                'nama_instansi' => 'Faskesku.id',
                'alamat_instansi' => 'Jl. Contoh No. 123',
                'kabupaten' => 'Jakarta',
                'propinsi' => 'DKI Jakarta',
                'kontak' => '021-1234567',
                'email' => 'info@faskesku.id',
                'aktifkan' => 'Yes',
                'kode_ppk' => 'PPK001',
                'kode_ppkinhealth' => 'INH001',
                'kode_ppkkemenkes' => 'KEM001',
            ]);
        }
    }
}
