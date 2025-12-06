<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class JeniTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('jenis')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('jenis')->insert(array (
          0 => 
          array (
            'kdjns' => '-',
            'nama' => '-',
            'keterangan' => '-',
          ),
          1 => 
          array (
            'kdjns' => 'J001',
            'nama' => 'Suntik',
            'keterangan' => '-',
          ),
          2 => 
          array (
            'kdjns' => 'J002',
            'nama' => 'Tablet',
            'keterangan' => '-',
          ),
          3 => 
          array (
            'kdjns' => 'J003',
            'nama' => 'Salep',
            'keterangan' => '-',
          ),
          4 => 
          array (
            'kdjns' => 'J004',
            'nama' => 'Syrup',
            'keterangan' => '-',
          ),
          5 => 
          array (
            'kdjns' => 'J007',
            'nama' => 'Infus',
            'keterangan' => '-',
          ),
          6 => 
          array (
            'kdjns' => 'J008',
            'nama' => 'OBAT LUAR',
            'keterangan' => 'OLES, TETES',
          ),
          7 => 
          array (
            'kdjns' => 'J009',
            'nama' => 'Salah semua',
            'keterangan' => '-',
          ),
          8 => 
          array (
            'kdjns' => 'J010',
            'nama' => 'Ampul',
            'keterangan' => '-',
          ),
          9 => 
          array (
            'kdjns' => 'J011',
            'nama' => 'Botol',
            'keterangan' => '-',
          ),
          10 => 
          array (
            'kdjns' => 'J012',
            'nama' => 'BOX',
            'keterangan' => '-',
          ),
          11 => 
          array (
            'kdjns' => 'J013',
            'nama' => 'Elixir',
            'keterangan' => '-',
          ),
          12 => 
          array (
            'kdjns' => 'J018',
            'nama' => 'OBAT KERAS',
            'keterangan' => '-',
          ),
          13 => 
          array (
            'kdjns' => 'JB01',
            'nama' => 'OBAT ORAL',
            'keterangan' => 'SEMUA OBAT LEWAT MULUT',
          ),
          14 => 
          array (
            'kdjns' => 'JB02',
            'nama' => 'OBAT NON ORAL',
            'keterangan' => 'INJEKSI, SUPPO, INFUSAN, DLL',
          ),
          15 => 
          array (
            'kdjns' => 'JB03',
            'nama' => 'ALKES HABIS PAKAI',
            'keterangan' => '-',
          ),
          16 => 
          array (
            'kdjns' => 'JB04',
            'nama' => 'ALKES NON HABIS PAKAI',
            'keterangan' => '-',
          ),
          17 => 
          array (
            'kdjns' => 'JB05',
            'nama' => 'LOGISTIK',
            'keterangan' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}