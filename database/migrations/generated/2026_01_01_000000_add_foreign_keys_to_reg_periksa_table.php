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
        if (Schema::hasTable('reg_periksa')) {
            Schema::table('reg_periksa', function (Blueprint $table) {
                $table->foreign(['kd_poli'], 'reg_periksa_ibfk_3')->references(['kd_poli'])->on('poliklinik')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter'], 'reg_periksa_ibfk_4')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_pj'], 'reg_periksa_ibfk_6')->references(['kd_pj'])->on('penjab')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_rkm_medis'], 'reg_periksa_ibfk_7')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('reg_periksa')) {
            Schema::table('reg_periksa', function (Blueprint $table) {
                $table->dropForeign('reg_periksa_ibfk_3');
                $table->dropForeign('reg_periksa_ibfk_4');
                $table->dropForeign('reg_periksa_ibfk_6');
                $table->dropForeign('reg_periksa_ibfk_7');
            });
        }
    }
};
