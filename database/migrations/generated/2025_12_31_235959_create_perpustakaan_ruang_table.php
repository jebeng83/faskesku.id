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
        if (! Schema::hasTable('perpustakaan_ruang')) {
            Schema::create('perpustakaan_ruang', function (Blueprint $table) {
                $table->char('kd_ruang', 5)->default('')->primary();
                $table->string('nm_ruang', 40)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perpustakaan_ruang');
    }
};
