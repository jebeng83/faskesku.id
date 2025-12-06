<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RujukTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('rujuk')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('rujuk')->insert(array (
          0 => 
          array (
            'no_rujuk' => 'R000000001',
            'no_rawat' => '2025/06/09/000001',
            'rujuk_ke' => '1212',
            'tgl_rujuk' => '2025-06-09',
            'keterangan_diagnosa' => 'i50',
            'kd_dokter' => 'D0000004',
            'kat_rujuk' => '-',
            'ambulance' => '-',
            'keterangan' => '-',
            'jam' => '14:08:03',
          ),
          1 => 
          array (
            'no_rujuk' => 'R000000002',
            'no_rawat' => '2025/06/18/000002',
            'rujuk_ke' => '-',
            'tgl_rujuk' => '2025-06-18',
            'keterangan_diagnosa' => 'jantung',
            'kd_dokter' => 'D0000004',
            'kat_rujuk' => '-',
            'ambulance' => '-',
            'keterangan' => '-',
            'jam' => '13:04:49',
          ),
          2 => 
          array (
            'no_rujuk' => 'R000000003',
            'no_rawat' => '2025/06/20/000001',
            'rujuk_ke' => 'TES',
            'tgl_rujuk' => '2025-06-20',
            'keterangan_diagnosa' => 'TES',
            'kd_dokter' => 'D0000004',
            'kat_rujuk' => '-',
            'ambulance' => '-',
            'keterangan' => '-',
            'jam' => '14:53:53',
          ),
          3 => 
          array (
            'no_rujuk' => 'R000000004',
            'no_rawat' => '2025/06/18/000001',
            'rujuk_ke' => 'RSUD DORIS',
            'tgl_rujuk' => '2025-06-30',
            'keterangan_diagnosa' => 'JANTUNG',
            'kd_dokter' => 'D0000004',
            'kat_rujuk' => 'Kebidanan',
            'ambulance' => 'SENDIRI',
            'keterangan' => '-',
            'jam' => '11:53:50',
          ),
          4 => 
          array (
            'no_rujuk' => 'R000000005',
            'no_rawat' => '2025/07/16/000001',
            'rujuk_ke' => '-',
            'tgl_rujuk' => '2025-08-05',
            'keterangan_diagnosa' => '-',
            'kd_dokter' => 'D0000004',
            'kat_rujuk' => '-',
            'ambulance' => '-',
            'keterangan' => 'tes',
            'jam' => '11:40:27',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}