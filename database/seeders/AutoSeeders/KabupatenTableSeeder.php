<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KabupatenTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kabupaten')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kabupaten')->insert(array (
          0 => 
          array (
            'kd_kab' => 4,
            'nm_kab' => '',
          ),
          1 => 
          array (
            'kd_kab' => 1,
            'nm_kab' => '-',
          ),
          2 => 
          array (
            'kd_kab' => 385,
            'nm_kab' => '- BANTUL',
          ),
          3 => 
          array (
            'kd_kab' => 321,
            'nm_kab' => '- GROBOGAN',
          ),
          4 => 
          array (
            'kd_kab' => 367,
            'nm_kab' => '- LAMPUNG TENGAH',
          ),
          5 => 
          array (
            'kd_kab' => 325,
            'nm_kab' => '- MADIUN',
          ),
          6 => 
          array (
            'kd_kab' => 369,
            'nm_kab' => '- PATI',
          ),
          7 => 
          array (
            'kd_kab' => 368,
            'nm_kab' => '- PURWOREJO',
          ),
          8 => 
          array (
            'kd_kab' => 366,
            'nm_kab' => '- SUMBAWA',
          ),
          9 => 
          array (
            'kd_kab' => 160,
            'nm_kab' => '1',
          ),
          10 => 
          array (
            'kd_kab' => 155,
            'nm_kab' => 'ACEH BESAR',
          ),
          11 => 
          array (
            'kd_kab' => 9,
            'nm_kab' => 'ASAS',
          ),
          12 => 
          array (
            'kd_kab' => 448,
            'nm_kab' => 'ASASAS',
          ),
          13 => 
          array (
            'kd_kab' => 154,
            'nm_kab' => 'BANDA ACEH',
          ),
          14 => 
          array (
            'kd_kab' => 232,
            'nm_kab' => 'BANTUL',
          ),
          15 => 
          array (
            'kd_kab' => 6,
            'nm_kab' => 'BANYUMAS',
          ),
          16 => 
          array (
            'kd_kab' => 173,
            'nm_kab' => 'BELOPA UTARA ',
          ),
          17 => 
          array (
            'kd_kab' => 142,
            'nm_kab' => 'BOGOR',
          ),
          18 => 
          array (
            'kd_kab' => 453,
            'nm_kab' => 'BOGOR 1212',
          ),
          19 => 
          array (
            'kd_kab' => 143,
            'nm_kab' => 'BOGORPERUM KOSTRAD',
          ),
          20 => 
          array (
            'kd_kab' => 238,
            'nm_kab' => 'BREBES',
          ),
          21 => 
          array (
            'kd_kab' => 25,
            'nm_kab' => 'BUMIAYU',
          ),
          22 => 
          array (
            'kd_kab' => 194,
            'nm_kab' => 'BUNGO',
          ),
          23 => 
          array (
            'kd_kab' => 187,
            'nm_kab' => 'CILACAP',
          ),
          24 => 
          array (
            'kd_kab' => 144,
            'nm_kab' => 'D',
          ),
          25 => 
          array (
            'kd_kab' => 120,
            'nm_kab' => 'DEPOK',
          ),
          26 => 
          array (
            'kd_kab' => 80,
            'nm_kab' => 'GERUNG',
          ),
          27 => 
          array (
            'kd_kab' => 236,
            'nm_kab' => 'GRESIK',
          ),
          28 => 
          array (
            'kd_kab' => 152,
            'nm_kab' => 'JAKARTA TIMUR',
          ),
          29 => 
          array (
            'kd_kab' => 147,
            'nm_kab' => 'JATENG',
          ),
          30 => 
          array (
            'kd_kab' => 265,
            'nm_kab' => 'Kab. Bandung',
          ),
          31 => 
          array (
            'kd_kab' => 231,
            'nm_kab' => 'KAB. LOMBOK TEBNGAH',
          ),
          32 => 
          array (
            'kd_kab' => 227,
            'nm_kab' => 'KAB. LOMBOK TENGAH',
          ),
          33 => 
          array (
            'kd_kab' => 413,
            'nm_kab' => 'KABUPATEN',
          ),
          34 => 
          array (
            'kd_kab' => 455,
            'nm_kab' => 'KABUPATEN ACEH SINGKIL',
          ),
          35 => 
          array (
            'kd_kab' => 387,
            'nm_kab' => 'KABUPATEN BANTUL',
          ),
          36 => 
          array (
            'kd_kab' => 392,
            'nm_kab' => 'KABUPATEN BINTAN',
          ),
          37 => 
          array (
            'kd_kab' => 524,
            'nm_kab' => 'KABUPATEN BOJONEGORO',
          ),
          38 => 
          array (
            'kd_kab' => 470,
            'nm_kab' => 'KABUPATEN DHARMASRAYA',
          ),
          39 => 
          array (
            'kd_kab' => 426,
            'nm_kab' => 'KABUPATEN GUNUNG KIDUL',
          ),
          40 => 
          array (
            'kd_kab' => 523,
            'nm_kab' => 'KABUPATEN GUNUNG MAS',
          ),
          41 => 
          array (
            'kd_kab' => 457,
            'nm_kab' => 'KABUPATEN KEBUMEN',
          ),
          42 => 
          array (
            'kd_kab' => 412,
            'nm_kab' => 'KABUPATEN LEBONG',
          ),
          43 => 
          array (
            'kd_kab' => 401,
            'nm_kab' => 'KABUPATEN MAGELANG',
          ),
          44 => 
          array (
            'kd_kab' => 425,
            'nm_kab' => 'KABUPATEN MALANG',
          ),
          45 => 
          array (
            'kd_kab' => 510,
            'nm_kab' => 'KABUPATEN PASER',
          ),
          46 => 
          array (
            'kd_kab' => 394,
            'nm_kab' => 'KABUPATEN PURWOREJO',
          ),
          47 => 
          array (
            'kd_kab' => 449,
            'nm_kab' => 'KABUPATEN SIMEULUE',
          ),
          48 => 
          array (
            'kd_kab' => 12,
            'nm_kab' => 'KARTASURA',
          ),
          49 => 
          array (
            'kd_kab' => 2,
            'nm_kab' => 'KLATEN',
          ),
          50 => 
          array (
            'kd_kab' => 462,
            'nm_kab' => 'KOTA BANDAR LAMPUNG',
          ),
          51 => 
          array (
            'kd_kab' => 460,
            'nm_kab' => 'KOTA BANDUNG',
          ),
          52 => 
          array (
            'kd_kab' => 309,
            'nm_kab' => 'KOTA JAKARTA TIMUR',
          ),
          53 => 
          array (
            'kd_kab' => 301,
            'nm_kab' => 'KOTA JAKARTA UTARA',
          ),
          54 => 
          array (
            'kd_kab' => 358,
            'nm_kab' => 'KOTA MADIUN',
          ),
          55 => 
          array (
            'kd_kab' => 18,
            'nm_kab' => 'KOTA MAGELANG',
          ),
          56 => 
          array (
            'kd_kab' => 469,
            'nm_kab' => 'KOTA PADANG',
          ),
          57 => 
          array (
            'kd_kab' => 465,
            'nm_kab' => 'KOTA PALEMBANG',
          ),
          58 => 
          array (
            'kd_kab' => 516,
            'nm_kab' => 'KOTA SURAKARTA',
          ),
          59 => 
          array (
            'kd_kab' => 514,
            'nm_kab' => 'KOTA TANGERANG',
          ),
          60 => 
          array (
            'kd_kab' => 15,
            'nm_kab' => 'KULONPROGO',
          ),
          61 => 
          array (
            'kd_kab' => 275,
            'nm_kab' => 'LAMPUNG SELATAN',
          ),
          62 => 
          array (
            'kd_kab' => 235,
            'nm_kab' => 'LB LINTAH',
          ),
          63 => 
          array (
            'kd_kab' => 158,
            'nm_kab' => 'LHOKSEUMAMWE',
          ),
          64 => 
          array (
            'kd_kab' => 156,
            'nm_kab' => 'LHOKSEUMAWE',
          ),
          65 => 
          array (
            'kd_kab' => 39,
            'nm_kab' => 'LOBAR',
          ),
          66 => 
          array (
            'kd_kab' => 48,
            'nm_kab' => 'LOMBOK BARAT',
          ),
          67 => 
          array (
            'kd_kab' => 198,
            'nm_kab' => 'LOMBOK TENGAH',
          ),
          68 => 
          array (
            'kd_kab' => 207,
            'nm_kab' => 'LOMBOK TENGAHG',
          ),
          69 => 
          array (
            'kd_kab' => 224,
            'nm_kab' => 'LOMBOK UTARA',
          ),
          70 => 
          array (
            'kd_kab' => 74,
            'nm_kab' => 'LOTENG',
          ),
          71 => 
          array (
            'kd_kab' => 60,
            'nm_kab' => 'LOTIM',
          ),
          72 => 
          array (
            'kd_kab' => 170,
            'nm_kab' => 'LUWU',
          ),
          73 => 
          array (
            'kd_kab' => 11,
            'nm_kab' => 'MADIUN',
          ),
          74 => 
          array (
            'kd_kab' => 212,
            'nm_kab' => 'MADURA',
          ),
          75 => 
          array (
            'kd_kab' => 153,
            'nm_kab' => 'MAGELANG',
          ),
          76 => 
          array (
            'kd_kab' => 3,
            'nm_kab' => 'MAGETAN',
          ),
          77 => 
          array (
            'kd_kab' => 197,
            'nm_kab' => 'MALANG',
          ),
          78 => 
          array (
            'kd_kab' => 30,
            'nm_kab' => 'MATARAM',
          ),
          79 => 
          array (
            'kd_kab' => 272,
            'nm_kab' => 'MUARA ENIM',
          ),
          80 => 
          array (
            'kd_kab' => 32,
            'nm_kab' => 'NTB',
          ),
          81 => 
          array (
            'kd_kab' => 93,
            'nm_kab' => 'PAMULANG',
          ),
          82 => 
          array (
            'kd_kab' => 90,
            'nm_kab' => 'PRAYA',
          ),
          83 => 
          array (
            'kd_kab' => 159,
            'nm_kab' => 'PRINGSEWU',
          ),
          84 => 
          array (
            'kd_kab' => 97,
            'nm_kab' => 'SAWANGAN',
          ),
          85 => 
          array (
            'kd_kab' => 225,
            'nm_kab' => 'SENGKOL',
          ),
          86 => 
          array (
            'kd_kab' => 108,
            'nm_kab' => 'SUKMAJAYA',
          ),
          87 => 
          array (
            'kd_kab' => 444,
            'nm_kab' => 'TES SAJA',
          ),
          88 => 
          array (
            'kd_kab' => 24,
            'nm_kab' => 'TULUNGAGUNG',
          ),
          89 => 
          array (
            'kd_kab' => 8,
            'nm_kab' => 'WONOGIRI',
          ),
          90 => 
          array (
            'kd_kab' => 10,
            'nm_kab' => 'WQWQW',
          ),
          91 => 
          array (
            'kd_kab' => 91,
            'nm_kab' => 'YOGYAKARTA',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}