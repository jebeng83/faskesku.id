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
        if (Schema::hasTable('permintaan_pemeriksaan_labpa')) {
            Schema::table('permintaan_pemeriksaan_labpa', function (Blueprint $table) {
                $table->foreign(['noorder'], 'permintaan_pemeriksaan_labpa_ibfk_1')->references(['noorder'])->on('permintaan_labpa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_jenis_prw'], 'permintaan_pemeriksaan_labpa_ibfk_2')->references(['kd_jenis_prw'])->on('jns_perawatan_lab')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('permintaan_pemeriksaan_labpa')) {
            Schema::table('permintaan_pemeriksaan_labpa', function (Blueprint $table) {
                $table->dropForeign('permintaan_pemeriksaan_labpa_ibfk_1');
                $table->dropForeign('permintaan_pemeriksaan_labpa_ibfk_2');
            });
        }
    }
};
