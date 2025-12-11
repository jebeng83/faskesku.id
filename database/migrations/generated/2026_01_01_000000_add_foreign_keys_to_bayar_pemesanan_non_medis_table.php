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
        if (Schema::hasTable('bayar_pemesanan_non_medis')) {
            Schema::table('bayar_pemesanan_non_medis', function (Blueprint $table) {
                $table->foreign(['no_faktur'], 'bayar_pemesanan_non_medis_ibfk_1')->references(['no_faktur'])->on('ipsrspemesanan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'bayar_pemesanan_non_medis_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nama_bayar'], 'bayar_pemesanan_non_medis_ibfk_3')->references(['nama_bayar'])->on('akun_bayar_hutang')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bayar_pemesanan_non_medis')) {
            Schema::table('bayar_pemesanan_non_medis', function (Blueprint $table) {
                $table->dropForeign('bayar_pemesanan_non_medis_ibfk_1');
                $table->dropForeign('bayar_pemesanan_non_medis_ibfk_2');
                $table->dropForeign('bayar_pemesanan_non_medis_ibfk_3');
            });
        }
    }
};
