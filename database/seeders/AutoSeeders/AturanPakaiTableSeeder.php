<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AturanPakaiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('aturan_pakai')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('aturan_pakai')->insert(array (
          0 => 
          array (
            'tgl_perawatan' => '2025-04-26',
            'jam' => '09:26:01',
            'no_rawat' => '2025/04/26/000001',
            'kode_brng' => 'B000000556',
            'aturan' => '2 x 1',
          ),
          1 => 
          array (
            'tgl_perawatan' => '2025-04-27',
            'jam' => '08:42:17',
            'no_rawat' => '2025/04/27/000001',
            'kode_brng' => 'B000000790',
            'aturan' => '2 x 1',
          ),
          2 => 
          array (
            'tgl_perawatan' => '2025-04-28',
            'jam' => '09:23:14',
            'no_rawat' => '2025/04/28/000002',
            'kode_brng' => 'B000000557',
            'aturan' => '3 X 1',
          ),
          3 => 
          array (
            'tgl_perawatan' => '2025-05-26',
            'jam' => '10:36:43',
            'no_rawat' => '2025/05/26/000001',
            'kode_brng' => 'B000000791',
            'aturan' => '2 x1',
          ),
          4 => 
          array (
            'tgl_perawatan' => '2025-05-26',
            'jam' => '10:36:43',
            'no_rawat' => '2025/05/26/000001',
            'kode_brng' => 'B00001000',
            'aturan' => '3 x 1',
          ),
          5 => 
          array (
            'tgl_perawatan' => '2025-06-03',
            'jam' => '08:51:00',
            'no_rawat' => '2025/06/03/000002',
            'kode_brng' => 'B000000575',
            'aturan' => '3 x 1',
          ),
          6 => 
          array (
            'tgl_perawatan' => '2025-06-03',
            'jam' => '08:51:00',
            'no_rawat' => '2025/06/03/000002',
            'kode_brng' => 'B000000791',
            'aturan' => '2 x 1',
          ),
          7 => 
          array (
            'tgl_perawatan' => '2025-06-04',
            'jam' => '20:38:11',
            'no_rawat' => '2025/06/04/000001',
            'kode_brng' => 'B000000789',
            'aturan' => '3 x 1',
          ),
          8 => 
          array (
            'tgl_perawatan' => '2025-06-04',
            'jam' => '20:38:11',
            'no_rawat' => '2025/06/04/000001',
            'kode_brng' => 'B00001000',
            'aturan' => '2 x 1',
          ),
          9 => 
          array (
            'tgl_perawatan' => '2025-06-11',
            'jam' => '19:33:47',
            'no_rawat' => '2025/06/11/000001',
            'kode_brng' => 'B000000965',
            'aturan' => '2 X 1',
          ),
          10 => 
          array (
            'tgl_perawatan' => '2025-06-18',
            'jam' => '11:04:44',
            'no_rawat' => '2025/04/25/000001',
            'kode_brng' => 'B000000791',
            'aturan' => '3 x 1',
          ),
          11 => 
          array (
            'tgl_perawatan' => '2025-06-18',
            'jam' => '11:04:44',
            'no_rawat' => '2025/04/25/000001',
            'kode_brng' => 'B000000965',
            'aturan' => '1 x 1',
          ),
          12 => 
          array (
            'tgl_perawatan' => '2025-06-25',
            'jam' => '09:03:22',
            'no_rawat' => '2025/06/25/000001',
            'kode_brng' => 'B000000003',
            'aturan' => '3 x 1',
          ),
          13 => 
          array (
            'tgl_perawatan' => '2025-06-25',
            'jam' => '09:03:22',
            'no_rawat' => '2025/06/25/000001',
            'kode_brng' => 'B000000556',
            'aturan' => '2 x 1',
          ),
          14 => 
          array (
            'tgl_perawatan' => '2025-06-28',
            'jam' => '10:07:01',
            'no_rawat' => '2025/06/28/000001',
            'kode_brng' => 'B000000789',
            'aturan' => '3 x 1',
          ),
          15 => 
          array (
            'tgl_perawatan' => '2025-06-30',
            'jam' => '09:44:14',
            'no_rawat' => '2025/06/30/000003',
            'kode_brng' => 'B000000791',
            'aturan' => '2 X 1',
          ),
          16 => 
          array (
            'tgl_perawatan' => '2025-06-30',
            'jam' => '09:44:14',
            'no_rawat' => '2025/06/30/000003',
            'kode_brng' => 'B000000965',
            'aturan' => '2 X 1',
          ),
          17 => 
          array (
            'tgl_perawatan' => '2025-07-21',
            'jam' => '11:25:46',
            'no_rawat' => '2025/07/21/000001',
            'kode_brng' => 'B000000791',
            'aturan' => '2x1',
          ),
          18 => 
          array (
            'tgl_perawatan' => '2025-07-23',
            'jam' => '14:29:51',
            'no_rawat' => '2025/07/23/000001',
            'kode_brng' => 'B000000791',
            'aturan' => ' 2 x 1',
          ),
          19 => 
          array (
            'tgl_perawatan' => '2025-07-23',
            'jam' => '14:29:51',
            'no_rawat' => '2025/07/23/000001',
            'kode_brng' => 'B000000965',
            'aturan' => '3x 1',
          ),
          20 => 
          array (
            'tgl_perawatan' => '2025-07-29',
            'jam' => '09:36:43',
            'no_rawat' => '2025/07/29/000001',
            'kode_brng' => 'B000000791',
            'aturan' => '2x1',
          ),
          21 => 
          array (
            'tgl_perawatan' => '2025-07-29',
            'jam' => '09:36:43',
            'no_rawat' => '2025/07/29/000001',
            'kode_brng' => 'B000000965',
            'aturan' => '3x1',
          ),
          22 => 
          array (
            'tgl_perawatan' => '2025-08-04',
            'jam' => '10:11:15',
            'no_rawat' => '2025/08/04/000001',
            'kode_brng' => 'B000000571',
            'aturan' => '3x1',
          ),
          23 => 
          array (
            'tgl_perawatan' => '2025-08-04',
            'jam' => '10:11:15',
            'no_rawat' => '2025/08/04/000001',
            'kode_brng' => 'B000000791',
            'aturan' => '2x 1',
          ),
          24 => 
          array (
            'tgl_perawatan' => '2025-08-04',
            'jam' => '13:01:05',
            'no_rawat' => '2025/08/04/000001',
            'kode_brng' => 'B000000571',
            'aturan' => '2x1',
          ),
          25 => 
          array (
            'tgl_perawatan' => '2025-08-05',
            'jam' => '13:42:33',
            'no_rawat' => '2025/06/20/000002',
            'kode_brng' => 'B000000556',
            'aturan' => '2x1',
          ),
          26 => 
          array (
            'tgl_perawatan' => '2025-08-05',
            'jam' => '13:42:33',
            'no_rawat' => '2025/06/20/000002',
            'kode_brng' => 'B000001207',
            'aturan' => '2x1',
          ),
          27 => 
          array (
            'tgl_perawatan' => '2025-08-11',
            'jam' => '14:24:08',
            'no_rawat' => '2025/08/11/000001',
            'kode_brng' => 'B000000157',
            'aturan' => '3 X 1',
          ),
          28 => 
          array (
            'tgl_perawatan' => '2025-08-19',
            'jam' => '10:45:11',
            'no_rawat' => '2025/08/19/000001',
            'kode_brng' => 'B000000305',
            'aturan' => '2x1',
          ),
          29 => 
          array (
            'tgl_perawatan' => '2025-08-19',
            'jam' => '10:45:11',
            'no_rawat' => '2025/08/19/000001',
            'kode_brng' => 'B000000560',
            'aturan' => '3x1',
          ),
          30 => 
          array (
            'tgl_perawatan' => '2025-08-21',
            'jam' => '14:50:47',
            'no_rawat' => '2025/08/21/000001',
            'kode_brng' => 'B000000572',
            'aturan' => '2x1',
          ),
          31 => 
          array (
            'tgl_perawatan' => '2025-08-21',
            'jam' => '14:50:47',
            'no_rawat' => '2025/08/21/000001',
            'kode_brng' => 'B000000791',
            'aturan' => '3x1',
          ),
          32 => 
          array (
            'tgl_perawatan' => '2025-08-25',
            'jam' => '13:42:54',
            'no_rawat' => '2025/08/25/000001',
            'kode_brng' => 'B000000571',
            'aturan' => '3 x 1',
          ),
          33 => 
          array (
            'tgl_perawatan' => '2025-08-25',
            'jam' => '13:42:54',
            'no_rawat' => '2025/08/25/000001',
            'kode_brng' => 'B000000791',
            'aturan' => '2x1',
          ),
          34 => 
          array (
            'tgl_perawatan' => '2025-11-29',
            'jam' => '21:51:40',
            'no_rawat' => '2025/11/28/000001',
            'kode_brng' => 'B000000965',
            'aturan' => '3x1',
          ),
          35 => 
          array (
            'tgl_perawatan' => '2025-11-29',
            'jam' => '21:51:40',
            'no_rawat' => '2025/11/28/000001',
            'kode_brng' => 'B000001170',
            'aturan' => '3x1',
          ),
          36 => 
          array (
            'tgl_perawatan' => '2025-11-30',
            'jam' => '21:56:52',
            'no_rawat' => '2025/11/27/000001',
            'kode_brng' => 'B000000965',
            'aturan' => '3X1',
          ),
          37 => 
          array (
            'tgl_perawatan' => '2025-11-30',
            'jam' => '21:56:52',
            'no_rawat' => '2025/11/27/000001',
            'kode_brng' => 'B000001170',
            'aturan' => '3X1',
          ),
          38 => 
          array (
            'tgl_perawatan' => '2025-11-30',
            'jam' => '22:55:10',
            'no_rawat' => '2025/11/30/000002',
            'kode_brng' => 'B000000286',
            'aturan' => '3x1',
          ),
          39 => 
          array (
            'tgl_perawatan' => '2025-11-30',
            'jam' => '22:55:10',
            'no_rawat' => '2025/11/30/000002',
            'kode_brng' => 'B000000378',
            'aturan' => '3x1',
          ),
          40 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '10:17:12',
            'no_rawat' => '2025/12/01/000001',
            'kode_brng' => 'B000000965',
            'aturan' => '3x1',
          ),
          41 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '10:17:12',
            'no_rawat' => '2025/12/01/000001',
            'kode_brng' => 'B000001170',
            'aturan' => '3x1',
          ),
          42 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '10:17:34',
            'no_rawat' => '2025/12/01/000001',
            'kode_brng' => '2018001',
            'aturan' => '3x1',
          ),
          43 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '10:17:34',
            'no_rawat' => '2025/12/01/000001',
            'kode_brng' => 'B000000572',
            'aturan' => '3x1',
          ),
          44 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '10:30:47',
            'no_rawat' => '2025/12/01/000002',
            'kode_brng' => 'A000000032',
            'aturan' => '3x1',
          ),
          45 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '10:30:47',
            'no_rawat' => '2025/12/01/000002',
            'kode_brng' => 'B000000002',
            'aturan' => '3x1',
          ),
          46 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '10:30:47',
            'no_rawat' => '2025/12/01/000002',
            'kode_brng' => 'B000000965',
            'aturan' => '3x1',
          ),
          47 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '12:38:22',
            'no_rawat' => '2025/12/01/000003',
            'kode_brng' => 'A000000125',
            'aturan' => '3x1',
          ),
          48 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '12:38:22',
            'no_rawat' => '2025/12/01/000003',
            'kode_brng' => 'B000000571',
            'aturan' => '3x1',
          ),
          49 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '12:38:22',
            'no_rawat' => '2025/12/01/000003',
            'kode_brng' => 'B000001170',
            'aturan' => '3x1',
          ),
          50 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '22:20:14',
            'no_rawat' => '2025/12/01/000004',
            'kode_brng' => 'B000000168',
            'aturan' => '3x1',
          ),
          51 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '22:20:14',
            'no_rawat' => '2025/12/01/000004',
            'kode_brng' => 'B000000565',
            'aturan' => '3x1',
          ),
          52 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '22:20:14',
            'no_rawat' => '2025/12/01/000004',
            'kode_brng' => 'B000000965',
            'aturan' => '3x1',
          ),
          53 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '22:48:55',
            'no_rawat' => '2025/12/01/000005',
            'kode_brng' => 'B000000133',
            'aturan' => '3x1',
          ),
          54 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '22:48:55',
            'no_rawat' => '2025/12/01/000005',
            'kode_brng' => 'B000000571',
            'aturan' => '3x1',
          ),
          55 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '22:48:55',
            'no_rawat' => '2025/12/01/000005',
            'kode_brng' => 'B000000965',
            'aturan' => '3x1',
          ),
          56 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '23:24:04',
            'no_rawat' => '2025/12/01/000006',
            'kode_brng' => 'B000000584',
            'aturan' => '2x1',
          ),
          57 => 
          array (
            'tgl_perawatan' => '2025-12-01',
            'jam' => '23:24:04',
            'no_rawat' => '2025/12/01/000006',
            'kode_brng' => 'B000000965',
            'aturan' => '3x1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}