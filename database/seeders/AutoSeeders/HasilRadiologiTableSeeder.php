<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class HasilRadiologiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('hasil_radiologi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('hasil_radiologi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tgl_periksa' => '2025-06-11',
            'jam' => '19:20:31',
            'hasil' => 'tes
        
        tes',
          ),
          1 => 
          array (
            'no_rawat' => '2025/04/27/000001',
            'tgl_periksa' => '2025-04-27',
            'jam' => '08:48:08',
            'hasil' => 'tes 1
        
        tes 2
        
        tes 3',
          ),
          2 => 
          array (
            'no_rawat' => '2025/05/26/000001',
            'tgl_periksa' => '2025-05-26',
            'jam' => '10:51:25',
            'hasil' => 'tes 1
        
        tes 2
        
        tes 3',
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'tgl_periksa' => '2025-08-05',
            'jam' => '13:38:16',
            'hasil' => 'tes
        
        tes
        ',
          ),
          4 => 
          array (
            'no_rawat' => '2025/06/25/000001',
            'tgl_periksa' => '2025-06-25',
            'jam' => '09:02:18',
            'hasil' => 'i
        
        q
        
        
        q
        
        q',
          ),
          5 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'tgl_periksa' => '2025-06-30',
            'jam' => '09:56:57',
            'hasil' => 'p
        
        
        o
        
        
        p
        ',
          ),
          6 => 
          array (
            'no_rawat' => '2025/07/29/000001',
            'tgl_periksa' => '2025-07-29',
            'jam' => '09:45:48',
            'hasil' => 'asasas',
          ),
          7 => 
          array (
            'no_rawat' => '2025/08/04/000001',
            'tgl_periksa' => '2025-08-04',
            'jam' => '10:31:51',
            'hasil' => '23232323',
          ),
          8 => 
          array (
            'no_rawat' => '2025/08/04/000001',
            'tgl_periksa' => '2025-08-04',
            'jam' => '10:39:56',
            'hasil' => 'qwqwqwqwq',
          ),
          9 => 
          array (
            'no_rawat' => '2025/08/11/000001',
            'tgl_periksa' => '2025-08-11',
            'jam' => '14:29:20',
            'hasil' => 'qwq
        
        wq
        w
        qw
        qw
        
        wqw',
          ),
          10 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'tgl_periksa' => '2025-08-19',
            'jam' => '11:11:22',
            'hasil' => 'TES HASIL',
          ),
          11 => 
          array (
            'no_rawat' => '2025/08/21/000001',
            'tgl_periksa' => '2025-08-21',
            'jam' => '14:55:50',
            'hasil' => 'tes 1
        
        tes 2
        
        tes 3',
          ),
          12 => 
          array (
            'no_rawat' => '2025/08/25/000001',
            'tgl_periksa' => '2025-08-25',
            'jam' => '14:10:21',
            'hasil' => 'O
        
        
        O
        
        
        O
        ',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}