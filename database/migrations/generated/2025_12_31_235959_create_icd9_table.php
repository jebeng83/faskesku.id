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
        if (!Schema::hasTable('icd9')) {
            Schema::create('icd9', function (Blueprint $table) {
                $table->string('kode', 8)->primary();
                $table->string('deskripsi_panjang', 250)->nullable();
                $table->string('deskripsi_pendek', 40)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('icd9');
    }
};
