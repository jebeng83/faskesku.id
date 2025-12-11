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
        if (!Schema::hasTable('inventaris_peminjaman')) {
            Schema::create('inventaris_peminjaman', function (Blueprint $table) {
                $table->string('peminjam', 50)->default('');
                $table->string('tlp', 13);
                $table->string('no_inventaris', 30)->default('')->index('no_inventaris');
                $table->date('tgl_pinjam')->default('0000-00-00');
                $table->date('tgl_kembali')->nullable()->index('tgl_kembali');
                $table->string('nip', 20)->default('')->index('nip');
                $table->enum('status_pinjam', ['Masih Dipinjam', 'Sudah Kembali'])->nullable()->index('status_pinjam');

                $table->primary(['peminjam', 'no_inventaris', 'tgl_pinjam', 'nip']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris_peminjaman');
    }
};
