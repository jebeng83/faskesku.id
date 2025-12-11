<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CatatanObservasiIgdTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('catatan_observasi_igd')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('catatan_observasi_igd')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/18/000002',
            'tgl_perawatan' => '2025-06-18',
            'jam_rawat' => '12:59:41',
            'gcs' => '-',
            'td' => '-',
            'hr' => '-',
            'rr' => '-',
            'suhu' => '-',
            'spo2' => '-',
            'nip' => '123124',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'tgl_perawatan' => '2025-06-30',
            'jam_rawat' => '09:00:03',
            'gcs' => '15',
            'td' => '150/100',
            'hr' => '0',
            'rr' => '0',
            'suhu' => '0',
            'spo2' => '0',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}