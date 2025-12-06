<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenilaianTambahanGeriatriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_tambahan_geriatri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_tambahan_geriatri')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/30/000001',
            'tanggal' => '2025-06-30 11:45:26',
            'nik' => 'D0000004',
            'asal_masuk' => 'IGD',
            'kondisi_masuk' => 'Mandiri',
            'keterangan_kondisi_masuk' => '-',
            'anamnesis' => 'Autoanamnesis',
            'diagnosa_medis' => '-',
            'riwayat_immuno_telinga' => 'Tidak',
            'riwayat_immuno_sinus' => 'Tidak',
            'riwayat_immuno_antibiotik' => 'Tidak',
            'riwayat_immuno_pneumonia' => 'Tidak',
            'riwayat_immuno_abses' => 'Tidak',
            'riwayat_immuno_sariawan' => 'Tidak',
            'riwayat_immuno_memerlukan_antibiotik' => 'Tidak',
            'riwayat_immuno_infeksi_dalam' => 'Tidak',
            'riwayat_immuno_immunodefisiensi_primer' => 'Tidak',
            'riwayat_immuno_jenis_kangker' => 'Tidak',
            'riwayat_immuno_infeksi_oportunistik' => 'Tidak',
            'pola_aktifitas_tidur' => 'TAK',
            'keterangan_pola_aktifitas_tidur' => '',
            'pola_aktifitas_obat_tidur' => 'Tidak',
            'keterangan_pola_aktifitas_obat_tidur' => '',
            'pola_aktifitas_olahraga' => 'Tidak',
            'keterangan_pola_aktifitas_olahraga' => '',
            'kualitas_hidup_mobilitas' => 'Tidak Mempunyai Masalah Untuk Berjalan',
            'kualitas_hidup_perawatan_diri' => 'Tidak Mempunyai Kesulitan Dalam Perawatan Diri Sendiri',
            'kualitas_hidup_aktifitas_seharihari' => 'Tak Mempunyai Kesulitan Dalam Melaksanakan Kegiatan Sehari-hari',
            'kualitas_hidup_rasa_nyeri' => 'Tidak Mempunyai Keluhan Rasa Nyeri Atau Rasa Tak Nyaman',
            'skala_nyeri' => '0 - Tidak Nyeri',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}