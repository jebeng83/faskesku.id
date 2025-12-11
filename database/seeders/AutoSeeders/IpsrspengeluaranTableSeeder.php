<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IpsrspengeluaranTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('ipsrspengeluaran')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('ipsrspengeluaran')->insert(array (
          0 => 
          array (
            'no_keluar' => 'SKNM241118001',
            'tanggal' => '2024-11-18',
            'nip' => '12/09/1988/001',
            'keterangan' => '1',
          ),
          1 => 
          array (
            'no_keluar' => 'SKNM250618001',
            'tanggal' => '2025-06-18',
            'nip' => '123124',
            'keterangan' => 'bakos',
          ),
          2 => 
          array (
            'no_keluar' => 'SKNM250619001',
            'tanggal' => '2025-06-19',
            'nip' => '123124',
            'keterangan' => 'PN250619001, Ruangan RUANG TERATAI, oleh D0000004 dr. Hilyatul Nadia',
          ),
          3 => 
          array (
            'no_keluar' => 'SKNM250630001',
            'tanggal' => '2025-06-30',
            'nip' => '123124',
            'keterangan' => 'PN250630001, Ruangan IGD, oleh D0000004 dr. Hilyatul Nadia',
          ),
          4 => 
          array (
            'no_keluar' => 'SKNM250805001',
            'tanggal' => '2025-08-05',
            'nip' => '12/09/1988/001',
            'keterangan' => 'PN241011002, Ruangan igd, oleh D0000003 dr. Qotrunnada',
          ),
          5 => 
          array (
            'no_keluar' => 'SKNM250813001',
            'tanggal' => '2025-08-13',
            'nip' => '123124',
            'keterangan' => 'PN250813001, Ruangan RUANGAN IGD, oleh D0000004 dr. Hilyatul Nadia',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}