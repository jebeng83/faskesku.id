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
        if (Schema::hasTable('perpustakaan_peminjaman')) {
            Schema::table('perpustakaan_peminjaman', function (Blueprint $table) {
                $table->foreign(['no_anggota'], 'perpustakaan_peminjaman_ibfk_1')->references(['no_anggota'])->on('perpustakaan_anggota')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_inventaris'], 'perpustakaan_peminjaman_ibfk_2')->references(['no_inventaris'])->on('perpustakaan_inventaris')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'perpustakaan_peminjaman_ibfk_3')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('perpustakaan_peminjaman')) {
            Schema::table('perpustakaan_peminjaman', function (Blueprint $table) {
                $table->dropForeign('perpustakaan_peminjaman_ibfk_1');
                $table->dropForeign('perpustakaan_peminjaman_ibfk_2');
                $table->dropForeign('perpustakaan_peminjaman_ibfk_3');
            });
        }
    }
};
