<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AkunPenagihanPiutangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('akun_penagihan_piutang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('akun_penagihan_piutang')->insert(array (
          0 => 
          array (
            'kd_rek' => '112020',
            'nama_bank' => 'BANK BCA CABANG PANGKALAN BUN',
            'atas_nama' => 'WINDIARTO NUGROHO',
            'no_rek' => '1015369872',
          ),
          1 => 
          array (
            'kd_rek' => '112060',
            'nama_bank' => 'BANK BRI SYARIAH, KC BANTUL',
            'atas_nama' => 'WINDIARTO NUGROHO',
            'no_rek' => '1015369872',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}