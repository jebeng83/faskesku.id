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
        if (Schema::hasTable('penilaian_bayi_baru_lahir')) {
            Schema::table('penilaian_bayi_baru_lahir', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'penilaian_bayi_baru_lahir_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter'], 'penilaian_bayi_baru_lahir_ibfk_2')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rkm_medis_ibu'], 'penilaian_bayi_baru_lahir_ibfk_3')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('penilaian_bayi_baru_lahir')) {
            Schema::table('penilaian_bayi_baru_lahir', function (Blueprint $table) {
                $table->dropForeign('penilaian_bayi_baru_lahir_ibfk_1');
                $table->dropForeign('penilaian_bayi_baru_lahir_ibfk_2');
                $table->dropForeign('penilaian_bayi_baru_lahir_ibfk_3');
            });
        }
    }
};
