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
        if (!Schema::hasTable('emergency_index')) {
            Schema::create('emergency_index', function (Blueprint $table) {
                $table->string('kode_emergency', 3)->primary();
                $table->string('nama_emergency', 100)->nullable();
                $table->tinyInteger('indek')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emergency_index');
    }
};
