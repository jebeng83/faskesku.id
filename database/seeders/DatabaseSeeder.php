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
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Run seeders
        $this->call([
            SeedAllTablesSeeder::class,
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
