<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InsidenKeselamatanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('insiden_keselamatan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('insiden_keselamatan')->insert(array (
          0 => 
          array (
            'kode_insiden' => 'IK001',
            'nama_insiden' => 'Salah rute pemberian obat injeksi',
            'jenis_insiden' => 'KTC',
            'dampak' => '1. Tidak Signifikan',
          ),
          1 => 
          array (
            'kode_insiden' => 'IK002',
            'nama_insiden' => 'Reaksi tranfusi PRC Labu ke 2, menggigil panas',
            'jenis_insiden' => 'KTD',
            'dampak' => '2. Minor',
          ),
          2 => 
          array (
            'kode_insiden' => 'IK003',
            'nama_insiden' => 'Guiede wire pemasangan cvc tertinggal/terlepas di v.Femoralis D',
            'jenis_insiden' => 'Sentinel',
            'dampak' => '5. Katastropik',
          ),
          3 => 
          array (
            'kode_insiden' => 'IK004',
            'nama_insiden' => 'salah aturan pakai obat',
            'jenis_insiden' => 'KTD',
            'dampak' => '2. Minor',
          ),
          4 => 
          array (
            'kode_insiden' => 'IK005',
            'nama_insiden' => 'Reaksi tranfusi PRC Labu ke 2, menggigil panas',
            'jenis_insiden' => 'KTD',
            'dampak' => '2. Minor',
          ),
          5 => 
          array (
            'kode_insiden' => 'IK006',
            'nama_insiden' => 'Jatuh di kamar mandi',
            'jenis_insiden' => 'KTC',
            'dampak' => '1. Tidak Signifikan',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}