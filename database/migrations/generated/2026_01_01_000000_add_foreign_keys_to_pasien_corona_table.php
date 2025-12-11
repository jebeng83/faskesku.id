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
        if (Schema::hasTable('pasien_corona')) {
            Schema::table('pasien_corona', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'pasien_corona_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pasien_corona')) {
            Schema::table('pasien_corona', function (Blueprint $table) {
                $table->dropForeign('pasien_corona_ibfk_1');
            });
        }
    }
};
