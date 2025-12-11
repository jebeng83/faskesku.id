<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ReturjualTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('returjual')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('returjual')->insert(array (
          0 => 
          array (
            'no_retur_jual' => '2024/11/14/00000201',
            'tgl_retur' => '2024-11-16',
            'nip' => '12/09/1988/001',
            'no_rkm_medis' => '000005',
            'kd_bangsal' => 'AP',
          ),
          1 => 
          array (
            'no_retur_jual' => '2024/12/17/00000101',
            'tgl_retur' => '2025-04-15',
            'nip' => '123124',
            'no_rkm_medis' => '000010',
            'kd_bangsal' => 'AP',
          ),
          2 => 
          array (
            'no_retur_jual' => '2025/06/18/00000101',
            'tgl_retur' => '2025-08-25',
            'nip' => '123124',
            'no_rkm_medis' => '000003',
            'kd_bangsal' => 'AP',
          ),
          3 => 
          array (
            'no_retur_jual' => '2025/06/28/00000101',
            'tgl_retur' => '2025-06-30',
            'nip' => '123124',
            'no_rkm_medis' => '000010',
            'kd_bangsal' => 'AP',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}