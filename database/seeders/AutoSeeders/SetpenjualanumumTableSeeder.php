<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetpenjualanumumTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('setpenjualanumum')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('setpenjualanumum')->insert([
            0 => [
                'ralan' => 10.0,
                'kelas1' => 20.0,
                'kelas2' => 20.0,
                'kelas3' => 25.0,
                'utama' => 30.0,
                'vip' => 30.0,
                'vvip' => 30.0,
                'beliluar' => 56.0,
                'jualbebas' => 50.0,
                'karyawan' => 50.0,
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
