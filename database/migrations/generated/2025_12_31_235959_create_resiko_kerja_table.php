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
        if (!Schema::hasTable('resiko_kerja')) {
            Schema::create('resiko_kerja', function (Blueprint $table) {
                $table->string('kode_resiko', 3)->primary();
                $table->string('nama_resiko', 100)->nullable();
                $table->tinyInteger('indek')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resiko_kerja');
    }
};
