<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DapuropnameTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dapuropname')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dapuropname')->insert(array (
          0 => 
          array (
            'kode_brng' => 'D00003',
            'h_beli' => 500.0,
            'tanggal' => '2024-11-22',
            'stok' => 0,
            'real' => 200,
            'selisih' => 0,
            'nomihilang' => 0.0,
            'lebih' => 200,
            'nomilebih' => 100000.0,
            'keterangan' => 'TES',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}