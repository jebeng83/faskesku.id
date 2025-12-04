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
        if (Schema::hasTable('template_pemeriksaan_dokter_resep_racikan')) {
            Schema::table('template_pemeriksaan_dokter_resep_racikan', function (Blueprint $table) {
                $table->foreign(['no_template'], 'template_pemeriksaan_dokter_resep_racikan_ibfk_1')->references(['no_template'])->on('template_pemeriksaan_dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_racik'], 'template_pemeriksaan_dokter_resep_racikan_ibfk_2')->references(['kd_racik'])->on('metode_racik')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('template_pemeriksaan_dokter_resep_racikan')) {
            Schema::table('template_pemeriksaan_dokter_resep_racikan', function (Blueprint $table) {
                $table->dropForeign('template_pemeriksaan_dokter_resep_racikan_ibfk_1');
                $table->dropForeign('template_pemeriksaan_dokter_resep_racikan_ibfk_2');
            });
        }
    }
};
