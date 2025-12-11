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
        if (!Schema::hasTable('balasan_pengaduan')) {
            Schema::create('balasan_pengaduan', function (Blueprint $table) {
                $table->string('id_pengaduan', 15)->primary();
                $table->string('pesan_balasan', 50)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('balasan_pengaduan');
    }
};
