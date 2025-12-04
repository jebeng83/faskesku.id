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
        if (Schema::hasTable('tagihan_mandiri')) {
            Schema::table('tagihan_mandiri', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'tagihan_mandiri_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tagihan_mandiri')) {
            Schema::table('tagihan_mandiri', function (Blueprint $table) {
                $table->dropForeign('tagihan_mandiri_ibfk_1');
            });
        }
    }
};
