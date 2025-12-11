<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetAkunRalanTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_akun_ralan')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_akun_ralan')->insert(array (
          0 => 
          array (
            'Suspen_Piutang_Tindakan_Ralan' => '117004',
            'Tindakan_Ralan' => '420100',
            'Beban_Jasa_Medik_Dokter_Tindakan_Ralan' => '520200',
            'Utang_Jasa_Medik_Dokter_Tindakan_Ralan' => '211020',
            'Beban_Jasa_Medik_Paramedis_Tindakan_Ralan' => '520201',
            'Utang_Jasa_Medik_Paramedis_Tindakan_Ralan' => '211030',
            'Beban_KSO_Tindakan_Ralan' => '520100',
            'Utang_KSO_Tindakan_Ralan' => '211140',
            'Beban_Jasa_Sarana_Tindakan_Ralan' => '520308',
            'Utang_Jasa_Sarana_Tindakan_Ralan' => '211132',
            'HPP_BHP_Tindakan_Ralan' => '550106',
            'Persediaan_BHP_Tindakan_Ralan' => '115010',
            'Beban_Jasa_Menejemen_Tindakan_Ralan' => '520309',
            'Utang_Jasa_Menejemen_Tindakan_Ralan' => '211133',
            'Suspen_Piutang_Laborat_Ralan' => '117004',
            'Laborat_Ralan' => '420106',
            'Beban_Jasa_Medik_Dokter_Laborat_Ralan' => '520202',
            'Utang_Jasa_Medik_Dokter_Laborat_Ralan' => '211040',
            'Beban_Jasa_Medik_Petugas_Laborat_Ralan' => '520203',
            'Utang_Jasa_Medik_Petugas_Laborat_Ralan' => '211050',
            'Beban_Kso_Laborat_Ralan' => '520101',
            'Utang_Kso_Laborat_Ralan' => '211150',
            'HPP_Persediaan_Laborat_Rawat_Jalan' => '550103',
            'Persediaan_BHP_Laborat_Rawat_Jalan' => '115040',
            'Beban_Jasa_Sarana_Laborat_Ralan' => '520301',
            'Utang_Jasa_Sarana_Laborat_Ralan' => '211214',
            'Beban_Jasa_Perujuk_Laborat_Ralan' => '520202',
            'Utang_Jasa_Perujuk_Laborat_Ralan' => '211040',
            'Beban_Jasa_Menejemen_Laborat_Ralan' => '520303',
            'Utang_Jasa_Menejemen_Laborat_Ralan' => '211216',
            'Suspen_Piutang_Radiologi_Ralan' => '117004',
            'Radiologi_Ralan' => '420107',
            'Beban_Jasa_Medik_Dokter_Radiologi_Ralan' => '520204',
            'Utang_Jasa_Medik_Dokter_Radiologi_Ralan' => '211070',
            'Beban_Jasa_Medik_Petugas_Radiologi_Ralan' => '520205',
            'Utang_Jasa_Medik_Petugas_Radiologi_Ralan' => '211080',
            'Beban_Kso_Radiologi_Ralan' => '520102',
            'Utang_Kso_Radiologi_Ralan' => '211160',
            'HPP_Persediaan_Radiologi_Rawat_Jalan' => '550104',
            'Persediaan_BHP_Radiologi_Rawat_Jalan' => '115050',
            'Beban_Jasa_Sarana_Radiologi_Ralan' => '520302',
            'Utang_Jasa_Sarana_Radiologi_Ralan' => '211215',
            'Beban_Jasa_Perujuk_Radiologi_Ralan' => '520204',
            'Utang_Jasa_Perujuk_Radiologi_Ralan' => '211070',
            'Beban_Jasa_Menejemen_Radiologi_Ralan' => '520304',
            'Utang_Jasa_Menejemen_Radiologi_Ralan' => '211217',
            'Suspen_Piutang_Obat_Ralan' => '117004',
            'Obat_Ralan' => '420108',
            'HPP_Obat_Rawat_Jalan' => '550106',
            'Persediaan_Obat_Rawat_Jalan' => '115010',
            'Registrasi_Ralan' => '420101',
            'Suspen_Piutang_Operasi_Ralan' => '117004',
            'Operasi_Ralan' => '420103',
            'Beban_Jasa_Medik_Dokter_Operasi_Ralan' => '520206',
            'Utang_Jasa_Medik_Dokter_Operasi_Ralan' => '211100',
            'Beban_Jasa_Medik_Paramedis_Operasi_Ralan' => '520207',
            'Utang_Jasa_Medik_Paramedis_Operasi_Ralan' => '211110',
            'HPP_Obat_Operasi_Ralan' => '550105',
            'Persediaan_Obat_Kamar_Operasi_Ralan' => '115030',
            'Tambahan_Ralan' => '420102',
            'Potongan_Ralan' => '540102',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}