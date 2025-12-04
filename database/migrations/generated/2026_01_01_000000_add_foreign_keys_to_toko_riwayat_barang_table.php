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
        if (Schema::hasTable('toko_riwayat_barang')) {
            Schema::table('toko_riwayat_barang', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'toko_riwayat_barang_ibfk_1')->references(['kode_brng'])->on('tokobarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('toko_riwayat_barang')) {
            Schema::table('toko_riwayat_barang', function (Blueprint $table) {
                $table->dropForeign('toko_riwayat_barang_ibfk_1');
            });
        }
    }
};
