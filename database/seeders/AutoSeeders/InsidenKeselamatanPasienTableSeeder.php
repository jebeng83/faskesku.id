<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InsidenKeselamatanPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('insiden_keselamatan_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('insiden_keselamatan_pasien')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tgl_kejadian' => '2025-05-26',
            'jam_kejadian' => '13:57:18',
            'tgl_lapor' => '2025-05-26',
            'jam_lapor' => '13:57:18',
            'kode_insiden' => 'IK003',
            'nip' => '123124',
            'lokasi' => 'VUP.01 Kamar Kelas VIP',
            'kronologis' => '-',
            'unit_terkait' => '-',
            'akibat' => '-',
            'tindakan_insiden' => '-',
            'identifikasi_masalah' => '-',
            'rtl' => '-',
          ),
          1 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tgl_kejadian' => '2025-05-26',
            'jam_kejadian' => '14:31:52',
            'tgl_lapor' => '2025-05-26',
            'jam_lapor' => '14:31:52',
            'kode_insiden' => 'IK005',
            'nip' => '123124',
            'lokasi' => 'VUP.01 Kamar Kelas VIP',
            'kronologis' => '-',
            'unit_terkait' => '-',
            'akibat' => '-',
            'tindakan_insiden' => '-',
            'identifikasi_masalah' => '-',
            'rtl' => '-',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'tgl_kejadian' => '2025-06-18',
            'jam_kejadian' => '13:35:25',
            'tgl_lapor' => '2025-06-18',
            'jam_lapor' => '13:35:25',
            'kode_insiden' => 'IK001',
            'nip' => '156798',
            'lokasi' => 'VUP.01 Kamar Kelas VIP',
            'kronologis' => '-',
            'unit_terkait' => '-',
            'akibat' => '-',
            'tindakan_insiden' => '-',
            'identifikasi_masalah' => '-',
            'rtl' => '-',
          ),
          3 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'tgl_kejadian' => '2025-06-30',
            'jam_kejadian' => '13:06:38',
            'tgl_lapor' => '2025-06-30',
            'jam_lapor' => '13:06:38',
            'kode_insiden' => 'IK001',
            'nip' => '123124',
            'lokasi' => 'VUP.01 Kamar Kelas VIP',
            'kronologis' => '-',
            'unit_terkait' => '-',
            'akibat' => '-',
            'tindakan_insiden' => '-',
            'identifikasi_masalah' => '-',
            'rtl' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}