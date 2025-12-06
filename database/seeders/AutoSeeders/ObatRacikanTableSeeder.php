<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ObatRacikanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('obat_racikan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('obat_racikan')->insert(array (
          0 => 
          array (
            'tgl_perawatan' => '2025-05-26',
            'jam' => '10:36:43',
            'no_rawat' => '2025/05/26/000001',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 13,
            'aturan_pakai' => '2 X 1',
            'keterangan' => '-',
          ),
          1 => 
          array (
            'tgl_perawatan' => '2025-06-30',
            'jam' => '09:44:14',
            'no_rawat' => '2025/06/30/000003',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 10,
            'aturan_pakai' => '2 X 1',
            'keterangan' => 'HABISKAN',
          ),
          2 => 
          array (
            'tgl_perawatan' => '2025-07-23',
            'jam' => '14:29:51',
            'no_rawat' => '2025/07/23/000001',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 14,
            'aturan_pakai' => '3 x 1',
            'keterangan' => 'HABISKAN',
          ),
          3 => 
          array (
            'tgl_perawatan' => '2025-07-29',
            'jam' => '09:36:43',
            'no_rawat' => '2025/07/29/000001',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 14,
            'aturan_pakai' => '3 x 1',
            'keterangan' => 'HABISKAN',
          ),
          4 => 
          array (
            'tgl_perawatan' => '2025-08-04',
            'jam' => '10:11:15',
            'no_rawat' => '2025/08/04/000001',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 14,
            'aturan_pakai' => '2 X 1',
            'keterangan' => '-',
          ),
          5 => 
          array (
            'tgl_perawatan' => '2025-08-05',
            'jam' => '09:52:58',
            'no_rawat' => '2025/06/18/000001',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 16,
            'aturan_pakai' => '2 X 1',
            'keterangan' => '-',
          ),
          6 => 
          array (
            'tgl_perawatan' => '2025-08-19',
            'jam' => '10:49:18',
            'no_rawat' => '2025/08/19/000001',
            'no_racik' => '1',
            'nama_racik' => 'r1',
            'kd_racik' => 'R01',
            'jml_dr' => 20,
            'aturan_pakai' => '2 X 1',
            'keterangan' => '-',
          ),
          7 => 
          array (
            'tgl_perawatan' => '2025-08-21',
            'jam' => '14:50:47',
            'no_rawat' => '2025/08/21/000001',
            'no_racik' => '1',
            'nama_racik' => 'R1',
            'kd_racik' => 'R01',
            'jml_dr' => 12,
            'aturan_pakai' => '3 x 1',
            'keterangan' => '-',
          ),
          8 => 
          array (
            'tgl_perawatan' => '2025-08-25',
            'jam' => '13:51:18',
            'no_rawat' => '2025/08/25/000001',
            'no_racik' => '1',
            'nama_racik' => 'R BATUK',
            'kd_racik' => 'R01',
            'jml_dr' => 12,
            'aturan_pakai' => '2 X 1',
            'keterangan' => '-',
          ),
          9 => 
          array (
            'tgl_perawatan' => '2025-08-25',
            'jam' => '13:51:18',
            'no_rawat' => '2025/08/25/000001',
            'no_racik' => '2',
            'nama_racik' => 'R ANTIBIO',
            'kd_racik' => 'R01',
            'jml_dr' => 13,
            'aturan_pakai' => '3 x 1',
            'keterangan' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}