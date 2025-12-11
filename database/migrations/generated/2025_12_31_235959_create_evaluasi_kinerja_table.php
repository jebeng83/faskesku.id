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
        if (!Schema::hasTable('evaluasi_kinerja')) {
            Schema::create('evaluasi_kinerja', function (Blueprint $table) {
                $table->string('kode_evaluasi', 3)->primary();
                $table->string('nama_evaluasi', 200)->nullable();
                $table->tinyInteger('indek')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluasi_kinerja');
    }
};
