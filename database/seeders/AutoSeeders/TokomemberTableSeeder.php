<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TokomemberTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('tokomember')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('tokomember')->insert(array (
          0 => 
          array (
            'no_member' => '-',
            'nama' => '-',
            'jk' => 'L',
            'tmp_lahir' => '-',
            'tgl_lahir' => '2021-12-28',
            'alamat' => '-',
            'no_telp' => '0',
            'email' => '-',
          ),
          1 => 
          array (
            'no_member' => 'M0000001',
            'nama' => 'JUMINTEN',
            'jk' => 'L',
            'tmp_lahir' => 'JOGJA',
            'tgl_lahir' => '2020-04-02',
            'alamat' => 'JOGJA',
            'no_telp' => '01010101',
            'email' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}