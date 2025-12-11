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
        if (Schema::hasTable('rujukanranap_dokter_rs')) {
            Schema::table('rujukanranap_dokter_rs', function (Blueprint $table) {
                $table->foreign(['kd_dokter'], 'rujukanranap_dokter_rs_ibfk_1')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rkm_medis'], 'rujukanranap_dokter_rs_ibfk_2')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_kamar'], 'rujukanranap_dokter_rs_ibfk_3')->references(['kd_kamar'])->on('kamar')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('rujukanranap_dokter_rs')) {
            Schema::table('rujukanranap_dokter_rs', function (Blueprint $table) {
                $table->dropForeign('rujukanranap_dokter_rs_ibfk_1');
                $table->dropForeign('rujukanranap_dokter_rs_ibfk_2');
                $table->dropForeign('rujukanranap_dokter_rs_ibfk_3');
            });
        }
    }
};
