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
        if (!Schema::hasTable('template_pemeriksaan_dokter')) {
            Schema::create('template_pemeriksaan_dokter', function (Blueprint $table) {
                $table->string('no_template', 20)->primary();
                $table->string('kd_dokter', 20)->nullable()->index('kd_dokter');
                $table->string('keluhan', 2000)->nullable();
                $table->string('pemeriksaan', 2000)->nullable();
                $table->string('penilaian', 2000)->nullable();
                $table->string('rencana', 2000);
                $table->string('instruksi', 2000);
                $table->string('evaluasi', 2000)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_pemeriksaan_dokter');
    }
};
