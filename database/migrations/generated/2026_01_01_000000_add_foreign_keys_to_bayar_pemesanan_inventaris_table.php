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
        if (Schema::hasTable('bayar_pemesanan_inventaris')) {
            Schema::table('bayar_pemesanan_inventaris', function (Blueprint $table) {
                $table->foreign(['no_faktur'], 'bayar_pemesanan_inventaris_ibfk_1')->references(['no_faktur'])->on('inventaris_pemesanan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'bayar_pemesanan_inventaris_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nama_bayar'], 'bayar_pemesanan_inventaris_ibfk_3')->references(['nama_bayar'])->on('akun_bayar_hutang')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bayar_pemesanan_inventaris')) {
            Schema::table('bayar_pemesanan_inventaris', function (Blueprint $table) {
                $table->dropForeign('bayar_pemesanan_inventaris_ibfk_1');
                $table->dropForeign('bayar_pemesanan_inventaris_ibfk_2');
                $table->dropForeign('bayar_pemesanan_inventaris_ibfk_3');
            });
        }
    }
};
