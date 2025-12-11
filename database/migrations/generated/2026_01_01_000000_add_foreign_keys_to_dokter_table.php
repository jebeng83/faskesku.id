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
        if (Schema::hasTable('dokter')) {
            Schema::table('dokter', function (Blueprint $table) {
                $table->foreign(['kd_sps'], 'dokter_ibfk_2')->references(['kd_sps'])->on('spesialis')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_dokter'], 'dokter_ibfk_3')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_dokter'])->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('dokter')) {
            Schema::table('dokter', function (Blueprint $table) {
                $table->dropForeign('dokter_ibfk_2');
                $table->dropForeign('dokter_ibfk_3');
                $table->dropForeign('dokter_kd_dokter_foreign');
            });
        }
    }
};
