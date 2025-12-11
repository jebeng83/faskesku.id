<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MasterTriasePemeriksaanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('master_triase_pemeriksaan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('master_triase_pemeriksaan')->insert(array (
          0 => 
          array (
            'kode_pemeriksaan' => '001',
            'nama_pemeriksaan' => 'JALAN NAFAS',
          ),
          1 => 
          array (
            'kode_pemeriksaan' => '002',
            'nama_pemeriksaan' => 'PERNAFASAN DEWASA',
          ),
          2 => 
          array (
            'kode_pemeriksaan' => '003',
            'nama_pemeriksaan' => 'PERNAFASAN ANAK',
          ),
          3 => 
          array (
            'kode_pemeriksaan' => '004',
            'nama_pemeriksaan' => 'SIRKULASI DEWASA',
          ),
          4 => 
          array (
            'kode_pemeriksaan' => '005',
            'nama_pemeriksaan' => 'SIRKULASI ANAK',
          ),
          5 => 
          array (
            'kode_pemeriksaan' => '006',
            'nama_pemeriksaan' => 'MENTAL STATUS',
          ),
          6 => 
          array (
            'kode_pemeriksaan' => '007',
            'nama_pemeriksaan' => 'SKOR NYERI',
          ),
          7 => 
          array (
            'kode_pemeriksaan' => '008',
            'nama_pemeriksaan' => 'ASSESMENT TRIASE',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}