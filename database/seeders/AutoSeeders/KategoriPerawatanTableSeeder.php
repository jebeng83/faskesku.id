<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KategoriPerawatanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('kategori_perawatan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('kategori_perawatan')->insert(array (
          0 => 
          array (
            'kd_kategori' => 'KP026',
            'nm_kategori' => 'Administrasi',
          ),
          1 => 
          array (
            'kd_kategori' => 'PK4',
            'nm_kategori' => 'ASS/P-III',
          ),
          2 => 
          array (
            'kd_kategori' => 'KP1',
            'nm_kategori' => 'Dokter Spesialis',
          ),
          3 => 
          array (
            'kd_kategori' => 'KP',
            'nm_kategori' => 'Dokter Umum',
          ),
          4 => 
          array (
            'kd_kategori' => 'K1',
            'nm_kategori' => 'Kelas I',
          ),
          5 => 
          array (
            'kd_kategori' => 'K2',
            'nm_kategori' => 'Kelas II',
          ),
          6 => 
          array (
            'kd_kategori' => 'K3',
            'nm_kategori' => 'Kelas III',
          ),
          7 => 
          array (
            'kd_kategori' => 'KVIP',
            'nm_kategori' => 'Kelas VIP',
          ),
          8 => 
          array (
            'kd_kategori' => 'KVVIP',
            'nm_kategori' => 'Kelas VVIP',
          ),
          9 => 
          array (
            'kd_kategori' => 'KS',
            'nm_kategori' => 'Konsultasi',
          ),
          10 => 
          array (
            'kd_kategori' => 'KK',
            'nm_kategori' => 'KULIT & KELAMIN',
          ),
          11 => 
          array (
            'kd_kategori' => 'KP019',
            'nm_kategori' => 'LABORATORIUM',
          ),
          12 => 
          array (
            'kd_kategori' => 'K.BY',
            'nm_kategori' => 'NICU / PERINA',
          ),
          13 => 
          array (
            'kd_kategori' => 'OV',
            'nm_kategori' => 'Operasi/VK',
          ),
          14 => 
          array (
            'kd_kategori' => '-',
            'nm_kategori' => 'Perawatan',
          ),
          15 => 
          array (
            'kd_kategori' => 'PK3',
            'nm_kategori' => 'Pihak Ke III',
          ),
          16 => 
          array (
            'kd_kategori' => 'KP001',
            'nm_kategori' => 'POLI ANAK',
          ),
          17 => 
          array (
            'kd_kategori' => 'KP013',
            'nm_kategori' => 'POLI GIGI',
          ),
          18 => 
          array (
            'kd_kategori' => 'KP011',
            'nm_kategori' => 'POLI KANDUNGAN',
          ),
          19 => 
          array (
            'kd_kategori' => 'KP016',
            'nm_kategori' => 'POLI KULIT & KELAMIN',
          ),
          20 => 
          array (
            'kd_kategori' => 'KP017',
            'nm_kategori' => 'POLI MATA',
          ),
          21 => 
          array (
            'kd_kategori' => 'KP014',
            'nm_kategori' => 'POLI NEUROLOGI/ SYARAF',
          ),
          22 => 
          array (
            'kd_kategori' => 'KP015',
            'nm_kategori' => 'POLI ORTHOPEDI',
          ),
          23 => 
          array (
            'kd_kategori' => 'KP012',
            'nm_kategori' => 'POLI PENYAKIT DALAM',
          ),
          24 => 
          array (
            'kd_kategori' => 'KP009',
            'nm_kategori' => 'POLI THT',
          ),
          25 => 
          array (
            'kd_kategori' => 'KP002',
            'nm_kategori' => 'POLIKLINIK BEDAH',
          ),
          26 => 
          array (
            'kd_kategori' => 'KP018',
            'nm_kategori' => 'RADIOLOGI',
          ),
          27 => 
          array (
            'kd_kategori' => 'RJU',
            'nm_kategori' => 'Rajan Umum',
          ),
          28 => 
          array (
            'kd_kategori' => 'RI1',
            'nm_kategori' => 'Rawat Inap ( I/II/III )',
          ),
          29 => 
          array (
            'kd_kategori' => 'RI2',
            'nm_kategori' => 'Rawat Inap ( VVIP/VIP )',
          ),
          30 => 
          array (
            'kd_kategori' => 'OP33',
            'nm_kategori' => 'Tindakan Besar',
          ),
          31 => 
          array (
            'kd_kategori' => 'OK03',
            'nm_kategori' => 'Tindakan Kecil',
          ),
          32 => 
          array (
            'kd_kategori' => 'ok35',
            'nm_kategori' => 'Tindakan Khusus',
          ),
          33 => 
          array (
            'kd_kategori' => 'KP034',
            'nm_kategori' => 'Tindakan Sedang',
          ),
          34 => 
          array (
            'kd_kategori' => 'KP022',
            'nm_kategori' => 'Umum',
          ),
          35 => 
          array (
            'kd_kategori' => 'KP036',
            'nm_kategori' => 'UTAMA',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}