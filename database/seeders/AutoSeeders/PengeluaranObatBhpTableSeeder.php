<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PengeluaranObatBhpTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pengeluaran_obat_bhp')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pengeluaran_obat_bhp')->insert(array (
          0 => 
          array (
            'no_keluar' => 'SKM20250618001',
            'tanggal' => '2025-06-18',
            'nip' => '123124',
            'keterangan' => 'baksos',
            'kd_bangsal' => 'AP',
          ),
          1 => 
          array (
            'no_keluar' => 'SKM20250628001',
            'tanggal' => '2025-06-28',
            'nip' => '123124',
            'keterangan' => 'tes',
            'kd_bangsal' => 'K1',
          ),
          2 => 
          array (
            'no_keluar' => 'SKM20250630001',
            'tanggal' => '2025-06-30',
            'nip' => '123124',
            'keterangan' => 'SHIFT JAGA SORE',
            'kd_bangsal' => 'IGD',
          ),
          3 => 
          array (
            'no_keluar' => 'SKM20250630002',
            'tanggal' => '2025-06-30',
            'nip' => '12/09/1988/001',
            'keterangan' => 'No.Permintaan PM20241111002 Tgl 2024-11-11 Ruang LABORAT oleh AGUS SALIM',
            'kd_bangsal' => 'GD',
          ),
          4 => 
          array (
            'no_keluar' => 'SKM20250719001',
            'tanggal' => '2025-07-19',
            'nip' => '123124',
            'keterangan' => 'No.Permintaan PM20250719001 Tgl 2025-07-19 Ruang LABORAT oleh SRI WAHYUNI',
            'kd_bangsal' => 'GD',
          ),
          5 => 
          array (
            'no_keluar' => 'SKM20250805001',
            'tanggal' => '2025-08-05',
            'nip' => '12/09/1988/001',
            'keterangan' => 'No.Permintaan PM20250121001 Tgl 2025-01-21 Ruang IGD oleh dr. Hilyatul Nadia',
            'kd_bangsal' => 'GD',
          ),
          6 => 
          array (
            'no_keluar' => 'SKM20250805002',
            'tanggal' => '2025-08-05',
            'nip' => '12/09/1988/001',
            'keterangan' => 'No.Permintaan PM20250805001 Tgl 2025-08-05 Ruang Apotek oleh dr. Qotrunnada',
            'kd_bangsal' => 'GD',
          ),
          7 => 
          array (
            'no_keluar' => 'SKM20250825001',
            'tanggal' => '2025-08-25',
            'nip' => '12/09/1988/001',
            'keterangan' => 'No.Permintaan PM20250825001 Tgl 2025-08-25 Ruang IGD oleh dr. Qotrunnada',
            'kd_bangsal' => 'GD',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}