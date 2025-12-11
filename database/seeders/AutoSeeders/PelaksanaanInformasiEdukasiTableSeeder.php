<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PelaksanaanInformasiEdukasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('pelaksanaan_informasi_edukasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('pelaksanaan_informasi_edukasi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/25/000001',
            'tanggal' => '2025-05-26 13:53:38',
            'nik' => 'D0000003',
            'materi_edukasi' => 't8',
            'keterangan' => '9',
            'diberikan_pada' => 'Pasien',
            'keterangan_diberikan_pada' => '',
            'lama_edukasi' => 'e',
            'metode_edukasi' => 'Ceramah',
            'hasil_verifikasi' => 'Sudah Mengerti',
            'status' => 'Awal',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'tanggal' => '2025-06-18 13:42:40',
            'nik' => 'D0000003',
            'materi_edukasi' => 'uu',
            'keterangan' => '-',
            'diberikan_pada' => 'Pasien',
            'keterangan_diberikan_pada' => '-',
            'lama_edukasi' => '9',
            'metode_edukasi' => 'Ceramah',
            'hasil_verifikasi' => 'Sudah Mengerti',
            'status' => 'Awal',
          ),
          2 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tanggal' => '2025-06-28 09:52:44',
            'nik' => '08998998',
            'materi_edukasi' => '1212212',
            'keterangan' => '2112',
            'diberikan_pada' => 'Pasien',
            'keterangan_diberikan_pada' => '2',
            'lama_edukasi' => '5',
            'metode_edukasi' => 'Ceramah',
            'hasil_verifikasi' => 'Sudah Mengerti',
            'status' => 'Awal',
          ),
          3 => 
          array (
            'no_rawat' => '2025/08/04/000001',
            'tanggal' => '2025-08-04 11:12:18',
            'nik' => 'D0000004',
            'materi_edukasi' => 'eqq',
            'keterangan' => '-',
            'diberikan_pada' => 'Pasien',
            'keterangan_diberikan_pada' => '',
            'lama_edukasi' => '',
            'metode_edukasi' => 'Ceramah',
            'hasil_verifikasi' => 'Sudah Mengerti',
            'status' => 'Awal',
          ),
          4 => 
          array (
            'no_rawat' => '2025/08/19/000002',
            'tanggal' => '2025-08-19 13:31:21',
            'nik' => 'D0000004',
            'materi_edukasi' => 'tes',
            'keterangan' => '-',
            'diberikan_pada' => 'Pasien',
            'keterangan_diberikan_pada' => '-',
            'lama_edukasi' => '-',
            'metode_edukasi' => 'Ceramah',
            'hasil_verifikasi' => 'Sudah Mengerti',
            'status' => 'Awal',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}