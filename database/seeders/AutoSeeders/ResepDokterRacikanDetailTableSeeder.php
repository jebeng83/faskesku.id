<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ResepDokterRacikanDetailTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('resep_dokter_racikan_detail')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('resep_dokter_racikan_detail')->insert(array (
          0 => 
          array (
            'no_resep' => '202505260001',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
            'p1' => 2.0,
            'p2' => 3.0,
            'kandungan' => '133.3',
            'jml' => 8.699999999999999289457264239899814128875732421875,
          ),
          1 => 
          array (
            'no_resep' => '202505260001',
            'no_racik' => '1',
            'kode_brng' => 'B000001207',
            'p1' => 1.0,
            'p2' => 1.0,
            'kandungan' => '28',
            'jml' => 7.29999999999999982236431605997495353221893310546875,
          ),
          2 => 
          array (
            'no_resep' => '202505260002',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
            'p1' => 2.0,
            'p2' => 3.0,
            'kandungan' => '133.3',
            'jml' => 8.699999999999999289457264239899814128875732421875,
          ),
          3 => 
          array (
            'no_resep' => '202505260002',
            'no_racik' => '1',
            'kode_brng' => 'B000001207',
            'p1' => 1.0,
            'p2' => 1.0,
            'kandungan' => '28',
            'jml' => 7.29999999999999982236431605997495353221893310546875,
          ),
          4 => 
          array (
            'no_resep' => '202506200002',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
            'p1' => 2.0,
            'p2' => 3.0,
            'kandungan' => '133.3',
            'jml' => 6.70000000000000017763568394002504646778106689453125,
          ),
          5 => 
          array (
            'no_resep' => '202506200002',
            'no_racik' => '1',
            'kode_brng' => 'B000001659',
            'p1' => 1.0,
            'p2' => 1.0,
            'kandungan' => '55',
            'jml' => 9.199999999999999289457264239899814128875732421875,
          ),
          6 => 
          array (
            'no_resep' => '202506200003',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
            'p1' => 2.0,
            'p2' => 3.0,
            'kandungan' => '133.3',
            'jml' => 8.699999999999999289457264239899814128875732421875,
          ),
          7 => 
          array (
            'no_resep' => '202506200003',
            'no_racik' => '1',
            'kode_brng' => 'B000001207',
            'p1' => 1.0,
            'p2' => 1.0,
            'kandungan' => '28',
            'jml' => 7.29999999999999982236431605997495353221893310546875,
          ),
          8 => 
          array (
            'no_resep' => '202506300001',
            'no_racik' => '1',
            'kode_brng' => 'B000000305',
            'p1' => 1.0,
            'p2' => 1.0,
            'kandungan' => '45',
            'jml' => 6.4000000000000003552713678800500929355621337890625,
          ),
          9 => 
          array (
            'no_resep' => '202506300001',
            'no_racik' => '1',
            'kode_brng' => 'B000000554',
            'p1' => 2.0,
            'p2' => 3.0,
            'kandungan' => '100.0',
            'jml' => 6.70000000000000017763568394002504646778106689453125,
          ),
          10 => 
          array (
            'no_resep' => '202506300002',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
            'p1' => 2.0,
            'p2' => 3.0,
            'kandungan' => '133.3',
            'jml' => 8.699999999999999289457264239899814128875732421875,
          ),
          11 => 
          array (
            'no_resep' => '202506300002',
            'no_racik' => '1',
            'kode_brng' => 'B000001207',
            'p1' => 1.0,
            'p2' => 1.0,
            'kandungan' => '28',
            'jml' => 7.29999999999999982236431605997495353221893310546875,
          ),
          12 => 
          array (
            'no_resep' => '202507230002',
            'no_racik' => '1',
            'kode_brng' => 'B000000554',
            'p1' => 2.0,
            'p2' => 3.0,
            'kandungan' => '100.0',
            'jml' => 9.300000000000000710542735760100185871124267578125,
          ),
          13 => 
          array (
            'no_resep' => '202507230002',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
            'p1' => 1.0,
            'p2' => 1.0,
            'kandungan' => '157',
            'jml' => 11.0,
          ),
          14 => 
          array (
            'no_resep' => '202507290001',
            'no_racik' => '1',
            'kode_brng' => 'B000000554',
            'p1' => 1.0,
            'p2' => 1.0,
            'kandungan' => '87',
            'jml' => 8.0999999999999996447286321199499070644378662109375,
          ),
          15 => 
          array (
            'no_resep' => '202507290001',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
            'p1' => 2.0,
            'p2' => 3.0,
            'kandungan' => '133.3',
            'jml' => 9.300000000000000710542735760100185871124267578125,
          ),
          16 => 
          array (
            'no_resep' => '202508040002',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
            'p1' => 2.0,
            'p2' => 3.0,
            'kandungan' => '133.3',
            'jml' => 9.300000000000000710542735760100185871124267578125,
          ),
          17 => 
          array (
            'no_resep' => '202508040002',
            'no_racik' => '1',
            'kode_brng' => 'B000001207',
            'p1' => 1.0,
            'p2' => 1.0,
            'kandungan' => '35',
            'jml' => 9.800000000000000710542735760100185871124267578125,
          ),
          18 => 
          array (
            'no_resep' => '202508050001',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
            'p1' => 1.0,
            'p2' => 1.0,
            'kandungan' => '130',
            'jml' => 10.4000000000000003552713678800500929355621337890625,
          ),
          19 => 
          array (
            'no_resep' => '202508050001',
            'no_racik' => '1',
            'kode_brng' => 'B000001207',
            'p1' => 2.0,
            'p2' => 3.0,
            'kandungan' => '33.3',
            'jml' => 10.699999999999999289457264239899814128875732421875,
          ),
          20 => 
          array (
            'no_resep' => '202508210001',
            'no_racik' => '1',
            'kode_brng' => 'B000000554',
            'p1' => 2.0,
            'p2' => 3.0,
            'kandungan' => '100.0',
            'jml' => 8.0,
          ),
          21 => 
          array (
            'no_resep' => '202508210001',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
            'p1' => 1.0,
            'p2' => 1.0,
            'kandungan' => '120',
            'jml' => 7.20000000000000017763568394002504646778106689453125,
          ),
          22 => 
          array (
            'no_resep' => '202508250003',
            'no_racik' => '1',
            'kode_brng' => 'B000000556',
            'p1' => 2.0,
            'p2' => 3.0,
            'kandungan' => '133.3',
            'jml' => 8.0,
          ),
          23 => 
          array (
            'no_resep' => '202508250003',
            'no_racik' => '1',
            'kode_brng' => 'B000000560',
            'p1' => 1.0,
            'p2' => 1.0,
            'kandungan' => '',
            'jml' => 6.0,
          ),
          24 => 
          array (
            'no_resep' => '202508250003',
            'no_racik' => '2',
            'kode_brng' => 'B000000305',
            'p1' => 2.0,
            'p2' => 3.0,
            'kandungan' => '46.7',
            'jml' => 8.0,
          ),
          25 => 
          array (
            'no_resep' => '202508250003',
            'no_racik' => '2',
            'kode_brng' => 'B00001000',
            'p1' => 1.0,
            'p2' => 1.0,
            'kandungan' => '240',
            'jml' => 5.79999999999999982236431605997495353221893310546875,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}