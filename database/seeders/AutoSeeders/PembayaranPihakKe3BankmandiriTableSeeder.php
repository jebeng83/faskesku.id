<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PembayaranPihakKe3BankmandiriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pembayaran_pihak_ke3_bankmandiri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pembayaran_pihak_ke3_bankmandiri')->insert(array (
          0 => 
          array (
            'nomor_pembayaran' => 'BRWH0011411122024000001',
            'tgl_pembayaran' => '2024-12-11 09:13:33',
            'no_rekening_sumber' => '12121313131313',
            'no_rekening_tujuan' => '141314',
            'atas_nama_rekening_tujuan' => 'PAIJO',
            'kota_atas_nama_rekening_tujuan' => 'BANTUL',
            'nominal_pembayaran' => 500000.0,
            'nomor_tagihan' => 'BRWH0011411122024000001',
            'kode_metode' => 'BAU',
            'kode_bank' => 'BDI',
            'kode_transaksi' => '1212313',
            'asal_transaksi' => 'Pengeluaran Harian',
            'status_transaksi' => 'Baru',
          ),
          1 => 
          array (
            'nomor_pembayaran' => 'BRWH0011421012025000001',
            'tgl_pembayaran' => '2025-01-21 14:47:00',
            'no_rekening_sumber' => '12121313131313',
            'no_rekening_tujuan' => '-',
            'atas_nama_rekening_tujuan' => 'APOTEK YAKIN',
            'kota_atas_nama_rekening_tujuan' => '-',
            'nominal_pembayaran' => 5952375.0,
            'nomor_tagihan' => 'PB20250107001',
            'kode_metode' => 'BAU',
            'kode_bank' => 'BDI',
            'kode_transaksi' => '1212313',
            'asal_transaksi' => 'Bayar Pesan Obat/BHP',
            'status_transaksi' => 'Baru',
          ),
          2 => 
          array (
            'nomor_pembayaran' => 'BRWH0011423072025000001',
            'tgl_pembayaran' => '2025-07-23 14:46:48',
            'no_rekening_sumber' => '12121313131313',
            'no_rekening_tujuan' => '-',
            'atas_nama_rekening_tujuan' => 'AAM',
            'kota_atas_nama_rekening_tujuan' => 'PURWOKERTO',
            'nominal_pembayaran' => 22922.8465632000006735324859619140625,
            'nomor_tagihan' => 'PB20250723001',
            'kode_metode' => 'BAU',
            'kode_bank' => 'BDI',
            'kode_transaksi' => '1212313',
            'asal_transaksi' => 'Bayar Pesan Obat/BHP',
            'status_transaksi' => 'Baru',
          ),
          3 => 
          array (
            'nomor_pembayaran' => 'BRWH0011428052025000001',
            'tgl_pembayaran' => '2025-05-28 12:25:53',
            'no_rekening_sumber' => '12121313131313',
            'no_rekening_tujuan' => '-',
            'atas_nama_rekening_tujuan' => 'AAM',
            'kota_atas_nama_rekening_tujuan' => 'PURWOKERTO',
            'nominal_pembayaran' => 1221000.0,
            'nomor_tagihan' => 'PB20250428002',
            'kode_metode' => 'IBU',
            'kode_bank' => 'MEG',
            'kode_transaksi' => 'qwqwqw',
            'asal_transaksi' => 'Bayar Pesan Obat/BHP',
            'status_transaksi' => 'Baru',
          ),
          4 => 
          array (
            'nomor_pembayaran' => 'BRWH0011428052025000002',
            'tgl_pembayaran' => '2025-05-28 12:26:44',
            'no_rekening_sumber' => '12121313131313',
            'no_rekening_tujuan' => '-',
            'atas_nama_rekening_tujuan' => 'RS ZAPA',
            'kota_atas_nama_rekening_tujuan' => 'WAY KANAN',
            'nominal_pembayaran' => 43956.0,
            'nomor_tagihan' => 'PB20241218002',
            'kode_metode' => 'BAU',
            'kode_bank' => 'BNI',
            'kode_transaksi' => '123123123',
            'asal_transaksi' => 'Bayar Pesan Obat/BHP',
            'status_transaksi' => 'Baru',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}