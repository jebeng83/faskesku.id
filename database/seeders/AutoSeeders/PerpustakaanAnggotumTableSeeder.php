<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerpustakaanAnggotumTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_anggota')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('perpustakaan_anggota')->insert(array (
          0 => 
          array (
            'no_anggota' => 'AP00000001',
            'nama_anggota' => 'windiarto nugroho',
            'tmp_lahir' => '121212',
            'tgl_lahir' => '2019-04-22',
            'j_kel' => 'L',
            'alamat' => '1212',
            'no_telp' => '08181818181',
            'email' => 'khanza_media@yahoo.com',
            'tgl_gabung' => '2019-04-22',
            'masa_berlaku' => '2020-04-22',
            'jenis_anggota' => 'Pasien',
            'nomer_id' => '123123',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}