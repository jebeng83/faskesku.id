<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenagihanPiutangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penagihan_piutang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penagihan_piutang')->insert(array (
          0 => 
          array (
            'no_tagihan' => 'PP20250428001',
            'tanggal' => '2025-04-28',
            'tanggaltempo' => '2025-05-28',
            'tempo' => 30,
            'nip' => '08998998',
            'nip_menyetujui' => 'D0000004',
            'kd_pj' => 'BPJ',
            'catatan' => 'TES',
            'kd_rek' => '112060',
            'status' => 'Sudah Dibayar',
          ),
          1 => 
          array (
            'no_tagihan' => 'PP20250603001',
            'tanggal' => '2025-06-03',
            'tanggaltempo' => '2025-07-03',
            'tempo' => 30,
            'nip' => '08998998',
            'nip_menyetujui' => '156798',
            'kd_pj' => 'BPJ',
            'catatan' => 'TES',
            'kd_rek' => '112020',
            'status' => 'Sudah Dibayar',
          ),
          2 => 
          array (
            'no_tagihan' => 'PP20250620001',
            'tanggal' => '2025-06-20',
            'tanggaltempo' => '2025-07-20',
            'tempo' => 30,
            'nip' => '123124',
            'nip_menyetujui' => 'D0000004',
            'kd_pj' => 'BPJ',
            'catatan' => '-',
            'kd_rek' => '112060',
            'status' => 'Sudah Dibayar',
          ),
          3 => 
          array (
            'no_tagihan' => 'PP20250825001',
            'tanggal' => '2025-08-25',
            'tanggaltempo' => '2025-08-25',
            'tempo' => 0,
            'nip' => '156798',
            'nip_menyetujui' => '156798',
            'kd_pj' => 'BPJ',
            'catatan' => '-',
            'kd_rek' => '112020',
            'status' => 'Proses Penagihan',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}