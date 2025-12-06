<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TransferPasienAntarRuangTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('transfer_pasien_antar_ruang')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('transfer_pasien_antar_ruang')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/08/19/000002',
            'tanggal_masuk' => '2025-08-19 13:43:19',
            'tanggal_pindah' => '2025-08-19 13:43:19',
            'asal_ruang' => '-',
            'ruang_selanjutnya' => '-',
            'diagnosa_utama' => '-',
            'diagnosa_sekunder' => '-',
            'indikasi_pindah_ruang' => 'Kondisi Pasien Stabil',
            'keterangan_indikasi_pindah_ruang' => '-',
            'prosedur_yang_sudah_dilakukan' => '-',
            'obat_yang_telah_diberikan' => '-',
            'metode_pemindahan_pasien' => 'Kursi Roda',
            'peralatan_yang_menyertai' => 'Tidak Ada',
            'keterangan_peralatan_yang_menyertai' => '-',
            'pemeriksaan_penunjang_yang_dilakukan' => '-',
            'pasien_keluarga_menyetujui' => 'Ya',
            'nama_menyetujui' => '-',
            'hubungan_menyetujui' => 'Kakak',
            'keluhan_utama_sebelum_transfer' => 'tes',
            'keadaan_umum_sebelum_transfer' => 'Compos Mentis',
            'td_sebelum_transfer' => '12',
            'nadi_sebelum_transfer' => '1212',
            'rr_sebelum_transfer' => '122',
            'suhu_sebelum_transfer' => '12',
            'keluhan_utama_sesudah_transfer' => '-',
            'keadaan_umum_sesudah_transfer' => 'Compos Mentis',
            'td_sesudah_transfer' => '12',
            'nadi_sesudah_transfer' => '12',
            'rr_sesudah_transfer' => '121',
            'suhu_sesudah_transfer' => '1212',
            'nip_menyerahkan' => '12/09/1988/001',
            'nip_menerima' => '156798',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}