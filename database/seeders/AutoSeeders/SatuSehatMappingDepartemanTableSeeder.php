<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SatuSehatMappingDepartemanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('satu_sehat_mapping_departemen')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('satu_sehat_mapping_departemen')->insert(array (
          0 => 
          array (
            'dep_id' => 'DIR',
            'id_organisasi_satusehat' => '228304d3-c8fd-4a37-aefc-ebac9c047763',
          ),
          1 => 
          array (
            'dep_id' => 'RJ',
            'id_organisasi_satusehat' => '5b0003b8-ee48-4455-a994-bcc00bc1bfe4',
          ),
          2 => 
          array (
            'dep_id' => '-',
            'id_organisasi_satusehat' => '8b18ec14-b466-4459-bce7-61c58aecaf76',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}