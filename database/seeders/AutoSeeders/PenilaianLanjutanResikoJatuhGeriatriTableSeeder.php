<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PenilaianLanjutanResikoJatuhGeriatriTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_lanjutan_resiko_jatuh_geriatri')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('penilaian_lanjutan_resiko_jatuh_geriatri')->insert(array (
          0 => 
          array (
            'no_rawat' => '2023/06/10/000002',
            'tanggal' => '2023-07-12 10:04:46',
            'penilaian_jatuh_skala1' => 'Ya',
            'penilaian_jatuh_nilai1' => 4,
            'penilaian_jatuh_skala2' => 'Ya',
            'penilaian_jatuh_nilai2' => 3,
            'penilaian_jatuh_skala3' => 'Ya',
            'penilaian_jatuh_nilai3' => 3,
            'penilaian_jatuh_skala4' => 'Ya',
            'penilaian_jatuh_nilai4' => 3,
            'penilaian_jatuh_skala5' => 'Ya',
            'penilaian_jatuh_nilai5' => 2,
            'penilaian_jatuh_skala6' => 'Tidak',
            'penilaian_jatuh_nilai6' => 0,
            'penilaian_jatuh_skala7' => 'Tidak',
            'penilaian_jatuh_nilai7' => 0,
            'penilaian_jatuh_skala8' => 'Tidak',
            'penilaian_jatuh_nilai8' => 0,
            'penilaian_jatuh_skala9' => 'Ya',
            'penilaian_jatuh_nilai9' => 1,
            'penilaian_jatuh_skala10' => 'Tidak',
            'penilaian_jatuh_nilai10' => 0,
            'penilaian_jatuh_skala11' => 'Tidak',
            'penilaian_jatuh_nilai11' => 0,
            'penilaian_jatuh_totalnilai' => 16,
            'hasil_skrining' => '1',
            'saran' => '2',
            'nip' => '123124',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}