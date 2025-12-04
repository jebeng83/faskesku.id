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
        if (Schema::hasTable('pasien_mati')) {
            Schema::table('pasien_mati', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'pasien_mati_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_dokter'], 'pasien_mati_ibfk_2')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pasien_mati')) {
            Schema::table('pasien_mati', function (Blueprint $table) {
                $table->dropForeign('pasien_mati_ibfk_1');
                $table->dropForeign('pasien_mati_ibfk_2');
            });
        }
    }
};
