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
        if (Schema::hasTable('pengeluaran_harian')) {
            Schema::table('pengeluaran_harian', function (Blueprint $table) {
                $table->foreign(['nip'], 'pengeluaran_harian_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_kategori'], 'pengeluaran_harian_ibfk_2')->references(['kode_kategori'])->on('kategori_pengeluaran_harian')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('pengeluaran_harian')) {
            Schema::table('pengeluaran_harian', function (Blueprint $table) {
                $table->dropForeign('pengeluaran_harian_ibfk_1');
                $table->dropForeign('pengeluaran_harian_ibfk_2');
            });
        }
    }
};
