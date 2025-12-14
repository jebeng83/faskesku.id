<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KamarInapTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kamar_inap')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kamar_inap')->insert([
            0 => [
                'no_rawat' => '2025/04/25/000001',
                'kd_kamar' => 'VUP.01',
                'trf_kamar' => 550000.0,
                'diagnosa_awal' => '-',
                'diagnosa_akhir' => '-',
                'tgl_masuk' => '2025-04-25',
                'jam_masuk' => '13:43:11',
                'tgl_keluar' => '2025-06-19',
                'jam_keluar' => '14:17:38',
                'lama' => 55.0,
                'ttl_biaya' => 30250000.0,
                'stts_pulang' => 'Meninggal',
            ],
            1 => [
                'no_rawat' => '2025/06/18/000001',
                'kd_kamar' => 'VUP.01',
                'trf_kamar' => 550000.0,
                'diagnosa_awal' => '-',
                'diagnosa_akhir' => '-',
                'tgl_masuk' => '2025-06-18',
                'jam_masuk' => '13:22:47',
                'tgl_keluar' => '2025-06-19',
                'jam_keluar' => '10:25:14',
                'lama' => 1.0,
                'ttl_biaya' => 550000.0,
                'stts_pulang' => 'Pindah Kamar',
            ],
            2 => [
                'no_rawat' => '2025/06/18/000001',
                'kd_kamar' => 'K3.01',
                'trf_kamar' => 100000.0,
                'diagnosa_awal' => '-',
                'diagnosa_akhir' => '-',
                'tgl_masuk' => '2025-06-19',
                'jam_masuk' => '10:25:14',
                'tgl_keluar' => '0000-00-00',
                'jam_keluar' => '00:00:00',
                'lama' => 18.0,
                'ttl_biaya' => 1800000.0,
                'stts_pulang' => '-',
            ],
            3 => [
                'no_rawat' => '2025/06/18/000001',
                'kd_kamar' => 'VUP.01',
                'trf_kamar' => 550000.0,
                'diagnosa_awal' => 'tes',
                'diagnosa_akhir' => '-',
                'tgl_masuk' => '2025-06-30',
                'jam_masuk' => '11:40:20',
                'tgl_keluar' => '0000-00-00',
                'jam_keluar' => '00:00:00',
                'lama' => 7.0,
                'ttl_biaya' => 3850000.0,
                'stts_pulang' => 'Pindah Kamar',
            ],
            4 => [
                'no_rawat' => '2025/06/20/000002',
                'kd_kamar' => 'VUP.01',
                'trf_kamar' => 550000.0,
                'diagnosa_awal' => '-',
                'diagnosa_akhir' => '-',
                'tgl_masuk' => '2025-06-20',
                'jam_masuk' => '14:22:14',
                'tgl_keluar' => '2025-08-11',
                'jam_keluar' => '15:39:41',
                'lama' => 52.0,
                'ttl_biaya' => 28600000.0,
                'stts_pulang' => 'Sehat',
            ],
            5 => [
                'no_rawat' => '2025/07/08/000001',
                'kd_kamar' => 'VUP.01',
                'trf_kamar' => 550000.0,
                'diagnosa_awal' => '-',
                'diagnosa_akhir' => '-',
                'tgl_masuk' => '2025-07-08',
                'jam_masuk' => '12:20:23',
                'tgl_keluar' => '2025-08-05',
                'jam_keluar' => '15:06:25',
                'lama' => 28.0,
                'ttl_biaya' => 15400000.0,
                'stts_pulang' => 'Meninggal',
            ],
            6 => [
                'no_rawat' => '2025/07/08/000001',
                'kd_kamar' => 'K1.01',
                'trf_kamar' => 500000.0,
                'diagnosa_awal' => '-',
                'diagnosa_akhir' => '-',
                'tgl_masuk' => '2025-07-08',
                'jam_masuk' => '12:23:46',
                'tgl_keluar' => '0000-00-00',
                'jam_keluar' => '00:00:00',
                'lama' => 0.0,
                'ttl_biaya' => 0.0,
                'stts_pulang' => 'Pindah Kamar',
            ],
            7 => [
                'no_rawat' => '2025/08/19/000002',
                'kd_kamar' => 'VUP.01',
                'trf_kamar' => 550000.0,
                'diagnosa_awal' => '-',
                'diagnosa_akhir' => '-',
                'tgl_masuk' => '2025-08-19',
                'jam_masuk' => '13:28:34',
                'tgl_keluar' => '0000-00-00',
                'jam_keluar' => '00:00:00',
                'lama' => 0.0,
                'ttl_biaya' => 0.0,
                'stts_pulang' => '-',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
