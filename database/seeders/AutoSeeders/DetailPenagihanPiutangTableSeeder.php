<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailPenagihanPiutangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_penagihan_piutang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_penagihan_piutang')->insert(array (
          0 => 
          array (
            'no_tagihan' => 'PP20250428001',
            'no_rawat' => '2025/04/28/000001',
            'sisapiutang' => 349225.0,
          ),
          1 => 
          array (
            'no_tagihan' => 'PP20250428001',
            'no_rawat' => '2025/04/28/000002',
            'sisapiutang' => 284693.0,
          ),
          2 => 
          array (
            'no_tagihan' => 'PP20250603001',
            'no_rawat' => '2025/04/28/000001',
            'sisapiutang' => 349225.0,
          ),
          3 => 
          array (
            'no_tagihan' => 'PP20250603001',
            'no_rawat' => '2025/04/28/000002',
            'sisapiutang' => 284693.0,
          ),
          4 => 
          array (
            'no_tagihan' => 'PP20250603001',
            'no_rawat' => '2025/05/26/000001',
            'sisapiutang' => 1136673.0,
          ),
          5 => 
          array (
            'no_tagihan' => 'PP20250603001',
            'no_rawat' => '2025/05/26/000002',
            'sisapiutang' => 109250.0,
          ),
          6 => 
          array (
            'no_tagihan' => 'PP20250603001',
            'no_rawat' => '2025/06/03/000001',
            'sisapiutang' => 204176.0,
          ),
          7 => 
          array (
            'no_tagihan' => 'PP20250620001',
            'no_rawat' => '2025/04/28/000001',
            'sisapiutang' => 349225.0,
          ),
          8 => 
          array (
            'no_tagihan' => 'PP20250620001',
            'no_rawat' => '2025/04/28/000002',
            'sisapiutang' => 284693.0,
          ),
          9 => 
          array (
            'no_tagihan' => 'PP20250620001',
            'no_rawat' => '2025/05/26/000001',
            'sisapiutang' => 1136673.0,
          ),
          10 => 
          array (
            'no_tagihan' => 'PP20250620001',
            'no_rawat' => '2025/05/26/000002',
            'sisapiutang' => 109250.0,
          ),
          11 => 
          array (
            'no_tagihan' => 'PP20250620001',
            'no_rawat' => '2025/06/03/000001',
            'sisapiutang' => 204176.0,
          ),
          12 => 
          array (
            'no_tagihan' => 'PP20250825001',
            'no_rawat' => '2025/04/27/000001',
            'sisapiutang' => 776478.0,
          ),
          13 => 
          array (
            'no_tagihan' => 'PP20250825001',
            'no_rawat' => '2025/04/28/000001',
            'sisapiutang' => 349225.0,
          ),
          14 => 
          array (
            'no_tagihan' => 'PP20250825001',
            'no_rawat' => '2025/05/26/000002',
            'sisapiutang' => 109250.0,
          ),
          15 => 
          array (
            'no_tagihan' => 'PP20250825001',
            'no_rawat' => '2025/06/25/000001',
            'sisapiutang' => 1052078.0,
          ),
          16 => 
          array (
            'no_tagihan' => 'PP20250825001',
            'no_rawat' => '2025/08/11/000001',
            'sisapiutang' => 1973133.0,
          ),
          17 => 
          array (
            'no_tagihan' => 'PP20250825001',
            'no_rawat' => '2025/08/19/000001',
            'sisapiutang' => 6892647.0,
          ),
          18 => 
          array (
            'no_tagihan' => 'PP20250825001',
            'no_rawat' => '2025/08/21/000001',
            'sisapiutang' => 994759.0,
          ),
          19 => 
          array (
            'no_tagihan' => 'PP20250825001',
            'no_rawat' => '2025/08/25/000001',
            'sisapiutang' => 814433.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}