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
        if (Schema::hasTable('catatan_anestesi_sedasi')) {
            Schema::table('catatan_anestesi_sedasi', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'catatan_anestesi_sedasi_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip_perawat_ok'], 'catatan_anestesi_sedasi_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip_perawat_anestesi'], 'catatan_anestesi_sedasi_ibfk_3')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter_anestesi'], 'catatan_anestesi_sedasi_ibfk_4')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter_bedah'], 'catatan_anestesi_sedasi_ibfk_5')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('catatan_anestesi_sedasi')) {
            Schema::table('catatan_anestesi_sedasi', function (Blueprint $table) {
                $table->dropForeign('catatan_anestesi_sedasi_ibfk_1');
                $table->dropForeign('catatan_anestesi_sedasi_ibfk_2');
                $table->dropForeign('catatan_anestesi_sedasi_ibfk_3');
                $table->dropForeign('catatan_anestesi_sedasi_ibfk_4');
                $table->dropForeign('catatan_anestesi_sedasi_ibfk_5');
            });
        }
    }
};
