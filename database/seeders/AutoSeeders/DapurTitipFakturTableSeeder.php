<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DapurTitipFakturTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dapur_titip_faktur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dapur_titip_faktur')->insert(array (
          0 => 
          array (
            'no_tagihan' => 'TD20241115001',
            'tanggal' => '2024-11-15',
            'nip' => '123124',
            'keterangan' => '-',
            'status' => 'Ditagihkan',
          ),
          1 => 
          array (
            'no_tagihan' => 'TD20241122001',
            'tanggal' => '2024-11-22',
            'nip' => '123124',
            'keterangan' => '-',
            'status' => 'Ditagihkan',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}