<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PetugaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('petugas')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('petugas')->insert(array (
          0 => 
          array (
            'nip' => '-',
            'nama' => '-',
            'jk' => 'L',
            'tmp_lahir' => '-',
            'tgl_lahir' => '2021-09-22',
            'gol_darah' => 'A',
            'agama' => 'ISLAM',
            'stts_nikah' => 'MENIKAH',
            'alamat' => '-',
            'kd_jbtn' => 'J001',
            'no_telp' => '0',
            'email' => '',
            'status' => '1',
          ),
          1 => 
          array (
            'nip' => '01010101',
            'nama' => 'RAHMI DEWI',
            'jk' => 'L',
            'tmp_lahir' => 'SASAS',
            'tgl_lahir' => '2025-07-29',
            'gol_darah' => 'A',
            'agama' => 'ISLAM',
            'stts_nikah' => 'MENIKAH',
            'alamat' => 'SAS',
            'kd_jbtn' => 'J001',
            'no_telp' => '',
            'email' => 'SAS',
            'status' => '1',
          ),
          2 => 
          array (
            'nip' => '12/09/1988/001',
            'nama' => 'ANJASMARA',
            'jk' => 'L',
            'tmp_lahir' => '-',
            'tgl_lahir' => '2021-09-22',
            'gol_darah' => 'A',
            'agama' => 'ISLAM',
            'stts_nikah' => 'MENIKAH',
            'alamat' => '-',
            'kd_jbtn' => 'J001',
            'no_telp' => '0',
            'email' => 'wqwqw@sasasas.com',
            'status' => '1',
          ),
          3 => 
          array (
            'nip' => '123124',
            'nama' => 'FREDIAN AHMAD',
            'jk' => 'L',
            'tmp_lahir' => 'MAKSAR',
            'tgl_lahir' => '2022-11-20',
            'gol_darah' => 'A',
            'agama' => 'ISLAM',
            'stts_nikah' => 'MENIKAH',
            'alamat' => '-',
            'kd_jbtn' => 'APT',
            'no_telp' => '01010101',
            'email' => '',
            'status' => '1',
          ),
          4 => 
          array (
            'nip' => '156798',
            'nama' => 'SUSI SUSANTI',
            'jk' => 'L',
            'tmp_lahir' => 'KLATEN',
            'tgl_lahir' => '2025-03-15',
            'gol_darah' => 'A',
            'agama' => 'ISLAM',
            'stts_nikah' => 'MENIKAH',
            'alamat' => 'JONGGRANGAN',
            'kd_jbtn' => 'J014',
            'no_telp' => '',
            'email' => '',
            'status' => '1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}