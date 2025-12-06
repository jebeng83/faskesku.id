<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InventarisKembaliCssdTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_kembali_cssd')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_kembali_cssd')->insert(array (
          0 => 
          array (
            'keterangan_kembali' => '-',
            'no_sirkulasi' => 'AC20250503001',
            'tgl_kembali' => '2025-05-03 13:40:50',
            'nip' => '156798',
          ),
          1 => 
          array (
            'keterangan_kembali' => 'tes steril',
            'no_sirkulasi' => 'AC20250504001',
            'tgl_kembali' => '2025-05-04 21:05:46',
            'nip' => '156798',
          ),
          2 => 
          array (
            'keterangan_kembali' => '-',
            'no_sirkulasi' => 'AC20250504002',
            'tgl_kembali' => '2025-06-18 14:13:58',
            'nip' => '123124',
          ),
          3 => 
          array (
            'keterangan_kembali' => 'TES',
            'no_sirkulasi' => 'AC20250630001',
            'tgl_kembali' => '2025-06-30 14:09:12',
            'nip' => '123124',
          ),
          4 => 
          array (
            'keterangan_kembali' => '-',
            'no_sirkulasi' => 'AC20250805001',
            'tgl_kembali' => '2025-08-05 14:47:42',
            'nip' => '12/09/1988/001',
          ),
          5 => 
          array (
            'keterangan_kembali' => 'ok',
            'no_sirkulasi' => 'AC20250805002',
            'tgl_kembali' => '2025-08-05 14:55:35',
            'nip' => '123124',
          ),
          6 => 
          array (
            'keterangan_kembali' => '-',
            'no_sirkulasi' => 'AC20250825001',
            'tgl_kembali' => '2025-08-25 10:37:47',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}