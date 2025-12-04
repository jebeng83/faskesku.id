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
        if (Schema::hasTable('referensi_mobilejkn_bpjs')) {
            Schema::table('referensi_mobilejkn_bpjs', function (Blueprint $table) {
                $table->foreign(['norm'], 'referensi_mobilejkn_bpjs_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('referensi_mobilejkn_bpjs')) {
            Schema::table('referensi_mobilejkn_bpjs', function (Blueprint $table) {
                $table->dropForeign('referensi_mobilejkn_bpjs_ibfk_1');
            });
        }
    }
};
