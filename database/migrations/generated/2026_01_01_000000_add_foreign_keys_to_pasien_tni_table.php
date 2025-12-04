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
        if (Schema::hasTable('pasien_tni')) {
            Schema::table('pasien_tni', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'pasien_tni_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['golongan_tni'], 'pasien_tni_ibfk_2')->references(['id'])->on('golongan_tni')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['pangkat_tni'], 'pasien_tni_ibfk_3')->references(['id'])->on('pangkat_tni')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['satuan_tni'], 'pasien_tni_ibfk_4')->references(['id'])->on('satuan_tni')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['jabatan_tni'], 'pasien_tni_ibfk_5')->references(['id'])->on('jabatan_tni')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pasien_tni')) {
            Schema::table('pasien_tni', function (Blueprint $table) {
                $table->dropForeign('pasien_tni_ibfk_1');
                $table->dropForeign('pasien_tni_ibfk_2');
                $table->dropForeign('pasien_tni_ibfk_3');
                $table->dropForeign('pasien_tni_ibfk_4');
                $table->dropForeign('pasien_tni_ibfk_5');
            });
        }
    }
};
