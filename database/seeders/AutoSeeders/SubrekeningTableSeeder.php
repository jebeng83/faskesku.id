<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SubrekeningTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('subrekening')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('subrekening')->insert(array (
          0 => 
          array (
            'kd_rek' => '1',
            'kd_rek2' => '11',
          ),
          1 => 
          array (
            'kd_rek' => '1',
            'kd_rek2' => '12',
          ),
          2 => 
          array (
            'kd_rek' => '11',
            'kd_rek2' => '1110',
          ),
          3 => 
          array (
            'kd_rek' => '11',
            'kd_rek2' => '1120',
          ),
          4 => 
          array (
            'kd_rek' => '11',
            'kd_rek2' => '1150',
          ),
          5 => 
          array (
            'kd_rek' => '11',
            'kd_rek2' => '1160',
          ),
          6 => 
          array (
            'kd_rek' => '11',
            'kd_rek2' => '1170',
          ),
          7 => 
          array (
            'kd_rek' => '1110',
            'kd_rek2' => '111010',
          ),
          8 => 
          array (
            'kd_rek' => '1110',
            'kd_rek2' => '111020',
          ),
          9 => 
          array (
            'kd_rek' => '1110',
            'kd_rek2' => '111030',
          ),
          10 => 
          array (
            'kd_rek' => '1110',
            'kd_rek2' => '111031',
          ),
          11 => 
          array (
            'kd_rek' => '111020',
            'kd_rek2' => '1110201',
          ),
          12 => 
          array (
            'kd_rek' => '111020',
            'kd_rek2' => '1110202',
          ),
          13 => 
          array (
            'kd_rek' => '1120',
            'kd_rek2' => '112010',
          ),
          14 => 
          array (
            'kd_rek' => '1120',
            'kd_rek2' => '112020',
          ),
          15 => 
          array (
            'kd_rek' => '1120',
            'kd_rek2' => '112030',
          ),
          16 => 
          array (
            'kd_rek' => '1120',
            'kd_rek2' => '112040',
          ),
          17 => 
          array (
            'kd_rek' => '1120',
            'kd_rek2' => '112050',
          ),
          18 => 
          array (
            'kd_rek' => '1120',
            'kd_rek2' => '112060',
          ),
          19 => 
          array (
            'kd_rek' => '1120',
            'kd_rek2' => '112061',
          ),
          20 => 
          array (
            'kd_rek' => '1120',
            'kd_rek2' => '112070',
          ),
          21 => 
          array (
            'kd_rek' => '1120',
            'kd_rek2' => '112080',
          ),
          22 => 
          array (
            'kd_rek' => '1120',
            'kd_rek2' => '112090',
          ),
          23 => 
          array (
            'kd_rek' => '1120',
            'kd_rek2' => '112091',
          ),
          24 => 
          array (
            'kd_rek' => '1120',
            'kd_rek2' => '112092',
          ),
          25 => 
          array (
            'kd_rek' => '1120',
            'kd_rek2' => '112093',
          ),
          26 => 
          array (
            'kd_rek' => '1120',
            'kd_rek2' => '112094',
          ),
          27 => 
          array (
            'kd_rek' => '1120',
            'kd_rek2' => '112095',
          ),
          28 => 
          array (
            'kd_rek' => '1150',
            'kd_rek2' => '115010',
          ),
          29 => 
          array (
            'kd_rek' => '1150',
            'kd_rek2' => '115020',
          ),
          30 => 
          array (
            'kd_rek' => '1150',
            'kd_rek2' => '115030',
          ),
          31 => 
          array (
            'kd_rek' => '1150',
            'kd_rek2' => '115040',
          ),
          32 => 
          array (
            'kd_rek' => '1150',
            'kd_rek2' => '115050',
          ),
          33 => 
          array (
            'kd_rek' => '1150',
            'kd_rek2' => '115060',
          ),
          34 => 
          array (
            'kd_rek' => '1150',
            'kd_rek2' => '115070',
          ),
          35 => 
          array (
            'kd_rek' => '1160',
            'kd_rek2' => '116010',
          ),
          36 => 
          array (
            'kd_rek' => '1160',
            'kd_rek2' => '116011',
          ),
          37 => 
          array (
            'kd_rek' => '1160',
            'kd_rek2' => '116020',
          ),
          38 => 
          array (
            'kd_rek' => '1160',
            'kd_rek2' => '116030',
          ),
          39 => 
          array (
            'kd_rek' => '1160',
            'kd_rek2' => '116040',
          ),
          40 => 
          array (
            'kd_rek' => '1160',
            'kd_rek2' => '116050',
          ),
          41 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117000',
          ),
          42 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117001',
          ),
          43 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117002',
          ),
          44 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117003',
          ),
          45 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117004',
          ),
          46 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117005',
          ),
          47 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117006',
          ),
          48 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117007',
          ),
          49 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117008',
          ),
          50 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117009',
          ),
          51 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117010',
          ),
          52 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117011',
          ),
          53 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117012',
          ),
          54 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117013',
          ),
          55 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117014',
          ),
          56 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117015',
          ),
          57 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117016',
          ),
          58 => 
          array (
            'kd_rek' => '1170',
            'kd_rek2' => '117017',
          ),
          59 => 
          array (
            'kd_rek' => '12',
            'kd_rek2' => '1230',
          ),
          60 => 
          array (
            'kd_rek' => '1230',
            'kd_rek2' => '123101',
          ),
          61 => 
          array (
            'kd_rek' => '1230',
            'kd_rek2' => '123102',
          ),
          62 => 
          array (
            'kd_rek' => '1230',
            'kd_rek2' => '123103',
          ),
          63 => 
          array (
            'kd_rek' => '1230',
            'kd_rek2' => '123104',
          ),
          64 => 
          array (
            'kd_rek' => '1230',
            'kd_rek2' => '123105',
          ),
          65 => 
          array (
            'kd_rek' => '2',
            'kd_rek2' => '21',
          ),
          66 => 
          array (
            'kd_rek' => '21',
            'kd_rek2' => '2110',
          ),
          67 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211010',
          ),
          68 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211020',
          ),
          69 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211030',
          ),
          70 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211040',
          ),
          71 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211041',
          ),
          72 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211050',
          ),
          73 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211051',
          ),
          74 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211070',
          ),
          75 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211080',
          ),
          76 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211100',
          ),
          77 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211101',
          ),
          78 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211102',
          ),
          79 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211110',
          ),
          80 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211111',
          ),
          81 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211120',
          ),
          82 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211130',
          ),
          83 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211131',
          ),
          84 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211132',
          ),
          85 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211133',
          ),
          86 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211140',
          ),
          87 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211150',
          ),
          88 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211160',
          ),
          89 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211161',
          ),
          90 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211170',
          ),
          91 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211180',
          ),
          92 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211190',
          ),
          93 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211200',
          ),
          94 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211210',
          ),
          95 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211211',
          ),
          96 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211212',
          ),
          97 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211213',
          ),
          98 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211214',
          ),
          99 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211215',
          ),
          100 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211216',
          ),
          101 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211217',
          ),
          102 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211218',
          ),
          103 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211219',
          ),
          104 => 
          array (
            'kd_rek' => '2110',
            'kd_rek2' => '211220',
          ),
          105 => 
          array (
            'kd_rek' => '3',
            'kd_rek2' => '310000',
          ),
          106 => 
          array (
            'kd_rek' => '4',
            'kd_rek2' => '41',
          ),
          107 => 
          array (
            'kd_rek' => '4',
            'kd_rek2' => '42',
          ),
          108 => 
          array (
            'kd_rek' => '4',
            'kd_rek2' => '43',
          ),
          109 => 
          array (
            'kd_rek' => '41',
            'kd_rek2' => '410105',
          ),
          110 => 
          array (
            'kd_rek' => '41',
            'kd_rek2' => '410109',
          ),
          111 => 
          array (
            'kd_rek' => '41',
            'kd_rek2' => '410110',
          ),
          112 => 
          array (
            'kd_rek' => '41',
            'kd_rek2' => '410111',
          ),
          113 => 
          array (
            'kd_rek' => '41',
            'kd_rek2' => '410112',
          ),
          114 => 
          array (
            'kd_rek' => '41',
            'kd_rek2' => '410113',
          ),
          115 => 
          array (
            'kd_rek' => '41',
            'kd_rek2' => '410114',
          ),
          116 => 
          array (
            'kd_rek' => '41',
            'kd_rek2' => '410115',
          ),
          117 => 
          array (
            'kd_rek' => '41',
            'kd_rek2' => '410116',
          ),
          118 => 
          array (
            'kd_rek' => '41',
            'kd_rek2' => '410117',
          ),
          119 => 
          array (
            'kd_rek' => '41',
            'kd_rek2' => '410119',
          ),
          120 => 
          array (
            'kd_rek' => '41',
            'kd_rek2' => '410120',
          ),
          121 => 
          array (
            'kd_rek' => '42',
            'kd_rek2' => '420100',
          ),
          122 => 
          array (
            'kd_rek' => '42',
            'kd_rek2' => '420101',
          ),
          123 => 
          array (
            'kd_rek' => '42',
            'kd_rek2' => '420102',
          ),
          124 => 
          array (
            'kd_rek' => '42',
            'kd_rek2' => '420103',
          ),
          125 => 
          array (
            'kd_rek' => '42',
            'kd_rek2' => '420104',
          ),
          126 => 
          array (
            'kd_rek' => '42',
            'kd_rek2' => '420106',
          ),
          127 => 
          array (
            'kd_rek' => '42',
            'kd_rek2' => '420107',
          ),
          128 => 
          array (
            'kd_rek' => '42',
            'kd_rek2' => '420108',
          ),
          129 => 
          array (
            'kd_rek' => '42',
            'kd_rek2' => '420109',
          ),
          130 => 
          array (
            'kd_rek' => '43',
            'kd_rek2' => '430100',
          ),
          131 => 
          array (
            'kd_rek' => '43',
            'kd_rek2' => '430101',
          ),
          132 => 
          array (
            'kd_rek' => '43',
            'kd_rek2' => '430102',
          ),
          133 => 
          array (
            'kd_rek' => '43',
            'kd_rek2' => '430103',
          ),
          134 => 
          array (
            'kd_rek' => '43',
            'kd_rek2' => '430104',
          ),
          135 => 
          array (
            'kd_rek' => '43',
            'kd_rek2' => '430105',
          ),
          136 => 
          array (
            'kd_rek' => '43',
            'kd_rek2' => '430106',
          ),
          137 => 
          array (
            'kd_rek' => '43',
            'kd_rek2' => '430107',
          ),
          138 => 
          array (
            'kd_rek' => '43',
            'kd_rek2' => '430108',
          ),
          139 => 
          array (
            'kd_rek' => '43',
            'kd_rek2' => '430109',
          ),
          140 => 
          array (
            'kd_rek' => '43',
            'kd_rek2' => '430110',
          ),
          141 => 
          array (
            'kd_rek' => '43',
            'kd_rek2' => '430111',
          ),
          142 => 
          array (
            'kd_rek' => '43',
            'kd_rek2' => '430112',
          ),
          143 => 
          array (
            'kd_rek' => '43',
            'kd_rek2' => '430113',
          ),
          144 => 
          array (
            'kd_rek' => '43',
            'kd_rek2' => '430114',
          ),
          145 => 
          array (
            'kd_rek' => '5',
            'kd_rek2' => '51',
          ),
          146 => 
          array (
            'kd_rek' => '5',
            'kd_rek2' => '52',
          ),
          147 => 
          array (
            'kd_rek' => '5',
            'kd_rek2' => '53',
          ),
          148 => 
          array (
            'kd_rek' => '5',
            'kd_rek2' => '54',
          ),
          149 => 
          array (
            'kd_rek' => '5',
            'kd_rek2' => '55',
          ),
          150 => 
          array (
            'kd_rek' => '5',
            'kd_rek2' => '56',
          ),
          151 => 
          array (
            'kd_rek' => '5',
            'kd_rek2' => '57',
          ),
          152 => 
          array (
            'kd_rek' => '51',
            'kd_rek2' => '5101',
          ),
          153 => 
          array (
            'kd_rek' => '51',
            'kd_rek2' => '5102',
          ),
          154 => 
          array (
            'kd_rek' => '51',
            'kd_rek2' => '5103',
          ),
          155 => 
          array (
            'kd_rek' => '5101',
            'kd_rek2' => '510102',
          ),
          156 => 
          array (
            'kd_rek' => '5101',
            'kd_rek2' => '510106',
          ),
          157 => 
          array (
            'kd_rek' => '5101',
            'kd_rek2' => '510109',
          ),
          158 => 
          array (
            'kd_rek' => '5102',
            'kd_rek2' => '510200',
          ),
          159 => 
          array (
            'kd_rek' => '5102',
            'kd_rek2' => '510201',
          ),
          160 => 
          array (
            'kd_rek' => '5102',
            'kd_rek2' => '510202',
          ),
          161 => 
          array (
            'kd_rek' => '5102',
            'kd_rek2' => '510203',
          ),
          162 => 
          array (
            'kd_rek' => '5102',
            'kd_rek2' => '510204',
          ),
          163 => 
          array (
            'kd_rek' => '5102',
            'kd_rek2' => '510205',
          ),
          164 => 
          array (
            'kd_rek' => '5102',
            'kd_rek2' => '510206',
          ),
          165 => 
          array (
            'kd_rek' => '5102',
            'kd_rek2' => '510207',
          ),
          166 => 
          array (
            'kd_rek' => '5103',
            'kd_rek2' => '510301',
          ),
          167 => 
          array (
            'kd_rek' => '5103',
            'kd_rek2' => '510302',
          ),
          168 => 
          array (
            'kd_rek' => '52',
            'kd_rek2' => '5201',
          ),
          169 => 
          array (
            'kd_rek' => '52',
            'kd_rek2' => '5202',
          ),
          170 => 
          array (
            'kd_rek' => '52',
            'kd_rek2' => '5203',
          ),
          171 => 
          array (
            'kd_rek' => '5201',
            'kd_rek2' => '520100',
          ),
          172 => 
          array (
            'kd_rek' => '5201',
            'kd_rek2' => '520101',
          ),
          173 => 
          array (
            'kd_rek' => '5201',
            'kd_rek2' => '520102',
          ),
          174 => 
          array (
            'kd_rek' => '5202',
            'kd_rek2' => '520200',
          ),
          175 => 
          array (
            'kd_rek' => '5202',
            'kd_rek2' => '520201',
          ),
          176 => 
          array (
            'kd_rek' => '5202',
            'kd_rek2' => '520202',
          ),
          177 => 
          array (
            'kd_rek' => '5202',
            'kd_rek2' => '520203',
          ),
          178 => 
          array (
            'kd_rek' => '5202',
            'kd_rek2' => '520204',
          ),
          179 => 
          array (
            'kd_rek' => '5202',
            'kd_rek2' => '520205',
          ),
          180 => 
          array (
            'kd_rek' => '5202',
            'kd_rek2' => '520206',
          ),
          181 => 
          array (
            'kd_rek' => '5202',
            'kd_rek2' => '520207',
          ),
          182 => 
          array (
            'kd_rek' => '5203',
            'kd_rek2' => '520301',
          ),
          183 => 
          array (
            'kd_rek' => '5203',
            'kd_rek2' => '520302',
          ),
          184 => 
          array (
            'kd_rek' => '5203',
            'kd_rek2' => '520303',
          ),
          185 => 
          array (
            'kd_rek' => '5203',
            'kd_rek2' => '520304',
          ),
          186 => 
          array (
            'kd_rek' => '5203',
            'kd_rek2' => '520305',
          ),
          187 => 
          array (
            'kd_rek' => '5203',
            'kd_rek2' => '520308',
          ),
          188 => 
          array (
            'kd_rek' => '5203',
            'kd_rek2' => '520309',
          ),
          189 => 
          array (
            'kd_rek' => '53',
            'kd_rek2' => '530100',
          ),
          190 => 
          array (
            'kd_rek' => '53',
            'kd_rek2' => '530101',
          ),
          191 => 
          array (
            'kd_rek' => '53',
            'kd_rek2' => '530102',
          ),
          192 => 
          array (
            'kd_rek' => '53',
            'kd_rek2' => '530103',
          ),
          193 => 
          array (
            'kd_rek' => '53',
            'kd_rek2' => '530104',
          ),
          194 => 
          array (
            'kd_rek' => '53',
            'kd_rek2' => '530105',
          ),
          195 => 
          array (
            'kd_rek' => '53',
            'kd_rek2' => '530106',
          ),
          196 => 
          array (
            'kd_rek' => '53',
            'kd_rek2' => '530107',
          ),
          197 => 
          array (
            'kd_rek' => '53',
            'kd_rek2' => '530108',
          ),
          198 => 
          array (
            'kd_rek' => '53',
            'kd_rek2' => '530109',
          ),
          199 => 
          array (
            'kd_rek' => '53',
            'kd_rek2' => '530110',
          ),
          200 => 
          array (
            'kd_rek' => '53',
            'kd_rek2' => '530111',
          ),
          201 => 
          array (
            'kd_rek' => '53',
            'kd_rek2' => '530112',
          ),
          202 => 
          array (
            'kd_rek' => '53',
            'kd_rek2' => '530113',
          ),
          203 => 
          array (
            'kd_rek' => '53',
            'kd_rek2' => '530114',
          ),
          204 => 
          array (
            'kd_rek' => '53',
            'kd_rek2' => '530115',
          ),
          205 => 
          array (
            'kd_rek' => '54',
            'kd_rek2' => '540100',
          ),
          206 => 
          array (
            'kd_rek' => '54',
            'kd_rek2' => '540101',
          ),
          207 => 
          array (
            'kd_rek' => '54',
            'kd_rek2' => '540102',
          ),
          208 => 
          array (
            'kd_rek' => '54',
            'kd_rek2' => '540103',
          ),
          209 => 
          array (
            'kd_rek' => '55',
            'kd_rek2' => '550100',
          ),
          210 => 
          array (
            'kd_rek' => '55',
            'kd_rek2' => '550101',
          ),
          211 => 
          array (
            'kd_rek' => '55',
            'kd_rek2' => '550102',
          ),
          212 => 
          array (
            'kd_rek' => '55',
            'kd_rek2' => '550103',
          ),
          213 => 
          array (
            'kd_rek' => '55',
            'kd_rek2' => '550104',
          ),
          214 => 
          array (
            'kd_rek' => '55',
            'kd_rek2' => '550105',
          ),
          215 => 
          array (
            'kd_rek' => '55',
            'kd_rek2' => '550106',
          ),
          216 => 
          array (
            'kd_rek' => '56',
            'kd_rek2' => '560101',
          ),
          217 => 
          array (
            'kd_rek' => '57',
            'kd_rek2' => '570101',
          ),
          218 => 
          array (
            'kd_rek' => '57',
            'kd_rek2' => '570102',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}