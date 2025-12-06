<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailPiutangPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_piutang_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_piutang_pasien')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/27/000001',
            'nama_bayar' => 'PIUTANG BPJS',
            'kd_pj' => 'BPJ',
            'totalpiutang' => 776478.0,
            'sisapiutang' => 776478.0,
            'tgltempo' => '2025-06-20',
          ),
          1 => 
          array (
            'no_rawat' => '2025/04/28/000001',
            'nama_bayar' => 'PIUTANG BPJS',
            'kd_pj' => 'BPJ',
            'totalpiutang' => 349225.0,
            'sisapiutang' => 349225.0,
            'tgltempo' => '2025-04-28',
          ),
          2 => 
          array (
            'no_rawat' => '2025/05/26/000001',
            'nama_bayar' => 'PIUTANG BPJS',
            'kd_pj' => 'BPJ',
            'totalpiutang' => 1136673.0,
            'sisapiutang' => 0.0,
            'tgltempo' => '2025-05-26',
          ),
          3 => 
          array (
            'no_rawat' => '2025/05/26/000002',
            'nama_bayar' => 'PIUTANG BPJS',
            'kd_pj' => 'BPJ',
            'totalpiutang' => 109250.0,
            'sisapiutang' => 109250.0,
            'tgltempo' => '2025-05-26',
          ),
          4 => 
          array (
            'no_rawat' => '2025/06/03/000001',
            'nama_bayar' => 'PIUTANG BPJS',
            'kd_pj' => 'BPJ',
            'totalpiutang' => 204176.0,
            'sisapiutang' => 0.0,
            'tgltempo' => '2025-06-03',
          ),
          5 => 
          array (
            'no_rawat' => '2025/06/20/000001',
            'nama_bayar' => 'PIUTANG GARDA MEDIKA',
            'kd_pj' => 'A06',
            'totalpiutang' => 4135000.0,
            'sisapiutang' => 4135000.0,
            'tgltempo' => '2025-06-20',
          ),
          6 => 
          array (
            'no_rawat' => '2025/06/25/000001',
            'nama_bayar' => 'PIUTANG BPJS',
            'kd_pj' => 'BPJ',
            'totalpiutang' => 1052078.0,
            'sisapiutang' => 1052078.0,
            'tgltempo' => '2025-06-25',
          ),
          7 => 
          array (
            'no_rawat' => '2025/08/11/000001',
            'nama_bayar' => 'PIUTANG BPJS',
            'kd_pj' => 'BPJ',
            'totalpiutang' => 1973133.0,
            'sisapiutang' => 1973133.0,
            'tgltempo' => '2025-08-11',
          ),
          8 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'nama_bayar' => 'PIUTANG BPJS',
            'kd_pj' => 'BPJ',
            'totalpiutang' => 6892647.0,
            'sisapiutang' => 6892647.0,
            'tgltempo' => '2025-08-19',
          ),
          9 => 
          array (
            'no_rawat' => '2025/08/21/000001',
            'nama_bayar' => 'PIUTANG BPJS',
            'kd_pj' => 'BPJ',
            'totalpiutang' => 994759.0,
            'sisapiutang' => 994759.0,
            'tgltempo' => '2025-08-21',
          ),
          10 => 
          array (
            'no_rawat' => '2025/08/25/000001',
            'nama_bayar' => 'PIUTANG BPJS',
            'kd_pj' => 'BPJ',
            'totalpiutang' => 814433.0,
            'sisapiutang' => 814433.0,
            'tgltempo' => '2025-08-25',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}