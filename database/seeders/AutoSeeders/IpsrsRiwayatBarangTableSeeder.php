<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class IpsrsRiwayatBarangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('ipsrs_riwayat_barang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('ipsrs_riwayat_barang')->insert(array (
          0 => 
          array (
            'kode_brng' => 'B00007',
            'stok_awal' => 227.0,
            'masuk' => 10.0,
            'keluar' => 0.0,
            'stok_akhir' => 237.0,
            'posisi' => 'Penerimaan',
            'tanggal' => '2024-11-13',
            'jam' => '18:59:06',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          1 => 
          array (
            'kode_brng' => 'B00006',
            'stok_awal' => 160.0,
            'masuk' => 0.0,
            'keluar' => 10.0,
            'stok_akhir' => 150.0,
            'posisi' => 'Stok Keluar',
            'tanggal' => '2024-11-18',
            'jam' => '20:43:25',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          2 => 
          array (
            'kode_brng' => 'B00002',
            'stok_awal' => 48.0,
            'masuk' => 0.0,
            'keluar' => 10.0,
            'stok_akhir' => 38.0,
            'posisi' => 'Stok Keluar',
            'tanggal' => '2024-11-18',
            'jam' => '20:43:25',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          3 => 
          array (
            'kode_brng' => 'B00006',
            'stok_awal' => 150.0,
            'masuk' => 100.0,
            'keluar' => 0.0,
            'stok_akhir' => 100.0,
            'posisi' => 'Opname',
            'tanggal' => '2025-01-07',
            'jam' => '14:33:57',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          4 => 
          array (
            'kode_brng' => 'B00006',
            'stok_awal' => 100.0,
            'masuk' => 10.0,
            'keluar' => 0.0,
            'stok_akhir' => 110.0,
            'posisi' => 'Penerimaan',
            'tanggal' => '2025-01-23',
            'jam' => '10:58:57',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          5 => 
          array (
            'kode_brng' => 'B00008',
            'stok_awal' => 20.0,
            'masuk' => 10.0,
            'keluar' => 0.0,
            'stok_akhir' => 30.0,
            'posisi' => 'Penerimaan',
            'tanggal' => '2025-01-23',
            'jam' => '10:58:57',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          6 => 
          array (
            'kode_brng' => 'B00005',
            'stok_awal' => 783.0,
            'masuk' => 5.0,
            'keluar' => 0.0,
            'stok_akhir' => 788.0,
            'posisi' => 'Penerimaan',
            'tanggal' => '2025-01-23',
            'jam' => '10:58:57',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          7 => 
          array (
            'kode_brng' => 'B00006',
            'stok_awal' => 110.0,
            'masuk' => 30.0,
            'keluar' => 0.0,
            'stok_akhir' => 140.0,
            'posisi' => 'Penerimaan',
            'tanggal' => '2025-01-30',
            'jam' => '09:48:46',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          8 => 
          array (
            'kode_brng' => 'B00008',
            'stok_awal' => 30.0,
            'masuk' => 20.0,
            'keluar' => 0.0,
            'stok_akhir' => 50.0,
            'posisi' => 'Penerimaan',
            'tanggal' => '2025-01-30',
            'jam' => '09:48:46',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          9 => 
          array (
            'kode_brng' => 'B00005',
            'stok_awal' => 788.0,
            'masuk' => 40.0,
            'keluar' => 0.0,
            'stok_akhir' => 828.0,
            'posisi' => 'Penerimaan',
            'tanggal' => '2025-01-30',
            'jam' => '09:48:46',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          10 => 
          array (
            'kode_brng' => 'B00008',
            'stok_awal' => 50.0,
            'masuk' => 10.0,
            'keluar' => 0.0,
            'stok_akhir' => 60.0,
            'posisi' => 'Pengadaan',
            'tanggal' => '2025-04-28',
            'jam' => '09:58:06',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          11 => 
          array (
            'kode_brng' => 'B00005',
            'stok_awal' => 828.0,
            'masuk' => 10.0,
            'keluar' => 0.0,
            'stok_akhir' => 838.0,
            'posisi' => 'Pengadaan',
            'tanggal' => '2025-04-28',
            'jam' => '09:58:06',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          12 => 
          array (
            'kode_brng' => 'B00008',
            'stok_awal' => 60.0,
            'masuk' => 0.0,
            'keluar' => 3.0,
            'stok_akhir' => 57.0,
            'posisi' => 'Stok Keluar',
            'tanggal' => '2025-06-18',
            'jam' => '07:42:56',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          13 => 
          array (
            'kode_brng' => 'B00003',
            'stok_awal' => 283.0,
            'masuk' => 0.0,
            'keluar' => 3.0,
            'stok_akhir' => 280.0,
            'posisi' => 'Stok Keluar',
            'tanggal' => '2025-06-18',
            'jam' => '07:42:56',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          14 => 
          array (
            'kode_brng' => 'B00007',
            'stok_awal' => 237.0,
            'masuk' => 100.0,
            'keluar' => 0.0,
            'stok_akhir' => 100.0,
            'posisi' => 'Opname',
            'tanggal' => '2025-06-19',
            'jam' => '13:03:27',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          15 => 
          array (
            'kode_brng' => 'B00008',
            'stok_awal' => 57.0,
            'masuk' => 100.0,
            'keluar' => 0.0,
            'stok_akhir' => 100.0,
            'posisi' => 'Opname',
            'tanggal' => '2025-06-19',
            'jam' => '13:03:27',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          16 => 
          array (
            'kode_brng' => 'B00006',
            'stok_awal' => 140.0,
            'masuk' => 0.0,
            'keluar' => 1.0,
            'stok_akhir' => 139.0,
            'posisi' => 'Stok Keluar',
            'tanggal' => '2025-06-19',
            'jam' => '13:06:14',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          17 => 
          array (
            'kode_brng' => 'B00008',
            'stok_awal' => 100.0,
            'masuk' => 0.0,
            'keluar' => 1.0,
            'stok_akhir' => 99.0,
            'posisi' => 'Stok Keluar',
            'tanggal' => '2025-06-19',
            'jam' => '13:06:14',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          18 => 
          array (
            'kode_brng' => 'B00006',
            'stok_awal' => 139.0,
            'masuk' => 10.0,
            'keluar' => 0.0,
            'stok_akhir' => 149.0,
            'posisi' => 'Penerimaan',
            'tanggal' => '2025-06-19',
            'jam' => '13:10:30',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          19 => 
          array (
            'kode_brng' => 'B00008',
            'stok_awal' => 99.0,
            'masuk' => 5.0,
            'keluar' => 0.0,
            'stok_akhir' => 104.0,
            'posisi' => 'Penerimaan',
            'tanggal' => '2025-06-19',
            'jam' => '13:10:30',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          20 => 
          array (
            'kode_brng' => 'B00005',
            'stok_awal' => 838.0,
            'masuk' => 100.0,
            'keluar' => 0.0,
            'stok_akhir' => 938.0,
            'posisi' => 'Penerimaan',
            'tanggal' => '2025-06-19',
            'jam' => '13:11:13',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          21 => 
          array (
            'kode_brng' => 'B00004',
            'stok_awal' => 591.0,
            'masuk' => 6.0,
            'keluar' => 0.0,
            'stok_akhir' => 597.0,
            'posisi' => 'Penerimaan',
            'tanggal' => '2025-06-19',
            'jam' => '13:11:13',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          22 => 
          array (
            'kode_brng' => 'B00008',
            'stok_awal' => 104.0,
            'masuk' => 0.0,
            'keluar' => 1.0,
            'stok_akhir' => 103.0,
            'posisi' => 'Stok Keluar',
            'tanggal' => '2025-06-30',
            'jam' => '13:21:01',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          23 => 
          array (
            'kode_brng' => 'B00005',
            'stok_awal' => 938.0,
            'masuk' => 0.0,
            'keluar' => 1.0,
            'stok_akhir' => 937.0,
            'posisi' => 'Stok Keluar',
            'tanggal' => '2025-06-30',
            'jam' => '13:21:01',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          24 => 
          array (
            'kode_brng' => 'B00005',
            'stok_awal' => 937.0,
            'masuk' => 0.0,
            'keluar' => 2.0,
            'stok_akhir' => 935.0,
            'posisi' => 'Stok Keluar',
            'tanggal' => '2025-08-05',
            'jam' => '15:09:38',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          25 => 
          array (
            'kode_brng' => 'B00004',
            'stok_awal' => 597.0,
            'masuk' => 0.0,
            'keluar' => 1.0,
            'stok_akhir' => 596.0,
            'posisi' => 'Stok Keluar',
            'tanggal' => '2025-08-05',
            'jam' => '15:09:38',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          26 => 
          array (
            'kode_brng' => 'B00005',
            'stok_awal' => 935.0,
            'masuk' => 0.0,
            'keluar' => 1.0,
            'stok_akhir' => 934.0,
            'posisi' => 'Stok Keluar',
            'tanggal' => '2025-08-13',
            'jam' => '17:22:56',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          27 => 
          array (
            'kode_brng' => 'B00006',
            'stok_awal' => 149.0,
            'masuk' => 7.0,
            'keluar' => 0.0,
            'stok_akhir' => 156.0,
            'posisi' => 'Penerimaan',
            'tanggal' => '2025-08-13',
            'jam' => '17:28:00',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          28 => 
          array (
            'kode_brng' => 'B00005',
            'stok_awal' => 934.0,
            'masuk' => 5.0,
            'keluar' => 0.0,
            'stok_akhir' => 939.0,
            'posisi' => 'Penerimaan',
            'tanggal' => '2025-08-13',
            'jam' => '17:28:01',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
          29 => 
          array (
            'kode_brng' => 'B00004',
            'stok_awal' => 596.0,
            'masuk' => 10.0,
            'keluar' => 0.0,
            'stok_akhir' => 606.0,
            'posisi' => 'Penerimaan',
            'tanggal' => '2025-08-13',
            'jam' => '17:28:01',
            'petugas' => 'Admin Utama',
            'status' => 'Simpan',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}