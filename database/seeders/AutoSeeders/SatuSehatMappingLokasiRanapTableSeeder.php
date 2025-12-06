<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SatuSehatMappingLokasiRanapTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('satu_sehat_mapping_lokasi_ranap')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('satu_sehat_mapping_lokasi_ranap')->insert(array (
          0 => 
          array (
            'kd_kamar' => 'K1.01',
            'id_organisasi_satusehat' => '228304d3-c8fd-4a37-aefc-ebac9c047763',
            'id_lokasi_satusehat' => '63143d31-4bda-441f-91da-77949fad59ea',
            'longitude' => '111.05827946682133',
            'latitude' => '-7.535561951939349',
            'altittude' => '500',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}