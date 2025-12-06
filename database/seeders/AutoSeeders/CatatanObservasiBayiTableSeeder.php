<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CatatanObservasiBayiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('catatan_observasi_bayi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('catatan_observasi_bayi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tgl_perawatan' => '2025-05-05',
            'jam_rawat' => '12:49:22',
            'gcs' => '1',
            'td' => '2',
            'hr' => '3',
            'rr' => '4',
            'suhu' => '5',
            'spo2' => '6',
            'nch' => '7',
            'ikterik_status' => '8',
            'retraksi_dada' => '9',
            'ogt_residu' => '10',
            'asi_jumlah' => '11',
            'pasi_jumlah' => '12',
            'bak_status' => '13',
            'bab_status' => '14 asas',
            'nip' => '123124',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tgl_perawatan' => '2025-06-28',
            'jam_rawat' => '09:43:31',
            'gcs' => '1',
            'td' => '2',
            'hr' => '3',
            'rr' => '4',
            'suhu' => '5',
            'spo2' => '6',
            'nch' => '2',
            'ikterik_status' => '2',
            'retraksi_dada' => '2',
            'ogt_residu' => '2',
            'asi_jumlah' => '2',
            'pasi_jumlah' => '2',
            'bak_status' => '2',
            'bab_status' => '2',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}