<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class LaporanTindakanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('laporan_tindakan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('laporan_tindakan')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tanggal' => '2025-04-28 14:00:03',
            'kd_dokter' => 'D0000004',
            'nip' => '123124',
            'diagnosa_pra_tindakan' => '1212',
            'diagnosa_pasca_tindakan' => '21212',
            'tindakan_medik' => '21212',
            'uraian' => '1212',
            'hasil' => '21212',
            'kesimpulan' => '1212',
          ),
          1 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tanggal' => '2025-05-08 12:36:20',
            'kd_dokter' => 'D0000004',
            'nip' => '123124',
            'diagnosa_pra_tindakan' => '1',
            'diagnosa_pasca_tindakan' => '2',
            'tindakan_medik' => '3',
            'uraian' => '4',
            'hasil' => '5',
            'kesimpulan' => '6',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}