<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SkriningObesitaTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('skrining_obesitas')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('skrining_obesitas')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/30/000003',
            'tanggal' => '2025-06-30 08:59:14',
            'kebiasaan_makan_manis' => 'Tidak',
            'aktifitas_fisik_setiap_hari' => 'Tidak',
            'istirahat_cukup' => 'Tidak',
            'risiko_merokok' => 'Tidak',
            'riwayat_minum_alkohol_merokok_keluarga' => 'Tidak',
            'riwayat_penggunaan_obat_steroid' => 'Tidak',
            'berat_badan' => '70',
            'tinggi_badan' => '160',
            'imt' => '27.3',
            'kasifikasi_imt' => 'Obesitas I',
            'lingkar_pinggang' => '90',
            'risiko_lingkar_pinggang' => 'Berat',
            'status_obesitas' => 'Berisiko',
            'keterangan' => 'TES',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}