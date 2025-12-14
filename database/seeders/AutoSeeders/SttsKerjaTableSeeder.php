<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SttsKerjaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('stts_kerja')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('stts_kerja')->insert([
            0 => [
                'stts' => '-',
                'ktg' => '-',
                'indek' => 0,
                'hakcuti' => 0,
            ],
            1 => [
                'stts' => 'CK',
                'ktg' => 'Calon Kontrak',
                'indek' => 2,
                'hakcuti' => 3,
            ],
            2 => [
                'stts' => 'FT',
                'ktg' => 'Kontrak Full Time',
                'indek' => 3,
                'hakcuti' => 12,
            ],
            3 => [
                'stts' => 'PI',
                'ktg' => 'Pegawai Istimewa',
                'indek' => 5,
                'hakcuti' => 12,
            ],
            4 => [
                'stts' => 'PT',
                'ktg' => 'Part Time',
                'indek' => 1,
                'hakcuti' => 2,
            ],
            5 => [
                'stts' => 'T',
                'ktg' => 'Tetap',
                'indek' => 12,
                'hakcuti' => 12,
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
