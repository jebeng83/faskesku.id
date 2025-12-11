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
        if (!Schema::hasTable('maping_poliklinik_pcare')) {
            Schema::create('maping_poliklinik_pcare', function (Blueprint $table) {
                $table->char('kd_poli_rs', 5)->primary();
                $table->char('kd_poli_pcare', 5)->nullable();
                $table->string('nm_poli_pcare', 50)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maping_poliklinik_pcare');
    }
};
