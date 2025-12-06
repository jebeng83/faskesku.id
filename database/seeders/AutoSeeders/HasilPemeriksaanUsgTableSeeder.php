<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class HasilPemeriksaanUsgTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('hasil_pemeriksaan_usg')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('hasil_pemeriksaan_usg')->insert(array (
          0 => 
          array (
            'no_rawat' => '2025/06/18/000001',
            'tanggal' => '2025-08-19 10:36:43',
            'kd_dokter' => 'D0000004',
            'diagnosa_klinis' => '-',
            'kiriman_dari' => '-',
            'hta' => '-',
            'kantong_gestasi' => '-',
            'ukuran_bokongkepala' => '-',
            'jenis_prestasi' => '-',
            'diameter_biparietal' => '-',
            'panjang_femur' => '-',
            'lingkar_abdomen' => '-',
            'tafsiran_berat_janin' => '-',
            'usia_kehamilan' => '-',
            'plasenta_berimplatansi' => '-',
            'derajat_maturitas' => '0',
            'jumlah_air_ketuban' => 'Cukup',
            'indek_cairan_ketuban' => '-',
            'kelainan_kongenital' => '-',
            'peluang_sex' => 'Laki-laki',
            'kesimpulan' => '-',
          ),
          1 => 
          array (
            'no_rawat' => '2025/06/28/000001',
            'tanggal' => '2025-06-28 10:04:27',
            'kd_dokter' => 'D0000004',
            'diagnosa_klinis' => '-',
            'kiriman_dari' => '-',
            'hta' => '--',
            'kantong_gestasi' => '1',
            'ukuran_bokongkepala' => '1',
            'jenis_prestasi' => '-',
            'diameter_biparietal' => '1',
            'panjang_femur' => '1',
            'lingkar_abdomen' => '1',
            'tafsiran_berat_janin' => '1',
            'usia_kehamilan' => '1',
            'plasenta_berimplatansi' => '1',
            'derajat_maturitas' => '0',
            'jumlah_air_ketuban' => 'Cukup',
            'indek_cairan_ketuban' => '-',
            'kelainan_kongenital' => '-',
            'peluang_sex' => 'Laki-laki',
            'kesimpulan' => 'tes',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}