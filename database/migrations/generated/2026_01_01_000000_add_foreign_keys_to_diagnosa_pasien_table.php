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
        if (Schema::hasTable('diagnosa_pasien')) {
            Schema::table('diagnosa_pasien', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'diagnosa_pasien_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_penyakit'], 'diagnosa_pasien_ibfk_2')->references(['kd_penyakit'])->on('penyakit')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('diagnosa_pasien')) {
            Schema::table('diagnosa_pasien', function (Blueprint $table) {
                $table->dropForeign('diagnosa_pasien_ibfk_1');
                $table->dropForeign('diagnosa_pasien_ibfk_2');
            });
        }
    }
};
