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
        if (!Schema::hasTable('skp_kriteria_penilaian')) {
            Schema::create('skp_kriteria_penilaian', function (Blueprint $table) {
                $table->string('kode_kriteria', 10)->primary();
                $table->string('nama_kriteria', 150)->nullable();
                $table->string('kode_kategori', 5)->index('kode_kategori');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skp_kriteria_penilaian');
    }
};
