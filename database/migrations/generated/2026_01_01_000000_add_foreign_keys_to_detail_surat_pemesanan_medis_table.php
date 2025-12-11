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
        if (Schema::hasTable('detail_surat_pemesanan_medis')) {
            Schema::table('detail_surat_pemesanan_medis', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'detail_surat_pemesanan_medis_ibfk_1')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_sat'], 'detail_surat_pemesanan_medis_ibfk_2')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_pemesanan'], 'detail_surat_pemesanan_medis_ibfk_3')->references(['no_pemesanan'])->on('surat_pemesanan_medis')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detail_surat_pemesanan_medis')) {
            Schema::table('detail_surat_pemesanan_medis', function (Blueprint $table) {
                $table->dropForeign('detail_surat_pemesanan_medis_ibfk_1');
                $table->dropForeign('detail_surat_pemesanan_medis_ibfk_2');
                $table->dropForeign('detail_surat_pemesanan_medis_ibfk_3');
            });
        }
    }
};
