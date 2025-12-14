<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ResepPulangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('resep_pulang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('resep_pulang')->insert([
            0 => [
                'no_rawat' => '2025/08/19/000002',
                'kode_brng' => 'B000000157',
                'jml_barang' => 10.0,
                'harga' => 134066.0,
                'total' => 1340660.0,
                'dosis' => '3 x 1',
                'tanggal' => '2025-08-19',
                'jam' => '13:34:50',
                'kd_bangsal' => 'AP',
                'no_batch' => '',
                'no_faktur' => '',
            ],
            1 => [
                'no_rawat' => '2025/08/19/000002',
                'kode_brng' => 'B000000556',
                'jml_barang' => 10.0,
                'harga' => 1367.0,
                'total' => 13670.0,
                'dosis' => '2 x 1',
                'tanggal' => '2025-08-19',
                'jam' => '13:34:50',
                'kd_bangsal' => 'AP',
                'no_batch' => '',
                'no_faktur' => '',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
