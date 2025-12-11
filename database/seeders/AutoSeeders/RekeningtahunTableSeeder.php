<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RekeningtahunTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('rekeningtahun')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('rekeningtahun')->insert(array (
          0 => 
          array (
            'thn' => '2022',
            'kd_rek' => '111010',
            'saldo_awal' => 0.0,
          ),
          1 => 
          array (
            'thn' => '2022',
            'kd_rek' => '111020',
            'saldo_awal' => 0.0,
          ),
          2 => 
          array (
            'thn' => '2022',
            'kd_rek' => '111031',
            'saldo_awal' => 0.0,
          ),
          3 => 
          array (
            'thn' => '2022',
            'kd_rek' => '112010',
            'saldo_awal' => 0.0,
          ),
          4 => 
          array (
            'thn' => '2022',
            'kd_rek' => '112061',
            'saldo_awal' => 0.0,
          ),
          5 => 
          array (
            'thn' => '2022',
            'kd_rek' => '112080',
            'saldo_awal' => 0.0,
          ),
          6 => 
          array (
            'thn' => '2022',
            'kd_rek' => '112091',
            'saldo_awal' => 0.0,
          ),
          7 => 
          array (
            'thn' => '2022',
            'kd_rek' => '112092',
            'saldo_awal' => 0.0,
          ),
          8 => 
          array (
            'thn' => '2022',
            'kd_rek' => '112093',
            'saldo_awal' => 0.0,
          ),
          9 => 
          array (
            'thn' => '2022',
            'kd_rek' => '115020',
            'saldo_awal' => 0.0,
          ),
          10 => 
          array (
            'thn' => '2022',
            'kd_rek' => '116011',
            'saldo_awal' => 0.0,
          ),
          11 => 
          array (
            'thn' => '2022',
            'kd_rek' => '117012',
            'saldo_awal' => 0.0,
          ),
          12 => 
          array (
            'thn' => '2022',
            'kd_rek' => '123105',
            'saldo_awal' => 0.0,
          ),
          13 => 
          array (
            'thn' => '2022',
            'kd_rek' => '211010',
            'saldo_awal' => 0.0,
          ),
          14 => 
          array (
            'thn' => '2022',
            'kd_rek' => '211133',
            'saldo_awal' => 0.0,
          ),
          15 => 
          array (
            'thn' => '2022',
            'kd_rek' => '211214',
            'saldo_awal' => 0.0,
          ),
          16 => 
          array (
            'thn' => '2022',
            'kd_rek' => '420100',
            'saldo_awal' => 0.0,
          ),
          17 => 
          array (
            'thn' => '2022',
            'kd_rek' => '420106',
            'saldo_awal' => 0.0,
          ),
          18 => 
          array (
            'thn' => '2022',
            'kd_rek' => '430109',
            'saldo_awal' => 0.0,
          ),
          19 => 
          array (
            'thn' => '2022',
            'kd_rek' => '520309',
            'saldo_awal' => 0.0,
          ),
          20 => 
          array (
            'thn' => '2022',
            'kd_rek' => '530109',
            'saldo_awal' => 0.0,
          ),
          21 => 
          array (
            'thn' => '2023',
            'kd_rek' => '111010',
            'saldo_awal' => 0.0,
          ),
          22 => 
          array (
            'thn' => '2023',
            'kd_rek' => '111020',
            'saldo_awal' => 0.0,
          ),
          23 => 
          array (
            'thn' => '2023',
            'kd_rek' => '112010',
            'saldo_awal' => 0.0,
          ),
          24 => 
          array (
            'thn' => '2023',
            'kd_rek' => '112091',
            'saldo_awal' => 0.0,
          ),
          25 => 
          array (
            'thn' => '2023',
            'kd_rek' => '115010',
            'saldo_awal' => 0.0,
          ),
          26 => 
          array (
            'thn' => '2023',
            'kd_rek' => '116050',
            'saldo_awal' => 0.0,
          ),
          27 => 
          array (
            'thn' => '2023',
            'kd_rek' => '117003',
            'saldo_awal' => 0.0,
          ),
          28 => 
          array (
            'thn' => '2023',
            'kd_rek' => '211010',
            'saldo_awal' => 0.0,
          ),
          29 => 
          array (
            'thn' => '2023',
            'kd_rek' => '420109',
            'saldo_awal' => 0.0,
          ),
          30 => 
          array (
            'thn' => '2023',
            'kd_rek' => '430100',
            'saldo_awal' => 0.0,
          ),
          31 => 
          array (
            'thn' => '2023',
            'kd_rek' => '430112',
            'saldo_awal' => 0.0,
          ),
          32 => 
          array (
            'thn' => '2023',
            'kd_rek' => '520201',
            'saldo_awal' => 0.0,
          ),
          33 => 
          array (
            'thn' => '2023',
            'kd_rek' => '530107',
            'saldo_awal' => 0.0,
          ),
          34 => 
          array (
            'thn' => '2023',
            'kd_rek' => '540103',
            'saldo_awal' => 0.0,
          ),
          35 => 
          array (
            'thn' => '2023',
            'kd_rek' => '570102',
            'saldo_awal' => 0.0,
          ),
          36 => 
          array (
            'thn' => '2024',
            'kd_rek' => '111010',
            'saldo_awal' => 0.0,
          ),
          37 => 
          array (
            'thn' => '2024',
            'kd_rek' => '111020',
            'saldo_awal' => 0.0,
          ),
          38 => 
          array (
            'thn' => '2024',
            'kd_rek' => '112010',
            'saldo_awal' => 0.0,
          ),
          39 => 
          array (
            'thn' => '2024',
            'kd_rek' => '112020',
            'saldo_awal' => 0.0,
          ),
          40 => 
          array (
            'thn' => '2024',
            'kd_rek' => '112030',
            'saldo_awal' => 0.0,
          ),
          41 => 
          array (
            'thn' => '2024',
            'kd_rek' => '112040',
            'saldo_awal' => 0.0,
          ),
          42 => 
          array (
            'thn' => '2024',
            'kd_rek' => '112050',
            'saldo_awal' => 0.0,
          ),
          43 => 
          array (
            'thn' => '2024',
            'kd_rek' => '112094',
            'saldo_awal' => 0.0,
          ),
          44 => 
          array (
            'thn' => '2024',
            'kd_rek' => '115070',
            'saldo_awal' => 0.0,
          ),
          45 => 
          array (
            'thn' => '2024',
            'kd_rek' => '117004',
            'saldo_awal' => 0.0,
          ),
          46 => 
          array (
            'thn' => '2024',
            'kd_rek' => '117013',
            'saldo_awal' => 0.0,
          ),
          47 => 
          array (
            'thn' => '2024',
            'kd_rek' => '117014',
            'saldo_awal' => 0.0,
          ),
          48 => 
          array (
            'thn' => '2024',
            'kd_rek' => '117015',
            'saldo_awal' => 0.0,
          ),
          49 => 
          array (
            'thn' => '2024',
            'kd_rek' => '123104',
            'saldo_awal' => 0.0,
          ),
          50 => 
          array (
            'thn' => '2024',
            'kd_rek' => '211219',
            'saldo_awal' => 0.0,
          ),
          51 => 
          array (
            'thn' => '2024',
            'kd_rek' => '410105',
            'saldo_awal' => 0.0,
          ),
          52 => 
          array (
            'thn' => '2024',
            'kd_rek' => '420100',
            'saldo_awal' => 0.0,
          ),
          53 => 
          array (
            'thn' => '2024',
            'kd_rek' => '430102',
            'saldo_awal' => 0.0,
          ),
          54 => 
          array (
            'thn' => '2024',
            'kd_rek' => '430108',
            'saldo_awal' => 0.0,
          ),
          55 => 
          array (
            'thn' => '2024',
            'kd_rek' => '430109',
            'saldo_awal' => 0.0,
          ),
          56 => 
          array (
            'thn' => '2024',
            'kd_rek' => '430113',
            'saldo_awal' => 0.0,
          ),
          57 => 
          array (
            'thn' => '2024',
            'kd_rek' => '520207',
            'saldo_awal' => 0.0,
          ),
          58 => 
          array (
            'thn' => '2024',
            'kd_rek' => '530105',
            'saldo_awal' => 0.0,
          ),
          59 => 
          array (
            'thn' => '2024',
            'kd_rek' => '530107',
            'saldo_awal' => 0.0,
          ),
          60 => 
          array (
            'thn' => '2024',
            'kd_rek' => '530111',
            'saldo_awal' => 0.0,
          ),
          61 => 
          array (
            'thn' => '2024',
            'kd_rek' => '530114',
            'saldo_awal' => 0.0,
          ),
          62 => 
          array (
            'thn' => '2024',
            'kd_rek' => '57',
            'saldo_awal' => 0.0,
          ),
          63 => 
          array (
            'thn' => '2025',
            'kd_rek' => '112080',
            'saldo_awal' => 0.0,
          ),
          64 => 
          array (
            'thn' => '2025',
            'kd_rek' => '115010',
            'saldo_awal' => 0.0,
          ),
          65 => 
          array (
            'thn' => '2025',
            'kd_rek' => '117009',
            'saldo_awal' => 0.0,
          ),
          66 => 
          array (
            'thn' => '2025',
            'kd_rek' => '117017',
            'saldo_awal' => 0.0,
          ),
          67 => 
          array (
            'thn' => '2025',
            'kd_rek' => '2110',
            'saldo_awal' => 0.0,
          ),
          68 => 
          array (
            'thn' => '2025',
            'kd_rek' => '211010',
            'saldo_awal' => 0.0,
          ),
          69 => 
          array (
            'thn' => '2025',
            'kd_rek' => '211120',
            'saldo_awal' => 0.0,
          ),
          70 => 
          array (
            'thn' => '2025',
            'kd_rek' => '211140',
            'saldo_awal' => 0.0,
          ),
          71 => 
          array (
            'thn' => '2025',
            'kd_rek' => '211220',
            'saldo_awal' => 0.0,
          ),
          72 => 
          array (
            'thn' => '2025',
            'kd_rek' => '310000',
            'saldo_awal' => 0.0,
          ),
          73 => 
          array (
            'thn' => '2025',
            'kd_rek' => '420100',
            'saldo_awal' => 0.0,
          ),
          74 => 
          array (
            'thn' => '2025',
            'kd_rek' => '430101',
            'saldo_awal' => 0.0,
          ),
          75 => 
          array (
            'thn' => '2025',
            'kd_rek' => '430109',
            'saldo_awal' => 0.0,
          ),
          76 => 
          array (
            'thn' => '2025',
            'kd_rek' => '430114',
            'saldo_awal' => 0.0,
          ),
          77 => 
          array (
            'thn' => '2025',
            'kd_rek' => '520305',
            'saldo_awal' => 0.0,
          ),
          78 => 
          array (
            'thn' => '2025',
            'kd_rek' => '530108',
            'saldo_awal' => 0.0,
          ),
          79 => 
          array (
            'thn' => '2025',
            'kd_rek' => '530115',
            'saldo_awal' => 0.0,
          ),
          80 => 
          array (
            'thn' => '2025',
            'kd_rek' => '211211',
            'saldo_awal' => 1000000.0,
          ),
          81 => 
          array (
            'thn' => '2025',
            'kd_rek' => '111010',
            'saldo_awal' => 7034898.0,
          ),
          82 => 
          array (
            'thn' => '2025',
            'kd_rek' => '117004',
            'saldo_awal' => 12000000.0,
          ),
          83 => 
          array (
            'thn' => '2023',
            'kd_rek' => '540101',
            'saldo_awal' => 20000000.0,
          ),
          84 => 
          array (
            'thn' => '2025',
            'kd_rek' => '111020',
            'saldo_awal' => 50000000.0,
          ),
          85 => 
          array (
            'thn' => '2023',
            'kd_rek' => '410105',
            'saldo_awal' => 100000000.0,
          ),
          86 => 
          array (
            'thn' => '2024',
            'kd_rek' => '211020',
            'saldo_awal' => 200000000.0,
          ),
          87 => 
          array (
            'thn' => '2025',
            'kd_rek' => '510301',
            'saldo_awal' => 200000000.0,
          ),
          88 => 
          array (
            'thn' => '2025',
            'kd_rek' => '112010',
            'saldo_awal' => 17000000000.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}