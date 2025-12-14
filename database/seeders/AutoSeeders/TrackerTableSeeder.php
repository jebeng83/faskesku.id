<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TrackerTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('tracker')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('tracker')->insert([
            0 => [
                'nip' => '123124',
                'tgl_login' => '2025-08-14',
                'jam_login' => '15:42:52',
            ],
            1 => [
                'nip' => 'Admin Utama',
                'tgl_login' => '2025-08-14',
                'jam_login' => '15:38:32',
            ],
            2 => [
                'nip' => 'Admin Utama',
                'tgl_login' => '2025-08-14',
                'jam_login' => '15:42:06',
            ],
            3 => [
                'nip' => 'Admin Utama',
                'tgl_login' => '2025-08-14',
                'jam_login' => '15:43:17',
            ],
            4 => [
                'nip' => 'D0000004',
                'tgl_login' => '2025-08-14',
                'jam_login' => '15:43:27',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
