<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InventariTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('inventaris')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('inventaris')->insert(array (
          0 => 
          array (
            'no_inventaris' => 'I000000001',
            'kode_barang' => '01',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2022-01-24',
            'harga' => 0.0,
            'status_barang' => 'Ada',
            'id_ruang' => '01',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          1 => 
          array (
            'no_inventaris' => 'I000000023',
            'kode_barang' => 'BI00000003',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2024-09-30',
            'harga' => 500000.0,
            'status_barang' => 'Ada',
            'id_ruang' => 'R4',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          2 => 
          array (
            'no_inventaris' => 'I000000023/2023',
            'kode_barang' => 'BI00000002',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2023-09-22',
            'harga' => 15000000.0,
            'status_barang' => 'Ada',
            'id_ruang' => '01',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          3 => 
          array (
            'no_inventaris' => 'I000000024',
            'kode_barang' => 'BI00000003',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2025-06-19',
            'harga' => 1000000.0,
            'status_barang' => 'Ada',
            'id_ruang' => 'R4',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          4 => 
          array (
            'no_inventaris' => 'I000000025',
            'kode_barang' => 'BI00000002',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2025-06-30',
            'harga' => 0.0,
            'status_barang' => 'Ada',
            'id_ruang' => '02',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          5 => 
          array (
            'no_inventaris' => 'I000000026',
            'kode_barang' => 'BI00000006',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2025-08-06',
            'harga' => 0.0,
            'status_barang' => 'Ada',
            'id_ruang' => 'R4',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          6 => 
          array (
            'no_inventaris' => 'I000000027',
            'kode_barang' => 'BI00000006',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2025-08-06',
            'harga' => 0.0,
            'status_barang' => 'Ada',
            'id_ruang' => 'R4',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          7 => 
          array (
            'no_inventaris' => 'INV/2023/12/14/001',
            'kode_barang' => 'BI00000003',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2023-12-14',
            'harga' => 500000.0,
            'status_barang' => 'Perbaikan',
            'id_ruang' => '01',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          8 => 
          array (
            'no_inventaris' => 'INV/2023/12/14/002',
            'kode_barang' => 'BI00000003',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2023-12-14',
            'harga' => 500000.0,
            'status_barang' => 'Ada',
            'id_ruang' => '01',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          9 => 
          array (
            'no_inventaris' => 'INV/2023/12/14/003',
            'kode_barang' => 'BI00000003',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2023-12-14',
            'harga' => 500000.0,
            'status_barang' => 'Ada',
            'id_ruang' => '01',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          10 => 
          array (
            'no_inventaris' => 'KANTOR/07/0001',
            'kode_barang' => 'BI00000005',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2025-07-29',
            'harga' => 1000000.0,
            'status_barang' => 'Ada',
            'id_ruang' => 'R4',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          11 => 
          array (
            'no_inventaris' => 'KANTOR/07/0002',
            'kode_barang' => 'BI00000005',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2025-07-29',
            'harga' => 1000000.0,
            'status_barang' => 'Ada',
            'id_ruang' => 'R4',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          12 => 
          array (
            'no_inventaris' => 'KANTOR/07/0003',
            'kode_barang' => 'BI00000005',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2025-07-29',
            'harga' => 1000000.0,
            'status_barang' => 'Ada',
            'id_ruang' => 'R4',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          13 => 
          array (
            'no_inventaris' => 'KANTOR/07/0004',
            'kode_barang' => 'BI00000005',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2025-07-29',
            'harga' => 1000000.0,
            'status_barang' => 'Ada',
            'id_ruang' => 'R4',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          14 => 
          array (
            'no_inventaris' => 'MED/03/08/2022/01',
            'kode_barang' => 'BI00000002',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2022-06-09',
            'harga' => 10000000.0,
            'status_barang' => 'Ada',
            'id_ruang' => '01',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          15 => 
          array (
            'no_inventaris' => 'MED/09/06/2022/01',
            'kode_barang' => 'BI00000002',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2022-06-09',
            'harga' => 10000000.0,
            'status_barang' => 'Ada',
            'id_ruang' => '01',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          16 => 
          array (
            'no_inventaris' => 'MED/09/06/2022/02',
            'kode_barang' => 'BI00000002',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2022-06-09',
            'harga' => 10000000.0,
            'status_barang' => 'Ada',
            'id_ruang' => '01',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          17 => 
          array (
            'no_inventaris' => 'MED/09/06/2022/03',
            'kode_barang' => 'BI00000002',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2022-06-09',
            'harga' => 10000000.0,
            'status_barang' => 'Ada',
            'id_ruang' => '01',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          18 => 
          array (
            'no_inventaris' => 'MED/11/10/0001',
            'kode_barang' => 'BI00000002',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2023-11-10',
            'harga' => 15000000.0,
            'status_barang' => 'Ada',
            'id_ruang' => '01',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          19 => 
          array (
            'no_inventaris' => 'MED/11/10/0002',
            'kode_barang' => 'BI00000002',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2023-11-10',
            'harga' => 15000000.0,
            'status_barang' => 'Ada',
            'id_ruang' => '01',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          20 => 
          array (
            'no_inventaris' => 'MED/11/10/0003',
            'kode_barang' => 'BI00000002',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2023-11-10',
            'harga' => 15000000.0,
            'status_barang' => 'Dipinjam',
            'id_ruang' => '01',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          21 => 
          array (
            'no_inventaris' => 'SAM/ELE/KAN/0001',
            'kode_barang' => '000001',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2021-10-13',
            'harga' => 2000000.0,
            'status_barang' => 'Ada',
            'id_ruang' => 'RI007',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          22 => 
          array (
            'no_inventaris' => 'SAM/ELE/KAN/0002',
            'kode_barang' => '000001',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2021-10-13',
            'harga' => 2000000.0,
            'status_barang' => 'Ada',
            'id_ruang' => 'R4',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          23 => 
          array (
            'no_inventaris' => 'SAM/ELE/KAN/0003',
            'kode_barang' => '000001',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2021-10-13',
            'harga' => 2000000.0,
            'status_barang' => 'Ada',
            'id_ruang' => 'R4',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          24 => 
          array (
            'no_inventaris' => 'SAM/ELE/KAN/0004',
            'kode_barang' => '000001',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2021-10-13',
            'harga' => 2000000.0,
            'status_barang' => 'Perbaikan',
            'id_ruang' => 'R3',
            'no_rak' => '-',
            'no_box' => '-',
          ),
          25 => 
          array (
            'no_inventaris' => 'SAM/ELE/KAN/0005',
            'kode_barang' => '000001',
            'asal_barang' => 'Beli',
            'tgl_pengadaan' => '2021-10-13',
            'harga' => 6000000.0,
            'status_barang' => 'Ada',
            'id_ruang' => 'RI007',
            'no_rak' => '-',
            'no_box' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}