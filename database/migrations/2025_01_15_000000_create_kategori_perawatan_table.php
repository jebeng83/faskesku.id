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
        Schema::create('kategori_perawatan', function (Blueprint $table) {
            $table->char('kd_kategori', 5)->primary();
            $table->string('nm_kategori', 30)->nullable();
            
            // Add index for nm_kategori
            $table->index('nm_kategori');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kategori_perawatan');
    }
};