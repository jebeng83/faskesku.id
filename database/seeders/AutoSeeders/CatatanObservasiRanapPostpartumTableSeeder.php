<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CatatanObservasiRanapPostpartumTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('catatan_observasi_ranap_postpartum')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('catatan_observasi_ranap_postpartum')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tgl_perawatan' => '2025-06-28',
            'jam_rawat' => '09:42:13',
            'gcs' => '12',
            'td' => '3',
            'hr' => '4',
            'rr' => '5',
            'suhu' => '6',
            'spo2' => '7',
            'tfu' => '6',
            'kontraksi' => '7',
            'perdarahan' => '8',
            'keterangan' => '9',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}