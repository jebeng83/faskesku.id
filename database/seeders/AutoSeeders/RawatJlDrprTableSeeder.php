<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RawatJlDrprTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('rawat_jl_drpr')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('rawat_jl_drpr')->insert([
            0 => [
                'no_rawat' => '2025/04/28/000002',
                'kd_jenis_prw' => 'J000815',
                'kd_dokter' => 'D0000004',
                'nip' => '12/09/1988/001',
                'tgl_perawatan' => '2025-04-28',
                'jam_rawat' => '09:22:42',
                'material' => 60000.0,
                'bhp' => 0.0,
                'tarif_tindakandr' => 110000.0,
                'tarif_tindakanpr' => 0.0,
                'kso' => 0.0,
                'menejemen' => 0.0,
                'biaya_rawat' => 170000.0,
                'stts_bayar' => 'Belum',
            ],
            1 => [
                'no_rawat' => '2025/05/15/000001',
                'kd_jenis_prw' => 'D005',
                'kd_dokter' => 'D0000004',
                'nip' => '12/09/1988/001',
                'tgl_perawatan' => '2025-04-28',
                'jam_rawat' => '09:43:35',
                'material' => 40000.0,
                'bhp' => 0.0,
                'tarif_tindakandr' => 110000.0,
                'tarif_tindakanpr' => 0.0,
                'kso' => 0.0,
                'menejemen' => 0.0,
                'biaya_rawat' => 150000.0,
                'stts_bayar' => 'Belum',
            ],
            2 => [
                'no_rawat' => '2025/07/16/000001',
                'kd_jenis_prw' => 'J000839',
                'kd_dokter' => 'D0000004',
                'nip' => '123124',
                'tgl_perawatan' => '2025-07-16',
                'jam_rawat' => '10:05:24',
                'material' => 65000.0,
                'bhp' => 0.0,
                'tarif_tindakandr' => 35000.0,
                'tarif_tindakanpr' => 0.0,
                'kso' => 0.0,
                'menejemen' => 0.0,
                'biaya_rawat' => 100000.000000000014551915228366851806640625,
                'stts_bayar' => 'Belum',
            ],
            3 => [
                'no_rawat' => '2025/07/16/000001',
                'kd_jenis_prw' => 'RJ24570',
                'kd_dokter' => 'D0000004',
                'nip' => '123124',
                'tgl_perawatan' => '2025-07-16',
                'jam_rawat' => '10:05:16',
                'material' => 56000.0,
                'bhp' => 0.0,
                'tarif_tindakandr' => 20000.00000000000363797880709171295166015625,
                'tarif_tindakanpr' => 2000.0,
                'kso' => 0.0,
                'menejemen' => 22000.00000000000363797880709171295166015625,
                'biaya_rawat' => 100000.000000000014551915228366851806640625,
                'stts_bayar' => 'Belum',
            ],
            4 => [
                'no_rawat' => '2025/07/16/000001',
                'kd_jenis_prw' => 'RJ24570',
                'kd_dokter' => 'D0000004',
                'nip' => '123124',
                'tgl_perawatan' => '2025-07-16',
                'jam_rawat' => '10:05:24',
                'material' => 56000.0,
                'bhp' => 0.0,
                'tarif_tindakandr' => 20000.00000000000363797880709171295166015625,
                'tarif_tindakanpr' => 2000.0,
                'kso' => 0.0,
                'menejemen' => 22000.00000000000363797880709171295166015625,
                'biaya_rawat' => 100000.000000000014551915228366851806640625,
                'stts_bayar' => 'Belum',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
