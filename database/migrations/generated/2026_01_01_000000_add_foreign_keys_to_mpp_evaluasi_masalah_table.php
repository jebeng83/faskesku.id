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
        if (Schema::hasTable('mpp_evaluasi_masalah')) {
            Schema::table('mpp_evaluasi_masalah', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'mpp_evaluasi_masalah_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_masalah'], 'mpp_evaluasi_masalah_ibfk_2')->references(['kode_masalah'])->on('master_masalah_keperawatan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('mpp_evaluasi_masalah')) {
            Schema::table('mpp_evaluasi_masalah', function (Blueprint $table) {
                $table->dropForeign('mpp_evaluasi_masalah_ibfk_1');
                $table->dropForeign('mpp_evaluasi_masalah_ibfk_2');
            });
        }
    }
};
