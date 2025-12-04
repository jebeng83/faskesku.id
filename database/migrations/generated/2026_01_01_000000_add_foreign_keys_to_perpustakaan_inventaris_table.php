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
        if (Schema::hasTable('perpustakaan_inventaris')) {
            Schema::table('perpustakaan_inventaris', function (Blueprint $table) {
                $table->foreign(['kode_buku'], 'perpustakaan_inventaris_ibfk_1')->references(['kode_buku'])->on('perpustakaan_buku')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_ruang'], 'perpustakaan_inventaris_ibfk_2')->references(['kd_ruang'])->on('perpustakaan_ruang')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('perpustakaan_inventaris')) {
            Schema::table('perpustakaan_inventaris', function (Blueprint $table) {
                $table->dropForeign('perpustakaan_inventaris_ibfk_1');
                $table->dropForeign('perpustakaan_inventaris_ibfk_2');
            });
        }
    }
};
