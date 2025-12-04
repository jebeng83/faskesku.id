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
        if (!Schema::hasTable('perpustakaan_kategori')) {
            Schema::create('perpustakaan_kategori', function (Blueprint $table) {
                $table->char('id_kategori', 5)->primary();
                $table->string('nama_kategori', 40)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perpustakaan_kategori');
    }
};
