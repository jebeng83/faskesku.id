<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerencanaanPemulanganTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('perencanaan_pemulangan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('perencanaan_pemulangan')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'rencana_pulang' => '2025-07-07',
            'alasan_masuk' => '-',
            'diagnosa_medis' => '-',
            'pengaruh_ri_pasien_dan_keluarga' => 'Tidak',
            'keterangan_pengaruh_ri_pasien_dan_keluarga' => '-',
            'pengaruh_ri_pekerjaan_sekolah' => 'Tidak',
            'keterangan_pengaruh_ri_pekerjaan_sekolah' => '-',
            'pengaruh_ri_keuangan' => 'Tidak',
            'keterangan_pengaruh_ri_keuangan' => '-',
            'antisipasi_masalah_saat_pulang' => 'Tidak',
            'keterangan_antisipasi_masalah_saat_pulang' => '-',
            'bantuan_diperlukan_dalam' => 'Menyiapkan Makanan',
            'keterangan_bantuan_diperlukan_dalam' => '-',
            'adakah_yang_membantu_keperluan' => 'Tidak',
            'keterangan_adakah_yang_membantu_keperluan' => '-',
            'pasien_tinggal_sendiri' => 'Tidak',
            'keterangan_pasien_tinggal_sendiri' => '-',
            'pasien_menggunakan_peralatan_medis' => 'Tidak',
            'keterangan_pasien_menggunakan_peralatan_medis' => '-',
            'pasien_memerlukan_alat_bantu' => 'Tidak',
            'keterangan_pasien_memerlukan_alat_bantu' => '-',
            'memerlukan_perawatan_khusus' => 'Tidak',
            'keterangan_memerlukan_perawatan_khusus' => '-',
            'bermasalah_memenuhi_kebutuhan' => 'Tidak',
            'keterangan_bermasalah_memenuhi_kebutuhan' => '-',
            'memiliki_nyeri_kronis' => 'Tidak',
            'keterangan_memiliki_nyeri_kronis' => '-',
            'memerlukan_edukasi_kesehatan' => 'Tidak',
            'keterangan_memerlukan_edukasi_kesehatan' => '-',
            'memerlukan_keterampilkan_khusus' => 'Tidak',
            'keterangan_memerlukan_keterampilkan_khusus' => '-',
            'nama_pasien_keluarga' => '-',
            'nip' => '156798',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'rencana_pulang' => '2025-06-28',
            'alasan_masuk' => '-',
            'diagnosa_medis' => '-',
            'pengaruh_ri_pasien_dan_keluarga' => 'Tidak',
            'keterangan_pengaruh_ri_pasien_dan_keluarga' => '-',
            'pengaruh_ri_pekerjaan_sekolah' => 'Tidak',
            'keterangan_pengaruh_ri_pekerjaan_sekolah' => '-',
            'pengaruh_ri_keuangan' => 'Tidak',
            'keterangan_pengaruh_ri_keuangan' => '-',
            'antisipasi_masalah_saat_pulang' => 'Tidak',
            'keterangan_antisipasi_masalah_saat_pulang' => '-',
            'bantuan_diperlukan_dalam' => 'Menyiapkan Makanan',
            'keterangan_bantuan_diperlukan_dalam' => '-',
            'adakah_yang_membantu_keperluan' => 'Tidak',
            'keterangan_adakah_yang_membantu_keperluan' => '-',
            'pasien_tinggal_sendiri' => 'Tidak',
            'keterangan_pasien_tinggal_sendiri' => 'PEKALONGAN, -, -, -',
            'pasien_menggunakan_peralatan_medis' => 'Tidak',
            'keterangan_pasien_menggunakan_peralatan_medis' => '',
            'pasien_memerlukan_alat_bantu' => 'Tidak',
            'keterangan_pasien_memerlukan_alat_bantu' => '',
            'memerlukan_perawatan_khusus' => 'Tidak',
            'keterangan_memerlukan_perawatan_khusus' => '',
            'bermasalah_memenuhi_kebutuhan' => 'Tidak',
            'keterangan_bermasalah_memenuhi_kebutuhan' => '',
            'memiliki_nyeri_kronis' => 'Tidak',
            'keterangan_memiliki_nyeri_kronis' => '',
            'memerlukan_edukasi_kesehatan' => 'Tidak',
            'keterangan_memerlukan_edukasi_kesehatan' => '',
            'memerlukan_keterampilkan_khusus' => 'Tidak',
            'keterangan_memerlukan_keterampilkan_khusus' => '',
            'nama_pasien_keluarga' => 'TES',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}