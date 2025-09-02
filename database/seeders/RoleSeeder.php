<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['admin', 'dokter', 'petugas'];
        foreach ($roles as $roleName) {
            Role::findOrCreate($roleName);
        }

        if (!User::where('email', 'admin@example.com')->exists()) {
            $admin = User::create([
                'name' => 'Super Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
            ]);
            $admin->assignRole('admin');
        }
    }
}
