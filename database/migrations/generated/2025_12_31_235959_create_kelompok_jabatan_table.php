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
        if (! Schema::hasTable('kelompok_jabatan')) {
            Schema::create('kelompok_jabatan', function (Blueprint $table) {
                $table->string('kode_kelompok', 3)->primary();
                $table->string('nama_kelompok', 100)->nullable();
                $table->tinyInteger('indek')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kelompok_jabatan');
    }
};
