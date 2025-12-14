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
        if (! Schema::hasTable('gambar')) {
            Schema::create('gambar', function (Blueprint $table) {
                $table->integer('inde')->primary();
                $table->binary('bpjs');
                $table->binary('nyeri');
                $table->binary('inhealth');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gambar');
    }
};
