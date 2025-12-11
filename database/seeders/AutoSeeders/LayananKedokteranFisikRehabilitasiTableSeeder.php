<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class LayananKedokteranFisikRehabilitasiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('layanan_kedokteran_fisik_rehabilitasi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('layanan_kedokteran_fisik_rehabilitasi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/23/000001',
            'tanggal' => '2025-06-23 13:22:08',
            'kd_dokter' => 'D0000004',
            'pendamping' => 'Tidak',
            'keterangan_pendamping' => '',
            'anamnesa' => 'r',
            'pemeriksaan_fisik' => 'y',
            'diagnosa_medis' => '9',
            'diagnosa_fungsi' => '-',
            'tatalaksana' => '0',
            'anjuran' => '-',
            'evaluasi' => '-',
            'suspek_penyakit_kerja' => 'Tidak',
            'keterangan_suspek_penyakit_kerja' => '',
            'status_program' => 'Belum Selesai',
          ),
          1 => 
          array (
            'no_rawat' => '2025/07/04/000001',
            'tanggal' => '2025-07-04 09:49:06',
            'kd_dokter' => 'D0000004',
            'pendamping' => 'Tidak',
            'keterangan_pendamping' => '',
            'anamnesa' => '1212',
            'pemeriksaan_fisik' => '21212',
            'diagnosa_medis' => '212',
            'diagnosa_fungsi' => '1212',
            'tatalaksana' => '1212',
            'anjuran' => '1212',
            'evaluasi' => '1212',
            'suspek_penyakit_kerja' => 'Tidak',
            'keterangan_suspek_penyakit_kerja' => '121212',
            'status_program' => 'Belum Selesai',
          ),
          2 => 
          array (
            'no_rawat' => '2025/07/07/000001',
            'tanggal' => '2025-07-07 10:42:36',
            'kd_dokter' => 'D0000004',
            'pendamping' => 'Tidak',
            'keterangan_pendamping' => '',
            'anamnesa' => '121',
            'pemeriksaan_fisik' => '1212',
            'diagnosa_medis' => '21212',
            'diagnosa_fungsi' => '1212',
            'tatalaksana' => '1212',
            'anjuran' => '212',
            'evaluasi' => '1212',
            'suspek_penyakit_kerja' => 'Tidak',
            'keterangan_suspek_penyakit_kerja' => '-',
            'status_program' => 'Belum Selesai',
          ),
          3 => 
          array (
            'no_rawat' => '2025/08/11/000002',
            'tanggal' => '2025-08-11 15:15:59',
            'kd_dokter' => 'D0000004',
            'pendamping' => 'Tidak',
            'keterangan_pendamping' => 'wqwqw',
            'anamnesa' => 'wqwqw',
            'pemeriksaan_fisik' => 'qwqw',
            'diagnosa_medis' => 'wqwqw',
            'diagnosa_fungsi' => 'qwqw',
            'tatalaksana' => 'wqw',
            'anjuran' => 'qwqw',
            'evaluasi' => 'qwqw',
            'suspek_penyakit_kerja' => 'Tidak',
            'keterangan_suspek_penyakit_kerja' => 'wqw',
            'status_program' => 'Belum Selesai',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}