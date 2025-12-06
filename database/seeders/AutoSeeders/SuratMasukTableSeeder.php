<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SuratMasukTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('surat_masuk')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('surat_masuk')->insert(array (
          0 => 
          array (
            'no_urut' => 'SM20241112001',
            'no_surat' => 'u',
            'asal' => 'i',
            'tujuan' => '9',
            'tgl_surat' => '2024-11-12',
            'perihal' => 'o',
            'tgl_terima' => '2024-11-12',
            'kd_lemari' => 'SA001',
            'kd_rak' => 'SR001',
            'kd_map' => 'SM001',
            'kd_ruang' => 'SG001',
            'kd_sifat' => 'SF001',
            'lampiran' => 'o',
            'tembusan' => 'o',
            'tgl_deadline_balas' => '2024-11-12',
            'kd_balas' => 'SB002',
            'keterangan' => 'o',
            'kd_status' => 'SS003',
            'kd_klasifikasi' => 'SK002',
            'file_url' => 'pages/upload/photo_merah_hitam.jpeg',
          ),
          1 => 
          array (
            'no_urut' => 'SM20241219001',
            'no_surat' => 'tea',
            'asal' => '-',
            'tujuan' => '-',
            'tgl_surat' => '2024-12-19',
            'perihal' => '-',
            'tgl_terima' => '2024-12-19',
            'kd_lemari' => 'SA001',
            'kd_rak' => 'SR001',
            'kd_map' => 'SM001',
            'kd_ruang' => 'SG001',
            'kd_sifat' => 'SF001',
            'lampiran' => '-',
            'tembusan' => '-',
            'tgl_deadline_balas' => '2024-12-19',
            'kd_balas' => 'SB002',
            'keterangan' => '-',
            'kd_status' => 'SS003',
            'kd_klasifikasi' => 'SK002',
            'file_url' => 'pages/upload/photo_merah_hitam.jpeg',
          ),
          2 => 
          array (
            'no_urut' => 'SM20250115001',
            'no_surat' => '1',
            'asal' => '1',
            'tujuan' => '1',
            'tgl_surat' => '2025-01-15',
            'perihal' => '1',
            'tgl_terima' => '2025-01-15',
            'kd_lemari' => 'SA001',
            'kd_rak' => 'SR001',
            'kd_map' => 'SM001',
            'kd_ruang' => 'SG001',
            'kd_sifat' => 'SF001',
            'lampiran' => '-',
            'tembusan' => '-',
            'tgl_deadline_balas' => '2025-01-15',
            'kd_balas' => 'SB002',
            'keterangan' => '-',
            'kd_status' => 'SS003',
            'kd_klasifikasi' => 'SK002',
            'file_url' => 'pages/upload/photo_merah_hitam.jpeg',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}