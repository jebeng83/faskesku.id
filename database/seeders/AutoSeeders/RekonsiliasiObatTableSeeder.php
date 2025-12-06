<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RekonsiliasiObatTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('rekonsiliasi_obat')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('rekonsiliasi_obat')->insert(array (
          0 => 
          array (
            'no_rekonsiliasi' => 'RO202508050001',
            'no_rawat' => '2025/06/20/000002',
            'tanggal_wawancara' => '2025-08-05 09:04:04',
            'rekonsiliasi_obat_saat' => 'Admisi',
            'alergi_obat' => '',
            'manifestasi_alergi' => '',
            'dampak_alergi' => '-',
            'nip' => '12/09/1988/001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}