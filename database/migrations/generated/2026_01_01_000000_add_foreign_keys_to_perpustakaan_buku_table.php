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
        if (Schema::hasTable('perpustakaan_buku')) {
            Schema::table('perpustakaan_buku', function (Blueprint $table) {
                $table->foreign(['kode_penerbit'], 'perpustakaan_buku_ibfk_1')->references(['kode_penerbit'])->on('perpustakaan_penerbit')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_pengarang'], 'perpustakaan_buku_ibfk_2')->references(['kode_pengarang'])->on('perpustakaan_pengarang')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['id_kategori'], 'perpustakaan_buku_ibfk_3')->references(['id_kategori'])->on('perpustakaan_kategori')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['id_jenis'], 'perpustakaan_buku_ibfk_4')->references(['id_jenis'])->on('perpustakaan_jenis_buku')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('perpustakaan_buku')) {
            Schema::table('perpustakaan_buku', function (Blueprint $table) {
                $table->dropForeign('perpustakaan_buku_ibfk_1');
                $table->dropForeign('perpustakaan_buku_ibfk_2');
                $table->dropForeign('perpustakaan_buku_ibfk_3');
                $table->dropForeign('perpustakaan_buku_ibfk_4');
            });
        }
    }
};
