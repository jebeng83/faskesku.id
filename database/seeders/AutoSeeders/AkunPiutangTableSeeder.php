<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AkunPiutangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('akun_piutang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('akun_piutang')->insert(array (
          0 => 
          array (
            'nama_bayar' => 'PIUTANG GARDA MEDIKA',
            'kd_rek' => '117001',
            'kd_pj' => 'A06',
          ),
          1 => 
          array (
            'nama_bayar' => 'PIUTANG UMUM RAWAT JALAN',
            'kd_rek' => '117001',
            'kd_pj' => 'A09',
          ),
          2 => 
          array (
            'nama_bayar' => 'PIUTANG UMUM RAWAT INAP',
            'kd_rek' => '117002',
            'kd_pj' => 'A09',
          ),
          3 => 
          array (
            'nama_bayar' => 'PIUTANG BPJS',
            'kd_rek' => '117003',
            'kd_pj' => 'BPJ',
          ),
          4 => 
          array (
            'nama_bayar' => 'TANGGUNGAN DINSOS',
            'kd_rek' => '117012',
            'kd_pj' => 'A23',
          ),
          5 => 
          array (
            'nama_bayar' => 'PIUTANG JASA RAHARJA',
            'kd_rek' => '117013',
            'kd_pj' => 'A24',
          ),
          6 => 
          array (
            'nama_bayar' => 'PIUTANG KAI',
            'kd_rek' => '117014',
            'kd_pj' => 'AKA',
          ),
          7 => 
          array (
            'nama_bayar' => 'PIUTANG AXA',
            'kd_rek' => '117015',
            'kd_pj' => 'A04',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}