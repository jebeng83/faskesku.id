<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CatatanKeperawatanRanapTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('catatan_keperawatan_ranap')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('catatan_keperawatan_ranap')->insert(array (
          0 => 
          array (
            'tanggal' => '2025-06-28',
            'jam' => '09:48:14',
            'no_rawat' => '2025/06/28/000001',
            'uraian' => 'tes',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}