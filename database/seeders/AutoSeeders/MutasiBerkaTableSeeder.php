<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MutasiBerkaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('mutasi_berkas')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('mutasi_berkas')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/27/000001',
            'status' => 'Sudah Diterima',
            'dikirim' => '2025-04-27 08:33:54',
            'diterima' => '2025-04-27 08:33:54',
            'kembali' => '0000-00-00 00:00:00',
            'tidakada' => '0000-00-00 00:00:00',
            'ranap' => '0000-00-00 00:00:00',
          ),
          1 => 
          array (
            'no_rawat' => '2025/05/26/000001',
            'status' => 'Sudah Kembali',
            'dikirim' => '2025-05-26 10:24:41',
            'diterima' => '2025-05-26 10:24:41',
            'kembali' => '2025-05-26 10:32:45',
            'tidakada' => '0000-00-00 00:00:00',
            'ranap' => '0000-00-00 00:00:00',
          ),
          2 => 
          array (
            'no_rawat' => '2025/05/26/000003',
            'status' => 'Masuk Ranap',
            'dikirim' => '2025-05-26 14:26:30',
            'diterima' => '2025-05-26 14:26:44',
            'kembali' => '2025-05-26 14:26:54',
            'tidakada' => '0000-00-00 00:00:00',
            'ranap' => '2025-05-26 14:26:58',
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/09/000001',
            'status' => 'Sudah Diterima',
            'dikirim' => '2025-06-09 08:38:16',
            'diterima' => '2025-06-09 08:41:04',
            'kembali' => '0000-00-00 00:00:00',
            'tidakada' => '0000-00-00 00:00:00',
            'ranap' => '0000-00-00 00:00:00',
          ),
          4 => 
          array (
            'no_rawat' => '2025/06/09/000002',
            'status' => 'Sudah Kembali',
            'dikirim' => '2025-06-09 08:40:12',
            'diterima' => '2025-06-09 08:40:12',
            'kembali' => '2025-06-09 08:40:40',
            'tidakada' => '0000-00-00 00:00:00',
            'ranap' => '0000-00-00 00:00:00',
          ),
          5 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'status' => 'Sudah Kembali',
            'dikirim' => '2025-06-18 13:13:35',
            'diterima' => '2025-06-18 13:18:06',
            'kembali' => '2025-06-18 13:18:29',
            'tidakada' => '0000-00-00 00:00:00',
            'ranap' => '0000-00-00 00:00:00',
          ),
          6 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'status' => 'Sudah Diterima',
            'dikirim' => '2025-06-20 13:49:21',
            'diterima' => '2025-06-20 13:49:41',
            'kembali' => '0000-00-00 00:00:00',
            'tidakada' => '0000-00-00 00:00:00',
            'ranap' => '0000-00-00 00:00:00',
          ),
          7 => 
          array (
            'no_rawat' => '2025/06/30/000001',
            'status' => 'Sudah Diterima',
            'dikirim' => '2025-06-30 09:13:43',
            'diterima' => '2025-06-30 09:14:00',
            'kembali' => '0000-00-00 00:00:00',
            'tidakada' => '0000-00-00 00:00:00',
            'ranap' => '0000-00-00 00:00:00',
          ),
          8 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'status' => 'Sudah Kembali',
            'dikirim' => '2025-06-30 09:23:12',
            'diterima' => '0000-00-00 00:00:00',
            'kembali' => '2025-06-30 09:23:12',
            'tidakada' => '0000-00-00 00:00:00',
            'ranap' => '0000-00-00 00:00:00',
          ),
          9 => 
          array (
            'no_rawat' => '2025/07/23/000001',
            'status' => 'Sudah Diterima',
            'dikirim' => '2025-07-23 14:28:04',
            'diterima' => '2025-07-23 14:28:04',
            'kembali' => '0000-00-00 00:00:00',
            'tidakada' => '0000-00-00 00:00:00',
            'ranap' => '0000-00-00 00:00:00',
          ),
          10 => 
          array (
            'no_rawat' => '2025/07/29/000001',
            'status' => 'Sudah Kembali',
            'dikirim' => '2025-07-29 09:27:06',
            'diterima' => '2025-07-29 09:27:06',
            'kembali' => '2025-07-29 09:34:20',
            'tidakada' => '0000-00-00 00:00:00',
            'ranap' => '0000-00-00 00:00:00',
          ),
          11 => 
          array (
            'no_rawat' => '2025/08/11/000001',
            'status' => 'Sudah Diterima',
            'dikirim' => '2025-08-11 14:18:30',
            'diterima' => '2025-08-11 14:18:39',
            'kembali' => '0000-00-00 00:00:00',
            'tidakada' => '0000-00-00 00:00:00',
            'ranap' => '0000-00-00 00:00:00',
          ),
          12 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'status' => 'Sudah Diterima',
            'dikirim' => '2025-08-19 10:00:40',
            'diterima' => '2025-08-19 10:01:18',
            'kembali' => '0000-00-00 00:00:00',
            'tidakada' => '0000-00-00 00:00:00',
            'ranap' => '0000-00-00 00:00:00',
          ),
          13 => 
          array (
            'no_rawat' => '2025/08/21/000001',
            'status' => 'Sudah Kembali',
            'dikirim' => '2025-08-21 14:44:20',
            'diterima' => '2025-08-21 14:44:20',
            'kembali' => '2025-08-21 14:49:14',
            'tidakada' => '0000-00-00 00:00:00',
            'ranap' => '0000-00-00 00:00:00',
          ),
          14 => 
          array (
            'no_rawat' => '2025/08/25/000001',
            'status' => 'Sudah Diterima',
            'dikirim' => '2025-08-25 13:12:07',
            'diterima' => '2025-08-25 13:12:07',
            'kembali' => '0000-00-00 00:00:00',
            'tidakada' => '0000-00-00 00:00:00',
            'ranap' => '0000-00-00 00:00:00',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}