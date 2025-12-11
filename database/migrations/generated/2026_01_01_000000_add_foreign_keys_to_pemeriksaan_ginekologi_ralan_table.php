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
        if (Schema::hasTable('pemeriksaan_ginekologi_ralan')) {
            Schema::table('pemeriksaan_ginekologi_ralan', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'pemeriksaan_ginekologi_ralan_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pemeriksaan_ginekologi_ralan')) {
            Schema::table('pemeriksaan_ginekologi_ralan', function (Blueprint $table) {
                $table->dropForeign('pemeriksaan_ginekologi_ralan_ibfk_1');
            });
        }
    }
};
