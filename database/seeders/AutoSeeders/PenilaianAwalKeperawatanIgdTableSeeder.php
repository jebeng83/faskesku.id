<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenilaianAwalKeperawatanIgdTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_awal_keperawatan_igd')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_awal_keperawatan_igd')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'tanggal' => '2025-06-30 08:54:26',
            'informasi' => 'Autoanamnesis',
            'keluhan_utama' => '-',
            'rpd' => '-',
            'rpo' => '-',
            'status_kehamilan' => 'Tidak Hamil',
            'gravida' => '0',
            'para' => '0',
            'abortus' => '0',
            'hpht' => '',
            'tekanan' => 'TAK',
            'pupil' => 'Normal',
            'neurosensorik' => 'TAK',
            'integumen' => 'TAK',
            'turgor' => 'Baik',
            'edema' => 'Tidak Ada',
            'mukosa' => 'Lembab',
            'perdarahan' => 'Tidak Ada',
            'jumlah_perdarahan' => '',
            'warna_perdarahan' => '',
            'intoksikasi' => 'Tidak Ada',
            'bab' => '',
            'xbab' => '',
            'kbab' => '',
            'wbab' => '',
            'bak' => '',
            'xbak' => '',
            'wbak' => '',
            'lbak' => '',
            'psikologis' => 'Tidak Ada Masalah',
            'jiwa' => 'Tidak',
            'perilaku' => 'Perilaku Kekerasan',
            'dilaporkan' => '',
            'sebutkan' => '',
            'hubungan' => 'Harmonis',
            'tinggal_dengan' => 'Sendiri',
            'ket_tinggal' => '',
            'budaya' => 'Tidak Ada',
            'ket_budaya' => '',
            'pendidikan_pj' => '-',
            'ket_pendidikan_pj' => '',
            'edukasi' => 'Pasien',
            'ket_edukasi' => '',
            'kemampuan' => 'Mandiri',
            'aktifitas' => 'Tirah Baring',
            'alat_bantu' => 'Tidak',
            'ket_bantu' => '',
            'nyeri' => 'Tidak Ada Nyeri',
            'provokes' => 'Proses Penyakit',
            'ket_provokes' => '',
            'quality' => 'Seperti Tertusuk',
            'ket_quality' => '',
            'lokasi' => '',
            'menyebar' => 'Tidak',
            'skala_nyeri' => '0',
            'durasi' => '',
            'nyeri_hilang' => 'Istirahat',
            'ket_nyeri' => '',
            'pada_dokter' => 'Tidak',
            'ket_dokter' => '',
            'berjalan_a' => 'Tidak',
            'berjalan_b' => 'Tidak',
            'berjalan_c' => 'Tidak',
            'hasil' => 'Tidak beresiko (tidak ditemukan a dan b)',
            'lapor' => 'Tidak',
            'ket_lapor' => '',
            'rencana' => '',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}