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
        if (! Schema::hasTable('booking_operasi')) {
            Schema::create('booking_operasi', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->string('kode_paket', 15)->index('kode_paket');
                $table->date('tanggal');
                $table->time('jam_mulai');
                $table->time('jam_selesai')->nullable();
                $table->enum('status', ['Menunggu', 'Proses Operasi', 'Selesai'])->nullable();
                $table->string('kd_dokter', 20)->nullable()->index('kd_dokter');
                $table->string('kd_ruang_ok', 3)->index('kd_ruang_ok');

                $table->primary(['no_rawat', 'kode_paket', 'tanggal', 'jam_mulai']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_operasi');
    }
};
