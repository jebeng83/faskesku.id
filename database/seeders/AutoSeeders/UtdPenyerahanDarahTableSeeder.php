<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UtdPenyerahanDarahTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('utd_penyerahan_darah')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('utd_penyerahan_darah')->insert(array (
          0 => 
          array (
            'no_penyerahan' => '2024/01/PD00001',
            'tanggal' => '2024-01-13',
            'dinas' => 'Pagi',
            'nip_cross' => '12/09/1988/001',
            'keterangan' => 'diambil bangsal',
            'status' => 'Sudah Dibayar',
            'kd_rek' => '112080',
            'pengambil_darah' => 'tes',
            'alamat_pengambil_darah' => 'tes',
            'nip_pj' => '123124',
            'besarppn' => 1400.0,
          ),
          1 => 
          array (
            'no_penyerahan' => '2024/11/PD00001',
            'tanggal' => '2024-11-19',
            'dinas' => 'Pagi',
            'nip_cross' => '123124',
            'keterangan' => '1212',
            'status' => 'Sudah Dibayar',
            'kd_rek' => '112080',
            'pengambil_darah' => '1212',
            'alamat_pengambil_darah' => '121212',
            'nip_pj' => '123124',
            'besarppn' => 400.0,
          ),
          2 => 
          array (
            'no_penyerahan' => '2025/06/PD00001',
            'tanggal' => '2025-06-19',
            'dinas' => 'Pagi',
            'nip_cross' => '12/09/1988/001',
            'keterangan' => '-',
            'status' => 'Sudah Dibayar',
            'kd_rek' => '112080',
            'pengambil_darah' => '-',
            'alamat_pengambil_darah' => '-',
            'nip_pj' => '123124',
            'besarppn' => 400.0,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}