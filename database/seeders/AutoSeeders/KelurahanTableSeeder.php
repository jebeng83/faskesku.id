<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KelurahanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kelurahan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kelurahan')->insert(array (
          0 => 
          array (
            'kd_kel' => 4,
            'nm_kel' => '',
          ),
          1 => 
          array (
            'kd_kel' => 1,
            'nm_kel' => '-',
          ),
          2 => 
          array (
            'kd_kel' => 1061,
            'nm_kel' => 'BAJO',
          ),
          3 => 
          array (
            'kd_kel' => 10,
            'nm_kel' => 'BANGUNSARI',
          ),
          4 => 
          array (
            'kd_kel' => 25,
            'nm_kel' => 'BANJARSARI',
          ),
          5 => 
          array (
            'kd_kel' => 201,
            'nm_kel' => 'BEDALI',
          ),
          6 => 
          array (
            'kd_kel' => 1053,
            'nm_kel' => 'BELOPA',
          ),
          7 => 
          array (
            'kd_kel' => 1101010218,
            'nm_kel' => 'BELOPA 21212',
          ),
          8 => 
          array (
            'kd_kel' => 1018,
            'nm_kel' => 'BELOPA UTARA ',
          ),
          9 => 
          array (
            'kd_kel' => 1407,
            'nm_kel' => 'BODAK',
          ),
          10 => 
          array (
            'kd_kel' => 962,
            'nm_kel' => 'BRUMAN',
          ),
          11 => 
          array (
            'kd_kel' => 1101010289,
            'nm_kel' => 'CAMPURJO',
          ),
          12 => 
          array (
            'kd_kel' => 8,
            'nm_kel' => 'CERABAK',
          ),
          13 => 
          array (
            'kd_kel' => 957,
            'nm_kel' => 'CIBINONG',
          ),
          14 => 
          array (
            'kd_kel' => 1398,
            'nm_kel' => 'CIP',
          ),
          15 => 
          array (
            'kd_kel' => 1101010225,
            'nm_kel' => 'CISARANTEN ENDAH',
          ),
          16 => 
          array (
            'kd_kel' => 935,
            'nm_kel' => 'CURUG',
          ),
          17 => 
          array (
            'kd_kel' => 987,
            'nm_kel' => 'DAYAH DABOH',
          ),
          18 => 
          array (
            'kd_kel' => 1382,
            'nm_kel' => 'DAYEUHLUHUR',
          ),
          19 => 
          array (
            'kd_kel' => 931,
            'nm_kel' => 'DEPOK 2',
          ),
          20 => 
          array (
            'kd_kel' => 3,
            'nm_kel' => 'DUKUH',
          ),
          21 => 
          array (
            'kd_kel' => 89,
            'nm_kel' => 'GERUNG',
          ),
          22 => 
          array (
            'kd_kel' => 968,
            'nm_kel' => 'GUE GAJAH',
          ),
          23 => 
          array (
            'kd_kel' => 43,
            'nm_kel' => 'GUNUGNSARI',
          ),
          24 => 
          array (
            'kd_kel' => 1441,
            'nm_kel' => 'GUWOSARI',
          ),
          25 => 
          array (
            'kd_kel' => 980,
            'nm_kel' => 'IE MASEN ULEE KARENG',
          ),
          26 => 
          array (
            'kd_kel' => 963,
            'nm_kel' => 'JATI JAJAR',
          ),
          27 => 
          array (
            'kd_kel' => 1406,
            'nm_kel' => 'JONTLAK',
          ),
          28 => 
          array (
            'kd_kel' => 1101010281,
            'nm_kel' => 'JOYOTAKAN',
          ),
          29 => 
          array (
            'kd_kel' => 1409,
            'nm_kel' => 'JURANG JALER',
          ),
          30 => 
          array (
            'kd_kel' => 24,
            'nm_kel' => 'KALIDAWIR',
          ),
          31 => 
          array (
            'kd_kel' => 900,
            'nm_kel' => 'kalitidu',
          ),
          32 => 
          array (
            'kd_kel' => 1044,
            'nm_kel' => 'KAMPUNG BARU',
          ),
          33 => 
          array (
            'kd_kel' => 1101010279,
            'nm_kel' => 'KARANG TIMUR',
          ),
          34 => 
          array (
            'kd_kel' => 1204,
            'nm_kel' => 'KARANGPUCUNG',
          ),
          35 => 
          array (
            'kd_kel' => 1250,
            'nm_kel' => 'KARANGREJA',
          ),
          36 => 
          array (
            'kd_kel' => 11,
            'nm_kel' => 'KARTASURA',
          ),
          37 => 
          array (
            'kd_kel' => 78,
            'nm_kel' => 'KEBON SARI',
          ),
          38 => 
          array (
            'kd_kel' => 1101010222,
            'nm_kel' => 'KEDUNGWARU',
          ),
          39 => 
          array (
            'kd_kel' => 202,
            'nm_kel' => 'KELURAHAN',
          ),
          40 => 
          array (
            'kd_kel' => 203,
            'nm_kel' => 'KROGOWANAN',
          ),
          41 => 
          array (
            'kd_kel' => 982,
            'nm_kel' => 'KUTA ALAM',
          ),
          42 => 
          array (
            'kd_kel' => 960,
            'nm_kel' => 'L',
          ),
          43 => 
          array (
            'kd_kel' => 985,
            'nm_kel' => 'LAM DINGIN',
          ),
          44 => 
          array (
            'kd_kel' => 1000,
            'nm_kel' => 'LAMPEUERUT',
          ),
          45 => 
          array (
            'kd_kel' => 981,
            'nm_kel' => 'LAMTEUMEN TIMUR',
          ),
          46 => 
          array (
            'kd_kel' => 50,
            'nm_kel' => 'LEMBUAK',
          ),
          47 => 
          array (
            'kd_kel' => 1383,
            'nm_kel' => 'LENENG',
          ),
          48 => 
          array (
            'kd_kel' => 76,
            'nm_kel' => 'LOTENG',
          ),
          49 => 
          array (
            'kd_kel' => 62,
            'nm_kel' => 'LOTIM',
          ),
          50 => 
          array (
            'kd_kel' => 1423,
            'nm_kel' => 'MADURA',
          ),
          51 => 
          array (
            'kd_kel' => 1196,
            'nm_kel' => 'MAJENANG',
          ),
          52 => 
          array (
            'kd_kel' => 965,
            'nm_kel' => 'MAKASAR',
          ),
          53 => 
          array (
            'kd_kel' => 966,
            'nm_kel' => 'MAKMUR',
          ),
          54 => 
          array (
            'kd_kel' => 1080,
            'nm_kel' => 'MANDALA',
          ),
          55 => 
          array (
            'kd_kel' => 1388,
            'nm_kel' => 'MANTANG',
          ),
          56 => 
          array (
            'kd_kel' => 46,
            'nm_kel' => 'MATARAM',
          ),
          57 => 
          array (
            'kd_kel' => 919,
            'nm_kel' => 'MEKARJAYA',
          ),
          58 => 
          array (
            'kd_kel' => 18,
            'nm_kel' => 'MERTOYUDAN',
          ),
          59 => 
          array (
            'kd_kel' => 80,
            'nm_kel' => 'MIDANG',
          ),
          60 => 
          array (
            'kd_kel' => 1084,
            'nm_kel' => 'MULYASARI',
          ),
          61 => 
          array (
            'kd_kel' => 200,
            'nm_kel' => 'NGIPAK',
          ),
          62 => 
          array (
            'kd_kel' => 1095,
            'nm_kel' => 'PADANGSARI',
          ),
          63 => 
          array (
            'kd_kel' => 30,
            'nm_kel' => 'PAGUTAN',
          ),
          64 => 
          array (
            'kd_kel' => 1355,
            'nm_kel' => 'PAHONJEAN',
          ),
          65 => 
          array (
            'kd_kel' => 902,
            'nm_kel' => 'PAJANGAN',
          ),
          66 => 
          array (
            'kd_kel' => 904,
            'nm_kel' => 'PAMULANG TIMUR',
          ),
          67 => 
          array (
            'kd_kel' => 1135,
            'nm_kel' => 'PANIMBANG',
          ),
          68 => 
          array (
            'kd_kel' => 1003,
            'nm_kel' => 'PARDASUKA',
          ),
          69 => 
          array (
            'kd_kel' => 1101010234,
            'nm_kel' => 'PASA GADANG',
          ),
          70 => 
          array (
            'kd_kel' => 1392,
            'nm_kel' => 'PENGADANG',
          ),
          71 => 
          array (
            'kd_kel' => 1384,
            'nm_kel' => 'PENUJAK',
          ),
          72 => 
          array (
            'kd_kel' => 1101010227,
            'nm_kel' => 'PERUMNAS WAY KANDIS',
          ),
          73 => 
          array (
            'kd_kel' => 976,
            'nm_kel' => 'PEUNITI',
          ),
          74 => 
          array (
            'kd_kel' => 82,
            'nm_kel' => 'PRAPEN',
          ),
          75 => 
          array (
            'kd_kel' => 99,
            'nm_kel' => 'PRAYA',
          ),
          76 => 
          array (
            'kd_kel' => 1007,
            'nm_kel' => 'PRINGSEW',
          ),
          77 => 
          array (
            'kd_kel' => 1002,
            'nm_kel' => 'PRINGSEWU',
          ),
          78 => 
          array (
            'kd_kel' => 1101010230,
            'nm_kel' => 'PULO KERTO',
          ),
          79 => 
          array (
            'kd_kel' => 967,
            'nm_kel' => 'PUNGE BLANG CUT',
          ),
          80 => 
          array (
            'kd_kel' => 86,
            'nm_kel' => 'PUNIA',
          ),
          81 => 
          array (
            'kd_kel' => 9,
            'nm_kel' => 'QWQW',
          ),
          82 => 
          array (
            'kd_kel' => 6,
            'nm_kel' => 'REJASARI',
          ),
          83 => 
          array (
            'kd_kel' => 204,
            'nm_kel' => 'SAMBILAWANG',
          ),
          84 => 
          array (
            'kd_kel' => 908,
            'nm_kel' => 'SAWANGAN BARU',
          ),
          85 => 
          array (
            'kd_kel' => 2,
            'nm_kel' => 'SEKARSULI',
          ),
          86 => 
          array (
            'kd_kel' => 32,
            'nm_kel' => 'SELAPARANG',
          ),
          87 => 
          array (
            'kd_kel' => 14,
            'nm_kel' => 'SELING',
          ),
          88 => 
          array (
            'kd_kel' => 1101010275,
            'nm_kel' => 'SEMPULANG',
          ),
          89 => 
          array (
            'kd_kel' => 1101010235,
            'nm_kel' => 'SIALANG GAUNG',
          ),
          90 => 
          array (
            'kd_kel' => 1077,
            'nm_kel' => 'SINDANGSARI',
          ),
          91 => 
          array (
            'kd_kel' => 1101010214,
            'nm_kel' => 'SUAK LAMATAN',
          ),
          92 => 
          array (
            'kd_kel' => 15,
            'nm_kel' => 'TEMON',
          ),
          93 => 
          array (
            'kd_kel' => 1394,
            'nm_kel' => 'TENGARI',
          ),
          94 => 
          array (
            'kd_kel' => 1101010220,
            'nm_kel' => 'TES',
          ),
          95 => 
          array (
            'kd_kel' => 1101010288,
            'nm_kel' => 'TUMBANG TALAKEN',
          ),
          96 => 
          array (
            'kd_kel' => 205,
            'nm_kel' => 'TUNGGULREJO',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}