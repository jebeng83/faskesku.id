<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BankTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('bank')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('bank')->insert(array (
          0 => 
          array (
            'namabank' => 'Bank BCA',
          ),
          1 => 
          array (
            'namabank' => 'Bank BNI',
          ),
          2 => 
          array (
            'namabank' => 'Bank BRI',
          ),
          3 => 
          array (
            'namabank' => 'Bank Jabar',
          ),
          4 => 
          array (
            'namabank' => 'Bank Mandiri',
          ),
          5 => 
          array (
            'namabank' => 'Bank Papua',
          ),
          6 => 
          array (
            'namabank' => 'BPD',
          ),
          7 => 
          array (
            'namabank' => 'MANDIRI',
          ),
          8 => 
          array (
            'namabank' => 'Muamalat',
          ),
          9 => 
          array (
            'namabank' => 'T',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}