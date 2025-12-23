<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (! User::where('email', 'test@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);
        }

        $this->call([
            WilayahSeeder::class,
            RoleSeeder::class,
            PermissionSeeder::class,
            MenuSeeder::class,
            RouteSeeder::class,
            DokterSeeder::class,
            SpesialisSeeder::class,
            PoliklinikSeeder::class,
            PenjabSeeder::class,
            RegPeriksaSeeder::class,
            UserEmployeeSeeder::class,
            PatientSeeder::class,
            RawatJalanSeeder::class,
            BankSeeder::class,
            RekeningSeeder::class,
            SetAkunSeeder::class,
        ]);
    }
}
