<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetAkunBankjatengTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_akun_bankjateng')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_akun_bankjateng')->insert(array (
          0 => 
          array (
            'kd_rek' => '112091',
            'usere' => '•³þùDw×÷«aÔ9Ç',
            'passworde' => 'G®Œk^\'Áb²ú\\â—7K' . "\0" . '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}