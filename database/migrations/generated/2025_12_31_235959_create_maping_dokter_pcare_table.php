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
        if (!Schema::hasTable('maping_dokter_pcare')) {
            Schema::create('maping_dokter_pcare', function (Blueprint $table) {
                $table->string('kd_dokter', 20)->primary();
                $table->string('kd_dokter_pcare', 20)->nullable();
                $table->string('nm_dokter_pcare', 50)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maping_dokter_pcare');
    }
};
