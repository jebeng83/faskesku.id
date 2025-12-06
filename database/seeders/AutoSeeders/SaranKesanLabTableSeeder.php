<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SaranKesanLabTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('saran_kesan_lab')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('saran_kesan_lab')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/26/000001',
            'tgl_periksa' => '2025-04-26',
            'jam' => '09:31:42',
            'saran' => 'asasas
        sa
        sa
        sa
        ss',
            'kesan' => 'asasas',
          ),
          1 => 
          array (
            'no_rawat' => '2025/05/26/000001',
            'tgl_periksa' => '2025-05-26',
            'jam' => '10:44:31',
            'saran' => 'tes',
            'kesan' => 'tes',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/19/000001',
            'tgl_periksa' => '2025-06-19',
            'jam' => '09:53:26',
            'saran' => '-',
            'kesan' => 'p',
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tgl_periksa' => '2025-06-28',
            'jam' => '10:10:57',
            'saran' => '1',
            'kesan' => '1',
          ),
          4 => 
          array (
            'no_rawat' => '2025/06/30/000001',
            'tgl_periksa' => '2025-07-05',
            'jam' => '09:42:44',
            'saran' => 'wqwqw',
            'kesan' => 'qwqw',
          ),
          5 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'tgl_periksa' => '2025-06-30',
            'jam' => '09:51:37',
            'saran' => 'tes',
            'kesan' => 'tes',
          ),
          6 => 
          array (
            'no_rawat' => '2025/08/04/000001',
            'tgl_periksa' => '2025-08-04',
            'jam' => '10:21:08',
            'saran' => '121212',
            'kesan' => '121',
          ),
          7 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'tgl_periksa' => '2025-08-19',
            'jam' => '11:00:58',
            'saran' => 'tes',
            'kesan' => 'tes',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}