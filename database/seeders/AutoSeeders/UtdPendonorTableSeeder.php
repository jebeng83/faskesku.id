<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UtdPendonorTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('utd_pendonor')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('utd_pendonor')->insert(array (
          0 => 
          array (
            'no_pendonor' => 'UTD000001',
            'nama' => 'Windiarto',
            'no_ktp' => '123456789',
            'jk' => 'L',
            'tmp_lahir' => 'Klaten',
            'tgl_lahir' => '1988-02-24',
            'alamat' => 'tes q qw qw q wqw q w qw q w q wq w q wq w q w qw q w qw q wq',
            'kd_kel' => 1407,
            'kd_kec' => 91,
            'kd_kab' => 187,
            'kd_prop' => 3,
            'golongan_darah' => 'O',
            'resus' => '(+)',
            'no_telp' => '123456',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}