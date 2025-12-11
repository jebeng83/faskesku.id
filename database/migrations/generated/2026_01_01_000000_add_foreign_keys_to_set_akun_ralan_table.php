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
        if (Schema::hasTable('set_akun_ralan')) {
            Schema::table('set_akun_ralan', function (Blueprint $table) {
                $table->foreign(['Tindakan_Ralan'], 'set_akun_ralan_ibfk_1')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Jasa_Medik_Dokter_Laborat_Ralan'], 'set_akun_ralan_ibfk_10')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Jasa_Medik_Petugas_Laborat_Ralan'], 'set_akun_ralan_ibfk_11')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Jasa_Medik_Petugas_Laborat_Ralan'], 'set_akun_ralan_ibfk_12')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Kso_Laborat_Ralan'], 'set_akun_ralan_ibfk_13')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Kso_Laborat_Ralan'], 'set_akun_ralan_ibfk_14')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['HPP_Persediaan_Laborat_Rawat_Jalan'], 'set_akun_ralan_ibfk_15')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Persediaan_BHP_Laborat_Rawat_Jalan'], 'set_akun_ralan_ibfk_16')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Radiologi_Ralan'], 'set_akun_ralan_ibfk_17')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Jasa_Medik_Dokter_Radiologi_Ralan'], 'set_akun_ralan_ibfk_18')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Jasa_Medik_Dokter_Radiologi_Ralan'], 'set_akun_ralan_ibfk_19')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Jasa_Medik_Dokter_Tindakan_Ralan'], 'set_akun_ralan_ibfk_2')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Jasa_Medik_Petugas_Radiologi_Ralan'], 'set_akun_ralan_ibfk_20')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Jasa_Medik_Petugas_Radiologi_Ralan'], 'set_akun_ralan_ibfk_21')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Kso_Radiologi_Ralan'], 'set_akun_ralan_ibfk_22')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Kso_Radiologi_Ralan'], 'set_akun_ralan_ibfk_23')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['HPP_Persediaan_Radiologi_Rawat_Jalan'], 'set_akun_ralan_ibfk_24')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Persediaan_BHP_Radiologi_Rawat_Jalan'], 'set_akun_ralan_ibfk_25')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Obat_Ralan'], 'set_akun_ralan_ibfk_26')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['HPP_Obat_Rawat_Jalan'], 'set_akun_ralan_ibfk_27')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Persediaan_Obat_Rawat_Jalan'], 'set_akun_ralan_ibfk_28')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Registrasi_Ralan'], 'set_akun_ralan_ibfk_29')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Jasa_Medik_Dokter_Tindakan_Ralan'], 'set_akun_ralan_ibfk_3')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Operasi_Ralan'], 'set_akun_ralan_ibfk_30')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Jasa_Medik_Dokter_Operasi_Ralan'], 'set_akun_ralan_ibfk_31')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Jasa_Medik_Dokter_Operasi_Ralan'], 'set_akun_ralan_ibfk_32')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Jasa_Medik_Paramedis_Operasi_Ralan'], 'set_akun_ralan_ibfk_33')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Jasa_Medik_Paramedis_Operasi_Ralan'], 'set_akun_ralan_ibfk_34')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['HPP_Obat_Operasi_Ralan'], 'set_akun_ralan_ibfk_35')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Persediaan_Obat_Kamar_Operasi_Ralan'], 'set_akun_ralan_ibfk_36')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Tambahan_Ralan'], 'set_akun_ralan_ibfk_37')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Potongan_Ralan'], 'set_akun_ralan_ibfk_38')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Jasa_Menejemen_Tindakan_Ralan'], 'set_akun_ralan_ibfk_39')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Jasa_Medik_Paramedis_Tindakan_Ralan'], 'set_akun_ralan_ibfk_4')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Jasa_Sarana_Tindakan_Ralan'], 'set_akun_ralan_ibfk_40')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['HPP_BHP_Tindakan_Ralan'], 'set_akun_ralan_ibfk_41')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Jasa_Menejemen_Tindakan_Ralan'], 'set_akun_ralan_ibfk_42')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Jasa_Sarana_Tindakan_Ralan'], 'set_akun_ralan_ibfk_43')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Persediaan_BHP_Tindakan_Ralan'], 'set_akun_ralan_ibfk_44')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Suspen_Piutang_Tindakan_Ralan'], 'set_akun_ralan_ibfk_45')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Suspen_Piutang_Laborat_Ralan'], 'set_akun_ralan_ibfk_46')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Suspen_Piutang_Radiologi_Ralan'], 'set_akun_ralan_ibfk_47')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Suspen_Piutang_Obat_Ralan'], 'set_akun_ralan_ibfk_48')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Suspen_Piutang_Operasi_Ralan'], 'set_akun_ralan_ibfk_49')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Jasa_Medik_Paramedis_Tindakan_Ralan'], 'set_akun_ralan_ibfk_5')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Jasa_Sarana_Laborat_Ralan'], 'set_akun_ralan_ibfk_50')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Jasa_Sarana_Laborat_Ralan'], 'set_akun_ralan_ibfk_51')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Jasa_Perujuk_Laborat_Ralan'], 'set_akun_ralan_ibfk_52')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Jasa_Perujuk_Laborat_Ralan'], 'set_akun_ralan_ibfk_53')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Jasa_Menejemen_Laborat_Ralan'], 'set_akun_ralan_ibfk_54')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Jasa_Menejemen_Laborat_Ralan'], 'set_akun_ralan_ibfk_55')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Jasa_Sarana_Radiologi_Ralan'], 'set_akun_ralan_ibfk_56')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Jasa_Sarana_Radiologi_Ralan'], 'set_akun_ralan_ibfk_57')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Jasa_Perujuk_Radiologi_Ralan'], 'set_akun_ralan_ibfk_58')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Jasa_Perujuk_Radiologi_Ralan'], 'set_akun_ralan_ibfk_59')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_KSO_Tindakan_Ralan'], 'set_akun_ralan_ibfk_6')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Jasa_Menejemen_Radiologi_Ralan'], 'set_akun_ralan_ibfk_60')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_Jasa_Menejemen_Radiologi_Ralan'], 'set_akun_ralan_ibfk_61')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Utang_KSO_Tindakan_Ralan'], 'set_akun_ralan_ibfk_7')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Laborat_Ralan'], 'set_akun_ralan_ibfk_8')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Beban_Jasa_Medik_Dokter_Laborat_Ralan'], 'set_akun_ralan_ibfk_9')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('set_akun_ralan')) {
            Schema::table('set_akun_ralan', function (Blueprint $table) {
                $table->dropForeign('set_akun_ralan_ibfk_1');
                $table->dropForeign('set_akun_ralan_ibfk_10');
                $table->dropForeign('set_akun_ralan_ibfk_11');
                $table->dropForeign('set_akun_ralan_ibfk_12');
                $table->dropForeign('set_akun_ralan_ibfk_13');
                $table->dropForeign('set_akun_ralan_ibfk_14');
                $table->dropForeign('set_akun_ralan_ibfk_15');
                $table->dropForeign('set_akun_ralan_ibfk_16');
                $table->dropForeign('set_akun_ralan_ibfk_17');
                $table->dropForeign('set_akun_ralan_ibfk_18');
                $table->dropForeign('set_akun_ralan_ibfk_19');
                $table->dropForeign('set_akun_ralan_ibfk_2');
                $table->dropForeign('set_akun_ralan_ibfk_20');
                $table->dropForeign('set_akun_ralan_ibfk_21');
                $table->dropForeign('set_akun_ralan_ibfk_22');
                $table->dropForeign('set_akun_ralan_ibfk_23');
                $table->dropForeign('set_akun_ralan_ibfk_24');
                $table->dropForeign('set_akun_ralan_ibfk_25');
                $table->dropForeign('set_akun_ralan_ibfk_26');
                $table->dropForeign('set_akun_ralan_ibfk_27');
                $table->dropForeign('set_akun_ralan_ibfk_28');
                $table->dropForeign('set_akun_ralan_ibfk_29');
                $table->dropForeign('set_akun_ralan_ibfk_3');
                $table->dropForeign('set_akun_ralan_ibfk_30');
                $table->dropForeign('set_akun_ralan_ibfk_31');
                $table->dropForeign('set_akun_ralan_ibfk_32');
                $table->dropForeign('set_akun_ralan_ibfk_33');
                $table->dropForeign('set_akun_ralan_ibfk_34');
                $table->dropForeign('set_akun_ralan_ibfk_35');
                $table->dropForeign('set_akun_ralan_ibfk_36');
                $table->dropForeign('set_akun_ralan_ibfk_37');
                $table->dropForeign('set_akun_ralan_ibfk_38');
                $table->dropForeign('set_akun_ralan_ibfk_39');
                $table->dropForeign('set_akun_ralan_ibfk_4');
                $table->dropForeign('set_akun_ralan_ibfk_40');
                $table->dropForeign('set_akun_ralan_ibfk_41');
                $table->dropForeign('set_akun_ralan_ibfk_42');
                $table->dropForeign('set_akun_ralan_ibfk_43');
                $table->dropForeign('set_akun_ralan_ibfk_44');
                $table->dropForeign('set_akun_ralan_ibfk_45');
                $table->dropForeign('set_akun_ralan_ibfk_46');
                $table->dropForeign('set_akun_ralan_ibfk_47');
                $table->dropForeign('set_akun_ralan_ibfk_48');
                $table->dropForeign('set_akun_ralan_ibfk_49');
                $table->dropForeign('set_akun_ralan_ibfk_5');
                $table->dropForeign('set_akun_ralan_ibfk_50');
                $table->dropForeign('set_akun_ralan_ibfk_51');
                $table->dropForeign('set_akun_ralan_ibfk_52');
                $table->dropForeign('set_akun_ralan_ibfk_53');
                $table->dropForeign('set_akun_ralan_ibfk_54');
                $table->dropForeign('set_akun_ralan_ibfk_55');
                $table->dropForeign('set_akun_ralan_ibfk_56');
                $table->dropForeign('set_akun_ralan_ibfk_57');
                $table->dropForeign('set_akun_ralan_ibfk_58');
                $table->dropForeign('set_akun_ralan_ibfk_59');
                $table->dropForeign('set_akun_ralan_ibfk_6');
                $table->dropForeign('set_akun_ralan_ibfk_60');
                $table->dropForeign('set_akun_ralan_ibfk_61');
                $table->dropForeign('set_akun_ralan_ibfk_7');
                $table->dropForeign('set_akun_ralan_ibfk_8');
                $table->dropForeign('set_akun_ralan_ibfk_9');
            });
        }
    }
};
