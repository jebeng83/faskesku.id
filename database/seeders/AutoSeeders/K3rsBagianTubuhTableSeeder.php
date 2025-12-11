<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class K3rsBagianTubuhTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('k3rs_bagian_tubuh')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('k3rs_bagian_tubuh')->insert(array (
          0 => 
          array (
            'kode_bagian' => 'BK001',
            'bagian_tubuh' => 'Tulang belakang dan ruas tulang punggung',
          ),
          1 => 
          array (
            'kode_bagian' => 'BK002',
            'bagian_tubuh' => 'Badan dan organ dalam',
          ),
          2 => 
          array (
            'kode_bagian' => 'BK003',
            'bagian_tubuh' => 'Anggota badan bagian atas',
          ),
          3 => 
          array (
            'kode_bagian' => 'BK004',
            'bagian_tubuh' => 'Seluruh badan',
          ),
          4 => 
          array (
            'kode_bagian' => 'BK005',
            'bagian_tubuh' => 'Cidera bagian tubuh lainnya, yaitu jari tangan, lebih dari 2 lokasi bagian tubuh yang terluka',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}