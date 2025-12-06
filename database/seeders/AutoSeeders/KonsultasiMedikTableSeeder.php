<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class KonsultasiMedikTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('konsultasi_medik')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('konsultasi_medik')->insert(array (
          0 => 
          array (
            'no_permintaan' => 'KM202504280001',
            'no_rawat' => '2025/04/25/000001',
            'tanggal' => '2025-04-28 14:16:32',
            'jenis_permintaan' => 'Konsultasi',
            'kd_dokter' => 'D0000004',
            'kd_dokter_dikonsuli' => 'D0000003',
            'diagnosa_kerja' => 'tes',
            'uraian_konsultasi' => 'sasasasasas',
          ),
          1 => 
          array (
            'no_permintaan' => 'KM202505260001',
            'no_rawat' => '2025/05/26/000003',
            'tanggal' => '2025-05-26 11:44:46',
            'jenis_permintaan' => 'Konsultasi',
            'kd_dokter' => 'D0000004',
            'kd_dokter_dikonsuli' => 'D0000003',
            'diagnosa_kerja' => 'tes',
            'uraian_konsultasi' => 'tes',
          ),
          2 => 
          array (
            'no_permintaan' => 'KM202505260002',
            'no_rawat' => '2025/05/26/000001',
            'tanggal' => '2025-05-26 15:09:23',
            'jenis_permintaan' => 'Konsultasi',
            'kd_dokter' => 'D0000004',
            'kd_dokter_dikonsuli' => 'D0000005',
            'diagnosa_kerja' => 'tes',
            'uraian_konsultasi' => 'tes',
          ),
          3 => 
          array (
            'no_permintaan' => 'KM202506180001',
            'no_rawat' => '2025/06/18/000001',
            'tanggal' => '2025-06-18 13:15:20',
            'jenis_permintaan' => 'Konsultasi',
            'kd_dokter' => 'D0000003',
            'kd_dokter_dikonsuli' => 'D0000004',
            'diagnosa_kerja' => '-',
            'uraian_konsultasi' => '-',
          ),
          4 => 
          array (
            'no_permintaan' => 'KM202506230001',
            'no_rawat' => '2025/06/23/000001',
            'tanggal' => '2025-06-23 11:28:12',
            'jenis_permintaan' => 'Konsultasi',
            'kd_dokter' => 'D0000004',
            'kd_dokter_dikonsuli' => 'D0000005',
            'diagnosa_kerja' => 'tes',
            'uraian_konsultasi' => 'mohon dicek',
          ),
          5 => 
          array (
            'no_permintaan' => 'KM202506280001',
            'no_rawat' => '2025/06/28/000001',
            'tanggal' => '2025-06-28 10:01:37',
            'jenis_permintaan' => 'Konsultasi',
            'kd_dokter' => 'D0000004',
            'kd_dokter_dikonsuli' => 'D0000003',
            'diagnosa_kerja' => 'tes',
            'uraian_konsultasi' => 'tes',
          ),
          6 => 
          array (
            'no_permintaan' => 'KM202506300001',
            'no_rawat' => '2025/06/30/000001',
            'tanggal' => '2025-06-30 11:41:28',
            'jenis_permintaan' => 'Konsultasi',
            'kd_dokter' => 'D0000003',
            'kd_dokter_dikonsuli' => 'D0000004',
            'diagnosa_kerja' => 'tes',
            'uraian_konsultasi' => 'tes',
          ),
          7 => 
          array (
            'no_permintaan' => 'KM202508040001',
            'no_rawat' => '2025/08/04/000001',
            'tanggal' => '2025-08-04 11:07:47',
            'jenis_permintaan' => 'Alih Rawat',
            'kd_dokter' => 'D0000004',
            'kd_dokter_dikonsuli' => 'D0000005',
            'diagnosa_kerja' => '-',
            'uraian_konsultasi' => '-',
          ),
          8 => 
          array (
            'no_permintaan' => 'KM202508050001',
            'no_rawat' => '2025/06/20/000002',
            'tanggal' => '2025-08-05 14:05:59',
            'jenis_permintaan' => 'Konsultasi',
            'kd_dokter' => 'D0000003',
            'kd_dokter_dikonsuli' => 'D0000005',
            'diagnosa_kerja' => 'tes',
            'uraian_konsultasi' => 'sasas',
          ),
          9 => 
          array (
            'no_permintaan' => 'KM202508130001',
            'no_rawat' => '2025/08/13/000001',
            'tanggal' => '2025-08-13 16:01:20',
            'jenis_permintaan' => 'Konsultasi',
            'kd_dokter' => 'D0000004',
            'kd_dokter_dikonsuli' => 'D0000003',
            'diagnosa_kerja' => 'TES',
            'uraian_konsultasi' => 'OK',
          ),
          10 => 
          array (
            'no_permintaan' => 'KM202508190001',
            'no_rawat' => '2025/08/19/000002',
            'tanggal' => '2025-08-19 13:29:06',
            'jenis_permintaan' => 'Konsultasi',
            'kd_dokter' => 'D0000004',
            'kd_dokter_dikonsuli' => 'D0000003',
            'diagnosa_kerja' => '-',
            'uraian_konsultasi' => '-',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}