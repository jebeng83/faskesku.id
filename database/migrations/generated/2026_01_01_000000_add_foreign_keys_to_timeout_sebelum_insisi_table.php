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
        if (Schema::hasTable('timeout_sebelum_insisi')) {
            Schema::table('timeout_sebelum_insisi', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'timeout_sebelum_insisi_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip_perawat_ok'], 'timeout_sebelum_insisi_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter_anestesi'], 'timeout_sebelum_insisi_ibfk_3')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_dokter_bedah'], 'timeout_sebelum_insisi_ibfk_4')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('timeout_sebelum_insisi')) {
            Schema::table('timeout_sebelum_insisi', function (Blueprint $table) {
                $table->dropForeign('timeout_sebelum_insisi_ibfk_1');
                $table->dropForeign('timeout_sebelum_insisi_ibfk_2');
                $table->dropForeign('timeout_sebelum_insisi_ibfk_3');
                $table->dropForeign('timeout_sebelum_insisi_ibfk_4');
            });
        }
    }
};
