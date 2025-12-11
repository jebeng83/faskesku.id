<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SatuSehatMappingLokasiRalanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('satu_sehat_mapping_lokasi_ralan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('satu_sehat_mapping_lokasi_ralan')->insert(array (
          0 => 
          array (
            'kd_poli' => 'U0009',
            'id_organisasi_satusehat' => '8b18ec14-b466-4459-bce7-61c58aecaf76',
            'id_lokasi_satusehat' => '98ea94a7-9c56-40a7-a0b3-380593b8f34d',
            'longitude' => '111.05827946682133',
            'latitude' => '-7.535561951939349',
            'altittude' => '500',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}