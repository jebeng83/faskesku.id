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
        if (Schema::hasTable('laporan_anestesi')) {
            Schema::table('laporan_anestesi', function (Blueprint $table) {
                $table->foreign(['operator1'], 'laporan_anestesi_ibfk_1')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['operator2'], 'laporan_anestesi_ibfk_2')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['dokter_anestesi'], 'laporan_anestesi_ibfk_3')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['asisten_operator'], 'laporan_anestesi_ibfk_4')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['penata_anestesi'], 'laporan_anestesi_ibfk_5')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['onloop'], 'laporan_anestesi_ibfk_6')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip_recovery_room'], 'laporan_anestesi_ibfk_7')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rawat'], 'laporan_anestesi_ibfk_8')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('laporan_anestesi')) {
            Schema::table('laporan_anestesi', function (Blueprint $table) {
                $table->dropForeign('laporan_anestesi_ibfk_1');
                $table->dropForeign('laporan_anestesi_ibfk_2');
                $table->dropForeign('laporan_anestesi_ibfk_3');
                $table->dropForeign('laporan_anestesi_ibfk_4');
                $table->dropForeign('laporan_anestesi_ibfk_5');
                $table->dropForeign('laporan_anestesi_ibfk_6');
                $table->dropForeign('laporan_anestesi_ibfk_7');
                $table->dropForeign('laporan_anestesi_ibfk_8');
            });
        }
    }
};
