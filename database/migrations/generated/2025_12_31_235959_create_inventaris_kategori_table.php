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
        if (!Schema::hasTable('inventaris_kategori')) {
            Schema::create('inventaris_kategori', function (Blueprint $table) {
                $table->char('id_kategori', 10)->primary();
                $table->string('nama_kategori', 40)->nullable()->index('nama_kategori');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris_kategori');
    }
};
