<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PresensiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('presensi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('presensi')->insert([
            0 => [
                'tgl' => '2022-05-01',
                'id' => 112,
                'jns' => 'HB',
                'lembur' => 1,
            ],
            1 => [
                'tgl' => '2022-05-04',
                'id' => 112,
                'jns' => 'HR',
                'lembur' => 1,
            ],
            2 => [
                'tgl' => '2022-05-13',
                'id' => 114,
                'jns' => 'HB',
                'lembur' => 3,
            ],
            3 => [
                'tgl' => '2022-05-16',
                'id' => 114,
                'jns' => 'HB',
                'lembur' => 5,
            ],
            4 => [
                'tgl' => '2022-08-01',
                'id' => 114,
                'jns' => 'HB',
                'lembur' => 3,
            ],
            5 => [
                'tgl' => '2022-11-01',
                'id' => 112,
                'jns' => 'HB',
                'lembur' => 5,
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
