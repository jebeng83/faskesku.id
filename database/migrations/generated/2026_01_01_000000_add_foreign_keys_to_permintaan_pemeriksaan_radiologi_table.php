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
        if (Schema::hasTable('permintaan_pemeriksaan_radiologi')) {
            Schema::table('permintaan_pemeriksaan_radiologi', function (Blueprint $table) {
                $table->foreign(['noorder'], 'permintaan_pemeriksaan_radiologi_ibfk_1')->references(['noorder'])->on('permintaan_radiologi')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_jenis_prw'], 'permintaan_pemeriksaan_radiologi_ibfk_2')->references(['kd_jenis_prw'])->on('jns_perawatan_radiologi')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('permintaan_pemeriksaan_radiologi')) {
            Schema::table('permintaan_pemeriksaan_radiologi', function (Blueprint $table) {
                $table->dropForeign('permintaan_pemeriksaan_radiologi_ibfk_1');
                $table->dropForeign('permintaan_pemeriksaan_radiologi_ibfk_2');
            });
        }
    }
};
