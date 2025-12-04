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
        if (Schema::hasTable('template_pemeriksaan_dokter_penyakit')) {
            Schema::table('template_pemeriksaan_dokter_penyakit', function (Blueprint $table) {
                $table->foreign(['no_template'], 'template_pemeriksaan_dokter_penyakit_ibfk_1')->references(['no_template'])->on('template_pemeriksaan_dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_penyakit'], 'template_pemeriksaan_dokter_penyakit_ibfk_2')->references(['kd_penyakit'])->on('penyakit')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('template_pemeriksaan_dokter_penyakit')) {
            Schema::table('template_pemeriksaan_dokter_penyakit', function (Blueprint $table) {
                $table->dropForeign('template_pemeriksaan_dokter_penyakit_ibfk_1');
                $table->dropForeign('template_pemeriksaan_dokter_penyakit_ibfk_2');
            });
        }
    }
};
