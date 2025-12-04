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
        if (Schema::hasTable('permintaan_medis')) {
            Schema::table('permintaan_medis', function (Blueprint $table) {
                $table->foreign(['kd_bangsal'], 'permintaan_medis_ibfk_1')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip'], 'permintaan_medis_ibfk_2')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_bangsaltujuan'], 'permintaan_medis_ibfk_3')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('permintaan_medis')) {
            Schema::table('permintaan_medis', function (Blueprint $table) {
                $table->dropForeign('permintaan_medis_ibfk_1');
                $table->dropForeign('permintaan_medis_ibfk_2');
                $table->dropForeign('permintaan_medis_ibfk_3');
            });
        }
    }
};
