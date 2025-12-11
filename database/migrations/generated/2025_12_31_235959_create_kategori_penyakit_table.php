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
        if (!Schema::hasTable('kategori_penyakit')) {
            Schema::create('kategori_penyakit', function (Blueprint $table) {
                $table->string('kd_ktg', 8)->primary();
                $table->string('nm_kategori', 30)->nullable()->index('nm_kategori');
                $table->string('ciri_umum', 200)->nullable()->index('ciri_umum');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kategori_penyakit');
    }
};
