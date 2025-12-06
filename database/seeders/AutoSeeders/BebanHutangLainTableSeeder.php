<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BebanHutangLainTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('beban_hutang_lain')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('beban_hutang_lain')->insert(array (
          0 => 
          array (
            'no_hutang' => 'BHL202506300001',
            'tgl_hutang' => '2025-06-30',
            'nip' => '123124',
            'kode_pemberi_hutang' => 'PH002',
            'kd_rek' => '520305',
            'keterangan' => 'tes',
            'tgltempo' => '2025-06-30',
            'nominal' => 1000000.0,
            'sisahutang' => 1000000.0,
            'status' => 'Belum Lunas',
          ),
          1 => 
          array (
            'no_hutang' => 'BHL202507050001',
            'tgl_hutang' => '2025-07-05',
            'nip' => '156798',
            'kode_pemberi_hutang' => 'PH002',
            'kd_rek' => '520305',
            'keterangan' => '-',
            'tgltempo' => '2025-07-05',
            'nominal' => 5000000.0,
            'sisahutang' => 4000000.0,
            'status' => 'Belum Lunas',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}