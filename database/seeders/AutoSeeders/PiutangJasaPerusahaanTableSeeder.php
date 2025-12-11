<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PiutangJasaPerusahaanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('piutang_jasa_perusahaan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('piutang_jasa_perusahaan')->insert(array (
          0 => 
          array (
            'no_piutang' => 'PJP250522001',
            'tgl_piutang' => '2025-05-22',
            'jatuh_tempo' => '2025-05-22',
            'nip' => '123124',
            'kode_perusahaan' => 'I0002',
            'keterangan' => 'INHOUSE CLINIC',
            'grand_total' => 8400000.0,
            'persen_jasa_menejemen' => 10.0,
            'jasa_menejemen' => 840000.0,
            'dpp_lain' => 1000000.0,
            'persen_ppn' => 12.0,
            'ppn' => 1008000.0,
            'persen_pph' => 2.0,
            'pph' => 168000.0,
            'totalpiutang' => 11416000.0,
            'sisapiutang' => 1000000.0,
            'status' => 'Belum Lunas',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}