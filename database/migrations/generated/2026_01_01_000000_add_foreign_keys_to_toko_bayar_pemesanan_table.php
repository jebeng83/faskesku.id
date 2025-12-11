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
        if (Schema::hasTable('toko_bayar_pemesanan')) {
            Schema::table('toko_bayar_pemesanan', function (Blueprint $table) {
                $table->foreign(['no_faktur'], 'toko_bayar_pemesanan_ibfk_1')->references(['no_faktur'])->on('tokopemesanan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'toko_bayar_pemesanan_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nama_bayar'], 'toko_bayar_pemesanan_ibfk_3')->references(['nama_bayar'])->on('akun_bayar_hutang')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('toko_bayar_pemesanan')) {
            Schema::table('toko_bayar_pemesanan', function (Blueprint $table) {
                $table->dropForeign('toko_bayar_pemesanan_ibfk_1');
                $table->dropForeign('toko_bayar_pemesanan_ibfk_2');
                $table->dropForeign('toko_bayar_pemesanan_ibfk_3');
            });
        }
    }
};
