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
        if (!Schema::hasTable('perpustakaan_jenis_buku')) {
            Schema::create('perpustakaan_jenis_buku', function (Blueprint $table) {
                $table->char('id_jenis', 5)->primary();
                $table->string('nama_jenis', 40)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perpustakaan_jenis_buku');
    }
};
