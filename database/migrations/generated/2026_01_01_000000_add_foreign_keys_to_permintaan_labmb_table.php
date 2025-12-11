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
        if (Schema::hasTable('permintaan_labmb')) {
            Schema::table('permintaan_labmb', function (Blueprint $table) {
                $table->foreign(['dokter_perujuk'], 'permintaan_labmb_ibfk_1')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rawat'], 'permintaan_labmb_ibfk_2')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('permintaan_labmb')) {
            Schema::table('permintaan_labmb', function (Blueprint $table) {
                $table->dropForeign('permintaan_labmb_ibfk_1');
                $table->dropForeign('permintaan_labmb_ibfk_2');
            });
        }
    }
};
