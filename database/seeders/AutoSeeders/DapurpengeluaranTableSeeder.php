<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DapurpengeluaranTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dapurpengeluaran')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dapurpengeluaran')->insert(array (
          0 => 
          array (
            'no_keluar' => 'SKD241119001',
            'tanggal' => '2024-11-19',
            'nip' => '123124',
            'keterangan' => '-',
          ),
          1 => 
          array (
            'no_keluar' => 'SKD241122001',
            'tanggal' => '2024-11-22',
            'nip' => '123124',
            'keterangan' => '-',
          ),
          2 => 
          array (
            'no_keluar' => 'SKD250708001',
            'tanggal' => '2025-07-08',
            'nip' => '123124',
            'keterangan' => 'shift pagi',
          ),
          3 => 
          array (
            'no_keluar' => 'SKD250804001',
            'tanggal' => '2025-08-04',
            'nip' => '123124',
            'keterangan' => 'PD250804001, Ruangan IGD, oleh D0000003 dr. Qotrunnada',
          ),
          4 => 
          array (
            'no_keluar' => 'SKD250804002',
            'tanggal' => '2025-08-04',
            'nip' => '12/09/1988/001',
            'keterangan' => 'SHIFT PAGI',
          ),
          5 => 
          array (
            'no_keluar' => 'SKD250819001',
            'tanggal' => '2025-08-19',
            'nip' => '123124',
            'keterangan' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}