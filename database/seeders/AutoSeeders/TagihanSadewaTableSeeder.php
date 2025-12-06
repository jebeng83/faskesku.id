<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TagihanSadewaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('tagihan_sadewa')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('tagihan_sadewa')->insert(array (
          0 => 
          array (
            'no_nota' => '2025/02/12/000001',
            'no_rkm_medis' => '000022',
            'nama_pasien' => 'RUDI SANTOSO',
            'alamat' => 'TES, KEDUNGWARU, PREMBUN, KABUPATEN KEBUMEN',
            'tgl_bayar' => '2025-04-25 08:21:46',
            'jenis_bayar' => 'Uang Muka',
            'jumlah_tagihan' => 4471820.0,
            'jumlah_bayar' => 1471820.0,
            'status' => 'Belum',
            'petugas' => 'Admin Utama',
          ),
          1 => 
          array (
            'no_nota' => '2025/04/28/000003',
            'no_rkm_medis' => '000003',
            'nama_pasien' => 'HAFIZ HARIYADI',
            'alamat' => '-, SAMBILAWANG, TRANGKIL, - PATI',
            'tgl_bayar' => '2025-04-28 09:44:28',
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => 150000.0,
            'jumlah_bayar' => 150000.0,
            'status' => 'Sudah',
            'petugas' => 'Admin Utama',
          ),
          2 => 
          array (
            'no_nota' => '2025/06/03/000002',
            'no_rkm_medis' => '000013',
            'nama_pasien' => 'PARAMITA RAMADANI',
            'alamat' => 'BANTUL, BELOPA, BANDA SAKTI, BANTUL',
            'tgl_bayar' => '2025-06-03 08:58:20',
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => 758454.0,
            'jumlah_bayar' => 758454.0,
            'status' => 'Sudah',
            'petugas' => 'Admin Utama',
          ),
          3 => 
          array (
            'no_nota' => '2025/06/30/000003',
            'no_rkm_medis' => '000022',
            'nama_pasien' => 'RUDI SANTOSO',
            'alamat' => 'TES, KEDUNGWARU, PREMBUN, KABUPATEN KEBUMEN',
            'tgl_bayar' => '2025-06-30 10:05:38',
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => 768032.0,
            'jumlah_bayar' => 768032.0,
            'status' => 'Sudah',
            'petugas' => 'Admin Utama',
          ),
          4 => 
          array (
            'no_nota' => '2025/06/PD00001',
            'no_rkm_medis' => '-',
            'nama_pasien' => '-',
            'alamat' => '-',
            'tgl_bayar' => '2025-06-19 10:04:16',
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => 40000.0,
            'jumlah_bayar' => 40000.0,
            'status' => 'Sudah',
            'petugas' => 'Admin Utama',
          ),
          5 => 
          array (
            'no_nota' => '2025/07/23/000001',
            'no_rkm_medis' => '000011',
            'nama_pasien' => 'SETIYAWAN KRISTANTO',
            'alamat' => 'JL. DOKTER CIPTI RT 01/RW01, BEDALI, LAWANG, KABUPATEN MALANG',
            'tgl_bayar' => '2025-07-23 14:44:49',
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => 647181.0,
            'jumlah_bayar' => 647181.0,
            'status' => 'Sudah',
            'petugas' => 'Admin Utama',
          ),
          6 => 
          array (
            'no_nota' => '2025/07/29/000001',
            'no_rkm_medis' => '000051',
            'nama_pasien' => 'ADI KAZAMA',
            'alamat' => ', CAMPURJO, BOJONEGORO, KABUPATEN BOJONEGORO',
            'tgl_bayar' => '2025-07-29 09:52:05',
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => 1371268.0,
            'jumlah_bayar' => 1371268.0,
            'status' => 'Sudah',
            'petugas' => 'Admin Utama',
          ),
          7 => 
          array (
            'no_nota' => 'PJ20250428001',
            'no_rkm_medis' => '-',
            'nama_pasien' => 'VENDOR X',
            'alamat' => '-',
            'tgl_bayar' => '2025-04-28 11:27:18',
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => 15173.70000000000072759576141834259033203125,
            'jumlah_bayar' => 15173.70000000000072759576141834259033203125,
            'status' => 'Sudah',
            'petugas' => 'Admin Utama',
          ),
          8 => 
          array (
            'no_nota' => 'PJ20250603001',
            'no_rkm_medis' => '000013',
            'nama_pasien' => 'PARAMITA RAMADANI',
            'alamat' => '-',
            'tgl_bayar' => '2025-06-03 09:03:45',
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => 1773413.69999999995343387126922607421875,
            'jumlah_bayar' => 1773413.69999999995343387126922607421875,
            'status' => 'Sudah',
            'petugas' => 'Admin Utama',
          ),
          9 => 
          array (
            'no_nota' => 'PL20250428001',
            'no_rkm_medis' => '-',
            'nama_pasien' => 'PAK WAHYU',
            'alamat' => '-',
            'tgl_bayar' => '2025-04-28 09:50:50',
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => 0.0,
            'jumlah_bayar' => 300000.0,
            'status' => 'Sudah',
            'petugas' => 'Admin Utama',
          ),
          10 => 
          array (
            'no_nota' => 'PL20250603001',
            'no_rkm_medis' => '-',
            'nama_pasien' => 'WAHYU',
            'alamat' => '-',
            'tgl_bayar' => '2025-06-03 09:01:35',
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => 0.0,
            'jumlah_bayar' => 500000.0,
            'status' => 'Sudah',
            'petugas' => 'Admin Utama',
          ),
          11 => 
          array (
            'no_nota' => 'PL20250603002',
            'no_rkm_medis' => '-',
            'nama_pasien' => 'paijem',
            'alamat' => '-',
            'tgl_bayar' => '2025-06-03 09:49:26',
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => 500000.0,
            'jumlah_bayar' => 400000.0,
            'status' => 'Sudah',
            'petugas' => 'Admin Utama',
          ),
          12 => 
          array (
            'no_nota' => 'PL20250620001',
            'no_rkm_medis' => '-',
            'nama_pasien' => 'BP RENDRA',
            'alamat' => '-',
            'tgl_bayar' => '2025-06-20 10:19:58',
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => 0.0,
            'jumlah_bayar' => 1000000.0,
            'status' => 'Sudah',
            'petugas' => 'Admin Utama',
          ),
          13 => 
          array (
            'no_nota' => 'PL20250630001',
            'no_rkm_medis' => '-',
            'nama_pasien' => 'NO.RM 090999',
            'alamat' => '-',
            'tgl_bayar' => '2025-06-30 15:06:46',
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => 0.0,
            'jumlah_bayar' => 800000.0,
            'status' => 'Sudah',
            'petugas' => 'Admin Utama',
          ),
          14 => 
          array (
            'no_nota' => 'PL20250806001',
            'no_rkm_medis' => '-',
            'nama_pasien' => 'BAPAK ALI',
            'alamat' => '-',
            'tgl_bayar' => '2025-08-06 09:04:18',
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => 0.0,
            'jumlah_bayar' => 1000000.0,
            'status' => 'Sudah',
            'petugas' => 'Admin Utama',
          ),
          15 => 
          array (
            'no_nota' => 'PL20250819001',
            'no_rkm_medis' => '-',
            'nama_pasien' => 'IBU YENI',
            'alamat' => '-',
            'tgl_bayar' => '2025-08-19 11:29:54',
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => 0.0,
            'jumlah_bayar' => 400000.0,
            'status' => 'Sudah',
            'petugas' => 'Admin Utama',
          ),
          16 => 
          array (
            'no_nota' => 'PL20250825001',
            'no_rkm_medis' => '-',
            'nama_pasien' => 'IBU NENI',
            'alamat' => '-',
            'tgl_bayar' => '2025-08-25 14:25:32',
            'jenis_bayar' => 'Pelunasan',
            'jumlah_tagihan' => 0.0,
            'jumlah_bayar' => 200000.0,
            'status' => 'Sudah',
            'petugas' => 'Admin Utama',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}