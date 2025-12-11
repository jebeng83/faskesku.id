<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PersonalPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('personal_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('personal_pasien')->insert(array (
          0 => 
          array (
            'no_rkm_medis' => '000002',
            'gambar' => 'pages/upload/000002.jpeg',
            'password' => '_+S·ã»n>Ïo¨:)€',
          ),
          1 => 
          array (
            'no_rkm_medis' => '000003',
            'gambar' => '',
            'password' => '_+S·ã»n>Ïo¨:)€',
          ),
          2 => 
          array (
            'no_rkm_medis' => '000005',
            'gambar' => '',
            'password' => '_+S·ã»n>Ïo¨:)€',
          ),
          3 => 
          array (
            'no_rkm_medis' => '000006',
            'gambar' => 'pages/upload/000006.jpeg',
            'password' => '',
          ),
          4 => 
          array (
            'no_rkm_medis' => '000009',
            'gambar' => '-',
            'password' => 'ŒMèÙéC5Ž¸M%ÄÇõ—Xy =g`¦ðÖ¡n',
          ),
          5 => 
          array (
            'no_rkm_medis' => '000010',
            'gambar' => 'pages/upload/000010.jpeg',
            'password' => '_+S·ã»n>Ïo¨:)€',
          ),
          6 => 
          array (
            'no_rkm_medis' => '000011',
            'gambar' => '',
            'password' => '_+S·ã»n>Ïo¨:)€',
          ),
          7 => 
          array (
            'no_rkm_medis' => '000013',
            'gambar' => '-',
            'password' => '_+S·ã»n>Ïo¨:)€',
          ),
          8 => 
          array (
            'no_rkm_medis' => '000014',
            'gambar' => '',
            'password' => 'Ÿ“ö´¾­Á×ª<÷ö1u‡',
          ),
          9 => 
          array (
            'no_rkm_medis' => '000019',
            'gambar' => 'pages/upload/000019.jpeg',
            'password' => 'Ÿ“ö´¾­Á×ª<÷ö1u‡',
          ),
          10 => 
          array (
            'no_rkm_medis' => '000022',
            'gambar' => 'pages/upload/000022.jpeg',
            'password' => '_+S·ã»n>Ïo¨:)€',
          ),
          11 => 
          array (
            'no_rkm_medis' => '000047',
            'gambar' => '',
            'password' => '_+S·ã»n>Ïo¨:)€',
          ),
          12 => 
          array (
            'no_rkm_medis' => '000048',
            'gambar' => 'pages/upload/000048.jpeg',
            'password' => '_+S·ã»n>Ïo¨:)€',
          ),
          13 => 
          array (
            'no_rkm_medis' => '000050',
            'gambar' => 'pages/upload/000050.jpeg',
            'password' => '©ï¸0€ë·¬Êío³³Ü',
          ),
          14 => 
          array (
            'no_rkm_medis' => '000053',
            'gambar' => '-',
            'password' => '*Ä1âPaÝÂGÜO°åâ±TÎ±õ"üim—‰
        5@‹',
          ),
          15 => 
          array (
            'no_rkm_medis' => '000054',
            'gambar' => '-',
            'password' => 'FðzÞwJm³",ÍEc©åNpöO`ùi[Ïso»¬8‡',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}