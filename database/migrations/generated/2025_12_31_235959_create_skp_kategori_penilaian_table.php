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
        if (!Schema::hasTable('skp_kategori_penilaian')) {
            Schema::create('skp_kategori_penilaian', function (Blueprint $table) {
                $table->string('kode_kategori', 5)->primary();
                $table->string('nama_kategori', 100)->nullable();
                $table->enum('sasaran', ['1', '2', '3', '4', '5', '6'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skp_kategori_penilaian');
    }
};
