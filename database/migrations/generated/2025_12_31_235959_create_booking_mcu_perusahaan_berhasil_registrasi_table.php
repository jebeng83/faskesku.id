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
        if (! Schema::hasTable('booking_mcu_perusahaan_berhasil_registrasi')) {
            Schema::create('booking_mcu_perusahaan_berhasil_registrasi', function (Blueprint $table) {
                $table->string('no_mcu', 15);
                $table->string('no_rawat', 17)->index('booking_mcu_perusahaan_berhasil_registrasi_ibfk_2');

                $table->primary(['no_mcu', 'no_rawat']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_mcu_perusahaan_berhasil_registrasi');
    }
};
