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
        if (Schema::hasTable('booking_mcu_perusahaan_pasien_baru')) {
            Schema::table('booking_mcu_perusahaan_pasien_baru', function (Blueprint $table) {
                $table->foreign(['perusahaan_pasien'], 'booking_mcu_perusahaan_pasien_baru_ibfk_1')->references(['kode_perusahaan'])->on('perusahaan_pasien')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('booking_mcu_perusahaan_pasien_baru')) {
            Schema::table('booking_mcu_perusahaan_pasien_baru', function (Blueprint $table) {
                $table->dropForeign('booking_mcu_perusahaan_pasien_baru_ibfk_1');
            });
        }
    }
};
