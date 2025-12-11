<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SetAkunSeeder extends Seeder
{
    public function run()
    {
        $payload = [
            'Pengadaan_Obat' => '140-01',
            'Pemesanan_Obat' => '140-01',
            'Kontra_Pemesanan_Obat' => '210-01',
            'PPN_Masukan' => '127-01',
            'Penjualan_Obat' => '410-01',
            'HPP_Obat_Jual_Bebas' => '510-01',
            'Persediaan_Obat_Jual_Bebas' => '140-01',
            'PPN_Keluaran' => '217-01',
            'Piutang_Obat' => '110-01',
        ];

        $count = DB::table('set_akun')->count();
        if ($count === 0) {
            DB::table('set_akun')->insert($payload);
        } else {
            DB::table('set_akun')->update($payload);
        }
    }
}
