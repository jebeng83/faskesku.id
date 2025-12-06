<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class GudangbarangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('gudangbarang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('gudangbarang')->insert(array (
          0 => 
          array (
            'kode_brng' => '2018001',
            'kd_bangsal' => 'IGD',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          1 => 
          array (
            'kode_brng' => '2018003',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '123',
            'no_faktur' => 'HO20191227001',
          ),
          2 => 
          array (
            'kode_brng' => 'A000000005',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          3 => 
          array (
            'kode_brng' => 'A000000006',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          4 => 
          array (
            'kode_brng' => 'A000000007',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          5 => 
          array (
            'kode_brng' => 'A000000008',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          6 => 
          array (
            'kode_brng' => 'A000000009',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          7 => 
          array (
            'kode_brng' => 'A000000010',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          8 => 
          array (
            'kode_brng' => 'A000000011',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          9 => 
          array (
            'kode_brng' => 'A000000012',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          10 => 
          array (
            'kode_brng' => 'A000000013',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          11 => 
          array (
            'kode_brng' => 'A000000014',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          12 => 
          array (
            'kode_brng' => 'A000000015',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          13 => 
          array (
            'kode_brng' => 'A000000016',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          14 => 
          array (
            'kode_brng' => 'A000000017',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          15 => 
          array (
            'kode_brng' => 'A000000018',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          16 => 
          array (
            'kode_brng' => 'A000000019',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          17 => 
          array (
            'kode_brng' => 'A000000020',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          18 => 
          array (
            'kode_brng' => 'A000000021',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          19 => 
          array (
            'kode_brng' => 'A000000022',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          20 => 
          array (
            'kode_brng' => 'A000000023',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          21 => 
          array (
            'kode_brng' => 'A000000024',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          22 => 
          array (
            'kode_brng' => 'A000000025',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          23 => 
          array (
            'kode_brng' => 'A000000026',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          24 => 
          array (
            'kode_brng' => 'A000000027',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          25 => 
          array (
            'kode_brng' => 'A000000028',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          26 => 
          array (
            'kode_brng' => 'A000000029',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          27 => 
          array (
            'kode_brng' => 'A000000030',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          28 => 
          array (
            'kode_brng' => 'A000000033',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          29 => 
          array (
            'kode_brng' => 'A000000034',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          30 => 
          array (
            'kode_brng' => 'A000000035',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          31 => 
          array (
            'kode_brng' => 'A000000036',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          32 => 
          array (
            'kode_brng' => 'A000000037',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          33 => 
          array (
            'kode_brng' => 'A000000038',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          34 => 
          array (
            'kode_brng' => 'A000000039',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          35 => 
          array (
            'kode_brng' => 'A000000040',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          36 => 
          array (
            'kode_brng' => 'A000000044',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          37 => 
          array (
            'kode_brng' => 'A000000045',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          38 => 
          array (
            'kode_brng' => 'A000000046',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          39 => 
          array (
            'kode_brng' => 'A000000047',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          40 => 
          array (
            'kode_brng' => 'A000000048',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          41 => 
          array (
            'kode_brng' => 'A000000049',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          42 => 
          array (
            'kode_brng' => 'A000000050',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          43 => 
          array (
            'kode_brng' => 'A000000051',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          44 => 
          array (
            'kode_brng' => 'A000000052',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          45 => 
          array (
            'kode_brng' => 'A000000054',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          46 => 
          array (
            'kode_brng' => 'A000000055',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          47 => 
          array (
            'kode_brng' => 'A000000056',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          48 => 
          array (
            'kode_brng' => 'A000000057',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          49 => 
          array (
            'kode_brng' => 'A000000058',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          50 => 
          array (
            'kode_brng' => 'A000000059',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          51 => 
          array (
            'kode_brng' => 'A000000060',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          52 => 
          array (
            'kode_brng' => 'A000000061',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          53 => 
          array (
            'kode_brng' => 'A000000062',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          54 => 
          array (
            'kode_brng' => 'A000000063',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          55 => 
          array (
            'kode_brng' => 'A000000064',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          56 => 
          array (
            'kode_brng' => 'A000000065',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          57 => 
          array (
            'kode_brng' => 'A000000066',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          58 => 
          array (
            'kode_brng' => 'A000000067',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          59 => 
          array (
            'kode_brng' => 'A000000068',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          60 => 
          array (
            'kode_brng' => 'A000000069',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          61 => 
          array (
            'kode_brng' => 'A000000070',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          62 => 
          array (
            'kode_brng' => 'A000000071',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          63 => 
          array (
            'kode_brng' => 'A000000072',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          64 => 
          array (
            'kode_brng' => 'A000000073',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          65 => 
          array (
            'kode_brng' => 'A000000074',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          66 => 
          array (
            'kode_brng' => 'A000000075',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          67 => 
          array (
            'kode_brng' => 'A000000076',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          68 => 
          array (
            'kode_brng' => 'A000000077',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          69 => 
          array (
            'kode_brng' => 'A000000078',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          70 => 
          array (
            'kode_brng' => 'A000000079',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          71 => 
          array (
            'kode_brng' => 'A000000080',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          72 => 
          array (
            'kode_brng' => 'A000000081',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          73 => 
          array (
            'kode_brng' => 'A000000085',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          74 => 
          array (
            'kode_brng' => 'A000000087',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          75 => 
          array (
            'kode_brng' => 'A000000088',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          76 => 
          array (
            'kode_brng' => 'A000000089',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          77 => 
          array (
            'kode_brng' => 'A000000090',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          78 => 
          array (
            'kode_brng' => 'A000000091',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          79 => 
          array (
            'kode_brng' => 'A000000092',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          80 => 
          array (
            'kode_brng' => 'A000000093',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          81 => 
          array (
            'kode_brng' => 'A000000094',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          82 => 
          array (
            'kode_brng' => 'A000000095',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          83 => 
          array (
            'kode_brng' => 'A000000096',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          84 => 
          array (
            'kode_brng' => 'A000000097',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          85 => 
          array (
            'kode_brng' => 'A000000098',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          86 => 
          array (
            'kode_brng' => 'A000000099',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          87 => 
          array (
            'kode_brng' => 'A000000100',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          88 => 
          array (
            'kode_brng' => 'A000000101',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          89 => 
          array (
            'kode_brng' => 'A000000103',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          90 => 
          array (
            'kode_brng' => 'A000000105',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          91 => 
          array (
            'kode_brng' => 'A000000106',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          92 => 
          array (
            'kode_brng' => 'A000000107',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          93 => 
          array (
            'kode_brng' => 'A000000108',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          94 => 
          array (
            'kode_brng' => 'A000000109',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          95 => 
          array (
            'kode_brng' => 'A000000110',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          96 => 
          array (
            'kode_brng' => 'A000000111',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          97 => 
          array (
            'kode_brng' => 'A000000112',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          98 => 
          array (
            'kode_brng' => 'A000000113',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          99 => 
          array (
            'kode_brng' => 'A000000114',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          100 => 
          array (
            'kode_brng' => 'A000000115',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          101 => 
          array (
            'kode_brng' => 'A000000117',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          102 => 
          array (
            'kode_brng' => 'A000000118',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          103 => 
          array (
            'kode_brng' => 'A000000119',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          104 => 
          array (
            'kode_brng' => 'A000000120',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          105 => 
          array (
            'kode_brng' => 'A000000124',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          106 => 
          array (
            'kode_brng' => 'A000000125',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          107 => 
          array (
            'kode_brng' => 'A000000780',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          108 => 
          array (
            'kode_brng' => 'A000000788',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          109 => 
          array (
            'kode_brng' => 'A000000789',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          110 => 
          array (
            'kode_brng' => 'A000000791',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          111 => 
          array (
            'kode_brng' => 'A000000792',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          112 => 
          array (
            'kode_brng' => 'A000000794',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          113 => 
          array (
            'kode_brng' => 'A000000795',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          114 => 
          array (
            'kode_brng' => 'A000000796',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          115 => 
          array (
            'kode_brng' => 'A000000797',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          116 => 
          array (
            'kode_brng' => 'A000000798',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          117 => 
          array (
            'kode_brng' => 'A000000799',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          118 => 
          array (
            'kode_brng' => 'A000000800',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          119 => 
          array (
            'kode_brng' => 'A000000801',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          120 => 
          array (
            'kode_brng' => 'A000000802',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          121 => 
          array (
            'kode_brng' => 'A000000803',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          122 => 
          array (
            'kode_brng' => 'A000000804',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          123 => 
          array (
            'kode_brng' => 'A000000805',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          124 => 
          array (
            'kode_brng' => 'A000000807',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          125 => 
          array (
            'kode_brng' => 'A000000808',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          126 => 
          array (
            'kode_brng' => 'B000000003',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          127 => 
          array (
            'kode_brng' => 'B000000090',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          128 => 
          array (
            'kode_brng' => 'B000000091',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          129 => 
          array (
            'kode_brng' => 'B000000092',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          130 => 
          array (
            'kode_brng' => 'B000000093',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          131 => 
          array (
            'kode_brng' => 'B000000094',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          132 => 
          array (
            'kode_brng' => 'B000000095',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          133 => 
          array (
            'kode_brng' => 'B000000096',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          134 => 
          array (
            'kode_brng' => 'B000000097',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          135 => 
          array (
            'kode_brng' => 'B000000098',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          136 => 
          array (
            'kode_brng' => 'B000000099',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          137 => 
          array (
            'kode_brng' => 'B000000101',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          138 => 
          array (
            'kode_brng' => 'B000000102',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          139 => 
          array (
            'kode_brng' => 'B000000103',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          140 => 
          array (
            'kode_brng' => 'B000000104',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          141 => 
          array (
            'kode_brng' => 'B000000105',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          142 => 
          array (
            'kode_brng' => 'B000000106',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          143 => 
          array (
            'kode_brng' => 'B000000107',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          144 => 
          array (
            'kode_brng' => 'B000000108',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          145 => 
          array (
            'kode_brng' => 'B000000109',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          146 => 
          array (
            'kode_brng' => 'B000000110',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          147 => 
          array (
            'kode_brng' => 'B000000111',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          148 => 
          array (
            'kode_brng' => 'B000000112',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          149 => 
          array (
            'kode_brng' => 'B000000113',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          150 => 
          array (
            'kode_brng' => 'B000000114',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          151 => 
          array (
            'kode_brng' => 'B000000115',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          152 => 
          array (
            'kode_brng' => 'B000000117',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          153 => 
          array (
            'kode_brng' => 'B000000118',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          154 => 
          array (
            'kode_brng' => 'B000000119',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          155 => 
          array (
            'kode_brng' => 'B000000120',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          156 => 
          array (
            'kode_brng' => 'B000000121',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          157 => 
          array (
            'kode_brng' => 'B000000122',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          158 => 
          array (
            'kode_brng' => 'B000000123',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          159 => 
          array (
            'kode_brng' => 'B000000125',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          160 => 
          array (
            'kode_brng' => 'B000000126',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          161 => 
          array (
            'kode_brng' => 'B000000127',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          162 => 
          array (
            'kode_brng' => 'B000000128',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          163 => 
          array (
            'kode_brng' => 'B000000129',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          164 => 
          array (
            'kode_brng' => 'B000000130',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          165 => 
          array (
            'kode_brng' => 'B000000131',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          166 => 
          array (
            'kode_brng' => 'B000000134',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          167 => 
          array (
            'kode_brng' => 'B000000135',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          168 => 
          array (
            'kode_brng' => 'B000000137',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          169 => 
          array (
            'kode_brng' => 'B000000138',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          170 => 
          array (
            'kode_brng' => 'B000000140',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          171 => 
          array (
            'kode_brng' => 'B000000141',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          172 => 
          array (
            'kode_brng' => 'B000000142',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          173 => 
          array (
            'kode_brng' => 'B000000144',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          174 => 
          array (
            'kode_brng' => 'B000000145',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          175 => 
          array (
            'kode_brng' => 'B000000146',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          176 => 
          array (
            'kode_brng' => 'B000000148',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          177 => 
          array (
            'kode_brng' => 'B000000149',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          178 => 
          array (
            'kode_brng' => 'B000000150',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          179 => 
          array (
            'kode_brng' => 'B000000151',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          180 => 
          array (
            'kode_brng' => 'B000000152',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          181 => 
          array (
            'kode_brng' => 'B000000153',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          182 => 
          array (
            'kode_brng' => 'B000000154',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          183 => 
          array (
            'kode_brng' => 'B000000155',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          184 => 
          array (
            'kode_brng' => 'B000000158',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          185 => 
          array (
            'kode_brng' => 'B000000163',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          186 => 
          array (
            'kode_brng' => 'B000000165',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          187 => 
          array (
            'kode_brng' => 'B000000166',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          188 => 
          array (
            'kode_brng' => 'B000000169',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          189 => 
          array (
            'kode_brng' => 'B000000170',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          190 => 
          array (
            'kode_brng' => 'B000000171',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          191 => 
          array (
            'kode_brng' => 'B000000172',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          192 => 
          array (
            'kode_brng' => 'B000000173',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          193 => 
          array (
            'kode_brng' => 'B000000174',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          194 => 
          array (
            'kode_brng' => 'B000000175',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          195 => 
          array (
            'kode_brng' => 'B000000177',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          196 => 
          array (
            'kode_brng' => 'B000000178',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          197 => 
          array (
            'kode_brng' => 'B000000179',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          198 => 
          array (
            'kode_brng' => 'B000000180',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          199 => 
          array (
            'kode_brng' => 'B000000181',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          200 => 
          array (
            'kode_brng' => 'B000000182',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          201 => 
          array (
            'kode_brng' => 'B000000183',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          202 => 
          array (
            'kode_brng' => 'B000000184',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          203 => 
          array (
            'kode_brng' => 'B000000185',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          204 => 
          array (
            'kode_brng' => 'B000000186',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          205 => 
          array (
            'kode_brng' => 'B000000187',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          206 => 
          array (
            'kode_brng' => 'B000000188',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          207 => 
          array (
            'kode_brng' => 'B000000189',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          208 => 
          array (
            'kode_brng' => 'B000000190',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          209 => 
          array (
            'kode_brng' => 'B000000191',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          210 => 
          array (
            'kode_brng' => 'B000000192',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          211 => 
          array (
            'kode_brng' => 'B000000194',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          212 => 
          array (
            'kode_brng' => 'B000000195',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          213 => 
          array (
            'kode_brng' => 'B000000196',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          214 => 
          array (
            'kode_brng' => 'B000000197',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          215 => 
          array (
            'kode_brng' => 'B000000198',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          216 => 
          array (
            'kode_brng' => 'B000000199',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          217 => 
          array (
            'kode_brng' => 'B000000200',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          218 => 
          array (
            'kode_brng' => 'B000000201',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          219 => 
          array (
            'kode_brng' => 'B000000202',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          220 => 
          array (
            'kode_brng' => 'B000000203',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          221 => 
          array (
            'kode_brng' => 'B000000204',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          222 => 
          array (
            'kode_brng' => 'B000000205',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          223 => 
          array (
            'kode_brng' => 'B000000206',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          224 => 
          array (
            'kode_brng' => 'B000000207',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          225 => 
          array (
            'kode_brng' => 'B000000208',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          226 => 
          array (
            'kode_brng' => 'B000000209',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          227 => 
          array (
            'kode_brng' => 'B000000210',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          228 => 
          array (
            'kode_brng' => 'B000000211',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          229 => 
          array (
            'kode_brng' => 'B000000212',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          230 => 
          array (
            'kode_brng' => 'B000000213',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          231 => 
          array (
            'kode_brng' => 'B000000214',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          232 => 
          array (
            'kode_brng' => 'B000000215',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          233 => 
          array (
            'kode_brng' => 'B000000216',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          234 => 
          array (
            'kode_brng' => 'B000000217',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          235 => 
          array (
            'kode_brng' => 'B000000219',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          236 => 
          array (
            'kode_brng' => 'B000000220',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          237 => 
          array (
            'kode_brng' => 'B000000221',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          238 => 
          array (
            'kode_brng' => 'B000000222',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          239 => 
          array (
            'kode_brng' => 'B000000223',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          240 => 
          array (
            'kode_brng' => 'B000000224',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          241 => 
          array (
            'kode_brng' => 'B000000225',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          242 => 
          array (
            'kode_brng' => 'B000000226',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          243 => 
          array (
            'kode_brng' => 'B000000227',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          244 => 
          array (
            'kode_brng' => 'B000000228',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          245 => 
          array (
            'kode_brng' => 'B000000229',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          246 => 
          array (
            'kode_brng' => 'B000000230',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          247 => 
          array (
            'kode_brng' => 'B000000231',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          248 => 
          array (
            'kode_brng' => 'B000000232',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          249 => 
          array (
            'kode_brng' => 'B000000234',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          250 => 
          array (
            'kode_brng' => 'B000000236',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          251 => 
          array (
            'kode_brng' => 'B000000237',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          252 => 
          array (
            'kode_brng' => 'B000000238',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          253 => 
          array (
            'kode_brng' => 'B000000239',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          254 => 
          array (
            'kode_brng' => 'B000000240',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          255 => 
          array (
            'kode_brng' => 'B000000241',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          256 => 
          array (
            'kode_brng' => 'B000000242',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          257 => 
          array (
            'kode_brng' => 'B000000243',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          258 => 
          array (
            'kode_brng' => 'B000000244',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          259 => 
          array (
            'kode_brng' => 'B000000245',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          260 => 
          array (
            'kode_brng' => 'B000000247',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          261 => 
          array (
            'kode_brng' => 'B000000248',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          262 => 
          array (
            'kode_brng' => 'B000000249',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          263 => 
          array (
            'kode_brng' => 'B000000250',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          264 => 
          array (
            'kode_brng' => 'B000000251',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          265 => 
          array (
            'kode_brng' => 'B000000252',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          266 => 
          array (
            'kode_brng' => 'B000000253',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          267 => 
          array (
            'kode_brng' => 'B000000254',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          268 => 
          array (
            'kode_brng' => 'B000000255',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          269 => 
          array (
            'kode_brng' => 'B000000256',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          270 => 
          array (
            'kode_brng' => 'B000000257',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          271 => 
          array (
            'kode_brng' => 'B000000258',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          272 => 
          array (
            'kode_brng' => 'B000000259',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          273 => 
          array (
            'kode_brng' => 'B000000260',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          274 => 
          array (
            'kode_brng' => 'B000000261',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          275 => 
          array (
            'kode_brng' => 'B000000262',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          276 => 
          array (
            'kode_brng' => 'B000000263',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          277 => 
          array (
            'kode_brng' => 'B000000264',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          278 => 
          array (
            'kode_brng' => 'B000000265',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          279 => 
          array (
            'kode_brng' => 'B000000266',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          280 => 
          array (
            'kode_brng' => 'B000000267',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          281 => 
          array (
            'kode_brng' => 'B000000268',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          282 => 
          array (
            'kode_brng' => 'B000000269',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          283 => 
          array (
            'kode_brng' => 'B000000270',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          284 => 
          array (
            'kode_brng' => 'B000000272',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          285 => 
          array (
            'kode_brng' => 'B000000273',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          286 => 
          array (
            'kode_brng' => 'B000000274',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          287 => 
          array (
            'kode_brng' => 'B000000275',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          288 => 
          array (
            'kode_brng' => 'B000000276',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          289 => 
          array (
            'kode_brng' => 'B000000277',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          290 => 
          array (
            'kode_brng' => 'B000000278',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          291 => 
          array (
            'kode_brng' => 'B000000279',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          292 => 
          array (
            'kode_brng' => 'B000000280',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          293 => 
          array (
            'kode_brng' => 'B000000281',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          294 => 
          array (
            'kode_brng' => 'B000000282',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          295 => 
          array (
            'kode_brng' => 'B000000282',
            'kd_bangsal' => 'GD',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          296 => 
          array (
            'kode_brng' => 'B000000283',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          297 => 
          array (
            'kode_brng' => 'B000000284',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          298 => 
          array (
            'kode_brng' => 'B000000285',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          299 => 
          array (
            'kode_brng' => 'B000000287',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          300 => 
          array (
            'kode_brng' => 'B000000288',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          301 => 
          array (
            'kode_brng' => 'B000000289',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          302 => 
          array (
            'kode_brng' => 'B000000290',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          303 => 
          array (
            'kode_brng' => 'B000000291',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          304 => 
          array (
            'kode_brng' => 'B000000292',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          305 => 
          array (
            'kode_brng' => 'B000000293',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          306 => 
          array (
            'kode_brng' => 'B000000295',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          307 => 
          array (
            'kode_brng' => 'B000000296',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          308 => 
          array (
            'kode_brng' => 'B000000297',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          309 => 
          array (
            'kode_brng' => 'B000000298',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          310 => 
          array (
            'kode_brng' => 'B000000300',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          311 => 
          array (
            'kode_brng' => 'B000000301',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          312 => 
          array (
            'kode_brng' => 'B000000302',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          313 => 
          array (
            'kode_brng' => 'B000000303',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          314 => 
          array (
            'kode_brng' => 'B000000304',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          315 => 
          array (
            'kode_brng' => 'B000000305',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '1',
            'no_faktur' => 'PB20191215006',
          ),
          316 => 
          array (
            'kode_brng' => 'B000000305',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '123',
            'no_faktur' => 'HO20191227001',
          ),
          317 => 
          array (
            'kode_brng' => 'B000000306',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          318 => 
          array (
            'kode_brng' => 'B000000307',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          319 => 
          array (
            'kode_brng' => 'B000000308',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          320 => 
          array (
            'kode_brng' => 'B000000309',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          321 => 
          array (
            'kode_brng' => 'B000000310',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          322 => 
          array (
            'kode_brng' => 'B000000311',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          323 => 
          array (
            'kode_brng' => 'B000000312',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          324 => 
          array (
            'kode_brng' => 'B000000314',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          325 => 
          array (
            'kode_brng' => 'B000000315',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          326 => 
          array (
            'kode_brng' => 'B000000316',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          327 => 
          array (
            'kode_brng' => 'B000000317',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          328 => 
          array (
            'kode_brng' => 'B000000318',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          329 => 
          array (
            'kode_brng' => 'B000000319',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          330 => 
          array (
            'kode_brng' => 'B000000320',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          331 => 
          array (
            'kode_brng' => 'B000000321',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          332 => 
          array (
            'kode_brng' => 'B000000323',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          333 => 
          array (
            'kode_brng' => 'B000000324',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          334 => 
          array (
            'kode_brng' => 'B000000325',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          335 => 
          array (
            'kode_brng' => 'B000000326',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          336 => 
          array (
            'kode_brng' => 'B000000327',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          337 => 
          array (
            'kode_brng' => 'B000000328',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          338 => 
          array (
            'kode_brng' => 'B000000329',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          339 => 
          array (
            'kode_brng' => 'B000000330',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          340 => 
          array (
            'kode_brng' => 'B000000331',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          341 => 
          array (
            'kode_brng' => 'B000000332',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          342 => 
          array (
            'kode_brng' => 'B000000333',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          343 => 
          array (
            'kode_brng' => 'B000000334',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          344 => 
          array (
            'kode_brng' => 'B000000335',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          345 => 
          array (
            'kode_brng' => 'B000000336',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          346 => 
          array (
            'kode_brng' => 'B000000337',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          347 => 
          array (
            'kode_brng' => 'B000000338',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          348 => 
          array (
            'kode_brng' => 'B000000339',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          349 => 
          array (
            'kode_brng' => 'B000000341',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          350 => 
          array (
            'kode_brng' => 'B000000342',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          351 => 
          array (
            'kode_brng' => 'B000000343',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          352 => 
          array (
            'kode_brng' => 'B000000344',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          353 => 
          array (
            'kode_brng' => 'B000000345',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          354 => 
          array (
            'kode_brng' => 'B000000346',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          355 => 
          array (
            'kode_brng' => 'B000000347',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          356 => 
          array (
            'kode_brng' => 'B000000348',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          357 => 
          array (
            'kode_brng' => 'B000000349',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          358 => 
          array (
            'kode_brng' => 'B000000350',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          359 => 
          array (
            'kode_brng' => 'B000000351',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          360 => 
          array (
            'kode_brng' => 'B000000352',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          361 => 
          array (
            'kode_brng' => 'B000000353',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          362 => 
          array (
            'kode_brng' => 'B000000354',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          363 => 
          array (
            'kode_brng' => 'B000000355',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          364 => 
          array (
            'kode_brng' => 'B000000356',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          365 => 
          array (
            'kode_brng' => 'B000000357',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          366 => 
          array (
            'kode_brng' => 'B000000358',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          367 => 
          array (
            'kode_brng' => 'B000000359',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          368 => 
          array (
            'kode_brng' => 'B000000360',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          369 => 
          array (
            'kode_brng' => 'B000000361',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          370 => 
          array (
            'kode_brng' => 'B000000362',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          371 => 
          array (
            'kode_brng' => 'B000000363',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          372 => 
          array (
            'kode_brng' => 'B000000364',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          373 => 
          array (
            'kode_brng' => 'B000000365',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          374 => 
          array (
            'kode_brng' => 'B000000366',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          375 => 
          array (
            'kode_brng' => 'B000000367',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          376 => 
          array (
            'kode_brng' => 'B000000368',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          377 => 
          array (
            'kode_brng' => 'B000000370',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          378 => 
          array (
            'kode_brng' => 'B000000371',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          379 => 
          array (
            'kode_brng' => 'B000000372',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          380 => 
          array (
            'kode_brng' => 'B000000373',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          381 => 
          array (
            'kode_brng' => 'B000000377',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          382 => 
          array (
            'kode_brng' => 'B000000380',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          383 => 
          array (
            'kode_brng' => 'B000000381',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          384 => 
          array (
            'kode_brng' => 'B000000382',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          385 => 
          array (
            'kode_brng' => 'B000000383',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          386 => 
          array (
            'kode_brng' => 'B000000384',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          387 => 
          array (
            'kode_brng' => 'B000000385',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          388 => 
          array (
            'kode_brng' => 'B000000386',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          389 => 
          array (
            'kode_brng' => 'B000000387',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          390 => 
          array (
            'kode_brng' => 'B000000388',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          391 => 
          array (
            'kode_brng' => 'B000000389',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          392 => 
          array (
            'kode_brng' => 'B000000390',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          393 => 
          array (
            'kode_brng' => 'B000000391',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          394 => 
          array (
            'kode_brng' => 'B000000393',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          395 => 
          array (
            'kode_brng' => 'B000000394',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          396 => 
          array (
            'kode_brng' => 'B000000397',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          397 => 
          array (
            'kode_brng' => 'B000000398',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          398 => 
          array (
            'kode_brng' => 'B000000400',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          399 => 
          array (
            'kode_brng' => 'B000000401',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          400 => 
          array (
            'kode_brng' => 'B000000402',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          401 => 
          array (
            'kode_brng' => 'B000000403',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          402 => 
          array (
            'kode_brng' => 'B000000404',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          403 => 
          array (
            'kode_brng' => 'B000000405',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          404 => 
          array (
            'kode_brng' => 'B000000406',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          405 => 
          array (
            'kode_brng' => 'B000000407',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          406 => 
          array (
            'kode_brng' => 'B000000408',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          407 => 
          array (
            'kode_brng' => 'B000000410',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          408 => 
          array (
            'kode_brng' => 'B000000411',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          409 => 
          array (
            'kode_brng' => 'B000000412',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          410 => 
          array (
            'kode_brng' => 'B000000413',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          411 => 
          array (
            'kode_brng' => 'B000000414',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          412 => 
          array (
            'kode_brng' => 'B000000415',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          413 => 
          array (
            'kode_brng' => 'B000000416',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          414 => 
          array (
            'kode_brng' => 'B000000417',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          415 => 
          array (
            'kode_brng' => 'B000000418',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          416 => 
          array (
            'kode_brng' => 'B000000419',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          417 => 
          array (
            'kode_brng' => 'B000000420',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          418 => 
          array (
            'kode_brng' => 'B000000421',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          419 => 
          array (
            'kode_brng' => 'B000000422',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          420 => 
          array (
            'kode_brng' => 'B000000423',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          421 => 
          array (
            'kode_brng' => 'B000000425',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          422 => 
          array (
            'kode_brng' => 'B000000426',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          423 => 
          array (
            'kode_brng' => 'B000000427',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          424 => 
          array (
            'kode_brng' => 'B000000428',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          425 => 
          array (
            'kode_brng' => 'B000000430',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          426 => 
          array (
            'kode_brng' => 'B000000432',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          427 => 
          array (
            'kode_brng' => 'B000000433',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          428 => 
          array (
            'kode_brng' => 'B000000434',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          429 => 
          array (
            'kode_brng' => 'B000000436',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          430 => 
          array (
            'kode_brng' => 'B000000437',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          431 => 
          array (
            'kode_brng' => 'B000000438',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          432 => 
          array (
            'kode_brng' => 'B000000439',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          433 => 
          array (
            'kode_brng' => 'B000000440',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          434 => 
          array (
            'kode_brng' => 'B000000441',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          435 => 
          array (
            'kode_brng' => 'B000000442',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          436 => 
          array (
            'kode_brng' => 'B000000443',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          437 => 
          array (
            'kode_brng' => 'B000000444',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          438 => 
          array (
            'kode_brng' => 'B000000445',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          439 => 
          array (
            'kode_brng' => 'B000000446',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          440 => 
          array (
            'kode_brng' => 'B000000447',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          441 => 
          array (
            'kode_brng' => 'B000000448',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          442 => 
          array (
            'kode_brng' => 'B000000449',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          443 => 
          array (
            'kode_brng' => 'B000000450',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          444 => 
          array (
            'kode_brng' => 'B000000452',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          445 => 
          array (
            'kode_brng' => 'B000000453',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          446 => 
          array (
            'kode_brng' => 'B000000454',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          447 => 
          array (
            'kode_brng' => 'B000000456',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          448 => 
          array (
            'kode_brng' => 'B000000458',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          449 => 
          array (
            'kode_brng' => 'B000000460',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          450 => 
          array (
            'kode_brng' => 'B000000461',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          451 => 
          array (
            'kode_brng' => 'B000000462',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          452 => 
          array (
            'kode_brng' => 'B000000463',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          453 => 
          array (
            'kode_brng' => 'B000000464',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          454 => 
          array (
            'kode_brng' => 'B000000465',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          455 => 
          array (
            'kode_brng' => 'B000000466',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          456 => 
          array (
            'kode_brng' => 'B000000467',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          457 => 
          array (
            'kode_brng' => 'B000000468',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          458 => 
          array (
            'kode_brng' => 'B000000469',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          459 => 
          array (
            'kode_brng' => 'B000000470',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          460 => 
          array (
            'kode_brng' => 'B000000471',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          461 => 
          array (
            'kode_brng' => 'B000000472',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          462 => 
          array (
            'kode_brng' => 'B000000473',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          463 => 
          array (
            'kode_brng' => 'B000000474',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          464 => 
          array (
            'kode_brng' => 'B000000475',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          465 => 
          array (
            'kode_brng' => 'B000000476',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          466 => 
          array (
            'kode_brng' => 'B000000477',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          467 => 
          array (
            'kode_brng' => 'B000000478',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          468 => 
          array (
            'kode_brng' => 'B000000479',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          469 => 
          array (
            'kode_brng' => 'B000000480',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          470 => 
          array (
            'kode_brng' => 'B000000553',
            'kd_bangsal' => 'IGD',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          471 => 
          array (
            'kode_brng' => 'B000000555',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '4',
            'no_faktur' => 'PB20191215006',
          ),
          472 => 
          array (
            'kode_brng' => 'B000000558',
            'kd_bangsal' => 'IGD',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          473 => 
          array (
            'kode_brng' => 'B000000561',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          474 => 
          array (
            'kode_brng' => 'B000000566',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          475 => 
          array (
            'kode_brng' => 'B000000570',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          476 => 
          array (
            'kode_brng' => 'B000000573',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          477 => 
          array (
            'kode_brng' => 'B000000575',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '1121',
            'no_faktur' => 'PB20240729001',
          ),
          478 => 
          array (
            'kode_brng' => 'B000000577',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          479 => 
          array (
            'kode_brng' => 'B000000580',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          480 => 
          array (
            'kode_brng' => 'B000000581',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          481 => 
          array (
            'kode_brng' => 'B000000585',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          482 => 
          array (
            'kode_brng' => 'B000000586',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          483 => 
          array (
            'kode_brng' => 'B000000590',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          484 => 
          array (
            'kode_brng' => 'B000000592',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          485 => 
          array (
            'kode_brng' => 'B000000595',
            'kd_bangsal' => 'GD',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          486 => 
          array (
            'kode_brng' => 'B000000596',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          487 => 
          array (
            'kode_brng' => 'B000000599',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          488 => 
          array (
            'kode_brng' => 'B000000601',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          489 => 
          array (
            'kode_brng' => 'B000000608',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          490 => 
          array (
            'kode_brng' => 'B000000610',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          491 => 
          array (
            'kode_brng' => 'B000000611',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          492 => 
          array (
            'kode_brng' => 'B000000613',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          493 => 
          array (
            'kode_brng' => 'B000000614',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          494 => 
          array (
            'kode_brng' => 'B000000616',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          495 => 
          array (
            'kode_brng' => 'B000000619',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          496 => 
          array (
            'kode_brng' => 'B000000621',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          497 => 
          array (
            'kode_brng' => 'B000000626',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          498 => 
          array (
            'kode_brng' => 'B000000629',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          499 => 
          array (
            'kode_brng' => 'B000000630',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
        ));
        DB::table('gudangbarang')->insert(array (
          0 => 
          array (
            'kode_brng' => 'B000000631',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          1 => 
          array (
            'kode_brng' => 'B000000633',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          2 => 
          array (
            'kode_brng' => 'B000000634',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          3 => 
          array (
            'kode_brng' => 'B000000638',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          4 => 
          array (
            'kode_brng' => 'B000000639',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          5 => 
          array (
            'kode_brng' => 'B000000640',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          6 => 
          array (
            'kode_brng' => 'B000000642',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          7 => 
          array (
            'kode_brng' => 'B000000643',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          8 => 
          array (
            'kode_brng' => 'B000000644',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          9 => 
          array (
            'kode_brng' => 'B000000645',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          10 => 
          array (
            'kode_brng' => 'B000000646',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          11 => 
          array (
            'kode_brng' => 'B000000647',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          12 => 
          array (
            'kode_brng' => 'B000000648',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          13 => 
          array (
            'kode_brng' => 'B000000649',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          14 => 
          array (
            'kode_brng' => 'B000000651',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          15 => 
          array (
            'kode_brng' => 'B000000652',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          16 => 
          array (
            'kode_brng' => 'B000000653',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          17 => 
          array (
            'kode_brng' => 'B000000654',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          18 => 
          array (
            'kode_brng' => 'B000000657',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          19 => 
          array (
            'kode_brng' => 'B000000659',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          20 => 
          array (
            'kode_brng' => 'B000000660',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          21 => 
          array (
            'kode_brng' => 'B000000662',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          22 => 
          array (
            'kode_brng' => 'B000000663',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          23 => 
          array (
            'kode_brng' => 'B000000665',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          24 => 
          array (
            'kode_brng' => 'B000000668',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          25 => 
          array (
            'kode_brng' => 'B000000671',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          26 => 
          array (
            'kode_brng' => 'B000000672',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          27 => 
          array (
            'kode_brng' => 'B000000673',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          28 => 
          array (
            'kode_brng' => 'B000000674',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          29 => 
          array (
            'kode_brng' => 'B000000675',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          30 => 
          array (
            'kode_brng' => 'B000000676',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          31 => 
          array (
            'kode_brng' => 'B000000677',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          32 => 
          array (
            'kode_brng' => 'B000000679',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          33 => 
          array (
            'kode_brng' => 'B000000681',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          34 => 
          array (
            'kode_brng' => 'B000000682',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          35 => 
          array (
            'kode_brng' => 'B000000683',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          36 => 
          array (
            'kode_brng' => 'B000000684',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          37 => 
          array (
            'kode_brng' => 'B000000685',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          38 => 
          array (
            'kode_brng' => 'B000000686',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          39 => 
          array (
            'kode_brng' => 'B000000687',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          40 => 
          array (
            'kode_brng' => 'B000000688',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          41 => 
          array (
            'kode_brng' => 'B000000689',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          42 => 
          array (
            'kode_brng' => 'B000000690',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          43 => 
          array (
            'kode_brng' => 'B000000692',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          44 => 
          array (
            'kode_brng' => 'B000000693',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          45 => 
          array (
            'kode_brng' => 'B000000695',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          46 => 
          array (
            'kode_brng' => 'B000000697',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          47 => 
          array (
            'kode_brng' => 'B000000698',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          48 => 
          array (
            'kode_brng' => 'B000000701',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          49 => 
          array (
            'kode_brng' => 'B000000702',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          50 => 
          array (
            'kode_brng' => 'B000000706',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          51 => 
          array (
            'kode_brng' => 'B000000708',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          52 => 
          array (
            'kode_brng' => 'B000000709',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          53 => 
          array (
            'kode_brng' => 'B000000710',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          54 => 
          array (
            'kode_brng' => 'B000000711',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          55 => 
          array (
            'kode_brng' => 'B000000712',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          56 => 
          array (
            'kode_brng' => 'B000000713',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          57 => 
          array (
            'kode_brng' => 'B000000714',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          58 => 
          array (
            'kode_brng' => 'B000000715',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          59 => 
          array (
            'kode_brng' => 'B000000716',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          60 => 
          array (
            'kode_brng' => 'B000000717',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          61 => 
          array (
            'kode_brng' => 'B000000718',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          62 => 
          array (
            'kode_brng' => 'B000000719',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          63 => 
          array (
            'kode_brng' => 'B000000720',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          64 => 
          array (
            'kode_brng' => 'B000000721',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          65 => 
          array (
            'kode_brng' => 'B000000727',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          66 => 
          array (
            'kode_brng' => 'B000000728',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          67 => 
          array (
            'kode_brng' => 'B000000734',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          68 => 
          array (
            'kode_brng' => 'B000000735',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          69 => 
          array (
            'kode_brng' => 'B000000736',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          70 => 
          array (
            'kode_brng' => 'B000000737',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          71 => 
          array (
            'kode_brng' => 'B000000738',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          72 => 
          array (
            'kode_brng' => 'B000000739',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          73 => 
          array (
            'kode_brng' => 'B000000740',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          74 => 
          array (
            'kode_brng' => 'B000000741',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          75 => 
          array (
            'kode_brng' => 'B000000742',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          76 => 
          array (
            'kode_brng' => 'B000000743',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          77 => 
          array (
            'kode_brng' => 'B000000744',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          78 => 
          array (
            'kode_brng' => 'B000000745',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          79 => 
          array (
            'kode_brng' => 'B000000746',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          80 => 
          array (
            'kode_brng' => 'B000000747',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          81 => 
          array (
            'kode_brng' => 'B000000748',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          82 => 
          array (
            'kode_brng' => 'B000000749',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          83 => 
          array (
            'kode_brng' => 'B000000750',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          84 => 
          array (
            'kode_brng' => 'B000000751',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          85 => 
          array (
            'kode_brng' => 'B000000752',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          86 => 
          array (
            'kode_brng' => 'B000000753',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          87 => 
          array (
            'kode_brng' => 'B000000754',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          88 => 
          array (
            'kode_brng' => 'B000000755',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          89 => 
          array (
            'kode_brng' => 'B000000756',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          90 => 
          array (
            'kode_brng' => 'B000000757',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          91 => 
          array (
            'kode_brng' => 'B000000759',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          92 => 
          array (
            'kode_brng' => 'B000000760',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          93 => 
          array (
            'kode_brng' => 'B000000761',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          94 => 
          array (
            'kode_brng' => 'B000000762',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          95 => 
          array (
            'kode_brng' => 'B000000763',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          96 => 
          array (
            'kode_brng' => 'B000000765',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          97 => 
          array (
            'kode_brng' => 'B000000767',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          98 => 
          array (
            'kode_brng' => 'B000000768',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          99 => 
          array (
            'kode_brng' => 'B000000769',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          100 => 
          array (
            'kode_brng' => 'B000000770',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          101 => 
          array (
            'kode_brng' => 'B000000771',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          102 => 
          array (
            'kode_brng' => 'B000000772',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          103 => 
          array (
            'kode_brng' => 'B000000773',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          104 => 
          array (
            'kode_brng' => 'B000000774',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          105 => 
          array (
            'kode_brng' => 'B000000775',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          106 => 
          array (
            'kode_brng' => 'B000000776',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          107 => 
          array (
            'kode_brng' => 'B000000777',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          108 => 
          array (
            'kode_brng' => 'B000000778',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          109 => 
          array (
            'kode_brng' => 'B000000779',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          110 => 
          array (
            'kode_brng' => 'B000000780',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          111 => 
          array (
            'kode_brng' => 'B000000781',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          112 => 
          array (
            'kode_brng' => 'B000000782',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          113 => 
          array (
            'kode_brng' => 'B000000783',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          114 => 
          array (
            'kode_brng' => 'B000000784',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          115 => 
          array (
            'kode_brng' => 'B000000785',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          116 => 
          array (
            'kode_brng' => 'B000000786',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          117 => 
          array (
            'kode_brng' => 'B000000792',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          118 => 
          array (
            'kode_brng' => 'B000000793',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          119 => 
          array (
            'kode_brng' => 'B000000794',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          120 => 
          array (
            'kode_brng' => 'B000000795',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          121 => 
          array (
            'kode_brng' => 'B000000796',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          122 => 
          array (
            'kode_brng' => 'B000000799',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          123 => 
          array (
            'kode_brng' => 'B000000800',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          124 => 
          array (
            'kode_brng' => 'B000000801',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          125 => 
          array (
            'kode_brng' => 'B000000802',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          126 => 
          array (
            'kode_brng' => 'B000000804',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          127 => 
          array (
            'kode_brng' => 'B000000805',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          128 => 
          array (
            'kode_brng' => 'B000000806',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          129 => 
          array (
            'kode_brng' => 'B000000808',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          130 => 
          array (
            'kode_brng' => 'B000000809',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          131 => 
          array (
            'kode_brng' => 'B000000810',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          132 => 
          array (
            'kode_brng' => 'B000000811',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          133 => 
          array (
            'kode_brng' => 'B000000812',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          134 => 
          array (
            'kode_brng' => 'B000000813',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          135 => 
          array (
            'kode_brng' => 'B000000814',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          136 => 
          array (
            'kode_brng' => 'B000000815',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          137 => 
          array (
            'kode_brng' => 'B000000816',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          138 => 
          array (
            'kode_brng' => 'B000000817',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          139 => 
          array (
            'kode_brng' => 'B000000818',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          140 => 
          array (
            'kode_brng' => 'B000000819',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          141 => 
          array (
            'kode_brng' => 'B000000820',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          142 => 
          array (
            'kode_brng' => 'B000000821',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          143 => 
          array (
            'kode_brng' => 'B000000822',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          144 => 
          array (
            'kode_brng' => 'B000000823',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          145 => 
          array (
            'kode_brng' => 'B000000824',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          146 => 
          array (
            'kode_brng' => 'B000000825',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          147 => 
          array (
            'kode_brng' => 'B000000826',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          148 => 
          array (
            'kode_brng' => 'B000000827',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          149 => 
          array (
            'kode_brng' => 'B000000828',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          150 => 
          array (
            'kode_brng' => 'B000000829',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          151 => 
          array (
            'kode_brng' => 'B000000830',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          152 => 
          array (
            'kode_brng' => 'B000000832',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          153 => 
          array (
            'kode_brng' => 'B000000833',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          154 => 
          array (
            'kode_brng' => 'B000000834',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          155 => 
          array (
            'kode_brng' => 'B000000835',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          156 => 
          array (
            'kode_brng' => 'B000000836',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          157 => 
          array (
            'kode_brng' => 'B000000837',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          158 => 
          array (
            'kode_brng' => 'B000000838',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          159 => 
          array (
            'kode_brng' => 'B000000839',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          160 => 
          array (
            'kode_brng' => 'B000000840',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          161 => 
          array (
            'kode_brng' => 'B000000841',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          162 => 
          array (
            'kode_brng' => 'B000000842',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          163 => 
          array (
            'kode_brng' => 'B000000843',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          164 => 
          array (
            'kode_brng' => 'B000000844',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          165 => 
          array (
            'kode_brng' => 'B000000845',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          166 => 
          array (
            'kode_brng' => 'B000000846',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          167 => 
          array (
            'kode_brng' => 'B000000847',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          168 => 
          array (
            'kode_brng' => 'B000000848',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          169 => 
          array (
            'kode_brng' => 'B000000849',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          170 => 
          array (
            'kode_brng' => 'B000000850',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          171 => 
          array (
            'kode_brng' => 'B000000851',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          172 => 
          array (
            'kode_brng' => 'B000000852',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          173 => 
          array (
            'kode_brng' => 'B000000853',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          174 => 
          array (
            'kode_brng' => 'B000000854',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          175 => 
          array (
            'kode_brng' => 'B000000855',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          176 => 
          array (
            'kode_brng' => 'B000000856',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          177 => 
          array (
            'kode_brng' => 'B000000857',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          178 => 
          array (
            'kode_brng' => 'B000000858',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          179 => 
          array (
            'kode_brng' => 'B000000859',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          180 => 
          array (
            'kode_brng' => 'B000000860',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          181 => 
          array (
            'kode_brng' => 'B000000861',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          182 => 
          array (
            'kode_brng' => 'B000000862',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          183 => 
          array (
            'kode_brng' => 'B000000863',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          184 => 
          array (
            'kode_brng' => 'B000000864',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          185 => 
          array (
            'kode_brng' => 'B000000865',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          186 => 
          array (
            'kode_brng' => 'B000000866',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          187 => 
          array (
            'kode_brng' => 'B000000867',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          188 => 
          array (
            'kode_brng' => 'B000000868',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          189 => 
          array (
            'kode_brng' => 'B000000869',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          190 => 
          array (
            'kode_brng' => 'B000000870',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          191 => 
          array (
            'kode_brng' => 'B000000871',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          192 => 
          array (
            'kode_brng' => 'B000000872',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          193 => 
          array (
            'kode_brng' => 'B000000873',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          194 => 
          array (
            'kode_brng' => 'B000000874',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          195 => 
          array (
            'kode_brng' => 'B000000875',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          196 => 
          array (
            'kode_brng' => 'B000000876',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          197 => 
          array (
            'kode_brng' => 'B000000877',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          198 => 
          array (
            'kode_brng' => 'B000000878',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          199 => 
          array (
            'kode_brng' => 'B000000879',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          200 => 
          array (
            'kode_brng' => 'B000000880',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          201 => 
          array (
            'kode_brng' => 'B000000881',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          202 => 
          array (
            'kode_brng' => 'B000000882',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          203 => 
          array (
            'kode_brng' => 'B000000884',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          204 => 
          array (
            'kode_brng' => 'B000000885',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          205 => 
          array (
            'kode_brng' => 'B000000886',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          206 => 
          array (
            'kode_brng' => 'B000000887',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          207 => 
          array (
            'kode_brng' => 'B000000888',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          208 => 
          array (
            'kode_brng' => 'B000000889',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          209 => 
          array (
            'kode_brng' => 'B000000890',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          210 => 
          array (
            'kode_brng' => 'B000000891',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          211 => 
          array (
            'kode_brng' => 'B000000895',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          212 => 
          array (
            'kode_brng' => 'B000000896',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          213 => 
          array (
            'kode_brng' => 'B000000897',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          214 => 
          array (
            'kode_brng' => 'B000000898',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          215 => 
          array (
            'kode_brng' => 'B000000899',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          216 => 
          array (
            'kode_brng' => 'B000000900',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          217 => 
          array (
            'kode_brng' => 'B000000901',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          218 => 
          array (
            'kode_brng' => 'B000000902',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          219 => 
          array (
            'kode_brng' => 'B000000903',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          220 => 
          array (
            'kode_brng' => 'B000000904',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          221 => 
          array (
            'kode_brng' => 'B000000905',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          222 => 
          array (
            'kode_brng' => 'B000000906',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          223 => 
          array (
            'kode_brng' => 'B000000907',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          224 => 
          array (
            'kode_brng' => 'B000000908',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          225 => 
          array (
            'kode_brng' => 'B000000909',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          226 => 
          array (
            'kode_brng' => 'B000000910',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          227 => 
          array (
            'kode_brng' => 'B000000911',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          228 => 
          array (
            'kode_brng' => 'B000000912',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          229 => 
          array (
            'kode_brng' => 'B000000913',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          230 => 
          array (
            'kode_brng' => 'B000000914',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          231 => 
          array (
            'kode_brng' => 'B000000915',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          232 => 
          array (
            'kode_brng' => 'B000000916',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          233 => 
          array (
            'kode_brng' => 'B000000917',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          234 => 
          array (
            'kode_brng' => 'B000000918',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          235 => 
          array (
            'kode_brng' => 'B000000919',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          236 => 
          array (
            'kode_brng' => 'B000000920',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          237 => 
          array (
            'kode_brng' => 'B000000921',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          238 => 
          array (
            'kode_brng' => 'B000000922',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          239 => 
          array (
            'kode_brng' => 'B000000923',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          240 => 
          array (
            'kode_brng' => 'B000000924',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          241 => 
          array (
            'kode_brng' => 'B000000925',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          242 => 
          array (
            'kode_brng' => 'B000000926',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          243 => 
          array (
            'kode_brng' => 'B000000927',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          244 => 
          array (
            'kode_brng' => 'B000000928',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          245 => 
          array (
            'kode_brng' => 'B000000929',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          246 => 
          array (
            'kode_brng' => 'B000000930',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          247 => 
          array (
            'kode_brng' => 'B000000931',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          248 => 
          array (
            'kode_brng' => 'B000000932',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          249 => 
          array (
            'kode_brng' => 'B000000933',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          250 => 
          array (
            'kode_brng' => 'B000000934',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          251 => 
          array (
            'kode_brng' => 'B000000935',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          252 => 
          array (
            'kode_brng' => 'B000000936',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          253 => 
          array (
            'kode_brng' => 'B000000937',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          254 => 
          array (
            'kode_brng' => 'B000000938',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          255 => 
          array (
            'kode_brng' => 'B000000939',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          256 => 
          array (
            'kode_brng' => 'B000000940',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          257 => 
          array (
            'kode_brng' => 'B000000941',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          258 => 
          array (
            'kode_brng' => 'B000000942',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          259 => 
          array (
            'kode_brng' => 'B000000943',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          260 => 
          array (
            'kode_brng' => 'B000000944',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          261 => 
          array (
            'kode_brng' => 'B000000945',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          262 => 
          array (
            'kode_brng' => 'B000000946',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          263 => 
          array (
            'kode_brng' => 'B000000947',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          264 => 
          array (
            'kode_brng' => 'B000000948',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          265 => 
          array (
            'kode_brng' => 'B000000949',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          266 => 
          array (
            'kode_brng' => 'B000000950',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          267 => 
          array (
            'kode_brng' => 'B000000951',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          268 => 
          array (
            'kode_brng' => 'B000000952',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          269 => 
          array (
            'kode_brng' => 'B000000953',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          270 => 
          array (
            'kode_brng' => 'B000000954',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          271 => 
          array (
            'kode_brng' => 'B000000955',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          272 => 
          array (
            'kode_brng' => 'B000000956',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          273 => 
          array (
            'kode_brng' => 'B000000957',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          274 => 
          array (
            'kode_brng' => 'B000000959',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          275 => 
          array (
            'kode_brng' => 'B000000960',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          276 => 
          array (
            'kode_brng' => 'B000000961',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          277 => 
          array (
            'kode_brng' => 'B000000962',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          278 => 
          array (
            'kode_brng' => 'B000000963',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          279 => 
          array (
            'kode_brng' => 'B000000964',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          280 => 
          array (
            'kode_brng' => 'B000000968',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          281 => 
          array (
            'kode_brng' => 'B000000969',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          282 => 
          array (
            'kode_brng' => 'B000000970',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          283 => 
          array (
            'kode_brng' => 'B000000971',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          284 => 
          array (
            'kode_brng' => 'B000000972',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          285 => 
          array (
            'kode_brng' => 'B000000973',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          286 => 
          array (
            'kode_brng' => 'B000000974',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          287 => 
          array (
            'kode_brng' => 'B000000975',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          288 => 
          array (
            'kode_brng' => 'B000000976',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          289 => 
          array (
            'kode_brng' => 'B000000977',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          290 => 
          array (
            'kode_brng' => 'B000000978',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          291 => 
          array (
            'kode_brng' => 'B000000979',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          292 => 
          array (
            'kode_brng' => 'B000000980',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          293 => 
          array (
            'kode_brng' => 'B000000981',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          294 => 
          array (
            'kode_brng' => 'B000000982',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          295 => 
          array (
            'kode_brng' => 'B000000983',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          296 => 
          array (
            'kode_brng' => 'B000000984',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          297 => 
          array (
            'kode_brng' => 'B000000985',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          298 => 
          array (
            'kode_brng' => 'B000000986',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          299 => 
          array (
            'kode_brng' => 'B000000987',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          300 => 
          array (
            'kode_brng' => 'B000000988',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          301 => 
          array (
            'kode_brng' => 'B000000989',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          302 => 
          array (
            'kode_brng' => 'B000000990',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          303 => 
          array (
            'kode_brng' => 'B000000992',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          304 => 
          array (
            'kode_brng' => 'B000000993',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          305 => 
          array (
            'kode_brng' => 'B000000994',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          306 => 
          array (
            'kode_brng' => 'B000000995',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          307 => 
          array (
            'kode_brng' => 'B000000996',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          308 => 
          array (
            'kode_brng' => 'B000000997',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          309 => 
          array (
            'kode_brng' => 'B000000998',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          310 => 
          array (
            'kode_brng' => 'B000000999',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          311 => 
          array (
            'kode_brng' => 'B000001000',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          312 => 
          array (
            'kode_brng' => 'B000001001',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          313 => 
          array (
            'kode_brng' => 'B000001002',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          314 => 
          array (
            'kode_brng' => 'B000001003',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          315 => 
          array (
            'kode_brng' => 'B000001004',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          316 => 
          array (
            'kode_brng' => 'B000001005',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          317 => 
          array (
            'kode_brng' => 'B000001006',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          318 => 
          array (
            'kode_brng' => 'B000001007',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          319 => 
          array (
            'kode_brng' => 'B000001008',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          320 => 
          array (
            'kode_brng' => 'B000001009',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          321 => 
          array (
            'kode_brng' => 'B000001010',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          322 => 
          array (
            'kode_brng' => 'B000001011',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          323 => 
          array (
            'kode_brng' => 'B000001012',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          324 => 
          array (
            'kode_brng' => 'B000001013',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          325 => 
          array (
            'kode_brng' => 'B000001014',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          326 => 
          array (
            'kode_brng' => 'B000001016',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          327 => 
          array (
            'kode_brng' => 'B000001017',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          328 => 
          array (
            'kode_brng' => 'B000001018',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          329 => 
          array (
            'kode_brng' => 'B000001019',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          330 => 
          array (
            'kode_brng' => 'B000001021',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          331 => 
          array (
            'kode_brng' => 'B000001022',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          332 => 
          array (
            'kode_brng' => 'B000001023 ',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          333 => 
          array (
            'kode_brng' => 'B000001024',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          334 => 
          array (
            'kode_brng' => 'B000001025',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          335 => 
          array (
            'kode_brng' => 'B000001026',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          336 => 
          array (
            'kode_brng' => 'B000001027',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          337 => 
          array (
            'kode_brng' => 'B000001028',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          338 => 
          array (
            'kode_brng' => 'B000001029',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          339 => 
          array (
            'kode_brng' => 'B000001030',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          340 => 
          array (
            'kode_brng' => 'B000001031',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          341 => 
          array (
            'kode_brng' => 'B000001032',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          342 => 
          array (
            'kode_brng' => 'B000001035',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          343 => 
          array (
            'kode_brng' => 'B000001036',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          344 => 
          array (
            'kode_brng' => 'B000001037',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          345 => 
          array (
            'kode_brng' => 'B000001040',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          346 => 
          array (
            'kode_brng' => 'B000001041',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          347 => 
          array (
            'kode_brng' => 'B000001042',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          348 => 
          array (
            'kode_brng' => 'B000001043',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          349 => 
          array (
            'kode_brng' => 'B000001044',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          350 => 
          array (
            'kode_brng' => 'B000001045',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          351 => 
          array (
            'kode_brng' => 'B000001046',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          352 => 
          array (
            'kode_brng' => 'B000001047',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          353 => 
          array (
            'kode_brng' => 'B000001048',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          354 => 
          array (
            'kode_brng' => 'B000001049',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          355 => 
          array (
            'kode_brng' => 'B000001050',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          356 => 
          array (
            'kode_brng' => 'B000001051',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          357 => 
          array (
            'kode_brng' => 'B000001052',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          358 => 
          array (
            'kode_brng' => 'B000001053',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          359 => 
          array (
            'kode_brng' => 'B000001054',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          360 => 
          array (
            'kode_brng' => 'B000001055',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          361 => 
          array (
            'kode_brng' => 'B000001056',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          362 => 
          array (
            'kode_brng' => 'B000001057',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          363 => 
          array (
            'kode_brng' => 'B000001058',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          364 => 
          array (
            'kode_brng' => 'B000001059',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          365 => 
          array (
            'kode_brng' => 'B000001060',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          366 => 
          array (
            'kode_brng' => 'B000001061',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          367 => 
          array (
            'kode_brng' => 'B000001062',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          368 => 
          array (
            'kode_brng' => 'B000001063',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          369 => 
          array (
            'kode_brng' => 'B000001064',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          370 => 
          array (
            'kode_brng' => 'B000001065',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          371 => 
          array (
            'kode_brng' => 'B000001066',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          372 => 
          array (
            'kode_brng' => 'B000001067',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          373 => 
          array (
            'kode_brng' => 'B000001068',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          374 => 
          array (
            'kode_brng' => 'B000001069',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          375 => 
          array (
            'kode_brng' => 'B000001070',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          376 => 
          array (
            'kode_brng' => 'B000001071',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          377 => 
          array (
            'kode_brng' => 'B000001072',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          378 => 
          array (
            'kode_brng' => 'B000001073',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          379 => 
          array (
            'kode_brng' => 'B000001074',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          380 => 
          array (
            'kode_brng' => 'B000001075',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          381 => 
          array (
            'kode_brng' => 'B000001076',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          382 => 
          array (
            'kode_brng' => 'B000001077',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          383 => 
          array (
            'kode_brng' => 'B000001078',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          384 => 
          array (
            'kode_brng' => 'B000001079',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          385 => 
          array (
            'kode_brng' => 'B000001080',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          386 => 
          array (
            'kode_brng' => 'B000001081',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          387 => 
          array (
            'kode_brng' => 'B000001082',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          388 => 
          array (
            'kode_brng' => 'B000001084',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          389 => 
          array (
            'kode_brng' => 'B000001085',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          390 => 
          array (
            'kode_brng' => 'B000001086',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          391 => 
          array (
            'kode_brng' => 'B000001087',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          392 => 
          array (
            'kode_brng' => 'B000001088',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          393 => 
          array (
            'kode_brng' => 'B000001089',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          394 => 
          array (
            'kode_brng' => 'B000001090',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          395 => 
          array (
            'kode_brng' => 'B000001091',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          396 => 
          array (
            'kode_brng' => 'B000001092',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          397 => 
          array (
            'kode_brng' => 'B000001093',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          398 => 
          array (
            'kode_brng' => 'B000001094',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          399 => 
          array (
            'kode_brng' => 'B000001095',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          400 => 
          array (
            'kode_brng' => 'B000001096',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          401 => 
          array (
            'kode_brng' => 'B000001097',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          402 => 
          array (
            'kode_brng' => 'B000001098',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          403 => 
          array (
            'kode_brng' => 'B000001099',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          404 => 
          array (
            'kode_brng' => 'B000001100',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          405 => 
          array (
            'kode_brng' => 'B000001102',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          406 => 
          array (
            'kode_brng' => 'B000001103',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          407 => 
          array (
            'kode_brng' => 'B000001104',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          408 => 
          array (
            'kode_brng' => 'B000001105',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          409 => 
          array (
            'kode_brng' => 'B000001106',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          410 => 
          array (
            'kode_brng' => 'B000001107',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          411 => 
          array (
            'kode_brng' => 'B000001108',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          412 => 
          array (
            'kode_brng' => 'B000001109',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          413 => 
          array (
            'kode_brng' => 'B000001110',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          414 => 
          array (
            'kode_brng' => 'B000001111',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          415 => 
          array (
            'kode_brng' => 'B000001112',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          416 => 
          array (
            'kode_brng' => 'B000001113',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          417 => 
          array (
            'kode_brng' => 'B000001114',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          418 => 
          array (
            'kode_brng' => 'B000001115',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          419 => 
          array (
            'kode_brng' => 'B000001116',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          420 => 
          array (
            'kode_brng' => 'B000001117',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          421 => 
          array (
            'kode_brng' => 'B000001118',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          422 => 
          array (
            'kode_brng' => 'B000001119',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          423 => 
          array (
            'kode_brng' => 'B000001120',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          424 => 
          array (
            'kode_brng' => 'B000001121',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          425 => 
          array (
            'kode_brng' => 'B000001122',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          426 => 
          array (
            'kode_brng' => 'B000001123',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          427 => 
          array (
            'kode_brng' => 'B000001124',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          428 => 
          array (
            'kode_brng' => 'B000001125',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          429 => 
          array (
            'kode_brng' => 'B000001126',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          430 => 
          array (
            'kode_brng' => 'B000001127',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          431 => 
          array (
            'kode_brng' => 'B000001128',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          432 => 
          array (
            'kode_brng' => 'B000001129',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          433 => 
          array (
            'kode_brng' => 'B000001130',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          434 => 
          array (
            'kode_brng' => 'B000001131',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          435 => 
          array (
            'kode_brng' => 'B000001132',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          436 => 
          array (
            'kode_brng' => 'B000001133',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          437 => 
          array (
            'kode_brng' => 'B000001134',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          438 => 
          array (
            'kode_brng' => 'B000001136',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          439 => 
          array (
            'kode_brng' => 'B000001137',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          440 => 
          array (
            'kode_brng' => 'B000001138',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          441 => 
          array (
            'kode_brng' => 'B000001139',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          442 => 
          array (
            'kode_brng' => 'B000001140',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          443 => 
          array (
            'kode_brng' => 'B000001141',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          444 => 
          array (
            'kode_brng' => 'B000001143',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          445 => 
          array (
            'kode_brng' => 'B000001144',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          446 => 
          array (
            'kode_brng' => 'B000001145',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          447 => 
          array (
            'kode_brng' => 'B000001146',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          448 => 
          array (
            'kode_brng' => 'B000001147',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          449 => 
          array (
            'kode_brng' => 'B000001148',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          450 => 
          array (
            'kode_brng' => 'B000001149',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          451 => 
          array (
            'kode_brng' => 'B000001150',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          452 => 
          array (
            'kode_brng' => 'B000001151',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          453 => 
          array (
            'kode_brng' => 'B000001152',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          454 => 
          array (
            'kode_brng' => 'B000001153',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          455 => 
          array (
            'kode_brng' => 'B000001154',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          456 => 
          array (
            'kode_brng' => 'B000001155',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          457 => 
          array (
            'kode_brng' => 'B000001156',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          458 => 
          array (
            'kode_brng' => 'B000001157',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          459 => 
          array (
            'kode_brng' => 'B000001159',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          460 => 
          array (
            'kode_brng' => 'B000001160',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          461 => 
          array (
            'kode_brng' => 'B000001161',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          462 => 
          array (
            'kode_brng' => 'B000001162',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          463 => 
          array (
            'kode_brng' => 'B000001163',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          464 => 
          array (
            'kode_brng' => 'B000001164',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          465 => 
          array (
            'kode_brng' => 'B000001165',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          466 => 
          array (
            'kode_brng' => 'B000001166',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          467 => 
          array (
            'kode_brng' => 'B000001167',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          468 => 
          array (
            'kode_brng' => 'B000001168',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          469 => 
          array (
            'kode_brng' => 'B000001169',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          470 => 
          array (
            'kode_brng' => 'B000001170',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          471 => 
          array (
            'kode_brng' => 'B000001171',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          472 => 
          array (
            'kode_brng' => 'B000001173',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          473 => 
          array (
            'kode_brng' => 'B000001176',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          474 => 
          array (
            'kode_brng' => 'B000001179',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          475 => 
          array (
            'kode_brng' => 'B000001180',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          476 => 
          array (
            'kode_brng' => 'B000001181',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          477 => 
          array (
            'kode_brng' => 'B000001182',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          478 => 
          array (
            'kode_brng' => 'B000001183',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          479 => 
          array (
            'kode_brng' => 'B000001184',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          480 => 
          array (
            'kode_brng' => 'B000001185',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          481 => 
          array (
            'kode_brng' => 'B000001186',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          482 => 
          array (
            'kode_brng' => 'B000001187',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          483 => 
          array (
            'kode_brng' => 'B000001188',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          484 => 
          array (
            'kode_brng' => 'B000001189',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          485 => 
          array (
            'kode_brng' => 'B000001190',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          486 => 
          array (
            'kode_brng' => 'B000001191',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          487 => 
          array (
            'kode_brng' => 'B000001192',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          488 => 
          array (
            'kode_brng' => 'B000001193',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          489 => 
          array (
            'kode_brng' => 'B000001194',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          490 => 
          array (
            'kode_brng' => 'B000001195',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          491 => 
          array (
            'kode_brng' => 'B000001197',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          492 => 
          array (
            'kode_brng' => 'B000001198',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          493 => 
          array (
            'kode_brng' => 'B000001199',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          494 => 
          array (
            'kode_brng' => 'B000001200',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          495 => 
          array (
            'kode_brng' => 'B000001202',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          496 => 
          array (
            'kode_brng' => 'B000001203',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          497 => 
          array (
            'kode_brng' => 'B000001204',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          498 => 
          array (
            'kode_brng' => 'B000001205',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          499 => 
          array (
            'kode_brng' => 'B000001206',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
        ));
        DB::table('gudangbarang')->insert(array (
          0 => 
          array (
            'kode_brng' => 'B000001207',
            'kd_bangsal' => 'IGD',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          1 => 
          array (
            'kode_brng' => 'B000001208',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          2 => 
          array (
            'kode_brng' => 'B000001209',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          3 => 
          array (
            'kode_brng' => 'B000001211',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          4 => 
          array (
            'kode_brng' => 'B000001212',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          5 => 
          array (
            'kode_brng' => 'B000001213',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          6 => 
          array (
            'kode_brng' => 'B000001214',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          7 => 
          array (
            'kode_brng' => 'B000001215',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          8 => 
          array (
            'kode_brng' => 'B000001216',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          9 => 
          array (
            'kode_brng' => 'B000001217',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          10 => 
          array (
            'kode_brng' => 'B000001218',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          11 => 
          array (
            'kode_brng' => 'B000001219',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          12 => 
          array (
            'kode_brng' => 'B000001222',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          13 => 
          array (
            'kode_brng' => 'B000001223',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          14 => 
          array (
            'kode_brng' => 'B000001224',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          15 => 
          array (
            'kode_brng' => 'B000001225',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          16 => 
          array (
            'kode_brng' => 'B000001228',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          17 => 
          array (
            'kode_brng' => 'B000001229',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          18 => 
          array (
            'kode_brng' => 'B000001230',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          19 => 
          array (
            'kode_brng' => 'B000001231',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          20 => 
          array (
            'kode_brng' => 'B000001233',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          21 => 
          array (
            'kode_brng' => 'B000001234',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          22 => 
          array (
            'kode_brng' => 'B000001235',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          23 => 
          array (
            'kode_brng' => 'B000001236',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          24 => 
          array (
            'kode_brng' => 'B000001237',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          25 => 
          array (
            'kode_brng' => 'B000001238',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          26 => 
          array (
            'kode_brng' => 'B000001239',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          27 => 
          array (
            'kode_brng' => 'B000001240',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          28 => 
          array (
            'kode_brng' => 'B000001241',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          29 => 
          array (
            'kode_brng' => 'B000001242',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          30 => 
          array (
            'kode_brng' => 'B000001243',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          31 => 
          array (
            'kode_brng' => 'B000001245',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          32 => 
          array (
            'kode_brng' => 'B000001246',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          33 => 
          array (
            'kode_brng' => 'B000001247',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          34 => 
          array (
            'kode_brng' => 'B000001248',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          35 => 
          array (
            'kode_brng' => 'B000001249',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          36 => 
          array (
            'kode_brng' => 'B000001250',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          37 => 
          array (
            'kode_brng' => 'B000001251',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          38 => 
          array (
            'kode_brng' => 'B000001252',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          39 => 
          array (
            'kode_brng' => 'B000001253',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          40 => 
          array (
            'kode_brng' => 'B000001255',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          41 => 
          array (
            'kode_brng' => 'B000001256',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          42 => 
          array (
            'kode_brng' => 'B000001257',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          43 => 
          array (
            'kode_brng' => 'B000001259',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          44 => 
          array (
            'kode_brng' => 'B000001261',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          45 => 
          array (
            'kode_brng' => 'B000001262',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          46 => 
          array (
            'kode_brng' => 'B000001264',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          47 => 
          array (
            'kode_brng' => 'B000001265',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          48 => 
          array (
            'kode_brng' => 'B000001266',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          49 => 
          array (
            'kode_brng' => 'B000001267',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          50 => 
          array (
            'kode_brng' => 'B000001268',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          51 => 
          array (
            'kode_brng' => 'B000001269',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          52 => 
          array (
            'kode_brng' => 'B000001270',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          53 => 
          array (
            'kode_brng' => 'B000001271',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          54 => 
          array (
            'kode_brng' => 'B000001272',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          55 => 
          array (
            'kode_brng' => 'B000001273',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          56 => 
          array (
            'kode_brng' => 'B000001275',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          57 => 
          array (
            'kode_brng' => 'B000001276',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          58 => 
          array (
            'kode_brng' => 'B000001278',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          59 => 
          array (
            'kode_brng' => 'B000001279',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          60 => 
          array (
            'kode_brng' => 'B000001280',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          61 => 
          array (
            'kode_brng' => 'B000001281',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          62 => 
          array (
            'kode_brng' => 'B000001282',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          63 => 
          array (
            'kode_brng' => 'B000001283',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          64 => 
          array (
            'kode_brng' => 'B000001284',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          65 => 
          array (
            'kode_brng' => 'B000001286',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          66 => 
          array (
            'kode_brng' => 'B000001287',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          67 => 
          array (
            'kode_brng' => 'B000001288',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          68 => 
          array (
            'kode_brng' => 'B000001289',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          69 => 
          array (
            'kode_brng' => 'B000001290',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          70 => 
          array (
            'kode_brng' => 'B000001291',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          71 => 
          array (
            'kode_brng' => 'B000001292',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          72 => 
          array (
            'kode_brng' => 'B000001293',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          73 => 
          array (
            'kode_brng' => 'B000001296',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          74 => 
          array (
            'kode_brng' => 'B000001297',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          75 => 
          array (
            'kode_brng' => 'B000001298',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          76 => 
          array (
            'kode_brng' => 'B000001300',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          77 => 
          array (
            'kode_brng' => 'B000001301',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          78 => 
          array (
            'kode_brng' => 'B000001303',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          79 => 
          array (
            'kode_brng' => 'B000001304',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          80 => 
          array (
            'kode_brng' => 'B000001305',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          81 => 
          array (
            'kode_brng' => 'B000001306',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          82 => 
          array (
            'kode_brng' => 'B000001308',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          83 => 
          array (
            'kode_brng' => 'B000001309',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          84 => 
          array (
            'kode_brng' => 'B000001310',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          85 => 
          array (
            'kode_brng' => 'B000001311',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          86 => 
          array (
            'kode_brng' => 'B000001312',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          87 => 
          array (
            'kode_brng' => 'B000001313',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          88 => 
          array (
            'kode_brng' => 'B000001315',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          89 => 
          array (
            'kode_brng' => 'B000001316',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          90 => 
          array (
            'kode_brng' => 'B000001317',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          91 => 
          array (
            'kode_brng' => 'B000001318',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          92 => 
          array (
            'kode_brng' => 'B000001319',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          93 => 
          array (
            'kode_brng' => 'B000001320',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          94 => 
          array (
            'kode_brng' => 'B000001321',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          95 => 
          array (
            'kode_brng' => 'B000001322',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          96 => 
          array (
            'kode_brng' => 'B000001323',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          97 => 
          array (
            'kode_brng' => 'B000001324',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          98 => 
          array (
            'kode_brng' => 'B000001325',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          99 => 
          array (
            'kode_brng' => 'B000001326',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          100 => 
          array (
            'kode_brng' => 'B000001327',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          101 => 
          array (
            'kode_brng' => 'B000001328',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          102 => 
          array (
            'kode_brng' => 'B000001329',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          103 => 
          array (
            'kode_brng' => 'B000001331',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          104 => 
          array (
            'kode_brng' => 'B000001332',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          105 => 
          array (
            'kode_brng' => 'B000001333',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          106 => 
          array (
            'kode_brng' => 'B000001334',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          107 => 
          array (
            'kode_brng' => 'B000001335',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          108 => 
          array (
            'kode_brng' => 'B000001337',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          109 => 
          array (
            'kode_brng' => 'B000001338',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          110 => 
          array (
            'kode_brng' => 'B000001339',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          111 => 
          array (
            'kode_brng' => 'B000001342',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          112 => 
          array (
            'kode_brng' => 'B000001345',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          113 => 
          array (
            'kode_brng' => 'B000001346',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          114 => 
          array (
            'kode_brng' => 'B000001347',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          115 => 
          array (
            'kode_brng' => 'B000001348',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          116 => 
          array (
            'kode_brng' => 'B000001350',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          117 => 
          array (
            'kode_brng' => 'B000001350s',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          118 => 
          array (
            'kode_brng' => 'B000001351',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          119 => 
          array (
            'kode_brng' => 'B000001352',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          120 => 
          array (
            'kode_brng' => 'B000001353',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          121 => 
          array (
            'kode_brng' => 'B000001354',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          122 => 
          array (
            'kode_brng' => 'B000001356',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          123 => 
          array (
            'kode_brng' => 'B000001358',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          124 => 
          array (
            'kode_brng' => 'B000001360',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          125 => 
          array (
            'kode_brng' => 'B000001361',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          126 => 
          array (
            'kode_brng' => 'B000001362',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          127 => 
          array (
            'kode_brng' => 'B000001363',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          128 => 
          array (
            'kode_brng' => 'B000001364',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          129 => 
          array (
            'kode_brng' => 'B000001365',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          130 => 
          array (
            'kode_brng' => 'B000001366',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          131 => 
          array (
            'kode_brng' => 'B000001367',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          132 => 
          array (
            'kode_brng' => 'B000001368',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          133 => 
          array (
            'kode_brng' => 'B000001369',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          134 => 
          array (
            'kode_brng' => 'B000001370',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          135 => 
          array (
            'kode_brng' => 'B000001371',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          136 => 
          array (
            'kode_brng' => 'B000001372',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          137 => 
          array (
            'kode_brng' => 'B000001373',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          138 => 
          array (
            'kode_brng' => 'B000001374',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          139 => 
          array (
            'kode_brng' => 'B000001375',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          140 => 
          array (
            'kode_brng' => 'B000001376',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          141 => 
          array (
            'kode_brng' => 'B000001377',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          142 => 
          array (
            'kode_brng' => 'B000001378',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          143 => 
          array (
            'kode_brng' => 'B000001379',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          144 => 
          array (
            'kode_brng' => 'B000001381',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          145 => 
          array (
            'kode_brng' => 'B000001383',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          146 => 
          array (
            'kode_brng' => 'B000001384',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          147 => 
          array (
            'kode_brng' => 'B000001385',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          148 => 
          array (
            'kode_brng' => 'B000001386',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          149 => 
          array (
            'kode_brng' => 'B000001389',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          150 => 
          array (
            'kode_brng' => 'B000001390',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          151 => 
          array (
            'kode_brng' => 'B000001391',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          152 => 
          array (
            'kode_brng' => 'B000001392',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          153 => 
          array (
            'kode_brng' => 'B000001393',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          154 => 
          array (
            'kode_brng' => 'B000001395',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          155 => 
          array (
            'kode_brng' => 'B000001396',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          156 => 
          array (
            'kode_brng' => 'B000001397',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          157 => 
          array (
            'kode_brng' => 'B000001398',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          158 => 
          array (
            'kode_brng' => 'B000001399',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          159 => 
          array (
            'kode_brng' => 'B000001400',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          160 => 
          array (
            'kode_brng' => 'B000001401',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          161 => 
          array (
            'kode_brng' => 'B000001402',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          162 => 
          array (
            'kode_brng' => 'B000001403',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          163 => 
          array (
            'kode_brng' => 'B000001404',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          164 => 
          array (
            'kode_brng' => 'B000001405',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          165 => 
          array (
            'kode_brng' => 'B000001407',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          166 => 
          array (
            'kode_brng' => 'B000001408',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          167 => 
          array (
            'kode_brng' => 'B000001409',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          168 => 
          array (
            'kode_brng' => 'B000001410',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          169 => 
          array (
            'kode_brng' => 'B000001411',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          170 => 
          array (
            'kode_brng' => 'B000001412',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          171 => 
          array (
            'kode_brng' => 'B000001413',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          172 => 
          array (
            'kode_brng' => 'B000001414',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          173 => 
          array (
            'kode_brng' => 'B000001415',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          174 => 
          array (
            'kode_brng' => 'B000001416',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          175 => 
          array (
            'kode_brng' => 'B000001419',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          176 => 
          array (
            'kode_brng' => 'B000001420',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          177 => 
          array (
            'kode_brng' => 'B000001421',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          178 => 
          array (
            'kode_brng' => 'B000001422',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          179 => 
          array (
            'kode_brng' => 'B000001423',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          180 => 
          array (
            'kode_brng' => 'B000001425',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          181 => 
          array (
            'kode_brng' => 'B000001426',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          182 => 
          array (
            'kode_brng' => 'B000001428',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          183 => 
          array (
            'kode_brng' => 'B000001430',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          184 => 
          array (
            'kode_brng' => 'B000001431',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          185 => 
          array (
            'kode_brng' => 'B000001432',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          186 => 
          array (
            'kode_brng' => 'B000001433',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          187 => 
          array (
            'kode_brng' => 'B000001434',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          188 => 
          array (
            'kode_brng' => 'B000001435',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          189 => 
          array (
            'kode_brng' => 'B000001436',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          190 => 
          array (
            'kode_brng' => 'B000001437',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          191 => 
          array (
            'kode_brng' => 'B000001438',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          192 => 
          array (
            'kode_brng' => 'B000001439',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          193 => 
          array (
            'kode_brng' => 'B000001440',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          194 => 
          array (
            'kode_brng' => 'B000001441',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          195 => 
          array (
            'kode_brng' => 'B000001443',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          196 => 
          array (
            'kode_brng' => 'B000001444',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          197 => 
          array (
            'kode_brng' => 'B000001445',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          198 => 
          array (
            'kode_brng' => 'B000001446',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          199 => 
          array (
            'kode_brng' => 'B000001447',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          200 => 
          array (
            'kode_brng' => 'B000001448',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          201 => 
          array (
            'kode_brng' => 'B000001449',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          202 => 
          array (
            'kode_brng' => 'B000001450',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          203 => 
          array (
            'kode_brng' => 'B000001452',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          204 => 
          array (
            'kode_brng' => 'B000001453',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          205 => 
          array (
            'kode_brng' => 'B000001454',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          206 => 
          array (
            'kode_brng' => 'B000001455',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          207 => 
          array (
            'kode_brng' => 'B000001456',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          208 => 
          array (
            'kode_brng' => 'B000001457',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          209 => 
          array (
            'kode_brng' => 'B000001458',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          210 => 
          array (
            'kode_brng' => 'B000001459',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          211 => 
          array (
            'kode_brng' => 'B000001460',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          212 => 
          array (
            'kode_brng' => 'B000001462',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          213 => 
          array (
            'kode_brng' => 'B000001463',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          214 => 
          array (
            'kode_brng' => 'B000001464',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          215 => 
          array (
            'kode_brng' => 'B000001466',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          216 => 
          array (
            'kode_brng' => 'B000001467',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          217 => 
          array (
            'kode_brng' => 'B000001468',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          218 => 
          array (
            'kode_brng' => 'B000001469',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          219 => 
          array (
            'kode_brng' => 'B000001470',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          220 => 
          array (
            'kode_brng' => 'B000001471',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          221 => 
          array (
            'kode_brng' => 'B000001472',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          222 => 
          array (
            'kode_brng' => 'B000001473',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          223 => 
          array (
            'kode_brng' => 'B000001474',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          224 => 
          array (
            'kode_brng' => 'B000001475',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          225 => 
          array (
            'kode_brng' => 'B000001476',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          226 => 
          array (
            'kode_brng' => 'B000001477',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          227 => 
          array (
            'kode_brng' => 'B000001478',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          228 => 
          array (
            'kode_brng' => 'B000001480',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          229 => 
          array (
            'kode_brng' => 'B000001481',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          230 => 
          array (
            'kode_brng' => 'B000001482',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          231 => 
          array (
            'kode_brng' => 'B000001483',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          232 => 
          array (
            'kode_brng' => 'B000001485',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          233 => 
          array (
            'kode_brng' => 'B000001486',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          234 => 
          array (
            'kode_brng' => 'B000001487',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          235 => 
          array (
            'kode_brng' => 'B000001488',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          236 => 
          array (
            'kode_brng' => 'B000001489',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          237 => 
          array (
            'kode_brng' => 'B000001490',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          238 => 
          array (
            'kode_brng' => 'B000001491',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          239 => 
          array (
            'kode_brng' => 'B000001494',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          240 => 
          array (
            'kode_brng' => 'B000001495',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          241 => 
          array (
            'kode_brng' => 'B000001498',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          242 => 
          array (
            'kode_brng' => 'B000001499',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          243 => 
          array (
            'kode_brng' => 'B000001500',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          244 => 
          array (
            'kode_brng' => 'B000001501',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          245 => 
          array (
            'kode_brng' => 'B000001503',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          246 => 
          array (
            'kode_brng' => 'B000001504',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          247 => 
          array (
            'kode_brng' => 'B000001505',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          248 => 
          array (
            'kode_brng' => 'B000001506',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          249 => 
          array (
            'kode_brng' => 'B000001508',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          250 => 
          array (
            'kode_brng' => 'B000001509',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          251 => 
          array (
            'kode_brng' => 'B000001510',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          252 => 
          array (
            'kode_brng' => 'B000001511',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          253 => 
          array (
            'kode_brng' => 'B000001513',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          254 => 
          array (
            'kode_brng' => 'B000001514',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          255 => 
          array (
            'kode_brng' => 'B000001515',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          256 => 
          array (
            'kode_brng' => 'B000001516',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          257 => 
          array (
            'kode_brng' => 'B000001517',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          258 => 
          array (
            'kode_brng' => 'B000001518',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          259 => 
          array (
            'kode_brng' => 'B000001520',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          260 => 
          array (
            'kode_brng' => 'B000001521',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          261 => 
          array (
            'kode_brng' => 'B000001522',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          262 => 
          array (
            'kode_brng' => 'B000001523',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          263 => 
          array (
            'kode_brng' => 'B000001525',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          264 => 
          array (
            'kode_brng' => 'B000001526',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          265 => 
          array (
            'kode_brng' => 'B000001527',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          266 => 
          array (
            'kode_brng' => 'B000001528',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          267 => 
          array (
            'kode_brng' => 'B000001529',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          268 => 
          array (
            'kode_brng' => 'B000001530',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          269 => 
          array (
            'kode_brng' => 'B000001531',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          270 => 
          array (
            'kode_brng' => 'B000001532',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          271 => 
          array (
            'kode_brng' => 'B000001533',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          272 => 
          array (
            'kode_brng' => 'B000001534',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          273 => 
          array (
            'kode_brng' => 'B000001535',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          274 => 
          array (
            'kode_brng' => 'B000001536',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          275 => 
          array (
            'kode_brng' => 'B000001537',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          276 => 
          array (
            'kode_brng' => 'B000001538',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          277 => 
          array (
            'kode_brng' => 'B000001539',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          278 => 
          array (
            'kode_brng' => 'B000001540',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          279 => 
          array (
            'kode_brng' => 'B000001541',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          280 => 
          array (
            'kode_brng' => 'B000001542',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          281 => 
          array (
            'kode_brng' => 'B000001543',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          282 => 
          array (
            'kode_brng' => 'B000001544',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          283 => 
          array (
            'kode_brng' => 'B000001545',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          284 => 
          array (
            'kode_brng' => 'B000001546',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          285 => 
          array (
            'kode_brng' => 'B000001547',
            'kd_bangsal' => 'IGD',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          286 => 
          array (
            'kode_brng' => 'B000001548',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          287 => 
          array (
            'kode_brng' => 'B000001549',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          288 => 
          array (
            'kode_brng' => 'B000001550',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          289 => 
          array (
            'kode_brng' => 'B000001553',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          290 => 
          array (
            'kode_brng' => 'B000001554',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          291 => 
          array (
            'kode_brng' => 'B000001555',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          292 => 
          array (
            'kode_brng' => 'B000001557',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          293 => 
          array (
            'kode_brng' => 'B000001558',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          294 => 
          array (
            'kode_brng' => 'B000001559',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          295 => 
          array (
            'kode_brng' => 'B000001560',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          296 => 
          array (
            'kode_brng' => 'B000001561',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          297 => 
          array (
            'kode_brng' => 'B000001562',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          298 => 
          array (
            'kode_brng' => 'B000001563',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          299 => 
          array (
            'kode_brng' => 'B000001564',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          300 => 
          array (
            'kode_brng' => 'B000001565',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          301 => 
          array (
            'kode_brng' => 'B000001566',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          302 => 
          array (
            'kode_brng' => 'B000001568',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          303 => 
          array (
            'kode_brng' => 'B000001569',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          304 => 
          array (
            'kode_brng' => 'B000001570',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          305 => 
          array (
            'kode_brng' => 'B000001571',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          306 => 
          array (
            'kode_brng' => 'B000001572',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          307 => 
          array (
            'kode_brng' => 'B000001573',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          308 => 
          array (
            'kode_brng' => 'B000001574',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          309 => 
          array (
            'kode_brng' => 'B000001575',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          310 => 
          array (
            'kode_brng' => 'B000001576',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          311 => 
          array (
            'kode_brng' => 'B000001578',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          312 => 
          array (
            'kode_brng' => 'B000001580',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          313 => 
          array (
            'kode_brng' => 'B000001581',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          314 => 
          array (
            'kode_brng' => 'B000001582',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          315 => 
          array (
            'kode_brng' => 'B000001584',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          316 => 
          array (
            'kode_brng' => 'B000001585',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          317 => 
          array (
            'kode_brng' => 'B000001588',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          318 => 
          array (
            'kode_brng' => 'B000001589',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          319 => 
          array (
            'kode_brng' => 'B000001590',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          320 => 
          array (
            'kode_brng' => 'B000001591',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          321 => 
          array (
            'kode_brng' => 'B000001592',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          322 => 
          array (
            'kode_brng' => 'B000001593',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          323 => 
          array (
            'kode_brng' => 'B000001594',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          324 => 
          array (
            'kode_brng' => 'B000001595',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          325 => 
          array (
            'kode_brng' => 'B000001598',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          326 => 
          array (
            'kode_brng' => 'B000001599',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          327 => 
          array (
            'kode_brng' => 'B000001600',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          328 => 
          array (
            'kode_brng' => 'B000001601',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          329 => 
          array (
            'kode_brng' => 'B000001604',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          330 => 
          array (
            'kode_brng' => 'B000001605',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          331 => 
          array (
            'kode_brng' => 'B000001606',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          332 => 
          array (
            'kode_brng' => 'B000001607',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          333 => 
          array (
            'kode_brng' => 'B000001608',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          334 => 
          array (
            'kode_brng' => 'B000001609',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          335 => 
          array (
            'kode_brng' => 'B000001610',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          336 => 
          array (
            'kode_brng' => 'B000001611',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          337 => 
          array (
            'kode_brng' => 'B000001613',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          338 => 
          array (
            'kode_brng' => 'B000001614',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          339 => 
          array (
            'kode_brng' => 'B000001615',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          340 => 
          array (
            'kode_brng' => 'B000001616',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          341 => 
          array (
            'kode_brng' => 'B000001617',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          342 => 
          array (
            'kode_brng' => 'B000001618',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          343 => 
          array (
            'kode_brng' => 'B000001619',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          344 => 
          array (
            'kode_brng' => 'B000001620',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          345 => 
          array (
            'kode_brng' => 'B000001621',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          346 => 
          array (
            'kode_brng' => 'B000001622',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          347 => 
          array (
            'kode_brng' => 'B000001623',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          348 => 
          array (
            'kode_brng' => 'B000001624',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          349 => 
          array (
            'kode_brng' => 'B000001625',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          350 => 
          array (
            'kode_brng' => 'B000001626',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          351 => 
          array (
            'kode_brng' => 'B000001627',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          352 => 
          array (
            'kode_brng' => 'B000001628',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          353 => 
          array (
            'kode_brng' => 'B000001629',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          354 => 
          array (
            'kode_brng' => 'B000001630',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          355 => 
          array (
            'kode_brng' => 'B000001631',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          356 => 
          array (
            'kode_brng' => 'B000001633',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          357 => 
          array (
            'kode_brng' => 'B000001634',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          358 => 
          array (
            'kode_brng' => 'B000001635',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          359 => 
          array (
            'kode_brng' => 'B000001636',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          360 => 
          array (
            'kode_brng' => 'B000001637',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          361 => 
          array (
            'kode_brng' => 'B000001638',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          362 => 
          array (
            'kode_brng' => 'B000001640',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          363 => 
          array (
            'kode_brng' => 'B000001641',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          364 => 
          array (
            'kode_brng' => 'B000001642',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          365 => 
          array (
            'kode_brng' => 'B000001643',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          366 => 
          array (
            'kode_brng' => 'B000001644',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          367 => 
          array (
            'kode_brng' => 'B000001645',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          368 => 
          array (
            'kode_brng' => 'B000001646',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          369 => 
          array (
            'kode_brng' => 'B000001647',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          370 => 
          array (
            'kode_brng' => 'B000001648',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          371 => 
          array (
            'kode_brng' => 'B000001649',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          372 => 
          array (
            'kode_brng' => 'B000001650',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          373 => 
          array (
            'kode_brng' => 'B000001651',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          374 => 
          array (
            'kode_brng' => 'B000001652',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          375 => 
          array (
            'kode_brng' => 'B000001653',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          376 => 
          array (
            'kode_brng' => 'B000001657',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          377 => 
          array (
            'kode_brng' => 'B000001658',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          378 => 
          array (
            'kode_brng' => 'B000001660',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          379 => 
          array (
            'kode_brng' => 'B000001661',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          380 => 
          array (
            'kode_brng' => 'B000001662',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          381 => 
          array (
            'kode_brng' => 'B000001663',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          382 => 
          array (
            'kode_brng' => 'B000001664',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          383 => 
          array (
            'kode_brng' => 'B000001665',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          384 => 
          array (
            'kode_brng' => 'B000001666',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          385 => 
          array (
            'kode_brng' => 'B000001667',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          386 => 
          array (
            'kode_brng' => 'B000001668',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          387 => 
          array (
            'kode_brng' => 'B000001669',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          388 => 
          array (
            'kode_brng' => 'B000001670',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          389 => 
          array (
            'kode_brng' => 'B000001671',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          390 => 
          array (
            'kode_brng' => 'B000001672',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          391 => 
          array (
            'kode_brng' => 'B000001673',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          392 => 
          array (
            'kode_brng' => 'B000001674',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          393 => 
          array (
            'kode_brng' => 'B000001675',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          394 => 
          array (
            'kode_brng' => 'B000001676',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          395 => 
          array (
            'kode_brng' => 'B000001678',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          396 => 
          array (
            'kode_brng' => 'B000001679',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          397 => 
          array (
            'kode_brng' => 'B000001681',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          398 => 
          array (
            'kode_brng' => 'B000001682',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          399 => 
          array (
            'kode_brng' => 'B000001683',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          400 => 
          array (
            'kode_brng' => 'B000001684',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          401 => 
          array (
            'kode_brng' => 'B000001685',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          402 => 
          array (
            'kode_brng' => 'B000001687',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          403 => 
          array (
            'kode_brng' => 'B000001688',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          404 => 
          array (
            'kode_brng' => 'B000001690',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          405 => 
          array (
            'kode_brng' => 'B000001691',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          406 => 
          array (
            'kode_brng' => 'B000001692',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          407 => 
          array (
            'kode_brng' => 'B000001693',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          408 => 
          array (
            'kode_brng' => 'B000001694',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          409 => 
          array (
            'kode_brng' => 'B000001695',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          410 => 
          array (
            'kode_brng' => 'B000001696',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          411 => 
          array (
            'kode_brng' => 'B000001697',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          412 => 
          array (
            'kode_brng' => 'B000001699',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          413 => 
          array (
            'kode_brng' => 'B000001701',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          414 => 
          array (
            'kode_brng' => 'B000001702',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          415 => 
          array (
            'kode_brng' => 'B000001703',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          416 => 
          array (
            'kode_brng' => 'B000001705',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          417 => 
          array (
            'kode_brng' => 'B000001706',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          418 => 
          array (
            'kode_brng' => 'B000001707',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          419 => 
          array (
            'kode_brng' => 'B000001708',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          420 => 
          array (
            'kode_brng' => 'B000001709',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          421 => 
          array (
            'kode_brng' => 'B000001710',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          422 => 
          array (
            'kode_brng' => 'B000001711',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          423 => 
          array (
            'kode_brng' => 'B000001712',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          424 => 
          array (
            'kode_brng' => 'B000001713',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          425 => 
          array (
            'kode_brng' => 'B000001714',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          426 => 
          array (
            'kode_brng' => 'B000001715',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          427 => 
          array (
            'kode_brng' => 'B000001716',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          428 => 
          array (
            'kode_brng' => 'B000001717',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          429 => 
          array (
            'kode_brng' => 'B000001718',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          430 => 
          array (
            'kode_brng' => 'B000001720',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          431 => 
          array (
            'kode_brng' => 'B000001721',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          432 => 
          array (
            'kode_brng' => 'B000001722',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          433 => 
          array (
            'kode_brng' => 'B000001723',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          434 => 
          array (
            'kode_brng' => 'B000001724',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          435 => 
          array (
            'kode_brng' => 'B000001725',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          436 => 
          array (
            'kode_brng' => 'B000001726',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          437 => 
          array (
            'kode_brng' => 'B000001727',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          438 => 
          array (
            'kode_brng' => 'B000001728',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          439 => 
          array (
            'kode_brng' => 'B000001730',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          440 => 
          array (
            'kode_brng' => 'B000001731',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          441 => 
          array (
            'kode_brng' => 'B000001732',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          442 => 
          array (
            'kode_brng' => 'B000001733',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          443 => 
          array (
            'kode_brng' => 'B000001736',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          444 => 
          array (
            'kode_brng' => 'B000001737',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          445 => 
          array (
            'kode_brng' => 'B000001738',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          446 => 
          array (
            'kode_brng' => 'B000001739',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          447 => 
          array (
            'kode_brng' => 'B000001740',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          448 => 
          array (
            'kode_brng' => 'B000001741',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          449 => 
          array (
            'kode_brng' => 'B000001742',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          450 => 
          array (
            'kode_brng' => 'B000001743',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          451 => 
          array (
            'kode_brng' => 'B000001744',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          452 => 
          array (
            'kode_brng' => 'B000001745',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          453 => 
          array (
            'kode_brng' => 'B000001747',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          454 => 
          array (
            'kode_brng' => 'B000001748',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          455 => 
          array (
            'kode_brng' => 'B000001749',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          456 => 
          array (
            'kode_brng' => 'B000001750',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          457 => 
          array (
            'kode_brng' => 'B000001751',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          458 => 
          array (
            'kode_brng' => 'B000001752',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          459 => 
          array (
            'kode_brng' => 'B000001753',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          460 => 
          array (
            'kode_brng' => 'B000001754',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          461 => 
          array (
            'kode_brng' => 'B000001755',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          462 => 
          array (
            'kode_brng' => 'B000001756',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          463 => 
          array (
            'kode_brng' => 'B000001757',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          464 => 
          array (
            'kode_brng' => 'B000001758',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          465 => 
          array (
            'kode_brng' => 'B000001759',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          466 => 
          array (
            'kode_brng' => 'B000001760',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          467 => 
          array (
            'kode_brng' => 'B000001761',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          468 => 
          array (
            'kode_brng' => 'B000001763',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          469 => 
          array (
            'kode_brng' => 'B000001764',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          470 => 
          array (
            'kode_brng' => 'B000001765',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          471 => 
          array (
            'kode_brng' => 'B000001766',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          472 => 
          array (
            'kode_brng' => 'B000001769',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          473 => 
          array (
            'kode_brng' => 'B000001770',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          474 => 
          array (
            'kode_brng' => 'B000001771',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          475 => 
          array (
            'kode_brng' => 'B000001772',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          476 => 
          array (
            'kode_brng' => 'B000001773',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          477 => 
          array (
            'kode_brng' => 'B000001774',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          478 => 
          array (
            'kode_brng' => 'B000001775',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          479 => 
          array (
            'kode_brng' => 'B000001776',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          480 => 
          array (
            'kode_brng' => 'B000001778',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          481 => 
          array (
            'kode_brng' => 'B000001779',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          482 => 
          array (
            'kode_brng' => 'B000001784',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          483 => 
          array (
            'kode_brng' => 'B000001786',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          484 => 
          array (
            'kode_brng' => 'B000001787',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          485 => 
          array (
            'kode_brng' => 'B000001788',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          486 => 
          array (
            'kode_brng' => 'B000001789',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          487 => 
          array (
            'kode_brng' => 'B000001790',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          488 => 
          array (
            'kode_brng' => 'B000001791',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          489 => 
          array (
            'kode_brng' => 'B000001792',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          490 => 
          array (
            'kode_brng' => 'B000001793',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          491 => 
          array (
            'kode_brng' => 'B000001794',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          492 => 
          array (
            'kode_brng' => 'B000001795',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          493 => 
          array (
            'kode_brng' => 'B000001796',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          494 => 
          array (
            'kode_brng' => 'B000001797',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          495 => 
          array (
            'kode_brng' => 'B000001799',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          496 => 
          array (
            'kode_brng' => 'B000001800',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          497 => 
          array (
            'kode_brng' => 'B000001802',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          498 => 
          array (
            'kode_brng' => 'B000001803',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          499 => 
          array (
            'kode_brng' => 'B000001804',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
        ));
        DB::table('gudangbarang')->insert(array (
          0 => 
          array (
            'kode_brng' => 'B000001806',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          1 => 
          array (
            'kode_brng' => 'B000001807',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          2 => 
          array (
            'kode_brng' => 'B000001808',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          3 => 
          array (
            'kode_brng' => 'B000001810',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          4 => 
          array (
            'kode_brng' => 'B000001811',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          5 => 
          array (
            'kode_brng' => 'B000001813',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          6 => 
          array (
            'kode_brng' => 'B000001814',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          7 => 
          array (
            'kode_brng' => 'B000001815',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          8 => 
          array (
            'kode_brng' => 'B000001816',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          9 => 
          array (
            'kode_brng' => 'B000001817',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          10 => 
          array (
            'kode_brng' => 'B000001818',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          11 => 
          array (
            'kode_brng' => 'B000001819',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          12 => 
          array (
            'kode_brng' => 'B000001820',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          13 => 
          array (
            'kode_brng' => 'B000001821',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          14 => 
          array (
            'kode_brng' => 'B000001822',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          15 => 
          array (
            'kode_brng' => 'B000001823',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          16 => 
          array (
            'kode_brng' => 'B000001824',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          17 => 
          array (
            'kode_brng' => 'B000001825',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          18 => 
          array (
            'kode_brng' => 'B000001826',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          19 => 
          array (
            'kode_brng' => 'B000001827',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          20 => 
          array (
            'kode_brng' => 'B000001829',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          21 => 
          array (
            'kode_brng' => 'B000001831',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          22 => 
          array (
            'kode_brng' => 'B000001832',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          23 => 
          array (
            'kode_brng' => 'B000001833',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          24 => 
          array (
            'kode_brng' => 'B000001834',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          25 => 
          array (
            'kode_brng' => 'B000001835',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          26 => 
          array (
            'kode_brng' => 'B000001836',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          27 => 
          array (
            'kode_brng' => 'B000001837',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          28 => 
          array (
            'kode_brng' => 'B000001838',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          29 => 
          array (
            'kode_brng' => 'B000001839',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          30 => 
          array (
            'kode_brng' => 'B000001840',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          31 => 
          array (
            'kode_brng' => 'B000001841',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          32 => 
          array (
            'kode_brng' => 'B000001842',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          33 => 
          array (
            'kode_brng' => 'B000001843',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          34 => 
          array (
            'kode_brng' => 'B000001844',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          35 => 
          array (
            'kode_brng' => 'B000001845',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          36 => 
          array (
            'kode_brng' => 'B000001846',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          37 => 
          array (
            'kode_brng' => 'B000001847',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          38 => 
          array (
            'kode_brng' => 'B000001848',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          39 => 
          array (
            'kode_brng' => 'B000001849',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          40 => 
          array (
            'kode_brng' => 'B000001850',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          41 => 
          array (
            'kode_brng' => 'B000001851',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          42 => 
          array (
            'kode_brng' => 'B000001852',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          43 => 
          array (
            'kode_brng' => 'B000001854',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          44 => 
          array (
            'kode_brng' => 'B000001855',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          45 => 
          array (
            'kode_brng' => 'B000001857',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          46 => 
          array (
            'kode_brng' => 'B000001858',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          47 => 
          array (
            'kode_brng' => 'B00000186',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          48 => 
          array (
            'kode_brng' => 'B000001861',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          49 => 
          array (
            'kode_brng' => 'B000001862',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          50 => 
          array (
            'kode_brng' => 'B000001863',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          51 => 
          array (
            'kode_brng' => 'B000001864',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          52 => 
          array (
            'kode_brng' => 'B000001865',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          53 => 
          array (
            'kode_brng' => 'B000001866',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          54 => 
          array (
            'kode_brng' => 'B000001867',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          55 => 
          array (
            'kode_brng' => 'B000001868',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          56 => 
          array (
            'kode_brng' => 'B000001869',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          57 => 
          array (
            'kode_brng' => 'B000001870',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          58 => 
          array (
            'kode_brng' => 'B000001872',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          59 => 
          array (
            'kode_brng' => 'B000001873',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          60 => 
          array (
            'kode_brng' => 'B000001874',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          61 => 
          array (
            'kode_brng' => 'B000001879',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          62 => 
          array (
            'kode_brng' => 'B000001881',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          63 => 
          array (
            'kode_brng' => 'B000001882',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          64 => 
          array (
            'kode_brng' => 'B000001883',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          65 => 
          array (
            'kode_brng' => 'B000001884',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          66 => 
          array (
            'kode_brng' => 'B000001886',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          67 => 
          array (
            'kode_brng' => 'B000001887',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          68 => 
          array (
            'kode_brng' => 'B000001888',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          69 => 
          array (
            'kode_brng' => 'B000001889',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          70 => 
          array (
            'kode_brng' => 'B000001890',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          71 => 
          array (
            'kode_brng' => 'B000001891',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          72 => 
          array (
            'kode_brng' => 'B000001892',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          73 => 
          array (
            'kode_brng' => 'B000001893',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          74 => 
          array (
            'kode_brng' => 'B000001894',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          75 => 
          array (
            'kode_brng' => 'B000001895',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          76 => 
          array (
            'kode_brng' => 'B000001896',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          77 => 
          array (
            'kode_brng' => 'B000001897',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          78 => 
          array (
            'kode_brng' => 'B000001899',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          79 => 
          array (
            'kode_brng' => 'B000001900',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          80 => 
          array (
            'kode_brng' => 'B000001901',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          81 => 
          array (
            'kode_brng' => 'B000001903',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          82 => 
          array (
            'kode_brng' => 'B000001904',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          83 => 
          array (
            'kode_brng' => 'B000001905',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          84 => 
          array (
            'kode_brng' => 'B000001906',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          85 => 
          array (
            'kode_brng' => 'B000001907',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          86 => 
          array (
            'kode_brng' => 'B000001909',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          87 => 
          array (
            'kode_brng' => 'B000001910',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          88 => 
          array (
            'kode_brng' => 'B000001911',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          89 => 
          array (
            'kode_brng' => 'B000001912',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          90 => 
          array (
            'kode_brng' => 'B000001913',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          91 => 
          array (
            'kode_brng' => 'B000001914',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          92 => 
          array (
            'kode_brng' => 'B000001915',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          93 => 
          array (
            'kode_brng' => 'B000001916',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          94 => 
          array (
            'kode_brng' => 'B000001917',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          95 => 
          array (
            'kode_brng' => 'B000001918',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          96 => 
          array (
            'kode_brng' => 'B000001919',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          97 => 
          array (
            'kode_brng' => 'B000001920',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          98 => 
          array (
            'kode_brng' => 'B000001921',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          99 => 
          array (
            'kode_brng' => 'B000001922',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          100 => 
          array (
            'kode_brng' => 'B000001923',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          101 => 
          array (
            'kode_brng' => 'B000001924',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          102 => 
          array (
            'kode_brng' => 'B000001925',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          103 => 
          array (
            'kode_brng' => 'B000001927',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          104 => 
          array (
            'kode_brng' => 'B000001928',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          105 => 
          array (
            'kode_brng' => 'B000001929',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          106 => 
          array (
            'kode_brng' => 'B000001931',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          107 => 
          array (
            'kode_brng' => 'B000001932',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          108 => 
          array (
            'kode_brng' => 'B000001933',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          109 => 
          array (
            'kode_brng' => 'B000001934',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          110 => 
          array (
            'kode_brng' => 'B000001935',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          111 => 
          array (
            'kode_brng' => 'B000001936',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          112 => 
          array (
            'kode_brng' => 'B000001937',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          113 => 
          array (
            'kode_brng' => 'B000001938',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          114 => 
          array (
            'kode_brng' => 'B000001939',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          115 => 
          array (
            'kode_brng' => 'B000001942',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          116 => 
          array (
            'kode_brng' => 'B000001944',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          117 => 
          array (
            'kode_brng' => 'B000001945',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          118 => 
          array (
            'kode_brng' => 'B000001946',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          119 => 
          array (
            'kode_brng' => 'B000001947',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          120 => 
          array (
            'kode_brng' => 'B000001948',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          121 => 
          array (
            'kode_brng' => 'B000001949',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          122 => 
          array (
            'kode_brng' => 'B000001952',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          123 => 
          array (
            'kode_brng' => 'B000001953',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          124 => 
          array (
            'kode_brng' => 'B000001954',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          125 => 
          array (
            'kode_brng' => 'B000001955',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          126 => 
          array (
            'kode_brng' => 'B000001956',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          127 => 
          array (
            'kode_brng' => 'B000001957',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          128 => 
          array (
            'kode_brng' => 'B000001958',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          129 => 
          array (
            'kode_brng' => 'B000001959',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          130 => 
          array (
            'kode_brng' => 'B000001960',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          131 => 
          array (
            'kode_brng' => 'B000001961',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          132 => 
          array (
            'kode_brng' => 'B000001962',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          133 => 
          array (
            'kode_brng' => 'B000001963',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          134 => 
          array (
            'kode_brng' => 'B000001964',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          135 => 
          array (
            'kode_brng' => 'B000001965',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          136 => 
          array (
            'kode_brng' => 'B000001966',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          137 => 
          array (
            'kode_brng' => 'B000001967',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          138 => 
          array (
            'kode_brng' => 'B000001968',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          139 => 
          array (
            'kode_brng' => 'B000001969',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          140 => 
          array (
            'kode_brng' => 'B000001970',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          141 => 
          array (
            'kode_brng' => 'B000001971',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          142 => 
          array (
            'kode_brng' => 'B000001972',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          143 => 
          array (
            'kode_brng' => 'B000001973',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          144 => 
          array (
            'kode_brng' => 'B000001974',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          145 => 
          array (
            'kode_brng' => 'B000001976',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          146 => 
          array (
            'kode_brng' => 'B000001977',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          147 => 
          array (
            'kode_brng' => 'B000001978',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          148 => 
          array (
            'kode_brng' => 'B000001981',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          149 => 
          array (
            'kode_brng' => 'B000001982',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          150 => 
          array (
            'kode_brng' => 'B000001983',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          151 => 
          array (
            'kode_brng' => 'B000001984',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          152 => 
          array (
            'kode_brng' => 'B000001985',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          153 => 
          array (
            'kode_brng' => 'B000001986',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          154 => 
          array (
            'kode_brng' => 'B000001987',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          155 => 
          array (
            'kode_brng' => 'B000001988',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          156 => 
          array (
            'kode_brng' => 'B000001989',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          157 => 
          array (
            'kode_brng' => 'B000001990',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          158 => 
          array (
            'kode_brng' => 'B000001991',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          159 => 
          array (
            'kode_brng' => 'B000001992',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          160 => 
          array (
            'kode_brng' => 'B000001993',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          161 => 
          array (
            'kode_brng' => 'B000001994',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          162 => 
          array (
            'kode_brng' => 'B000001995',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          163 => 
          array (
            'kode_brng' => 'B000001996',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          164 => 
          array (
            'kode_brng' => 'B000001997',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          165 => 
          array (
            'kode_brng' => 'B000001998',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          166 => 
          array (
            'kode_brng' => 'B000001999',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          167 => 
          array (
            'kode_brng' => 'B000002000',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          168 => 
          array (
            'kode_brng' => 'B000002001',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          169 => 
          array (
            'kode_brng' => 'B000002002',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          170 => 
          array (
            'kode_brng' => 'B000002003',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          171 => 
          array (
            'kode_brng' => 'B000002004',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          172 => 
          array (
            'kode_brng' => 'B000002005',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          173 => 
          array (
            'kode_brng' => 'B000002006',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          174 => 
          array (
            'kode_brng' => 'B000002007',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          175 => 
          array (
            'kode_brng' => 'B000002008',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          176 => 
          array (
            'kode_brng' => 'B000002009',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          177 => 
          array (
            'kode_brng' => 'B000002010',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          178 => 
          array (
            'kode_brng' => 'B000002011',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          179 => 
          array (
            'kode_brng' => 'B000002012',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          180 => 
          array (
            'kode_brng' => 'B000002013',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          181 => 
          array (
            'kode_brng' => 'B000002015',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          182 => 
          array (
            'kode_brng' => 'B000002016',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          183 => 
          array (
            'kode_brng' => 'B000002017',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          184 => 
          array (
            'kode_brng' => 'B000002018',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          185 => 
          array (
            'kode_brng' => 'B000002019',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          186 => 
          array (
            'kode_brng' => 'B000002020',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          187 => 
          array (
            'kode_brng' => 'B000002021',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          188 => 
          array (
            'kode_brng' => 'B000002022',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          189 => 
          array (
            'kode_brng' => 'B000002023',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          190 => 
          array (
            'kode_brng' => 'B000002024',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          191 => 
          array (
            'kode_brng' => 'B000002025',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          192 => 
          array (
            'kode_brng' => 'B000002026',
            'kd_bangsal' => 'IGD',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          193 => 
          array (
            'kode_brng' => 'B000002027',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          194 => 
          array (
            'kode_brng' => 'B000002028',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          195 => 
          array (
            'kode_brng' => 'B000002029',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          196 => 
          array (
            'kode_brng' => 'B000002030',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          197 => 
          array (
            'kode_brng' => 'B000002031',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          198 => 
          array (
            'kode_brng' => 'B000002034',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          199 => 
          array (
            'kode_brng' => 'B000002037',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          200 => 
          array (
            'kode_brng' => 'B000008002',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          201 => 
          array (
            'kode_brng' => 'B000008003',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          202 => 
          array (
            'kode_brng' => 'B000008004',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          203 => 
          array (
            'kode_brng' => 'B000008005',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          204 => 
          array (
            'kode_brng' => 'B000008006',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          205 => 
          array (
            'kode_brng' => 'B000008007',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          206 => 
          array (
            'kode_brng' => 'B000008008',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          207 => 
          array (
            'kode_brng' => 'B000008009',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          208 => 
          array (
            'kode_brng' => 'B000008011',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          209 => 
          array (
            'kode_brng' => 'B000008012',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          210 => 
          array (
            'kode_brng' => 'B000008013',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          211 => 
          array (
            'kode_brng' => 'B000008014',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          212 => 
          array (
            'kode_brng' => 'B000008015',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          213 => 
          array (
            'kode_brng' => 'B000008016',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          214 => 
          array (
            'kode_brng' => 'B000008017',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          215 => 
          array (
            'kode_brng' => 'B000008018',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          216 => 
          array (
            'kode_brng' => 'B000008020',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          217 => 
          array (
            'kode_brng' => 'C000000001',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          218 => 
          array (
            'kode_brng' => 'C000000002',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          219 => 
          array (
            'kode_brng' => 'C000000003',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          220 => 
          array (
            'kode_brng' => 'C000000004',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          221 => 
          array (
            'kode_brng' => 'C000000005',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          222 => 
          array (
            'kode_brng' => 'C000000006',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          223 => 
          array (
            'kode_brng' => 'C000000007',
            'kd_bangsal' => 'AP',
            'stok' => 0.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          224 => 
          array (
            'kode_brng' => '2018001',
            'kd_bangsal' => '-',
            'stok' => 1.0,
            'no_batch' => 'BATCH001',
            'no_faktur' => 'PB-20251203-001',
          ),
          225 => 
          array (
            'kode_brng' => '2018001',
            'kd_bangsal' => '-',
            'stok' => 1.0,
            'no_batch' => 'BATCHTEST',
            'no_faktur' => 'PB-20251204-003',
          ),
          226 => 
          array (
            'kode_brng' => 'A000000002',
            'kd_bangsal' => 'B0014',
            'stok' => 1.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          227 => 
          array (
            'kode_brng' => 'A000000004',
            'kd_bangsal' => 'B0014',
            'stok' => 1.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          228 => 
          array (
            'kode_brng' => 'B000001314',
            'kd_bangsal' => 'VIP',
            'stok' => 1.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          229 => 
          array (
            'kode_brng' => 'B000001780',
            'kd_bangsal' => 'B0014',
            'stok' => 1.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          230 => 
          array (
            'kode_brng' => 'B000001780',
            'kd_bangsal' => 'K1',
            'stok' => 1.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          231 => 
          array (
            'kode_brng' => 'B000001782',
            'kd_bangsal' => 'VIP',
            'stok' => 1.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          232 => 
          array (
            'kode_brng' => 'B000001783',
            'kd_bangsal' => 'K1',
            'stok' => 1.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          233 => 
          array (
            'kode_brng' => 'B000008024',
            'kd_bangsal' => 'B0014',
            'stok' => 1.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          234 => 
          array (
            'kode_brng' => '2018001',
            'kd_bangsal' => '-',
            'stok' => 2.0,
            'no_batch' => 'BATCH001',
            'no_faktur' => 'PB-20251202-001',
          ),
          235 => 
          array (
            'kode_brng' => '2018003',
            'kd_bangsal' => 'AP',
            'stok' => 2.0,
            'no_batch' => '123',
            'no_faktur' => 'HO20191228001',
          ),
          236 => 
          array (
            'kode_brng' => 'A000000002',
            'kd_bangsal' => 'KO',
            'stok' => 2.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          237 => 
          array (
            'kode_brng' => 'B000000557',
            'kd_bangsal' => 'GD',
            'stok' => 2.0,
            'no_batch' => '1234',
            'no_faktur' => 'PB20200623001',
          ),
          238 => 
          array (
            'kode_brng' => 'B000000790',
            'kd_bangsal' => 'AP',
            'stok' => 2.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          239 => 
          array (
            'kode_brng' => 'B000001394',
            'kd_bangsal' => 'B0014',
            'stok' => 2.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          240 => 
          array (
            'kode_brng' => 'B000001394',
            'kd_bangsal' => 'VIP',
            'stok' => 2.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          241 => 
          array (
            'kode_brng' => 'B000001597',
            'kd_bangsal' => 'GD',
            'stok' => 2.0,
            'no_batch' => '178',
            'no_faktur' => 'PB20200623001',
          ),
          242 => 
          array (
            'kode_brng' => 'B000001781',
            'kd_bangsal' => 'B0014',
            'stok' => 2.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          243 => 
          array (
            'kode_brng' => 'B000001781',
            'kd_bangsal' => 'VIP',
            'stok' => 2.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          244 => 
          array (
            'kode_brng' => 'B000001878',
            'kd_bangsal' => 'GD',
            'stok' => 2.0,
            'no_batch' => '189',
            'no_faktur' => 'PB20200623001',
          ),
          245 => 
          array (
            'kode_brng' => 'B000002026',
            'kd_bangsal' => 'GD',
            'stok' => 2.0,
            'no_batch' => '1456',
            'no_faktur' => 'PB20200623001',
          ),
          246 => 
          array (
            'kode_brng' => 'A000000004',
            'kd_bangsal' => 'IGD',
            'stok' => 3.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          247 => 
          array (
            'kode_brng' => 'B000001314',
            'kd_bangsal' => 'B0014',
            'stok' => 3.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          248 => 
          array (
            'kode_brng' => 'B000001780',
            'kd_bangsal' => 'VIP',
            'stok' => 3.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          249 => 
          array (
            'kode_brng' => 'B000001783',
            'kd_bangsal' => 'VIP',
            'stok' => 3.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          250 => 
          array (
            'kode_brng' => 'B000000571',
            'kd_bangsal' => 'AP',
            'stok' => 3.600000000000000088817841970012523233890533447265625,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          251 => 
          array (
            'kode_brng' => 'A000000002',
            'kd_bangsal' => 'K1',
            'stok' => 4.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          252 => 
          array (
            'kode_brng' => 'A000000003',
            'kd_bangsal' => 'IGD',
            'stok' => 4.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          253 => 
          array (
            'kode_brng' => 'B000000003',
            'kd_bangsal' => 'AP',
            'stok' => 4.0,
            'no_batch' => '1',
            'no_faktur' => 'PB20191230001',
          ),
          254 => 
          array (
            'kode_brng' => 'B000001496',
            'kd_bangsal' => 'K1',
            'stok' => 4.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          255 => 
          array (
            'kode_brng' => '2018001',
            'kd_bangsal' => '-',
            'stok' => 5.0,
            'no_batch' => 'BATCH-TEST-001',
            'no_faktur' => 'TEST-FAKTUR-2025-12-',
          ),
          256 => 
          array (
            'kode_brng' => '2018001',
            'kd_bangsal' => '-',
            'stok' => 5.0,
            'no_batch' => 'TESTBATCH001',
            'no_faktur' => 'PB-20251203-002',
          ),
          257 => 
          array (
            'kode_brng' => '2018001',
            'kd_bangsal' => 'AP',
            'stok' => 5.0,
            'no_batch' => '1',
            'no_faktur' => 'PB20191230001',
          ),
          258 => 
          array (
            'kode_brng' => 'B000000001',
            'kd_bangsal' => 'AP',
            'stok' => 5.0,
            'no_batch' => 'BATCH001',
            'no_faktur' => 'PB-TEST-001',
          ),
          259 => 
          array (
            'kode_brng' => 'B000000305',
            'kd_bangsal' => 'AP',
            'stok' => 5.0,
            'no_batch' => '1',
            'no_faktur' => 'PB20191230001',
          ),
          260 => 
          array (
            'kode_brng' => 'B000000554',
            'kd_bangsal' => 'AP',
            'stok' => 5.0,
            'no_batch' => '1',
            'no_faktur' => 'PB20191230001',
          ),
          261 => 
          array (
            'kode_brng' => 'B000000554',
            'kd_bangsal' => 'AP',
            'stok' => 5.0,
            'no_batch' => '3',
            'no_faktur' => 'PB20191215006',
          ),
          262 => 
          array (
            'kode_brng' => 'B000000557',
            'kd_bangsal' => 'ICU',
            'stok' => 5.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          263 => 
          array (
            'kode_brng' => 'B000000676',
            'kd_bangsal' => 'GD',
            'stok' => 5.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          264 => 
          array (
            'kode_brng' => 'B000001180',
            'kd_bangsal' => 'GD',
            'stok' => 5.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          265 => 
          array (
            'kode_brng' => 'B000001294',
            'kd_bangsal' => 'AP',
            'stok' => 5.0,
            'no_batch' => '1',
            'no_faktur' => 'PB20191230001',
          ),
          266 => 
          array (
            'kode_brng' => 'B000001294',
            'kd_bangsal' => 'AP',
            'stok' => 5.0,
            'no_batch' => 'BATCHTEST-001',
            'no_faktur' => 'PB-20251204-001',
          ),
          267 => 
          array (
            'kode_brng' => 'B000001686',
            'kd_bangsal' => 'AP',
            'stok' => 5.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          268 => 
          array (
            'kode_brng' => 'B000001805',
            'kd_bangsal' => 'GD',
            'stok' => 5.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          269 => 
          array (
            'kode_brng' => 'B000001902',
            'kd_bangsal' => 'GD',
            'stok' => 5.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          270 => 
          array (
            'kode_brng' => 'A000000003',
            'kd_bangsal' => 'KO',
            'stok' => 6.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          271 => 
          array (
            'kode_brng' => 'B000001783',
            'kd_bangsal' => 'B0014',
            'stok' => 6.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          272 => 
          array (
            'kode_brng' => 'A000000001',
            'kd_bangsal' => 'IGD',
            'stok' => 7.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          273 => 
          array (
            'kode_brng' => 'B000000552',
            'kd_bangsal' => 'AP',
            'stok' => 7.0,
            'no_batch' => '1',
            'no_faktur' => 'PB20191230001',
          ),
          274 => 
          array (
            'kode_brng' => 'B000000618',
            'kd_bangsal' => 'AP',
            'stok' => 7.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          275 => 
          array (
            'kode_brng' => 'B000000554',
            'kd_bangsal' => 'K2',
            'stok' => 8.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          276 => 
          array (
            'kode_brng' => 'B000000557',
            'kd_bangsal' => 'AP',
            'stok' => 8.0,
            'no_batch' => '1234',
            'no_faktur' => 'PB20200623001',
          ),
          277 => 
          array (
            'kode_brng' => 'B000000559',
            'kd_bangsal' => 'AP',
            'stok' => 8.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          278 => 
          array (
            'kode_brng' => 'B000001451',
            'kd_bangsal' => 'AP',
            'stok' => 8.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          279 => 
          array (
            'kode_brng' => 'B000001597',
            'kd_bangsal' => 'AP',
            'stok' => 8.0,
            'no_batch' => '178',
            'no_faktur' => 'PB20200623001',
          ),
          280 => 
          array (
            'kode_brng' => 'B000001878',
            'kd_bangsal' => 'AP',
            'stok' => 8.0,
            'no_batch' => '189',
            'no_faktur' => 'PB20200623001',
          ),
          281 => 
          array (
            'kode_brng' => 'B000002026',
            'kd_bangsal' => 'AP',
            'stok' => 8.0,
            'no_batch' => '1456',
            'no_faktur' => 'PB20200623001',
          ),
          282 => 
          array (
            'kode_brng' => 'A000000032',
            'kd_bangsal' => 'AP',
            'stok' => 9.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          283 => 
          array (
            'kode_brng' => 'B000000553',
            'kd_bangsal' => 'AP',
            'stok' => 9.0,
            'no_batch' => '1',
            'no_faktur' => 'PB20191230001',
          ),
          284 => 
          array (
            'kode_brng' => 'B000000707',
            'kd_bangsal' => 'AP',
            'stok' => 9.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          285 => 
          array (
            'kode_brng' => '2018001',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '123123',
            'no_faktur' => 'PB20240823001',
          ),
          286 => 
          array (
            'kode_brng' => 'A000000001',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => 'BATCHT1',
            'no_faktur' => 'PB-20251204-T1',
          ),
          287 => 
          array (
            'kode_brng' => 'A000000001',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => 'BATCHT2',
            'no_faktur' => 'PB-20251204-T2',
          ),
          288 => 
          array (
            'kode_brng' => 'A000000001',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => 'BATCHT3',
            'no_faktur' => 'PB-20251204-T3',
          ),
          289 => 
          array (
            'kode_brng' => 'A000000001',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => 'BATCHT4',
            'no_faktur' => 'PB-20251204-T4',
          ),
          290 => 
          array (
            'kode_brng' => 'A000000002',
            'kd_bangsal' => 'IGD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          291 => 
          array (
            'kode_brng' => 'A000000031',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          292 => 
          array (
            'kode_brng' => 'A000000121',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          293 => 
          array (
            'kode_brng' => 'A000000122',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          294 => 
          array (
            'kode_brng' => 'A000000123',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          295 => 
          array (
            'kode_brng' => 'B000000003',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '123',
            'no_faktur' => 'HO20191228001',
          ),
          296 => 
          array (
            'kode_brng' => 'B000000147',
            'kd_bangsal' => 'GD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          297 => 
          array (
            'kode_brng' => 'B000000166',
            'kd_bangsal' => 'K1',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          298 => 
          array (
            'kode_brng' => 'B000000305',
            'kd_bangsal' => 'K2',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          299 => 
          array (
            'kode_brng' => 'B000000379',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          300 => 
          array (
            'kode_brng' => 'B000000424',
            'kd_bangsal' => 'GD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          301 => 
          array (
            'kode_brng' => 'B000000552',
            'kd_bangsal' => 'IGD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          302 => 
          array (
            'kode_brng' => 'B000000552',
            'kd_bangsal' => 'K1',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          303 => 
          array (
            'kode_brng' => 'B000000553',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '2',
            'no_faktur' => 'PB20191215006',
          ),
          304 => 
          array (
            'kode_brng' => 'B000000553',
            'kd_bangsal' => 'ICU',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          305 => 
          array (
            'kode_brng' => 'B000000553',
            'kd_bangsal' => 'K2',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          306 => 
          array (
            'kode_brng' => 'B000000555',
            'kd_bangsal' => 'K2',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          307 => 
          array (
            'kode_brng' => 'B000000556',
            'kd_bangsal' => 'IGD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          308 => 
          array (
            'kode_brng' => 'B000000557',
            'kd_bangsal' => 'IGD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          309 => 
          array (
            'kode_brng' => 'B000000564',
            'kd_bangsal' => 'IGD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          310 => 
          array (
            'kode_brng' => 'B000000571',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '1123',
            'no_faktur' => 'PB20240729001',
          ),
          311 => 
          array (
            'kode_brng' => 'B000000575',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '6781',
            'no_faktur' => 'PB20240729003',
          ),
          312 => 
          array (
            'kode_brng' => 'B000000578',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '1122',
            'no_faktur' => 'PB20240729001',
          ),
          313 => 
          array (
            'kode_brng' => 'B000000587',
            'kd_bangsal' => 'GD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          314 => 
          array (
            'kode_brng' => 'B000000588',
            'kd_bangsal' => 'GD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          315 => 
          array (
            'kode_brng' => 'B000000589',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          316 => 
          array (
            'kode_brng' => 'B000000592',
            'kd_bangsal' => 'K1',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          317 => 
          array (
            'kode_brng' => 'B000000600',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          318 => 
          array (
            'kode_brng' => 'B000000602',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          319 => 
          array (
            'kode_brng' => 'B000000604',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => 'BATCH001',
            'no_faktur' => 'PB-20251009-004',
          ),
          320 => 
          array (
            'kode_brng' => 'B000000622',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          321 => 
          array (
            'kode_brng' => 'B000000658',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          322 => 
          array (
            'kode_brng' => 'B000000675',
            'kd_bangsal' => 'K1',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          323 => 
          array (
            'kode_brng' => 'B000000678',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          324 => 
          array (
            'kode_brng' => 'B000000691',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          325 => 
          array (
            'kode_brng' => 'B000000705',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          326 => 
          array (
            'kode_brng' => 'B000000731',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          327 => 
          array (
            'kode_brng' => 'B000000732',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          328 => 
          array (
            'kode_brng' => 'B000000965',
            'kd_bangsal' => 'IGD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          329 => 
          array (
            'kode_brng' => 'B000001101',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          330 => 
          array (
            'kode_brng' => 'B000001158',
            'kd_bangsal' => 'GD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          331 => 
          array (
            'kode_brng' => 'B000001206',
            'kd_bangsal' => 'GD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          332 => 
          array (
            'kode_brng' => 'B000001207',
            'kd_bangsal' => 'ICU',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          333 => 
          array (
            'kode_brng' => 'B000001232',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          334 => 
          array (
            'kode_brng' => 'B000001294',
            'kd_bangsal' => 'IGD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          335 => 
          array (
            'kode_brng' => 'B000001314',
            'kd_bangsal' => 'ICU',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          336 => 
          array (
            'kode_brng' => 'B000001394',
            'kd_bangsal' => 'ICU',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          337 => 
          array (
            'kode_brng' => 'B000001484',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          338 => 
          array (
            'kode_brng' => 'B000001492',
            'kd_bangsal' => 'IGD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          339 => 
          array (
            'kode_brng' => 'B000001496',
            'kd_bangsal' => 'IGD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          340 => 
          array (
            'kode_brng' => 'B000001507',
            'kd_bangsal' => 'IGD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          341 => 
          array (
            'kode_brng' => 'B000001583',
            'kd_bangsal' => 'GD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          342 => 
          array (
            'kode_brng' => 'B000001586',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          343 => 
          array (
            'kode_brng' => 'B000001595',
            'kd_bangsal' => 'GD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          344 => 
          array (
            'kode_brng' => 'B000001659',
            'kd_bangsal' => 'IGD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          345 => 
          array (
            'kode_brng' => 'B000001666',
            'kd_bangsal' => 'GD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          346 => 
          array (
            'kode_brng' => 'B000001677',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          347 => 
          array (
            'kode_brng' => 'B000001698',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          348 => 
          array (
            'kode_brng' => 'B000001780',
            'kd_bangsal' => 'ICU',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          349 => 
          array (
            'kode_brng' => 'B000001859',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          350 => 
          array (
            'kode_brng' => 'B000001878',
            'kd_bangsal' => 'GD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          351 => 
          array (
            'kode_brng' => 'B000001908',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          352 => 
          array (
            'kode_brng' => 'B000002014',
            'kd_bangsal' => 'GD',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          353 => 
          array (
            'kode_brng' => 'B000008024',
            'kd_bangsal' => 'AP',
            'stok' => 10.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          354 => 
          array (
            'kode_brng' => 'A000000001',
            'kd_bangsal' => 'AP',
            'stok' => 11.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          355 => 
          array (
            'kode_brng' => 'B000001781',
            'kd_bangsal' => 'ICU',
            'stok' => 11.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          356 => 
          array (
            'kode_brng' => 'B000001344',
            'kd_bangsal' => 'AP',
            'stok' => 12.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          357 => 
          array (
            'kode_brng' => 'B000001782',
            'kd_bangsal' => 'ICU',
            'stok' => 12.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          358 => 
          array (
            'kode_brng' => 'B000001783',
            'kd_bangsal' => 'ICU',
            'stok' => 12.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          359 => 
          array (
            'kode_brng' => 'A000000793',
            'kd_bangsal' => 'AP',
            'stok' => 15.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          360 => 
          array (
            'kode_brng' => 'B000000637',
            'kd_bangsal' => 'AP',
            'stok' => 15.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          361 => 
          array (
            'kode_brng' => 'B000001174',
            'kd_bangsal' => 'AP',
            'stok' => 17.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          362 => 
          array (
            'kode_brng' => 'VAK001',
            'kd_bangsal' => 'AP',
            'stok' => 17.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          363 => 
          array (
            'kode_brng' => 'B000001880',
            'kd_bangsal' => 'GD',
            'stok' => 19.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          364 => 
          array (
            'kode_brng' => 'B000008019',
            'kd_bangsal' => 'AP',
            'stok' => 19.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          365 => 
          array (
            'kode_brng' => 'A000000003',
            'kd_bangsal' => 'HCU',
            'stok' => 20.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          366 => 
          array (
            'kode_brng' => 'A000000005',
            'kd_bangsal' => 'KO',
            'stok' => 20.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          367 => 
          array (
            'kode_brng' => 'A000000104',
            'kd_bangsal' => 'AP',
            'stok' => 20.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          368 => 
          array (
            'kode_brng' => 'B000000001',
            'kd_bangsal' => 'AP',
            'stok' => 20.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          369 => 
          array (
            'kode_brng' => 'B000000003',
            'kd_bangsal' => 'IGD',
            'stok' => 20.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          370 => 
          array (
            'kode_brng' => 'B000000572',
            'kd_bangsal' => 'AP',
            'stok' => 20.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          371 => 
          array (
            'kode_brng' => 'B000001151',
            'kd_bangsal' => 'AP',
            'stok' => 20.0,
            'no_batch' => 'BATCH001',
            'no_faktur' => 'PB-20251009-005',
          ),
          372 => 
          array (
            'kode_brng' => 'B000001587',
            'kd_bangsal' => 'AP',
            'stok' => 20.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          373 => 
          array (
            'kode_brng' => 'B000001612',
            'kd_bangsal' => 'AP',
            'stok' => 20.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          374 => 
          array (
            'kode_brng' => 'B000001943',
            'kd_bangsal' => 'GD',
            'stok' => 20.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          375 => 
          array (
            'kode_brng' => 'B000002033',
            'kd_bangsal' => 'VVIP',
            'stok' => 20.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          376 => 
          array (
            'kode_brng' => 'B000001809',
            'kd_bangsal' => 'IGD',
            'stok' => 21.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          377 => 
          array (
            'kode_brng' => 'B000001497',
            'kd_bangsal' => 'GD',
            'stok' => 25.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          378 => 
          array (
            'kode_brng' => 'B000000567',
            'kd_bangsal' => 'AP',
            'stok' => 27.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          379 => 
          array (
            'kode_brng' => 'A000000004',
            'kd_bangsal' => 'AP',
            'stok' => 29.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          380 => 
          array (
            'kode_brng' => 'B000001274',
            'kd_bangsal' => 'AP',
            'stok' => 29.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          381 => 
          array (
            'kode_brng' => 'B000000392',
            'kd_bangsal' => 'AP',
            'stok' => 30.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          382 => 
          array (
            'kode_brng' => 'B000000395',
            'kd_bangsal' => 'AP',
            'stok' => 30.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          383 => 
          array (
            'kode_brng' => 'B000000579',
            'kd_bangsal' => 'AP',
            'stok' => 30.0,
            'no_batch' => '1237',
            'no_faktur' => 'PB20220711001',
          ),
          384 => 
          array (
            'kode_brng' => 'B000000656',
            'kd_bangsal' => 'GD',
            'stok' => 30.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          385 => 
          array (
            'kode_brng' => 'B000001493',
            'kd_bangsal' => 'AP',
            'stok' => 30.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          386 => 
          array (
            'kode_brng' => 'B000001785',
            'kd_bangsal' => 'AP',
            'stok' => 30.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          387 => 
          array (
            'kode_brng' => 'B00001000',
            'kd_bangsal' => 'AP',
            'stok' => 32.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          388 => 
          array (
            'kode_brng' => 'B000001782',
            'kd_bangsal' => 'IGD',
            'stok' => 33.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          389 => 
          array (
            'kode_brng' => 'B000000578',
            'kd_bangsal' => 'GD',
            'stok' => 40.0,
            'no_batch' => '1236',
            'no_faktur' => 'PB20220711001',
          ),
          390 => 
          array (
            'kode_brng' => 'B000001262',
            'kd_bangsal' => 'AP',
            'stok' => 40.0,
            'no_batch' => '1235',
            'no_faktur' => 'PB20220711001',
          ),
          391 => 
          array (
            'kode_brng' => 'B000001848',
            'kd_bangsal' => 'GD',
            'stok' => 40.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          392 => 
          array (
            'kode_brng' => 'B000008023',
            'kd_bangsal' => 'B0014',
            'stok' => 42.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          393 => 
          array (
            'kode_brng' => 'B000000563',
            'kd_bangsal' => 'AP',
            'stok' => 45.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          394 => 
          array (
            'kode_brng' => 'B000001902',
            'kd_bangsal' => 'IGD',
            'stok' => 45.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          395 => 
          array (
            'kode_brng' => 'B000001254',
            'kd_bangsal' => 'AP',
            'stok' => 47.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          396 => 
          array (
            'kode_brng' => 'B000000584',
            'kd_bangsal' => 'AP',
            'stok' => 48.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          397 => 
          array (
            'kode_brng' => '2018001',
            'kd_bangsal' => 'AP',
            'stok' => 50.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          398 => 
          array (
            'kode_brng' => 'A000000116',
            'kd_bangsal' => 'AP',
            'stok' => 50.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          399 => 
          array (
            'kode_brng' => 'B000000159',
            'kd_bangsal' => 'GD',
            'stok' => 50.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          400 => 
          array (
            'kode_brng' => 'B000000287',
            'kd_bangsal' => 'K1',
            'stok' => 50.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          401 => 
          array (
            'kode_brng' => 'B000000578',
            'kd_bangsal' => 'AP',
            'stok' => 50.0,
            'no_batch' => '1236',
            'no_faktur' => 'PB20220711001',
          ),
          402 => 
          array (
            'kode_brng' => 'B000000579',
            'kd_bangsal' => 'GD',
            'stok' => 50.0,
            'no_batch' => '1237',
            'no_faktur' => 'PB20220711001',
          ),
          403 => 
          array (
            'kode_brng' => 'B000000666',
            'kd_bangsal' => 'AP',
            'stok' => 50.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          404 => 
          array (
            'kode_brng' => 'B000000965',
            'kd_bangsal' => 'GD',
            'stok' => 50.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          405 => 
          array (
            'kode_brng' => 'B000001231',
            'kd_bangsal' => 'AP',
            'stok' => 50.0,
            'no_batch' => '1238',
            'no_faktur' => 'PB20220711001',
          ),
          406 => 
          array (
            'kode_brng' => 'B000001231',
            'kd_bangsal' => 'GD',
            'stok' => 50.0,
            'no_batch' => '1238',
            'no_faktur' => 'PB20220711001',
          ),
          407 => 
          array (
            'kode_brng' => 'B000001262',
            'kd_bangsal' => 'GD',
            'stok' => 50.0,
            'no_batch' => '1235',
            'no_faktur' => 'PB20220711001',
          ),
          408 => 
          array (
            'kode_brng' => 'B000001283',
            'kd_bangsal' => 'AP',
            'stok' => 50.0,
            'no_batch' => '1234',
            'no_faktur' => 'PB20220711001',
          ),
          409 => 
          array (
            'kode_brng' => 'B000001283',
            'kd_bangsal' => 'GD',
            'stok' => 50.0,
            'no_batch' => '1234',
            'no_faktur' => 'PB20220711001',
          ),
          410 => 
          array (
            'kode_brng' => 'B000001380',
            'kd_bangsal' => 'GD',
            'stok' => 50.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          411 => 
          array (
            'kode_brng' => 'B000001406',
            'kd_bangsal' => 'AP',
            'stok' => 50.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          412 => 
          array (
            'kode_brng' => 'B000001417',
            'kd_bangsal' => 'GD',
            'stok' => 50.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          413 => 
          array (
            'kode_brng' => 'B000001856',
            'kd_bangsal' => 'GD',
            'stok' => 50.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          414 => 
          array (
            'kode_brng' => 'B000008015',
            'kd_bangsal' => 'AP',
            'stok' => 50.0,
            'no_batch' => 'BATCH001',
            'no_faktur' => 'PB-20251009-003',
          ),
          415 => 
          array (
            'kode_brng' => 'B000008022',
            'kd_bangsal' => 'AP',
            'stok' => 50.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          416 => 
          array (
            'kode_brng' => 'B000001781',
            'kd_bangsal' => 'IGD',
            'stok' => 54.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          417 => 
          array (
            'kode_brng' => 'B000001341',
            'kd_bangsal' => 'AP',
            'stok' => 56.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          418 => 
          array (
            'kode_brng' => 'B000000789',
            'kd_bangsal' => 'AP',
            'stok' => 58.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          419 => 
          array (
            'kode_brng' => 'B000000396',
            'kd_bangsal' => 'GD',
            'stok' => 60.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          420 => 
          array (
            'kode_brng' => 'B000000433',
            'kd_bangsal' => 'GD',
            'stok' => 60.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          421 => 
          array (
            'kode_brng' => 'B000001700',
            'kd_bangsal' => 'AP',
            'stok' => 60.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          422 => 
          array (
            'kode_brng' => 'B000001785',
            'kd_bangsal' => 'GD',
            'stok' => 60.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          423 => 
          array (
            'kode_brng' => 'B000001583',
            'kd_bangsal' => 'AP',
            'stok' => 61.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          424 => 
          array (
            'kode_brng' => 'B000001780',
            'kd_bangsal' => 'AP',
            'stok' => 63.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          425 => 
          array (
            'kode_brng' => 'B000000424',
            'kd_bangsal' => 'AP',
            'stok' => 65.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          426 => 
          array (
            'kode_brng' => 'B000000729',
            'kd_bangsal' => 'AP',
            'stok' => 66.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          427 => 
          array (
            'kode_brng' => 'A000000102',
            'kd_bangsal' => 'AP',
            'stok' => 70.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          428 => 
          array (
            'kode_brng' => 'B000000224',
            'kd_bangsal' => 'GD',
            'stok' => 70.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          429 => 
          array (
            'kode_brng' => 'B000000553',
            'kd_bangsal' => 'AP',
            'stok' => 70.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          430 => 
          array (
            'kode_brng' => 'B000000554',
            'kd_bangsal' => 'GD',
            'stok' => 70.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          431 => 
          array (
            'kode_brng' => 'B000000598',
            'kd_bangsal' => 'AP',
            'stok' => 70.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          432 => 
          array (
            'kode_brng' => 'B000000602',
            'kd_bangsal' => 'GD',
            'stok' => 70.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          433 => 
          array (
            'kode_brng' => 'B000000604',
            'kd_bangsal' => 'AP',
            'stok' => 70.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          434 => 
          array (
            'kode_brng' => 'B000000640',
            'kd_bangsal' => 'GD',
            'stok' => 70.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          435 => 
          array (
            'kode_brng' => 'B000001579',
            'kd_bangsal' => 'AP',
            'stok' => 70.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          436 => 
          array (
            'kode_brng' => 'A000000003',
            'kd_bangsal' => 'AP',
            'stok' => 71.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          437 => 
          array (
            'kode_brng' => 'B000000565',
            'kd_bangsal' => 'AP',
            'stok' => 72.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          438 => 
          array (
            'kode_brng' => 'B000001492',
            'kd_bangsal' => 'AP',
            'stok' => 73.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          439 => 
          array (
            'kode_brng' => 'B000000235',
            'kd_bangsal' => 'GD',
            'stok' => 75.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          440 => 
          array (
            'kode_brng' => 'B000001314',
            'kd_bangsal' => 'IGD',
            'stok' => 75.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          441 => 
          array (
            'kode_brng' => 'B000001496',
            'kd_bangsal' => 'GD',
            'stok' => 78.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          442 => 
          array (
            'kode_brng' => 'B000000656',
            'kd_bangsal' => 'AP',
            'stok' => 79.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          443 => 
          array (
            'kode_brng' => 'B000000276',
            'kd_bangsal' => 'GD',
            'stok' => 80.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          444 => 
          array (
            'kode_brng' => 'B000000286',
            'kd_bangsal' => 'AP',
            'stok' => 80.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          445 => 
          array (
            'kode_brng' => 'B000000409',
            'kd_bangsal' => 'GD',
            'stok' => 80.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          446 => 
          array (
            'kode_brng' => 'B000000554',
            'kd_bangsal' => 'AP',
            'stok' => 80.0,
            'no_batch' => '2',
            'no_faktur' => 'PB20200103001',
          ),
          447 => 
          array (
            'kode_brng' => 'B000000620',
            'kd_bangsal' => 'AP',
            'stok' => 80.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          448 => 
          array (
            'kode_brng' => 'B000000627  ',
            'kd_bangsal' => 'AP',
            'stok' => 80.0,
            'no_batch' => '1234',
            'no_faktur' => 'PB20220917002',
          ),
          449 => 
          array (
            'kode_brng' => 'B000000671',
            'kd_bangsal' => 'GD',
            'stok' => 80.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          450 => 
          array (
            'kode_brng' => 'B000001033',
            'kd_bangsal' => 'AP',
            'stok' => 80.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          451 => 
          array (
            'kode_brng' => 'B000001039',
            'kd_bangsal' => 'AP',
            'stok' => 80.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          452 => 
          array (
            'kode_brng' => 'B000001254',
            'kd_bangsal' => 'GD',
            'stok' => 80.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          453 => 
          array (
            'kode_brng' => 'B000001336',
            'kd_bangsal' => 'AP',
            'stok' => 80.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          454 => 
          array (
            'kode_brng' => 'B000001474',
            'kd_bangsal' => 'GD',
            'stok' => 80.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          455 => 
          array (
            'kode_brng' => 'B000001602',
            'kd_bangsal' => 'AP',
            'stok' => 80.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          456 => 
          array (
            'kode_brng' => 'B000001880',
            'kd_bangsal' => 'AP',
            'stok' => 80.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          457 => 
          array (
            'kode_brng' => 'B000001940',
            'kd_bangsal' => 'AP',
            'stok' => 80.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          458 => 
          array (
            'kode_brng' => 'B000001951',
            'kd_bangsal' => 'GD',
            'stok' => 80.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          459 => 
          array (
            'kode_brng' => 'B000001429',
            'kd_bangsal' => 'AP',
            'stok' => 81.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          460 => 
          array (
            'kode_brng' => 'B000001207',
            'kd_bangsal' => 'AP',
            'stok' => 83.2999999999999971578290569595992565155029296875,
            'no_batch' => '135',
            'no_faktur' => 'PB20200713001',
          ),
          461 => 
          array (
            'kode_brng' => 'B000001809',
            'kd_bangsal' => 'AP',
            'stok' => 84.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          462 => 
          array (
            'kode_brng' => 'A000000001',
            'kd_bangsal' => 'GD',
            'stok' => 87.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          463 => 
          array (
            'kode_brng' => 'B000001656',
            'kd_bangsal' => 'AP',
            'stok' => 87.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          464 => 
          array (
            'kode_brng' => 'B000000168',
            'kd_bangsal' => 'AP',
            'stok' => 88.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          465 => 
          array (
            'kode_brng' => 'B000001177',
            'kd_bangsal' => 'AP',
            'stok' => 88.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          466 => 
          array (
            'kode_brng' => 'B000001780',
            'kd_bangsal' => 'IGD',
            'stok' => 88.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          467 => 
          array (
            'kode_brng' => '2018001',
            'kd_bangsal' => 'GD',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          468 => 
          array (
            'kode_brng' => 'A000000041',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          469 => 
          array (
            'kode_brng' => 'B000000133',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          470 => 
          array (
            'kode_brng' => 'B000000161',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          471 => 
          array (
            'kode_brng' => 'B000000235',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          472 => 
          array (
            'kode_brng' => 'B000000429',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          473 => 
          array (
            'kode_brng' => 'B000000455',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          474 => 
          array (
            'kode_brng' => 'B000000457',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          475 => 
          array (
            'kode_brng' => 'B000000561',
            'kd_bangsal' => 'GD',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          476 => 
          array (
            'kode_brng' => 'B000000571',
            'kd_bangsal' => 'GD',
            'stok' => 90.0,
            'no_batch' => '1123',
            'no_faktur' => 'PB20240729001',
          ),
          477 => 
          array (
            'kode_brng' => 'B000000575',
            'kd_bangsal' => 'GD',
            'stok' => 90.0,
            'no_batch' => '1121',
            'no_faktur' => 'PB20240729001',
          ),
          478 => 
          array (
            'kode_brng' => 'B000000578',
            'kd_bangsal' => 'GD',
            'stok' => 90.0,
            'no_batch' => '1122',
            'no_faktur' => 'PB20240729001',
          ),
          479 => 
          array (
            'kode_brng' => 'B000000579',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          480 => 
          array (
            'kode_brng' => 'B000000583',
            'kd_bangsal' => 'GD',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          481 => 
          array (
            'kode_brng' => 'B000000588',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          482 => 
          array (
            'kode_brng' => 'B000000593',
            'kd_bangsal' => 'IGD',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          483 => 
          array (
            'kode_brng' => 'B000000599',
            'kd_bangsal' => 'GD',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          484 => 
          array (
            'kode_brng' => 'B000000612',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          485 => 
          array (
            'kode_brng' => 'B000000613',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '1234',
            'no_faktur' => 'PB20220917001',
          ),
          486 => 
          array (
            'kode_brng' => 'B000000625',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          487 => 
          array (
            'kode_brng' => 'B000000628',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '4321',
            'no_faktur' => 'PB20220917002',
          ),
          488 => 
          array (
            'kode_brng' => 'B000000641',
            'kd_bangsal' => 'GD',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          489 => 
          array (
            'kode_brng' => 'B000000650',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          490 => 
          array (
            'kode_brng' => 'B000000653',
            'kd_bangsal' => 'GD',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          491 => 
          array (
            'kode_brng' => 'B000000667',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          492 => 
          array (
            'kode_brng' => 'B000000694',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          493 => 
          array (
            'kode_brng' => 'B000000696',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          494 => 
          array (
            'kode_brng' => 'B000000700',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          495 => 
          array (
            'kode_brng' => 'B000000730',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          496 => 
          array (
            'kode_brng' => 'B000000848',
            'kd_bangsal' => 'GD',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          497 => 
          array (
            'kode_brng' => 'B000001034',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          498 => 
          array (
            'kode_brng' => 'B000001073',
            'kd_bangsal' => 'GD',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          499 => 
          array (
            'kode_brng' => 'B000001135',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
        ));
        DB::table('gudangbarang')->insert(array (
          0 => 
          array (
            'kode_brng' => 'B000001210',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          1 => 
          array (
            'kode_brng' => 'B000001254',
            'kd_bangsal' => 'IGD',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          2 => 
          array (
            'kode_brng' => 'B000001355',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          3 => 
          array (
            'kode_brng' => 'B000001417',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          4 => 
          array (
            'kode_brng' => 'B000001417',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '4321',
            'no_faktur' => 'PB20220917001',
          ),
          5 => 
          array (
            'kode_brng' => 'B000001524',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          6 => 
          array (
            'kode_brng' => 'B000001729',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          7 => 
          array (
            'kode_brng' => 'B000001735',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          8 => 
          array (
            'kode_brng' => 'B000001767',
            'kd_bangsal' => 'GD',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          9 => 
          array (
            'kode_brng' => 'B000001814',
            'kd_bangsal' => 'GD',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          10 => 
          array (
            'kode_brng' => 'B000001845',
            'kd_bangsal' => 'GD',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          11 => 
          array (
            'kode_brng' => 'B000001990',
            'kd_bangsal' => 'GD',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          12 => 
          array (
            'kode_brng' => 'B000008010',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          13 => 
          array (
            'kode_brng' => 'B000008021',
            'kd_bangsal' => 'AP',
            'stok' => 90.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          14 => 
          array (
            'kode_brng' => 'B000000430',
            'kd_bangsal' => 'GD',
            'stok' => 92.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          15 => 
          array (
            'kode_brng' => 'B000000378',
            'kd_bangsal' => 'AP',
            'stok' => 93.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          16 => 
          array (
            'kode_brng' => 'B000000365',
            'kd_bangsal' => 'GD',
            'stok' => 95.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          17 => 
          array (
            'kode_brng' => 'B000001314',
            'kd_bangsal' => 'GD',
            'stok' => 95.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          18 => 
          array (
            'kode_brng' => 'B000001383',
            'kd_bangsal' => 'GD',
            'stok' => 95.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          19 => 
          array (
            'kode_brng' => 'B000001556',
            'kd_bangsal' => 'AP',
            'stok' => 96.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          20 => 
          array (
            'kode_brng' => 'B000000655',
            'kd_bangsal' => 'AP',
            'stok' => 97.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          21 => 
          array (
            'kode_brng' => 'B000000582',
            'kd_bangsal' => 'AP',
            'stok' => 98.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          22 => 
          array (
            'kode_brng' => 'B000001178',
            'kd_bangsal' => 'AP',
            'stok' => 99.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          23 => 
          array (
            'kode_brng' => 'B000001394',
            'kd_bangsal' => 'IGD',
            'stok' => 99.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          24 => 
          array (
            'kode_brng' => 'B000001704',
            'kd_bangsal' => 'AP',
            'stok' => 99.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          25 => 
          array (
            'kode_brng' => 'A000000004',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          26 => 
          array (
            'kode_brng' => 'A000000041',
            'kd_bangsal' => 'IGD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          27 => 
          array (
            'kode_brng' => 'A000000042',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          28 => 
          array (
            'kode_brng' => 'A000000483',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          29 => 
          array (
            'kode_brng' => 'A000000787',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          30 => 
          array (
            'kode_brng' => 'B000000001',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          31 => 
          array (
            'kode_brng' => 'B000000132',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          32 => 
          array (
            'kode_brng' => 'B000000136',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          33 => 
          array (
            'kode_brng' => 'B000000139',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          34 => 
          array (
            'kode_brng' => 'B000000143',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          35 => 
          array (
            'kode_brng' => 'B000000152',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          36 => 
          array (
            'kode_brng' => 'B000000162',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          37 => 
          array (
            'kode_brng' => 'B000000164',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          38 => 
          array (
            'kode_brng' => 'B000000218',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          39 => 
          array (
            'kode_brng' => 'B000000226',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          40 => 
          array (
            'kode_brng' => 'B000000233',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          41 => 
          array (
            'kode_brng' => 'B000000271',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          42 => 
          array (
            'kode_brng' => 'B000000299',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          43 => 
          array (
            'kode_brng' => 'B000000305',
            'kd_bangsal' => 'IGD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          44 => 
          array (
            'kode_brng' => 'B000000315',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          45 => 
          array (
            'kode_brng' => 'B000000334',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          46 => 
          array (
            'kode_brng' => 'B000000340',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          47 => 
          array (
            'kode_brng' => 'B000000345',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          48 => 
          array (
            'kode_brng' => 'B000000359',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          49 => 
          array (
            'kode_brng' => 'B000000369',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          50 => 
          array (
            'kode_brng' => 'B000000392',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          51 => 
          array (
            'kode_brng' => 'B000000395',
            'kd_bangsal' => 'IGD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          52 => 
          array (
            'kode_brng' => 'B000000435',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          53 => 
          array (
            'kode_brng' => 'B000000439',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          54 => 
          array (
            'kode_brng' => 'B000000458',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          55 => 
          array (
            'kode_brng' => 'B000000478',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          56 => 
          array (
            'kode_brng' => 'B000000564',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          57 => 
          array (
            'kode_brng' => 'B000000566',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          58 => 
          array (
            'kode_brng' => 'B000000566',
            'kd_bangsal' => 'K1',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          59 => 
          array (
            'kode_brng' => 'B000000567',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          60 => 
          array (
            'kode_brng' => 'B000000571',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => 'BATCH001',
            'no_faktur' => 'PB-20251204-002',
          ),
          61 => 
          array (
            'kode_brng' => 'B000000571',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          62 => 
          array (
            'kode_brng' => 'B000000571',
            'kd_bangsal' => 'IGD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          63 => 
          array (
            'kode_brng' => 'B000000572',
            'kd_bangsal' => 'IGD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          64 => 
          array (
            'kode_brng' => 'B000000572',
            'kd_bangsal' => 'K1',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          65 => 
          array (
            'kode_brng' => 'B000000575',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          66 => 
          array (
            'kode_brng' => 'B000000575',
            'kd_bangsal' => 'IGD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          67 => 
          array (
            'kode_brng' => 'B000000576',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          68 => 
          array (
            'kode_brng' => 'B000000578',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          69 => 
          array (
            'kode_brng' => 'B000000591',
            'kd_bangsal' => 'K1',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          70 => 
          array (
            'kode_brng' => 'B000000593',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          71 => 
          array (
            'kode_brng' => 'B000000594',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          72 => 
          array (
            'kode_brng' => 'B000000598',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          73 => 
          array (
            'kode_brng' => 'B000000601',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          74 => 
          array (
            'kode_brng' => 'B000000603',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          75 => 
          array (
            'kode_brng' => 'B000000605',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          76 => 
          array (
            'kode_brng' => 'B000000606',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          77 => 
          array (
            'kode_brng' => 'B000000607',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          78 => 
          array (
            'kode_brng' => 'B000000610',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          79 => 
          array (
            'kode_brng' => 'B000000613',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          80 => 
          array (
            'kode_brng' => 'B000000615',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          81 => 
          array (
            'kode_brng' => 'B000000617',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          82 => 
          array (
            'kode_brng' => 'B000000623',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          83 => 
          array (
            'kode_brng' => 'B000000624',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          84 => 
          array (
            'kode_brng' => 'B000000625',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          85 => 
          array (
            'kode_brng' => 'B000000627  ',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          86 => 
          array (
            'kode_brng' => 'B000000628',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          87 => 
          array (
            'kode_brng' => 'B000000630',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          88 => 
          array (
            'kode_brng' => 'B000000632',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          89 => 
          array (
            'kode_brng' => 'B000000632',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          90 => 
          array (
            'kode_brng' => 'B000000633',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          91 => 
          array (
            'kode_brng' => 'B000000635',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          92 => 
          array (
            'kode_brng' => 'B000000636',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          93 => 
          array (
            'kode_brng' => 'B000000641',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          94 => 
          array (
            'kode_brng' => 'B000000644',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          95 => 
          array (
            'kode_brng' => 'B000000649',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          96 => 
          array (
            'kode_brng' => 'B000000657',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          97 => 
          array (
            'kode_brng' => 'B000000659',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          98 => 
          array (
            'kode_brng' => 'B000000661',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          99 => 
          array (
            'kode_brng' => 'B000000669',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          100 => 
          array (
            'kode_brng' => 'B000000689',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          101 => 
          array (
            'kode_brng' => 'B000000694',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          102 => 
          array (
            'kode_brng' => 'B000000699',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          103 => 
          array (
            'kode_brng' => 'B000000701',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          104 => 
          array (
            'kode_brng' => 'B000000703',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          105 => 
          array (
            'kode_brng' => 'B000000704',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          106 => 
          array (
            'kode_brng' => 'B000000704',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          107 => 
          array (
            'kode_brng' => 'B000000729',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          108 => 
          array (
            'kode_brng' => 'B000000733',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          109 => 
          array (
            'kode_brng' => 'B000000758',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          110 => 
          array (
            'kode_brng' => 'B000000764',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          111 => 
          array (
            'kode_brng' => 'B000000807',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          112 => 
          array (
            'kode_brng' => 'B000000862',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          113 => 
          array (
            'kode_brng' => 'B000000958',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          114 => 
          array (
            'kode_brng' => 'B000000965',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => 'BATCH001',
            'no_faktur' => 'PB-20251204-002',
          ),
          115 => 
          array (
            'kode_brng' => 'B000001067',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          116 => 
          array (
            'kode_brng' => 'B000001170',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => 'BATCH001',
            'no_faktur' => 'PB-20251009-002',
          ),
          117 => 
          array (
            'kode_brng' => 'B000001170',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => 'BATCH001',
            'no_faktur' => 'PB-20251204-002',
          ),
          118 => 
          array (
            'kode_brng' => 'B000001178',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          119 => 
          array (
            'kode_brng' => 'B000001226',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          120 => 
          array (
            'kode_brng' => 'B000001234',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          121 => 
          array (
            'kode_brng' => 'B000001244',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          122 => 
          array (
            'kode_brng' => 'B000001244',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          123 => 
          array (
            'kode_brng' => 'B000001258',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          124 => 
          array (
            'kode_brng' => 'B000001277',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          125 => 
          array (
            'kode_brng' => 'B000001285',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          126 => 
          array (
            'kode_brng' => 'B000001291',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          127 => 
          array (
            'kode_brng' => 'B000001294',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '1',
            'no_faktur' => 'PB20200103001',
          ),
          128 => 
          array (
            'kode_brng' => 'B000001299',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          129 => 
          array (
            'kode_brng' => 'B000001312',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          130 => 
          array (
            'kode_brng' => 'B000001330',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          131 => 
          array (
            'kode_brng' => 'B000001343',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          132 => 
          array (
            'kode_brng' => 'B000001349',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          133 => 
          array (
            'kode_brng' => 'B000001359',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          134 => 
          array (
            'kode_brng' => 'B000001380',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          135 => 
          array (
            'kode_brng' => 'B000001382',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          136 => 
          array (
            'kode_brng' => 'B000001382',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          137 => 
          array (
            'kode_brng' => 'B000001387',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          138 => 
          array (
            'kode_brng' => 'B000001387',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          139 => 
          array (
            'kode_brng' => 'B000001415',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          140 => 
          array (
            'kode_brng' => 'B000001424',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          141 => 
          array (
            'kode_brng' => 'B000001427',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          142 => 
          array (
            'kode_brng' => 'B000001442',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          143 => 
          array (
            'kode_brng' => 'B000001461',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          144 => 
          array (
            'kode_brng' => 'B000001465',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          145 => 
          array (
            'kode_brng' => 'B000001479',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          146 => 
          array (
            'kode_brng' => 'B000001481',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          147 => 
          array (
            'kode_brng' => 'B000001495',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          148 => 
          array (
            'kode_brng' => 'B000001502',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          149 => 
          array (
            'kode_brng' => 'B000001512',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          150 => 
          array (
            'kode_brng' => 'B000001543',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          151 => 
          array (
            'kode_brng' => 'B000001551',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          152 => 
          array (
            'kode_brng' => 'B000001567',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          153 => 
          array (
            'kode_brng' => 'B000001579',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          154 => 
          array (
            'kode_brng' => 'B000001587',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          155 => 
          array (
            'kode_brng' => 'B000001603',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          156 => 
          array (
            'kode_brng' => 'B000001639',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          157 => 
          array (
            'kode_brng' => 'B000001654',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          158 => 
          array (
            'kode_brng' => 'B000001655',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          159 => 
          array (
            'kode_brng' => 'B000001680',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          160 => 
          array (
            'kode_brng' => 'B000001680',
            'kd_bangsal' => 'K1',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          161 => 
          array (
            'kode_brng' => 'B000001689',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          162 => 
          array (
            'kode_brng' => 'B000001701',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          163 => 
          array (
            'kode_brng' => 'B000001706',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          164 => 
          array (
            'kode_brng' => 'B000001713',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          165 => 
          array (
            'kode_brng' => 'B000001719',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          166 => 
          array (
            'kode_brng' => 'B000001767',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          167 => 
          array (
            'kode_brng' => 'B000001801',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          168 => 
          array (
            'kode_brng' => 'B000001805',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          169 => 
          array (
            'kode_brng' => 'B000001812',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          170 => 
          array (
            'kode_brng' => 'B000001830',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          171 => 
          array (
            'kode_brng' => 'B000001853',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          172 => 
          array (
            'kode_brng' => 'B000001856',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          173 => 
          array (
            'kode_brng' => 'B000001860',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          174 => 
          array (
            'kode_brng' => 'B000001871',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          175 => 
          array (
            'kode_brng' => 'B000001875',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          176 => 
          array (
            'kode_brng' => 'B000001876',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          177 => 
          array (
            'kode_brng' => 'B000001877',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          178 => 
          array (
            'kode_brng' => 'B000001895',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          179 => 
          array (
            'kode_brng' => 'B000001898',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          180 => 
          array (
            'kode_brng' => 'B000001926',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          181 => 
          array (
            'kode_brng' => 'B000001930',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          182 => 
          array (
            'kode_brng' => 'B000001941',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          183 => 
          array (
            'kode_brng' => 'B000001943',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          184 => 
          array (
            'kode_brng' => 'B000001975',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          185 => 
          array (
            'kode_brng' => 'B000001979',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          186 => 
          array (
            'kode_brng' => 'B000001980',
            'kd_bangsal' => 'AP',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          187 => 
          array (
            'kode_brng' => 'B000008006',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          188 => 
          array (
            'kode_brng' => 'B000008016',
            'kd_bangsal' => 'GD',
            'stok' => 100.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          189 => 
          array (
            'kode_brng' => 'A000000003',
            'kd_bangsal' => 'GD',
            'stok' => 103.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          190 => 
          array (
            'kode_brng' => 'B00001000',
            'kd_bangsal' => 'IGD',
            'stok' => 104.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          191 => 
          array (
            'kode_brng' => 'B000000409',
            'kd_bangsal' => 'AP',
            'stok' => 105.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          192 => 
          array (
            'kode_brng' => 'B000000584',
            'kd_bangsal' => 'GD',
            'stok' => 105.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          193 => 
          array (
            'kode_brng' => 'A000000002',
            'kd_bangsal' => 'AP',
            'stok' => 106.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          194 => 
          array (
            'kode_brng' => 'B000001294',
            'kd_bangsal' => 'AP',
            'stok' => 106.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          195 => 
          array (
            'kode_brng' => 'B000001577',
            'kd_bangsal' => 'AP',
            'stok' => 107.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          196 => 
          array (
            'kode_brng' => 'B000001783',
            'kd_bangsal' => 'IGD',
            'stok' => 107.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          197 => 
          array (
            'kode_brng' => 'B000001878',
            'kd_bangsal' => 'AP',
            'stok' => 108.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          198 => 
          array (
            'kode_brng' => 'B000002026',
            'kd_bangsal' => 'GD',
            'stok' => 108.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          199 => 
          array (
            'kode_brng' => 'B000001295',
            'kd_bangsal' => 'AP',
            'stok' => 109.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          200 => 
          array (
            'kode_brng' => 'B000001734',
            'kd_bangsal' => 'AP',
            'stok' => 109.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          201 => 
          array (
            'kode_brng' => 'B000000160',
            'kd_bangsal' => 'AP',
            'stok' => 110.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          202 => 
          array (
            'kode_brng' => 'B000000160',
            'kd_bangsal' => 'GD',
            'stok' => 110.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          203 => 
          array (
            'kode_brng' => 'B000000482',
            'kd_bangsal' => 'AP',
            'stok' => 110.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          204 => 
          array (
            'kode_brng' => 'B000000556',
            'kd_bangsal' => 'K1',
            'stok' => 110.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          205 => 
          array (
            'kode_brng' => 'B000000562',
            'kd_bangsal' => 'AP',
            'stok' => 110.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          206 => 
          array (
            'kode_brng' => 'B000000618',
            'kd_bangsal' => 'GD',
            'stok' => 110.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          207 => 
          array (
            'kode_brng' => 'B000001221',
            'kd_bangsal' => 'AP',
            'stok' => 110.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          208 => 
          array (
            'kode_brng' => 'B000001414',
            'kd_bangsal' => 'GD',
            'stok' => 110.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          209 => 
          array (
            'kode_brng' => 'B000001577',
            'kd_bangsal' => 'GD',
            'stok' => 110.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          210 => 
          array (
            'kode_brng' => 'B000001762',
            'kd_bangsal' => 'AP',
            'stok' => 110.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          211 => 
          array (
            'kode_brng' => 'B000001768',
            'kd_bangsal' => 'AP',
            'stok' => 110.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          212 => 
          array (
            'kode_brng' => 'B000001950',
            'kd_bangsal' => 'AP',
            'stok' => 110.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          213 => 
          array (
            'kode_brng' => 'B000002014',
            'kd_bangsal' => 'AP',
            'stok' => 110.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          214 => 
          array (
            'kode_brng' => 'B000001885',
            'kd_bangsal' => 'GD',
            'stok' => 116.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          215 => 
          array (
            'kode_brng' => 'B000000557',
            'kd_bangsal' => 'GD',
            'stok' => 120.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          216 => 
          array (
            'kode_brng' => 'B000000571',
            'kd_bangsal' => 'GD',
            'stok' => 120.0,
            'no_batch' => '1153',
            'no_faktur' => 'PB20240729002',
          ),
          217 => 
          array (
            'kode_brng' => 'B000001302',
            'kd_bangsal' => 'AP',
            'stok' => 120.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          218 => 
          array (
            'kode_brng' => 'B000001798',
            'kd_bangsal' => 'AP',
            'stok' => 120.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          219 => 
          array (
            'kode_brng' => 'B000001828',
            'kd_bangsal' => 'AP',
            'stok' => 120.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          220 => 
          array (
            'kode_brng' => 'B000001902',
            'kd_bangsal' => 'AP',
            'stok' => 120.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          221 => 
          array (
            'kode_brng' => 'B000001442',
            'kd_bangsal' => 'AP',
            'stok' => 125.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          222 => 
          array (
            'kode_brng' => 'B000001547',
            'kd_bangsal' => 'AP',
            'stok' => 129.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          223 => 
          array (
            'kode_brng' => 'B000000664',
            'kd_bangsal' => 'AP',
            'stok' => 130.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          224 => 
          array (
            'kode_brng' => 'B000000396',
            'kd_bangsal' => 'AP',
            'stok' => 139.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          225 => 
          array (
            'kode_brng' => 'B000001951',
            'kd_bangsal' => 'AP',
            'stok' => 140.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          226 => 
          array (
            'kode_brng' => 'B000000294',
            'kd_bangsal' => 'AP',
            'stok' => 143.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          227 => 
          array (
            'kode_brng' => 'B000000578',
            'kd_bangsal' => 'GD',
            'stok' => 150.0,
            'no_batch' => '1151',
            'no_faktur' => 'PB20240729002',
          ),
          228 => 
          array (
            'kode_brng' => 'B000001871',
            'kd_bangsal' => 'AP',
            'stok' => 150.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          229 => 
          array (
            'kode_brng' => 'B000001512',
            'kd_bangsal' => 'AP',
            'stok' => 150.400000000000005684341886080801486968994140625,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          230 => 
          array (
            'kode_brng' => 'B000000450',
            'kd_bangsal' => 'GD',
            'stok' => 155.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          231 => 
          array (
            'kode_brng' => 'B000000569',
            'kd_bangsal' => 'AP',
            'stok' => 155.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          232 => 
          array (
            'kode_brng' => 'B000000623',
            'kd_bangsal' => 'AP',
            'stok' => 155.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          233 => 
          array (
            'kode_brng' => 'B000002036',
            'kd_bangsal' => 'AP',
            'stok' => 160.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          234 => 
          array (
            'kode_brng' => 'B000001519',
            'kd_bangsal' => 'AP',
            'stok' => 165.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          235 => 
          array (
            'kode_brng' => 'B000001394',
            'kd_bangsal' => 'GD',
            'stok' => 167.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          236 => 
          array (
            'kode_brng' => 'B000000002',
            'kd_bangsal' => 'AP',
            'stok' => 170.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          237 => 
          array (
            'kode_brng' => 'B000000583',
            'kd_bangsal' => 'AP',
            'stok' => 170.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          238 => 
          array (
            'kode_brng' => 'B000001359',
            'kd_bangsal' => 'AP',
            'stok' => 170.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          239 => 
          array (
            'kode_brng' => 'B000000578',
            'kd_bangsal' => 'AP',
            'stok' => 180.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          240 => 
          array (
            'kode_brng' => 'B000000624',
            'kd_bangsal' => 'GD',
            'stok' => 180.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          241 => 
          array (
            'kode_brng' => 'B000001597',
            'kd_bangsal' => 'GD',
            'stok' => 180.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          242 => 
          array (
            'kode_brng' => 'B000002033',
            'kd_bangsal' => 'AP',
            'stok' => 181.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          243 => 
          array (
            'kode_brng' => 'B000001207',
            'kd_bangsal' => 'AP',
            'stok' => 181.6000000000000227373675443232059478759765625,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          244 => 
          array (
            'kode_brng' => 'A000000002',
            'kd_bangsal' => 'GD',
            'stok' => 184.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          245 => 
          array (
            'kode_brng' => 'B000001158',
            'kd_bangsal' => 'AP',
            'stok' => 184.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          246 => 
          array (
            'kode_brng' => 'B000000147',
            'kd_bangsal' => 'AP',
            'stok' => 185.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          247 => 
          array (
            'kode_brng' => 'B000001783',
            'kd_bangsal' => 'GD',
            'stok' => 188.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          248 => 
          array (
            'kode_brng' => '2018003',
            'kd_bangsal' => 'AP',
            'stok' => 190.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          249 => 
          array (
            'kode_brng' => 'B000000193',
            'kd_bangsal' => 'AP',
            'stok' => 190.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          250 => 
          array (
            'kode_brng' => 'B000000552',
            'kd_bangsal' => 'GD',
            'stok' => 190.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          251 => 
          array (
            'kode_brng' => 'B000000574',
            'kd_bangsal' => 'AP',
            'stok' => 190.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          252 => 
          array (
            'kode_brng' => 'B000000575',
            'kd_bangsal' => 'GD',
            'stok' => 190.0,
            'no_batch' => '6781',
            'no_faktur' => 'PB20240729003',
          ),
          253 => 
          array (
            'kode_brng' => 'B000000593',
            'kd_bangsal' => 'AP',
            'stok' => 190.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          254 => 
          array (
            'kode_brng' => 'B000000607',
            'kd_bangsal' => 'AP',
            'stok' => 190.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          255 => 
          array (
            'kode_brng' => 'B000001172',
            'kd_bangsal' => 'AP',
            'stok' => 190.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          256 => 
          array (
            'kode_brng' => 'B000001860',
            'kd_bangsal' => 'AP',
            'stok' => 198.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          257 => 
          array (
            'kode_brng' => 'B000000376',
            'kd_bangsal' => 'AP',
            'stok' => 199.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          258 => 
          array (
            'kode_brng' => 'B000000568',
            'kd_bangsal' => 'AP',
            'stok' => 199.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          259 => 
          array (
            'kode_brng' => 'B000000162',
            'kd_bangsal' => 'AP',
            'stok' => 200.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          260 => 
          array (
            'kode_brng' => 'B000000322',
            'kd_bangsal' => 'GD',
            'stok' => 200.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          261 => 
          array (
            'kode_brng' => 'B000000374',
            'kd_bangsal' => 'AP',
            'stok' => 200.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          262 => 
          array (
            'kode_brng' => 'B000000481',
            'kd_bangsal' => 'AP',
            'stok' => 200.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          263 => 
          array (
            'kode_brng' => 'B000000553',
            'kd_bangsal' => 'GD',
            'stok' => 200.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          264 => 
          array (
            'kode_brng' => 'B000000575',
            'kd_bangsal' => 'GD',
            'stok' => 200.0,
            'no_batch' => '1150',
            'no_faktur' => 'PB20240729002',
          ),
          265 => 
          array (
            'kode_brng' => 'B000000591',
            'kd_bangsal' => 'AP',
            'stok' => 200.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          266 => 
          array (
            'kode_brng' => 'B000000597',
            'kd_bangsal' => 'AP',
            'stok' => 200.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          267 => 
          array (
            'kode_brng' => 'B000000966',
            'kd_bangsal' => 'AP',
            'stok' => 200.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          268 => 
          array (
            'kode_brng' => 'B000001340',
            'kd_bangsal' => 'AP',
            'stok' => 200.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          269 => 
          array (
            'kode_brng' => 'B000001552',
            'kd_bangsal' => 'AP',
            'stok' => 200.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          270 => 
          array (
            'kode_brng' => 'B000001603',
            'kd_bangsal' => 'AP',
            'stok' => 200.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          271 => 
          array (
            'kode_brng' => 'B000001828',
            'kd_bangsal' => 'GD',
            'stok' => 200.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          272 => 
          array (
            'kode_brng' => 'B000000558',
            'kd_bangsal' => 'GD',
            'stok' => 205.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          273 => 
          array (
            'kode_brng' => 'B000000560',
            'kd_bangsal' => 'GD',
            'stok' => 205.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          274 => 
          array (
            'kode_brng' => 'B000001424',
            'kd_bangsal' => 'GD',
            'stok' => 210.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          275 => 
          array (
            'kode_brng' => 'B000001596',
            'kd_bangsal' => 'AP',
            'stok' => 210.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          276 => 
          array (
            'kode_brng' => 'B000000157',
            'kd_bangsal' => 'AP',
            'stok' => 220.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          277 => 
          array (
            'kode_brng' => 'B000000967',
            'kd_bangsal' => 'AP',
            'stok' => 223.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          278 => 
          array (
            'kode_brng' => 'B000001659',
            'kd_bangsal' => 'AP',
            'stok' => 223.19999999999998863131622783839702606201171875,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          279 => 
          array (
            'kode_brng' => 'B000000554',
            'kd_bangsal' => 'AP',
            'stok' => 227.49999999999994315658113919198513031005859375,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          280 => 
          array (
            'kode_brng' => 'B000000587',
            'kd_bangsal' => 'AP',
            'stok' => 240.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          281 => 
          array (
            'kode_brng' => 'B000000578',
            'kd_bangsal' => 'GD',
            'stok' => 250.0,
            'no_batch' => '6782',
            'no_faktur' => 'PB20240729003',
          ),
          282 => 
          array (
            'kode_brng' => 'B000002026',
            'kd_bangsal' => 'AP',
            'stok' => 257.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          283 => 
          array (
            'kode_brng' => 'B000000159',
            'kd_bangsal' => 'AP',
            'stok' => 260.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          284 => 
          array (
            'kode_brng' => 'B000001507',
            'kd_bangsal' => 'AP',
            'stok' => 260.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          285 => 
          array (
            'kode_brng' => 'B000001207',
            'kd_bangsal' => 'GD',
            'stok' => 270.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          286 => 
          array (
            'kode_brng' => 'B000001885',
            'kd_bangsal' => 'AP',
            'stok' => 280.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          287 => 
          array (
            'kode_brng' => 'B000000595',
            'kd_bangsal' => 'AP',
            'stok' => 290.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          288 => 
          array (
            'kode_brng' => 'B000001746',
            'kd_bangsal' => 'AP',
            'stok' => 290.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          289 => 
          array (
            'kode_brng' => 'B000001780',
            'kd_bangsal' => 'GD',
            'stok' => 290.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          290 => 
          array (
            'kode_brng' => 'B000001781',
            'kd_bangsal' => 'AP',
            'stok' => 296.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          291 => 
          array (
            'kode_brng' => 'B000000246',
            'kd_bangsal' => 'AP',
            'stok' => 300.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          292 => 
          array (
            'kode_brng' => 'B000000322',
            'kd_bangsal' => 'AP',
            'stok' => 300.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          293 => 
          array (
            'kode_brng' => 'B000000555',
            'kd_bangsal' => 'GD',
            'stok' => 300.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          294 => 
          array (
            'kode_brng' => 'B000000606',
            'kd_bangsal' => 'GD',
            'stok' => 300.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          295 => 
          array (
            'kode_brng' => 'B000000791',
            'kd_bangsal' => 'GD',
            'stok' => 300.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          296 => 
          array (
            'kode_brng' => 'B000001877',
            'kd_bangsal' => 'AP',
            'stok' => 300.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          297 => 
          array (
            'kode_brng' => 'B000000559',
            'kd_bangsal' => 'GD',
            'stok' => 309.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          298 => 
          array (
            'kode_brng' => 'B000000790',
            'kd_bangsal' => 'GD',
            'stok' => 310.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          299 => 
          array (
            'kode_brng' => 'B000001782',
            'kd_bangsal' => 'AP',
            'stok' => 340.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          300 => 
          array (
            'kode_brng' => 'B000000620',
            'kd_bangsal' => 'GD',
            'stok' => 370.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          301 => 
          array (
            'kode_brng' => 'B000001783',
            'kd_bangsal' => 'AP',
            'stok' => 389.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          302 => 
          array (
            'kode_brng' => 'A000000125',
            'kd_bangsal' => 'GD',
            'stok' => 400.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          303 => 
          array (
            'kode_brng' => 'B000001632',
            'kd_bangsal' => 'AP',
            'stok' => 400.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          304 => 
          array (
            'kode_brng' => 'B000001597',
            'kd_bangsal' => 'AP',
            'stok' => 407.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          305 => 
          array (
            'kode_brng' => 'B000000552',
            'kd_bangsal' => 'AP',
            'stok' => 409.5,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          306 => 
          array (
            'kode_brng' => 'B000001394',
            'kd_bangsal' => 'AP',
            'stok' => 433.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          307 => 
          array (
            'kode_brng' => 'B000001809',
            'kd_bangsal' => 'GD',
            'stok' => 465.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          308 => 
          array (
            'kode_brng' => 'B000000156',
            'kd_bangsal' => 'AP',
            'stok' => 470.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          309 => 
          array (
            'kode_brng' => 'B000000003',
            'kd_bangsal' => 'GD',
            'stok' => 480.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          310 => 
          array (
            'kode_brng' => 'B000001314',
            'kd_bangsal' => 'AP',
            'stok' => 486.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          311 => 
          array (
            'kode_brng' => 'B000000575',
            'kd_bangsal' => 'AP',
            'stok' => 518.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          312 => 
          array (
            'kode_brng' => 'B000000791',
            'kd_bangsal' => 'AP',
            'stok' => 538.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          313 => 
          array (
            'kode_brng' => 'B000001781',
            'kd_bangsal' => 'GD',
            'stok' => 570.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          314 => 
          array (
            'kode_brng' => 'B000000560',
            'kd_bangsal' => 'AP',
            'stok' => 750.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          315 => 
          array (
            'kode_brng' => 'B000001285',
            'kd_bangsal' => 'AP',
            'stok' => 760.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          316 => 
          array (
            'kode_brng' => 'B000001496',
            'kd_bangsal' => 'AP',
            'stok' => 799.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          317 => 
          array (
            'kode_brng' => 'B000001418',
            'kd_bangsal' => 'AP',
            'stok' => 900.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          318 => 
          array (
            'kode_brng' => 'B000001497',
            'kd_bangsal' => 'AP',
            'stok' => 900.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          319 => 
          array (
            'kode_brng' => 'B000002022',
            'kd_bangsal' => 'GD',
            'stok' => 900.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          320 => 
          array (
            'kode_brng' => 'B000000670',
            'kd_bangsal' => 'AP',
            'stok' => 930.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          321 => 
          array (
            'kode_brng' => 'B000000791',
            'kd_bangsal' => 'AP',
            'stok' => 980.0,
            'no_batch' => '10',
            'no_faktur' => 'PB20221026001',
          ),
          322 => 
          array (
            'kode_brng' => 'B000000556',
            'kd_bangsal' => 'GD',
            'stok' => 990.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          323 => 
          array (
            'kode_brng' => 'B000001777',
            'kd_bangsal' => 'AP',
            'stok' => 990.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          324 => 
          array (
            'kode_brng' => 'B000001941',
            'kd_bangsal' => 'AP',
            'stok' => 990.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          325 => 
          array (
            'kode_brng' => 'B000000167',
            'kd_bangsal' => 'AP',
            'stok' => 1000.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          326 => 
          array (
            'kode_brng' => 'B000000305',
            'kd_bangsal' => 'K1',
            'stok' => 1000.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          327 => 
          array (
            'kode_brng' => 'B000000568',
            'kd_bangsal' => 'GD',
            'stok' => 1000.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          328 => 
          array (
            'kode_brng' => 'B000000579',
            'kd_bangsal' => 'GD',
            'stok' => 1000.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          329 => 
          array (
            'kode_brng' => 'B000001196',
            'kd_bangsal' => 'AP',
            'stok' => 1000.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          330 => 
          array (
            'kode_brng' => 'B000001547',
            'kd_bangsal' => 'GD',
            'stok' => 1000.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          331 => 
          array (
            'kode_brng' => 'B000001260',
            'kd_bangsal' => 'AP',
            'stok' => 1060.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          332 => 
          array (
            'kode_brng' => 'B000000556',
            'kd_bangsal' => 'AP',
            'stok' => 1069.90000000000009094947017729282379150390625,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          333 => 
          array (
            'kode_brng' => 'B000001294',
            'kd_bangsal' => 'GD',
            'stok' => 1080.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          334 => 
          array (
            'kode_brng' => 'B000000557',
            'kd_bangsal' => 'AP',
            'stok' => 1254.299999999999954525264911353588104248046875,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          335 => 
          array (
            'kode_brng' => 'B000000555',
            'kd_bangsal' => 'AP',
            'stok' => 1272.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          336 => 
          array (
            'kode_brng' => 'B000000558',
            'kd_bangsal' => 'AP',
            'stok' => 1307.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          337 => 
          array (
            'kode_brng' => '2018003',
            'kd_bangsal' => 'GD',
            'stok' => 1392.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          338 => 
          array (
            'kode_brng' => '2018003',
            'kd_bangsal' => 'AP',
            'stok' => 1400.0,
            'no_batch' => '123',
            'no_faktur' => 'PB20200713001',
          ),
          339 => 
          array (
            'kode_brng' => '2018003',
            'kd_bangsal' => 'IGD',
            'stok' => 1425.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          340 => 
          array (
            'kode_brng' => 'B000000965',
            'kd_bangsal' => 'AP',
            'stok' => 3750.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          341 => 
          array (
            'kode_brng' => 'B000001659',
            'kd_bangsal' => 'GD',
            'stok' => 6000.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          342 => 
          array (
            'kode_brng' => 'B000000305',
            'kd_bangsal' => 'GD',
            'stok' => 11090.0,
            'no_batch' => '',
            'no_faktur' => '',
          ),
          343 => 
          array (
            'kode_brng' => 'B000000305',
            'kd_bangsal' => 'AP',
            'stok' => 17767.40000000000509317032992839813232421875,
            'no_batch' => '',
            'no_faktur' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}