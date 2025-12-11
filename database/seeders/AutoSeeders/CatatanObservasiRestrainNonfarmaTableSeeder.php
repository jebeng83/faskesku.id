<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CatatanObservasiRestrainNonfarmaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('catatan_observasi_restrain_nonfarma')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('catatan_observasi_restrain_nonfarma')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tgl_perawatan' => '2025-06-28',
            'jam_rawat' => '09:44:03',
            'tangan_kiri' => 'Tidak',
            'tangan_kanan' => 'Tidak',
            'kaki_kiri' => 'Tidak',
            'kaki_kanan' => 'Tidak',
            'badan' => 'Tidak',
            'edema' => 'Tidak',
            'iritasi' => 'Tidak',
            'sirkulasi' => 'Tidak',
            'kondisi_keterangan' => ' -',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}