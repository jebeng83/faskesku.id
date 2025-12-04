<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RekeningSeeder extends Seeder
{
    public function run()
    {
        $rows = [
            ['kd_rek' => '100-01', 'nm_rek' => 'Kas Umum', 'tipe' => 'N', 'balance' => 'D', 'level' => '0'],
            ['kd_rek' => '100-02', 'nm_rek' => 'Kas Kecil', 'tipe' => 'N', 'balance' => 'D', 'level' => '0'],
            ['kd_rek' => '101-01', 'nm_rek' => 'Bank Mandiri', 'tipe' => 'N', 'balance' => 'D', 'level' => '0'],
            ['kd_rek' => '101-02', 'nm_rek' => 'Bank BRI', 'tipe' => 'N', 'balance' => 'D', 'level' => '0'],
            ['kd_rek' => '110-01', 'nm_rek' => 'Piutang Usaha', 'tipe' => 'N', 'balance' => 'D', 'level' => '0'],
            ['kd_rek' => '210-01', 'nm_rek' => 'Hutang Usaha', 'tipe' => 'N', 'balance' => 'K', 'level' => '0'],
            ['kd_rek' => '140-01', 'nm_rek' => 'Persediaan Obat', 'tipe' => 'N', 'balance' => 'D', 'level' => '0'],
            ['kd_rek' => '410-01', 'nm_rek' => 'Penjualan Obat', 'tipe' => 'R', 'balance' => 'K', 'level' => '0'],
            ['kd_rek' => '510-01', 'nm_rek' => 'HPP Obat', 'tipe' => 'R', 'balance' => 'D', 'level' => '0'],
            ['kd_rek' => '127-01', 'nm_rek' => 'PPN Masukan', 'tipe' => 'N', 'balance' => 'D', 'level' => '0'],
            ['kd_rek' => '217-01', 'nm_rek' => 'PPN Keluaran', 'tipe' => 'N', 'balance' => 'K', 'level' => '0'],
        ];

        foreach ($rows as $row) {
            DB::table('rekening')->updateOrInsert(
                ['kd_rek' => $row['kd_rek']],
                $row
            );
        }
    }
}
