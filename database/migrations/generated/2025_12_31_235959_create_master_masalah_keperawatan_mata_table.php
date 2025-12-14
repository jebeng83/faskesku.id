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
        if (! Schema::hasTable('master_masalah_keperawatan_mata')) {
            Schema::create('master_masalah_keperawatan_mata', function (Blueprint $table) {
                $table->string('kode_masalah', 3)->primary();
                $table->string('nama_masalah', 100)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_masalah_keperawatan_mata');
    }
};
