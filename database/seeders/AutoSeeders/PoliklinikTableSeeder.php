<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PoliklinikTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('poliklinik')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('poliklinik')->insert(array (
          0 => 
          array (
            'kd_poli' => '1.',
            'nm_poli' => 'INT',
            'registrasi' => 0.0,
            'registrasilama' => 0.0,
            'status' => '0',
          ),
          1 => 
          array (
            'kd_poli' => 'ANA',
            'nm_poli' => 'ANA Poli Anak tr',
            'registrasi' => 0.0,
            'registrasilama' => 0.0,
            'status' => '0',
          ),
          2 => 
          array (
            'kd_poli' => 'BDS',
            'nm_poli' => 'BEDAH SARAF',
            'registrasi' => 0.0,
            'registrasilama' => 0.0,
            'status' => '0',
          ),
          3 => 
          array (
            'kd_poli' => 'BSY',
            'nm_poli' => 'Bedah Syaraf',
            'registrasi' => 0.0,
            'registrasilama' => 0.0,
            'status' => '0',
          ),
          4 => 
          array (
            'kd_poli' => 'IGDK',
            'nm_poli' => 'IGD',
            'registrasi' => 10000.0,
            'registrasilama' => 10000.0,
            'status' => '1',
          ),
          5 => 
          array (
            'kd_poli' => 'INT',
            'nm_poli' => 'INT Poli Penyakit Dalam',
            'registrasi' => 0.0,
            'registrasilama' => 0.0,
            'status' => '1',
          ),
          6 => 
          array (
            'kd_poli' => 'OBG',
            'nm_poli' => 'OBG Poli Obstetri/Gyn.',
            'registrasi' => 0.0,
            'registrasilama' => 0.0,
            'status' => '1',
          ),
          7 => 
          array (
            'kd_poli' => 'P001',
            'nm_poli' => 'Poli Penyakit Dalam',
            'registrasi' => 0.0,
            'registrasilama' => 0.0,
            'status' => '1',
          ),
          8 => 
          array (
            'kd_poli' => 'P002',
            'nm_poli' => 'Poli Penyakit Dalam',
            'registrasi' => 0.0,
            'registrasilama' => 0.0,
            'status' => '1',
          ),
          9 => 
          array (
            'kd_poli' => 'U0001',
            'nm_poli' => 'Poliklinik Kandungan',
            'registrasi' => 10000.0,
            'registrasilama' => 10000.0,
            'status' => '1',
          ),
          10 => 
          array (
            'kd_poli' => 'U0002',
            'nm_poli' => 'Poliklinik Anak',
            'registrasi' => 10000.0,
            'registrasilama' => 10000.0,
            'status' => '1',
          ),
          11 => 
          array (
            'kd_poli' => 'U0003',
            'nm_poli' => 'Poliklinik Penyakit Dalam',
            'registrasi' => 10000.0,
            'registrasilama' => 10000.0,
            'status' => '1',
          ),
          12 => 
          array (
            'kd_poli' => 'U0004',
            'nm_poli' => 'Poliklinik Bedah',
            'registrasi' => 10000.0,
            'registrasilama' => 10000.0,
            'status' => '1',
          ),
          13 => 
          array (
            'kd_poli' => 'U0005',
            'nm_poli' => 'Poliklinik Mata',
            'registrasi' => 10000.0,
            'registrasilama' => 10000.0,
            'status' => '1',
          ),
          14 => 
          array (
            'kd_poli' => 'U0006',
            'nm_poli' => 'Poliklinik Kulit & Kelamin',
            'registrasi' => 10000.0,
            'registrasilama' => 10000.0,
            'status' => '1',
          ),
          15 => 
          array (
            'kd_poli' => 'U0007',
            'nm_poli' => 'Poliklinik Syaraf / Neurologi',
            'registrasi' => 10000.0,
            'registrasilama' => 10000.0,
            'status' => '1',
          ),
          16 => 
          array (
            'kd_poli' => 'U0008',
            'nm_poli' => 'Poliklinik Radiologi',
            'registrasi' => 10000.0,
            'registrasilama' => 10000.0,
            'status' => '1',
          ),
          17 => 
          array (
            'kd_poli' => 'U0009',
            'nm_poli' => 'Poliklinik Umum',
            'registrasi' => 10000.0,
            'registrasilama' => 10000.0,
            'status' => '1',
          ),
          18 => 
          array (
            'kd_poli' => 'U0010',
            'nm_poli' => 'Poliklinik Gigi & Mulut',
            'registrasi' => 10000.0,
            'registrasilama' => 10000.0,
            'status' => '1',
          ),
          19 => 
          array (
            'kd_poli' => 'U0011',
            'nm_poli' => 'Poliklinik THT',
            'registrasi' => 10000.0,
            'registrasilama' => 10000.0,
            'status' => '1',
          ),
          20 => 
          array (
            'kd_poli' => 'U0012',
            'nm_poli' => 'Poliklinik Jantung',
            'registrasi' => 10000.0,
            'registrasilama' => 10000.0,
            'status' => '1',
          ),
          21 => 
          array (
            'kd_poli' => 'U0016',
            'nm_poli' => 'ORTHOPEDI',
            'registrasi' => 10000.0,
            'registrasilama' => 10000.0,
            'status' => '0',
          ),
          22 => 
          array (
            'kd_poli' => 'U0026',
            'nm_poli' => 'Unit Laborat',
            'registrasi' => 0.0,
            'registrasilama' => 0.0,
            'status' => '1',
          ),
          23 => 
          array (
            'kd_poli' => 'U0027',
            'nm_poli' => 'MCU',
            'registrasi' => 0.0,
            'registrasilama' => 0.0,
            'status' => '1',
          ),
          24 => 
          array (
            'kd_poli' => 'U0028',
            'nm_poli' => 'TES ASA sasasa',
            'registrasi' => 1000.0,
            'registrasilama' => 1000.0,
            'status' => '0',
          ),
          25 => 
          array (
            'kd_poli' => 'U0044',
            'nm_poli' => 'Poli Syaraf',
            'registrasi' => 0.0,
            'registrasilama' => 0.0,
            'status' => '0',
          ),
          26 => 
          array (
            'kd_poli' => 'U0052',
            'nm_poli' => 'POLI GINJAL',
            'registrasi' => 0.0,
            'registrasilama' => 0.0,
            'status' => '1',
          ),
          27 => 
          array (
            'kd_poli' => 'U0053',
            'nm_poli' => 'fisioterapi',
            'registrasi' => 0.0,
            'registrasilama' => 0.0,
            'status' => '0',
          ),
          28 => 
          array (
            'kd_poli' => 'U0054',
            'nm_poli' => 'hhhhh',
            'registrasi' => 0.0,
            'registrasilama' => 0.0,
            'status' => '1',
          ),
          29 => 
          array (
            'kd_poli' => 'U0099',
            'nm_poli' => 'poli geriatri',
            'registrasi' => 0.0,
            'registrasilama' => 0.0,
            'status' => '0',
          ),
          30 => 
          array (
            'kd_poli' => 'UMU',
            'nm_poli' => 'UMUM',
            'registrasi' => 0.0,
            'registrasilama' => 0.0,
            'status' => '1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}