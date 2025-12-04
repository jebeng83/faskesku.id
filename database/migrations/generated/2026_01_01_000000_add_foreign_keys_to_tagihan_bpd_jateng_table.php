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
        if (Schema::hasTable('tagihan_bpd_jateng')) {
            Schema::table('tagihan_bpd_jateng', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'tagihan_bpd_jateng_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tagihan_bpd_jateng')) {
            Schema::table('tagihan_bpd_jateng', function (Blueprint $table) {
                $table->dropForeign('tagihan_bpd_jateng_ibfk_1');
            });
        }
    }
};
