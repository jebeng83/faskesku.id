<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UserTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('users')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('users')->insert(array (
          0 => 
          array (
            'id' => 2,
            'name' => 'Administrator',
            'username' => 'admin',
            'email' => 'admin@faskesku.id',
            'nik' => NULL,
            'email_verified_at' => NULL,
            'password' => '$2y$12$u/vC9tjkXtcLewe0.RqwsevGS/exmEBI1ZwUi0szej7YN.iHkpOj.',
            'remember_token' => 'hNntMYZFCXhpqaHN9B19CqQKI8IN2EcPvtQBQl0kid3Q24sXkFCiqWhnBWWo',
            'created_at' => '2025-09-18 23:08:41',
            'updated_at' => '2025-09-18 23:36:13',
          ),
          1 => 
          array (
            'id' => 3,
            'name' => 'Test User',
            'username' => 'testuser',
            'email' => 'test@example.com',
            'nik' => 'D001',
            'email_verified_at' => NULL,
            'password' => '$2y$12$zai19vlrGect3KZ1Sc76Lu3QDjlF3oEc2ey4Z1d49g.G5RqUt9ntu',
            'remember_token' => NULL,
            'created_at' => '2025-09-18 23:08:48',
            'updated_at' => '2025-12-04 03:46:16',
          ),
          2 => 
          array (
            'id' => 4,
            'name' => 'Admin Example',
            'username' => 'adminexample',
            'email' => 'admin@example.com',
            'nik' => NULL,
            'email_verified_at' => NULL,
            'password' => '$2y$12$CKFf4kXXtM5/nzKbTVRsO.muwbjL70MqeX.RbwOk0q1eMzeY71E7O',
            'remember_token' => NULL,
            'created_at' => '2025-09-18 23:08:49',
            'updated_at' => '2025-09-18 23:08:49',
          ),
          3 => 
          array (
            'id' => 7,
            'name' => 'Admin Abahhost',
            'username' => 'abahhost',
            'email' => 'abahhost@example.com',
            'nik' => '19830112',
            'email_verified_at' => NULL,
            'password' => '$2y$12$JXU/917qSG6j94oPtUmbZOfURtxb1cCH/r3uk7uzwodQrZ1rRNkl6',
            'remember_token' => '8SeZt3xmNiKZGlkkNNxLbGts4JazGFRifUDAnyyGaBBCMHgeSx0Fj0wDQQ5B',
            'created_at' => '2025-11-26 09:40:32',
            'updated_at' => '2025-11-26 10:46:57',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}