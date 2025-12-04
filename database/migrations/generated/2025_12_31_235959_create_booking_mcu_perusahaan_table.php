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
        if (!Schema::hasTable('booking_mcu_perusahaan')) {
            Schema::create('booking_mcu_perusahaan', function (Blueprint $table) {
                $table->date('tanggal_booking')->nullable();
                $table->time('jam_booking')->nullable();
                $table->string('no_rkm_medis', 15)->index('no_rkm_medis');
                $table->date('tanggal_mcu');
                $table->string('no_mcu', 15)->primary();
                $table->enum('status', ['Terdaftar', 'Menunggu Hasil', 'Selesai'])->nullable();
                $table->string('kode_perusahaan', 8)->index('kode_perusahaan');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_mcu_perusahaan');
    }
};
