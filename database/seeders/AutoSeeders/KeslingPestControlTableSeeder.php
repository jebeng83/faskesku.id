<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KeslingPestControlTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kesling_pest_control')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kesling_pest_control')->insert(array (
          0 => 
          array (
            'nip' => '12/09/1988/001',
            'tanggal' => '2025-02-06 14:34:32',
            'rincian_kegiatan' => '1',
            'rekomendasi' => '2',
          ),
          1 => 
          array (
            'nip' => '12/09/1988/001',
            'tanggal' => '2025-02-06 14:35:19',
            'rincian_kegiatan' => '1212',
            'rekomendasi' => '121212',
          ),
          2 => 
          array (
            'nip' => '12/09/1988/001',
            'tanggal' => '2025-02-06 14:35:24',
            'rincian_kegiatan' => '1212',
            'rekomendasi' => '1212',
          ),
          3 => 
          array (
            'nip' => '156798',
            'tanggal' => '2025-06-19 10:44:16',
            'rincian_kegiatan' => 'tes',
            'rekomendasi' => 'tes',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}