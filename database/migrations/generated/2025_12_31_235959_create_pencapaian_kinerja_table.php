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
        if (!Schema::hasTable('pencapaian_kinerja')) {
            Schema::create('pencapaian_kinerja', function (Blueprint $table) {
                $table->string('kode_pencapaian', 3)->primary();
                $table->string('nama_pencapaian', 200)->nullable();
                $table->tinyInteger('indek')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pencapaian_kinerja');
    }
};
