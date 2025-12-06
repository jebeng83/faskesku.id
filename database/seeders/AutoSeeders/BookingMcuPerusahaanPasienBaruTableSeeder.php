<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BookingMcuPerusahaanPasienBaruTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('booking_mcu_perusahaan_pasien_baru')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('booking_mcu_perusahaan_pasien_baru')->insert(array (
          0 => 
          array (
            'no_pengajuan' => 'MPB202508260001',
            'nm_pasien' => 'RAHMAT PAMBUDI',
            'no_ktp' => '098669766575',
            'jk' => 'L',
            'tmp_lahir' => 'MALANG',
            'tgl_lahir' => '1987-08-25',
            'nm_ibu' => 'SURANTI',
            'alamat' => '-',
            'kelurahan' => 'KARTASURA',
            'kecamatan' => 'BAITURRAHMAN',
            'kabupaten' => 'ASASAS',
            'propinsi' => 'BENGKULU',
            'gol_darah' => 'A',
            'pekerjaan' => 'KARYAWAN',
            'stts_nikah' => 'BELUM MENIKAH',
            'agama' => 'KRISTEN',
            'tgl_mcu' => '2025-08-26',
            'no_tlp' => '09988',
            'umur' => '20',
            'pnd' => 'D4',
            'keluarga' => 'DIRI SENDIRI',
            'namakeluarga' => 'RAHMA',
            'pekerjaanpj' => 'BURUH',
            'alamatpj' => 'MALANG',
            'kelurahanpj' => 'MAKASAR',
            'kecamatanpj' => 'ARCAMANIK',
            'kabupatenpj' => 'ASASAS',
            'propinsipj' => 'DI YOGYAKARTA',
            'perusahaan_pasien' => 'I0002',
            'suku_bangsa' => 'DAYAK',
            'bahasa_pasien' => 'MADURA',
            'cacat_fisik' => 'TIDAK ADA',
            'email' => 'JAROT@YAHOO.COM',
            'nip' => '1213123123',
            'status' => 'Sudah Dikonfirmasi',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}