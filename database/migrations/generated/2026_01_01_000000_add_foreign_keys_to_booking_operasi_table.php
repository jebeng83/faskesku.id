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
        if (Schema::hasTable('booking_operasi')) {
            Schema::table('booking_operasi', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'booking_operasi_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_paket'], 'booking_operasi_ibfk_2')->references(['kode_paket'])->on('paket_operasi')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter'], 'booking_operasi_ibfk_3')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_ruang_ok'], 'booking_operasi_ibfk_4')->references(['kd_ruang_ok'])->on('ruang_ok')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('booking_operasi')) {
            Schema::table('booking_operasi', function (Blueprint $table) {
                $table->dropForeign('booking_operasi_ibfk_1');
                $table->dropForeign('booking_operasi_ibfk_2');
                $table->dropForeign('booking_operasi_ibfk_3');
                $table->dropForeign('booking_operasi_ibfk_4');
            });
        }
    }
};
