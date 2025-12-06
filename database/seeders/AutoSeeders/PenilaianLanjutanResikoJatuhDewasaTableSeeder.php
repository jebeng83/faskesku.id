<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenilaianLanjutanResikoJatuhDewasaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_lanjutan_resiko_jatuh_dewasa')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_lanjutan_resiko_jatuh_dewasa')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/04/27/000002',
            'tanggal' => '2025-04-27 08:31:49',
            'penilaian_jatuhmorse_skala1' => 'Tidak',
            'penilaian_jatuhmorse_nilai1' => 0,
            'penilaian_jatuhmorse_skala2' => 'Tidak',
            'penilaian_jatuhmorse_nilai2' => 0,
            'penilaian_jatuhmorse_skala3' => 'Tidak Ada/Kursi Roda/Perawat/Tirah Baring',
            'penilaian_jatuhmorse_nilai3' => 0,
            'penilaian_jatuhmorse_skala4' => 'Tidak',
            'penilaian_jatuhmorse_nilai4' => 0,
            'penilaian_jatuhmorse_skala5' => 'Normal/Tirah Baring/Imobilisasi',
            'penilaian_jatuhmorse_nilai5' => 0,
            'penilaian_jatuhmorse_skala6' => 'Sadar Akan Kemampuan Diri Sendiri',
            'penilaian_jatuhmorse_nilai6' => 0,
            'penilaian_jatuhmorse_totalnilai' => 0,
            'hasil_skrining' => '-',
            'saran' => '-',
            'nip' => '123124',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'tanggal' => '2025-06-30 08:57:53',
            'penilaian_jatuhmorse_skala1' => 'Ya',
            'penilaian_jatuhmorse_nilai1' => 25,
            'penilaian_jatuhmorse_skala2' => 'Ya',
            'penilaian_jatuhmorse_nilai2' => 15,
            'penilaian_jatuhmorse_skala3' => 'Tidak Ada/Kursi Roda/Perawat/Tirah Baring',
            'penilaian_jatuhmorse_nilai3' => 0,
            'penilaian_jatuhmorse_skala4' => 'Tidak',
            'penilaian_jatuhmorse_nilai4' => 0,
            'penilaian_jatuhmorse_skala5' => 'Normal/Tirah Baring/Imobilisasi',
            'penilaian_jatuhmorse_nilai5' => 0,
            'penilaian_jatuhmorse_skala6' => 'Sadar Akan Kemampuan Diri Sendiri',
            'penilaian_jatuhmorse_nilai6' => 0,
            'penilaian_jatuhmorse_totalnilai' => 40,
            'hasil_skrining' => 'TES',
            'saran' => 'TES',
            'nip' => '12/09/1988/001',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}