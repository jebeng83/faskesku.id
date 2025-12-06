<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailNotaJalanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_nota_jalan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_nota_jalan')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/28/000003',
            'nama_bayar' => 'Bayar Cash',
            'besarppn' => 0.0,
            'besar_bayar' => 150000.0,
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/03/000002',
            'nama_bayar' => 'Bank BCA',
            'besarppn' => 0.0,
            'besar_bayar' => 558454.0,
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/03/000002',
            'nama_bayar' => 'Bayar Cash',
            'besarppn' => 0.0,
            'besar_bayar' => 200000.0,
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'nama_bayar' => 'Bayar Cash',
            'besarppn' => 0.0,
            'besar_bayar' => 768032.0,
          ),
          4 => 
          array (
            'no_rawat' => '2025/07/23/000001',
            'nama_bayar' => 'Transfer Mandiri',
            'besarppn' => 0.0,
            'besar_bayar' => 647181.0,
          ),
          5 => 
          array (
            'no_rawat' => '2025/07/29/000001',
            'nama_bayar' => 'Bank BCA',
            'besarppn' => 0.0,
            'besar_bayar' => 971268.0,
          ),
          6 => 
          array (
            'no_rawat' => '2025/07/29/000001',
            'nama_bayar' => 'Bayar Cash',
            'besarppn' => 0.0,
            'besar_bayar' => 400000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}