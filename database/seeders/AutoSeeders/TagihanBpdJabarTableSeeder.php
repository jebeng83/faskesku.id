<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TagihanBpdJabarTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('tagihan_bpd_jabar')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('tagihan_bpd_jabar')->insert(array (
          0 => 
          array (
            'no_rkm_medis' => '000002',
            'nm_pasien' => 'DEWI EKAWATI',
            'alamat' => 'ALAMAT, TUNGGULREJO, GRABAG, KABUPATEN PURWOREJO',
            'jk' => 'P',
            'tgl_lahir' => '2022-06-28',
            'umurdaftar' => '4Bl',
            'tgl_registrasi' => '2022-11-21',
            'no_nota' => '20221121RJ0001',
            'besar_bayar' => 325000.0,
            'keterangan' => '0271011312220001',
            'no_rawat' => '2022/11/21/000001',
            'status_lanjut' => 'Ralan',
            'tgl_closing' => '2022-11-21',
            'status_bayar' => 'Pending',
            'kasir' => 'Admin Utama',
            'diupdatebank' => '2023-01-26 11:22:11',
            'referensi' => '0000000000010024',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}