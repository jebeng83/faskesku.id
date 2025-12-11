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
        if (Schema::hasTable('sisa_diet_pasien')) {
            Schema::table('sisa_diet_pasien', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'sisa_diet_pasien_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_kamar'], 'sisa_diet_pasien_ibfk_2')->references(['kd_kamar'])->on('kamar')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['waktu'], 'sisa_diet_pasien_ibfk_3')->references(['waktu'])->on('jam_diet_pasien')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('sisa_diet_pasien')) {
            Schema::table('sisa_diet_pasien', function (Blueprint $table) {
                $table->dropForeign('sisa_diet_pasien_ibfk_1');
                $table->dropForeign('sisa_diet_pasien_ibfk_2');
                $table->dropForeign('sisa_diet_pasien_ibfk_3');
            });
        }
    }
};
