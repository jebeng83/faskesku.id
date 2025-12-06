<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KodesatuanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kodesatuan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kodesatuan')->insert(array (
          0 => 
          array (
            'kode_sat' => '-',
            'satuan' => '-',
          ),
          1 => 
          array (
            'kode_sat' => 'AMP',
            'satuan' => 'Ampul',
          ),
          2 => 
          array (
            'kode_sat' => 'AMP5',
            'satuan' => 'Ampul',
          ),
          3 => 
          array (
            'kode_sat' => 'BAL',
            'satuan' => 'BAL',
          ),
          4 => 
          array (
            'kode_sat' => 'S011',
            'satuan' => 'BOSe',
          ),
          5 => 
          array (
            'kode_sat' => 'BTL',
            'satuan' => 'Botol',
          ),
          6 => 
          array (
            'kode_sat' => 'B010',
            'satuan' => 'BOX (100)',
          ),
          7 => 
          array (
            'kode_sat' => 'BOX',
            'satuan' => 'Box/Dus/Kotak',
          ),
          8 => 
          array (
            'kode_sat' => 'BKS',
            'satuan' => 'Bungkus',
          ),
          9 => 
          array (
            'kode_sat' => 'CC',
            'satuan' => 'CC',
          ),
          10 => 
          array (
            'kode_sat' => 'CM',
            'satuan' => 'CM',
          ),
          11 => 
          array (
            'kode_sat' => 'CRM',
            'satuan' => 'Cream',
          ),
          12 => 
          array (
            'kode_sat' => 'DRP',
            'satuan' => 'Drop',
          ),
          13 => 
          array (
            'kode_sat' => 'Fle',
            'satuan' => 'Fles',
          ),
          14 => 
          array (
            'kode_sat' => 'GLN',
            'satuan' => 'Galon',
          ),
          15 => 
          array (
            'kode_sat' => 'GAR',
            'satuan' => 'Gargle/Kumur',
          ),
          16 => 
          array (
            'kode_sat' => 'GEL',
            'satuan' => 'GEL',
          ),
          17 => 
          array (
            'kode_sat' => 'INF',
            'satuan' => 'Infusan Softbag',
          ),
          18 => 
          array (
            'kode_sat' => 'Item',
            'satuan' => 'Item',
          ),
          19 => 
          array (
            'kode_sat' => 'KAL',
            'satuan' => 'Kaleng',
          ),
          20 => 
          array (
            'kode_sat' => 'KAP',
            'satuan' => 'Kaplet',
          ),
          21 => 
          array (
            'kode_sat' => 'CAP',
            'satuan' => 'Kapsul',
          ),
          22 => 
          array (
            'kode_sat' => 'KG',
            'satuan' => 'KILOGRAM',
          ),
          23 => 
          array (
            'kode_sat' => 'S45',
            'satuan' => 'kit',
          ),
          24 => 
          array (
            'kode_sat' => 'LBR',
            'satuan' => 'Lembar',
          ),
          25 => 
          array (
            'kode_sat' => 'S35',
            'satuan' => 'Liter',
          ),
          26 => 
          array (
            'kode_sat' => 'Lus',
            'satuan' => 'Lusin',
          ),
          27 => 
          array (
            'kode_sat' => 'MG',
            'satuan' => 'Mg',
          ),
          28 => 
          array (
            'kode_sat' => 'ML',
            'satuan' => 'Mili Liter',
          ),
          29 => 
          array (
            'kode_sat' => 'MIN',
            'satuan' => 'Minidose',
          ),
          30 => 
          array (
            'kode_sat' => 'PAC',
            'satuan' => 'Pacth',
          ),
          31 => 
          array (
            'kode_sat' => 'S32',
            'satuan' => 'PAKET',
          ),
          32 => 
          array (
            'kode_sat' => 'PEN',
            'satuan' => 'Pen Insulin',
          ),
          33 => 
          array (
            'kode_sat' => 'PCS',
            'satuan' => 'Pieces',
          ),
          34 => 
          array (
            'kode_sat' => 'PTG',
            'satuan' => 'POTONG',
          ),
          35 => 
          array (
            'kode_sat' => 'PUY',
            'satuan' => 'Puyer',
          ),
          36 => 
          array (
            'kode_sat' => 'S36',
            'satuan' => 'PUYER',
          ),
          37 => 
          array (
            'kode_sat' => 'S37',
            'satuan' => 'PUYER',
          ),
          38 => 
          array (
            'kode_sat' => 'REC',
            'satuan' => 'Rectal',
          ),
          39 => 
          array (
            'kode_sat' => 'REM',
            'satuan' => 'REM',
          ),
          40 => 
          array (
            'kode_sat' => 'RIM',
            'satuan' => 'RIM',
          ),
          41 => 
          array (
            'kode_sat' => 'SAC',
            'satuan' => 'Sachet',
          ),
          42 => 
          array (
            'kode_sat' => 'SAL',
            'satuan' => 'SALEP',
          ),
          43 => 
          array (
            'kode_sat' => 'SET',
            'satuan' => 'Set',
          ),
          44 => 
          array (
            'kode_sat' => 'SUP',
            'satuan' => 'Suppositoria',
          ),
          45 => 
          array (
            'kode_sat' => 'SYR',
            'satuan' => 'Syrup',
          ),
          46 => 
          array (
            'kode_sat' => 'S02',
            'satuan' => 'Tab',
          ),
          47 => 
          array (
            'kode_sat' => 'TAB',
            'satuan' => 'Tablet',
          ),
          48 => 
          array (
            'kode_sat' => 'TUB',
            'satuan' => 'Tube',
          ),
          49 => 
          array (
            'kode_sat' => 'S38',
            'satuan' => 'VIAL',
          ),
          50 => 
          array (
            'kode_sat' => 'VL',
            'satuan' => 'Vial',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}