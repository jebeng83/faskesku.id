<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetAkunBankjabarTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_akun_bankjabar')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_akun_bankjabar')->insert(array (
          0 => 
          array (
            'kd_rek' => '112093',
            'kode_bank' => '027',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}