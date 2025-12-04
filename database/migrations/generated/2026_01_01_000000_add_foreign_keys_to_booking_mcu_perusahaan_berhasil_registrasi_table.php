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
        if (Schema::hasTable('booking_mcu_perusahaan_berhasil_registrasi')) {
            Schema::table('booking_mcu_perusahaan_berhasil_registrasi', function (Blueprint $table) {
                $table->foreign(['no_mcu'], 'booking_mcu_perusahaan_berhasil_registrasi_ibfk_1')->references(['no_mcu'])->on('booking_mcu_perusahaan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_rawat'], 'booking_mcu_perusahaan_berhasil_registrasi_ibfk_2')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('booking_mcu_perusahaan_berhasil_registrasi')) {
            Schema::table('booking_mcu_perusahaan_berhasil_registrasi', function (Blueprint $table) {
                $table->dropForeign('booking_mcu_perusahaan_berhasil_registrasi_ibfk_1');
                $table->dropForeign('booking_mcu_perusahaan_berhasil_registrasi_ibfk_2');
            });
        }
    }
};
