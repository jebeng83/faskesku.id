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
        if (!Schema::hasTable('jenis')) {
            Schema::create('jenis', function (Blueprint $table) {
                $table->char('kdjns', 4)->primary();
                $table->string('nama', 30)->index('nama');
                $table->string('keterangan', 50)->index('keterangan');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jenis');
    }
};
