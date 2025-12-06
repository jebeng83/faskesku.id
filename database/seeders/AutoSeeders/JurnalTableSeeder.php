<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class JurnalTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('jurnal')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('jurnal')->insert(array (
          0 => 
          array (
            'no_jurnal' => 'JR20250425000001',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:39:50',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/04/25/000001 DIPOSTING OLEH Admin Utama',
          ),
          1 => 
          array (
            'no_jurnal' => 'JR20250425000002',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:39:58',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000047 RIDWAN HALIM, DIPOSTING OLEH Admin Utama',
          ),
          2 => 
          array (
            'no_jurnal' => 'JR20250425000003',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:42:30',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN RIDWAN HALIM DIPOSTING OLEH Admin Utama',
          ),
          3 => 
          array (
            'no_jurnal' => 'JR20250425000004',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:42:47',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT JALAN PASIEN RIDWAN HALIM DIPOSTING OLEH Admin Utama',
          ),
          4 => 
          array (
            'no_jurnal' => 'JR20250425000005',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:43:01',
            'jenis' => 'U',
            'keterangan' => 'OPERASI RAWAT JALAN PASIEN 000047, RIDWAN HALIM DIPOSTING OLEH Admin Utama',
          ),
          5 => 
          array (
            'no_jurnal' => 'JR20250425000006',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:43:35',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT INAP PASIEN RIDWAN HALIM (36 Th) DIPOSTING OLEH Admin Utama',
          ),
          6 => 
          array (
            'no_jurnal' => 'JR20250425000007',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:43:51',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT INAP PASIEN 2025/04/25/000001 000047 RIDWAN HALIM (36 Th), DIPOSTING OLEH Admin Utama',
          ),
          7 => 
          array (
            'no_jurnal' => 'JR20250425000008',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:44:07',
            'jenis' => 'U',
            'keterangan' => 'OPERASI RAWAT INAP PASIEN 000047, RIDWAN HALIM (36 Th) DIPOSTING OLEH Admin Utama',
          ),
          8 => 
          array (
            'no_jurnal' => 'JR20250425000009',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:44:22',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT INAP PASIEN RIDWAN HALIM DIPOSTING OLEH Admin Utama',
          ),
          9 => 
          array (
            'no_jurnal' => 'JR20250425000010',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:44:53',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT INAP 2025/04/25/000001 000047 RIDWAN HALIM, DIPOSTING OLEH Admin Utama',
          ),
          10 => 
          array (
            'no_jurnal' => 'JR20250425000011',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:47:13',
            'jenis' => 'U',
            'keterangan' => 'RVP PIUTANG PASIEN BPJS, OLEH 156798',
          ),
          11 => 
          array (
            'no_jurnal' => 'JR20250425000012',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:47:13',
            'jenis' => 'U',
            'keterangan' => 'RVP PIUTANG PASIEN BPJS, OLEH 156798',
          ),
          12 => 
          array (
            'no_jurnal' => 'JR20250425000013',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:47:13',
            'jenis' => 'U',
            'keterangan' => 'RVP PIUTANG BPJS, OLEH 156798',
          ),
          13 => 
          array (
            'no_jurnal' => 'JR20250425000014',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:47:56',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN RVP PIUTANG BPJS, OLEH Admin Utama',
          ),
          14 => 
          array (
            'no_jurnal' => 'JR20250425000015',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:47:56',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN RVP PIUTANG BPJS, OLEH Admin Utama',
          ),
          15 => 
          array (
            'no_jurnal' => 'JR20250425000016',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:47:56',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN RVP PIUTANG BPJS, OLEH Admin Utama',
          ),
          16 => 
          array (
            'no_jurnal' => 'JR20250425000017',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:48:47',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PIUTANG PASIEN RAWAT INAP 2025/04/25/000001 000047 RIDWAN HALIM, DIBATALKAN OLEH Admin Utama',
          ),
          17 => 
          array (
            'no_jurnal' => 'JR20250425000018',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:49:58',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT INAP 2025/04/25/000001 000047 RIDWAN HALIM, DIPOSTING OLEH Admin Utama',
          ),
          18 => 
          array (
            'no_jurnal' => 'JR20250425000019',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:50:56',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          19 => 
          array (
            'no_jurnal' => 'JR20250425000020',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:51:33',
            'jenis' => 'U',
            'keterangan' => 'RVP PIUTANG PASIEN BPJS, OLEH 156798',
          ),
          20 => 
          array (
            'no_jurnal' => 'JR20250425000021',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:51:33',
            'jenis' => 'U',
            'keterangan' => 'RVP PIUTANG PASIEN BPJS, OLEH 156798',
          ),
          21 => 
          array (
            'no_jurnal' => 'JR20250425000022',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:51:33',
            'jenis' => 'U',
            'keterangan' => 'RVP PIUTANG BPJS, OLEH 156798',
          ),
          22 => 
          array (
            'no_jurnal' => 'JR20250425000023',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:51:43',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN RVP PIUTANG BPJS, OLEH Admin Utama',
          ),
          23 => 
          array (
            'no_jurnal' => 'JR20250425000024',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:51:43',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN RVP PIUTANG BPJS, OLEH Admin Utama',
          ),
          24 => 
          array (
            'no_jurnal' => 'JR20250425000025',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:51:43',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN RVP PIUTANG BPJS, OLEH Admin Utama',
          ),
          25 => 
          array (
            'no_jurnal' => 'JR20250425000026',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:52:52',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PIUTANG PASIEN RAWAT INAP 2025/04/25/000001 000047 RIDWAN HALIM, DIBATALKAN OLEH Admin Utama',
          ),
          26 => 
          array (
            'no_jurnal' => 'JR20250425000027',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:53:22',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBERIAN OBAT RAWAT JALAN PASIEN 000047 RIDWAN HALIM OLEH Admin Utama',
          ),
          27 => 
          array (
            'no_jurnal' => 'JR20250425000028',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:53:24',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBERIAN OBAT RAWAT INAP PASIEN 000047 RIDWAN HALIM OLEH Admin Utama',
          ),
          28 => 
          array (
            'no_jurnal' => 'JR20250425000029',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:53:26',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBERIAN OBAT RAWAT INAP PASIEN 000047 RIDWAN HALIM OLEH Admin Utama',
          ),
          29 => 
          array (
            'no_jurnal' => 'JR20250425000030',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:53:41',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN TINDAKAN RAWAT JALAN PASIEN 000047 RIDWAN HALIM OLEH Admin Utama',
          ),
          30 => 
          array (
            'no_jurnal' => 'JR20250425000031',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:53:54',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN TINDAKAN RAWAT INAP PASIEN 000047 RIDWAN HALIM OLEH Admin Utama',
          ),
          31 => 
          array (
            'no_jurnal' => 'JR20250425000032',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:54:15',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN OPERASI RAWAT JALAN PASIEN OLEH Admin Utama',
          ),
          32 => 
          array (
            'no_jurnal' => 'JR20250425000033',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:54:20',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN OPERASI RAWAT INAP PASIEN OLEH Admin Utama',
          ),
          33 => 
          array (
            'no_jurnal' => 'JR20250425000034',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:54:33',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMERIKSAAN LABORAT RAWAT JALAN PASIEN 000047 RIDWAN HALIM (Kamar : VUP.01, Kamar Kelas VIP) OLEH Admin Utama',
          ),
          34 => 
          array (
            'no_jurnal' => 'JR20250425000035',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:54:40',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMERIKSAAN RADIOLOGI RAWAT INAP PASIEN 000047 RIDWAN HALIM (Kamar : VUP.01, Kamar Kelas VIP) OLEH Admin Utama',
          ),
          35 => 
          array (
            'no_jurnal' => 'JR20250425000036',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-25',
            'jam_jurnal' => '13:54:43',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMERIKSAAN RADIOLOGI RAWAT JALAN PASIEN 000047 RIDWAN HALIM (Kamar : VUP.01, Kamar Kelas VIP) OLEH Admin Utama',
          ),
          36 => 
          array (
            'no_jurnal' => 'JR20250426000001',
            'no_bukti' => '2025/04/26/000001',
            'tgl_jurnal' => '2025-04-26',
            'jam_jurnal' => '09:26:02',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000006 SAKHA HAMIZAN AQILA, DIPOSTING OLEH Admin Utama',
          ),
          37 => 
          array (
            'no_jurnal' => 'JR20250426000002',
            'no_bukti' => '2025/04/26/000001',
            'tgl_jurnal' => '2025-04-26',
            'jam_jurnal' => '09:31:42',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN SAKHA HAMIZAN AQILA DIPOSTING OLEH Admin Utama',
          ),
          38 => 
          array (
            'no_jurnal' => 'JR20250427000001',
            'no_bukti' => '2025/04/27/000002',
            'tgl_jurnal' => '2025-04-27',
            'jam_jurnal' => '08:30:54',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000013 PARAMITA RAMADANI (35 Th), DIPOSTING OLEH Admin Utama',
          ),
          39 => 
          array (
            'no_jurnal' => 'JR20250427000002',
            'no_bukti' => '2025/04/27/000002',
            'tgl_jurnal' => '2025-04-27',
            'jam_jurnal' => '08:31:05',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000013 PARAMITA RAMADANI (35 Th), DIPOSTING OLEH Admin Utama',
          ),
          40 => 
          array (
            'no_jurnal' => 'JR20250427000003',
            'no_bukti' => '2025/04/27/000001',
            'tgl_jurnal' => '2025-04-27',
            'jam_jurnal' => '08:32:26',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000022 RUDI SANTOSO (68 Th), DIPOSTING OLEH Admin Utama',
          ),
          41 => 
          array (
            'no_jurnal' => 'JR20250427000004',
            'no_bukti' => '2025/04/27/000001',
            'tgl_jurnal' => '2025-04-27',
            'jam_jurnal' => '08:37:13',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/04/27/000001 DIPOSTING OLEH Admin Utama',
          ),
          42 => 
          array (
            'no_jurnal' => 'JR20250427000005',
            'no_bukti' => '2025/04/27/000001',
            'tgl_jurnal' => '2025-04-27',
            'jam_jurnal' => '08:42:18',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          43 => 
          array (
            'no_jurnal' => 'JR20250427000006',
            'no_bukti' => '2025/04/27/000001',
            'tgl_jurnal' => '2025-04-27',
            'jam_jurnal' => '08:46:41',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          44 => 
          array (
            'no_jurnal' => 'JR20250427000007',
            'no_bukti' => '2025/04/27/000001',
            'tgl_jurnal' => '2025-04-27',
            'jam_jurnal' => '08:48:13',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT JALAN PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          45 => 
          array (
            'no_jurnal' => 'JR20250428000001',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:13:09',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000006 SAKHA HAMIZAN AQILA (7 Th), DIPOSTING OLEH Admin Utama',
          ),
          46 => 
          array (
            'no_jurnal' => 'JR20250428000002',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:16:27',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000006 SAKHA HAMIZAN AQILA (7 Th), DIPOSTING OLEH Admin Utama',
          ),
          47 => 
          array (
            'no_jurnal' => 'JR20250428000003',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:17:29',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000006 SAKHA HAMIZAN AQILA (7 Th), DIPOSTING OLEH Admin Utama',
          ),
          48 => 
          array (
            'no_jurnal' => 'JR20250428000004',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:18:14',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN SAKHA HAMIZAN AQILA DIPOSTING OLEH Admin Utama',
          ),
          49 => 
          array (
            'no_jurnal' => 'JR20250428000005',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:19:35',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN PASIEN RAWAT JALAN 2025/04/28/000001 000006 SAKHA HAMIZAN AQILA, DIPOSTING OLEH Admin Utama',
          ),
          50 => 
          array (
            'no_jurnal' => 'JR20250428000006',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:20:28',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBAYARAN PASIEN RAWAT JALAN 2025/04/28/000001 000006 SAKHA HAMIZAN AQILA, DIBATALKAN OLEH Admin Utama',
          ),
          51 => 
          array (
            'no_jurnal' => 'JR20250428000007',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:21:22',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT JALAN 2025/04/28/000001 000006 SAKHA HAMIZAN AQILA, DIPOSTING OLEH Admin Utama',
          ),
          52 => 
          array (
            'no_jurnal' => 'JR20250428000008',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:22:43',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000011 SETIYAWAN KRISTANTO (65 Th), DIPOSTING OLEH Admin Utama',
          ),
          53 => 
          array (
            'no_jurnal' => 'JR20250428000009',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:23:14',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000011 SETIYAWAN KRISTANTO (65 Th), DIPOSTING OLEH Admin Utama',
          ),
          54 => 
          array (
            'no_jurnal' => 'JR20250428000010',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:23:30',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT JALAN 2025/04/28/000002 000011 SETIYAWAN KRISTANTO, DIPOSTING OLEH Admin Utama',
          ),
          55 => 
          array (
            'no_jurnal' => 'JR20250428000011',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:31:24',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          56 => 
          array (
            'no_jurnal' => 'JR20250428000012',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:31:24',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          57 => 
          array (
            'no_jurnal' => 'JR20250428000013',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:35:37',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          58 => 
          array (
            'no_jurnal' => 'JR20250428000014',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:35:39',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          59 => 
          array (
            'no_jurnal' => 'JR20250428000015',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:37:56',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          60 => 
          array (
            'no_jurnal' => 'JR20250428000016',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:37:56',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          61 => 
          array (
            'no_jurnal' => 'JR20250428000017',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:38:38',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          62 => 
          array (
            'no_jurnal' => 'JR20250428000018',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:38:41',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          63 => 
          array (
            'no_jurnal' => 'JR20250428000019',
            'no_bukti' => '2025/04/28/000004',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:43:36',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000019 RIZKI AMALIA (30 Th), DIPOSTING OLEH Admin Utama',
          ),
          64 => 
          array (
            'no_jurnal' => 'JR20250428000020',
            'no_bukti' => '2025/04/28/000004',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:43:55',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN PASIEN RAWAT JALAN 2025/04/28/000004 000019 RIZKI AMALIA, DIPOSTING OLEH Admin Utama',
          ),
          65 => 
          array (
            'no_jurnal' => 'JR20250428000021',
            'no_bukti' => '2025/04/28/000003',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:44:17',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/04/28/000003 DIPOSTING OLEH Admin Utama',
          ),
          66 => 
          array (
            'no_jurnal' => 'JR20250428000022',
            'no_bukti' => '2025/04/28/000003',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:44:28',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN PASIEN RAWAT JALAN 2025/04/28/000003 000003 HAFIZ HARIYADI, DIPOSTING OLEH Admin Utama',
          ),
          67 => 
          array (
            'no_jurnal' => 'JR20250428000023',
            'no_bukti' => 'PL20250428001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:50:50',
            'jenis' => 'U',
            'keterangan' => 'PEMASUKAN LAIN-LAIN OLEH Admin Utama',
          ),
          68 => 
          array (
            'no_jurnal' => 'JR20250428000024',
            'no_bukti' => 'PH20250428001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:54:40',
            'jenis' => 'U',
            'keterangan' => 'PENGELUARAN HARIAN, OLEH Admin Utama',
          ),
          69 => 
          array (
            'no_jurnal' => 'JR20250428000025',
            'no_bukti' => 'PD20250428001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:57:11',
            'jenis' => 'U',
            'keterangan' => 'PEMBELIAN BARANG DAPUR KERING & BASAH , OLEH Admin Utama',
          ),
          70 => 
          array (
            'no_jurnal' => 'JR20250428000026',
            'no_bukti' => 'PI20250428001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '09:58:06',
            'jenis' => 'U',
            'keterangan' => 'PEMBELIAN BARANG NON MEDIS DAN PENUNJANG(LAB & RAD) , OLEH Admin Utama',
          ),
          71 => 
          array (
            'no_jurnal' => 'JR20250428000027',
            'no_bukti' => 'PB20250428001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '10:05:15',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI APOTEK, OLEH Admin Utama',
          ),
          72 => 
          array (
            'no_jurnal' => 'JR20250428000028',
            'no_bukti' => '1212',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '10:06:22',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250428001, OLEH Admin Utama',
          ),
          73 => 
          array (
            'no_jurnal' => 'JR20250428000029',
            'no_bukti' => '1212',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '10:07:42',
            'jenis' => 'U',
            'keterangan' => 'BATAL BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250428001, OLEH Admin Utama',
          ),
          74 => 
          array (
            'no_jurnal' => 'JR20250428000030',
            'no_bukti' => '121212',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '10:08:10',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250428001, OLEH Admin Utama',
          ),
          75 => 
          array (
            'no_jurnal' => 'JR20250428000031',
            'no_bukti' => 'PB20250428002',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '10:16:19',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI APOTEK, OLEH Admin Utama',
          ),
          76 => 
          array (
            'no_jurnal' => 'JR20250428000032',
            'no_bukti' => 'PG20250428001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '10:32:14',
            'jenis' => 'U',
            'keterangan' => 'PEMBELIAN DI APOTEK, OLEH Admin Utama',
          ),
          77 => 
          array (
            'no_jurnal' => 'JR20250428000033',
            'no_bukti' => 'JMD20250428001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '10:38:39',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN JASA MEDIS DOKTER D0000004 dr. Hilyatul Nadia, OLEH Admin Utama',
          ),
          78 => 
          array (
            'no_jurnal' => 'JR20250428000034',
            'no_bukti' => 'PJ20250428001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '11:27:18',
            'jenis' => 'U',
            'keterangan' => 'PENJUALAN DI APOTEK, OLEH Admin Utama',
          ),
          79 => 
          array (
            'no_jurnal' => 'JR20250428000035',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '14:07:25',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT INAP PASIEN RIDWAN HALIM (36 Th) DIPOSTING OLEH Admin Utama',
          ),
          80 => 
          array (
            'no_jurnal' => 'JR20250428000036',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-04-28',
            'jam_jurnal' => '14:56:46',
            'jenis' => 'U',
            'keterangan' => 'OPERASI RAWAT INAP PASIEN 000047, RIDWAN HALIM (36 Th) DIPOSTING OLEH Admin Utama',
          ),
          81 => 
          array (
            'no_jurnal' => 'JR20250506000001',
            'no_bukti' => 'JMD20250506001',
            'tgl_jurnal' => '2025-05-06',
            'jam_jurnal' => '09:27:49',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN JASA MEDIS DOKTER D0000004 dr. Hilyatul Nadia, OLEH Admin Utama',
          ),
          82 => 
          array (
            'no_jurnal' => 'JR20250506000002',
            'no_bukti' => 'JMD20250506002',
            'tgl_jurnal' => '2025-05-06',
            'jam_jurnal' => '09:45:16',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN JASA MEDIS DOKTER D0000004 dr. Hilyatul Nadia, OLEH Admin Utama',
          ),
          83 => 
          array (
            'no_jurnal' => 'JR20250506000003',
            'no_bukti' => 'JMD20250506002',
            'tgl_jurnal' => '2025-05-06',
            'jam_jurnal' => '09:46:05',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBAYARAN JASA MEDIS DOKTER D0000004 dr. Hilyatul Nadia, OLEH Admin Utama',
          ),
          84 => 
          array (
            'no_jurnal' => 'JR20250506000004',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-05-06',
            'jam_jurnal' => '19:47:21',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN PASIEN RAWAT INAP 2025/04/25/000001 000047 RIDWAN HALIM, DIPOSTING OLEH Admin Utama',
          ),
          85 => 
          array (
            'no_jurnal' => 'JR20250511000001',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-05-11',
            'jam_jurnal' => '08:15:37',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBAYARAN PASIEN RAWAT INAP 2025/04/25/000001 000047 RIDWAN HALIM, DIBATALKAN OLEH Admin Utama',
          ),
          86 => 
          array (
            'no_jurnal' => 'JR20250511000002',
            'no_bukti' => 'DP202505110001',
            'tgl_jurnal' => '2025-05-11',
            'jam_jurnal' => '08:15:46',
            'jenis' => 'U',
            'keterangan' => 'DEPOSIT PASIEN 2025/04/25/000001 000047 RIDWAN HALIM, OLEH Admin Utama',
          ),
          87 => 
          array (
            'no_jurnal' => 'JR20250511000003',
            'no_bukti' => 'DP202505110001',
            'tgl_jurnal' => '2025-05-11',
            'jam_jurnal' => '08:15:51',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN DEPOSIT PASIEN 2025/04/25/000001 000047 RIDWAN HALIM, OLEH Admin Utama',
          ),
          88 => 
          array (
            'no_jurnal' => 'JR20250513000001',
            'no_bukti' => 'PD250513001',
            'tgl_jurnal' => '2025-05-13',
            'jam_jurnal' => '16:06:24',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG DI APOTEK, OLEH Admin Utama',
          ),
          89 => 
          array (
            'no_jurnal' => 'JR20250514000001',
            'no_bukti' => '2025/04/28/000004',
            'tgl_jurnal' => '2025-05-14',
            'jam_jurnal' => '11:31:27',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBAYARAN PASIEN RAWAT JALAN 2025/04/28/000004 000019 RIZKI AMALIA, DIBATALKAN OLEH Admin Utama',
          ),
          90 => 
          array (
            'no_jurnal' => 'JR20250514000002',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-05-14',
            'jam_jurnal' => '19:30:13',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          91 => 
          array (
            'no_jurnal' => 'JR20250514000003',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-05-14',
            'jam_jurnal' => '19:30:13',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          92 => 
          array (
            'no_jurnal' => 'JR20250514000004',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-05-14',
            'jam_jurnal' => '19:30:26',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          93 => 
          array (
            'no_jurnal' => 'JR20250514000005',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-05-14',
            'jam_jurnal' => '19:30:28',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          94 => 
          array (
            'no_jurnal' => 'JR20250519000001',
            'no_bukti' => 'PJP250519001',
            'tgl_jurnal' => '2025-05-19',
            'jam_jurnal' => '08:46:25',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG JASA PERUSAHAAN PERUSAHAAN MAJU MUNDUR, OLEH Admin Utama',
          ),
          95 => 
          array (
            'no_jurnal' => 'JR20250521000001',
            'no_bukti' => '',
            'tgl_jurnal' => '2025-05-21',
            'jam_jurnal' => '08:13:11',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PIUTANG JASA PERUSAHAAN , OLEH Admin Utama',
          ),
          96 => 
          array (
            'no_jurnal' => 'JR20250521000002',
            'no_bukti' => 'PLL202505210001',
            'tgl_jurnal' => '2025-05-21',
            'jam_jurnal' => '21:09:47',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PERUSAHAAN/LAIN-LAIN, OLEH Admin Utama',
          ),
          97 => 
          array (
            'no_jurnal' => 'JR20250521000003',
            'no_bukti' => 'PLL202505210001',
            'tgl_jurnal' => '2025-05-21',
            'jam_jurnal' => '21:10:05',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG PERUSAHAAN/LAIN-LAIN, OLEH Admin Utama',
          ),
          98 => 
          array (
            'no_jurnal' => 'JR20250522000001',
            'no_bukti' => 'PJP250522001',
            'tgl_jurnal' => '2025-05-22',
            'jam_jurnal' => '07:14:20',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG JASA PERUSAHAAN PERUSAHAAN MAJU MUNDUR, OLEH Admin Utama',
          ),
          99 => 
          array (
            'no_jurnal' => 'JR20250522000002',
            'no_bukti' => '2025/05/22/000001',
            'tgl_jurnal' => '2025-05-22',
            'jam_jurnal' => '11:27:01',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000011 SETIYAWAN KRISTANTO (65 Th), DIPOSTING OLEH Admin Utama',
          ),
          100 => 
          array (
            'no_jurnal' => 'JR20250522000003',
            'no_bukti' => '2025/05/22/000001',
            'tgl_jurnal' => '2025-05-22',
            'jam_jurnal' => '11:27:51',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN TINDAKAN RAWAT JALAN PASIEN 000011 SETIYAWAN KRISTANTO OLEH Admin Utama',
          ),
          101 => 
          array (
            'no_jurnal' => 'JR20250522000004',
            'no_bukti' => '2025/05/22/000001',
            'tgl_jurnal' => '2025-05-22',
            'jam_jurnal' => '11:28:51',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000011 SETIYAWAN KRISTANTO (65 Th), DIPOSTING OLEH Admin Utama',
          ),
          102 => 
          array (
            'no_jurnal' => 'JR20250523000001',
            'no_bukti' => 'PJP250522001',
            'tgl_jurnal' => '2025-05-23',
            'jam_jurnal' => '19:43:00',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG JASA PERUSAHAAN, OLEH Admin Utama',
          ),
          103 => 
          array (
            'no_jurnal' => 'JR20250523000002',
            'no_bukti' => 'PJP250522001',
            'tgl_jurnal' => '2025-05-23',
            'jam_jurnal' => '19:44:19',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG JASA PERUSAHAAN, OLEH Admin Utama',
          ),
          104 => 
          array (
            'no_jurnal' => 'JR20250523000003',
            'no_bukti' => 'PJP250522001',
            'tgl_jurnal' => '2025-05-23',
            'jam_jurnal' => '19:52:09',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG JASA PERUSAHAAN, OLEH Admin Utama',
          ),
          105 => 
          array (
            'no_jurnal' => 'JR20250524000001',
            'no_bukti' => 'PJP250522001',
            'tgl_jurnal' => '2025-05-24',
            'jam_jurnal' => '15:35:14',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG JASA PERUSAHAAN, OLEH Admin Utama',
          ),
          106 => 
          array (
            'no_jurnal' => 'JR20250524000002',
            'no_bukti' => 'PJP250522001',
            'tgl_jurnal' => '2025-05-24',
            'jam_jurnal' => '20:44:34',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG JASA PERUSAHAAN, OLEH Admin Utama',
          ),
          107 => 
          array (
            'no_jurnal' => 'JR20250524000003',
            'no_bukti' => 'PJP250522001',
            'tgl_jurnal' => '2025-05-24',
            'jam_jurnal' => '20:46:43',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG JASA PERUSAHAAN, OLEH Admin Utama',
          ),
          108 => 
          array (
            'no_jurnal' => 'JR20250524000004',
            'no_bukti' => 'PJP250522001',
            'tgl_jurnal' => '2025-05-24',
            'jam_jurnal' => '20:48:34',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG JASA PERUSAHAAN, OLEH Admin Utama',
          ),
          109 => 
          array (
            'no_jurnal' => 'JR20250524000005',
            'no_bukti' => 'PJP250522001',
            'tgl_jurnal' => '2025-05-24',
            'jam_jurnal' => '20:51:30',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG JASA PERUSAHAAN, OLEH Admin Utama',
          ),
          110 => 
          array (
            'no_jurnal' => 'JR20250524000006',
            'no_bukti' => 'PJP250522001',
            'tgl_jurnal' => '2025-05-24',
            'jam_jurnal' => '20:51:46',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG JASA PERUSAHAAN, OLEH Admin Utama',
          ),
          111 => 
          array (
            'no_jurnal' => 'JR20250526000001',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '10:21:03',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000022 RUDI SANTOSO (68 Th), DIPOSTING OLEH Admin Utama',
          ),
          112 => 
          array (
            'no_jurnal' => 'JR20250526000002',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '10:28:59',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/05/26/000001 DIPOSTING OLEH Admin Utama',
          ),
          113 => 
          array (
            'no_jurnal' => 'JR20250526000003',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '10:36:44',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          114 => 
          array (
            'no_jurnal' => 'JR20250526000004',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '10:44:31',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          115 => 
          array (
            'no_jurnal' => 'JR20250526000005',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '10:51:36',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT JALAN PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          116 => 
          array (
            'no_jurnal' => 'JR20250526000006',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '10:53:43',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN PASIEN RAWAT JALAN 2025/05/26/000001 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          117 => 
          array (
            'no_jurnal' => 'JR20250526000007',
            'no_bukti' => '2025/05/26/000002',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '11:20:41',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/05/26/000002 DIPOSTING OLEH Admin Utama',
          ),
          118 => 
          array (
            'no_jurnal' => 'JR20250526000008',
            'no_bukti' => '2025/05/26/000002',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '11:21:03',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN PASIEN RAWAT JALAN 2025/05/26/000002 000006 SAKHA HAMIZAN AQILA, DIPOSTING OLEH Admin Utama',
          ),
          119 => 
          array (
            'no_jurnal' => 'JR20250526000009',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '11:22:34',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBAYARAN PASIEN RAWAT JALAN 2025/05/26/000001 000022 RUDI SANTOSO, DIBATALKAN OLEH Admin Utama',
          ),
          120 => 
          array (
            'no_jurnal' => 'JR20250526000010',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '11:22:48',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT JALAN 2025/05/26/000001 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          121 => 
          array (
            'no_jurnal' => 'JR20250526000011',
            'no_bukti' => '2025/05/26/000002',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '11:23:01',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBAYARAN PASIEN RAWAT JALAN 2025/05/26/000002 000006 SAKHA HAMIZAN AQILA, DIBATALKAN OLEH Admin Utama',
          ),
          122 => 
          array (
            'no_jurnal' => 'JR20250526000012',
            'no_bukti' => '2025/05/26/000002',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '11:23:12',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT JALAN 2025/05/26/000002 000006 SAKHA HAMIZAN AQILA, DIPOSTING OLEH Admin Utama',
          ),
          123 => 
          array (
            'no_jurnal' => 'JR20250526000013',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '11:27:01',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          124 => 
          array (
            'no_jurnal' => 'JR20250526000014',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '11:27:01',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          125 => 
          array (
            'no_jurnal' => 'JR20250526000015',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '11:27:01',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          126 => 
          array (
            'no_jurnal' => 'JR20250526000016',
            'no_bukti' => '2025/05/26/000002',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '11:27:01',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          127 => 
          array (
            'no_jurnal' => 'JR20250526000017',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '11:38:26',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG DI APOTEK, OLEH Admin Utama',
          ),
          128 => 
          array (
            'no_jurnal' => 'JR20250526000018',
            'no_bukti' => '2025/05/26/000003',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '11:51:21',
            'jenis' => 'U',
            'keterangan' => 'OPERASI RAWAT JALAN PASIEN ROBY ALAMSYAH DIPOSTING OLEH Admin Utama',
          ),
          129 => 
          array (
            'no_jurnal' => 'JR20250526000019',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '14:08:16',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN PASIEN RAWAT INAP 2025/04/25/000001 000047 RIDWAN HALIM, DIPOSTING OLEH Admin Utama',
          ),
          130 => 
          array (
            'no_jurnal' => 'JR20250526000020',
            'no_bukti' => '2025/05/26/000003',
            'tgl_jurnal' => '2025-05-26',
            'jam_jurnal' => '15:51:22',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN ROBY ALAMSYAH DIPOSTING OLEH Admin Utama',
          ),
          131 => 
          array (
            'no_jurnal' => 'JR20250528000001',
            'no_bukti' => 'BRWH0011428052025000001',
            'tgl_jurnal' => '2025-05-28',
            'jam_jurnal' => '12:25:53',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250428002, OLEH Admin Utama',
          ),
          132 => 
          array (
            'no_jurnal' => 'JR20250528000002',
            'no_bukti' => 'BRWH0011428052025000002',
            'tgl_jurnal' => '2025-05-28',
            'jam_jurnal' => '12:26:44',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20241218002, OLEH Admin Utama',
          ),
          133 => 
          array (
            'no_jurnal' => 'JR20250603000001',
            'no_bukti' => '2025/06/03/000002',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '08:44:10',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000013 PARAMITA RAMADANI (35 Th), DIPOSTING OLEH Admin Utama',
          ),
          134 => 
          array (
            'no_jurnal' => 'JR20250603000002',
            'no_bukti' => '2025/06/03/000002',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '08:46:52',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000013 PARAMITA RAMADANI (35 Th), DIPOSTING OLEH Admin Utama',
          ),
          135 => 
          array (
            'no_jurnal' => 'JR20250603000003',
            'no_bukti' => '2025/06/03/000002',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '08:47:51',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN TINDAKAN RAWAT JALAN PASIEN 000013 PARAMITA RAMADANI OLEH Admin Utama',
          ),
          136 => 
          array (
            'no_jurnal' => 'JR20250603000004',
            'no_bukti' => '2025/06/03/000002',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '08:51:01',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000013 PARAMITA RAMADANI, DIPOSTING OLEH Admin Utama',
          ),
          137 => 
          array (
            'no_jurnal' => 'JR20250603000005',
            'no_bukti' => '2025/06/03/000002',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '08:54:10',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN PARAMITA RAMADANI DIPOSTING OLEH Admin Utama',
          ),
          138 => 
          array (
            'no_jurnal' => 'JR20250603000006',
            'no_bukti' => '2025/06/03/000002',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '08:55:16',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT JALAN PASIEN PARAMITA RAMADANI DIPOSTING OLEH Admin Utama',
          ),
          139 => 
          array (
            'no_jurnal' => 'JR20250603000007',
            'no_bukti' => '2025/06/03/000002',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '08:56:27',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN PASIEN RAWAT JALAN 2025/06/03/000002 000013 PARAMITA RAMADANI, DIPOSTING OLEH Admin Utama',
          ),
          140 => 
          array (
            'no_jurnal' => 'JR20250603000008',
            'no_bukti' => '2025/06/03/000002',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '08:57:21',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBAYARAN PASIEN RAWAT JALAN 2025/06/03/000002 000013 PARAMITA RAMADANI, DIBATALKAN OLEH Admin Utama',
          ),
          141 => 
          array (
            'no_jurnal' => 'JR20250603000009',
            'no_bukti' => '2025/06/03/000002',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '08:58:20',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN PASIEN RAWAT JALAN 2025/06/03/000002 000013 PARAMITA RAMADANI, DIPOSTING OLEH Admin Utama',
          ),
          142 => 
          array (
            'no_jurnal' => 'JR20250603000010',
            'no_bukti' => 'PL20250603001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:01:35',
            'jenis' => 'U',
            'keterangan' => 'PEMASUKAN LAIN-LAIN OLEH Admin Utama',
          ),
          143 => 
          array (
            'no_jurnal' => 'JR20250603000011',
            'no_bukti' => 'PJ20250603001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:03:45',
            'jenis' => 'U',
            'keterangan' => 'PENJUALAN DI APOTEK, OLEH Admin Utama',
          ),
          144 => 
          array (
            'no_jurnal' => 'JR20250603000012',
            'no_bukti' => '2025/06/03/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:05:17',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000006 SAKHA HAMIZAN AQILA (7 Th), DIPOSTING OLEH Admin Utama',
          ),
          145 => 
          array (
            'no_jurnal' => 'JR20250603000013',
            'no_bukti' => '2025/06/03/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:05:35',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000006 SAKHA HAMIZAN AQILA (7 Th), DIPOSTING OLEH Admin Utama',
          ),
          146 => 
          array (
            'no_jurnal' => 'JR20250603000014',
            'no_bukti' => '2025/06/03/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:05:58',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT JALAN 2025/06/03/000001 000006 SAKHA HAMIZAN AQILA, DIPOSTING OLEH Admin Utama',
          ),
          147 => 
          array (
            'no_jurnal' => 'JR20250603000015',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:20:21',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          148 => 
          array (
            'no_jurnal' => 'JR20250603000016',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:20:23',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          149 => 
          array (
            'no_jurnal' => 'JR20250603000017',
            'no_bukti' => '2025/05/26/000002',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:20:25',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          150 => 
          array (
            'no_jurnal' => 'JR20250603000018',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:20:27',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          151 => 
          array (
            'no_jurnal' => 'JR20250603000019',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:20:29',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          152 => 
          array (
            'no_jurnal' => 'JR20250603000020',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:24:35',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          153 => 
          array (
            'no_jurnal' => 'JR20250603000021',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:24:35',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          154 => 
          array (
            'no_jurnal' => 'JR20250603000022',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:24:35',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          155 => 
          array (
            'no_jurnal' => 'JR20250603000023',
            'no_bukti' => '2025/06/03/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:24:35',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          156 => 
          array (
            'no_jurnal' => 'JR20250603000024',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:25:54',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          157 => 
          array (
            'no_jurnal' => 'JR20250603000025',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:25:56',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          158 => 
          array (
            'no_jurnal' => 'JR20250603000026',
            'no_bukti' => '2025/06/03/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:25:59',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          159 => 
          array (
            'no_jurnal' => 'JR20250603000027',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:26:02',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          160 => 
          array (
            'no_jurnal' => 'JR20250603000028',
            'no_bukti' => '2025/06/03/000003',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:34:36',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/06/03/000003 DIPOSTING OLEH Admin Utama',
          ),
          161 => 
          array (
            'no_jurnal' => 'JR20250603000029',
            'no_bukti' => '2025/06/03/000003',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:44:38',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT JALAN 2025/06/03/000003 000003 HAFIZ HARIYADI, DIPOSTING OLEH Admin Utama',
          ),
          162 => 
          array (
            'no_jurnal' => 'JR20250603000030',
            'no_bukti' => 'PL20250603002',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:49:26',
            'jenis' => 'U',
            'keterangan' => 'PEMASUKAN LAIN-LAIN OLEH Admin Utama',
          ),
          163 => 
          array (
            'no_jurnal' => 'JR20250603000031',
            'no_bukti' => '2025/06/03/000003',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '09:54:42',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          164 => 
          array (
            'no_jurnal' => 'JR20250603000032',
            'no_bukti' => 'PB20250603001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '10:08:38',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI APOTEK, OLEH Admin Utama',
          ),
          165 => 
          array (
            'no_jurnal' => 'JR20250603000033',
            'no_bukti' => 'PB20250603002',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '10:08:59',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI APOTEK, OLEH Admin Utama',
          ),
          166 => 
          array (
            'no_jurnal' => 'JR20250603000034',
            'no_bukti' => '2121221',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '10:14:38',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250603001, OLEH Admin Utama',
          ),
          167 => 
          array (
            'no_jurnal' => 'JR20250603000035',
            'no_bukti' => '2121221',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '10:14:38',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250603002, OLEH Admin Utama',
          ),
          168 => 
          array (
            'no_jurnal' => 'JR20250603000036',
            'no_bukti' => 'PAI20250603001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '10:19:05',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG ASET/INVENTARIS, OLEH Admin Utama',
          ),
          169 => 
          array (
            'no_jurnal' => 'JR20250603000037',
            'no_bukti' => '1212',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '10:19:36',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG BARANG ASET/INVENTARIS NO.FAKTUR PAI20250603001, OLEH Admin Utama',
          ),
          170 => 
          array (
            'no_jurnal' => 'JR20250603000038',
            'no_bukti' => 'PH20250603001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '10:21:58',
            'jenis' => 'U',
            'keterangan' => 'PENGELUARAN HARIAN, OLEH Admin Utama',
          ),
          171 => 
          array (
            'no_jurnal' => 'JR20250603000039',
            'no_bukti' => 'PK20250603001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '10:24:41',
            'jenis' => 'U',
            'keterangan' => 'PENGELUARAN HARIAN, OLEH Admin Utama',
          ),
          172 => 
          array (
            'no_jurnal' => 'JR20250603000040',
            'no_bukti' => 'PB20250603003',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '10:28:43',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI APOTEK, OLEH Admin Utama',
          ),
          173 => 
          array (
            'no_jurnal' => 'JR20250603000041',
            'no_bukti' => 'JMD20250603001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '10:46:23',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN JASA MEDIS DOKTER D0000004 dr. Hilyatul Nadia, OLEH Admin Utama',
          ),
          174 => 
          array (
            'no_jurnal' => 'JR20250603000042',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '10:51:01',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          175 => 
          array (
            'no_jurnal' => 'JR20250603000043',
            'no_bukti' => 'PD250603001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '10:55:08',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG DI APOTEK, OLEH Admin Utama',
          ),
          176 => 
          array (
            'no_jurnal' => 'JR20250603000044',
            'no_bukti' => '2025/06/03/000003',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '11:03:04',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PIUTANG PASIEN RAWAT JALAN 2025/06/03/000003 000003 HAFIZ HARIYADI, DIBATALKAN OLEH Admin Utama',
          ),
          177 => 
          array (
            'no_jurnal' => 'JR20250603000045',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '14:44:53',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBAYARAN PASIEN RAWAT INAP 2025/04/25/000001 000047 RIDWAN HALIM, DIBATALKAN OLEH Admin Utama',
          ),
          178 => 
          array (
            'no_jurnal' => 'JR20250603000046',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '14:45:14',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT INAP PASIEN RIDWAN HALIM (36 Th) DIPOSTING OLEH Admin Utama',
          ),
          179 => 
          array (
            'no_jurnal' => 'JR20250603000047',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '14:46:01',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT INAP PASIEN RIDWAN HALIM (36 Th) DIPOSTING OLEH Admin Utama',
          ),
          180 => 
          array (
            'no_jurnal' => 'JR20250603000048',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-06-03',
            'jam_jurnal' => '14:47:06',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN PASIEN RAWAT INAP 2025/04/25/000001 000047 RIDWAN HALIM, DIPOSTING OLEH Admin Utama',
          ),
          181 => 
          array (
            'no_jurnal' => 'JR20250604000001',
            'no_bukti' => '2025/06/04/000001',
            'tgl_jurnal' => '2025-06-04',
            'jam_jurnal' => '20:37:27',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000009 WAHYUDI KURNIAWAN (35 Th), DIPOSTING OLEH Admin Utama',
          ),
          182 => 
          array (
            'no_jurnal' => 'JR20250604000002',
            'no_bukti' => '2025/06/04/000001',
            'tgl_jurnal' => '2025-06-04',
            'jam_jurnal' => '20:37:38',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000009 WAHYUDI KURNIAWAN (35 Th), DIPOSTING OLEH Admin Utama',
          ),
          183 => 
          array (
            'no_jurnal' => 'JR20250604000003',
            'no_bukti' => '2025/06/04/000001',
            'tgl_jurnal' => '2025-06-04',
            'jam_jurnal' => '20:38:12',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000009 WAHYUDI KURNIAWAN, DIPOSTING OLEH Admin Utama',
          ),
          184 => 
          array (
            'no_jurnal' => 'JR20250604000004',
            'no_bukti' => 'PB20250604001',
            'tgl_jurnal' => '2025-06-04',
            'jam_jurnal' => '20:43:40',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI APOTEK, OLEH Admin Utama',
          ),
          185 => 
          array (
            'no_jurnal' => 'JR20250608000001',
            'no_bukti' => 'PLL202505210001',
            'tgl_jurnal' => '2025-06-08',
            'jam_jurnal' => '18:58:29',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG JASA PERUSAHAAN, OLEH Admin Utama',
          ),
          186 => 
          array (
            'no_jurnal' => 'JR20250608000002',
            'no_bukti' => 'PLL202505210001',
            'tgl_jurnal' => '2025-06-08',
            'jam_jurnal' => '19:00:01',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG PERUSAHAAN/LAIN-LAIN, OLEH Admin Utama',
          ),
          187 => 
          array (
            'no_jurnal' => 'JR20250611000001',
            'no_bukti' => '2025/06/11/000001',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '19:12:01',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000006 SAKHA HAMIZAN AQILA (7 Th), DIPOSTING OLEH Admin Utama',
          ),
          188 => 
          array (
            'no_jurnal' => 'JR20250611000002',
            'no_bukti' => '2025/06/11/000001',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '19:12:41',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000006 SAKHA HAMIZAN AQILA (7 Th), DIPOSTING OLEH Admin Utama',
          ),
          189 => 
          array (
            'no_jurnal' => 'JR20250611000003',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '19:20:02',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBAYARAN PASIEN RAWAT INAP 2025/04/25/000001 000047 RIDWAN HALIM, DIBATALKAN OLEH Admin Utama',
          ),
          190 => 
          array (
            'no_jurnal' => 'JR20250611000004',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '19:20:32',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT INAP PASIEN RIDWAN HALIM DIPOSTING OLEH Admin Utama',
          ),
          191 => 
          array (
            'no_jurnal' => 'JR20250611000005',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '19:23:46',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT INAP 2025/04/25/000001 000047 RIDWAN HALIM, DIPOSTING OLEH Admin Utama',
          ),
          192 => 
          array (
            'no_jurnal' => 'JR20250611000006',
            'no_bukti' => '2025/06/11/000001',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '19:33:08',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/06/11/000001 DIPOSTING OLEH Admin Utama',
          ),
          193 => 
          array (
            'no_jurnal' => 'JR20250611000007',
            'no_bukti' => '2025/06/11/000001',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '19:33:47',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000006 SAKHA HAMIZAN AQILA, DIPOSTING OLEH Admin Utama',
          ),
          194 => 
          array (
            'no_jurnal' => 'JR20250611000008',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '20:02:33',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          195 => 
          array (
            'no_jurnal' => 'JR20250611000009',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '20:02:33',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          196 => 
          array (
            'no_jurnal' => 'JR20250611000010',
            'no_bukti' => '2025/05/26/000002',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '20:02:33',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          197 => 
          array (
            'no_jurnal' => 'JR20250611000011',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '20:02:33',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          198 => 
          array (
            'no_jurnal' => 'JR20250611000012',
            'no_bukti' => '2025/06/03/000001',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '20:02:33',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          199 => 
          array (
            'no_jurnal' => 'JR20250611000013',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '20:02:33',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          200 => 
          array (
            'no_jurnal' => 'JR20250611000014',
            'no_bukti' => 'PB20250611001',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '20:12:43',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI APOTEK, OLEH Admin Utama',
          ),
          201 => 
          array (
            'no_jurnal' => 'JR20250611000015',
            'no_bukti' => '121212',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '20:17:46',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250611001, OLEH Admin Utama',
          ),
          202 => 
          array (
            'no_jurnal' => 'JR20250611000016',
            'no_bukti' => '121212',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '20:24:49',
            'jenis' => 'U',
            'keterangan' => 'BATAL BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250611001, OLEH Admin Utama',
          ),
          203 => 
          array (
            'no_jurnal' => 'JR20250611000017',
            'no_bukti' => '2025/06/03/000003',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '20:26:33',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          204 => 
          array (
            'no_jurnal' => 'JR20250611000018',
            'no_bukti' => '2025/05/26/000002',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '20:26:36',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          205 => 
          array (
            'no_jurnal' => 'JR20250611000019',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '20:26:38',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          206 => 
          array (
            'no_jurnal' => 'JR20250611000020',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-06-11',
            'jam_jurnal' => '20:26:40',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          207 => 
          array (
            'no_jurnal' => 'JR20250618000001',
            'no_bukti' => 'SKM20250618001',
            'tgl_jurnal' => '2025-06-18',
            'jam_jurnal' => '07:42:31',
            'jenis' => 'U',
            'keterangan' => 'STOK KELUAR BARANG MEDIS/OBAT/ALKES/BHP, OLEH Admin Utama',
          ),
          208 => 
          array (
            'no_jurnal' => 'JR20250618000002',
            'no_bukti' => 'SKNM250618001',
            'tgl_jurnal' => '2025-06-18',
            'jam_jurnal' => '07:42:56',
            'jenis' => 'U',
            'keterangan' => 'PENGGUNAAN BARANG NON MEDIS DAN PENUNJANG (LAB & RAD), OLEH Admin Utama',
          ),
          209 => 
          array (
            'no_jurnal' => 'JR20250618000003',
            'no_bukti' => 'PB20250618001',
            'tgl_jurnal' => '2025-06-18',
            'jam_jurnal' => '10:54:26',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI GUDANG, OLEH Admin Utama',
          ),
          210 => 
          array (
            'no_jurnal' => 'JR20250618000004',
            'no_bukti' => '09',
            'tgl_jurnal' => '2025-06-18',
            'jam_jurnal' => '10:57:19',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250618001, OLEH Admin Utama',
          ),
          211 => 
          array (
            'no_jurnal' => 'JR20250618000005',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-06-18',
            'jam_jurnal' => '11:03:40',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PIUTANG PASIEN RAWAT INAP 2025/04/25/000001 000047 RIDWAN HALIM, DIBATALKAN OLEH Admin Utama',
          ),
          212 => 
          array (
            'no_jurnal' => 'JR20250618000006',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-06-18',
            'jam_jurnal' => '11:04:45',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT INAP PASIEN 2025/04/25/000001 000047 RIDWAN HALIM, DIPOSTING OLEH Admin Utama',
          ),
          213 => 
          array (
            'no_jurnal' => 'JR20250618000007',
            'no_bukti' => 'PB20250618002',
            'tgl_jurnal' => '2025-06-18',
            'jam_jurnal' => '11:17:46',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI GUDANG, OLEH Admin Utama',
          ),
          214 => 
          array (
            'no_jurnal' => 'JR20250618000008',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-06-18',
            'jam_jurnal' => '11:23:03',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT INAP PASIEN RIDWAN HALIM (36 Th) DIPOSTING OLEH Admin Utama',
          ),
          215 => 
          array (
            'no_jurnal' => 'JR20250618000009',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-06-18',
            'jam_jurnal' => '11:23:32',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT INAP PASIEN RIDWAN HALIM (36 Th) DIPOSTING OLEH Admin Utama',
          ),
          216 => 
          array (
            'no_jurnal' => 'JR20250618000010',
            'no_bukti' => '2025/04/25/000001',
            'tgl_jurnal' => '2025-06-18',
            'jam_jurnal' => '11:24:08',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN TINDAKAN RAWAT INAP PASIEN 000047 RIDWAN HALIM OLEH Admin Utama',
          ),
          217 => 
          array (
            'no_jurnal' => 'JR20250618000011',
            'no_bukti' => '2025/06/18/000002',
            'tgl_jurnal' => '2025-06-18',
            'jam_jurnal' => '12:58:48',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000006 SAKHA HAMIZAN AQILA (7 Th), DIPOSTING OLEH Admin Utama',
          ),
          218 => 
          array (
            'no_jurnal' => 'JR20250618000012',
            'no_bukti' => '2025/06/18/000001',
            'tgl_jurnal' => '2025-06-18',
            'jam_jurnal' => '13:20:09',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000003 HAFIZ HARIYADI (35 Th), DIPOSTING OLEH Admin Utama',
          ),
          219 => 
          array (
            'no_jurnal' => 'JR20250618000013',
            'no_bukti' => '2025/06/18/000001',
            'tgl_jurnal' => '2025-06-18',
            'jam_jurnal' => '13:56:24',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT INAP PASIEN, DIPOSTING OLEH Admin Utama',
          ),
          220 => 
          array (
            'no_jurnal' => 'JR20250619000001',
            'no_bukti' => '2025/06/19/000001',
            'tgl_jurnal' => '2025-06-19',
            'jam_jurnal' => '09:53:27',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN SAKHA HAMIZAN AQILA DIPOSTING OLEH Admin Utama',
          ),
          221 => 
          array (
            'no_jurnal' => 'JR20250619000002',
            'no_bukti' => '2025/06/PD00001',
            'tgl_jurnal' => '2025-06-19',
            'jam_jurnal' => '10:04:16',
            'jenis' => 'U',
            'keterangan' => 'PENJUALAN DARAH DI UTD, OLEH Admin Utama',
          ),
          222 => 
          array (
            'no_jurnal' => 'JR20250619000003',
            'no_bukti' => '2025/06/19/000001',
            'tgl_jurnal' => '2025-06-19',
            'jam_jurnal' => '10:10:01',
            'jenis' => 'U',
            'keterangan' => 'OPERASI RAWAT JALAN PASIEN SAKHA HAMIZAN AQILA DIPOSTING OLEH Admin Utama',
          ),
          223 => 
          array (
            'no_jurnal' => 'JR20250619000004',
            'no_bukti' => '2025/06/18/000001',
            'tgl_jurnal' => '2025-06-19',
            'jam_jurnal' => '10:24:50',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT INAP PASIEN HAFIZ HARIYADI DIPOSTING OLEH Admin Utama',
          ),
          224 => 
          array (
            'no_jurnal' => 'JR20250619000005',
            'no_bukti' => 'SKNM250619001',
            'tgl_jurnal' => '2025-06-19',
            'jam_jurnal' => '13:06:14',
            'jenis' => 'U',
            'keterangan' => 'PENGGUNAAN BARANG NON MEDIS DAN PENUNJANG (LAB & RAD), OLEH Admin Utama',
          ),
          225 => 
          array (
            'no_jurnal' => 'JR20250619000006',
            'no_bukti' => 'PNM20250619001',
            'tgl_jurnal' => '2025-06-19',
            'jam_jurnal' => '13:10:30',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG NON MEDIS/PENUNJANG, OLEH Admin Utama',
          ),
          226 => 
          array (
            'no_jurnal' => 'JR20250619000007',
            'no_bukti' => 'PNM20250619002',
            'tgl_jurnal' => '2025-06-19',
            'jam_jurnal' => '13:11:13',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG NON MEDIS/PENUNJANG, OLEH Admin Utama',
          ),
          227 => 
          array (
            'no_jurnal' => 'JR20250620000001',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:12:11',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          228 => 
          array (
            'no_jurnal' => 'JR20250620000002',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:12:13',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          229 => 
          array (
            'no_jurnal' => 'JR20250620000003',
            'no_bukti' => '2025/06/03/000001',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:12:15',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          230 => 
          array (
            'no_jurnal' => 'JR20250620000004',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:12:17',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          231 => 
          array (
            'no_jurnal' => 'JR20250620000005',
            'no_bukti' => '2025/06/20/000001',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:13:50',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/06/20/000001 DIPOSTING OLEH Admin Utama',
          ),
          232 => 
          array (
            'no_jurnal' => 'JR20250620000006',
            'no_bukti' => '2025/06/20/000001',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:14:20',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT JALAN 2025/06/20/000001 000048 LIYA RAHMA, DIPOSTING OLEH Admin Utama',
          ),
          233 => 
          array (
            'no_jurnal' => 'JR20250620000007',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:19:39',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          234 => 
          array (
            'no_jurnal' => 'JR20250620000008',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:19:39',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          235 => 
          array (
            'no_jurnal' => 'JR20250620000009',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:19:39',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          236 => 
          array (
            'no_jurnal' => 'JR20250620000010',
            'no_bukti' => '2025/05/26/000002',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:19:39',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          237 => 
          array (
            'no_jurnal' => 'JR20250620000011',
            'no_bukti' => '2025/06/03/000001',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:19:39',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          238 => 
          array (
            'no_jurnal' => 'JR20250620000012',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:19:59',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          239 => 
          array (
            'no_jurnal' => 'JR20250620000013',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:20:01',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          240 => 
          array (
            'no_jurnal' => 'JR20250620000014',
            'no_bukti' => '2025/06/03/000001',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:20:04',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          241 => 
          array (
            'no_jurnal' => 'JR20250620000015',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:20:06',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          242 => 
          array (
            'no_jurnal' => 'JR20250620000016',
            'no_bukti' => '2025/05/26/000002',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:20:09',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          243 => 
          array (
            'no_jurnal' => 'JR20250620000017',
            'no_bukti' => '2025/04/27/000001',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:25:09',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT JALAN 2025/04/27/000001 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          244 => 
          array (
            'no_jurnal' => 'JR20250620000018',
            'no_bukti' => '2025/06/20/000002',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '09:55:49',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/06/20/000002 DIPOSTING OLEH Admin Utama',
          ),
          245 => 
          array (
            'no_jurnal' => 'JR20250620000019',
            'no_bukti' => 'PL20250620001',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '10:19:58',
            'jenis' => 'U',
            'keterangan' => 'PEMASUKAN LAIN-LAIN OLEH Admin Utama',
          ),
          246 => 
          array (
            'no_jurnal' => 'JR20250620000020',
            'no_bukti' => 'PH20250620001',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '10:21:23',
            'jenis' => 'U',
            'keterangan' => 'PENGELUARAN HARIAN, OLEH Admin Utama',
          ),
          247 => 
          array (
            'no_jurnal' => 'JR20250620000021',
            'no_bukti' => '0990',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '10:24:22',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250618002, OLEH Admin Utama',
          ),
          248 => 
          array (
            'no_jurnal' => 'JR20250620000022',
            'no_bukti' => '0990',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '10:25:44',
            'jenis' => 'U',
            'keterangan' => 'BATAL BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250618002, OLEH Admin Utama',
          ),
          249 => 
          array (
            'no_jurnal' => 'JR20250620000023',
            'no_bukti' => '2025/06/20/000002',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '14:01:56',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/06/20/000002 DIPOSTING OLEH Admin Utama',
          ),
          250 => 
          array (
            'no_jurnal' => 'JR20250620000024',
            'no_bukti' => '2025/06/20/000002',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '14:03:02',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          251 => 
          array (
            'no_jurnal' => 'JR20250620000025',
            'no_bukti' => '2025/06/20/000002',
            'tgl_jurnal' => '2025-06-20',
            'jam_jurnal' => '14:22:08',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          252 => 
          array (
            'no_jurnal' => 'JR20250623000001',
            'no_bukti' => '2025/06/23/000001',
            'tgl_jurnal' => '2025-06-23',
            'jam_jurnal' => '10:57:41',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/06/23/000001 DIPOSTING OLEH Admin Utama',
          ),
          253 => 
          array (
            'no_jurnal' => 'JR20250623000002',
            'no_bukti' => '2025/06/20/000002',
            'tgl_jurnal' => '2025-06-23',
            'jam_jurnal' => '13:52:32',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT INAP PASIEN, DIPOSTING OLEH Admin Utama',
          ),
          254 => 
          array (
            'no_jurnal' => 'JR20250623000003',
            'no_bukti' => '2025/06/23/000001',
            'tgl_jurnal' => '2025-06-23',
            'jam_jurnal' => '13:57:21',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000006 SAKHA HAMIZAN AQILA, DIPOSTING OLEH Admin Utama',
          ),
          255 => 
          array (
            'no_jurnal' => 'JR20250623000004',
            'no_bukti' => '2025/06/23/000001',
            'tgl_jurnal' => '2025-06-23',
            'jam_jurnal' => '13:57:53',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBERIAN OBAT RAWAT JALAN PASIEN 000006 SAKHA HAMIZAN AQILA OLEH Admin Utama',
          ),
          256 => 
          array (
            'no_jurnal' => 'JR20250625000001',
            'no_bukti' => '2025/06/25/000001',
            'tgl_jurnal' => '2025-06-25',
            'jam_jurnal' => '09:02:00',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN SETIYAWAN KRISTANTO DIPOSTING OLEH Admin Utama',
          ),
          257 => 
          array (
            'no_jurnal' => 'JR20250625000002',
            'no_bukti' => '2025/06/25/000001',
            'tgl_jurnal' => '2025-06-25',
            'jam_jurnal' => '09:02:19',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT JALAN PASIEN SETIYAWAN KRISTANTO DIPOSTING OLEH Admin Utama',
          ),
          258 => 
          array (
            'no_jurnal' => 'JR20250625000003',
            'no_bukti' => '2025/06/25/000001',
            'tgl_jurnal' => '2025-06-25',
            'jam_jurnal' => '09:03:22',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000011 SETIYAWAN KRISTANTO (65 Th), DIPOSTING OLEH Admin Utama',
          ),
          259 => 
          array (
            'no_jurnal' => 'JR20250625000004',
            'no_bukti' => '2025/06/25/000001',
            'tgl_jurnal' => '2025-06-25',
            'jam_jurnal' => '09:03:41',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT JALAN 2025/06/25/000001 000011 SETIYAWAN KRISTANTO, DIPOSTING OLEH Admin Utama',
          ),
          260 => 
          array (
            'no_jurnal' => 'JR20250628000001',
            'no_bukti' => '2025/06/28/000001',
            'tgl_jurnal' => '2025-06-28',
            'jam_jurnal' => '09:41:14',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT INAP PASIEN GATOT SATRIYO (35 Th) DIPOSTING OLEH Admin Utama',
          ),
          261 => 
          array (
            'no_jurnal' => 'JR20250628000002',
            'no_bukti' => '2025/06/28/000001',
            'tgl_jurnal' => '2025-06-28',
            'jam_jurnal' => '10:01:26',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT INAP PASIEN GATOT SATRIYO (35 Th) DIPOSTING OLEH Admin Utama',
          ),
          262 => 
          array (
            'no_jurnal' => 'JR20250628000003',
            'no_bukti' => '2025/06/28/000001',
            'tgl_jurnal' => '2025-06-28',
            'jam_jurnal' => '10:07:01',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT INAP PASIEN 2025/06/28/000001 000010 GATOT SATRIYO, DIPOSTING OLEH Admin Utama',
          ),
          263 => 
          array (
            'no_jurnal' => 'JR20250628000004',
            'no_bukti' => '2025/06/28/000001',
            'tgl_jurnal' => '2025-06-28',
            'jam_jurnal' => '10:10:57',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT INAP PASIEN GATOT SATRIYO DIPOSTING OLEH Admin Utama',
          ),
          264 => 
          array (
            'no_jurnal' => 'JR20250628000005',
            'no_bukti' => '2025/06/28/000001',
            'tgl_jurnal' => '2025-06-28',
            'jam_jurnal' => '10:19:26',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT INAP 2025/06/28/000001 000010 GATOT SATRIYO, DIPOSTING OLEH Admin Utama',
          ),
          265 => 
          array (
            'no_jurnal' => 'JR20250628000006',
            'no_bukti' => 'PB20250628001',
            'tgl_jurnal' => '2025-06-28',
            'jam_jurnal' => '10:40:52',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI APOTEK, OLEH Admin Utama',
          ),
          266 => 
          array (
            'no_jurnal' => 'JR20250628000007',
            'no_bukti' => '12',
            'tgl_jurnal' => '2025-06-28',
            'jam_jurnal' => '10:41:46',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250628001, OLEH Admin Utama',
          ),
          267 => 
          array (
            'no_jurnal' => 'JR20250628000008',
            'no_bukti' => '12',
            'tgl_jurnal' => '2025-06-28',
            'jam_jurnal' => '10:42:00',
            'jenis' => 'U',
            'keterangan' => 'BATAL BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250628001, OLEH Admin Utama',
          ),
          268 => 
          array (
            'no_jurnal' => 'JR20250628000009',
            'no_bukti' => 'SKM20250628001',
            'tgl_jurnal' => '2025-06-28',
            'jam_jurnal' => '10:49:10',
            'jenis' => 'U',
            'keterangan' => 'STOK KELUAR BARANG MEDIS/OBAT/ALKES/BHP, OLEH Admin Utama',
          ),
          269 => 
          array (
            'no_jurnal' => 'JR20250628000010',
            'no_bukti' => '2025/06/25/000001',
            'tgl_jurnal' => '2025-06-28',
            'jam_jurnal' => '11:11:14',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/06/25/000001 DIPOSTING OLEH Admin Utama',
          ),
          270 => 
          array (
            'no_jurnal' => 'JR20250630000001',
            'no_bukti' => '2025/06/30/000003',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '08:55:37',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000022 RUDI SANTOSO (68 Th), DIPOSTING OLEH Admin Utama',
          ),
          271 => 
          array (
            'no_jurnal' => 'JR20250630000002',
            'no_bukti' => '2025/06/30/000003',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '09:17:52',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          272 => 
          array (
            'no_jurnal' => 'JR20250630000003',
            'no_bukti' => '2025/06/30/000003',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '09:44:15',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          273 => 
          array (
            'no_jurnal' => 'JR20250630000004',
            'no_bukti' => '2025/06/30/000003',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '09:51:37',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          274 => 
          array (
            'no_jurnal' => 'JR20250630000005',
            'no_bukti' => '2025/06/30/000003',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '09:56:57',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT JALAN PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          275 => 
          array (
            'no_jurnal' => 'JR20250630000006',
            'no_bukti' => '2025/06/30/000003',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '10:05:38',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN PASIEN RAWAT JALAN 2025/06/30/000003 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          276 => 
          array (
            'no_jurnal' => 'JR20250630000007',
            'no_bukti' => 'SKM20250630001',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '13:17:47',
            'jenis' => 'U',
            'keterangan' => 'STOK KELUAR BARANG MEDIS/OBAT/ALKES/BHP, OLEH Admin Utama',
          ),
          277 => 
          array (
            'no_jurnal' => 'JR20250630000008',
            'no_bukti' => 'SKM20250630002',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '13:19:29',
            'jenis' => 'U',
            'keterangan' => 'STOK KELUAR BARANG MEDIS/OBAT/ALKES/BHP, OLEH Admin Utama',
          ),
          278 => 
          array (
            'no_jurnal' => 'JR20250630000009',
            'no_bukti' => 'SKNM250630001',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '13:21:01',
            'jenis' => 'U',
            'keterangan' => 'PENGGUNAAN BARANG NON MEDIS DAN PENUNJANG (LAB & RAD), OLEH Admin Utama',
          ),
          279 => 
          array (
            'no_jurnal' => 'JR20250630000010',
            'no_bukti' => 'PB20250630001',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '13:28:56',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI APOTEK, OLEH Admin Utama',
          ),
          280 => 
          array (
            'no_jurnal' => 'JR20250630000011',
            'no_bukti' => 'PB20250630002',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '13:32:43',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI APOTEK, OLEH Admin Utama',
          ),
          281 => 
          array (
            'no_jurnal' => 'JR20250630000012',
            'no_bukti' => 'IU',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '13:35:05',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250630002, OLEH Admin Utama',
          ),
          282 => 
          array (
            'no_jurnal' => 'JR20250630000013',
            'no_bukti' => 'PG20250630001',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '13:39:50',
            'jenis' => 'U',
            'keterangan' => 'PEMBELIAN DI APOTEK, OLEH Admin Utama',
          ),
          283 => 
          array (
            'no_jurnal' => 'JR20250630000014',
            'no_bukti' => 'HO20250630001',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '13:41:27',
            'jenis' => 'U',
            'keterangan' => 'HIBAH OBAT & BHP DI APOTEK, OLEH Admin Utama',
          ),
          284 => 
          array (
            'no_jurnal' => 'JR20250630000015',
            'no_bukti' => '2025/06/28/000001',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '13:50:10',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PIUTANG PASIEN RAWAT INAP 2025/06/28/000001 000010 GATOT SATRIYO, DIBATALKAN OLEH Admin Utama',
          ),
          285 => 
          array (
            'no_jurnal' => 'JR20250630000016',
            'no_bukti' => 'RB250630001',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '13:52:44',
            'jenis' => 'U',
            'keterangan' => 'RETUR PEMBELIAN DI APOTEK, OLEH Admin Utama',
          ),
          286 => 
          array (
            'no_jurnal' => 'JR20250630000017',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '15:04:56',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          287 => 
          array (
            'no_jurnal' => 'JR20250630000018',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '15:04:56',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          288 => 
          array (
            'no_jurnal' => 'JR20250630000019',
            'no_bukti' => '2025/05/26/000002',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '15:04:56',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          289 => 
          array (
            'no_jurnal' => 'JR20250630000020',
            'no_bukti' => '2025/05/26/000001',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '15:04:56',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          290 => 
          array (
            'no_jurnal' => 'JR20250630000021',
            'no_bukti' => '2025/06/03/000001',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '15:04:56',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          291 => 
          array (
            'no_jurnal' => 'JR20250630000022',
            'no_bukti' => '2025/04/27/000001',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '15:04:56',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          292 => 
          array (
            'no_jurnal' => 'JR20250630000023',
            'no_bukti' => '2025/06/25/000001',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '15:04:56',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PIUTANG, OLEH Admin Utama',
          ),
          293 => 
          array (
            'no_jurnal' => 'JR20250630000024',
            'no_bukti' => 'PL20250630001',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '15:06:46',
            'jenis' => 'U',
            'keterangan' => 'PEMASUKAN LAIN-LAIN OLEH Admin Utama',
          ),
          294 => 
          array (
            'no_jurnal' => 'JR20250630000025',
            'no_bukti' => 'PH20250630001',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '15:08:08',
            'jenis' => 'U',
            'keterangan' => 'PENGELUARAN HARIAN, OLEH Admin Utama',
          ),
          295 => 
          array (
            'no_jurnal' => 'JR20250630000026',
            'no_bukti' => '2025/06/20/000002',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '15:12:43',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT INAP PASIEN RUDI SANTOSO (68 Th) DIPOSTING OLEH Admin Utama',
          ),
          296 => 
          array (
            'no_jurnal' => 'JR20250630000027',
            'no_bukti' => 'BHL202506300001',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '20:27:31',
            'jenis' => 'U',
            'keterangan' => 'BEBAN HUTANG LAIN, OLEH Admin Utama',
          ),
          297 => 
          array (
            'no_jurnal' => 'JR20250630000028',
            'no_bukti' => '',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '20:36:27',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BEBAN HUTANG LAIN, OLEH Admin Utama',
          ),
          298 => 
          array (
            'no_jurnal' => 'JR20250630000029',
            'no_bukti' => 'BHL202506300001',
            'tgl_jurnal' => '2025-06-30',
            'jam_jurnal' => '20:44:03',
            'jenis' => 'U',
            'keterangan' => 'BEBAN HUTANG LAIN, OLEH Admin Utama',
          ),
          299 => 
          array (
            'no_jurnal' => 'JR20250704000001',
            'no_bukti' => '2025/07/04/000001',
            'tgl_jurnal' => '2025-07-04',
            'jam_jurnal' => '09:44:12',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN RAHMA NIA DIPOSTING OLEH Admin Utama',
          ),
          300 => 
          array (
            'no_jurnal' => 'JR20250704000002',
            'no_bukti' => '2025/07/04/000001',
            'tgl_jurnal' => '2025-07-04',
            'jam_jurnal' => '09:46:38',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT JALAN PASIEN RAHMA NIA DIPOSTING OLEH Admin Utama',
          ),
          301 => 
          array (
            'no_jurnal' => 'JR20250704000003',
            'no_bukti' => '2025/06/30/000001',
            'tgl_jurnal' => '2025-07-04',
            'jam_jurnal' => '10:07:58',
            'jenis' => 'U',
            'keterangan' => 'OPERASI RAWAT INAP PASIEN 000005, ROBY ALAMSYAH (38 Th) DIPOSTING OLEH Admin Utama',
          ),
          302 => 
          array (
            'no_jurnal' => 'JR20250704000004',
            'no_bukti' => '2025/07/04/000001',
            'tgl_jurnal' => '2025-07-04',
            'jam_jurnal' => '13:39:53',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/07/04/000001 DIPOSTING OLEH Admin Utama',
          ),
          303 => 
          array (
            'no_jurnal' => 'JR20250705000001',
            'no_bukti' => '2025/06/30/000001',
            'tgl_jurnal' => '2025-07-05',
            'jam_jurnal' => '09:42:44',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT INAP PASIEN ROBY ALAMSYAH DIPOSTING OLEH Admin Utama',
          ),
          304 => 
          array (
            'no_jurnal' => 'JR20250705000002',
            'no_bukti' => '2025/06/30/000001',
            'tgl_jurnal' => '2025-07-05',
            'jam_jurnal' => '09:56:06',
            'jenis' => 'U',
            'keterangan' => 'OPERASI RAWAT INAP PASIEN ROBY ALAMSYAH DIPOSTING OLEH Admin Utama',
          ),
          305 => 
          array (
            'no_jurnal' => 'JR20250705000003',
            'no_bukti' => '2025/06/30/000001',
            'tgl_jurnal' => '2025-07-05',
            'jam_jurnal' => '09:59:20',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT INAP PASIEN 2025/06/30/000001 000005 ROBY ALAMSYAH, DIPOSTING OLEH Admin Utama',
          ),
          306 => 
          array (
            'no_jurnal' => 'JR20250705000004',
            'no_bukti' => 'BHL202507050001',
            'tgl_jurnal' => '2025-07-05',
            'jam_jurnal' => '11:14:59',
            'jenis' => 'U',
            'keterangan' => 'BEBAN HUTANG LAIN, OLEH Admin Utama',
          ),
          307 => 
          array (
            'no_jurnal' => 'JR20250705000005',
            'no_bukti' => 'BHL202507050001',
            'tgl_jurnal' => '2025-07-05',
            'jam_jurnal' => '11:31:59',
            'jenis' => 'U',
            'keterangan' => 'BAYAR BEBAN HUTANG LAIN, OLEH Admin Utama',
          ),
          308 => 
          array (
            'no_jurnal' => 'JR20250705000006',
            'no_bukti' => 'BHL202507050001',
            'tgl_jurnal' => '2025-07-05',
            'jam_jurnal' => '11:34:29',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR BEBAN HUTANG LAIN, OLEH Admin Utama',
          ),
          309 => 
          array (
            'no_jurnal' => 'JR20250705000007',
            'no_bukti' => 'BHL202507050001',
            'tgl_jurnal' => '2025-07-05',
            'jam_jurnal' => '14:11:27',
            'jenis' => 'U',
            'keterangan' => 'BAYAR BEBAN HUTANG LAIN, OLEH Admin Utama',
          ),
          310 => 
          array (
            'no_jurnal' => 'JR20250705000008',
            'no_bukti' => '2025/07/05/000001',
            'tgl_jurnal' => '2025-07-05',
            'jam_jurnal' => '20:14:23',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/07/05/000001 DIPOSTING OLEH Admin Utama',
          ),
          311 => 
          array (
            'no_jurnal' => 'JR20250705000009',
            'no_bukti' => 'JMD20250705001',
            'tgl_jurnal' => '2025-07-05',
            'jam_jurnal' => '20:48:38',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN JASA MEDIS DOKTER D0000004 dr. Hilyatul Nadia, OLEH Admin Utama',
          ),
          312 => 
          array (
            'no_jurnal' => 'JR20250707000001',
            'no_bukti' => '2025/07/07/000001',
            'tgl_jurnal' => '2025-07-07',
            'jam_jurnal' => '08:52:49',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/07/07/000001 DIPOSTING OLEH Admin Utama',
          ),
          313 => 
          array (
            'no_jurnal' => 'JR20250707000002',
            'no_bukti' => '123124134',
            'tgl_jurnal' => '2025-07-07',
            'jam_jurnal' => '16:05:47',
            'jenis' => 'U',
            'keterangan' => 'BAYAR BEBAN HUTANG LAIN NO.HUTANG BHL202507050001, OLEH Admin Utama',
          ),
          314 => 
          array (
            'no_jurnal' => 'JR20250707000003',
            'no_bukti' => '123124134',
            'tgl_jurnal' => '2025-07-07',
            'jam_jurnal' => '16:05:55',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR BEBAN HUTANG LAIN NO.HUTANG BHL202507050001, OLEH Admin Utama',
          ),
          315 => 
          array (
            'no_jurnal' => 'JR20250708000001',
            'no_bukti' => 'PB20250708001',
            'tgl_jurnal' => '2025-07-08',
            'jam_jurnal' => '09:32:34',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI GUDANG, OLEH Admin Utama',
          ),
          316 => 
          array (
            'no_jurnal' => 'JR20250708000002',
            'no_bukti' => '121212',
            'tgl_jurnal' => '2025-07-08',
            'jam_jurnal' => '09:35:04',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250708001, OLEH Admin Utama',
          ),
          317 => 
          array (
            'no_jurnal' => 'JR20250708000003',
            'no_bukti' => '121212',
            'tgl_jurnal' => '2025-07-08',
            'jam_jurnal' => '09:35:16',
            'jenis' => 'U',
            'keterangan' => 'BATAL BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250708001, OLEH Admin Utama',
          ),
          318 => 
          array (
            'no_jurnal' => 'JR20250708000004',
            'no_bukti' => 'PD20250708001',
            'tgl_jurnal' => '2025-07-08',
            'jam_jurnal' => '10:57:01',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DAPUR, OLEH Admin Utama',
          ),
          319 => 
          array (
            'no_jurnal' => 'JR20250708000005',
            'no_bukti' => 'SKD250708001',
            'tgl_jurnal' => '2025-07-08',
            'jam_jurnal' => '10:57:35',
            'jenis' => 'U',
            'keterangan' => 'PENGGUNAAN BARANG DAPUR KERING DAN BASAH, OLEH Admin Utama',
          ),
          320 => 
          array (
            'no_jurnal' => 'JR20250708000006',
            'no_bukti' => 'PH20250708001',
            'tgl_jurnal' => '2025-07-08',
            'jam_jurnal' => '11:00:50',
            'jenis' => 'U',
            'keterangan' => 'PENGELUARAN HARIAN, OLEH Admin Utama',
          ),
          321 => 
          array (
            'no_jurnal' => 'JR20250708000007',
            'no_bukti' => '2025/07/05/000001',
            'tgl_jurnal' => '2025-07-08',
            'jam_jurnal' => '11:27:59',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/07/05/000001 DIPOSTING OLEH Admin Utama',
          ),
          322 => 
          array (
            'no_jurnal' => 'JR20250708000008',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-07-08',
            'jam_jurnal' => '12:14:46',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          323 => 
          array (
            'no_jurnal' => 'JR20250708000009',
            'no_bukti' => '2025/05/26/000002',
            'tgl_jurnal' => '2025-07-08',
            'jam_jurnal' => '12:14:48',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          324 => 
          array (
            'no_jurnal' => 'JR20250708000010',
            'no_bukti' => '2025/04/28/000001',
            'tgl_jurnal' => '2025-07-08',
            'jam_jurnal' => '12:14:50',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          325 => 
          array (
            'no_jurnal' => 'JR20250708000011',
            'no_bukti' => '2025/06/25/000001',
            'tgl_jurnal' => '2025-07-08',
            'jam_jurnal' => '12:14:52',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          326 => 
          array (
            'no_jurnal' => 'JR20250708000012',
            'no_bukti' => '2025/04/27/000001',
            'tgl_jurnal' => '2025-07-08',
            'jam_jurnal' => '12:14:54',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN BAYAR PIUTANG, OLEH Admin Utama',
          ),
          327 => 
          array (
            'no_jurnal' => 'JR20250714000001',
            'no_bukti' => '2025/07/14/000001',
            'tgl_jurnal' => '2025-07-14',
            'jam_jurnal' => '16:33:52',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000013 PARAMITA RAMADANI (35 Th), DIPOSTING OLEH Admin Utama',
          ),
          328 => 
          array (
            'no_jurnal' => 'JR20250714000002',
            'no_bukti' => '2025/07/14/000001',
            'tgl_jurnal' => '2025-07-14',
            'jam_jurnal' => '16:35:19',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000013 PARAMITA RAMADANI, DIPOSTING OLEH Admin Utama',
          ),
          329 => 
          array (
            'no_jurnal' => 'JR20250714000003',
            'no_bukti' => '2025/07/14/000001',
            'tgl_jurnal' => '2025-07-14',
            'jam_jurnal' => '16:41:45',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN PARAMITA RAMADANI DIPOSTING OLEH Admin Utama',
          ),
          330 => 
          array (
            'no_jurnal' => 'JR20250714000004',
            'no_bukti' => '2025/07/14/000001',
            'tgl_jurnal' => '2025-07-14',
            'jam_jurnal' => '16:45:35',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/07/14/000001 DIPOSTING OLEH Admin Utama',
          ),
          331 => 
          array (
            'no_jurnal' => 'JR20250716000001',
            'no_bukti' => '2025/07/16/000001',
            'tgl_jurnal' => '2025-07-16',
            'jam_jurnal' => '09:26:21',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000011 SETIYAWAN KRISTANTO (65 Th), DIPOSTING OLEH Admin Utama',
          ),
          332 => 
          array (
            'no_jurnal' => 'JR20250716000002',
            'no_bukti' => '2025/07/16/000002',
            'tgl_jurnal' => '2025-07-16',
            'jam_jurnal' => '09:27:12',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000047 RIDWAN HALIM (36 Th), DIPOSTING OLEH Admin Utama',
          ),
          333 => 
          array (
            'no_jurnal' => 'JR20250716000003',
            'no_bukti' => '2025/07/16/000001',
            'tgl_jurnal' => '2025-07-16',
            'jam_jurnal' => '10:05:17',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000011 SETIYAWAN KRISTANTO (65 Th), DIPOSTING OLEH Admin Utama',
          ),
          334 => 
          array (
            'no_jurnal' => 'JR20250716000004',
            'no_bukti' => '2025/07/16/000001',
            'tgl_jurnal' => '2025-07-16',
            'jam_jurnal' => '10:05:25',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000011 SETIYAWAN KRISTANTO (65 Th), DIPOSTING OLEH Admin Utama',
          ),
          335 => 
          array (
            'no_jurnal' => 'JR20250716000005',
            'no_bukti' => '2025/07/16/000001',
            'tgl_jurnal' => '2025-07-16',
            'jam_jurnal' => '10:11:56',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000011 SETIYAWAN KRISTANTO, DIPOSTING OLEH Admin Utama',
          ),
          336 => 
          array (
            'no_jurnal' => 'JR20250716000006',
            'no_bukti' => '2025/07/16/000001',
            'tgl_jurnal' => '2025-07-16',
            'jam_jurnal' => '10:12:14',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT JALAN 2025/07/16/000001 000011 SETIYAWAN KRISTANTO, DIPOSTING OLEH Admin Utama',
          ),
          337 => 
          array (
            'no_jurnal' => 'JR20250716000007',
            'no_bukti' => '2025/07/16/000001',
            'tgl_jurnal' => '2025-07-16',
            'jam_jurnal' => '10:19:32',
            'jenis' => 'U',
            'keterangan' => 'RVP PIUTANG PASIEN BPJS, OLEH 123124',
          ),
          338 => 
          array (
            'no_jurnal' => 'JR20250716000008',
            'no_bukti' => '2025/07/16/000001',
            'tgl_jurnal' => '2025-07-16',
            'jam_jurnal' => '10:19:32',
            'jenis' => 'U',
            'keterangan' => 'RVP PIUTANG PASIEN BPJS, OLEH 123124',
          ),
          339 => 
          array (
            'no_jurnal' => 'JR20250716000009',
            'no_bukti' => '2025/07/16/000001',
            'tgl_jurnal' => '2025-07-16',
            'jam_jurnal' => '10:19:32',
            'jenis' => 'U',
            'keterangan' => 'RVP PIUTANG BPJS, OLEH 123124',
          ),
          340 => 
          array (
            'no_jurnal' => 'JR20250719000001',
            'no_bukti' => 'PB20250719001',
            'tgl_jurnal' => '2025-07-19',
            'jam_jurnal' => '10:18:16',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI GUDANG, OLEH Admin Utama',
          ),
          341 => 
          array (
            'no_jurnal' => 'JR20250719000002',
            'no_bukti' => '-',
            'tgl_jurnal' => '2025-07-19',
            'jam_jurnal' => '10:19:27',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250719001, OLEH Admin Utama',
          ),
          342 => 
          array (
            'no_jurnal' => 'JR20250719000003',
            'no_bukti' => 'SKM20250719001',
            'tgl_jurnal' => '2025-07-19',
            'jam_jurnal' => '10:22:44',
            'jenis' => 'U',
            'keterangan' => 'STOK KELUAR BARANG MEDIS/OBAT/ALKES/BHP, OLEH Admin Utama',
          ),
          343 => 
          array (
            'no_jurnal' => 'JR20250719000004',
            'no_bukti' => 'HO20250719001',
            'tgl_jurnal' => '2025-07-19',
            'jam_jurnal' => '10:25:04',
            'jenis' => 'U',
            'keterangan' => 'HIBAH OBAT & BHP DI GUDANG, OLEH Admin Utama',
          ),
          344 => 
          array (
            'no_jurnal' => 'JR20250719000005',
            'no_bukti' => '2025/07/16/000001',
            'tgl_jurnal' => '2025-07-19',
            'jam_jurnal' => '11:19:23',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PIUTANG PASIEN RAWAT JALAN 2025/07/16/000001 000011 SETIYAWAN KRISTANTO, DIBATALKAN OLEH Admin Utama',
          ),
          345 => 
          array (
            'no_jurnal' => 'JR20250719000006',
            'no_bukti' => '2025/04/28/000002',
            'tgl_jurnal' => '2025-07-19',
            'jam_jurnal' => '11:22:06',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PIUTANG PASIEN RAWAT JALAN 2025/04/28/000002 000011 SETIYAWAN KRISTANTO, DIBATALKAN OLEH Admin Utama',
          ),
          346 => 
          array (
            'no_jurnal' => 'JR20250721000001',
            'no_bukti' => 'JMD20250721001',
            'tgl_jurnal' => '2025-07-21',
            'jam_jurnal' => '08:54:44',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN JASA MEDIS DOKTER D0000004 dr. Hilyatul Nadia, OLEH Admin Utama',
          ),
          347 => 
          array (
            'no_jurnal' => 'JR20250721000002',
            'no_bukti' => 'JMD20250721001',
            'tgl_jurnal' => '2025-07-21',
            'jam_jurnal' => '08:55:02',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBAYARAN JASA MEDIS DOKTER D0000004 dr. Hilyatul Nadia, OLEH Admin Utama',
          ),
          348 => 
          array (
            'no_jurnal' => 'JR20250721000003',
            'no_bukti' => '2025/07/16/000001',
            'tgl_jurnal' => '2025-07-21',
            'jam_jurnal' => '09:03:37',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN RVP PIUTANG BPJS, OLEH Admin Utama',
          ),
          349 => 
          array (
            'no_jurnal' => 'JR20250721000004',
            'no_bukti' => '2025/07/16/000001',
            'tgl_jurnal' => '2025-07-21',
            'jam_jurnal' => '09:03:37',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN RVP PIUTANG BPJS, OLEH Admin Utama',
          ),
          350 => 
          array (
            'no_jurnal' => 'JR20250721000005',
            'no_bukti' => '2025/07/16/000001',
            'tgl_jurnal' => '2025-07-21',
            'jam_jurnal' => '09:03:37',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN RVP PIUTANG BPJS, OLEH Admin Utama',
          ),
          351 => 
          array (
            'no_jurnal' => 'JR20250721000006',
            'no_bukti' => '2025/07/21/000001',
            'tgl_jurnal' => '2025-07-21',
            'jam_jurnal' => '09:09:14',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/07/21/000001 DIPOSTING OLEH Admin Utama',
          ),
          352 => 
          array (
            'no_jurnal' => 'JR20250721000007',
            'no_bukti' => 'JMD20250721001',
            'tgl_jurnal' => '2025-07-21',
            'jam_jurnal' => '09:17:06',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN JASA MEDIS DOKTER D0000004 dr. Hilyatul Nadia, OLEH Admin Utama',
          ),
          353 => 
          array (
            'no_jurnal' => 'JR20250721000008',
            'no_bukti' => 'JMD20250721001',
            'tgl_jurnal' => '2025-07-21',
            'jam_jurnal' => '09:17:17',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBAYARAN JASA MEDIS DOKTER D0000004 dr. Hilyatul Nadia, OLEH Admin Utama',
          ),
          354 => 
          array (
            'no_jurnal' => 'JR20250721000009',
            'no_bukti' => '2025/07/21/000001',
            'tgl_jurnal' => '2025-07-21',
            'jam_jurnal' => '11:22:07',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000019 RIZKI AMALIA (31 Th), DIPOSTING OLEH Admin Utama',
          ),
          355 => 
          array (
            'no_jurnal' => 'JR20250721000010',
            'no_bukti' => '2025/07/21/000001',
            'tgl_jurnal' => '2025-07-21',
            'jam_jurnal' => '11:23:25',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000019 RIZKI AMALIA (31 Th), DIPOSTING OLEH Admin Utama',
          ),
          356 => 
          array (
            'no_jurnal' => 'JR20250721000011',
            'no_bukti' => '2025/07/21/000001',
            'tgl_jurnal' => '2025-07-21',
            'jam_jurnal' => '11:24:34',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000019 RIZKI AMALIA (31 Th), DIPOSTING OLEH Admin Utama',
          ),
          357 => 
          array (
            'no_jurnal' => 'JR20250721000012',
            'no_bukti' => '2025/07/21/000001',
            'tgl_jurnal' => '2025-07-21',
            'jam_jurnal' => '11:25:02',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN TINDAKAN RAWAT JALAN PASIEN 000019 RIZKI AMALIA OLEH Admin Utama',
          ),
          358 => 
          array (
            'no_jurnal' => 'JR20250721000013',
            'no_bukti' => '2025/07/21/000001',
            'tgl_jurnal' => '2025-07-21',
            'jam_jurnal' => '11:25:46',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000019 RIZKI AMALIA (31 Th), DIPOSTING OLEH Admin Utama',
          ),
          359 => 
          array (
            'no_jurnal' => 'JR20250721000014',
            'no_bukti' => '2025/07/21/000001',
            'tgl_jurnal' => '2025-07-21',
            'jam_jurnal' => '11:26:33',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN PASIEN RAWAT JALAN 2025/07/21/000001 000019 RIZKI AMALIA, DIPOSTING OLEH Admin Utama',
          ),
          360 => 
          array (
            'no_jurnal' => 'JR20250721000015',
            'no_bukti' => '2025/07/21/000001',
            'tgl_jurnal' => '2025-07-21',
            'jam_jurnal' => '11:28:51',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBAYARAN PASIEN RAWAT JALAN 2025/07/21/000001 000019 RIZKI AMALIA, DIBATALKAN OLEH Admin Utama',
          ),
          361 => 
          array (
            'no_jurnal' => 'JR20250723000001',
            'no_bukti' => '2025/07/23/000001',
            'tgl_jurnal' => '2025-07-23',
            'jam_jurnal' => '14:23:07',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/07/23/000001 DIPOSTING OLEH Admin Utama',
          ),
          362 => 
          array (
            'no_jurnal' => 'JR20250723000002',
            'no_bukti' => '2025/07/23/000001',
            'tgl_jurnal' => '2025-07-23',
            'jam_jurnal' => '14:23:48',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000011 SETIYAWAN KRISTANTO (65 Th), DIPOSTING OLEH Admin Utama',
          ),
          363 => 
          array (
            'no_jurnal' => 'JR20250723000003',
            'no_bukti' => '2025/07/23/000001',
            'tgl_jurnal' => '2025-07-23',
            'jam_jurnal' => '14:29:52',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000011 SETIYAWAN KRISTANTO, DIPOSTING OLEH Admin Utama',
          ),
          364 => 
          array (
            'no_jurnal' => 'JR20250723000004',
            'no_bukti' => '2025/07/23/000001',
            'tgl_jurnal' => '2025-07-23',
            'jam_jurnal' => '14:34:27',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN SETIYAWAN KRISTANTO DIPOSTING OLEH Admin Utama',
          ),
          365 => 
          array (
            'no_jurnal' => 'JR20250723000005',
            'no_bukti' => '2025/07/23/000001',
            'tgl_jurnal' => '2025-07-23',
            'jam_jurnal' => '14:44:48',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN PASIEN RAWAT JALAN 2025/07/23/000001 000011 SETIYAWAN KRISTANTO, DIPOSTING OLEH Admin Utama',
          ),
          366 => 
          array (
            'no_jurnal' => 'JR20250723000006',
            'no_bukti' => 'PB20250723001',
            'tgl_jurnal' => '2025-07-23',
            'jam_jurnal' => '14:45:56',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI APOTEK, OLEH Admin Utama',
          ),
          367 => 
          array (
            'no_jurnal' => 'JR20250723000007',
            'no_bukti' => 'BRWH0011423072025000001',
            'tgl_jurnal' => '2025-07-23',
            'jam_jurnal' => '14:46:48',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250723001, OLEH Admin Utama',
          ),
          368 => 
          array (
            'no_jurnal' => 'JR20250724000001',
            'no_bukti' => 'PB20250724001',
            'tgl_jurnal' => '2025-07-24',
            'jam_jurnal' => '09:09:29',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI GUDANG, OLEH Admin Utama',
          ),
          369 => 
          array (
            'no_jurnal' => 'JR20250724000002',
            'no_bukti' => '12122',
            'tgl_jurnal' => '2025-07-24',
            'jam_jurnal' => '09:10:31',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250724001, OLEH Admin Utama',
          ),
          370 => 
          array (
            'no_jurnal' => 'JR20250729000001',
            'no_bukti' => '2025/07/29/000001',
            'tgl_jurnal' => '2025-07-29',
            'jam_jurnal' => '09:25:30',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000051 ADI KAZAMA (40 Th), DIPOSTING OLEH Admin Utama',
          ),
          371 => 
          array (
            'no_jurnal' => 'JR20250729000002',
            'no_bukti' => '2025/07/29/000001',
            'tgl_jurnal' => '2025-07-29',
            'jam_jurnal' => '09:30:20',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000051 ADI KAZAMA (40 Th), DIPOSTING OLEH Admin Utama',
          ),
          372 => 
          array (
            'no_jurnal' => 'JR20250729000003',
            'no_bukti' => '2025/07/29/000001',
            'tgl_jurnal' => '2025-07-29',
            'jam_jurnal' => '09:36:43',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000051 ADI KAZAMA, DIPOSTING OLEH Admin Utama',
          ),
          373 => 
          array (
            'no_jurnal' => 'JR20250729000004',
            'no_bukti' => '2025/07/29/000001',
            'tgl_jurnal' => '2025-07-29',
            'jam_jurnal' => '09:43:55',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN ADI KAZAMA DIPOSTING OLEH Admin Utama',
          ),
          374 => 
          array (
            'no_jurnal' => 'JR20250729000005',
            'no_bukti' => '2025/07/29/000001',
            'tgl_jurnal' => '2025-07-29',
            'jam_jurnal' => '09:45:49',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT JALAN PASIEN ADI KAZAMA DIPOSTING OLEH Admin Utama',
          ),
          375 => 
          array (
            'no_jurnal' => 'JR20250729000006',
            'no_bukti' => '2025/07/29/000001',
            'tgl_jurnal' => '2025-07-29',
            'jam_jurnal' => '09:52:05',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN PASIEN RAWAT JALAN 2025/07/29/000001 000051 ADI KAZAMA, DIPOSTING OLEH Admin Utama',
          ),
          376 => 
          array (
            'no_jurnal' => 'JR20250729000007',
            'no_bukti' => 'PB20250729001',
            'tgl_jurnal' => '2025-07-29',
            'jam_jurnal' => '10:44:37',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI APOTEK, OLEH Admin Utama',
          ),
          377 => 
          array (
            'no_jurnal' => 'JR20250729000008',
            'no_bukti' => 'PB20250729002',
            'tgl_jurnal' => '2025-07-29',
            'jam_jurnal' => '10:47:33',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI APOTEK, OLEH Admin Utama',
          ),
          378 => 
          array (
            'no_jurnal' => 'JR20250729000009',
            'no_bukti' => '112',
            'tgl_jurnal' => '2025-07-29',
            'jam_jurnal' => '10:54:46',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250729001, OLEH Admin Utama',
          ),
          379 => 
          array (
            'no_jurnal' => 'JR20250804000001',
            'no_bukti' => '2025/08/04/000001',
            'tgl_jurnal' => '2025-08-04',
            'jam_jurnal' => '09:30:51',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/08/04/000001 DIPOSTING OLEH Admin Utama',
          ),
          380 => 
          array (
            'no_jurnal' => 'JR20250804000002',
            'no_bukti' => '2025/08/04/000001',
            'tgl_jurnal' => '2025-08-04',
            'jam_jurnal' => '10:11:16',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000006 SAKHA HAMIZAN AQILA, DIPOSTING OLEH Admin Utama',
          ),
          381 => 
          array (
            'no_jurnal' => 'JR20250804000003',
            'no_bukti' => '2025/08/04/000001',
            'tgl_jurnal' => '2025-08-04',
            'jam_jurnal' => '10:21:09',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN SAKHA HAMIZAN AQILA DIPOSTING OLEH Admin Utama',
          ),
          382 => 
          array (
            'no_jurnal' => 'JR20250804000004',
            'no_bukti' => '2025/08/04/000001',
            'tgl_jurnal' => '2025-08-04',
            'jam_jurnal' => '10:31:51',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT JALAN PASIEN SAKHA HAMIZAN AQILA DIPOSTING OLEH Admin Utama',
          ),
          383 => 
          array (
            'no_jurnal' => 'JR20250804000005',
            'no_bukti' => '2025/08/04/000001',
            'tgl_jurnal' => '2025-08-04',
            'jam_jurnal' => '10:39:57',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT JALAN PASIEN SAKHA HAMIZAN AQILA DIPOSTING OLEH Admin Utama',
          ),
          384 => 
          array (
            'no_jurnal' => 'JR20250804000006',
            'no_bukti' => '2025/08/04/000001',
            'tgl_jurnal' => '2025-08-04',
            'jam_jurnal' => '10:50:12',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT JALAN 2025/08/04/000001 000006 SAKHA HAMIZAN AQILA, DIPOSTING OLEH Admin Utama',
          ),
          385 => 
          array (
            'no_jurnal' => 'JR20250804000007',
            'no_bukti' => '2025/08/04/000001',
            'tgl_jurnal' => '2025-08-04',
            'jam_jurnal' => '11:10:03',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PIUTANG PASIEN RAWAT JALAN 2025/08/04/000001 000006 SAKHA HAMIZAN AQILA, DIBATALKAN OLEH Admin Utama',
          ),
          386 => 
          array (
            'no_jurnal' => 'JR20250804000008',
            'no_bukti' => '2025/07/07/000001',
            'tgl_jurnal' => '2025-08-04',
            'jam_jurnal' => '12:48:17',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG DI APOTEK, OLEH Admin Utama',
          ),
          387 => 
          array (
            'no_jurnal' => 'JR20250804000009',
            'no_bukti' => '2025/08/04/000001',
            'tgl_jurnal' => '2025-08-04',
            'jam_jurnal' => '13:01:06',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000006 SAKHA HAMIZAN AQILA, DIPOSTING OLEH Admin Utama',
          ),
          388 => 
          array (
            'no_jurnal' => 'JR20250804000010',
            'no_bukti' => 'PD20250804001',
            'tgl_jurnal' => '2025-08-04',
            'jam_jurnal' => '15:02:06',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DAPUR, OLEH Admin Utama',
          ),
          389 => 
          array (
            'no_jurnal' => 'JR20250804000011',
            'no_bukti' => 'PD20250804002',
            'tgl_jurnal' => '2025-08-04',
            'jam_jurnal' => '15:03:10',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DAPUR, OLEH Admin Utama',
          ),
          390 => 
          array (
            'no_jurnal' => 'JR20250804000012',
            'no_bukti' => 'rwrw',
            'tgl_jurnal' => '2025-08-04',
            'jam_jurnal' => '15:04:25',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG BARANG DAPUR NO.FAKTUR PD20250804001, OLEH Admin Utama',
          ),
          391 => 
          array (
            'no_jurnal' => 'JR20250804000013',
            'no_bukti' => 'PD20250804001',
            'tgl_jurnal' => '2025-08-04',
            'jam_jurnal' => '15:06:54',
            'jenis' => 'U',
            'keterangan' => 'PEMBELIAN BARANG DAPUR KERING & BASAH , OLEH Admin Utama',
          ),
          392 => 
          array (
            'no_jurnal' => 'JR20250804000014',
            'no_bukti' => 'SKD250804001',
            'tgl_jurnal' => '2025-08-04',
            'jam_jurnal' => '15:08:38',
            'jenis' => 'U',
            'keterangan' => 'PENGGUNAAN BARANG DAPUR KERING DAN BASAH, OLEH Admin Utama',
          ),
          393 => 
          array (
            'no_jurnal' => 'JR20250804000015',
            'no_bukti' => 'SKD250804002',
            'tgl_jurnal' => '2025-08-04',
            'jam_jurnal' => '15:09:17',
            'jenis' => 'U',
            'keterangan' => 'PENGGUNAAN BARANG DAPUR KERING DAN BASAH, OLEH Admin Utama',
          ),
          394 => 
          array (
            'no_jurnal' => 'JR20250805000001',
            'no_bukti' => '2025/07/14/000001',
            'tgl_jurnal' => '2025-08-05',
            'jam_jurnal' => '08:45:31',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBERIAN OBAT RAWAT JALAN PASIEN 000013 PARAMITA RAMADANI OLEH Admin Utama',
          ),
          395 => 
          array (
            'no_jurnal' => 'JR20250805000002',
            'no_bukti' => '2025/07/14/000001',
            'tgl_jurnal' => '2025-08-05',
            'jam_jurnal' => '08:45:44',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000013 PARAMITA RAMADANI, DIPOSTING OLEH Admin Utama',
          ),
          396 => 
          array (
            'no_jurnal' => 'JR20250805000003',
            'no_bukti' => 'SKM20250805001',
            'tgl_jurnal' => '2025-08-05',
            'jam_jurnal' => '08:49:42',
            'jenis' => 'U',
            'keterangan' => 'STOK KELUAR BARANG MEDIS/OBAT/ALKES/BHP, OLEH Admin Utama',
          ),
          397 => 
          array (
            'no_jurnal' => 'JR20250805000004',
            'no_bukti' => 'SKM20250805002',
            'tgl_jurnal' => '2025-08-05',
            'jam_jurnal' => '08:51:28',
            'jenis' => 'U',
            'keterangan' => 'STOK KELUAR BARANG MEDIS/OBAT/ALKES/BHP, OLEH Admin Utama',
          ),
          398 => 
          array (
            'no_jurnal' => 'JR20250805000005',
            'no_bukti' => 'PB20250805001',
            'tgl_jurnal' => '2025-08-05',
            'jam_jurnal' => '09:38:58',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI GUDANG, OLEH Admin Utama',
          ),
          399 => 
          array (
            'no_jurnal' => 'JR20250805000006',
            'no_bukti' => '2025/06/18/000001',
            'tgl_jurnal' => '2025-08-05',
            'jam_jurnal' => '09:52:59',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT INAP PASIEN 2025/06/18/000001 000003 HAFIZ HARIYADI, DIPOSTING OLEH Admin Utama',
          ),
          400 => 
          array (
            'no_jurnal' => 'JR20250805000007',
            'no_bukti' => '2025/06/18/000001',
            'tgl_jurnal' => '2025-08-05',
            'jam_jurnal' => '10:41:10',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT INAP PASIEN HAFIZ HARIYADI DIPOSTING OLEH Admin Utama',
          ),
          401 => 
          array (
            'no_jurnal' => 'JR20250805000008',
            'no_bukti' => '2025/06/18/000001',
            'tgl_jurnal' => '2025-08-05',
            'jam_jurnal' => '10:42:09',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT INAP PASIEN HAFIZ HARIYADI DIPOSTING OLEH Admin Utama',
          ),
          402 => 
          array (
            'no_jurnal' => 'JR20250805000009',
            'no_bukti' => '2025/06/20/000002',
            'tgl_jurnal' => '2025-08-05',
            'jam_jurnal' => '10:57:31',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT INAP PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          403 => 
          array (
            'no_jurnal' => 'JR20250805000010',
            'no_bukti' => '2025/06/20/000002',
            'tgl_jurnal' => '2025-08-05',
            'jam_jurnal' => '11:01:56',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT INAP PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          404 => 
          array (
            'no_jurnal' => 'JR20250805000011',
            'no_bukti' => '2025/06/20/000002',
            'tgl_jurnal' => '2025-08-05',
            'jam_jurnal' => '12:38:24',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT INAP PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          405 => 
          array (
            'no_jurnal' => 'JR20250805000012',
            'no_bukti' => '2025/06/20/000002',
            'tgl_jurnal' => '2025-08-05',
            'jam_jurnal' => '13:38:16',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT INAP PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          406 => 
          array (
            'no_jurnal' => 'JR20250805000013',
            'no_bukti' => '2025/06/20/000002',
            'tgl_jurnal' => '2025-08-05',
            'jam_jurnal' => '13:42:33',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT INAP PASIEN 2025/06/20/000002 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          407 => 
          array (
            'no_jurnal' => 'JR20250805000014',
            'no_bukti' => 'SKNM250805001',
            'tgl_jurnal' => '2025-08-05',
            'jam_jurnal' => '15:09:38',
            'jenis' => 'U',
            'keterangan' => 'PENGGUNAAN BARANG NON MEDIS DAN PENUNJANG (LAB & RAD), OLEH Admin Utama',
          ),
          408 => 
          array (
            'no_jurnal' => 'JR20250806000001',
            'no_bukti' => 'PL20250806001',
            'tgl_jurnal' => '2025-08-06',
            'jam_jurnal' => '09:04:18',
            'jenis' => 'U',
            'keterangan' => 'PEMASUKAN LAIN-LAIN OLEH Admin Utama',
          ),
          409 => 
          array (
            'no_jurnal' => 'JR20250806000002',
            'no_bukti' => 'PH20250806001',
            'tgl_jurnal' => '2025-08-06',
            'jam_jurnal' => '09:09:19',
            'jenis' => 'U',
            'keterangan' => 'PENGELUARAN HARIAN, OLEH Admin Utama',
          ),
          410 => 
          array (
            'no_jurnal' => 'JR20250806000003',
            'no_bukti' => 'PB20250806001',
            'tgl_jurnal' => '2025-08-06',
            'jam_jurnal' => '09:10:08',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI GUDANG, OLEH Admin Utama',
          ),
          411 => 
          array (
            'no_jurnal' => 'JR20250806000004',
            'no_bukti' => '-',
            'tgl_jurnal' => '2025-08-06',
            'jam_jurnal' => '09:10:55',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250806001, OLEH Admin Utama',
          ),
          412 => 
          array (
            'no_jurnal' => 'JR20250811000001',
            'no_bukti' => '2025/08/11/000001',
            'tgl_jurnal' => '2025-08-11',
            'jam_jurnal' => '14:10:05',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000011 SETIYAWAN KRISTANTO (65 Th), DIPOSTING OLEH Admin Utama',
          ),
          413 => 
          array (
            'no_jurnal' => 'JR20250811000002',
            'no_bukti' => '2025/08/11/000001',
            'tgl_jurnal' => '2025-08-11',
            'jam_jurnal' => '14:20:48',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/08/11/000001 DIPOSTING OLEH Admin Utama',
          ),
          414 => 
          array (
            'no_jurnal' => 'JR20250811000003',
            'no_bukti' => '2025/08/11/000001',
            'tgl_jurnal' => '2025-08-11',
            'jam_jurnal' => '14:24:08',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000011 SETIYAWAN KRISTANTO, DIPOSTING OLEH Admin Utama',
          ),
          415 => 
          array (
            'no_jurnal' => 'JR20250811000004',
            'no_bukti' => '2025/08/11/000001',
            'tgl_jurnal' => '2025-08-11',
            'jam_jurnal' => '14:28:05',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN SETIYAWAN KRISTANTO DIPOSTING OLEH Admin Utama',
          ),
          416 => 
          array (
            'no_jurnal' => 'JR20250811000005',
            'no_bukti' => '2025/08/11/000001',
            'tgl_jurnal' => '2025-08-11',
            'jam_jurnal' => '14:29:25',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT JALAN PASIEN SETIYAWAN KRISTANTO DIPOSTING OLEH Admin Utama',
          ),
          417 => 
          array (
            'no_jurnal' => 'JR20250811000006',
            'no_bukti' => '2025/08/11/000001',
            'tgl_jurnal' => '2025-08-11',
            'jam_jurnal' => '14:37:09',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT JALAN 2025/08/11/000001 000011 SETIYAWAN KRISTANTO, DIPOSTING OLEH Admin Utama',
          ),
          418 => 
          array (
            'no_jurnal' => 'JR20250811000007',
            'no_bukti' => '2025/06/20/000002',
            'tgl_jurnal' => '2025-08-11',
            'jam_jurnal' => '15:50:43',
            'jenis' => 'U',
            'keterangan' => 'OPERASI RAWAT INAP PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          419 => 
          array (
            'no_jurnal' => 'JR20250812000001',
            'no_bukti' => '21212',
            'tgl_jurnal' => '2025-08-12',
            'jam_jurnal' => '08:38:31',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250805001, OLEH Admin Utama',
          ),
          420 => 
          array (
            'no_jurnal' => 'JR20250812000002',
            'no_bukti' => 'PB20250812001',
            'tgl_jurnal' => '2025-08-12',
            'jam_jurnal' => '08:42:14',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI APOTEK, OLEH Admin Utama',
          ),
          421 => 
          array (
            'no_jurnal' => 'JR20250813000001',
            'no_bukti' => 'SKNM250813001',
            'tgl_jurnal' => '2025-08-13',
            'jam_jurnal' => '17:22:56',
            'jenis' => 'U',
            'keterangan' => 'PENGGUNAAN BARANG NON MEDIS DAN PENUNJANG (LAB & RAD), OLEH Admin Utama',
          ),
          422 => 
          array (
            'no_jurnal' => 'JR20250813000002',
            'no_bukti' => 'PNM20250813001',
            'tgl_jurnal' => '2025-08-13',
            'jam_jurnal' => '17:28:01',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG NON MEDIS/PENUNJANG, OLEH Admin Utama',
          ),
          423 => 
          array (
            'no_jurnal' => 'JR20250813000003',
            'no_bukti' => '-',
            'tgl_jurnal' => '2025-08-13',
            'jam_jurnal' => '17:29:41',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG BARANG NON MEDIS NO.FAKTUR PNM20250813001, OLEH Admin Utama',
          ),
          424 => 
          array (
            'no_jurnal' => 'JR20250819000001',
            'no_bukti' => '2025/08/19/000001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '09:59:05',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000022 RUDI SANTOSO (68 Th), DIPOSTING OLEH Admin Utama',
          ),
          425 => 
          array (
            'no_jurnal' => 'JR20250819000002',
            'no_bukti' => '2025/08/19/000001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '10:04:40',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/08/19/000001 DIPOSTING OLEH Admin Utama',
          ),
          426 => 
          array (
            'no_jurnal' => 'JR20250819000003',
            'no_bukti' => '2025/08/19/000001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '10:45:12',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          427 => 
          array (
            'no_jurnal' => 'JR20250819000004',
            'no_bukti' => '2025/08/19/000001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '10:49:19',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          428 => 
          array (
            'no_jurnal' => 'JR20250819000005',
            'no_bukti' => '2025/08/19/000001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '10:49:39',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBERIAN OBAT RAWAT JALAN PASIEN 000022 RUDI SANTOSO OLEH Admin Utama',
          ),
          429 => 
          array (
            'no_jurnal' => 'JR20250819000006',
            'no_bukti' => '2025/08/19/000001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '10:49:41',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBERIAN OBAT RAWAT JALAN PASIEN 000022 RUDI SANTOSO OLEH Admin Utama',
          ),
          430 => 
          array (
            'no_jurnal' => 'JR20250819000007',
            'no_bukti' => '2025/08/19/000001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '10:50:08',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          431 => 
          array (
            'no_jurnal' => 'JR20250819000008',
            'no_bukti' => '2025/08/19/000001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '11:00:58',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          432 => 
          array (
            'no_jurnal' => 'JR20250819000009',
            'no_bukti' => '2025/08/19/000001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '11:04:05',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          433 => 
          array (
            'no_jurnal' => 'JR20250819000010',
            'no_bukti' => '2025/08/19/000001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '11:11:28',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT JALAN PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          434 => 
          array (
            'no_jurnal' => 'JR20250819000011',
            'no_bukti' => '2025/08/19/000001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '11:20:59',
            'jenis' => 'U',
            'keterangan' => 'OPERASI RAWAT JALAN PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          435 => 
          array (
            'no_jurnal' => 'JR20250819000012',
            'no_bukti' => '2025/08/19/000001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '11:26:48',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN PASIEN RAWAT JALAN 2025/08/19/000001 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          436 => 
          array (
            'no_jurnal' => 'JR20250819000013',
            'no_bukti' => '2025/08/19/000001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '11:27:57',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBAYARAN PASIEN RAWAT JALAN 2025/08/19/000001 000022 RUDI SANTOSO, DIBATALKAN OLEH Admin Utama',
          ),
          437 => 
          array (
            'no_jurnal' => 'JR20250819000014',
            'no_bukti' => '2025/08/19/000001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '11:28:20',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN PASIEN RAWAT JALAN 2025/08/19/000001 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          438 => 
          array (
            'no_jurnal' => 'JR20250819000015',
            'no_bukti' => 'PL20250819001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '11:29:54',
            'jenis' => 'U',
            'keterangan' => 'PEMASUKAN LAIN-LAIN OLEH Admin Utama',
          ),
          439 => 
          array (
            'no_jurnal' => 'JR20250819000016',
            'no_bukti' => '2025/08/19/000001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '11:30:40',
            'jenis' => 'U',
            'keterangan' => 'PEMBATALAN PEMBAYARAN PASIEN RAWAT JALAN 2025/08/19/000001 000022 RUDI SANTOSO, DIBATALKAN OLEH Admin Utama',
          ),
          440 => 
          array (
            'no_jurnal' => 'JR20250819000017',
            'no_bukti' => '2025/08/19/000001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '11:31:03',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT JALAN 2025/08/19/000001 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          441 => 
          array (
            'no_jurnal' => 'JR20250819000018',
            'no_bukti' => 'PD20250819001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '14:12:41',
            'jenis' => 'U',
            'keterangan' => 'PEMBELIAN BARANG DAPUR KERING & BASAH , OLEH Admin Utama',
          ),
          442 => 
          array (
            'no_jurnal' => 'JR20250819000019',
            'no_bukti' => 'SKD250819001',
            'tgl_jurnal' => '2025-08-19',
            'jam_jurnal' => '14:13:05',
            'jenis' => 'U',
            'keterangan' => 'PENGGUNAAN BARANG DAPUR KERING DAN BASAH, OLEH Admin Utama',
          ),
          443 => 
          array (
            'no_jurnal' => 'JR20250821000001',
            'no_bukti' => '2025/08/21/000001',
            'tgl_jurnal' => '2025-08-21',
            'jam_jurnal' => '14:37:24',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000022 RUDI SANTOSO (68 Th), DIPOSTING OLEH Admin Utama',
          ),
          444 => 
          array (
            'no_jurnal' => 'JR20250821000002',
            'no_bukti' => '2025/08/21/000001',
            'tgl_jurnal' => '2025-08-21',
            'jam_jurnal' => '14:46:40',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000022 RUDI SANTOSO (68 Th), DIPOSTING OLEH Admin Utama',
          ),
          445 => 
          array (
            'no_jurnal' => 'JR20250821000003',
            'no_bukti' => '2025/08/21/000001',
            'tgl_jurnal' => '2025-08-21',
            'jam_jurnal' => '14:50:48',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          446 => 
          array (
            'no_jurnal' => 'JR20250821000004',
            'no_bukti' => '2025/08/21/000001',
            'tgl_jurnal' => '2025-08-21',
            'jam_jurnal' => '14:54:21',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          447 => 
          array (
            'no_jurnal' => 'JR20250821000005',
            'no_bukti' => '2025/08/21/000001',
            'tgl_jurnal' => '2025-08-21',
            'jam_jurnal' => '14:55:56',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT JALAN PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          448 => 
          array (
            'no_jurnal' => 'JR20250821000006',
            'no_bukti' => '2025/08/21/000001',
            'tgl_jurnal' => '2025-08-21',
            'jam_jurnal' => '14:57:44',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT JALAN 2025/08/21/000001 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          449 => 
          array (
            'no_jurnal' => 'JR20250825000001',
            'no_bukti' => 'SKM20250825001',
            'tgl_jurnal' => '2025-08-25',
            'jam_jurnal' => '10:21:05',
            'jenis' => 'U',
            'keterangan' => 'STOK KELUAR BARANG MEDIS/OBAT/ALKES/BHP, OLEH Admin Utama',
          ),
          450 => 
          array (
            'no_jurnal' => 'JR20250825000002',
            'no_bukti' => 'PB20250825001',
            'tgl_jurnal' => '2025-08-25',
            'jam_jurnal' => '10:25:48',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI GUDANG, OLEH Admin Utama',
          ),
          451 => 
          array (
            'no_jurnal' => 'JR20250825000003',
            'no_bukti' => 'PB20250825002',
            'tgl_jurnal' => '2025-08-25',
            'jam_jurnal' => '10:28:18',
            'jenis' => 'U',
            'keterangan' => 'PENERIMAAN BARANG DI GUDANG, OLEH Admin Utama',
          ),
          452 => 
          array (
            'no_jurnal' => 'JR20250825000004',
            'no_bukti' => '0990',
            'tgl_jurnal' => '2025-08-25',
            'jam_jurnal' => '10:30:38',
            'jenis' => 'U',
            'keterangan' => 'BAYAR PELUNASAN HUTANG OBAT/BHP/ALKES NO.FAKTUR PB20250825001, OLEH Admin Utama',
          ),
          453 => 
          array (
            'no_jurnal' => 'JR20250825000005',
            'no_bukti' => '2025/08/25/000001',
            'tgl_jurnal' => '2025-08-25',
            'jam_jurnal' => '11:24:16',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000022 RUDI SANTOSO (68 Th), DIPOSTING OLEH Admin Utama',
          ),
          454 => 
          array (
            'no_jurnal' => 'JR20250825000006',
            'no_bukti' => '2025/08/25/000001',
            'tgl_jurnal' => '2025-08-25',
            'jam_jurnal' => '13:16:05',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 2025/08/25/000001 DIPOSTING OLEH Admin Utama',
          ),
          455 => 
          array (
            'no_jurnal' => 'JR20250825000007',
            'no_bukti' => '2025/08/25/000001',
            'tgl_jurnal' => '2025-08-25',
            'jam_jurnal' => '13:22:01',
            'jenis' => 'U',
            'keterangan' => 'TINDAKAN RAWAT JALAN PASIEN 000022 RUDI SANTOSO (68 Th), DIPOSTING OLEH Admin Utama',
          ),
          456 => 
          array (
            'no_jurnal' => 'JR20250825000008',
            'no_bukti' => '2025/08/25/000001',
            'tgl_jurnal' => '2025-08-25',
            'jam_jurnal' => '13:42:55',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          457 => 
          array (
            'no_jurnal' => 'JR20250825000009',
            'no_bukti' => '2025/08/25/000001',
            'tgl_jurnal' => '2025-08-25',
            'jam_jurnal' => '13:51:18',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT JALAN PASIEN 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          458 => 
          array (
            'no_jurnal' => 'JR20250825000010',
            'no_bukti' => '2025/08/25/000001',
            'tgl_jurnal' => '2025-08-25',
            'jam_jurnal' => '14:04:49',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN LABORAT RAWAT JALAN PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          459 => 
          array (
            'no_jurnal' => 'JR20250825000011',
            'no_bukti' => '2025/08/25/000001',
            'tgl_jurnal' => '2025-08-25',
            'jam_jurnal' => '14:10:27',
            'jenis' => 'U',
            'keterangan' => 'PEMERIKSAAN RADIOLOGI RAWAT JALAN PASIEN RUDI SANTOSO DIPOSTING OLEH Admin Utama',
          ),
          460 => 
          array (
            'no_jurnal' => 'JR20250825000012',
            'no_bukti' => '2025/08/25/000001',
            'tgl_jurnal' => '2025-08-25',
            'jam_jurnal' => '14:15:59',
            'jenis' => 'U',
            'keterangan' => 'PIUTANG PASIEN RAWAT JALAN 2025/08/25/000001 000022 RUDI SANTOSO, DIPOSTING OLEH Admin Utama',
          ),
          461 => 
          array (
            'no_jurnal' => 'JR20250825000013',
            'no_bukti' => 'PL20250825001',
            'tgl_jurnal' => '2025-08-25',
            'jam_jurnal' => '14:25:32',
            'jenis' => 'U',
            'keterangan' => 'PEMASUKAN LAIN-LAIN OLEH Admin Utama',
          ),
          462 => 
          array (
            'no_jurnal' => 'JR20250825000014',
            'no_bukti' => 'JMD20250825001',
            'tgl_jurnal' => '2025-08-25',
            'jam_jurnal' => '14:43:32',
            'jenis' => 'U',
            'keterangan' => 'PEMBAYARAN JASA MEDIS DOKTER D0000004 dr. Hilyatul Nadia, OLEH Admin Utama',
          ),
          463 => 
          array (
            'no_jurnal' => 'JR20250826000001',
            'no_bukti' => '2025/06/18/000001',
            'tgl_jurnal' => '2025-08-26',
            'jam_jurnal' => '09:22:23',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT INAP PASIEN 2025/06/18/000001 000003 HAFIZ HARIYADI, DIPOSTING OLEH Admin Utama',
          ),
          464 => 
          array (
            'no_jurnal' => 'JR20250826000002',
            'no_bukti' => '2025/06/18/000001',
            'tgl_jurnal' => '2025-08-26',
            'jam_jurnal' => '09:22:35',
            'jenis' => 'U',
            'keterangan' => 'PEMBERIAN OBAT RAWAT INAP PASIEN 2025/06/18/000001 000003 HAFIZ HARIYADI, DIPOSTING OLEH Admin Utama',
          ),
          465 => 
          array (
            'no_jurnal' => 'JR20251122000001',
            'no_bukti' => '2025/11/22/000001',
            'tgl_jurnal' => '2025-11-22',
            'jam_jurnal' => '19:51:00',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis tindakan Rawat Jalan no_rawat 2025/11/22/000001 (RM 000047)',
          ),
          466 => 
          array (
            'no_jurnal' => 'JR20251123000001',
            'no_bukti' => '2025/11/23/000001',
            'tgl_jurnal' => '2025-11-23',
            'jam_jurnal' => '21:20:30',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis tindakan Rawat Jalan no_rawat 2025/11/23/000001 (RM 000055)',
          ),
          467 => 
          array (
            'no_jurnal' => 'JR20251123000002',
            'no_bukti' => NULL,
            'tgl_jurnal' => '2025-11-23',
            'jam_jurnal' => '21:21:26',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis dari tampjurnal/tampjurnal2',
          ),
          468 => 
          array (
            'no_jurnal' => 'JR20251124000001',
            'no_bukti' => '2025/11/24/000001',
            'tgl_jurnal' => '2025-11-24',
            'jam_jurnal' => '00:56:23',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis tindakan Rawat Jalan no_rawat 2025/11/24/000001 (RM 000011)',
          ),
          469 => 
          array (
            'no_jurnal' => 'JR20251124000002',
            'no_bukti' => NULL,
            'tgl_jurnal' => '2025-11-24',
            'jam_jurnal' => '00:57:24',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis dari tampjurnal/tampjurnal2',
          ),
          470 => 
          array (
            'no_jurnal' => 'JR20251125000001',
            'no_bukti' => '2025/11/25/000001',
            'tgl_jurnal' => '2025-11-25',
            'jam_jurnal' => '09:53:58',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis tindakan Rawat Jalan no_rawat 2025/11/25/000001 (RM 000019)',
          ),
          471 => 
          array (
            'no_jurnal' => 'JR20251125000002',
            'no_bukti' => '2025/11/25/000001',
            'tgl_jurnal' => '2025-11-25',
            'jam_jurnal' => '12:55:16',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis tindakan Rawat Jalan no_rawat 2025/11/25/000001 (RM 000019)',
          ),
          472 => 
          array (
            'no_jurnal' => 'JR20251126000001',
            'no_bukti' => 'RJ-20251125-000001',
            'tgl_jurnal' => '2025-11-26',
            'jam_jurnal' => '09:23:48',
            'jenis' => 'P',
            'keterangan' => 'Posting pembayaran Ralan 2025/11/25/000001',
          ),
          473 => 
          array (
            'no_jurnal' => 'JR20251126000002',
            'no_bukti' => 'RJ-20251125-000001-PPN',
            'tgl_jurnal' => '2025-11-26',
            'jam_jurnal' => '09:25:02',
            'jenis' => 'P',
            'keterangan' => 'Posting Ralan + PPN 11% 2025/11/25/000001',
          ),
          474 => 
          array (
            'no_jurnal' => 'JR20251126000003',
            'no_bukti' => 'RI-20250819-000002',
            'tgl_jurnal' => '2025-11-26',
            'jam_jurnal' => '09:29:51',
            'jenis' => 'P',
            'keterangan' => 'Posting Ranap 2025/08/19/000002',
          ),
          475 => 
          array (
            'no_jurnal' => 'JR20251126000004',
            'no_bukti' => 'FB-20251124-000001',
            'tgl_jurnal' => '2025-11-26',
            'jam_jurnal' => '09:31:54',
            'jenis' => 'P',
            'keterangan' => 'Posting Fallback 43 2025/11/24/000001',
          ),
          476 => 
          array (
            'no_jurnal' => 'JR20251126000005',
            'no_bukti' => 'RJ-20251125-000001',
            'tgl_jurnal' => '2025-11-26',
            'jam_jurnal' => '09:35:33',
            'jenis' => 'P',
            'keterangan' => 'Posting Ralan 2025/11/25/000001 (bayar 1, piutang 359,999)',
          ),
          477 => 
          array (
            'no_jurnal' => 'JR20251127000001',
            'no_bukti' => '2025/11/27/000001',
            'tgl_jurnal' => '2025-11-27',
            'jam_jurnal' => '09:26:07',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis tindakan Rawat Jalan no_rawat 2025/11/27/000001 (RM 000047)',
          ),
          478 => 
          array (
            'no_jurnal' => 'JR20251127000002',
            'no_bukti' => NULL,
            'tgl_jurnal' => '2025-11-27',
            'jam_jurnal' => '09:27:07',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis dari tampjurnal/tampjurnal2',
          ),
          479 => 
          array (
            'no_jurnal' => 'JR20251128000001',
            'no_bukti' => '2025/11/28/000001',
            'tgl_jurnal' => '2025-11-28',
            'jam_jurnal' => '00:37:10',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis tindakan Rawat Jalan no_rawat 2025/11/28/000001 (RM 000054)',
          ),
          480 => 
          array (
            'no_jurnal' => 'JR20251128000002',
            'no_bukti' => NULL,
            'tgl_jurnal' => '2025-11-28',
            'jam_jurnal' => '00:38:06',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis dari tampjurnal/tampjurnal2',
          ),
          481 => 
          array (
            'no_jurnal' => 'JR20251128000003',
            'no_bukti' => 'PL202511280003',
            'tgl_jurnal' => '2025-11-28',
            'jam_jurnal' => '00:47:14',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis permintaan Laboratorium noorder PL202511280003 (no_rawat 2025/11/28/000001)',
          ),
          482 => 
          array (
            'no_jurnal' => 'JR20251130000001',
            'no_bukti' => '2025/11/30/000002',
            'tgl_jurnal' => '2025-11-30',
            'jam_jurnal' => '22:33:36',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis tindakan Rawat Jalan no_rawat 2025/11/30/000002 (RM 000011)',
          ),
          483 => 
          array (
            'no_jurnal' => 'JR20251130000002',
            'no_bukti' => NULL,
            'tgl_jurnal' => '2025-11-30',
            'jam_jurnal' => '22:39:33',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis dari tampjurnal/tampjurnal2',
          ),
          484 => 
          array (
            'no_jurnal' => 'JR20251130000003',
            'no_bukti' => 'PL202511300001',
            'tgl_jurnal' => '2025-11-30',
            'jam_jurnal' => '22:43:57',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis permintaan Laboratorium noorder PL202511300001 (no_rawat 2025/11/30/000002)',
          ),
          485 => 
          array (
            'no_jurnal' => 'JR20251201000001',
            'no_bukti' => '2025/12/01/000001',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '01:14:23',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis tindakan Rawat Jalan no_rawat 2025/12/01/000001 (RM 000022)',
          ),
          486 => 
          array (
            'no_jurnal' => 'JR20251201000002',
            'no_bukti' => NULL,
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '01:15:31',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis dari tampjurnal/tampjurnal2',
          ),
          487 => 
          array (
            'no_jurnal' => 'JR20251201000003',
            'no_bukti' => 'PL202512010001',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '01:16:20',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis permintaan Laboratorium noorder PL202512010001 (no_rawat 2025/12/01/000001)',
          ),
          488 => 
          array (
            'no_jurnal' => 'JR20251201000004',
            'no_bukti' => NULL,
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '09:36:28',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis dari tampjurnal/tampjurnal2',
          ),
          489 => 
          array (
            'no_jurnal' => 'JR20251201000005',
            'no_bukti' => '2025/12/01/000002',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '10:21:38',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis tindakan Rawat Jalan no_rawat 2025/12/01/000002 (RM 000019)',
          ),
          490 => 
          array (
            'no_jurnal' => 'JR20251201000006',
            'no_bukti' => NULL,
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '10:22:28',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis dari tampjurnal/tampjurnal2',
          ),
          491 => 
          array (
            'no_jurnal' => 'JR20251201000007',
            'no_bukti' => 'PL202512010002',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '10:23:07',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis permintaan Laboratorium noorder PL202512010002 (no_rawat 2025/12/01/000002)',
          ),
          492 => 
          array (
            'no_jurnal' => 'JR20251201000008',
            'no_bukti' => 'PL202512010003',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '10:23:46',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis permintaan Laboratorium noorder PL202512010003 (no_rawat 2025/12/01/000002)',
          ),
          493 => 
          array (
            'no_jurnal' => 'JR20251201000009',
            'no_bukti' => '2025/12/01/RJ0001',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '11:48:58',
            'jenis' => 'U',
            'keterangan' => 'Posting otomatis Billing 2025/12/01/000002',
          ),
          494 => 
          array (
            'no_jurnal' => 'JR20251201000010',
            'no_bukti' => '2025/12/01/000003',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '12:32:09',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis tindakan Rawat Jalan no_rawat 2025/12/01/000003 (RM 000050)',
          ),
          495 => 
          array (
            'no_jurnal' => 'JR20251201000011',
            'no_bukti' => NULL,
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '12:34:15',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis dari tampjurnal/tampjurnal2',
          ),
          496 => 
          array (
            'no_jurnal' => 'JR20251201000012',
            'no_bukti' => 'PL202512010004',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '12:35:54',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis permintaan Laboratorium noorder PL202512010004 (no_rawat 2025/12/01/000003)',
          ),
          497 => 
          array (
            'no_jurnal' => 'JR20251201000013',
            'no_bukti' => '2025/12/01/RJ0001',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '12:47:29',
            'jenis' => 'U',
            'keterangan' => 'Posting otomatis Billing 2025/12/01/000003',
          ),
          498 => 
          array (
            'no_jurnal' => 'JR20251201000014',
            'no_bukti' => '2025/12/01/RJ0001',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '21:30:40',
            'jenis' => 'U',
            'keterangan' => 'Posting otomatis Billing 2025/12/01/000003',
          ),
          499 => 
          array (
            'no_jurnal' => 'JR20251201000015',
            'no_bukti' => '2025/12/01/000004',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '22:08:12',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis tindakan Rawat Jalan no_rawat 2025/12/01/000004 (RM 000013)',
          ),
        ));
        DB::table('jurnal')->insert(array (
          0 => 
          array (
            'no_jurnal' => 'JR20251201000016',
            'no_bukti' => NULL,
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '22:09:39',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis dari tampjurnal/tampjurnal2',
          ),
          1 => 
          array (
            'no_jurnal' => 'JR20251201000017',
            'no_bukti' => 'PL202512010005',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '22:16:23',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis permintaan Laboratorium noorder PL202512010005 (no_rawat 2025/12/01/000004)',
          ),
          2 => 
          array (
            'no_jurnal' => 'JR20251201000018',
            'no_bukti' => '2025/12/01/000005',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '22:45:30',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis tindakan Rawat Jalan no_rawat 2025/12/01/000005 (RM 000011)',
          ),
          3 => 
          array (
            'no_jurnal' => 'JR20251201000019',
            'no_bukti' => NULL,
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '22:46:28',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis dari tampjurnal/tampjurnal2',
          ),
          4 => 
          array (
            'no_jurnal' => 'JR20251201000020',
            'no_bukti' => 'PL202512010006',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '22:47:24',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis permintaan Laboratorium noorder PL202512010006 (no_rawat 2025/12/01/000005)',
          ),
          5 => 
          array (
            'no_jurnal' => 'JR20251201000021',
            'no_bukti' => 'BILL-2025/12/01/000005',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '23:09:51',
            'jenis' => 'U',
            'keterangan' => 'Posting otomatis Snapshot via terminal 2025/12/01/000005',
          ),
          6 => 
          array (
            'no_jurnal' => 'JR20251201000022',
            'no_bukti' => '2025/12/01/000006',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '23:22:13',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis tindakan Rawat Jalan no_rawat 2025/12/01/000006 (RM 000048)',
          ),
          7 => 
          array (
            'no_jurnal' => 'JR20251201000023',
            'no_bukti' => NULL,
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '23:22:44',
            'jenis' => 'P',
            'keterangan' => 'Posting otomatis dari tampjurnal/tampjurnal2',
          ),
          8 => 
          array (
            'no_jurnal' => 'JR20251201000024',
            'no_bukti' => '2025/12/01/RJ0004',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '23:25:03',
            'jenis' => 'U',
            'keterangan' => 'Posting otomatis Billing 2025/12/01/000006',
          ),
          9 => 
          array (
            'no_jurnal' => 'JR20251201000025',
            'no_bukti' => 'CLOSING-2025-2025-12-01',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '00:20:15',
            'jenis' => '',
            'keterangan' => 'Jurnal penutup otomatis',
          ),
          10 => 
          array (
            'no_jurnal' => 'JR20251201000026',
            'no_bukti' => 'CLOSING-2025-FY',
            'tgl_jurnal' => '2025-12-01',
            'jam_jurnal' => '00:27:53',
            'jenis' => '',
            'keterangan' => 'Jurnal penutup otomatis',
          ),
          11 => 
          array (
            'no_jurnal' => 'JR20251203000001',
            'no_bukti' => 'PB-20251203-002',
            'tgl_jurnal' => '2025-12-03',
            'jam_jurnal' => '20:44:35',
            'jenis' => 'P',
            'keterangan' => 'Posting Pembelian Test',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}