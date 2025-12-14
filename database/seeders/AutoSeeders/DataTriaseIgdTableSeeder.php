<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DataTriaseIgdTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('data_triase_igd')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('data_triase_igd')->insert([
            0 => [
                'no_rawat' => '2025/05/26/000003',
                'tgl_kunjungan' => '2025-05-26 13:29:59',
                'cara_masuk' => 'Jalan',
                'alat_transportasi' => '-',
                'alasan_kedatangan' => 'Datang Sendiri',
                'keterangan_kedatangan' => '-',
                'kode_kasus' => '002',
                'tekanan_darah' => '-',
                'nadi' => '-',
                'pernapasan' => '-',
                'suhu' => '-',
                'saturasi_o2' => '-',
                'nyeri' => '-',
            ],
            1 => [
                'no_rawat' => '2025/06/09/000002',
                'tgl_kunjungan' => '2025-08-05 11:22:35',
                'cara_masuk' => 'Jalan',
                'alat_transportasi' => '-',
                'alasan_kedatangan' => 'Datang Sendiri',
                'keterangan_kedatangan' => '-',
                'kode_kasus' => '002',
                'tekanan_darah' => '-',
                'nadi' => '-',
                'pernapasan' => '-',
                'suhu' => '-',
                'saturasi_o2' => '-',
                'nyeri' => '-',
            ],
            2 => [
                'no_rawat' => '2025/06/30/000003',
                'tgl_kunjungan' => '2025-06-30 08:51:44',
                'cara_masuk' => 'Jalan',
                'alat_transportasi' => 'Sendiri',
                'alasan_kedatangan' => 'Datang Sendiri',
                'keterangan_kedatangan' => '-',
                'kode_kasus' => '004',
                'tekanan_darah' => '120/90',
                'nadi' => '50',
                'pernapasan' => '50',
                'suhu' => '39',
                'saturasi_o2' => '90',
                'nyeri' => '10',
            ],
            3 => [
                'no_rawat' => '2025/07/21/000001',
                'tgl_kunjungan' => '2025-07-21 11:47:54',
                'cara_masuk' => 'Jalan',
                'alat_transportasi' => '-',
                'alasan_kedatangan' => 'Datang Sendiri',
                'keterangan_kedatangan' => '-',
                'kode_kasus' => '002',
                'tekanan_darah' => '2',
                'nadi' => '2',
                'pernapasan' => '2',
                'suhu' => '2',
                'saturasi_o2' => '2',
                'nyeri' => '2',
            ],
            4 => [
                'no_rawat' => '2025/08/11/000004',
                'tgl_kunjungan' => '2025-08-11 14:12:44',
                'cara_masuk' => 'Jalan',
                'alat_transportasi' => '-',
                'alasan_kedatangan' => 'Datang Sendiri',
                'keterangan_kedatangan' => '-',
                'kode_kasus' => '002',
                'tekanan_darah' => '-',
                'nadi' => '-',
                'pernapasan' => '-',
                'suhu' => '-',
                'saturasi_o2' => '-',
                'nyeri' => '-',
            ],
            5 => [
                'no_rawat' => '2025/08/19/000003',
                'tgl_kunjungan' => '2025-08-19 13:07:25',
                'cara_masuk' => 'Jalan',
                'alat_transportasi' => '-',
                'alasan_kedatangan' => 'Datang Sendiri',
                'keterangan_kedatangan' => '-',
                'kode_kasus' => '002',
                'tekanan_darah' => '-',
                'nadi' => '-',
                'pernapasan' => '-',
                'suhu' => '-',
                'saturasi_o2' => '-',
                'nyeri' => '-',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
