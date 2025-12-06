<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailPeriksaLabpaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_periksa_labpa')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_periksa_labpa')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/05/26/000003',
            'kd_jenis_prw' => 'PA0002',
            'tgl_periksa' => '2025-05-26',
            'jam' => '15:51:22',
            'diagnosa_klinik' => '1',
            'makroskopik' => '2',
            'mikroskopik' => '3',
            'kesimpulan' => '4',
            'kesan' => '5',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}