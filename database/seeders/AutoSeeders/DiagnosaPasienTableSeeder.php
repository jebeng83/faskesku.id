<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DiagnosaPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('diagnosa_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('diagnosa_pasien')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'kd_penyakit' => 'I50.0',
            'status' => 'Ranap',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          1 => 
          array (
            'no_rawat' => '2025/04/27/000001',
            'kd_penyakit' => 'A00.0',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          2 => 
          array (
            'no_rawat' => '2025/04/27/000001',
            'kd_penyakit' => 'A15.3',
            'status' => 'Ralan',
            'prioritas' => 2,
            'status_penyakit' => 'Baru',
          ),
          3 => 
          array (
            'no_rawat' => '2025/05/26/000001',
            'kd_penyakit' => 'D00.1',
            'status' => 'Ralan',
            'prioritas' => 3,
            'status_penyakit' => 'Baru',
          ),
          4 => 
          array (
            'no_rawat' => '2025/05/26/000001',
            'kd_penyakit' => 'I50.0',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          5 => 
          array (
            'no_rawat' => '2025/05/26/000001',
            'kd_penyakit' => 'K00.1',
            'status' => 'Ralan',
            'prioritas' => 2,
            'status_penyakit' => 'Baru',
          ),
          6 => 
          array (
            'no_rawat' => '2025/05/26/000002',
            'kd_penyakit' => 'F00.0',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          7 => 
          array (
            'no_rawat' => '2025/06/03/000003',
            'kd_penyakit' => 'A01',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          8 => 
          array (
            'no_rawat' => '2025/06/11/000001',
            'kd_penyakit' => 'A01.0',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          9 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_penyakit' => 'E10',
            'status' => 'Ranap',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          10 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'kd_penyakit' => 'I11.0',
            'status' => 'Ranap',
            'prioritas' => 2,
            'status_penyakit' => 'Baru',
          ),
          11 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'kd_penyakit' => 'A01.0',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          12 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'kd_penyakit' => 'A01.1',
            'status' => 'Ralan',
            'prioritas' => 2,
            'status_penyakit' => 'Baru',
          ),
          13 => 
          array (
            'no_rawat' => '2025/06/23/000001',
            'kd_penyakit' => 'A01.1',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          14 => 
          array (
            'no_rawat' => '2025/06/25/000001',
            'kd_penyakit' => 'A01.1',
            'status' => 'Ralan',
            'prioritas' => 2,
            'status_penyakit' => 'Baru',
          ),
          15 => 
          array (
            'no_rawat' => '2025/06/25/000001',
            'kd_penyakit' => 'I50.0',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          16 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'kd_penyakit' => 'O00.0',
            'status' => 'Ranap',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          17 => 
          array (
            'no_rawat' => '2025/07/04/000001',
            'kd_penyakit' => 'A01.0',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          18 => 
          array (
            'no_rawat' => '2025/07/05/000001',
            'kd_penyakit' => 'A01.0',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          19 => 
          array (
            'no_rawat' => '2025/07/05/000001',
            'kd_penyakit' => 'A01.1',
            'status' => 'Ralan',
            'prioritas' => 2,
            'status_penyakit' => 'Baru',
          ),
          20 => 
          array (
            'no_rawat' => '2025/07/07/000001',
            'kd_penyakit' => 'A01.0',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          21 => 
          array (
            'no_rawat' => '2025/07/14/000001',
            'kd_penyakit' => 'I50.0',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          22 => 
          array (
            'no_rawat' => '2025/07/16/000001',
            'kd_penyakit' => 'K30',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          23 => 
          array (
            'no_rawat' => '2025/07/21/000001',
            'kd_penyakit' => 'A01.1',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          24 => 
          array (
            'no_rawat' => '2025/07/23/000001',
            'kd_penyakit' => 'A01.1',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          25 => 
          array (
            'no_rawat' => '2025/07/29/000001',
            'kd_penyakit' => 'K30',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          26 => 
          array (
            'no_rawat' => '2025/07/29/000002',
            'kd_penyakit' => 'D00.0',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          27 => 
          array (
            'no_rawat' => '2025/08/04/000001',
            'kd_penyakit' => 'A01.1',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          28 => 
          array (
            'no_rawat' => '2025/08/11/000001',
            'kd_penyakit' => 'A01.1',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          29 => 
          array (
            'no_rawat' => '2025/08/11/000001',
            'kd_penyakit' => 'D00.0',
            'status' => 'Ralan',
            'prioritas' => 2,
            'status_penyakit' => 'Baru',
          ),
          30 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'kd_penyakit' => 'A01',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          31 => 
          array (
            'no_rawat' => '2025/08/21/000001',
            'kd_penyakit' => 'I50.0',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Lama',
          ),
          32 => 
          array (
            'no_rawat' => '2025/08/25/000001',
            'kd_penyakit' => 'A01.1',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => 'Baru',
          ),
          33 => 
          array (
            'no_rawat' => '2025/11/12/000001',
            'kd_penyakit' => 'H52.5',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => NULL,
          ),
          34 => 
          array (
            'no_rawat' => '2025/11/12/000002',
            'kd_penyakit' => 'J00',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => NULL,
          ),
          35 => 
          array (
            'no_rawat' => '2025/11/13/000001',
            'kd_penyakit' => 'H52.5',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => NULL,
          ),
          36 => 
          array (
            'no_rawat' => '2025/11/15/000001',
            'kd_penyakit' => 'J00',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => NULL,
          ),
          37 => 
          array (
            'no_rawat' => '2025/11/22/000001',
            'kd_penyakit' => 'I10',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => NULL,
          ),
          38 => 
          array (
            'no_rawat' => '2025/11/27/000001',
            'kd_penyakit' => 'J00',
            'status' => 'Ralan',
            'prioritas' => 1,
            'status_penyakit' => NULL,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}