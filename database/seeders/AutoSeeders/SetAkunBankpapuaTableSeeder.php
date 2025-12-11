<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetAkunBankpapuaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_akun_bankpapua')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_akun_bankpapua')->insert(array (
          0 => 
          array (
            'kd_rek' => '112092',
            'usere' => '9Ó›xî¨@úÌÁ­ÛÑ',
            'passworde' => 'â\\ŠG,ÄÐOO´Ì{=ª',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}