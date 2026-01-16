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

        \Illuminate\Support\Facades\DB::beginTransaction();
        try {
            \App\Models\User::firstOrCreate(
                ['email' => 'test@example.com'],
                [
                    'name' => 'Test User',
                    'username' => 'imulyani',
                    'password' => \Illuminate\Support\Facades\Hash::make('password'),
                    'email_verified_at' => now(),
                ]
            );
            \Illuminate\Support\Facades\DB::commit();
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\DB::rollBack();
        }

        // Run seeders
        $this->call([
            SeedAllTablesSeeder::class,
            RoleSeeder::class,
            PermissionSeeder::class,
            MenuSeeder::class,
            RouteSeeder::class,
            SpesialisSeeder::class,
            PoliklinikSeeder::class,
            DokterSeeder::class,
            PenjabSeeder::class,
            KecamatanMinimalSeeder::class,
            PatientSeeder::class,
            RegPeriksaSeeder::class,
            UserEmployeeSeeder::class,
            RawatJalanSeeder::class,
            BankSeeder::class,
            RekeningSeeder::class,
            SetAkunSeeder::class,
        ]);
    }
}
