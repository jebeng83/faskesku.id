<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PermintaanLabmbTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_labmb')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('permintaan_labmb')->insert(array (
          0 => 
          array (
            'noorder' => 'MB202508050001',
            'no_rawat' => '2025/06/18/000001',
            'tgl_permintaan' => '2025-08-05',
            'jam_permintaan' => '10:41:45',
            'tgl_sampel' => '2025-08-05',
            'jam_sampel' => '10:41:56',
            'tgl_hasil' => '2025-08-05',
            'jam_hasil' => '10:42:08',
            'dokter_perujuk' => 'D0000004',
            'status' => 'ranap',
            'informasi_tambahan' => '-',
            'diagnosa_klinis' => '-',
          ),
          1 => 
          array (
            'noorder' => 'MB202508050002',
            'no_rawat' => '2025/06/20/000002',
            'tgl_permintaan' => '2025-08-01',
            'jam_permintaan' => '10:42:39',
            'tgl_sampel' => '2025-08-05',
            'jam_sampel' => '10:43:01',
            'tgl_hasil' => '2025-08-05',
            'jam_hasil' => '12:38:23',
            'dokter_perujuk' => 'D0000004',
            'status' => 'ranap',
            'informasi_tambahan' => '-',
            'diagnosa_klinis' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}