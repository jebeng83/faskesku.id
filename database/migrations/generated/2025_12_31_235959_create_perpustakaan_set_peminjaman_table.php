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
        if (! Schema::hasTable('perpustakaan_set_peminjaman')) {
            Schema::create('perpustakaan_set_peminjaman', function (Blueprint $table) {
                $table->integer('max_pinjam')->nullable();
                $table->integer('lama_pinjam')->nullable();
                $table->double('denda_perhari')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perpustakaan_set_peminjaman');
    }
};
