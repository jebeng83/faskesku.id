<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KonselingFarmasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('konseling_farmasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('konseling_farmasi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/05/26/000001',
            'tanggal' => '2025-05-26 10:35:48',
            'diagnosa' => 'TES',
            'obat_pemakaian' => 'TES',
            'riwayat_alergi' => '-',
            'keluhan' => 'TES',
            'pernah_datang' => 'Tidak',
            'tindak_lanjut' => '-',
            'nip' => '123124',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'tanggal' => '2025-06-30 09:46:20',
            'diagnosa' => '-',
            'obat_pemakaian' => 'tes',
            'riwayat_alergi' => '-',
            'keluhan' => '-',
            'pernah_datang' => 'Tidak',
            'tindak_lanjut' => '-',
            'nip' => '123124',
          ),
          2 => 
          array (
            'no_rawat' => '2025/07/23/000001',
            'tanggal' => '2025-07-23 14:31:07',
            'diagnosa' => '1212',
            'obat_pemakaian' => '1212',
            'riwayat_alergi' => '212',
            'keluhan' => '1212',
            'pernah_datang' => 'Tidak',
            'tindak_lanjut' => '12',
            'nip' => '12/09/1988/001',
          ),
          3 => 
          array (
            'no_rawat' => '2025/07/29/000001',
            'tanggal' => '2025-07-29 09:39:09',
            'diagnosa' => '1212',
            'obat_pemakaian' => '1212',
            'riwayat_alergi' => '1212',
            'keluhan' => '1212',
            'pernah_datang' => 'Tidak',
            'tindak_lanjut' => '1212',
            'nip' => '12/09/1988/001',
          ),
          4 => 
          array (
            'no_rawat' => '2025/08/11/000001',
            'tanggal' => '2025-08-11 14:25:23',
            'diagnosa' => 'qwqw',
            'obat_pemakaian' => 'wqw',
            'riwayat_alergi' => 'wqwq',
            'keluhan' => 'wqwqw',
            'pernah_datang' => 'Tidak',
            'tindak_lanjut' => 'qwqw',
            'nip' => '123124',
          ),
          5 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'tanggal' => '2025-08-19 10:46:50',
            'diagnosa' => '-',
            'obat_pemakaian' => '-',
            'riwayat_alergi' => '-',
            'keluhan' => '-',
            'pernah_datang' => 'Tidak',
            'tindak_lanjut' => '-',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}