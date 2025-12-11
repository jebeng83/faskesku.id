<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DokterTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('dokter')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('dokter')->insert(array (
          0 => 
          array (
            'kd_dokter' => '-',
            'nm_dokter' => '-',
            'jk' => 'L',
            'tmp_lahir' => '-',
            'tgl_lahir' => '2021-09-22',
            'gol_drh' => 'A',
            'agama' => 'ISLAM',
            'almt_tgl' => '-',
            'no_telp' => '0',
            'email' => '',
            'stts_nikah' => 'MENIKAH',
            'kd_sps' => '-',
            'alumni' => '',
            'no_ijn_praktek' => '-',
            'status' => '1',
          ),
          1 => 
          array (
            'kd_dokter' => 'D0000002',
            'nm_dokter' => 'dr. Siswo Hariyono',
            'jk' => 'L',
            'tmp_lahir' => 'karanganyar',
            'tgl_lahir' => '1971-08-18',
            'gol_drh' => 'A',
            'agama' => 'ISLAM',
            'almt_tgl' => '-',
            'no_telp' => '085229977208',
            'email' => 'khanza@sasas.com',
            'stts_nikah' => 'MENIKAH',
            'kd_sps' => '-',
            'alumni' => 'uns',
            'no_ijn_praktek' => '0000123456',
            'status' => '1',
          ),
          2 => 
          array (
            'kd_dokter' => 'D0000003',
            'nm_dokter' => 'dr. Ratna Candrasari',
            'jk' => 'P',
            'tmp_lahir' => '-',
            'tgl_lahir' => '2022-02-24',
            'gol_drh' => 'A',
            'agama' => 'ISLAM',
            'almt_tgl' => '-',
            'no_telp' => NULL,
            'email' => '',
            'stts_nikah' => 'MENIKAH',
            'kd_sps' => 'S0011',
            'alumni' => NULL,
            'no_ijn_praktek' => '-',
            'status' => '1',
          ),
          3 => 
          array (
            'kd_dokter' => 'D0000004',
            'nm_dokter' => 'dr. Hilyatul Nadia',
            'jk' => 'P',
            'tmp_lahir' => '-',
            'tgl_lahir' => '2022-02-25',
            'gol_drh' => 'A',
            'agama' => 'ISLAM',
            'almt_tgl' => '-',
            'no_telp' => '0',
            'email' => 'sertisign-poa2-snbx2@yopmail.com',
            'stts_nikah' => 'MENIKAH',
            'kd_sps' => 'S0006',
            'alumni' => '-',
            'no_ijn_praktek' => '-',
            'status' => '1',
          ),
          4 => 
          array (
            'kd_dokter' => 'D0000005',
            'nm_dokter' => 'dr. Sri Rahma',
            'jk' => 'L',
            'tmp_lahir' => 'jogja',
            'tgl_lahir' => '2025-03-15',
            'gol_drh' => 'A',
            'agama' => 'ISLAM',
            'almt_tgl' => '-',
            'no_telp' => '-',
            'email' => '',
            'stts_nikah' => 'MENIKAH',
            'kd_sps' => '-',
            'alumni' => '',
            'no_ijn_praktek' => '0990099',
            'status' => '1',
          ),
          5 => 
          array (
            'kd_dokter' => 'D001',
            'nm_dokter' => 'Dr. Ahmad Fauzi',
            'jk' => 'L',
            'tmp_lahir' => 'Jakarta',
            'tgl_lahir' => '1980-05-15',
            'gol_drh' => 'O',
            'agama' => 'Islam',
            'almt_tgl' => 'Jl. Merdeka No. 123, Jakarta',
            'no_telp' => '081234567890',
            'email' => 'ahmad.wijaya@hospital.com',
            'stts_nikah' => 'MENIKAH',
            'kd_sps' => 'S0006',
            'alumni' => 'Universitas Indonesia',
            'no_ijn_praktek' => 'IJN001',
            'status' => '1',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}