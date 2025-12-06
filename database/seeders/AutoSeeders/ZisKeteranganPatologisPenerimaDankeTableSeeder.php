<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ZisKeteranganPatologisPenerimaDankeTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_patologis_penerima_dankes')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('zis_keterangan_patologis_penerima_dankes')->insert(array (
          0 => 
          array (
            'kode' => '001',
            'keterangan' => 'Tato',
          ),
          1 => 
          array (
            'kode' => '002',
            'keterangan' => 'Tindik',
          ),
          2 => 
          array (
            'kode' => '003',
            'keterangan' => 'Merokok',
          ),
          3 => 
          array (
            'kode' => '004',
            'keterangan' => 'Judi',
          ),
          4 => 
          array (
            'kode' => '005',
            'keterangan' => 'Miras',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}