<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CatatanAdimeGiziTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('catatan_adime_gizi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('catatan_adime_gizi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/05/26/000001',
            'tanggal' => '2025-05-26 11:41:00',
            'asesmen' => '1',
            'diagnosis' => '',
            'intervensi' => '',
            'monitoring' => '-',
            'evaluasi' => '',
            'instruksi' => '',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}