<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailObatRacikanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_obat_racikan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_obat_racikan')->insert(array (
          0 => 
          array (
            'tgl_perawatan' => '2025-05-26',
            'jam' => '10:36:43',
            'no_rawat' => '2025/05/26/000001',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
          ),
          1 => 
          array (
            'tgl_perawatan' => '2025-05-26',
            'jam' => '10:36:43',
            'no_rawat' => '2025/05/26/000001',
            'no_racik' => '1',
            'kode_brng' => 'B000001207',
          ),
          2 => 
          array (
            'tgl_perawatan' => '2025-06-30',
            'jam' => '09:44:14',
            'no_rawat' => '2025/06/30/000003',
            'no_racik' => '1',
            'kode_brng' => 'B000000305',
          ),
          3 => 
          array (
            'tgl_perawatan' => '2025-06-30',
            'jam' => '09:44:14',
            'no_rawat' => '2025/06/30/000003',
            'no_racik' => '1',
            'kode_brng' => 'B000000554',
          ),
          4 => 
          array (
            'tgl_perawatan' => '2025-07-23',
            'jam' => '14:29:51',
            'no_rawat' => '2025/07/23/000001',
            'no_racik' => '1',
            'kode_brng' => 'B000000554',
          ),
          5 => 
          array (
            'tgl_perawatan' => '2025-07-23',
            'jam' => '14:29:51',
            'no_rawat' => '2025/07/23/000001',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
          ),
          6 => 
          array (
            'tgl_perawatan' => '2025-07-29',
            'jam' => '09:36:43',
            'no_rawat' => '2025/07/29/000001',
            'no_racik' => '1',
            'kode_brng' => 'B000000554',
          ),
          7 => 
          array (
            'tgl_perawatan' => '2025-07-29',
            'jam' => '09:36:43',
            'no_rawat' => '2025/07/29/000001',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
          ),
          8 => 
          array (
            'tgl_perawatan' => '2025-08-04',
            'jam' => '10:11:15',
            'no_rawat' => '2025/08/04/000001',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
          ),
          9 => 
          array (
            'tgl_perawatan' => '2025-08-04',
            'jam' => '10:11:15',
            'no_rawat' => '2025/08/04/000001',
            'no_racik' => '1',
            'kode_brng' => 'B000001207',
          ),
          10 => 
          array (
            'tgl_perawatan' => '2025-08-05',
            'jam' => '09:52:58',
            'no_rawat' => '2025/06/18/000001',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
          ),
          11 => 
          array (
            'tgl_perawatan' => '2025-08-05',
            'jam' => '09:52:58',
            'no_rawat' => '2025/06/18/000001',
            'no_racik' => '1',
            'kode_brng' => 'B000001207',
          ),
          12 => 
          array (
            'tgl_perawatan' => '2025-08-19',
            'jam' => '10:49:18',
            'no_rawat' => '2025/08/19/000001',
            'no_racik' => '1',
            'kode_brng' => 'B000000305',
          ),
          13 => 
          array (
            'tgl_perawatan' => '2025-08-19',
            'jam' => '10:49:18',
            'no_rawat' => '2025/08/19/000001',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
          ),
          14 => 
          array (
            'tgl_perawatan' => '2025-08-21',
            'jam' => '14:50:47',
            'no_rawat' => '2025/08/21/000001',
            'no_racik' => '1',
            'kode_brng' => 'B000000554',
          ),
          15 => 
          array (
            'tgl_perawatan' => '2025-08-21',
            'jam' => '14:50:47',
            'no_rawat' => '2025/08/21/000001',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
          ),
          16 => 
          array (
            'tgl_perawatan' => '2025-08-25',
            'jam' => '13:51:18',
            'no_rawat' => '2025/08/25/000001',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
          ),
          17 => 
          array (
            'tgl_perawatan' => '2025-08-25',
            'jam' => '13:51:18',
            'no_rawat' => '2025/08/25/000001',
            'no_racik' => '1',
            'kode_brng' => 'B000000560',
          ),
          18 => 
          array (
            'tgl_perawatan' => '2025-08-25',
            'jam' => '13:51:18',
            'no_rawat' => '2025/08/25/000001',
            'no_racik' => '2',
            'kode_brng' => 'B000000305',
          ),
          19 => 
          array (
            'tgl_perawatan' => '2025-08-25',
            'jam' => '13:51:18',
            'no_rawat' => '2025/08/25/000001',
            'no_racik' => '2',
            'kode_brng' => 'B00001000',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}