<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenilaianLanjutanResikoJatuhLansiumTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_lanjutan_resiko_jatuh_lansia')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_lanjutan_resiko_jatuh_lansia')->insert(array (
          0 => 
          array (
            'no_rawat' => '2023/01/27/000002',
            'tanggal' => '2023-03-13 19:16:42',
            'penilaian_jatuhmorse_skala1' => 'Pasien Jatuh Dalam 2 Bulan Terakhir',
            'penilaian_jatuhmorse_nilai1' => 6,
            'penilaian_jatuhmorse_skala2' => 'Pasien Disorientasi',
            'penilaian_jatuhmorse_nilai2' => 14,
            'penilaian_jatuhmorse_skala3' => 'Memiliki Glukoma/Katarak/Degenerasi Makula',
            'penilaian_jatuhmorse_nilai3' => 1,
            'penilaian_jatuhmorse_skala4' => 'Prilaku Berkemih/Frekuensi/Urgensi/Incontinensia/Nokturia',
            'penilaian_jatuhmorse_nilai4' => 2,
            'penilaian_jatuhmorse_skala5' => 'Memerlukan Bantuan 2 Orang',
            'penilaian_jatuhmorse_nilai5' => 3,
            'penilaian_jatuhmorse_skala6' => 'Berjalan Dengan Bantuan 1 Orang',
            'penilaian_jatuhmorse_nilai6' => 2,
            'penilaian_jatuhmorse_totalnilai' => 30,
            'hasil_skrining' => '1 sasas',
            'saran' => '2 asasa sasas',
            'nip' => '12/09/1988/001',
          ),
          1 => 
          array (
            'no_rawat' => '2023/06/10/000002',
            'tanggal' => '2023-08-18 21:34:34',
            'penilaian_jatuhmorse_skala1' => 'Tidak',
            'penilaian_jatuhmorse_nilai1' => 0,
            'penilaian_jatuhmorse_skala2' => 'Tidak',
            'penilaian_jatuhmorse_nilai2' => 0,
            'penilaian_jatuhmorse_skala3' => 'Tidak',
            'penilaian_jatuhmorse_nilai3' => 0,
            'penilaian_jatuhmorse_skala4' => 'Tidak',
            'penilaian_jatuhmorse_nilai4' => 0,
            'penilaian_jatuhmorse_skala5' => 'Mandiri',
            'penilaian_jatuhmorse_nilai5' => 0,
            'penilaian_jatuhmorse_skala6' => 'Mandiri',
            'penilaian_jatuhmorse_nilai6' => 0,
            'penilaian_jatuhmorse_totalnilai' => 0,
            'hasil_skrining' => '1',
            'saran' => '2',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}