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
        if (Schema::hasTable('inhealth_jenpel_ruang_rawat')) {
            Schema::table('inhealth_jenpel_ruang_rawat', function (Blueprint $table) {
                $table->foreign(['kd_kamar'], 'inhealth_jenpel_ruang_rawat_ibfk_1')->references(['kd_kamar'])->on('kamar')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inhealth_jenpel_ruang_rawat')) {
            Schema::table('inhealth_jenpel_ruang_rawat', function (Blueprint $table) {
                $table->dropForeign('inhealth_jenpel_ruang_rawat_ibfk_1');
            });
        }
    }
};
