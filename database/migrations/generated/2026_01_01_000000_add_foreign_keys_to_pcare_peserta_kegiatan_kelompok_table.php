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
        if (Schema::hasTable('pcare_peserta_kegiatan_kelompok')) {
            Schema::table('pcare_peserta_kegiatan_kelompok', function (Blueprint $table) {
                $table->foreign(['eduId'], 'pcare_peserta_kegiatan_kelompok_ibfk_1')->references(['eduId'])->on('pcare_kegiatan_kelompok')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rkm_medis'], 'pcare_peserta_kegiatan_kelompok_ibfk_2')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pcare_peserta_kegiatan_kelompok')) {
            Schema::table('pcare_peserta_kegiatan_kelompok', function (Blueprint $table) {
                $table->dropForeign('pcare_peserta_kegiatan_kelompok_ibfk_1');
                $table->dropForeign('pcare_peserta_kegiatan_kelompok_ibfk_2');
            });
        }
    }
};
