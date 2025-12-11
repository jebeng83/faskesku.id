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
        if (Schema::hasTable('hasil_pemeriksaan_echo_gambar')) {
            Schema::table('hasil_pemeriksaan_echo_gambar', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'hasil_pemeriksaan_echo_gambar_ibfk_1')->references(['no_rawat'])->on('hasil_pemeriksaan_echo')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('hasil_pemeriksaan_echo_gambar')) {
            Schema::table('hasil_pemeriksaan_echo_gambar', function (Blueprint $table) {
                $table->dropForeign('hasil_pemeriksaan_echo_gambar_ibfk_1');
            });
        }
    }
};
