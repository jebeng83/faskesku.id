<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CatatanObservasiChbpTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('catatan_observasi_chbp')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('catatan_observasi_chbp')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tgl_perawatan' => '2025-06-28',
            'jam_rawat' => '09:42:35',
            'td' => '1',
            'hr' => '2',
            'suhu' => '3',
            'djj' => '4',
            'his' => '5',
            'ppv' => '6',
            'keterangan' => '7',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}