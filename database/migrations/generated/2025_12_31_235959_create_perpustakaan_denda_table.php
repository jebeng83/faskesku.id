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
        if (!Schema::hasTable('perpustakaan_denda')) {
            Schema::create('perpustakaan_denda', function (Blueprint $table) {
                $table->char('kode_denda', 5)->primary();
                $table->string('jenis_denda', 40)->nullable();
                $table->double('besar_denda')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perpustakaan_denda');
    }
};
