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
        if (!Schema::hasTable('set_akun_ranap')) {
            Schema::create('set_akun_ranap', function (Blueprint $table) {
                $table->string('Suspen_Piutang_Tindakan_Ranap', 15)->index('suspen_piutang_tindakan_ranap');
                $table->string('Tindakan_Ranap', 15)->nullable()->index('tindakan_ranap');
                $table->string('Beban_Jasa_Medik_Dokter_Tindakan_Ranap', 15)->index('beban_jasa_medik_dokter_tindakan_ranap');
                $table->string('Utang_Jasa_Medik_Dokter_Tindakan_Ranap', 15)->index('utang_jasa_medik_dokter_tindakan_ranap');
                $table->string('Beban_Jasa_Medik_Paramedis_Tindakan_Ranap', 15)->index('beban_jasa_medik_paramedis_tindakan_ranap');
                $table->string('Utang_Jasa_Medik_Paramedis_Tindakan_Ranap', 15)->index('utang_jasa_medik_paramedis_tindakan_ranap');
                $table->string('Beban_KSO_Tindakan_Ranap', 15)->index('beban_kso_tindakan_ranap');
                $table->string('Utang_KSO_Tindakan_Ranap', 15)->index('utang_kso_tindakan_ranap');
                $table->string('Beban_Jasa_Sarana_Tindakan_Ranap', 15)->index('beban_jasa_sarana_tindakan_ranap');
                $table->string('Utang_Jasa_Sarana_Tindakan_Ranap', 15)->index('utang_jasa_sarana_tindakan_ranap');
                $table->string('Beban_Jasa_Menejemen_Tindakan_Ranap', 15)->index('beban_jasa_menejemen_tindakan_ranap');
                $table->string('Utang_Jasa_Menejemen_Tindakan_Ranap', 15)->index('utang_jasa_menejemen_tindakan_ranap');
                $table->string('HPP_BHP_Tindakan_Ranap', 15)->index('hpp_bhp_tindakan_ranap');
                $table->string('Persediaan_BHP_Tindakan_Ranap', 15)->index('persediaan_bhp_tindakan_ranap');
                $table->string('Suspen_Piutang_Laborat_Ranap', 15)->index('suspen_piutang_laborat_ranap');
                $table->string('Laborat_Ranap', 15)->nullable()->index('laborat_ranap');
                $table->string('Beban_Jasa_Medik_Dokter_Laborat_Ranap', 15)->index('beban_jasa_medik_dokter_laborat_ranap');
                $table->string('Utang_Jasa_Medik_Dokter_Laborat_Ranap', 15)->index('utang_jasa_medik_dokter_laborat_ranap');
                $table->string('Beban_Jasa_Medik_Petugas_Laborat_Ranap', 15)->index('beban_jasa_medik_petugas_laborat_ranap');
                $table->string('Utang_Jasa_Medik_Petugas_Laborat_Ranap', 15)->index('utang_jasa_medik_petugas_laborat_ranap');
                $table->string('Beban_Kso_Laborat_Ranap', 15)->index('beban_kso_laborat_ranap');
                $table->string('Utang_Kso_Laborat_Ranap', 15)->index('utang_kso_laborat_ranap');
                $table->string('HPP_Persediaan_Laborat_Rawat_inap', 15)->index('hpp_persediaan_laborat_rawat_inap');
                $table->string('Persediaan_BHP_Laborat_Rawat_Inap', 15)->index('persediaan_bhp_laborat_rawat_inap');
                $table->string('Beban_Jasa_Sarana_Laborat_Ranap', 15)->index('beban_jasa_sarana_laborat_ranap');
                $table->string('Utang_Jasa_Sarana_Laborat_Ranap', 15)->index('utang_jasa_sarana_laborat_ranap');
                $table->string('Beban_Jasa_Perujuk_Laborat_Ranap', 15)->index('beban_jasa_perujuk_laborat_ranap');
                $table->string('Utang_Jasa_Perujuk_Laborat_Ranap', 15)->index('utang_jasa_perujuk_laborat_ranap');
                $table->string('Beban_Jasa_Menejemen_Laborat_Ranap', 15)->index('beban_jasa_menejemen_laborat_ranap');
                $table->string('Utang_Jasa_Menejemen_Laborat_Ranap', 15)->index('utang_jasa_menejemen_laborat_ranap');
                $table->string('Suspen_Piutang_Radiologi_Ranap', 15)->index('suspen_piutang_radiologi_ranap');
                $table->string('Radiologi_Ranap', 15)->nullable()->index('radiologi_ranap');
                $table->string('Beban_Jasa_Medik_Dokter_Radiologi_Ranap', 15)->index('beban_jasa_medik_dokter_radiologi_ranap');
                $table->string('Utang_Jasa_Medik_Dokter_Radiologi_Ranap', 15)->index('utang_jasa_medik_dokter_radiologi_ranap');
                $table->string('Beban_Jasa_Medik_Petugas_Radiologi_Ranap', 15)->index('beban_jasa_medik_petugas_radiologi_ranap');
                $table->string('Utang_Jasa_Medik_Petugas_Radiologi_Ranap', 15)->index('utang_jasa_medik_petugas_radiologi_ranap');
                $table->string('Beban_Kso_Radiologi_Ranap', 15)->index('beban_kso_radiologi_ranap');
                $table->string('Utang_Kso_Radiologi_Ranap', 15)->index('utang_kso_radiologi_ranap');
                $table->string('HPP_Persediaan_Radiologi_Rawat_Inap', 15)->index('hpp_persediaan_radiologi_rawat_inap');
                $table->string('Persediaan_BHP_Radiologi_Rawat_Inap', 15)->index('persediaan_bhp_radiologi_rawat_inap');
                $table->string('Beban_Jasa_Sarana_Radiologi_Ranap', 15)->index('beban_jasa_sarana_radiologi_ranap');
                $table->string('Utang_Jasa_Sarana_Radiologi_Ranap', 15)->index('utang_jasa_sarana_radiologi_ranap');
                $table->string('Beban_Jasa_Perujuk_Radiologi_Ranap', 15)->index('beban_jasa_perujuk_radiologi_ranap');
                $table->string('Utang_Jasa_Perujuk_Radiologi_Ranap', 15)->index('utang_jasa_perujuk_radiologi_ranap');
                $table->string('Beban_Jasa_Menejemen_Radiologi_Ranap', 15)->index('beban_jasa_menejemen_radiologi_ranap');
                $table->string('Utang_Jasa_Menejemen_Radiologi_Ranap', 15)->index('utang_jasa_menejemen_radiologi_ranap');
                $table->string('Suspen_Piutang_Obat_Ranap', 15)->index('suspen_piutang_obat_ranap');
                $table->string('Obat_Ranap', 15)->nullable()->index('obat_ranap');
                $table->string('HPP_Obat_Rawat_Inap', 15)->index('hpp_obat_rawat_inap');
                $table->string('Persediaan_Obat_Rawat_Inap', 15)->index('persediaan_obat_rawat_inap');
                $table->string('Registrasi_Ranap', 15)->nullable()->index('registrasi_ranap');
                $table->string('Service_Ranap', 15)->nullable()->index('service_ranap');
                $table->string('Tambahan_Ranap', 15)->nullable()->index('tambahan_ranap');
                $table->string('Potongan_Ranap', 15)->nullable()->index('potongan_ranap');
                $table->string('Retur_Obat_Ranap', 15)->nullable()->index('retur_obat_ranap');
                $table->string('Resep_Pulang_Ranap', 15)->nullable()->index('resep_pulang_ranap');
                $table->string('Kamar_Inap', 15)->nullable()->index('kamar_inap');
                $table->string('Suspen_Piutang_Operasi_Ranap', 15)->index('suspen_piutang_operasi_ranap');
                $table->string('Operasi_Ranap', 15)->nullable()->index('operasi_ranap');
                $table->string('Beban_Jasa_Medik_Dokter_Operasi_Ranap', 15)->index('beban_jasa_medik_dokter_operasi_ranap');
                $table->string('Utang_Jasa_Medik_Dokter_Operasi_Ranap', 15)->index('utang_jasa_medik_dokter_operasi_ranap');
                $table->string('Beban_Jasa_Medik_Paramedis_Operasi_Ranap', 15)->index('beban_jasa_medik_paramedis_operasi_ranap');
                $table->string('Utang_Jasa_Medik_Paramedis_Operasi_Ranap', 15)->index('utang_jasa_medik_paramedis_operasi_ranap');
                $table->string('HPP_Obat_Operasi_Ranap', 15)->index('hpp_obat_operasi_ranap');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_akun_ranap');
    }
};
