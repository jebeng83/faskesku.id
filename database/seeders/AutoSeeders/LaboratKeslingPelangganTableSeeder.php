<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class LaboratKeslingPelangganTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('laborat_kesling_pelanggan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('laborat_kesling_pelanggan')->insert(array (
          0 => 
          array (
            'kode_pelanggan' => 'P0001',
            'nama_pelanggan' => 'PT MAJU MUNDUR',
            'alamat' => 'JOGJA',
            'kota' => 'JOGJA',
            'no_telp' => '-',
            'kegiatan_usaha' => 'PABRIK ROTI',
            'personal_dihubungi' => 'PAIJO',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}