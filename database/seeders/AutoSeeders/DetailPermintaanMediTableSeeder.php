<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DetailPermintaanMediTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('detail_permintaan_medis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('detail_permintaan_medis')->insert(array (
          0 => 
          array (
            'no_permintaan' => 'PM20240608001',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          1 => 
          array (
            'no_permintaan' => 'PM20240608001',
            'kode_brng' => 'B000001780',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          2 => 
          array (
            'no_permintaan' => 'PM20240608001',
            'kode_brng' => 'B000001394',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          3 => 
          array (
            'no_permintaan' => 'PM20240610001',
            'kode_brng' => 'B000001780',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          4 => 
          array (
            'no_permintaan' => 'PM20240610001',
            'kode_brng' => 'B000001394',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          5 => 
          array (
            'no_permintaan' => 'PM20240610001',
            'kode_brng' => 'B000001314',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          6 => 
          array (
            'no_permintaan' => 'PM20240610001',
            'kode_brng' => 'B000001783',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          7 => 
          array (
            'no_permintaan' => 'PM20240611001',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          8 => 
          array (
            'no_permintaan' => 'PM20240611001',
            'kode_brng' => 'B000001809',
            'kode_sat' => 'BKS',
            'jumlah' => 3.0,
            'keterangan' => '',
          ),
          9 => 
          array (
            'no_permintaan' => 'PM20240729001',
            'kode_brng' => 'B000000575',
            'kode_sat' => 'CAP',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          10 => 
          array (
            'no_permintaan' => 'PM20240729001',
            'kode_brng' => 'B000000578',
            'kode_sat' => 'CAP',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          11 => 
          array (
            'no_permintaan' => 'PM20240729001',
            'kode_brng' => 'B000000571',
            'kode_sat' => 'TAB',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          12 => 
          array (
            'no_permintaan' => 'PM20240813001',
            'kode_brng' => 'B000001780',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          13 => 
          array (
            'no_permintaan' => 'PM20240813001',
            'kode_brng' => 'B000001394',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          14 => 
          array (
            'no_permintaan' => 'PM20240813001',
            'kode_brng' => 'B000001314',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          15 => 
          array (
            'no_permintaan' => 'PM20240813001',
            'kode_brng' => 'B000001782',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          16 => 
          array (
            'no_permintaan' => 'PM20240813002',
            'kode_brng' => 'B000001780',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          17 => 
          array (
            'no_permintaan' => 'PM20240813002',
            'kode_brng' => 'B000001781',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          18 => 
          array (
            'no_permintaan' => 'PM20240813003',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 3.0,
            'keterangan' => '',
          ),
          19 => 
          array (
            'no_permintaan' => 'PM20240813003',
            'kode_brng' => 'B000001783',
            'kode_sat' => 'PCS',
            'jumlah' => 3.0,
            'keterangan' => '',
          ),
          20 => 
          array (
            'no_permintaan' => 'PM20240813003',
            'kode_brng' => 'B000001782',
            'kode_sat' => 'PCS',
            'jumlah' => 3.0,
            'keterangan' => '',
          ),
          21 => 
          array (
            'no_permintaan' => 'PM20240911001',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          22 => 
          array (
            'no_permintaan' => 'PM20240911001',
            'kode_brng' => 'A000000001',
            'kode_sat' => 'GLN',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          23 => 
          array (
            'no_permintaan' => 'PM20240915001',
            'kode_brng' => 'B000001780',
            'kode_sat' => 'PCS',
            'jumlah' => 3.0,
            'keterangan' => '',
          ),
          24 => 
          array (
            'no_permintaan' => 'PM20240915001',
            'kode_brng' => 'B000001783',
            'kode_sat' => 'PCS',
            'jumlah' => 3.0,
            'keterangan' => '',
          ),
          25 => 
          array (
            'no_permintaan' => 'PM20240915001',
            'kode_brng' => 'B000001781',
            'kode_sat' => 'PCS',
            'jumlah' => 3.0,
            'keterangan' => '',
          ),
          26 => 
          array (
            'no_permintaan' => 'PM20240930001',
            'kode_brng' => 'B000001780',
            'kode_sat' => 'PCS',
            'jumlah' => 2.0,
            'keterangan' => '',
          ),
          27 => 
          array (
            'no_permintaan' => 'PM20240930001',
            'kode_brng' => 'B000001783',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          28 => 
          array (
            'no_permintaan' => 'PM20240930001',
            'kode_brng' => 'B000001782',
            'kode_sat' => 'PCS',
            'jumlah' => 4.0,
            'keterangan' => '',
          ),
          29 => 
          array (
            'no_permintaan' => 'PM20240930001',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          30 => 
          array (
            'no_permintaan' => 'PM20241011001',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          31 => 
          array (
            'no_permintaan' => 'PM20241011001',
            'kode_brng' => 'B000001496',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          32 => 
          array (
            'no_permintaan' => 'PM20241011001',
            'kode_brng' => 'B000001497',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          33 => 
          array (
            'no_permintaan' => 'PM20241030001',
            'kode_brng' => 'A000000102',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          34 => 
          array (
            'no_permintaan' => 'PM20241030002',
            'kode_brng' => 'B000001783',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          35 => 
          array (
            'no_permintaan' => 'PM20241031001',
            'kode_brng' => 'B000001780',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          36 => 
          array (
            'no_permintaan' => 'PM20241031001',
            'kode_brng' => 'B000001783',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          37 => 
          array (
            'no_permintaan' => 'PM20241103001',
            'kode_brng' => 'B000001314',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          38 => 
          array (
            'no_permintaan' => 'PM20241103001',
            'kode_brng' => 'B000001783',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          39 => 
          array (
            'no_permintaan' => 'PM20241103001',
            'kode_brng' => 'B000001781',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          40 => 
          array (
            'no_permintaan' => 'PM20241111001',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          41 => 
          array (
            'no_permintaan' => 'PM20241111001',
            'kode_brng' => 'B000001394',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          42 => 
          array (
            'no_permintaan' => 'PM20241111002',
            'kode_brng' => 'B000001780',
            'kode_sat' => 'PCS',
            'jumlah' => 2.0,
            'keterangan' => '',
          ),
          43 => 
          array (
            'no_permintaan' => 'PM20241111002',
            'kode_brng' => 'B000001394',
            'kode_sat' => 'PCS',
            'jumlah' => 2.0,
            'keterangan' => '',
          ),
          44 => 
          array (
            'no_permintaan' => 'PM20241111002',
            'kode_brng' => 'B000001781',
            'kode_sat' => 'PCS',
            'jumlah' => 2.0,
            'keterangan' => '',
          ),
          45 => 
          array (
            'no_permintaan' => 'PM20241121001',
            'kode_brng' => 'B000001314',
            'kode_sat' => 'PCS',
            'jumlah' => 5.0,
            'keterangan' => '',
          ),
          46 => 
          array (
            'no_permintaan' => 'PM20241121001',
            'kode_brng' => 'B000001781',
            'kode_sat' => 'PCS',
            'jumlah' => 5.0,
            'keterangan' => '',
          ),
          47 => 
          array (
            'no_permintaan' => 'PM20241126001',
            'kode_brng' => 'B000008024',
            'kode_sat' => 'GLN',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          48 => 
          array (
            'no_permintaan' => 'PM20250107001',
            'kode_brng' => 'A000000001',
            'kode_sat' => 'GLN',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          49 => 
          array (
            'no_permintaan' => 'PM20250107001',
            'kode_brng' => 'B000001809',
            'kode_sat' => 'BKS',
            'jumlah' => 5.0,
            'keterangan' => '',
          ),
          50 => 
          array (
            'no_permintaan' => 'PM20250107001',
            'kode_brng' => 'B000001780',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          51 => 
          array (
            'no_permintaan' => 'PM20250107001',
            'kode_brng' => 'B000001394',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          52 => 
          array (
            'no_permintaan' => 'PM20250107001',
            'kode_brng' => 'B000001314',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          53 => 
          array (
            'no_permintaan' => 'PM20250107002',
            'kode_brng' => 'B000001394',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          54 => 
          array (
            'no_permintaan' => 'PM20250107002',
            'kode_brng' => 'B000001314',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          55 => 
          array (
            'no_permintaan' => 'PM20250107002',
            'kode_brng' => 'B000001781',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          56 => 
          array (
            'no_permintaan' => 'PM20250107002',
            'kode_brng' => 'B000001782',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          57 => 
          array (
            'no_permintaan' => 'PM20250121001',
            'kode_brng' => 'B000001780',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          58 => 
          array (
            'no_permintaan' => 'PM20250121001',
            'kode_brng' => 'B000001394',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          59 => 
          array (
            'no_permintaan' => 'PM20250121001',
            'kode_brng' => 'B000001314',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          60 => 
          array (
            'no_permintaan' => 'PM20250121001',
            'kode_brng' => 'B000001783',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          61 => 
          array (
            'no_permintaan' => 'PM20250121001',
            'kode_brng' => 'B000001781',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          62 => 
          array (
            'no_permintaan' => 'PM20250121001',
            'kode_brng' => 'B000001782',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          63 => 
          array (
            'no_permintaan' => 'PM20250124001',
            'kode_brng' => 'B000000554',
            'kode_sat' => 'TAB',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          64 => 
          array (
            'no_permintaan' => 'PM20250124001',
            'kode_brng' => 'B000000555',
            'kode_sat' => 'AMP5',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          65 => 
          array (
            'no_permintaan' => 'PM20250211001',
            'kode_brng' => 'B000000556',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'keterangan' => '',
          ),
          66 => 
          array (
            'no_permintaan' => 'PM20250211001',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 4.0,
            'keterangan' => '',
          ),
          67 => 
          array (
            'no_permintaan' => 'PM20250326001',
            'kode_brng' => 'B000000305',
            'kode_sat' => 'TAB',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          68 => 
          array (
            'no_permintaan' => 'PM20250326001',
            'kode_brng' => 'B000000555',
            'kode_sat' => 'AMP5',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          69 => 
          array (
            'no_permintaan' => 'PM20250326001',
            'kode_brng' => 'B000000558',
            'kode_sat' => 'SAL',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          70 => 
          array (
            'no_permintaan' => 'PM20250326002',
            'kode_brng' => 'B000000553',
            'kode_sat' => 'SYR',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          71 => 
          array (
            'no_permintaan' => 'PM20250326002',
            'kode_brng' => 'B000001207',
            'kode_sat' => 'TAB',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          72 => 
          array (
            'no_permintaan' => 'PM20250326002',
            'kode_brng' => 'B000000558',
            'kode_sat' => 'SAL',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          73 => 
          array (
            'no_permintaan' => 'PM20250414002',
            'kode_brng' => 'B000001783',
            'kode_sat' => 'PCS',
            'jumlah' => 4.0,
            'keterangan' => '',
          ),
          74 => 
          array (
            'no_permintaan' => 'PM20250414002',
            'kode_brng' => 'B000001781',
            'kode_sat' => 'PCS',
            'jumlah' => 4.0,
            'keterangan' => '',
          ),
          75 => 
          array (
            'no_permintaan' => 'PM20250414002',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          76 => 
          array (
            'no_permintaan' => 'PM20250428001',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          77 => 
          array (
            'no_permintaan' => 'PM20250428001',
            'kode_brng' => 'A000000799',
            'kode_sat' => 'BOX',
            'jumlah' => 3.0,
            'keterangan' => '',
          ),
          78 => 
          array (
            'no_permintaan' => 'PM20250618001',
            'kode_brng' => 'B000000556',
            'kode_sat' => 'TAB',
            'jumlah' => 100.0,
            'keterangan' => '',
          ),
          79 => 
          array (
            'no_permintaan' => 'PM20250618001',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 4.0,
            'keterangan' => '',
          ),
          80 => 
          array (
            'no_permintaan' => 'PM20250618001',
            'kode_brng' => 'B000000157',
            'kode_sat' => 'TAB',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          81 => 
          array (
            'no_permintaan' => 'PM20250628001',
            'kode_brng' => 'B000001496',
            'kode_sat' => 'PCS',
            'jumlah' => 5.0,
            'keterangan' => '',
          ),
          82 => 
          array (
            'no_permintaan' => 'PM20250628001',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          83 => 
          array (
            'no_permintaan' => 'PM20250630001',
            'kode_brng' => 'B000001496',
            'kode_sat' => 'PCS',
            'jumlah' => 5.0,
            'keterangan' => '',
          ),
          84 => 
          array (
            'no_permintaan' => 'PM20250630001',
            'kode_brng' => 'B000001809',
            'kode_sat' => 'BKS',
            'jumlah' => 5.0,
            'keterangan' => '',
          ),
          85 => 
          array (
            'no_permintaan' => 'PM20250630001',
            'kode_brng' => 'B000001780',
            'kode_sat' => 'PCS',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          86 => 
          array (
            'no_permintaan' => 'PM20250719001',
            'kode_brng' => 'B000000556',
            'kode_sat' => 'TAB',
            'jumlah' => 20.0,
            'keterangan' => '',
          ),
          87 => 
          array (
            'no_permintaan' => 'PM20250719001',
            'kode_brng' => 'B000000557',
            'kode_sat' => 'TAB',
            'jumlah' => 20.0,
            'keterangan' => '',
          ),
          88 => 
          array (
            'no_permintaan' => 'PM20250729001',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          89 => 
          array (
            'no_permintaan' => 'PM20250729001',
            'kode_brng' => 'A000000004',
            'kode_sat' => 'GLN',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          90 => 
          array (
            'no_permintaan' => 'PM20250729001',
            'kode_brng' => 'B000001809',
            'kode_sat' => 'BKS',
            'jumlah' => 10.0,
            'keterangan' => '',
          ),
          91 => 
          array (
            'no_permintaan' => 'PM20250805001',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          92 => 
          array (
            'no_permintaan' => 'PM20250811001',
            'kode_brng' => 'B000008024',
            'kode_sat' => 'GLN',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          93 => 
          array (
            'no_permintaan' => 'PM20250811002',
            'kode_brng' => 'A000000004',
            'kode_sat' => 'GLN',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          94 => 
          array (
            'no_permintaan' => 'PM20250811002',
            'kode_brng' => 'A000000003',
            'kode_sat' => 'GLN',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          95 => 
          array (
            'no_permintaan' => 'PM20250813001',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          96 => 
          array (
            'no_permintaan' => 'PM20250813001',
            'kode_brng' => 'A000000100',
            'kode_sat' => 'PCS',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          97 => 
          array (
            'no_permintaan' => 'PM20250813001',
            'kode_brng' => 'B000001496',
            'kode_sat' => 'PCS',
            'jumlah' => 5.0,
            'keterangan' => '',
          ),
          98 => 
          array (
            'no_permintaan' => 'PM20250825001',
            'kode_brng' => 'A000000002',
            'kode_sat' => 'BTL',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          99 => 
          array (
            'no_permintaan' => 'PM20250825001',
            'kode_brng' => 'B000001809',
            'kode_sat' => 'BKS',
            'jumlah' => 2.0,
            'keterangan' => '',
          ),
          100 => 
          array (
            'no_permintaan' => 'PM20250825001',
            'kode_brng' => 'B000001780',
            'kode_sat' => 'PCS',
            'jumlah' => 2.0,
            'keterangan' => '',
          ),
          101 => 
          array (
            'no_permintaan' => 'PM20250825001',
            'kode_brng' => 'B000001783',
            'kode_sat' => 'PCS',
            'jumlah' => 2.0,
            'keterangan' => '',
          ),
          102 => 
          array (
            'no_permintaan' => 'PM20250825001',
            'kode_brng' => 'B000001496',
            'kode_sat' => 'PCS',
            'jumlah' => 2.0,
            'keterangan' => '',
          ),
          103 => 
          array (
            'no_permintaan' => 'PM20250825002',
            'kode_brng' => 'B000000553',
            'kode_sat' => 'SYR',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          104 => 
          array (
            'no_permintaan' => 'PM20250825002',
            'kode_brng' => 'B000001207',
            'kode_sat' => 'TAB',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
          105 => 
          array (
            'no_permintaan' => 'PM20250825002',
            'kode_brng' => 'B000000558',
            'kode_sat' => 'SAL',
            'jumlah' => 1.0,
            'keterangan' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}