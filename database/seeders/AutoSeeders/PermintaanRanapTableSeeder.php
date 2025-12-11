<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PermintaanRanapTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_ranap')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_ranap')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/05/26/000003',
            'tanggal' => '2025-05-26',
            'kd_kamar' => 'K3.01',
            'diagnosa' => 'jantung',
            'catatan' => 'tes',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'tanggal' => '2025-06-18',
            'kd_kamar' => 'K3.01',
            'diagnosa' => 'A02 - Other salmonella infections',
            'catatan' => 'tes',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/23/000001',
            'tanggal' => '2025-06-23',
            'kd_kamar' => 'K3.01',
            'diagnosa' => 'A01.1 - Paratyphoid fever A',
            'catatan' => '-',
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tanggal' => '2025-06-28',
            'kd_kamar' => 'K3.01',
            'diagnosa' => 'A02.1 - Salmonella sepsis',
            'catatan' => 'kamar bebas',
          ),
          4 => 
          array (
            'no_rawat' => '2025/06/30/000001',
            'tanggal' => '2025-06-30',
            'kd_kamar' => 'K3.01',
            'diagnosa' => 'A02 - Other salmonella infections',
            'catatan' => 'KAMAR BEBAS',
          ),
          5 => 
          array (
            'no_rawat' => '2025/07/07/000001',
            'tanggal' => '2025-07-07',
            'kd_kamar' => 'K1.01',
            'diagnosa' => '-',
            'catatan' => '-',
          ),
          6 => 
          array (
            'no_rawat' => '2025/07/29/000002',
            'tanggal' => '2025-07-29',
            'kd_kamar' => 'K1.01',
            'diagnosa' => 'jantung',
            'catatan' => '-',
          ),
          7 => 
          array (
            'no_rawat' => '2025/08/11/000001',
            'tanggal' => '2025-08-11',
            'kd_kamar' => 'K1.01',
            'diagnosa' => 'jantung',
            'catatan' => '-',
          ),
          8 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'tanggal' => '2025-08-19',
            'kd_kamar' => 'K3.01',
            'diagnosa' => 'jantung',
            'catatan' => '-',
          ),
          9 => 
          array (
            'no_rawat' => '2025/08/25/000001',
            'tanggal' => '2025-08-25',
            'kd_kamar' => 'K1.01',
            'diagnosa' => 'A01.3 - Paratyphoid fever C',
            'catatan' => '121212',
          ),
          10 => 
          array (
            'no_rawat' => '2025/08/26/000001',
            'tanggal' => '2025-08-26',
            'kd_kamar' => 'K3.01',
            'diagnosa' => '-',
            'catatan' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}