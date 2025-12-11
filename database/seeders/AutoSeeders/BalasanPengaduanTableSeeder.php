<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BalasanPengaduanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('balasan_pengaduan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('balasan_pengaduan')->insert(array (
          0 => 
          array (
            'id_pengaduan' => '20241125000001',
            'pesan_balasan' => 'siiap',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}