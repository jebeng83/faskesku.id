<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SkriningNutrisiDewasaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('skrining_nutrisi_dewasa')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('skrining_nutrisi_dewasa')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'tanggal' => '2025-06-30 08:57:02',
            'td' => '-',
            'hr' => '-',
            'rr' => '-',
            'suhu' => '-',
            'bb' => '-',
            'tbpb' => '-',
            'spo2' => '-',
            'alergi' => '-',
            'sg1' => 'Tidak',
            'nilai1' => '0',
            'sg2' => 'Tidak',
            'nilai2' => '0',
            'total_hasil' => 0,
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}