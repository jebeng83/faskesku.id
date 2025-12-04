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
        if (!Schema::hasTable('template_pemeriksaan_dokter_permintaan_radiologi')) {
            Schema::create('template_pemeriksaan_dokter_permintaan_radiologi', function (Blueprint $table) {
                $table->string('no_template', 20);
                $table->string('kd_jenis_prw', 15)->index('kd_jenis_prw');

                $table->primary(['no_template', 'kd_jenis_prw']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_pemeriksaan_dokter_permintaan_radiologi');
    }
};
