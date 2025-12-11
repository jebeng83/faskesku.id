<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IpsrsTitipFakturTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('ipsrs_titip_faktur')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('ipsrs_titip_faktur')->insert(array (
          0 => 
          array (
            'no_tagihan' => 'TN20211125001',
            'tanggal' => '2021-11-25',
            'nip' => '12/09/1988/001',
            'keterangan' => '-',
            'status' => 'Dibayar',
          ),
          1 => 
          array (
            'no_tagihan' => 'TN20220329001',
            'tanggal' => '2022-03-29',
            'nip' => '12/09/1988/001',
            'keterangan' => '-',
            'status' => 'Ditagihkan',
          ),
          2 => 
          array (
            'no_tagihan' => 'TN20220906001',
            'tanggal' => '2022-09-06',
            'nip' => '12/09/1988/001',
            'keterangan' => '-',
            'status' => 'Dibayar',
          ),
          3 => 
          array (
            'no_tagihan' => 'TN20230524001',
            'tanggal' => '2023-05-24',
            'nip' => '123124',
            'keterangan' => '-',
            'status' => 'Dibayar',
          ),
          4 => 
          array (
            'no_tagihan' => 'TN20230524002',
            'tanggal' => '2023-05-24',
            'nip' => '123124',
            'keterangan' => '-',
            'status' => 'Ditagihkan',
          ),
          5 => 
          array (
            'no_tagihan' => 'TN20231110001',
            'tanggal' => '2023-11-10',
            'nip' => '123124',
            'keterangan' => 'sudah ditagih vendor',
            'status' => 'Dibayar',
          ),
          6 => 
          array (
            'no_tagihan' => 'TN20240605001',
            'tanggal' => '2024-06-05',
            'nip' => '123124',
            'keterangan' => 'tes',
            'status' => 'Dibayar',
          ),
          7 => 
          array (
            'no_tagihan' => 'TN20240606001',
            'tanggal' => '2024-06-06',
            'nip' => '123124',
            'keterangan' => '-',
            'status' => 'Dibayar',
          ),
          8 => 
          array (
            'no_tagihan' => 'TN20250130001',
            'tanggal' => '2025-01-30',
            'nip' => '12/09/1988/001',
            'keterangan' => '-',
            'status' => 'Dibayar',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}