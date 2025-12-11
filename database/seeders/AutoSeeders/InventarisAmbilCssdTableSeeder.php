<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InventarisAmbilCssdTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_ambil_cssd')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_ambil_cssd')->insert(array (
          0 => 
          array (
            'keterangan_ambil' => 'tes',
            'no_sirkulasi' => 'AC20250503001',
            'no_inventaris' => 'I000000001',
            'tgl_ambil' => '2025-05-03 13:28:10',
            'nip' => '123124',
          ),
          1 => 
          array (
            'keterangan_ambil' => 'tes ambil',
            'no_sirkulasi' => 'AC20250504001',
            'no_inventaris' => 'I000000001',
            'tgl_ambil' => '2025-05-04 21:05:29',
            'nip' => '156798',
          ),
          2 => 
          array (
            'keterangan_ambil' => '1',
            'no_sirkulasi' => 'AC20250504002',
            'no_inventaris' => 'I000000001',
            'tgl_ambil' => '2025-05-04 21:11:02',
            'nip' => '123124',
          ),
          3 => 
          array (
            'keterangan_ambil' => 'TES',
            'no_sirkulasi' => 'AC20250630001',
            'no_inventaris' => 'I000000001',
            'tgl_ambil' => '2025-06-30 14:08:55',
            'nip' => '123124',
          ),
          4 => 
          array (
            'keterangan_ambil' => 'tes',
            'no_sirkulasi' => 'AC20250805001',
            'no_inventaris' => 'I000000001',
            'tgl_ambil' => '2025-08-05 14:47:32',
            'nip' => '12/09/1988/001',
          ),
          5 => 
          array (
            'keterangan_ambil' => 'sasas',
            'no_sirkulasi' => 'AC20250805002',
            'no_inventaris' => 'I000000001',
            'tgl_ambil' => '2025-08-05 14:55:02',
            'nip' => '123124',
          ),
          6 => 
          array (
            'keterangan_ambil' => '-',
            'no_sirkulasi' => 'AC20250825001',
            'no_inventaris' => 'I000000001',
            'tgl_ambil' => '2025-08-25 10:37:37',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}