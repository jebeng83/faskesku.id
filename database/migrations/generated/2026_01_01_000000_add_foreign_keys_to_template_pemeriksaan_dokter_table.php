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
        if (Schema::hasTable('template_pemeriksaan_dokter')) {
            Schema::table('template_pemeriksaan_dokter', function (Blueprint $table) {
                $table->foreign(['kd_dokter'], 'template_pemeriksaan_dokter_ibfk_1')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('template_pemeriksaan_dokter')) {
            Schema::table('template_pemeriksaan_dokter', function (Blueprint $table) {
                $table->dropForeign('template_pemeriksaan_dokter_ibfk_1');
            });
        }
    }
};
