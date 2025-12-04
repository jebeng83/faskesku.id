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
        if (Schema::hasTable('toko_detail_surat_pemesanan')) {
            Schema::table('toko_detail_surat_pemesanan', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'toko_detail_surat_pemesanan_ibfk_1')->references(['kode_brng'])->on('tokobarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_sat'], 'toko_detail_surat_pemesanan_ibfk_2')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_pemesanan'], 'toko_detail_surat_pemesanan_ibfk_3')->references(['no_pemesanan'])->on('toko_surat_pemesanan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('toko_detail_surat_pemesanan')) {
            Schema::table('toko_detail_surat_pemesanan', function (Blueprint $table) {
                $table->dropForeign('toko_detail_surat_pemesanan_ibfk_1');
                $table->dropForeign('toko_detail_surat_pemesanan_ibfk_2');
                $table->dropForeign('toko_detail_surat_pemesanan_ibfk_3');
            });
        }
    }
};
