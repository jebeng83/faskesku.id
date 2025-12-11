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
        if (!Schema::hasTable('inventaris_merk')) {
            Schema::create('inventaris_merk', function (Blueprint $table) {
                $table->string('id_merk', 10)->primary();
                $table->string('nama_merk', 40)->index('nama_merk');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris_merk');
    }
};
