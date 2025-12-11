<?php

namespace Database\Seeders\AutoSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SetAkunRanapTableSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('set_akun_ranap')->truncate();
        Schema::enableForeignKeyConstraints();

        Schema::disableForeignKeyConstraints();
        DB::table('set_akun_ranap')->insert(array (
          0 => 
          array (
            'Suspen_Piutang_Tindakan_Ranap' => '117004',
            'Tindakan_Ranap' => '410105',
            'Beban_Jasa_Medik_Dokter_Tindakan_Ranap' => '510200',
            'Utang_Jasa_Medik_Dokter_Tindakan_Ranap' => '211120',
            'Beban_Jasa_Medik_Paramedis_Tindakan_Ranap' => '510201',
            'Utang_Jasa_Medik_Paramedis_Tindakan_Ranap' => '211130',
            'Beban_KSO_Tindakan_Ranap' => '510102',
            'Utang_KSO_Tindakan_Ranap' => '211170',
            'Beban_Jasa_Sarana_Tindakan_Ranap' => '510301',
            'Utang_Jasa_Sarana_Tindakan_Ranap' => '211211',
            'Beban_Jasa_Menejemen_Tindakan_Ranap' => '510302',
            'Utang_Jasa_Menejemen_Tindakan_Ranap' => '211212',
            'HPP_BHP_Tindakan_Ranap' => '550106',
            'Persediaan_BHP_Tindakan_Ranap' => '115010',
            'Suspen_Piutang_Laborat_Ranap' => '117004',
            'Laborat_Ranap' => '410109',
            'Beban_Jasa_Medik_Dokter_Laborat_Ranap' => '510202',
            'Utang_Jasa_Medik_Dokter_Laborat_Ranap' => '211041',
            'Beban_Jasa_Medik_Petugas_Laborat_Ranap' => '510203',
            'Utang_Jasa_Medik_Petugas_Laborat_Ranap' => '211051',
            'Beban_Kso_Laborat_Ranap' => '510106',
            'Utang_Kso_Laborat_Ranap' => '211180',
            'HPP_Persediaan_Laborat_Rawat_inap' => '550103',
            'Persediaan_BHP_Laborat_Rawat_Inap' => '115040',
            'Beban_Jasa_Sarana_Laborat_Ranap' => '520301',
            'Utang_Jasa_Sarana_Laborat_Ranap' => '211214',
            'Beban_Jasa_Perujuk_Laborat_Ranap' => '510202',
            'Utang_Jasa_Perujuk_Laborat_Ranap' => '211041',
            'Beban_Jasa_Menejemen_Laborat_Ranap' => '520303',
            'Utang_Jasa_Menejemen_Laborat_Ranap' => '211216',
            'Suspen_Piutang_Radiologi_Ranap' => '117004',
            'Radiologi_Ranap' => '410110',
            'Beban_Jasa_Medik_Dokter_Radiologi_Ranap' => '510204',
            'Utang_Jasa_Medik_Dokter_Radiologi_Ranap' => '211190',
            'Beban_Jasa_Medik_Petugas_Radiologi_Ranap' => '510205',
            'Utang_Jasa_Medik_Petugas_Radiologi_Ranap' => '211200',
            'Beban_Kso_Radiologi_Ranap' => '510109',
            'Utang_Kso_Radiologi_Ranap' => '211161',
            'HPP_Persediaan_Radiologi_Rawat_Inap' => '550104',
            'Persediaan_BHP_Radiologi_Rawat_Inap' => '115050',
            'Beban_Jasa_Sarana_Radiologi_Ranap' => '520302',
            'Utang_Jasa_Sarana_Radiologi_Ranap' => '211215',
            'Beban_Jasa_Perujuk_Radiologi_Ranap' => '510204',
            'Utang_Jasa_Perujuk_Radiologi_Ranap' => '211190',
            'Beban_Jasa_Menejemen_Radiologi_Ranap' => '520304',
            'Utang_Jasa_Menejemen_Radiologi_Ranap' => '211217',
            'Suspen_Piutang_Obat_Ranap' => '117004',
            'Obat_Ranap' => '410111',
            'HPP_Obat_Rawat_Inap' => '550106',
            'Persediaan_Obat_Rawat_Inap' => '115010',
            'Registrasi_Ranap' => '410112',
            'Service_Ranap' => '410119',
            'Tambahan_Ranap' => '410113',
            'Potongan_Ranap' => '540101',
            'Retur_Obat_Ranap' => '410111',
            'Resep_Pulang_Ranap' => '410114',
            'Kamar_Inap' => '410115',
            'Suspen_Piutang_Operasi_Ranap' => '117004',
            'Operasi_Ranap' => '410116',
            'Beban_Jasa_Medik_Dokter_Operasi_Ranap' => '510206',
            'Utang_Jasa_Medik_Dokter_Operasi_Ranap' => '211101',
            'Beban_Jasa_Medik_Paramedis_Operasi_Ranap' => '510207',
            'Utang_Jasa_Medik_Paramedis_Operasi_Ranap' => '211111',
            'HPP_Obat_Operasi_Ranap' => '550105',
          ),
        ));
        Schema::enableForeignKeyConstraints();
    }
}