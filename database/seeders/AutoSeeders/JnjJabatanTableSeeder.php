<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class JnjJabatanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('jnj_jabatan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('jnj_jabatan')->insert(array (
          0 => 
          array (
            'kode' => '-',
            'nama' => '-',
            'tnj' => 0.0,
            'indek' => 0,
          ),
          1 => 
          array (
            'kode' => '01',
            'nama' => 'tak berjenjang',
            'tnj' => 0.0,
            'indek' => 0,
          ),
          2 => 
          array (
            'kode' => '12121',
            'nama' => 'josss',
            'tnj' => 10000.0,
            'indek' => 0,
          ),
          3 => 
          array (
            'kode' => 'APJB',
            'nama' => 'Ass Pj Bidang',
            'tnj' => 175000.0,
            'indek' => 0,
          ),
          4 => 
          array (
            'kode' => 'Apt',
            'nama' => 'Apoteker',
            'tnj' => 250000.0,
            'indek' => 0,
          ),
          5 => 
          array (
            'kode' => 'Asis',
            'nama' => 'Goyang',
            'tnj' => 50000.0,
            'indek' => 0,
          ),
          6 => 
          array (
            'kode' => 'DIRB',
            'nama' => 'Direktur Bidang',
            'tnj' => 1700000.0,
            'indek' => 0,
          ),
          7 => 
          array (
            'kode' => 'DIRU',
            'nama' => 'Direktur Utama',
            'tnj' => 2700000.0,
            'indek' => 9,
          ),
          8 => 
          array (
            'kode' => 'KASI',
            'nama' => 'Kepala Sift',
            'tnj' => 0.0,
            'indek' => 0,
          ),
          9 => 
          array (
            'kode' => 'KORB',
            'nama' => 'Koordinator Bidang',
            'tnj' => 250000.0,
            'indek' => 0,
          ),
          10 => 
          array (
            'kode' => 'PJBd',
            'nama' => 'Pj Bidang',
            'tnj' => 200000.0,
            'indek' => 0,
          ),
          11 => 
          array (
            'kode' => 'PJBP',
            'nama' => 'Pj Bid Pendukung',
            'tnj' => 100000.0,
            'indek' => 0,
          ),
          12 => 
          array (
            'kode' => 'PJBU',
            'nama' => 'Pj Bid Umum',
            'tnj' => 100000.0,
            'indek' => 0,
          ),
          13 => 
          array (
            'kode' => 'PJSB',
            'nama' => 'Pj Sub Bidang',
            'tnj' => 50000.0,
            'indek' => 0,
          ),
          14 => 
          array (
            'kode' => 'PLSN',
            'nama' => 'Staf / Pelaksana',
            'tnj' => 0.0,
            'indek' => 0,
          ),
          15 => 
          array (
            'kode' => 'WDU',
            'nama' => 'WADIR UMUM',
            'tnj' => 1000000.0,
            'indek' => 0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}