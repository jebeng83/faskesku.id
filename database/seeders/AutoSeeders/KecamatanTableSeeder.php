<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KecamatanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kecamatan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kecamatan')->insert(array (
          0 => 
          array (
            'kd_kec' => 0,
            'nm_kec' => '',
          ),
          1 => 
          array (
            'kd_kec' => 1,
            'nm_kec' => '-',
          ),
          2 => 
          array (
            'kd_kec' => 52,
            'nm_kec' => '-MATARAM',
          ),
          3 => 
          array (
            'kd_kec' => 480,
            'nm_kec' => '-PRAYA',
          ),
          4 => 
          array (
            'kd_kec' => 494,
            'nm_kec' => '-PUJUT',
          ),
          5 => 
          array (
            'kd_kec' => 194,
            'nm_kec' => '1',
          ),
          6 => 
          array (
            'kd_kec' => 90,
            'nm_kec' => '12',
          ),
          7 => 
          array (
            'kd_kec' => 77,
            'nm_kec' => 'AMPENAN',
          ),
          8 => 
          array (
            'kd_kec' => 728,
            'nm_kec' => 'ARCAMANIK',
          ),
          9 => 
          array (
            'kd_kec' => 9,
            'nm_kec' => 'ASASA',
          ),
          10 => 
          array (
            'kd_kec' => 721,
            'nm_kec' => 'ASASA 1212',
          ),
          11 => 
          array (
            'kd_kec' => 713,
            'nm_kec' => 'ASASAS',
          ),
          12 => 
          array (
            'kd_kec' => 164,
            'nm_kec' => 'BAITURRAHMAN',
          ),
          13 => 
          array (
            'kd_kec' => 246,
            'nm_kec' => 'BAJO',
          ),
          14 => 
          array (
            'kd_kec' => 190,
            'nm_kec' => 'BANDA SAKTI',
          ),
          15 => 
          array (
            'kd_kec' => 532,
            'nm_kec' => 'BANTEN',
          ),
          16 => 
          array (
            'kd_kec' => 91,
            'nm_kec' => 'BANTUL',
          ),
          17 => 
          array (
            'kd_kec' => 448,
            'nm_kec' => 'BATUKLIANG',
          ),
          18 => 
          array (
            'kd_kec' => 204,
            'nm_kec' => 'BELOPA',
          ),
          19 => 
          array (
            'kd_kec' => 467,
            'nm_kec' => 'BODAK',
          ),
          20 => 
          array (
            'kd_kec' => 792,
            'nm_kec' => 'BOJONEGORO',
          ),
          21 => 
          array (
            'kd_kec' => 124,
            'nm_kec' => 'BOJONGSARI',
          ),
          22 => 
          array (
            'kd_kec' => 634,
            'nm_kec' => 'BUER',
          ),
          23 => 
          array (
            'kd_kec' => 146,
            'nm_kec' => 'CIBINONG',
          ),
          24 => 
          array (
            'kd_kec' => 569,
            'nm_kec' => 'CILINCING',
          ),
          25 => 
          array (
            'kd_kec' => 263,
            'nm_kec' => 'CIMANGGU',
          ),
          26 => 
          array (
            'kd_kec' => 340,
            'nm_kec' => 'CIPARI',
          ),
          27 => 
          array (
            'kd_kec' => 92,
            'nm_kec' => 'CIRACAS',
          ),
          28 => 
          array (
            'kd_kec' => 156,
            'nm_kec' => 'DARUL IMARAH',
          ),
          29 => 
          array (
            'kd_kec' => 267,
            'nm_kec' => 'DAYEUHLUHUR',
          ),
          30 => 
          array (
            'kd_kec' => 152,
            'nm_kec' => 'DEPOK',
          ),
          31 => 
          array (
            'kd_kec' => 120,
            'nm_kec' => 'DEPOK 2',
          ),
          32 => 
          array (
            'kd_kec' => 733,
            'nm_kec' => 'GANDUS',
          ),
          33 => 
          array (
            'kd_kec' => 87,
            'nm_kec' => 'GERUNG',
          ),
          34 => 
          array (
            'kd_kec' => 636,
            'nm_kec' => 'GRABAG',
          ),
          35 => 
          array (
            'kd_kec' => 79,
            'nm_kec' => 'GUNUNGSARI',
          ),
          36 => 
          array (
            'kd_kec' => 155,
            'nm_kec' => 'JAYA BARU',
          ),
          37 => 
          array (
            'kd_kec' => 487,
            'nm_kec' => 'JONGAT',
          ),
          38 => 
          array (
            'kd_kec' => 493,
            'nm_kec' => 'JONTLAK',
          ),
          39 => 
          array (
            'kd_kec' => 25,
            'nm_kec' => 'JURANGJERO',
          ),
          40 => 
          array (
            'kd_kec' => 635,
            'nm_kec' => 'KALIREJO',
          ),
          41 => 
          array (
            'kd_kec' => 32,
            'nm_kec' => 'KARANG BARU',
          ),
          42 => 
          array (
            'kd_kec' => 782,
            'nm_kec' => 'KARANG TENGAH',
          ),
          43 => 
          array (
            'kd_kec' => 694,
            'nm_kec' => 'KARANGMOJO',
          ),
          44 => 
          array (
            'kd_kec' => 400,
            'nm_kec' => 'KARANGPUCUNG',
          ),
          45 => 
          array (
            'kd_kec' => 12,
            'nm_kec' => 'KARTASURA',
          ),
          46 => 
          array (
            'kd_kec' => 626,
            'nm_kec' => 'KARTOHARJO',
          ),
          47 => 
          array (
            'kd_kec' => 150,
            'nm_kec' => 'KAWIR',
          ),
          48 => 
          array (
            'kd_kec' => 681,
            'nm_kec' => 'KECAMATAN',
          ),
          49 => 
          array (
            'kd_kec' => 442,
            'nm_kec' => 'KEDUNGREJA',
          ),
          50 => 
          array (
            'kd_kec' => 8,
            'nm_kec' => 'KISMANTORO',
          ),
          51 => 
          array (
            'kd_kec' => 2,
            'nm_kec' => 'KLATEN UTARA',
          ),
          52 => 
          array (
            'kd_kec' => 492,
            'nm_kec' => 'KOPANG',
          ),
          53 => 
          array (
            'kd_kec' => 506,
            'nm_kec' => 'KOTA DEPOK',
          ),
          54 => 
          array (
            'kd_kec' => 738,
            'nm_kec' => 'KOTO BARU',
          ),
          55 => 
          array (
            'kd_kec' => 503,
            'nm_kec' => 'KURANJI',
          ),
          56 => 
          array (
            'kd_kec' => 170,
            'nm_kec' => 'KUTA ALAM ',
          ),
          57 => 
          array (
            'kd_kec' => 693,
            'nm_kec' => 'LAWANG',
          ),
          58 => 
          array (
            'kd_kec' => 680,
            'nm_kec' => 'LEBONG SAKTI',
          ),
          59 => 
          array (
            'kd_kec' => 75,
            'nm_kec' => 'LOTENG',
          ),
          60 => 
          array (
            'kd_kec' => 61,
            'nm_kec' => 'LOTIM',
          ),
          61 => 
          array (
            'kd_kec' => 148,
            'nm_kec' => 'M',
          ),
          62 => 
          array (
            'kd_kec' => 481,
            'nm_kec' => 'MADURA',
          ),
          63 => 
          array (
            'kd_kec' => 18,
            'nm_kec' => 'MAGELANG SELATAN',
          ),
          64 => 
          array (
            'kd_kec' => 3,
            'nm_kec' => 'MAGETAN UTARA',
          ),
          65 => 
          array (
            'kd_kec' => 40,
            'nm_kec' => 'MAJELUK',
          ),
          66 => 
          array (
            'kd_kec' => 260,
            'nm_kec' => 'MAJENANG',
          ),
          67 => 
          array (
            'kd_kec' => 153,
            'nm_kec' => 'MAKASAR',
          ),
          68 => 
          array (
            'kd_kec' => 791,
            'nm_kec' => 'MANUHING',
          ),
          69 => 
          array (
            'kd_kec' => 30,
            'nm_kec' => 'MATARAM',
          ),
          70 => 
          array (
            'kd_kec' => 189,
            'nm_kec' => 'MEURAXA',
          ),
          71 => 
          array (
            'kd_kec' => 11,
            'nm_kec' => 'MOJAYAN',
          ),
          72 => 
          array (
            'kd_kec' => 24,
            'nm_kec' => 'MOJOSONGO',
          ),
          73 => 
          array (
            'kd_kec' => 165,
            'nm_kec' => 'MONTASIK',
          ),
          74 => 
          array (
            'kd_kec' => 191,
            'nm_kec' => 'MUARA DUA',
          ),
          75 => 
          array (
            'kd_kec' => 540,
            'nm_kec' => 'MUARA ENIM',
          ),
          76 => 
          array (
            'kd_kec' => 49,
            'nm_kec' => 'NARMADA',
          ),
          77 => 
          array (
            'kd_kec' => 543,
            'nm_kec' => 'NATAR',
          ),
          78 => 
          array (
            'kd_kec' => 737,
            'nm_kec' => 'PADANG SELATAN',
          ),
          79 => 
          array (
            'kd_kec' => 500,
            'nm_kec' => 'PAJANGAN',
          ),
          80 => 
          array (
            'kd_kec' => 93,
            'nm_kec' => 'PAMULANG',
          ),
          81 => 
          array (
            'kd_kec' => 193,
            'nm_kec' => 'PARDASUKA',
          ),
          82 => 
          array (
            'kd_kec' => 81,
            'nm_kec' => 'PRAYA',
          ),
          83 => 
          array (
            'kd_kec' => 444,
            'nm_kec' => 'PRAYA BARAT',
          ),
          84 => 
          array (
            'kd_kec' => 466,
            'nm_kec' => 'PRAYA TENGAH',
          ),
          85 => 
          array (
            'kd_kec' => 725,
            'nm_kec' => 'PREMBUN',
          ),
          86 => 
          array (
            'kd_kec' => 192,
            'nm_kec' => 'PRINGSEWU',
          ),
          87 => 
          array (
            'kd_kec' => 499,
            'nm_kec' => 'PRRAYA',
          ),
          88 => 
          array (
            'kd_kec' => 490,
            'nm_kec' => 'PUJUT',
          ),
          89 => 
          array (
            'kd_kec' => 577,
            'nm_kec' => 'PULO GADUNG',
          ),
          90 => 
          array (
            'kd_kec' => 589,
            'nm_kec' => 'PURWODADI',
          ),
          91 => 
          array (
            'kd_kec' => 6,
            'nm_kec' => 'PURWOKERTO BARAT',
          ),
          92 => 
          array (
            'kd_kec' => 10,
            'nm_kec' => 'QWQWQ',
          ),
          93 => 
          array (
            'kd_kec' => 238,
            'nm_kec' => 'SABE',
          ),
          94 => 
          array (
            'kd_kec' => 716,
            'nm_kec' => 'SASAS',
          ),
          95 => 
          array (
            'kd_kec' => 97,
            'nm_kec' => 'SAWANGAN',
          ),
          96 => 
          array (
            'kd_kec' => 154,
            'nm_kec' => 'SEJAHTERA',
          ),
          97 => 
          array (
            'kd_kec' => 504,
            'nm_kec' => 'SEKAPUK',
          ),
          98 => 
          array (
            'kd_kec' => 35,
            'nm_kec' => 'SELAPARANG',
          ),
          99 => 
          array (
            'kd_kec' => 89,
            'nm_kec' => 'sementara',
          ),
          100 => 
          array (
            'kd_kec' => 784,
            'nm_kec' => 'SERENGAN',
          ),
          101 => 
          array (
            'kd_kec' => 660,
            'nm_kec' => 'SERI KUALA LOBAM',
          ),
          102 => 
          array (
            'kd_kec' => 723,
            'nm_kec' => 'SINGKIL',
          ),
          103 => 
          array (
            'kd_kec' => 505,
            'nm_kec' => 'SLOGOHIMO',
          ),
          104 => 
          array (
            'kd_kec' => 533,
            'nm_kec' => 'Soreang',
          ),
          105 => 
          array (
            'kd_kec' => 108,
            'nm_kec' => 'SUKMAJAYA',
          ),
          106 => 
          array (
            'kd_kec' => 231,
            'nm_kec' => 'SULI',
          ),
          107 => 
          array (
            'kd_kec' => 778,
            'nm_kec' => 'TANAH GROGOT',
          ),
          108 => 
          array (
            'kd_kec' => 730,
            'nm_kec' => 'TANJUNG SENANG',
          ),
          109 => 
          array (
            'kd_kec' => 151,
            'nm_kec' => 'TAPOS',
          ),
          110 => 
          array (
            'kd_kec' => 15,
            'nm_kec' => 'TEMON',
          ),
          111 => 
          array (
            'kd_kec' => 717,
            'nm_kec' => 'TEUPAH SELATAN',
          ),
          112 => 
          array (
            'kd_kec' => 637,
            'nm_kec' => 'TRANGKIL',
          ),
          113 => 
          array (
            'kd_kec' => 168,
            'nm_kec' => 'ULEE KARENGBANDA ACEH',
          ),
          114 => 
          array (
            'kd_kec' => 593,
            'nm_kec' => 'WONOASRI',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}