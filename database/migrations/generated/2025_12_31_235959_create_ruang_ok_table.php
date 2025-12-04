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
        if (!Schema::hasTable('ruang_ok')) {
            Schema::create('ruang_ok', function (Blueprint $table) {
                $table->string('kd_ruang_ok', 3)->primary();
                $table->string('nm_ruang_ok', 50)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ruang_ok');
    }
};
