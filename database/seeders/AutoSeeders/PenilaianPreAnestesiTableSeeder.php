<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenilaianPreAnestesiTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_pre_anestesi')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_pre_anestesi')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/20/000002',
            'tanggal' => '2025-08-05 13:48:39',
            'kd_dokter' => 'D0000004',
            'tanggal_operasi' => '2025-08-05 13:48:39',
            'diagnosa' => '-',
            'rencana_tindakan' => '-',
            'tb' => '',
            'bb' => '',
            'td' => '',
            'io2' => '',
            'nadi' => '',
            'pernapasan' => '',
            'suhu' => '',
            'fisik_cardiovasculer' => '',
            'fisik_paru' => '',
            'fisik_abdomen' => '',
            'fisik_extrimitas' => '',
            'fisik_endokrin' => '',
            'fisik_ginjal' => '',
            'fisik_obatobatan' => '',
            'fisik_laborat' => '',
            'fisik_penunjang' => '',
            'riwayat_penyakit_alergiobat' => '',
            'riwayat_penyakit_alergilainnya' => '',
            'riwayat_penyakit_terapi' => '',
            'riwayat_kebiasaan_merokok' => 'Tidak',
            'riwayat_kebiasaan_ket_merokok' => '',
            'riwayat_kebiasaan_alkohol' => 'Tidak',
            'riwayat_kebiasaan_ket_alkohol' => '',
            'riwayat_kebiasaan_obat' => '-',
            'riwayat_kebiasaan_ket_obat' => '',
            'riwayat_medis_cardiovasculer' => '',
            'riwayat_medis_respiratory' => '',
            'riwayat_medis_endocrine' => '',
            'riwayat_medis_lainnya' => '',
            'asa' => '1',
            'puasa' => '2025-08-05 13:48:39',
            'rencana_anestesi' => 'GA',
            'rencana_perawatan' => '',
            'catatan_khusus' => '',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}