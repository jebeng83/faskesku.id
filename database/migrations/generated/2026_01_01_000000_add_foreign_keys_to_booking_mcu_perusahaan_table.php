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
        if (Schema::hasTable('booking_mcu_perusahaan')) {
            Schema::table('booking_mcu_perusahaan', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'booking_mcu_perusahaan_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_perusahaan'], 'booking_mcu_perusahaan_ibfk_2')->references(['kode_perusahaan'])->on('perusahaan_pasien')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('booking_mcu_perusahaan')) {
            Schema::table('booking_mcu_perusahaan', function (Blueprint $table) {
                $table->dropForeign('booking_mcu_perusahaan_ibfk_1');
                $table->dropForeign('booking_mcu_perusahaan_ibfk_2');
            });
        }
    }
};
