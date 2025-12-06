<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RekeningTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('rekening')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('rekening')->insert(array (
          0 => 
          array (
            'kd_rek' => '1',
            'nm_rek' => 'ASET',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '0',
          ),
          1 => 
          array (
            'kd_rek' => '100-01',
            'nm_rek' => 'Kas Umum',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '0',
          ),
          2 => 
          array (
            'kd_rek' => '100-02',
            'nm_rek' => 'Kas Kecil',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '0',
          ),
          3 => 
          array (
            'kd_rek' => '101-01',
            'nm_rek' => 'Bank Mandiri',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '0',
          ),
          4 => 
          array (
            'kd_rek' => '101-02',
            'nm_rek' => 'Bank BRI',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '0',
          ),
          5 => 
          array (
            'kd_rek' => '11',
            'nm_rek' => 'ASET LANCAR',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          6 => 
          array (
            'kd_rek' => '110-01',
            'nm_rek' => 'Piutang Usaha',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '0',
          ),
          7 => 
          array (
            'kd_rek' => '1110',
            'nm_rek' => 'KAS',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          8 => 
          array (
            'kd_rek' => '111010',
            'nm_rek' => 'KAS KASIR',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          9 => 
          array (
            'kd_rek' => '111020',
            'nm_rek' => 'KAS BENDAHARA',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          10 => 
          array (
            'kd_rek' => '1110201',
            'nm_rek' => 'KAS BENDAHARA BLUD',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          11 => 
          array (
            'kd_rek' => '1110202',
            'nm_rek' => 'KAS BENDAHARA PEMBANTU',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          12 => 
          array (
            'kd_rek' => '111030',
            'nm_rek' => 'KAS KECIL',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          13 => 
          array (
            'kd_rek' => '111031',
            'nm_rek' => 'KASBON',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          14 => 
          array (
            'kd_rek' => '111032',
            'nm_rek' => 'UTANG SEK',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          15 => 
          array (
            'kd_rek' => '1120',
            'nm_rek' => 'BANK',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          16 => 
          array (
            'kd_rek' => '112010',
            'nm_rek' => 'BANK MANDIRI',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          17 => 
          array (
            'kd_rek' => '112020',
            'nm_rek' => 'BANK CENTRAL ASIA',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          18 => 
          array (
            'kd_rek' => '112030',
            'nm_rek' => 'BANK SYARIAH MANDIRI',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          19 => 
          array (
            'kd_rek' => '112040',
            'nm_rek' => 'BANK DANAMON',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          20 => 
          array (
            'kd_rek' => '112050',
            'nm_rek' => 'BANK RAKYAT INDONESIA',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          21 => 
          array (
            'kd_rek' => '112060',
            'nm_rek' => 'BANK BRI',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          22 => 
          array (
            'kd_rek' => '112061',
            'nm_rek' => 'BRI VIRTUAL ACCOUNT',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          23 => 
          array (
            'kd_rek' => '112070',
            'nm_rek' => 'BANK DKI',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          24 => 
          array (
            'kd_rek' => '112080',
            'nm_rek' => 'BANK BCA',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          25 => 
          array (
            'kd_rek' => '112090',
            'nm_rek' => 'BANK BNI',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          26 => 
          array (
            'kd_rek' => '112091',
            'nm_rek' => 'BANK JATENG',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          27 => 
          array (
            'kd_rek' => '112092',
            'nm_rek' => 'BANK PAPUA',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          28 => 
          array (
            'kd_rek' => '112093',
            'nm_rek' => 'BANK BJB',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          29 => 
          array (
            'kd_rek' => '112094',
            'nm_rek' => 'BANK NAGARI',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          30 => 
          array (
            'kd_rek' => '112095',
            'nm_rek' => 'BANK KALTENG',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          31 => 
          array (
            'kd_rek' => '1150',
            'nm_rek' => 'PERSEDIAAN',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          32 => 
          array (
            'kd_rek' => '115010',
            'nm_rek' => 'PERSEDIAAN BARANG MEDIS/OBAT/BHP ',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          33 => 
          array (
            'kd_rek' => '115020',
            'nm_rek' => 'PERSEDIAAN BARANG NON MEDIS',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          34 => 
          array (
            'kd_rek' => '115030',
            'nm_rek' => 'PERSEDIAAN BARANG MEDIS/OBAT/BHP KAMAR OPERASI ',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          35 => 
          array (
            'kd_rek' => '115040',
            'nm_rek' => 'PERSEDIAAN BHP LABORATORIUM',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          36 => 
          array (
            'kd_rek' => '115050',
            'nm_rek' => 'PERSEDIAAN BHP RADIOLOGI',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          37 => 
          array (
            'kd_rek' => '115060',
            'nm_rek' => 'PERSEDIAAN BARANG TOKO',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          38 => 
          array (
            'kd_rek' => '115070',
            'nm_rek' => 'PERSEDIAAN BARANG DAPUR',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          39 => 
          array (
            'kd_rek' => '1160',
            'nm_rek' => 'UANG MUKA',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          40 => 
          array (
            'kd_rek' => '116010',
            'nm_rek' => 'UANG MUKA PAJAK',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          41 => 
          array (
            'kd_rek' => '116011',
            'nm_rek' => 'PPN MASUKAN/UANG MUKA PPN',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          42 => 
          array (
            'kd_rek' => '116020',
            'nm_rek' => 'UANG MUKA JAMINAN',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          43 => 
          array (
            'kd_rek' => '116030',
            'nm_rek' => 'UANG MUKA DEVIDEN',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          44 => 
          array (
            'kd_rek' => '116040',
            'nm_rek' => 'UANG MUKA PEMBELIAN',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          45 => 
          array (
            'kd_rek' => '116050',
            'nm_rek' => 'PPN KELUARAN',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          46 => 
          array (
            'kd_rek' => '1170',
            'nm_rek' => 'PIUTANG',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          47 => 
          array (
            'kd_rek' => '117000',
            'nm_rek' => 'PIUTANG OBAT & BHP',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          48 => 
          array (
            'kd_rek' => '117001',
            'nm_rek' => 'PIUTANG PASIEN RAWAT JALAN',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          49 => 
          array (
            'kd_rek' => '117002',
            'nm_rek' => 'PIUTANG PASIEN RAWAT INAP',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          50 => 
          array (
            'kd_rek' => '117003',
            'nm_rek' => 'PIUTANG BPJS',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          51 => 
          array (
            'kd_rek' => '117004',
            'nm_rek' => 'SUSPEN PIUTANG',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          52 => 
          array (
            'kd_rek' => '117005',
            'nm_rek' => 'PIUTANG MANDIRI INHEALTH',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          53 => 
          array (
            'kd_rek' => '117006',
            'nm_rek' => 'PIUTANG ADMEDIKA',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          54 => 
          array (
            'kd_rek' => '117007',
            'nm_rek' => 'PIUTANG JAMINAN KOTA BOGOR',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          55 => 
          array (
            'kd_rek' => '117008',
            'nm_rek' => 'PIUTANG ANGGOTA DPR YANG TIDAK AKAN DIBAYAR',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          56 => 
          array (
            'kd_rek' => '117009',
            'nm_rek' => 'PIUTANG KARYAWAN RUMAH SAKIT',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          57 => 
          array (
            'kd_rek' => '117010',
            'nm_rek' => 'PIUTANG TOKO',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          58 => 
          array (
            'kd_rek' => '117011',
            'nm_rek' => 'PIUTANG/PINJAMAN KE PERUSAHAAN LAIN',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          59 => 
          array (
            'kd_rek' => '117012',
            'nm_rek' => 'PIUTANG DINAS SOSIAL',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          60 => 
          array (
            'kd_rek' => '117013',
            'nm_rek' => 'PIUTANG JASA RAHARJA',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          61 => 
          array (
            'kd_rek' => '117014',
            'nm_rek' => 'PIUTANG PT KAI',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          62 => 
          array (
            'kd_rek' => '117015',
            'nm_rek' => 'PIUTANG AXA MEDIKA',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          63 => 
          array (
            'kd_rek' => '117016',
            'nm_rek' => 'PIUTANG PLN',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          64 => 
          array (
            'kd_rek' => '117017',
            'nm_rek' => 'PIUTANG JASA',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          65 => 
          array (
            'kd_rek' => '12',
            'nm_rek' => 'ASET TIDAK LANCAR',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          66 => 
          array (
            'kd_rek' => '1230',
            'nm_rek' => 'AKTIVA TETAP',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          67 => 
          array (
            'kd_rek' => '123101',
            'nm_rek' => 'TANAH',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          68 => 
          array (
            'kd_rek' => '123102',
            'nm_rek' => 'BANGUNAN',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          69 => 
          array (
            'kd_rek' => '123103',
            'nm_rek' => 'PERALATAN MEDIS',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          70 => 
          array (
            'kd_rek' => '123104',
            'nm_rek' => 'PERALATAN KANTOR',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          71 => 
          array (
            'kd_rek' => '123105',
            'nm_rek' => 'LINEN',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '1',
          ),
          72 => 
          array (
            'kd_rek' => '127-01',
            'nm_rek' => 'PPN Masukan',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '0',
          ),
          73 => 
          array (
            'kd_rek' => '140-01',
            'nm_rek' => 'Persediaan Obat',
            'tipe' => 'N',
            'balance' => 'D',
            'level' => '0',
          ),
          74 => 
          array (
            'kd_rek' => '2',
            'nm_rek' => 'LEABILITAS',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '0',
          ),
          75 => 
          array (
            'kd_rek' => '21',
            'nm_rek' => 'LIABILITAS JANGKA PENDEK',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          76 => 
          array (
            'kd_rek' => '210-01',
            'nm_rek' => 'Hutang Usaha',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '0',
          ),
          77 => 
          array (
            'kd_rek' => '2110',
            'nm_rek' => 'UTANG USAHA',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          78 => 
          array (
            'kd_rek' => '211010',
            'nm_rek' => 'UTANG BARANG MEDIS/OBAT/BHP',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          79 => 
          array (
            'kd_rek' => '211020',
            'nm_rek' => 'UTANG JASA MEDIK DOKTER TINDAKAN RAWAT JALAN',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          80 => 
          array (
            'kd_rek' => '211030',
            'nm_rek' => 'UTANG JASA MEDIK PARAMEDIS TINDAKAN RAWAT JALAN',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          81 => 
          array (
            'kd_rek' => '211040',
            'nm_rek' => 'UTANG JASA MEDIK DOKTER LABORATORIUM RAWAT JALAN',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          82 => 
          array (
            'kd_rek' => '211041',
            'nm_rek' => 'UTANG JASA MEDIK DOKTER LABORATORIUM RAWAT INAP',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          83 => 
          array (
            'kd_rek' => '211050',
            'nm_rek' => 'UTANG JASA MEDIK PETUGAS LABORATORIUM RAWAT JALAN',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          84 => 
          array (
            'kd_rek' => '211051',
            'nm_rek' => 'UTANG JASA MEDIK PETUGAS LABORATORIUM RAWAT INAP',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          85 => 
          array (
            'kd_rek' => '211070',
            'nm_rek' => 'UTANG JASA MEDIK DOKTER RADIOLOGI RAWAT JALAN',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          86 => 
          array (
            'kd_rek' => '211080',
            'nm_rek' => 'UTANG JASA MEDIK PETUGAS RADIOLOGI RAWAT JALAN',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          87 => 
          array (
            'kd_rek' => '211100',
            'nm_rek' => 'UTANG JASA MEDIK DOKTER OPERASI RAWAT JALAN',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          88 => 
          array (
            'kd_rek' => '211101',
            'nm_rek' => 'UTANG JASA MEDIK DOKTER OPERASI RAWAT INAP',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          89 => 
          array (
            'kd_rek' => '211102',
            'nm_rek' => 'BIAYA YANG MASIH HARUS DIBAYAR',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          90 => 
          array (
            'kd_rek' => '211110',
            'nm_rek' => 'UTANG JASA MEDIK PARAMEDIS OPERASI RAWAT JALAN',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          91 => 
          array (
            'kd_rek' => '211111',
            'nm_rek' => 'UTANG JASA MEDIK PARAMEDIS OPERASI RAWAT INAP',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          92 => 
          array (
            'kd_rek' => '211120',
            'nm_rek' => 'UTANG JASA MEDIK DOKTER TINDAKAN RAWAT INAP',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          93 => 
          array (
            'kd_rek' => '211130',
            'nm_rek' => 'UTANG JASA MEDIK PARAMEDIS TINDAKAN RAWAT INAP',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          94 => 
          array (
            'kd_rek' => '211131',
            'nm_rek' => 'UTANG PAJAK',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          95 => 
          array (
            'kd_rek' => '211132',
            'nm_rek' => 'UTANG JASA SARANA RAWAT JALAN',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          96 => 
          array (
            'kd_rek' => '211133',
            'nm_rek' => 'UTANG JASA MENEJEMEN RAWAT JALAN',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          97 => 
          array (
            'kd_rek' => '211140',
            'nm_rek' => 'UTANG KSO TINDAKAN RAWAT JALAN',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          98 => 
          array (
            'kd_rek' => '211150',
            'nm_rek' => 'UTANG KSO LABORATORIUM RAWAT JALAN',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          99 => 
          array (
            'kd_rek' => '211160',
            'nm_rek' => 'UTANG KSO RADIOLOGI RAWAT JALAN',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          100 => 
          array (
            'kd_rek' => '211161',
            'nm_rek' => 'UTANG KSO RADIOLOGI RAWAT INAP',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          101 => 
          array (
            'kd_rek' => '211170',
            'nm_rek' => 'UTANG KSO TINDAKAN RAWAT INAP',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          102 => 
          array (
            'kd_rek' => '211180',
            'nm_rek' => 'UTANG KSO LABORATORIUM RAWAT INAP',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          103 => 
          array (
            'kd_rek' => '211190',
            'nm_rek' => 'UTANG JASA MEDIK DOKTER RADIOLOGI RAWAT INAP',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          104 => 
          array (
            'kd_rek' => '211200',
            'nm_rek' => 'UTANG JASA MEDIK PETUGAS RADIOLOGI RAWAT INAP',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          105 => 
          array (
            'kd_rek' => '211210',
            'nm_rek' => 'UTANG BARANG NON MEDIS/PENUNJANG',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          106 => 
          array (
            'kd_rek' => '211211',
            'nm_rek' => 'UTANG JASA SARANA RAWAT INAP',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          107 => 
          array (
            'kd_rek' => '211212',
            'nm_rek' => 'UTANG JASA MENEJEMEN RAWAT INAP',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          108 => 
          array (
            'kd_rek' => '211213',
            'nm_rek' => 'UTANG BARANG TOKO',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          109 => 
          array (
            'kd_rek' => '211214',
            'nm_rek' => 'UTANG JASA SARANA LABORAT',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          110 => 
          array (
            'kd_rek' => '211215',
            'nm_rek' => 'UTANG JASA SARANA RADIOLOGI',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          111 => 
          array (
            'kd_rek' => '211216',
            'nm_rek' => 'UTANG JASA MENEJEMEN LABORAT',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          112 => 
          array (
            'kd_rek' => '211217',
            'nm_rek' => 'UTANG JASA MENEJEMEN RADIOLOGI',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          113 => 
          array (
            'kd_rek' => '211218',
            'nm_rek' => 'UTANG BARANG ASET/INVENTARIS',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          114 => 
          array (
            'kd_rek' => '211219',
            'nm_rek' => 'UTANG BARANG DAPUR',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          115 => 
          array (
            'kd_rek' => '211220',
            'nm_rek' => 'UTANG USAHA LAIN',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '1',
          ),
          116 => 
          array (
            'kd_rek' => '217-01',
            'nm_rek' => 'PPN Keluaran',
            'tipe' => 'N',
            'balance' => 'K',
            'level' => '0',
          ),
          117 => 
          array (
            'kd_rek' => '3',
            'nm_rek' => 'EKUITAS',
            'tipe' => 'M',
            'balance' => 'K',
            'level' => '0',
          ),
          118 => 
          array (
            'kd_rek' => '310000',
            'nm_rek' => 'MODAL',
            'tipe' => 'M',
            'balance' => 'K',
            'level' => '1',
          ),
          119 => 
          array (
            'kd_rek' => '4',
            'nm_rek' => 'PENDAPATAN',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '0',
          ),
          120 => 
          array (
            'kd_rek' => '41',
            'nm_rek' => 'PENDAPATAN RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          121 => 
          array (
            'kd_rek' => '410-01',
            'nm_rek' => 'Penjualan Obat',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '0',
          ),
          122 => 
          array (
            'kd_rek' => '410105',
            'nm_rek' => 'PENDAPATAN TINDAKAN RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          123 => 
          array (
            'kd_rek' => '410109',
            'nm_rek' => 'PENDAPATAN LABORAT RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          124 => 
          array (
            'kd_rek' => '410110',
            'nm_rek' => 'PENDAPATAN RADIOLOGI RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          125 => 
          array (
            'kd_rek' => '410111',
            'nm_rek' => 'PENDAPATAN OBAT RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          126 => 
          array (
            'kd_rek' => '410112',
            'nm_rek' => 'PENDAPATAN REGISTRASI RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          127 => 
          array (
            'kd_rek' => '410113',
            'nm_rek' => 'PENDAPATAN TAMBAHAN BIAYA RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          128 => 
          array (
            'kd_rek' => '410114',
            'nm_rek' => 'PENDAPATAN RESEP PULANG RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          129 => 
          array (
            'kd_rek' => '410115',
            'nm_rek' => 'PENDAPATAN SEWA KAMAR RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          130 => 
          array (
            'kd_rek' => '410116',
            'nm_rek' => 'PENDAPATAN TINDAKAN OPERASI RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          131 => 
          array (
            'kd_rek' => '410117',
            'nm_rek' => 'PENDAPATAN HARIAN KAMAR RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          132 => 
          array (
            'kd_rek' => '410119',
            'nm_rek' => 'PENDAPATAN BIAYA SERVICE RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          133 => 
          array (
            'kd_rek' => '410120',
            'nm_rek' => 'UANG MUKA RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          134 => 
          array (
            'kd_rek' => '42',
            'nm_rek' => 'PENDAPATAN RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          135 => 
          array (
            'kd_rek' => '420100',
            'nm_rek' => 'PENDAPATAN TINDAKAN RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          136 => 
          array (
            'kd_rek' => '420101',
            'nm_rek' => 'PENDAPATAN REGISTRASI RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          137 => 
          array (
            'kd_rek' => '420102',
            'nm_rek' => 'PENDAPATAN TAMBAHAN BIAYA RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          138 => 
          array (
            'kd_rek' => '420103',
            'nm_rek' => 'PENDAPATAN TINDAKAN OPERASI RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          139 => 
          array (
            'kd_rek' => '420104',
            'nm_rek' => 'PENDAPATAN UANG MUKA RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          140 => 
          array (
            'kd_rek' => '420106',
            'nm_rek' => 'PENDAPATAN LABORAT RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          141 => 
          array (
            'kd_rek' => '420107',
            'nm_rek' => 'PENDAPATAN RADIOLOGI RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          142 => 
          array (
            'kd_rek' => '420108',
            'nm_rek' => 'PENDAPATAN OBAT RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          143 => 
          array (
            'kd_rek' => '420109',
            'nm_rek' => 'PENDAPATAN NAIK KELAS PASIEN',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          144 => 
          array (
            'kd_rek' => '43',
            'nm_rek' => 'OPERASIONAL LAIN',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          145 => 
          array (
            'kd_rek' => '430100',
            'nm_rek' => 'PENDAPATAN PARKIR',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          146 => 
          array (
            'kd_rek' => '430101',
            'nm_rek' => 'PENDAPATAN PENGURUSAN AKTE',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          147 => 
          array (
            'kd_rek' => '430102',
            'nm_rek' => 'PENDAPATAN APOTEK UMUM/JUAL BEBAS OBAT & BHP',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          148 => 
          array (
            'kd_rek' => '430103',
            'nm_rek' => 'PENYERAHAN DARAH',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          149 => 
          array (
            'kd_rek' => '430104',
            'nm_rek' => 'PEMBAYARAN PIUTANG',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          150 => 
          array (
            'kd_rek' => '430105',
            'nm_rek' => 'POTONGAN PEMBELIAN',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          151 => 
          array (
            'kd_rek' => '430106',
            'nm_rek' => 'RETUR PEMBELIAN/PENGADAAN OBAT & BHP',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          152 => 
          array (
            'kd_rek' => '430107',
            'nm_rek' => 'PENDAPATAN LAIN-LAIN',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          153 => 
          array (
            'kd_rek' => '430108',
            'nm_rek' => 'PENDAPATAN HIBAH',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          154 => 
          array (
            'kd_rek' => '430109',
            'nm_rek' => 'PENDAPATAN AMBULANCE',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          155 => 
          array (
            'kd_rek' => '430110',
            'nm_rek' => 'PENJUALAN BARANG TOKO',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          156 => 
          array (
            'kd_rek' => '430111',
            'nm_rek' => 'PENDAPATAN LEBIH BAYAR KLAIM BPJS',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          157 => 
          array (
            'kd_rek' => '430112',
            'nm_rek' => 'PENDAPATAN ZAKAT',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          158 => 
          array (
            'kd_rek' => '430113',
            'nm_rek' => 'PENDAPATAN LEBIH BAYAR PIUTANG',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          159 => 
          array (
            'kd_rek' => '430114',
            'nm_rek' => 'PENDAPATAN JASA',
            'tipe' => 'R',
            'balance' => 'K',
            'level' => '1',
          ),
          160 => 
          array (
            'kd_rek' => '5',
            'nm_rek' => 'BIAYA OPERASIONAL LANGSUNG',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '0',
          ),
          161 => 
          array (
            'kd_rek' => '51',
            'nm_rek' => 'BEBAN RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          162 => 
          array (
            'kd_rek' => '510-01',
            'nm_rek' => 'HPP Obat',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '0',
          ),
          163 => 
          array (
            'kd_rek' => '5101',
            'nm_rek' => 'BEBAN KSO RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          164 => 
          array (
            'kd_rek' => '510102',
            'nm_rek' => 'BEBAN KSO TINDAKAN RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          165 => 
          array (
            'kd_rek' => '510106',
            'nm_rek' => 'BEBAN KSO LABORATORIUM RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          166 => 
          array (
            'kd_rek' => '510109',
            'nm_rek' => 'BEBAN KSO RADIOLOGI RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          167 => 
          array (
            'kd_rek' => '5102',
            'nm_rek' => 'BEBAN JASA MEDIS RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          168 => 
          array (
            'kd_rek' => '510200',
            'nm_rek' => 'BEBAN JASA MEDIK DOKTER TINDAKAN RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          169 => 
          array (
            'kd_rek' => '510201',
            'nm_rek' => 'BEBAN JASA MEDIK PARAMEDIS TINDAKAN RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          170 => 
          array (
            'kd_rek' => '510202',
            'nm_rek' => 'BEBAN JASA MEDIK DOKTER LABORATORIUM RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          171 => 
          array (
            'kd_rek' => '510203',
            'nm_rek' => 'BEBAN JASA MEDIK PETUGAS LABORATORIUM RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          172 => 
          array (
            'kd_rek' => '510204',
            'nm_rek' => 'BEBAN JASA MEDIK DOKTER RADIOLOGI RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          173 => 
          array (
            'kd_rek' => '510205',
            'nm_rek' => 'BEBAN JASA MEDIK PETUGAS RADIOLOGI RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          174 => 
          array (
            'kd_rek' => '510206',
            'nm_rek' => 'BEBAN JASA MEDIK DOKTER OPERASI RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          175 => 
          array (
            'kd_rek' => '510207',
            'nm_rek' => 'BEBAN JASA MEDIK PARAMEDIS OPERASI RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          176 => 
          array (
            'kd_rek' => '5103',
            'nm_rek' => 'BEBAN LAIN-LAIN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          177 => 
          array (
            'kd_rek' => '510301',
            'nm_rek' => 'BEBAN JASA SARANA RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          178 => 
          array (
            'kd_rek' => '510302',
            'nm_rek' => 'BEBAN JASA MENEJEMEN RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          179 => 
          array (
            'kd_rek' => '52',
            'nm_rek' => 'BEBAN RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          180 => 
          array (
            'kd_rek' => '5201',
            'nm_rek' => 'BEBAN KSO RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          181 => 
          array (
            'kd_rek' => '520100',
            'nm_rek' => 'BEBAN KSO TINDAKAN RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          182 => 
          array (
            'kd_rek' => '520101',
            'nm_rek' => 'BEBAN KSO LABORATORIUM RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          183 => 
          array (
            'kd_rek' => '520102',
            'nm_rek' => 'BEBAN KSO RADIOLOGI RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          184 => 
          array (
            'kd_rek' => '5202',
            'nm_rek' => 'BEBAN JASSA MEDIK RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          185 => 
          array (
            'kd_rek' => '520200',
            'nm_rek' => 'BEBAN JASA MEDIK DOKTER TINDAKAN RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          186 => 
          array (
            'kd_rek' => '520201',
            'nm_rek' => 'BEBAN JASA MEDIK PARAMEDIS TINDAKAN RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          187 => 
          array (
            'kd_rek' => '520202',
            'nm_rek' => 'BEBAN JASA MEDIK DOKTER LABORATORIUM RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          188 => 
          array (
            'kd_rek' => '520203',
            'nm_rek' => 'BEBAN JASA MEDIK PETUGAS LABORATORIUM RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          189 => 
          array (
            'kd_rek' => '520204',
            'nm_rek' => 'BEBAN JASA MEDIK DOKTER RADIOLOGI RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          190 => 
          array (
            'kd_rek' => '520205',
            'nm_rek' => 'BEBAN JASA MEDIK PETUGAS RADIOLOGI RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          191 => 
          array (
            'kd_rek' => '520206',
            'nm_rek' => 'BEBAN JASA MEDIK DOKTER OPERASI RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          192 => 
          array (
            'kd_rek' => '520207',
            'nm_rek' => 'BEBAN JASA MEDIK PARAMEDIS OPERASI RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          193 => 
          array (
            'kd_rek' => '5203',
            'nm_rek' => 'BEBAN LAIN-LAIN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          194 => 
          array (
            'kd_rek' => '520301',
            'nm_rek' => 'BEBAN JASA SARANA LABORAT',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          195 => 
          array (
            'kd_rek' => '520302',
            'nm_rek' => 'BEBAN JASA SARANA RADIOLOGI',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          196 => 
          array (
            'kd_rek' => '520303',
            'nm_rek' => 'BEBAN JASA MENEJEMEN LABORAT',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          197 => 
          array (
            'kd_rek' => '520304',
            'nm_rek' => 'BEBAN JASA MENEJEMEN RADIOLOGI',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          198 => 
          array (
            'kd_rek' => '520305',
            'nm_rek' => 'BEBAN UTANG LAIN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          199 => 
          array (
            'kd_rek' => '520308',
            'nm_rek' => 'BEBAN JASA SARANA RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          200 => 
          array (
            'kd_rek' => '520309',
            'nm_rek' => 'BEBAN JASA MENEJEMEN RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          201 => 
          array (
            'kd_rek' => '53',
            'nm_rek' => 'BIAYA OPERASIONAL LAIN - LAIN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          202 => 
          array (
            'kd_rek' => '530100',
            'nm_rek' => 'PENGADAAN/PEMBELIAN OBAT & BHP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          203 => 
          array (
            'kd_rek' => '530101',
            'nm_rek' => 'PENGADAAN/PEMBELIAN BARANG NON MEDIS DAN PENUNJANG',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          204 => 
          array (
            'kd_rek' => '530102',
            'nm_rek' => 'STOK KELUAR BARANG NON MEDIS & PENUNJANG',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          205 => 
          array (
            'kd_rek' => '530103',
            'nm_rek' => 'PENGGUNAAN/PENGAMBILAN BHP MEDIS UNIT TRANFUSI DARAH',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          206 => 
          array (
            'kd_rek' => '530104',
            'nm_rek' => 'PENGGUNAAN/PENGAMBILAN BARANG NON MEDIS UNTI TRANFUSI DARAH',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          207 => 
          array (
            'kd_rek' => '530105',
            'nm_rek' => 'BIAYA GAJI',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          208 => 
          array (
            'kd_rek' => '530106',
            'nm_rek' => 'BIAYA PEMEBLIAN MATERIAL BANGUNAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          209 => 
          array (
            'kd_rek' => '530107',
            'nm_rek' => 'BIAYA LISTRIK',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          210 => 
          array (
            'kd_rek' => '530108',
            'nm_rek' => 'BIAYA PEMBELIAN BAHAN BAKAR UNTUK GENSET',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          211 => 
          array (
            'kd_rek' => '530109',
            'nm_rek' => 'PENGELUARAN HARIAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          212 => 
          array (
            'kd_rek' => '530110',
            'nm_rek' => 'STOK KELUAR BARANG MEDIS/OBAT/BHP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          213 => 
          array (
            'kd_rek' => '530111',
            'nm_rek' => 'BIAYA CROSMATCH AMBIL DARAH',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          214 => 
          array (
            'kd_rek' => '530112',
            'nm_rek' => 'BIAYA ASURANSI BPJS KESEHATAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          215 => 
          array (
            'kd_rek' => '530113',
            'nm_rek' => 'STOK KELUAR BARANG DAPUR',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          216 => 
          array (
            'kd_rek' => '530114',
            'nm_rek' => 'BIAYA TRANSAKSI BANK MANDIRI',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          217 => 
          array (
            'kd_rek' => '530115',
            'nm_rek' => 'WORKHSOP KARYAWAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          218 => 
          array (
            'kd_rek' => '54',
            'nm_rek' => 'POTONGAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          219 => 
          array (
            'kd_rek' => '540100',
            'nm_rek' => 'POTONGAN PENJUALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          220 => 
          array (
            'kd_rek' => '540101',
            'nm_rek' => 'POTONGAN BIAYA PASIEN RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          221 => 
          array (
            'kd_rek' => '540102',
            'nm_rek' => 'POTONGAN BIAYA PASIEN RAWAT JALAN',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          222 => 
          array (
            'kd_rek' => '540103',
            'nm_rek' => 'POTONGAN PIUTANG/DISKON PIUTANG',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          223 => 
          array (
            'kd_rek' => '55',
            'nm_rek' => 'BIAYA PENUNJANG MEDIS',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          224 => 
          array (
            'kd_rek' => '550100',
            'nm_rek' => 'RETUR PENJUALAN OBAT & BHP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          225 => 
          array (
            'kd_rek' => '550101',
            'nm_rek' => 'RETUR OBAT RAWAT INAP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          226 => 
          array (
            'kd_rek' => '550102',
            'nm_rek' => 'RETUR PIUTANG OBAT & BHP',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          227 => 
          array (
            'kd_rek' => '550103',
            'nm_rek' => 'HPP BHP LABORATORIUM',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          228 => 
          array (
            'kd_rek' => '550104',
            'nm_rek' => 'HPP BHP RADIOLOGI',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          229 => 
          array (
            'kd_rek' => '550105',
            'nm_rek' => 'HPP BARANG MEDIS/OBAT/BHP KAMAR OPERASI',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          230 => 
          array (
            'kd_rek' => '550106',
            'nm_rek' => 'HPP BARANG MEDIS/OBAT/BHP ',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          231 => 
          array (
            'kd_rek' => '56',
            'nm_rek' => 'BIAYA TOKO',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          232 => 
          array (
            'kd_rek' => '560101',
            'nm_rek' => 'HPP BARANG TOKO',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          233 => 
          array (
            'kd_rek' => '57',
            'nm_rek' => 'KERUGIAN ASURANSI',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          234 => 
          array (
            'kd_rek' => '570101',
            'nm_rek' => 'BEBAN KLAIM TIDAK DIBAYAR BPJS',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
          235 => 
          array (
            'kd_rek' => '570102',
            'nm_rek' => 'BEBAN PIUTANG TIDAK TERBAYAR',
            'tipe' => 'R',
            'balance' => 'D',
            'level' => '1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}