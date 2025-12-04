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
        if (!Schema::hasTable('inventaris_jenis')) {
            Schema::create('inventaris_jenis', function (Blueprint $table) {
                $table->char('id_jenis', 10)->primary();
                $table->string('nama_jenis', 40)->nullable()->index('nama_jenis');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris_jenis');
    }
};
