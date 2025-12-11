<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PasswordAsuransiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('password_asuransi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('password_asuransi')->insert(array (
          0 => 
          array (
            'kd_pj' => 'BPJ',
            'usere' => '•³þùDw×÷«aÔ9Ç',
            'passworde' => 'JB»2by…\\nÊ\\Ÿ',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}