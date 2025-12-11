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
        if (!Schema::hasTable('hasil_pemeriksaan_slit_lamp_gambar')) {
            Schema::create('hasil_pemeriksaan_slit_lamp_gambar', function (Blueprint $table) {
                $table->string('no_rawat', 20)->primary();
                $table->string('photo', 500)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_pemeriksaan_slit_lamp_gambar');
    }
};
