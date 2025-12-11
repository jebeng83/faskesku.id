<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterTindakanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_tindakan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_tindakan')->insert(array (
          0 => 
          array (
            'id' => 9,
            'nama' => 'TINDAKAN PASIEN',
            'jm' => 100000.0,
            'jns' => 'dr Umum',
          ),
          1 => 
          array (
            'id' => 10,
            'nama' => 'TINDAKAN SPESIALIS',
            'jm' => 100000.0,
            'jns' => 'dr Spesialis',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}