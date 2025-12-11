<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CatatanObservasiInduksiPersalinanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('catatan_observasi_induksi_persalinan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('catatan_observasi_induksi_persalinan')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'tgl_perawatan' => '2025-06-18',
            'jam_rawat' => '13:27:03',
            'obat' => '1',
            'cairan' => '2',
            'dosis' => '3',
            'his' => '4',
            'djj' => '5',
            'keterangan' => '6',
            'nip' => '123124',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tgl_perawatan' => '2025-06-28',
            'jam_rawat' => '09:43:03',
            'obat' => '1',
            'cairan' => '2',
            'dosis' => '3',
            'his' => '3',
            'djj' => '3',
            'keterangan' => '3',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}