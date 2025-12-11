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
        if (Schema::hasTable('diagnosa_corona')) {
            Schema::table('diagnosa_corona', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'diagnosa_corona_ibfk_1')->references(['no_rkm_medis'])->on('pasien_corona')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('diagnosa_corona')) {
            Schema::table('diagnosa_corona', function (Blueprint $table) {
                $table->dropForeign('diagnosa_corona_ibfk_1');
            });
        }
    }
};
