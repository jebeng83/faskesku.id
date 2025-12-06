<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SigninSebelumAnestesiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('signin_sebelum_anestesi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('signin_sebelum_anestesi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/08/19/000001',
            'tanggal' => '2025-08-19 11:22:37',
            'sncn' => '-',
            'tindakan' => 'Eksisi Tumor Kulit > 2 cm dengan',
            'kd_dokter_bedah' => 'D0000004',
            'kd_dokter_anestesi' => 'D0000004',
            'identitas' => 'Ya',
            'penandaan_area_operasi' => 'Ada',
            'alergi' => 'TES',
            'resiko_aspirasi' => 'Ada',
            'resiko_aspirasi_rencana_antisipasi' => '-',
            'resiko_kehilangan_darah' => 'Tidak Ada',
            'resiko_kehilangan_darah_line' => '',
            'resiko_kehilangan_darah_rencana_antisipasi' => '-',
            'kesiapan_alat_obat_anestesi' => 'Lengkap',
            'kesiapan_alat_obat_anestesi_rencana_antisipasi' => '-',
            'nip_perawat_ok' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}