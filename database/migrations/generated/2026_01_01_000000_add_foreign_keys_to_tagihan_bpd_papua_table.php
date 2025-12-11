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
        if (Schema::hasTable('tagihan_bpd_papua')) {
            Schema::table('tagihan_bpd_papua', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'tagihan_bpd_papua_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tagihan_bpd_papua')) {
            Schema::table('tagihan_bpd_papua', function (Blueprint $table) {
                $table->dropForeign('tagihan_bpd_papua_ibfk_1');
            });
        }
    }
};
