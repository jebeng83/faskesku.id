<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KeslingLimbahB3mediTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kesling_limbah_b3medis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kesling_limbah_b3medis')->insert(array (
          0 => 
          array (
            'nip' => '12/09/1988/001',
            'tanggal' => '2024-11-26 11:21:46',
            'jmllimbah' => 40.0,
            'tujuan_penyerahan' => 't',
            'bukti_dokumen' => 'tes',
            'sisa_di_tps' => 50.0,
            'keterangan' => 'y',
          ),
          1 => 
          array (
            'nip' => '123124',
            'tanggal' => '2025-03-26 12:19:27',
            'jmllimbah' => 5000.0,
            'tujuan_penyerahan' => 'yyu',
            'bukti_dokumen' => '5353',
            'sisa_di_tps' => 100.0,
            'keterangan' => 'tes',
          ),
          2 => 
          array (
            'nip' => '123124',
            'tanggal' => '2025-06-19 10:41:44',
            'jmllimbah' => 1000.0,
            'tujuan_penyerahan' => 'pt tes',
            'bukti_dokumen' => 'qeeeq',
            'sisa_di_tps' => 3.0,
            'keterangan' => '-',
          ),
          3 => 
          array (
            'nip' => '123124',
            'tanggal' => '2025-06-30 14:12:06',
            'jmllimbah' => 900.0,
            'tujuan_penyerahan' => 'PT INDONESIA BERSIH',
            'bukti_dokumen' => 'GJJJGGJGJ',
            'sisa_di_tps' => 100.0,
            'keterangan' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}