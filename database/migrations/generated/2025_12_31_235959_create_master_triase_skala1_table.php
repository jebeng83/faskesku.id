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
        if (!Schema::hasTable('master_triase_skala1')) {
            Schema::create('master_triase_skala1', function (Blueprint $table) {
                $table->string('kode_pemeriksaan', 3)->index('kode_pemeriksaan');
                $table->string('kode_skala1', 3)->primary();
                $table->string('pengkajian_skala1', 150);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_triase_skala1');
    }
};
