<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ResepDokterTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('resep_dokter')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('resep_dokter')->insert(array (
          0 => 
          array (
            'no_resep' => '202504260001',
            'kode_brng' => 'B000000556',
            'jml' => 10.0,
            'aturan_pakai' => '2 x 1',
          ),
          1 => 
          array (
            'no_resep' => '202504270001',
            'kode_brng' => 'B000000790',
            'jml' => 10.0,
            'aturan_pakai' => '3 x 1',
          ),
          2 => 
          array (
            'no_resep' => '202504270001',
            'kode_brng' => 'B000000575',
            'jml' => 10.0,
            'aturan_pakai' => '2 x 1',
          ),
          3 => 
          array (
            'no_resep' => '202504270002',
            'kode_brng' => 'B000000790',
            'jml' => 10.0,
            'aturan_pakai' => '2 x 1',
          ),
          4 => 
          array (
            'no_resep' => '202505260001',
            'kode_brng' => 'B000000791',
            'jml' => 10.0,
            'aturan_pakai' => '2 x1',
          ),
          5 => 
          array (
            'no_resep' => '202505260001',
            'kode_brng' => 'B00001000',
            'jml' => 10.0,
            'aturan_pakai' => '3 x 1',
          ),
          6 => 
          array (
            'no_resep' => '202505260002',
            'kode_brng' => 'B00001000',
            'jml' => 10.0,
            'aturan_pakai' => '3 x 1',
          ),
          7 => 
          array (
            'no_resep' => '202505260002',
            'kode_brng' => 'B000000791',
            'jml' => 10.0,
            'aturan_pakai' => '2 x1',
          ),
          8 => 
          array (
            'no_resep' => '202506030001',
            'kode_brng' => 'B000000791',
            'jml' => 10.0,
            'aturan_pakai' => '2 x 1',
          ),
          9 => 
          array (
            'no_resep' => '202506030001',
            'kode_brng' => 'B000000575',
            'jml' => 10.0,
            'aturan_pakai' => '3 x 1',
          ),
          10 => 
          array (
            'no_resep' => '202506030003',
            'kode_brng' => 'B000000305',
            'jml' => 10.0,
            'aturan_pakai' => '',
          ),
          11 => 
          array (
            'no_resep' => '202506030003',
            'kode_brng' => 'B000000560',
            'jml' => 10.0,
            'aturan_pakai' => '',
          ),
          12 => 
          array (
            'no_resep' => '202506040001',
            'kode_brng' => 'B000000789',
            'jml' => 1.0,
            'aturan_pakai' => '3 x 1',
          ),
          13 => 
          array (
            'no_resep' => '202506040001',
            'kode_brng' => 'B00001000',
            'jml' => 10.0,
            'aturan_pakai' => '2 x 1',
          ),
          14 => 
          array (
            'no_resep' => '202506090001',
            'kode_brng' => 'B000001277',
            'jml' => 10.0,
            'aturan_pakai' => '3 x 1',
          ),
          15 => 
          array (
            'no_resep' => '202506110001',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '2 X 1',
          ),
          16 => 
          array (
            'no_resep' => '202506180001',
            'kode_brng' => 'B000000791',
            'jml' => 20.0,
            'aturan_pakai' => '3 x 1',
          ),
          17 => 
          array (
            'no_resep' => '202506180001',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '1 x 1',
          ),
          18 => 
          array (
            'no_resep' => '202506200001',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '2 X 1',
          ),
          19 => 
          array (
            'no_resep' => '202506200002',
            'kode_brng' => 'B000000376',
            'jml' => 1.0,
            'aturan_pakai' => '3 x 1',
          ),
          20 => 
          array (
            'no_resep' => '202506200003',
            'kode_brng' => 'B00001000',
            'jml' => 10.0,
            'aturan_pakai' => '3 x 1',
          ),
          21 => 
          array (
            'no_resep' => '202506200003',
            'kode_brng' => 'B000000791',
            'jml' => 10.0,
            'aturan_pakai' => '2 x1',
          ),
          22 => 
          array (
            'no_resep' => '202506200004',
            'kode_brng' => 'B000000157',
            'jml' => 10.0,
            'aturan_pakai' => '3 X 1',
          ),
          23 => 
          array (
            'no_resep' => '202506230001',
            'kode_brng' => 'B000000157',
            'jml' => 10.0,
            'aturan_pakai' => '3 X 1',
          ),
          24 => 
          array (
            'no_resep' => '202506230002',
            'kode_brng' => '2018001',
            'jml' => 10.0,
            'aturan_pakai' => '2 x 1',
          ),
          25 => 
          array (
            'no_resep' => '202506280001',
            'kode_brng' => 'B000000789',
            'jml' => 1.0,
            'aturan_pakai' => '3 x 1',
          ),
          26 => 
          array (
            'no_resep' => '202506280002',
            'kode_brng' => 'B000000157',
            'jml' => 10.0,
            'aturan_pakai' => '3 X 1',
          ),
          27 => 
          array (
            'no_resep' => '202506300001',
            'kode_brng' => 'B000000791',
            'jml' => 10.0,
            'aturan_pakai' => '2 X 1',
          ),
          28 => 
          array (
            'no_resep' => '202506300001',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '2 X 1',
          ),
          29 => 
          array (
            'no_resep' => '202506300002',
            'kode_brng' => 'B00001000',
            'jml' => 10.0,
            'aturan_pakai' => '3 x 1',
          ),
          30 => 
          array (
            'no_resep' => '202506300002',
            'kode_brng' => 'B000000791',
            'jml' => 10.0,
            'aturan_pakai' => '2 x1',
          ),
          31 => 
          array (
            'no_resep' => '202507040001',
            'kode_brng' => 'B000000791',
            'jml' => 10.0,
            'aturan_pakai' => '2x1',
          ),
          32 => 
          array (
            'no_resep' => '202507040002',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '2 X 1',
          ),
          33 => 
          array (
            'no_resep' => '202507050001',
            'kode_brng' => 'B000000791',
            'jml' => 10.0,
            'aturan_pakai' => '',
          ),
          34 => 
          array (
            'no_resep' => '202507050002',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '2 X 1',
          ),
          35 => 
          array (
            'no_resep' => '202507070001',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '2 X 1',
          ),
          36 => 
          array (
            'no_resep' => '202507070002',
            'kode_brng' => 'B000000157',
            'jml' => 10.0,
            'aturan_pakai' => '3 X 1',
          ),
          37 => 
          array (
            'no_resep' => '202507140001',
            'kode_brng' => 'B000000791',
            'jml' => 10.0,
            'aturan_pakai' => '1 x 2',
          ),
          38 => 
          array (
            'no_resep' => '202507210001',
            'kode_brng' => 'B000000157',
            'jml' => 10.0,
            'aturan_pakai' => '3 X 1',
          ),
          39 => 
          array (
            'no_resep' => '202507230001',
            'kode_brng' => 'B000000157',
            'jml' => 10.0,
            'aturan_pakai' => '3 X 1',
          ),
          40 => 
          array (
            'no_resep' => '202507230002',
            'kode_brng' => 'B000000791',
            'jml' => 10.0,
            'aturan_pakai' => ' 2 x 1',
          ),
          41 => 
          array (
            'no_resep' => '202507230002',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '3x 1',
          ),
          42 => 
          array (
            'no_resep' => '202507290001',
            'kode_brng' => 'B000000791',
            'jml' => 10.0,
            'aturan_pakai' => '2x1',
          ),
          43 => 
          array (
            'no_resep' => '202507290001',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          44 => 
          array (
            'no_resep' => '202508040001',
            'kode_brng' => 'B000000157',
            'jml' => 10.0,
            'aturan_pakai' => '3 X 1',
          ),
          45 => 
          array (
            'no_resep' => '202508040002',
            'kode_brng' => 'B000000791',
            'jml' => 10.0,
            'aturan_pakai' => '2x 1',
          ),
          46 => 
          array (
            'no_resep' => '202508040002',
            'kode_brng' => 'B000000571',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          47 => 
          array (
            'no_resep' => '202508040003',
            'kode_brng' => 'B000000556',
            'jml' => 10.0,
            'aturan_pakai' => '2x1',
          ),
          48 => 
          array (
            'no_resep' => '202508040004',
            'kode_brng' => 'B000000571',
            'jml' => 10.0,
            'aturan_pakai' => '2x1',
          ),
          49 => 
          array (
            'no_resep' => '202508050002',
            'kode_brng' => 'B000001207',
            'jml' => 10.0,
            'aturan_pakai' => '2x1',
          ),
          50 => 
          array (
            'no_resep' => '202508050002',
            'kode_brng' => 'B000000556',
            'jml' => 10.0,
            'aturan_pakai' => '2x1',
          ),
          51 => 
          array (
            'no_resep' => '202508110001',
            'kode_brng' => 'B000000157',
            'jml' => 10.0,
            'aturan_pakai' => '3 X 1',
          ),
          52 => 
          array (
            'no_resep' => '202508190001',
            'kode_brng' => 'B000000305',
            'jml' => 10.0,
            'aturan_pakai' => '',
          ),
          53 => 
          array (
            'no_resep' => '202508190001',
            'kode_brng' => 'B000000560',
            'jml' => 10.0,
            'aturan_pakai' => '',
          ),
          54 => 
          array (
            'no_resep' => '202508210001',
            'kode_brng' => 'B000000791',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          55 => 
          array (
            'no_resep' => '202508210001',
            'kode_brng' => 'B000000572',
            'jml' => 10.0,
            'aturan_pakai' => '2x1',
          ),
          56 => 
          array (
            'no_resep' => '202508250001',
            'kode_brng' => 'B000000157',
            'jml' => 10.0,
            'aturan_pakai' => '3 X 1',
          ),
          57 => 
          array (
            'no_resep' => '202508250002',
            'kode_brng' => 'B000000791',
            'jml' => 10.0,
            'aturan_pakai' => '2x1',
          ),
          58 => 
          array (
            'no_resep' => '202508250002',
            'kode_brng' => 'B000000571',
            'jml' => 10.0,
            'aturan_pakai' => '3 x 1',
          ),
          59 => 
          array (
            'no_resep' => '202508260001',
            'kode_brng' => 'B000001659',
            'jml' => 10.0,
            'aturan_pakai' => '',
          ),
          60 => 
          array (
            'no_resep' => '202511080001',
            'kode_brng' => '2018001',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          61 => 
          array (
            'no_resep' => '202511080001',
            'kode_brng' => '2018003',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          62 => 
          array (
            'no_resep' => '202511120001',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          63 => 
          array (
            'no_resep' => '202511120002',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          64 => 
          array (
            'no_resep' => '202511130001',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          65 => 
          array (
            'no_resep' => '202511220001',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '3X1',
          ),
          66 => 
          array (
            'no_resep' => '202511230001',
            'kode_brng' => '2018001',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          67 => 
          array (
            'no_resep' => '202511230001',
            'kode_brng' => 'A000000003',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          68 => 
          array (
            'no_resep' => '202511240001',
            'kode_brng' => 'A000000041',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          69 => 
          array (
            'no_resep' => '202511240001',
            'kode_brng' => 'A000000102',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          70 => 
          array (
            'no_resep' => '202511270001',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '3X1',
          ),
          71 => 
          array (
            'no_resep' => '202511270001',
            'kode_brng' => 'B000001170',
            'jml' => 10.0,
            'aturan_pakai' => '3X1',
          ),
          72 => 
          array (
            'no_resep' => '202511280001',
            'kode_brng' => 'B000001170',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          73 => 
          array (
            'no_resep' => '202511280001',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          74 => 
          array (
            'no_resep' => '202511300001',
            'kode_brng' => 'B000000286',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          75 => 
          array (
            'no_resep' => '202511300001',
            'kode_brng' => 'B000000378',
            'jml' => 7.0,
            'aturan_pakai' => '3x1',
          ),
          76 => 
          array (
            'no_resep' => '202512010001',
            'kode_brng' => 'B000000572',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          77 => 
          array (
            'no_resep' => '202512010001',
            'kode_brng' => '2018001',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          78 => 
          array (
            'no_resep' => '202512010002',
            'kode_brng' => 'B000001170',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          79 => 
          array (
            'no_resep' => '202512010002',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          80 => 
          array (
            'no_resep' => '202512010003',
            'kode_brng' => 'B000000002',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          81 => 
          array (
            'no_resep' => '202512010003',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          82 => 
          array (
            'no_resep' => '202512010003',
            'kode_brng' => 'A000000032',
            'jml' => 1.0,
            'aturan_pakai' => '3x1',
          ),
          83 => 
          array (
            'no_resep' => '202512010004',
            'kode_brng' => 'B000000571',
            'jml' => 12.0,
            'aturan_pakai' => '3x1',
          ),
          84 => 
          array (
            'no_resep' => '202512010004',
            'kode_brng' => 'B000001170',
            'jml' => 12.0,
            'aturan_pakai' => '3x1',
          ),
          85 => 
          array (
            'no_resep' => '202512010004',
            'kode_brng' => 'A000000125',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          86 => 
          array (
            'no_resep' => '202512010005',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          87 => 
          array (
            'no_resep' => '202512010005',
            'kode_brng' => 'B000000168',
            'jml' => 12.0,
            'aturan_pakai' => '3x1',
          ),
          88 => 
          array (
            'no_resep' => '202512010005',
            'kode_brng' => 'B000000565',
            'jml' => 12.0,
            'aturan_pakai' => '3x1',
          ),
          89 => 
          array (
            'no_resep' => '202512010006',
            'kode_brng' => 'B000000571',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          90 => 
          array (
            'no_resep' => '202512010006',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          91 => 
          array (
            'no_resep' => '202512010006',
            'kode_brng' => 'B000000133',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          92 => 
          array (
            'no_resep' => '202512010007',
            'kode_brng' => 'B000000965',
            'jml' => 10.0,
            'aturan_pakai' => '3x1',
          ),
          93 => 
          array (
            'no_resep' => '202512010007',
            'kode_brng' => 'B000000584',
            'jml' => 2.0,
            'aturan_pakai' => '2x1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}