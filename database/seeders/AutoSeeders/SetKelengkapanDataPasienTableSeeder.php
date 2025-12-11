<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetKelengkapanDataPasienTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_kelengkapan_data_pasien')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_kelengkapan_data_pasien')->insert(array (
          0 => 
          array (
            'no_ktp' => 'Yes',
            'p_no_ktp' => 1,
            'tmp_lahir' => 'Yes',
            'p_tmp_lahir' => 1,
            'nm_ibu' => 'Yes',
            'p_nm_ibu' => 1,
            'alamat' => 'Yes',
            'p_alamat' => 1,
            'pekerjaan' => 'Yes',
            'p_pekerjaan' => 1,
            'no_tlp' => 'Yes',
            'p_no_tlp' => 1,
            'umur' => 'Yes',
            'p_umur' => 1,
            'namakeluarga' => 'Yes',
            'p_namakeluarga' => 1,
            'no_peserta' => 'Yes',
            'p_no_peserta' => 1,
            'kelurahan' => 'Yes',
            'p_kelurahan' => 1,
            'kecamatan' => 'Yes',
            'p_kecamatan' => 1,
            'kabupaten' => 'Yes',
            'p_kabupaten' => 1,
            'pekerjaanpj' => 'Yes',
            'p_pekerjaanpj' => 1,
            'alamatpj' => 'Yes',
            'p_alamatpj' => 1,
            'kelurahanpj' => 'Yes',
            'p_kelurahanpj' => 1,
            'kecamatanpj' => 'Yes',
            'p_kecamatanpj' => 1,
            'kabupatenpj' => 'Yes',
            'p_kabupatenpj' => 1,
            'propinsi' => 'Yes',
            'p_propinsi' => 1,
            'propinsipj' => 'Yes',
            'p_propinsipj' => 1,
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}