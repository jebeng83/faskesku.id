<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CatatanObservasiRanapKebidananTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('catatan_observasi_ranap_kebidanan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('catatan_observasi_ranap_kebidanan')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tgl_perawatan' => '2025-06-28',
            'jam_rawat' => '09:41:49',
            'gcs' => '1',
            'td' => '2',
            'hr' => '3',
            'rr' => '4',
            'suhu' => '5',
            'spo2' => '6',
            'kontraksi' => '7',
            'bjj' => '8',
            'ppv' => '9',
            'vt' => '9',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}