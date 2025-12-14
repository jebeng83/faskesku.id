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
        if (! Schema::hasTable('k3rs_lokasi_kejadian')) {
            Schema::create('k3rs_lokasi_kejadian', function (Blueprint $table) {
                $table->string('kode_lokasi', 5)->primary();
                $table->string('lokasi_kejadian', 150)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('k3rs_lokasi_kejadian');
    }
};
