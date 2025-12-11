<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DataTriaseIgdprimerTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('data_triase_igdprimer')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('data_triase_igdprimer')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/05/26/000003',
            'keluhan_utama' => '-',
            'kebutuhan_khusus' => '-',
            'catatan' => 'tes',
            'plan' => 'Ruang Resusitasi',
            'tanggaltriase' => '2025-05-26 13:29:59',
            'nik' => 'D0000004',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'keluhan_utama' => 'NYERI DADA',
            'kebutuhan_khusus' => '-',
            'catatan' => '-',
            'plan' => 'Ruang Resusitasi',
            'tanggaltriase' => '2025-06-30 08:51:44',
            'nik' => 'D0000003',
          ),
          2 => 
          array (
            'no_rawat' => '2025/07/21/000001',
            'keluhan_utama' => '12',
            'kebutuhan_khusus' => '-',
            'catatan' => '-',
            'plan' => 'Ruang Resusitasi',
            'tanggaltriase' => '2025-07-21 11:47:54',
            'nik' => '156798',
          ),
          3 => 
          array (
            'no_rawat' => '2025/08/11/000004',
            'keluhan_utama' => '-',
            'kebutuhan_khusus' => '-',
            'catatan' => '-',
            'plan' => 'Ruang Resusitasi',
            'tanggaltriase' => '2025-08-11 14:12:44',
            'nik' => '123124',
          ),
          4 => 
          array (
            'no_rawat' => '2025/08/19/000003',
            'keluhan_utama' => '-',
            'kebutuhan_khusus' => '-',
            'catatan' => '-',
            'plan' => 'Ruang Resusitasi',
            'tanggaltriase' => '2025-08-19 13:07:25',
            'nik' => 'D0000004',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}