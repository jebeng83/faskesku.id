<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('set_akun_ralan')) {
            Schema::create('set_akun_ralan', function (Blueprint $table) {
                $table->string('Suspen_Piutang_Tindakan_Ralan', 15)->index('suspen_piutang_tindakan_ralan');
                $table->string('Tindakan_Ralan', 15)->nullable()->index('tindakan_ralan');
                $table->string('Beban_Jasa_Medik_Dokter_Tindakan_Ralan', 15)->nullable()->index('beban_jasa_medik_dokter_tindakan_ralan');
                $table->string('Utang_Jasa_Medik_Dokter_Tindakan_Ralan', 15)->nullable()->index('utang_jasa_medik_dokter_tindakan_ralan');
                $table->string('Beban_Jasa_Medik_Paramedis_Tindakan_Ralan', 15)->nullable()->index('beban_jasa_medik_paramedis_tindakan_ralan');
                $table->string('Utang_Jasa_Medik_Paramedis_Tindakan_Ralan', 15)->nullable()->index('utang_jasa_medik_paramedis_tindakan_ralan');
                $table->string('Beban_KSO_Tindakan_Ralan', 15)->index('beban_kso_tindakan_ralan');
                $table->string('Utang_KSO_Tindakan_Ralan', 15)->index('utang_kso_tindakan_ralan');
                $table->string('Beban_Jasa_Sarana_Tindakan_Ralan', 15)->nullable()->index('beban_jasa_sarana_tindakan_ralan');
                $table->string('Utang_Jasa_Sarana_Tindakan_Ralan', 15)->nullable()->index('utang_jasa_sarana_tindakan_ralan');
                $table->string('HPP_BHP_Tindakan_Ralan', 15)->nullable()->index('hpp_bhp_tindakan_ralan');
                $table->string('Persediaan_BHP_Tindakan_Ralan', 15)->nullable()->index('persediaan_bhp_tindakan_ralan');
                $table->string('Beban_Jasa_Menejemen_Tindakan_Ralan', 15)->nullable()->index('beban_jasa_menejemen_tindakan_ralan');
                $table->string('Utang_Jasa_Menejemen_Tindakan_Ralan', 15)->nullable()->index('utang_jasa_menejemen_tindakan_ralan');
                $table->string('Suspen_Piutang_Laborat_Ralan', 15)->index('suspen_piutang_laborat_ralan');
                $table->string('Laborat_Ralan', 15)->nullable()->index('laborat_ralan');
                $table->string('Beban_Jasa_Medik_Dokter_Laborat_Ralan', 15)->nullable()->index('beban_jasa_medik_dokter_laborat_ralan');
                $table->string('Utang_Jasa_Medik_Dokter_Laborat_Ralan', 15)->nullable()->index('utang_jasa_medik_dokter_laborat_ralan');
                $table->string('Beban_Jasa_Medik_Petugas_Laborat_Ralan', 15)->nullable()->index('beban_jasa_medik_petugas_laborat_ralan');
                $table->string('Utang_Jasa_Medik_Petugas_Laborat_Ralan', 15)->nullable()->index('utang_jasa_medik_petugas_laborat_ralan');
                $table->string('Beban_Kso_Laborat_Ralan', 15)->nullable()->index('beban_kso_laborat_ralan');
                $table->string('Utang_Kso_Laborat_Ralan', 15)->nullable()->index('utang_kso_laborat_ralan');
                $table->string('HPP_Persediaan_Laborat_Rawat_Jalan', 15)->nullable()->index('hpp_persediaan_laborat_rawat_jalan');
                $table->string('Persediaan_BHP_Laborat_Rawat_Jalan', 15)->nullable()->index('persediaan_bhp_laborat_rawat_jalan');
                $table->string('Beban_Jasa_Sarana_Laborat_Ralan', 15)->index('beban_jasa_sarana_laborat_ralan');
                $table->string('Utang_Jasa_Sarana_Laborat_Ralan', 15)->index('utang_jasa_sarana_laborat_ralan');
                $table->string('Beban_Jasa_Perujuk_Laborat_Ralan', 15)->index('beban_jasa_perujuk_laborat_ralan');
                $table->string('Utang_Jasa_Perujuk_Laborat_Ralan', 15)->index('utang_jasa_perujuk_laborat_ralan');
                $table->string('Beban_Jasa_Menejemen_Laborat_Ralan', 15)->index('beban_jasa_menejemen_laborat_ralan');
                $table->string('Utang_Jasa_Menejemen_Laborat_Ralan', 15)->index('utang_jasa_menejemen_laborat_ralan');
                $table->string('Suspen_Piutang_Radiologi_Ralan', 15)->index('suspen_piutang_radiologi_ralan');
                $table->string('Radiologi_Ralan', 15)->nullable()->index('radiologi_ralan');
                $table->string('Beban_Jasa_Medik_Dokter_Radiologi_Ralan', 15)->index('beban_jasa_medik_dokter_radiologi_ralan');
                $table->string('Utang_Jasa_Medik_Dokter_Radiologi_Ralan', 15)->index('utang_jasa_medik_dokter_radiologi_ralan');
                $table->string('Beban_Jasa_Medik_Petugas_Radiologi_Ralan', 15)->index('beban_jasa_medik_petugas_radiologi_ralan');
                $table->string('Utang_Jasa_Medik_Petugas_Radiologi_Ralan', 15)->index('utang_jasa_medik_petugas_radiologi_ralan');
                $table->string('Beban_Kso_Radiologi_Ralan', 15)->index('beban_kso_radiologi_ralan');
                $table->string('Utang_Kso_Radiologi_Ralan', 15)->index('utang_kso_radiologi_ralan');
                $table->string('HPP_Persediaan_Radiologi_Rawat_Jalan', 15)->index('hpp_persediaan_radiologi_rawat_jalan');
                $table->string('Persediaan_BHP_Radiologi_Rawat_Jalan', 15)->index('persediaan_bhp_radiologi_rawat_jalan');
                $table->string('Beban_Jasa_Sarana_Radiologi_Ralan', 15)->index('beban_jasa_sarana_radiologi_ralan');
                $table->string('Utang_Jasa_Sarana_Radiologi_Ralan', 15)->index('utang_jasa_sarana_radiologi_ralan');
                $table->string('Beban_Jasa_Perujuk_Radiologi_Ralan', 15)->index('beban_jasa_perujuk_radiologi_ralan');
                $table->string('Utang_Jasa_Perujuk_Radiologi_Ralan', 15)->index('utang_jasa_perujuk_radiologi_ralan');
                $table->string('Beban_Jasa_Menejemen_Radiologi_Ralan', 15)->index('beban_jasa_menejemen_radiologi_ralan');
                $table->string('Utang_Jasa_Menejemen_Radiologi_Ralan', 15)->index('utang_jasa_menejemen_radiologi_ralan');
                $table->string('Suspen_Piutang_Obat_Ralan', 15)->index('suspen_piutang_obat_ralan');
                $table->string('Obat_Ralan', 15)->nullable()->index('obat_ralan');
                $table->string('HPP_Obat_Rawat_Jalan', 15)->index('hpp_obat_rawat_jalan');
                $table->string('Persediaan_Obat_Rawat_Jalan', 15)->index('persediaan_obat_rawat_jalan');
                $table->string('Registrasi_Ralan', 15)->nullable()->index('registrasi_ralan');
                $table->string('Suspen_Piutang_Operasi_Ralan', 15)->index('suspen_piutang_operasi_ralan');
                $table->string('Operasi_Ralan', 15)->nullable()->index('operasi_ralan');
                $table->string('Beban_Jasa_Medik_Dokter_Operasi_Ralan', 15)->index('beban_jasa_medik_dokter_operasi_ralan');
                $table->string('Utang_Jasa_Medik_Dokter_Operasi_Ralan', 15)->index('utang_jasa_medik_dokter_operasi_ralan');
                $table->string('Beban_Jasa_Medik_Paramedis_Operasi_Ralan', 15)->index('beban_jasa_medik_paramedis_operasi_ralan');
                $table->string('Utang_Jasa_Medik_Paramedis_Operasi_Ralan', 15)->index('utang_jasa_medik_paramedis_operasi_ralan');
                $table->string('HPP_Obat_Operasi_Ralan', 15)->index('hpp_obat_operasi_ralan');
                $table->string('Persediaan_Obat_Kamar_Operasi_Ralan', 15)->index('persediaan_obat_kamar_operasi_ralan');
                $table->string('Tambahan_Ralan', 15)->nullable()->index('tambahan_ralan');
                $table->string('Potongan_Ralan', 15)->nullable()->index('potongan_ralan');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_akun_ralan');
    }
};
