<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CatatanKeperawatanRalanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('catatan_keperawatan_ralan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('catatan_keperawatan_ralan')->insert(array (
          0 => 
          array (
            'tanggal' => '2025-06-30',
            'jam' => '09:01:20',
            'no_rawat' => '2025/06/30/000003',
            'uraian' => 'TES',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}