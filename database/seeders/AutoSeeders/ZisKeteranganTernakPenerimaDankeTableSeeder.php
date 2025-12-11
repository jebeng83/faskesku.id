<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ZisKeteranganTernakPenerimaDankeTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_ternak_penerima_dankes')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_ternak_penerima_dankes')->insert(array (
          0 => 
          array (
            'kode' => '001',
            'keterangan' => 'Unggas',
          ),
          1 => 
          array (
            'kode' => '002',
            'keterangan' => 'Burung',
          ),
          2 => 
          array (
            'kode' => '003',
            'keterangan' => 'Kambing',
          ),
          3 => 
          array (
            'kode' => '004',
            'keterangan' => 'Sapi',
          ),
          4 => 
          array (
            'kode' => '005',
            'keterangan' => 'Kerbau',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}