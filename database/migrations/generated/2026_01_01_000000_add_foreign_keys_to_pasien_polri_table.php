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
        if (Schema::hasTable('pasien_polri')) {
            Schema::table('pasien_polri', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'pasien_polri_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['golongan_polri'], 'pasien_polri_ibfk_2')->references(['id'])->on('golongan_polri')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['pangkat_polri'], 'pasien_polri_ibfk_3')->references(['id'])->on('pangkat_polri')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['satuan_polri'], 'pasien_polri_ibfk_4')->references(['id'])->on('satuan_polri')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['jabatan_polri'], 'pasien_polri_ibfk_5')->references(['id'])->on('jabatan_polri')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pasien_polri')) {
            Schema::table('pasien_polri', function (Blueprint $table) {
                $table->dropForeign('pasien_polri_ibfk_1');
                $table->dropForeign('pasien_polri_ibfk_2');
                $table->dropForeign('pasien_polri_ibfk_3');
                $table->dropForeign('pasien_polri_ibfk_4');
                $table->dropForeign('pasien_polri_ibfk_5');
            });
        }
    }
};
