<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PiutangPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('piutang_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('piutang_pasien')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/27/000001',
            'tgl_piutang' => '2025-06-20',
            'no_rkm_medis' => '000022',
            'status' => 'Belum Lunas',
            'totalpiutang' => 776478.0,
            'uangmuka' => 0.0,
            'sisapiutang' => 776478.0,
            'tgltempo' => '2025-06-20',
          ),
          1 => 
          array (
            'no_rawat' => '2025/04/28/000001',
            'tgl_piutang' => '2025-04-28',
            'no_rkm_medis' => '000006',
            'status' => 'Belum Lunas',
            'totalpiutang' => 349225.0,
            'uangmuka' => 0.0,
            'sisapiutang' => 349225.0,
            'tgltempo' => '2025-04-28',
          ),
          2 => 
          array (
            'no_rawat' => '2025/05/26/000001',
            'tgl_piutang' => '2025-05-26',
            'no_rkm_medis' => '000022',
            'status' => 'Lunas',
            'totalpiutang' => 1136673.0,
            'uangmuka' => 0.0,
            'sisapiutang' => 1136673.0,
            'tgltempo' => '2025-05-26',
          ),
          3 => 
          array (
            'no_rawat' => '2025/05/26/000002',
            'tgl_piutang' => '2025-05-26',
            'no_rkm_medis' => '000006',
            'status' => 'Belum Lunas',
            'totalpiutang' => 109250.0,
            'uangmuka' => 0.0,
            'sisapiutang' => 109250.0,
            'tgltempo' => '2025-05-26',
          ),
          4 => 
          array (
            'no_rawat' => '2025/06/03/000001',
            'tgl_piutang' => '2025-06-03',
            'no_rkm_medis' => '000006',
            'status' => 'Lunas',
            'totalpiutang' => 204176.0,
            'uangmuka' => 0.0,
            'sisapiutang' => 204176.0,
            'tgltempo' => '2025-06-03',
          ),
          5 => 
          array (
            'no_rawat' => '2025/06/20/000001',
            'tgl_piutang' => '2025-06-20',
            'no_rkm_medis' => '000048',
            'status' => 'Belum Lunas',
            'totalpiutang' => 4135000.0,
            'uangmuka' => 0.0,
            'sisapiutang' => 4135000.0,
            'tgltempo' => '2025-06-20',
          ),
          6 => 
          array (
            'no_rawat' => '2025/06/25/000001',
            'tgl_piutang' => '2025-06-25',
            'no_rkm_medis' => '000011',
            'status' => 'Belum Lunas',
            'totalpiutang' => 1052078.0,
            'uangmuka' => 0.0,
            'sisapiutang' => 1052078.0,
            'tgltempo' => '2025-06-25',
          ),
          7 => 
          array (
            'no_rawat' => '2025/08/11/000001',
            'tgl_piutang' => '2025-08-11',
            'no_rkm_medis' => '000011',
            'status' => 'Belum Lunas',
            'totalpiutang' => 1973133.0,
            'uangmuka' => 0.0,
            'sisapiutang' => 1973133.0,
            'tgltempo' => '2025-08-11',
          ),
          8 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'tgl_piutang' => '2025-08-19',
            'no_rkm_medis' => '000022',
            'status' => 'Belum Lunas',
            'totalpiutang' => 6892647.0,
            'uangmuka' => 0.0,
            'sisapiutang' => 6892647.0,
            'tgltempo' => '2025-08-19',
          ),
          9 => 
          array (
            'no_rawat' => '2025/08/21/000001',
            'tgl_piutang' => '2025-08-21',
            'no_rkm_medis' => '000022',
            'status' => 'Belum Lunas',
            'totalpiutang' => 994759.0,
            'uangmuka' => 0.0,
            'sisapiutang' => 994759.0,
            'tgltempo' => '2025-08-21',
          ),
          10 => 
          array (
            'no_rawat' => '2025/08/25/000001',
            'tgl_piutang' => '2025-08-25',
            'no_rkm_medis' => '000022',
            'status' => 'Belum Lunas',
            'totalpiutang' => 814433.0,
            'uangmuka' => 0.0,
            'sisapiutang' => 814433.0,
            'tgltempo' => '2025-08-25',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}