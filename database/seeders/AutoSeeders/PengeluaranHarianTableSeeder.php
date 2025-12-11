<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PengeluaranHarianTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pengeluaran_harian')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pengeluaran_harian')->insert(array (
          0 => 
          array (
            'no_keluar' => 'BRWH0011411022025000001',
            'tanggal' => '2025-02-11 11:01:14',
            'kode_kategori' => '4',
            'biaya' => 6000000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'Validasi pengajuan No.PK20250211001 tanggal 2025-02-11 oleh FREDIAN AHMAD NIP 123124',
          ),
          1 => 
          array (
            'no_keluar' => 'BRWH0011411122024000001',
            'tanggal' => '2024-12-11 09:12:42',
            'kode_kategori' => '3',
            'biaya' => 500000.0,
            'nip' => '123124',
            'keterangan' => 'tes',
          ),
          2 => 
          array (
            'no_keluar' => 'BRWH0011415012025000001',
            'tanggal' => '2025-01-15 11:33:25',
            'kode_kategori' => '4',
            'biaya' => 1000000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'BAYAR BULAN JUNI',
          ),
          3 => 
          array (
            'no_keluar' => 'BRWH0011421012025000001',
            'tanggal' => '2025-01-21 11:14:06',
            'kode_kategori' => '4',
            'biaya' => 300000.0,
            'nip' => '123124',
            'keterangan' => 'tes bayar',
          ),
          4 => 
          array (
            'no_keluar' => 'BRWH0011425112024000001',
            'tanggal' => '2024-11-25 14:19:35',
            'kode_kategori' => '4',
            'biaya' => 20000000.0,
            'nip' => '123124',
            'keterangan' => 'BAYAR BULAN DESEMBER',
          ),
          5 => 
          array (
            'no_keluar' => 'PH20241112001',
            'tanggal' => '2024-11-12 09:54:37',
            'kode_kategori' => '1',
            'biaya' => 2000000.0,
            'nip' => '123124',
            'keterangan' => 'listrik bula oktober',
          ),
          6 => 
          array (
            'no_keluar' => 'PH20250121002',
            'tanggal' => '2025-01-21 14:30:32',
            'kode_kategori' => '4',
            'biaya' => 1000000.0,
            'nip' => '123124',
            'keterangan' => '-',
          ),
          7 => 
          array (
            'no_keluar' => 'PH20250211002',
            'tanggal' => '2025-02-11 11:02:34',
            'kode_kategori' => '5',
            'biaya' => 600000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'BELI SOLAR GENSET/MOBIL',
          ),
          8 => 
          array (
            'no_keluar' => 'PH20250414001',
            'tanggal' => '2025-04-14 14:14:41',
            'kode_kategori' => '5',
            'biaya' => 500000.0,
            'nip' => '123124',
            'keterangan' => 'pak joko beli solar untuk mobil',
          ),
          9 => 
          array (
            'no_keluar' => 'PH20250428001',
            'tanggal' => '2025-04-28 09:53:05',
            'kode_kategori' => '5',
            'biaya' => 400000.0,
            'nip' => '123124',
            'keterangan' => 'PAK BUDI BELI SOLAR UNTUK KE JOGJA',
          ),
          10 => 
          array (
            'no_keluar' => 'PH20250603001',
            'tanggal' => '2025-06-03 10:21:35',
            'kode_kategori' => '5',
            'biaya' => 400000.0,
            'nip' => '123124',
            'keterangan' => 'PAK AHMAD BELI SOLAR GENSET',
          ),
          11 => 
          array (
            'no_keluar' => 'PH20250620001',
            'tanggal' => '2025-06-20 10:20:57',
            'kode_kategori' => '1',
            'biaya' => 40000000.0,
            'nip' => '123124',
            'keterangan' => 'BULAN JUNI',
          ),
          12 => 
          array (
            'no_keluar' => 'PH20250630001',
            'tanggal' => '2025-06-30 15:07:37',
            'kode_kategori' => '5',
            'biaya' => 300000.0,
            'nip' => '123124',
            'keterangan' => 'pak harry beli solar',
          ),
          13 => 
          array (
            'no_keluar' => 'PH20250708001',
            'tanggal' => '2025-07-08 11:00:10',
            'kode_kategori' => '5',
            'biaya' => 500000.0,
            'nip' => '123124',
            'keterangan' => 'MAS DEKY BELI SOLAR BUAT GENSET',
          ),
          14 => 
          array (
            'no_keluar' => 'PH20250806001',
            'tanggal' => '2025-08-06 09:08:46',
            'kode_kategori' => '4',
            'biaya' => 20000000.0,
            'nip' => '123124',
            'keterangan' => 'BAYAR LISTRIK BULAN JULI',
          ),
          15 => 
          array (
            'no_keluar' => 'PK20250414001',
            'tanggal' => '2025-04-14 14:21:47',
            'kode_kategori' => '6',
            'biaya' => 4500000.0,
            'nip' => '123124',
            'keterangan' => 'Validasi pengajuan No.PK20250414001 tanggal 2025-04-14 oleh FREDIAN AHMAD NIP 123124',
          ),
          16 => 
          array (
            'no_keluar' => 'PK20250603001',
            'tanggal' => '2025-06-03 10:24:23',
            'kode_kategori' => '6',
            'biaya' => 5200000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'Validasi pengajuan No.PK20250603001 tanggal 2025-06-03 oleh FREDIAN AHMAD NIP 123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}