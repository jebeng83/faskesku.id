<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UtdStokDarahTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('utd_stok_darah')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('utd_stok_darah')->insert([
            0 => [
                'no_kantong' => 'FFP2024/01/UTD0001',
                'kode_komponen' => 'FFP',
                'golongan_darah' => 'O',
                'resus' => '(+)',
                'tanggal_aftap' => '2024-01-13',
                'tanggal_kadaluarsa' => '2024-01-18',
                'asal_darah' => 'Produksi Sendiri',
                'status' => 'Diambil',
            ],
            1 => [
                'no_kantong' => 'FFP2024/11/UTD0001',
                'kode_komponen' => 'FFP',
                'golongan_darah' => 'O',
                'resus' => '(+)',
                'tanggal_aftap' => '2024-11-19',
                'tanggal_kadaluarsa' => '2024-11-24',
                'asal_darah' => 'Produksi Sendiri',
                'status' => 'Diambil',
            ],
            2 => [
                'no_kantong' => 'FFP2025/06/UTD0001',
                'kode_komponen' => 'FFP',
                'golongan_darah' => 'O',
                'resus' => '(+)',
                'tanggal_aftap' => '2025-06-19',
                'tanggal_kadaluarsa' => '2025-06-24',
                'asal_darah' => 'Produksi Sendiri',
                'status' => 'Diambil',
            ],
            3 => [
                'no_kantong' => 'FP2024/01/UTD0001',
                'kode_komponen' => 'FP',
                'golongan_darah' => 'O',
                'resus' => '(+)',
                'tanggal_aftap' => '2024-01-13',
                'tanggal_kadaluarsa' => '2024-01-18',
                'asal_darah' => 'Produksi Sendiri',
                'status' => 'Diambil',
            ],
            4 => [
                'no_kantong' => 'PA2024/01/UTD0001',
                'kode_komponen' => 'PA',
                'golongan_darah' => 'O',
                'resus' => '(+)',
                'tanggal_aftap' => '2024-01-13',
                'tanggal_kadaluarsa' => '2024-01-18',
                'asal_darah' => 'Produksi Sendiri',
                'status' => 'Ada',
            ],
            5 => [
                'no_kantong' => 'PA44664',
                'kode_komponen' => 'PA',
                'golongan_darah' => 'O',
                'resus' => '(+)',
                'tanggal_aftap' => '2024-01-13',
                'tanggal_kadaluarsa' => '2024-01-18',
                'asal_darah' => 'Beli',
                'status' => 'Diambil',
            ],
            6 => [
                'no_kantong' => 'PRC2024/01/UTD0001',
                'kode_komponen' => 'PRC',
                'golongan_darah' => 'O',
                'resus' => '(+)',
                'tanggal_aftap' => '2024-01-13',
                'tanggal_kadaluarsa' => '2024-02-12',
                'asal_darah' => 'Produksi Sendiri',
                'status' => 'Ada',
            ],
            7 => [
                'no_kantong' => 'PRC2025/06/UTD0001',
                'kode_komponen' => 'PRC',
                'golongan_darah' => 'O',
                'resus' => '(+)',
                'tanggal_aftap' => '2025-06-19',
                'tanggal_kadaluarsa' => '2025-07-19',
                'asal_darah' => 'Produksi Sendiri',
                'status' => 'Ada',
            ],
            8 => [
                'no_kantong' => 'PRP121212',
                'kode_komponen' => 'PRP',
                'golongan_darah' => 'O',
                'resus' => '(+)',
                'tanggal_aftap' => '2024-11-19',
                'tanggal_kadaluarsa' => '2024-11-24',
                'asal_darah' => 'Beli',
                'status' => 'Ada',
            ],
            9 => [
                'no_kantong' => 'PRP2024/01/UTD0001',
                'kode_komponen' => 'PRP',
                'golongan_darah' => 'O',
                'resus' => '(+)',
                'tanggal_aftap' => '2024-01-13',
                'tanggal_kadaluarsa' => '2024-01-18',
                'asal_darah' => 'Produksi Sendiri',
                'status' => 'Ada',
            ],
            10 => [
                'no_kantong' => 'PRP2024/11/UTD0001',
                'kode_komponen' => 'PRP',
                'golongan_darah' => 'O',
                'resus' => '(+)',
                'tanggal_aftap' => '2024-11-19',
                'tanggal_kadaluarsa' => '2024-11-24',
                'asal_darah' => 'Produksi Sendiri',
                'status' => 'Ada',
            ],
            11 => [
                'no_kantong' => 'WB2024/01/UTD0001',
                'kode_komponen' => 'WB',
                'golongan_darah' => 'O',
                'resus' => '(+)',
                'tanggal_aftap' => '2024-01-13',
                'tanggal_kadaluarsa' => '2024-02-12',
                'asal_darah' => 'Produksi Sendiri',
                'status' => 'Ada',
            ],
            12 => [
                'no_kantong' => 'WB2024/11/UTD0001',
                'kode_komponen' => 'WB',
                'golongan_darah' => 'O',
                'resus' => '(+)',
                'tanggal_aftap' => '2024-11-19',
                'tanggal_kadaluarsa' => '2024-12-19',
                'asal_darah' => 'Produksi Sendiri',
                'status' => 'Ada',
            ],
            13 => [
                'no_kantong' => 'WRC2024/01/UTD0001',
                'kode_komponen' => 'WRC',
                'golongan_darah' => 'O',
                'resus' => '(+)',
                'tanggal_aftap' => '2024-01-13',
                'tanggal_kadaluarsa' => '2024-01-18',
                'asal_darah' => 'Produksi Sendiri',
                'status' => 'Ada',
            ],
            14 => [
                'no_kantong' => 'WRC2025/06/UTD0001',
                'kode_komponen' => 'WRC',
                'golongan_darah' => 'O',
                'resus' => '(+)',
                'tanggal_aftap' => '2025-06-19',
                'tanggal_kadaluarsa' => '2025-06-24',
                'asal_darah' => 'Produksi Sendiri',
                'status' => 'Ada',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
