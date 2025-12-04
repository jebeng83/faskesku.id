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
        if (Schema::hasTable('bayar_rawat_inap_dr')) {
            Schema::table('bayar_rawat_inap_dr', function (Blueprint $table) {
                $table->foreign(['kd_jenis_prw'], 'bayar_rawat_inap_dr_ibfk_1')->references(['kd_jenis_prw'])->on('jns_perawatan_inap')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_rawat'], 'bayar_rawat_inap_dr_ibfk_2')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_bayar'], 'bayar_rawat_inap_dr_ibfk_3')->references(['no_bayar'])->on('bayar_jm_dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bayar_rawat_inap_dr')) {
            Schema::table('bayar_rawat_inap_dr', function (Blueprint $table) {
                $table->dropForeign('bayar_rawat_inap_dr_ibfk_1');
                $table->dropForeign('bayar_rawat_inap_dr_ibfk_2');
                $table->dropForeign('bayar_rawat_inap_dr_ibfk_3');
            });
        }
    }
};
