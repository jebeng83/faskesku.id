<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IpsrssuplierTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('ipsrssuplier')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('ipsrssuplier')->insert(array (
          0 => 
          array (
            'kode_suplier' => 'S0001',
            'nama_suplier' => 'TES 1',
            'alamat' => '-',
            'kota' => '-',
            'no_telp' => '0',
            'nama_bank' => 'Mandiri',
            'rekening' => '123123123',
          ),
          1 => 
          array (
            'kode_suplier' => 'S0002',
            'nama_suplier' => 'PT MAJU MUNDUR',
            'alamat' => '-',
            'kota' => '-',
            'no_telp' => '0',
            'nama_bank' => '-',
            'rekening' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}