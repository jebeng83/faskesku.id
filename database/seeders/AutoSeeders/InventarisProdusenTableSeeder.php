<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InventarisProdusenTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_produsen')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inventaris_produsen')->insert(array (
          0 => 
          array (
            'kode_produsen' => 'CAKRA',
            'nama_produsen' => 'CV CAKRAWAlA',
            'alamat_produsen' => 'KLATEN',
            'no_telp' => '0009879',
            'email' => '-',
            'website_produsen' => '-',
          ),
          1 => 
          array (
            'kode_produsen' => 'PD00000001',
            'nama_produsen' => 'Produsen',
            'alamat_produsen' => 'we',
            'no_telp' => 'wew',
            'email' => 'ewe',
            'website_produsen' => 'wew',
          ),
          2 => 
          array (
            'kode_produsen' => 'PD00000002',
            'nama_produsen' => 'LG Bekasi',
            'alamat_produsen' => '-',
            'no_telp' => '-',
            'email' => '-',
            'website_produsen' => '-',
          ),
          3 => 
          array (
            'kode_produsen' => 'PD00000003',
            'nama_produsen' => 'LENOVO JAKARTA',
            'alamat_produsen' => '-',
            'no_telp' => '-',
            'email' => '-',
            'website_produsen' => '-',
          ),
          4 => 
          array (
            'kode_produsen' => 'PD00000004',
            'nama_produsen' => 'CITOS JAKARTA',
            'alamat_produsen' => '-',
            'no_telp' => '-',
            'email' => '-',
            'website_produsen' => '-',
          ),
          5 => 
          array (
            'kode_produsen' => 'PD00000005',
            'nama_produsen' => 'SAMSUNG',
            'alamat_produsen' => '-',
            'no_telp' => '0',
            'email' => '-',
            'website_produsen' => '-',
          ),
          6 => 
          array (
            'kode_produsen' => 'PD00000006',
            'nama_produsen' => 'MSI INDONESIA',
            'alamat_produsen' => '-',
            'no_telp' => '-',
            'email' => '-',
            'website_produsen' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}