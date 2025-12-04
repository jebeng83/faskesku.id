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
        if (!Schema::hasTable('inventaris_ruang')) {
            Schema::create('inventaris_ruang', function (Blueprint $table) {
                $table->string('id_ruang', 5)->primary();
                $table->string('nama_ruang', 40)->index('nama_ruang');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris_ruang');
    }
};
