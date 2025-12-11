<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PemasukanLainTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pemasukan_lain')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pemasukan_lain')->insert(array (
          0 => 
          array (
            'no_masuk' => 'PL20211012001',
            'tanggal' => '2021-10-12 14:13:25',
            'kode_kategori' => '02',
            'besar' => 1000000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'PAK BEJO',
            'keperluan' => 'PARKIR',
          ),
          1 => 
          array (
            'no_masuk' => 'PL20211125001',
            'tanggal' => '2021-11-25 10:02:37',
            'kode_kategori' => '04',
            'besar' => 1000000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'pak agus',
            'keperluan' => 'aik kelas',
          ),
          2 => 
          array (
            'no_masuk' => 'PL20211228001',
            'tanggal' => '2021-12-28 13:40:03',
            'kode_kategori' => '06',
            'besar' => 50000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'Tn.Wahyu',
            'keperluan' => 'Kunci',
          ),
          3 => 
          array (
            'no_masuk' => 'PL20220609001',
            'tanggal' => '2022-06-09 10:42:33',
            'kode_kategori' => '08',
            'besar' => 2000000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'BAPAK NOVAN',
            'keperluan' => 'ANTAR PASIEN',
          ),
          4 => 
          array (
            'no_masuk' => 'PL20220824001',
            'tanggal' => '2022-08-24 11:23:06',
            'kode_kategori' => '08',
            'besar' => 300000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'pak agus',
            'keperluan' => 'antar ke kotabumi',
          ),
          5 => 
          array (
            'no_masuk' => 'PL20220916001',
            'tanggal' => '2022-09-16 04:49:13',
            'kode_kategori' => '06',
            'besar' => 3000000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'RS BAZNAS SIDOARJO',
            'keperluan' => 'DONASI PENGEMBANGAN SIMRS KHANZA',
          ),
          6 => 
          array (
            'no_masuk' => 'PL20230307001',
            'tanggal' => '2023-03-07 14:41:21',
            'kode_kategori' => '04',
            'besar' => 300000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'PAIJO',
            'keperluan' => 'NAIK KELAS',
          ),
          7 => 
          array (
            'no_masuk' => 'PL20230513001',
            'tanggal' => '2023-05-13 14:18:07',
            'kode_kategori' => '08',
            'besar' => 500000.0,
            'nip' => '123124',
            'keterangan' => 'bu juminten',
            'keperluan' => 'vaksin anaknya',
          ),
          8 => 
          array (
            'no_masuk' => 'PL20230524001',
            'tanggal' => '2023-05-24 17:14:51',
            'kode_kategori' => '02',
            'besar' => 300000.0,
            'nip' => '123124',
            'keterangan' => 'ewewe',
            'keperluan' => 'parkir',
          ),
          9 => 
          array (
            'no_masuk' => 'PL20230807001',
            'tanggal' => '2023-08-07 15:07:25',
            'kode_kategori' => '08',
            'besar' => 400000.0,
            'nip' => '123124',
            'keterangan' => 'JUMINTEN',
            'keperluan' => 'ANTAR PASIEN KE BANDAR LAMPUNG',
          ),
          10 => 
          array (
            'no_masuk' => 'PL20230918001',
            'tanggal' => '2023-09-18 10:39:14',
            'kode_kategori' => '08',
            'besar' => 4000000.0,
            'nip' => '123124',
            'keterangan' => 'PAK RAHMAT',
            'keperluan' => 'ANTAR JENAZAH KE LAMPUNG',
          ),
          11 => 
          array (
            'no_masuk' => 'PL20230922001',
            'tanggal' => '2023-09-22 07:40:30',
            'kode_kategori' => '10',
            'besar' => 50000000.0,
            'nip' => '123124',
            'keterangan' => 'BAZNAS PUSAT',
            'keperluan' => 'UNTUK OPERASIONAL',
          ),
          12 => 
          array (
            'no_masuk' => 'PL20230927001',
            'tanggal' => '2023-09-27 09:40:01',
            'kode_kategori' => '03',
            'besar' => 200000.0,
            'nip' => '123124',
            'keterangan' => 'TES',
            'keperluan' => 'TES',
          ),
          13 => 
          array (
            'no_masuk' => 'PL20240125001',
            'tanggal' => '2024-01-25 15:40:48',
            'kode_kategori' => '01',
            'besar' => 100000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'pt maju mundur',
            'keperluan' => 'lebih bayar',
          ),
          14 => 
          array (
            'no_masuk' => 'PL20240125002',
            'tanggal' => '2024-01-25 16:12:15',
            'kode_kategori' => '01',
            'besar' => 49080.0,
            'nip' => '-',
            'keterangan' => 'BPJS',
            'keperluan' => 'Pendapatan Lebih Bayar Piutang Pasien',
          ),
          15 => 
          array (
            'no_masuk' => 'PL20240131001',
            'tanggal' => '2024-01-31 11:32:58',
            'kode_kategori' => '08',
            'besar' => 2000000.0,
            'nip' => '123124',
            'keterangan' => 'IBU JUMINTEN',
            'keperluan' => 'ANTAR JENAZAH KE CIREBON',
          ),
          16 => 
          array (
            'no_masuk' => 'PL20240328001',
            'tanggal' => '2024-03-28 09:05:24',
            'kode_kategori' => '08',
            'besar' => 200000.0,
            'nip' => '123124',
            'keterangan' => 'RAHMA',
            'keperluan' => 'BAYAR PASIEN ADITYA',
          ),
          17 => 
          array (
            'no_masuk' => 'PL20240604001',
            'tanggal' => '2024-06-04 09:55:21',
            'kode_kategori' => '08',
            'besar' => 1000000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'HETI',
            'keperluan' => 'KE BREBES',
          ),
          18 => 
          array (
            'no_masuk' => 'PL20240608001',
            'tanggal' => '2024-06-08 11:06:00',
            'kode_kategori' => '08',
            'besar' => 700000.0,
            'nip' => '123124',
            'keterangan' => 'IBU RAHMA/IRNA 203045',
            'keperluan' => 'AMBULANCE KE BREBES',
          ),
          19 => 
          array (
            'no_masuk' => 'PL20240611001',
            'tanggal' => '2024-06-11 10:28:21',
            'kode_kategori' => '08',
            'besar' => 1500000.0,
            'nip' => '123124',
            'keterangan' => '112312 rahma',
            'keperluan' => 'ambulance ke solo',
          ),
          20 => 
          array (
            'no_masuk' => 'PL20240717001',
            'tanggal' => '2024-07-17 08:52:15',
            'kode_kategori' => '08',
            'besar' => 1500000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'SARPINI',
            'keperluan' => 'ANTAR KE BANYUWANGI',
          ),
          21 => 
          array (
            'no_masuk' => 'PL20240723001',
            'tanggal' => '2024-07-23 10:08:32',
            'kode_kategori' => '04',
            'besar' => 750000.0,
            'nip' => '123124',
            'keterangan' => 'WAHYU PRASTOWO',
            'keperluan' => '043212 EKA',
          ),
          22 => 
          array (
            'no_masuk' => 'PL20240819001',
            'tanggal' => '2024-08-19 17:37:48',
            'kode_kategori' => '08',
            'besar' => 1000000.0,
            'nip' => '123124',
            'keterangan' => 'IBU ANI',
            'keperluan' => 'ANTAR PASIEN 123456 KE LAMPUNG',
          ),
          23 => 
          array (
            'no_masuk' => 'PL20240911001',
            'tanggal' => '2024-09-11 11:19:27',
            'kode_kategori' => '08',
            'besar' => 500000.0,
            'nip' => '123124',
            'keterangan' => 'NY. YANTI',
            'keperluan' => 'ANTAR PASIEN RANI 020202 KE PAINAN',
          ),
          24 => 
          array (
            'no_masuk' => 'PL20240930001',
            'tanggal' => '2024-09-30 14:34:44',
            'kode_kategori' => '08',
            'besar' => 600000.0,
            'nip' => '123124',
            'keterangan' => 'pasien erna 123456',
            'keperluan' => 'antar ke pinrang',
          ),
          25 => 
          array (
            'no_masuk' => 'PL20241011001',
            'tanggal' => '2024-10-11 11:19:29',
            'kode_kategori' => '08',
            'besar' => 400000.0,
            'nip' => '123124',
            'keterangan' => 'ny. rani',
            'keperluan' => 'ambulan ke cilacap',
          ),
          26 => 
          array (
            'no_masuk' => 'PL20241101001',
            'tanggal' => '2024-11-01 10:45:40',
            'kode_kategori' => '02',
            'besar' => 5000000.0,
            'nip' => '123124',
            'keterangan' => 'PT. PARKIR SANGATA',
            'keperluan' => 'PARKIR BULAN 10',
          ),
          27 => 
          array (
            'no_masuk' => 'PL20241103001',
            'tanggal' => '2024-11-03 10:23:31',
            'kode_kategori' => '01',
            'besar' => 2843520.0,
            'nip' => '-',
            'keterangan' => 'BPJS',
            'keperluan' => 'Pendapatan Lebih Bayar Piutang Pasien',
          ),
          28 => 
          array (
            'no_masuk' => 'PL20241103002',
            'tanggal' => '2024-11-03 11:05:44',
            'kode_kategori' => '08',
            'besar' => 700000.0,
            'nip' => '123124',
            'keterangan' => 'IBU SITI',
            'keperluan' => 'ANTAR PASIEN KE SAMARINDA',
          ),
          29 => 
          array (
            'no_masuk' => 'PL20241107001',
            'tanggal' => '2024-11-07 09:44:31',
            'kode_kategori' => '09',
            'besar' => 1000000.0,
            'nip' => '123124',
            'keterangan' => 'IBU DEWI',
            'keperluan' => 'BIAYA KLL',
          ),
          30 => 
          array (
            'no_masuk' => 'PL20241107002',
            'tanggal' => '2024-11-07 00:00:00',
            'kode_kategori' => '04',
            'besar' => 1500000.0,
            'nip' => '123124',
            'keterangan' => 'IBU ERNA',
            'keperluan' => 'SELISIH BAYAR PASIEN 0101001',
          ),
          31 => 
          array (
            'no_masuk' => 'PL20241108001',
            'tanggal' => '2024-11-08 15:30:06',
            'kode_kategori' => '08',
            'besar' => 700000.0,
            'nip' => '123124',
            'keterangan' => 'TUTIK',
            'keperluan' => 'AMBULANCE KE PENAJAM',
          ),
          32 => 
          array (
            'no_masuk' => 'PL20241112001',
            'tanggal' => '2024-11-12 09:56:56',
            'kode_kategori' => '08',
            'besar' => 700000.0,
            'nip' => '123124',
            'keterangan' => 'ibu feni',
            'keperluan' => 'ambulan ke buntok',
          ),
          33 => 
          array (
            'no_masuk' => 'PL20241114001',
            'tanggal' => '2024-11-14 12:00:51',
            'kode_kategori' => '04',
            'besar' => 500000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'budi',
            'keperluan' => 'pasien tes',
          ),
          34 => 
          array (
            'no_masuk' => 'PL20250115001',
            'tanggal' => '2025-01-15 11:34:28',
            'kode_kategori' => '08',
            'besar' => 500000.0,
            'nip' => '123124',
            'keterangan' => 'IRHAM',
            'keperluan' => 'ANTAR KE SERANG',
          ),
          35 => 
          array (
            'no_masuk' => 'PL20250206001',
            'tanggal' => '2025-02-06 10:27:56',
            'kode_kategori' => '12',
            'besar' => 1000000.0,
            'nip' => '123124',
            'keterangan' => 'RAHMA',
            'keperluan' => 'AMBULANCE KE METRO',
          ),
          36 => 
          array (
            'no_masuk' => 'PL20250211001',
            'tanggal' => '2025-02-11 10:57:13',
            'kode_kategori' => '08',
            'besar' => 600000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'RAGMA',
            'keperluan' => 'ANTAR KE JAKARTA',
          ),
          37 => 
          array (
            'no_masuk' => 'PL20250326001',
            'tanggal' => '2025-03-26 14:30:33',
            'kode_kategori' => '09',
            'besar' => 2000000.0,
            'nip' => '123124',
            'keterangan' => 'ibu rani',
            'keperluan' => 'titipan jasa raharja',
          ),
          38 => 
          array (
            'no_masuk' => 'PL20250414001',
            'tanggal' => '2025-04-14 14:09:40',
            'kode_kategori' => '08',
            'besar' => 500000.0,
            'nip' => '123124',
            'keterangan' => 'NY. HERDIANTI',
            'keperluan' => 'ANTAR KE KUDUS',
          ),
          39 => 
          array (
            'no_masuk' => 'PL20250428001',
            'tanggal' => '2025-04-28 09:50:13',
            'kode_kategori' => '08',
            'besar' => 300000.0,
            'nip' => '123124',
            'keterangan' => 'PAK WAHYU',
            'keperluan' => 'ANTAR KE KEBUMEN',
          ),
          40 => 
          array (
            'no_masuk' => 'PL20250603001',
            'tanggal' => '2025-06-03 09:01:10',
            'kode_kategori' => '08',
            'besar' => 500000.0,
            'nip' => '123124',
            'keterangan' => 'WAHYU',
            'keperluan' => 'KE REMBANG',
          ),
          41 => 
          array (
            'no_masuk' => 'PL20250603002',
            'tanggal' => '2025-06-03 09:48:43',
            'kode_kategori' => '04',
            'besar' => 400000.0,
            'nip' => '123124',
            'keterangan' => 'paijem',
            'keperluan' => 'pasien Rahma 120204',
          ),
          42 => 
          array (
            'no_masuk' => 'PL20250620001',
            'tanggal' => '2025-06-20 10:18:55',
            'kode_kategori' => '11',
            'besar' => 1000000.0,
            'nip' => '123124',
            'keterangan' => 'BP RENDRA',
            'keperluan' => 'KE PANGKALAN BUN',
          ),
          43 => 
          array (
            'no_masuk' => 'PL20250630001',
            'tanggal' => '2025-06-30 15:06:14',
            'kode_kategori' => '01',
            'besar' => 800000.0,
            'nip' => '123124',
            'keterangan' => 'NO.RM 090999',
            'keperluan' => 'RUJUK KE DORIS',
          ),
          44 => 
          array (
            'no_masuk' => 'PL20250806001',
            'tanggal' => '2025-08-06 09:03:42',
            'kode_kategori' => '08',
            'besar' => 1000000.0,
            'nip' => '123124',
            'keterangan' => 'BAPAK ALI',
            'keperluan' => 'ANTAR KE PASURUAN',
          ),
          45 => 
          array (
            'no_masuk' => 'PL20250819001',
            'tanggal' => '2025-08-19 11:29:23',
            'kode_kategori' => '08',
            'besar' => 400000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'IBU YENI',
            'keperluan' => 'ANTAR KE KOTA LAMONGAN',
          ),
          46 => 
          array (
            'no_masuk' => 'PL20250825001',
            'tanggal' => '2025-08-25 14:24:30',
            'kode_kategori' => '04',
            'besar' => 200000.0,
            'nip' => '12/09/1988/001',
            'keterangan' => 'IBU NENI',
            'keperluan' => 'NO.RM 000022',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}