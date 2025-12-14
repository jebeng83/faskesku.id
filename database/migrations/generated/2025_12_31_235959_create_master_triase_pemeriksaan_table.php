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
        if (! Schema::hasTable('master_triase_pemeriksaan')) {
            Schema::create('master_triase_pemeriksaan', function (Blueprint $table) {
                $table->string('kode_pemeriksaan', 3)->primary();
                $table->string('nama_pemeriksaan', 150)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_triase_pemeriksaan');
    }
};
