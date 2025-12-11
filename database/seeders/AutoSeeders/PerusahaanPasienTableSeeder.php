<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerusahaanPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('perusahaan_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('perusahaan_pasien')->insert(array (
          0 => 
          array (
            'kode_perusahaan' => '-',
            'nama_perusahaan' => '-',
            'alamat' => '-',
            'kota' => '-',
            'no_telp' => '0',
          ),
          1 => 
          array (
            'kode_perusahaan' => 'I0002',
            'nama_perusahaan' => 'PERUSAHAAN MAJU MUNDUR',
            'alamat' => '2',
            'kota' => '3',
            'no_telp' => '0',
          ),
          2 => 
          array (
            'kode_perusahaan' => 'I0003',
            'nama_perusahaan' => 'Perusahaan Lokal',
            'alamat' => 'Solo',
            'kota' => 'Jawatengah',
            'no_telp' => '085229977208',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}