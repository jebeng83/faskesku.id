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
        if (Schema::hasTable('booking_registrasi')) {
            Schema::table('booking_registrasi', function (Blueprint $table) {
                $table->foreign(['kd_dokter'], 'booking_registrasi_ibfk_1')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_poli'], 'booking_registrasi_ibfk_2')->references(['kd_poli'])->on('poliklinik')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_pj'], 'booking_registrasi_ibfk_3')->references(['kd_pj'])->on('penjab')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rkm_medis'], 'booking_registrasi_ibfk_4')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('booking_registrasi')) {
            Schema::table('booking_registrasi', function (Blueprint $table) {
                $table->dropForeign('booking_registrasi_ibfk_1');
                $table->dropForeign('booking_registrasi_ibfk_2');
                $table->dropForeign('booking_registrasi_ibfk_3');
                $table->dropForeign('booking_registrasi_ibfk_4');
            });
        }
    }
};
