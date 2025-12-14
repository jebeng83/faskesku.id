<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KategoriPemasukanLainTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kategori_pemasukan_lain')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kategori_pemasukan_lain')->insert([
            0 => [
                'kode_kategori' => '01',
                'nama_kategori' => 'LEBIH BAYAR PIUTANG JAMINAN',
                'kd_rek' => '430113',
                'kd_rek2' => '111010',
            ],
            1 => [
                'kode_kategori' => '02',
                'nama_kategori' => 'Penerimaan Pembayaran Parkir',
                'kd_rek' => '430100',
                'kd_rek2' => '111010',
            ],
            2 => [
                'kode_kategori' => '03',
                'nama_kategori' => 'Penerimaan dari pendapatan akte',
                'kd_rek' => '430101',
                'kd_rek2' => '111010',
            ],
            3 => [
                'kode_kategori' => '04',
                'nama_kategori' => 'Biaya Naik Kelas Pasien',
                'kd_rek' => '420109',
                'kd_rek2' => '111010',
            ],
            4 => [
                'kode_kategori' => '05',
                'nama_kategori' => 'Pendapatan Pasien Meninggal',
                'kd_rek' => '430107',
                'kd_rek2' => '111010',
            ],
            5 => [
                'kode_kategori' => '06',
                'nama_kategori' => 'Pembayaran Via EDC',
                'kd_rek' => '430107',
                'kd_rek2' => '112010',
            ],
            6 => [
                'kode_kategori' => '07',
                'nama_kategori' => 'Hibah Ke Bank Mandiri',
                'kd_rek' => '430108',
                'kd_rek2' => '112010',
            ],
            7 => [
                'kode_kategori' => '08',
                'nama_kategori' => 'BIAYA ANTAR AMBULANCE VIA KAS',
                'kd_rek' => '430109',
                'kd_rek2' => '111010',
            ],
            8 => [
                'kode_kategori' => '09',
                'nama_kategori' => 'PEMBAYARAN CASH UANG MUKA',
                'kd_rek' => '420104',
                'kd_rek2' => '111010',
            ],
            9 => [
                'kode_kategori' => '10',
                'nama_kategori' => 'Penerimaan Zakat Dari Pusat',
                'kd_rek' => '430112',
                'kd_rek2' => '112010',
            ],
            10 => [
                'kode_kategori' => '11',
                'nama_kategori' => 'BIAYA ANTAR AMBULANCE VIA MANDIRI',
                'kd_rek' => '430109',
                'kd_rek2' => '112010',
            ],
            11 => [
                'kode_kategori' => '12',
                'nama_kategori' => 'AMBULANCE VIA BCA',
                'kd_rek' => '430109',
                'kd_rek2' => '112080',
            ],
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
