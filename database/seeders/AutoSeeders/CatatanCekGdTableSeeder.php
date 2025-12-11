<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CatatanCekGdTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('catatan_cek_gds')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('catatan_cek_gds')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tgl_perawatan' => '2025-06-28',
            'jam_rawat' => '09:49:06',
            'gdp' => '12',
            'insulin' => '-',
            'obat_gula' => '-',
            'nip' => '123124',
          ),
          1 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'tgl_perawatan' => '2025-08-19',
            'jam_rawat' => '13:20:01',
            'gdp' => '1',
            'insulin' => 'tes',
            'obat_gula' => 'tes',
            'nip' => '12/09/1988/001',
          ),
          2 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'tgl_perawatan' => '2025-08-19',
            'jam_rawat' => '13:20:09',
            'gdp' => '12',
            'insulin' => 'tes',
            'obat_gula' => '-',
            'nip' => '12/09/1988/001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}