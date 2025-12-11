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
        if (Schema::hasTable('skdp_bpjs')) {
            Schema::table('skdp_bpjs', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'skdp_bpjs_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_dokter'], 'skdp_bpjs_ibfk_2')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('skdp_bpjs')) {
            Schema::table('skdp_bpjs', function (Blueprint $table) {
                $table->dropForeign('skdp_bpjs_ibfk_1');
                $table->dropForeign('skdp_bpjs_ibfk_2');
            });
        }
    }
};
