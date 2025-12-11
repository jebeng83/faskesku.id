<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetAkunTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_akun')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_akun')->insert(array (
          0 => 
          array (
            'Pengadaan_Obat' => '140-01',
            'Pemesanan_Obat' => '140-01',
            'Kontra_Pemesanan_Obat' => '210-01',
            'Bayar_Pemesanan_Obat' => '211010',
            'Penjualan_Obat' => '410-01',
            'Piutang_Obat' => '110-01',
            'Kontra_Piutang_Obat' => '115010',
            'Retur_Ke_Suplayer' => '115010',
            'Kontra_Retur_Ke_Suplayer' => '211010',
            'Retur_Dari_pembeli' => '111010',
            'Kontra_Retur_Dari_Pembeli' => '115010',
            'Retur_Piutang_Obat' => '550102',
            'Kontra_Retur_Piutang_Obat' => '115010',
            'Pengadaan_Ipsrs' => '115020',
            'Stok_Keluar_Ipsrs' => '530102',
            'Kontra_Stok_Keluar_Ipsrs' => '115020',
            'Bayar_Piutang_Pasien' => '430104',
            'Pengambilan_Utd' => '530103',
            'Kontra_Pengambilan_Utd' => '115010',
            'Pengambilan_Penunjang_Utd' => '530104',
            'Kontra_Pengambilan_Penunjang_Utd' => '115020',
            'Penyerahan_Darah' => '430103',
            'Stok_Keluar_Medis' => '115010',
            'Kontra_Stok_Keluar_Medis' => '530110',
            'HPP_Obat_Jual_Bebas' => '510-01',
            'Persediaan_Obat_Jual_Bebas' => '140-01',
            'Penerimaan_NonMedis' => '115020',
            'Kontra_Penerimaan_NonMedis' => '211210',
            'Bayar_Pemesanan_Non_Medis' => '211210',
            'Hibah_Obat' => '115010',
            'Kontra_Hibah_Obat' => '430108',
            'Penerimaan_Toko' => '115060',
            'Kontra_Penerimaan_Toko' => '211213',
            'Pengadaan_Toko' => '115060',
            'Bayar_Pemesanan_Toko' => '211213',
            'Penjualan_Toko' => '430110',
            'HPP_Barang_Toko' => '560101',
            'Persediaan_Barang_Toko' => '115060',
            'Piutang_Toko' => '117010',
            'Kontra_Piutang_Toko' => '115060',
            'Retur_Beli_Toko' => '115060',
            'Kontra_Retur_Beli_Toko' => '211213',
            'Retur_Beli_Non_Medis' => '115020',
            'Kontra_Retur_Beli_Non_Medis' => '211210',
            'Retur_Jual_Toko' => '111010',
            'Kontra_Retur_Jual_Toko' => '115060',
            'Retur_Piutang_Toko' => '117010',
            'Kontra_Retur_Piutang_Toko' => '115060',
            'Kerugian_Klaim_BPJS_RVP' => '570101',
            'Lebih_Bayar_Klaim_BPJS_RVP' => '430111',
            'Piutang_BPJS_RVP' => '117003',
            'Kontra_Penerimaan_AsetInventaris' => '211218',
            'Kontra_Hibah_Aset' => '430108',
            'Hibah_Non_Medis' => '115020',
            'Kontra_Hibah_Non_Medis' => '430108',
            'Beban_Hutang_Lain' => '520305',
            'PPN_Masukan' => '127-01',
            'Pengadaan_Dapur' => '115070',
            'Stok_Keluar_Dapur' => '530113',
            'Kontra_Stok_Keluar_Dapur' => '115070',
            'PPN_Keluaran' => '217-01',
            'Diskon_Piutang' => '540103',
            'Piutang_Tidak_Terbayar' => '570102',
            'Lebih_Bayar_Piutang' => '430113',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}