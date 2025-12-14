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
        if (! Schema::hasTable('perpustakaan_peminjaman')) {
            Schema::create('perpustakaan_peminjaman', function (Blueprint $table) {
                $table->string('no_anggota', 10)->nullable()->index('no_anggota');
                $table->string('no_inventaris', 20)->nullable()->index('no_inventaris');
                $table->date('tgl_pinjam')->nullable();
                $table->date('tgl_kembali')->nullable();
                $table->string('nip', 20)->nullable()->index('nip');
                $table->enum('status_pinjam', ['Masih Dipinjam', 'Sudah Kembali'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perpustakaan_peminjaman');
    }
};
