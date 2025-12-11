<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AkunBayarTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('akun_bayar')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('akun_bayar')->insert(array (
          0 => 
          array (
            'nama_bayar' => 'Bank BCA',
            'kd_rek' => '112080',
            'ppn' => 1.0,
          ),
          1 => 
          array (
            'nama_bayar' => 'BANK DKI',
            'kd_rek' => '112070',
            'ppn' => 1.0,
          ),
          2 => 
          array (
            'nama_bayar' => 'BANK NAGARI PADANG',
            'kd_rek' => '112094',
            'ppn' => 1.0,
          ),
          3 => 
          array (
            'nama_bayar' => 'Bayar Cash',
            'kd_rek' => '111010',
            'ppn' => 0.0,
          ),
          4 => 
          array (
            'nama_bayar' => 'Bayar VIa Bank BNI',
            'kd_rek' => '112090',
            'ppn' => 0.0,
          ),
          5 => 
          array (
            'nama_bayar' => 'Bayar Via BRI',
            'kd_rek' => '112060',
            'ppn' => 0.0,
          ),
          6 => 
          array (
            'nama_bayar' => 'Bayar Via BRIVA',
            'kd_rek' => '112061',
            'ppn' => 0.0,
          ),
          7 => 
          array (
            'nama_bayar' => 'Bayar Via Debit BCa',
            'kd_rek' => '112020',
            'ppn' => 2.0,
          ),
          8 => 
          array (
            'nama_bayar' => 'Host to Host Bank BJB',
            'kd_rek' => '112093',
            'ppn' => 0.0,
          ),
          9 => 
          array (
            'nama_bayar' => 'Host to Host Bank Jateng',
            'kd_rek' => '112091',
            'ppn' => 0.0,
          ),
          10 => 
          array (
            'nama_bayar' => 'Kas Kecil',
            'kd_rek' => '111030',
            'ppn' => 0.0,
          ),
          11 => 
          array (
            'nama_bayar' => 'Titipan Uang Muka',
            'kd_rek' => '111020',
            'ppn' => 0.0,
          ),
          12 => 
          array (
            'nama_bayar' => 'Transfer Mandiri',
            'kd_rek' => '112010',
            'ppn' => 0.0,
          ),
          13 => 
          array (
            'nama_bayar' => 'Transfer Mandiri Via EDC',
            'kd_rek' => '112010',
            'ppn' => 0.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}