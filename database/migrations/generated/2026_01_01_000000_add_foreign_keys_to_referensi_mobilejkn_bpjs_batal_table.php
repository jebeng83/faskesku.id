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
        if (Schema::hasTable('referensi_mobilejkn_bpjs_batal')) {
            Schema::table('referensi_mobilejkn_bpjs_batal', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'referensi_mobilejkn_bpjs_batal_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nobooking'], 'referensi_mobilejkn_bpjs_batal_ibfk_2')->references(['nobooking'])->on('referensi_mobilejkn_bpjs')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('referensi_mobilejkn_bpjs_batal')) {
            Schema::table('referensi_mobilejkn_bpjs_batal', function (Blueprint $table) {
                $table->dropForeign('referensi_mobilejkn_bpjs_batal_ibfk_1');
                $table->dropForeign('referensi_mobilejkn_bpjs_batal_ibfk_2');
            });
        }
    }
};
