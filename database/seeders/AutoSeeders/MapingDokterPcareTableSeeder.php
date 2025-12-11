<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MapingDokterPcareTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('maping_dokter_pcare')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('maping_dokter_pcare')->insert(array (
          0 => 
          array (
            'kd_dokter' => 'D0000002',
            'kd_dokter_pcare' => '510429',
            'nm_dokter_pcare' => 'dr. SISWO HARIYONO',
          ),
          1 => 
          array (
            'kd_dokter' => 'D0000003',
            'kd_dokter_pcare' => '132183',
            'nm_dokter_pcare' => 'dr.RATNA CANDRASARI,M.Kes',
          ),
          2 => 
          array (
            'kd_dokter' => 'D0000004',
            'kd_dokter_pcare' => '143239',
            'nm_dokter_pcare' => 'DR. KUSNITA ARIESANTI',
          ),
          3 => 
          array (
            'kd_dokter' => 'D0000005',
            'kd_dokter_pcare' => '495550',
            'nm_dokter_pcare' => 'SRI RAHAYU',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}