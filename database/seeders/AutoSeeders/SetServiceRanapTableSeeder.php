<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetServiceRanapTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_service_ranap')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_service_ranap')->insert(array (
          0 => 
          array (
            'nama_service' => 'SERVICE ADMIN',
            'besar' => 10.0,
            'laborat' => 'Yes',
            'radiologi' => 'Yes',
            'operasi' => 'Yes',
            'obat' => 'Yes',
            'ranap_dokter' => 'Yes',
            'ranap_paramedis' => 'Yes',
            'ralan_dokter' => 'Yes',
            'ralan_paramedis' => 'Yes',
            'tambahan' => 'Yes',
            'potongan' => 'Yes',
            'kamar' => 'Yes',
            'registrasi' => 'Yes',
            'harian' => 'Yes',
            'retur_Obat' => 'Yes',
            'resep_Pulang' => 'Yes',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}