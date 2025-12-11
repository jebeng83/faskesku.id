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
        if (Schema::hasTable('detail_pengajuan_barang_nonmedis')) {
            Schema::table('detail_pengajuan_barang_nonmedis', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'detail_pengajuan_barang_nonmedis_ibfk_1')->references(['kode_brng'])->on('ipsrsbarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_sat'], 'detail_pengajuan_barang_nonmedis_ibfk_2')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_pengajuan'], 'detail_pengajuan_barang_nonmedis_ibfk_3')->references(['no_pengajuan'])->on('pengajuan_barang_nonmedis')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detail_pengajuan_barang_nonmedis')) {
            Schema::table('detail_pengajuan_barang_nonmedis', function (Blueprint $table) {
                $table->dropForeign('detail_pengajuan_barang_nonmedis_ibfk_1');
                $table->dropForeign('detail_pengajuan_barang_nonmedis_ibfk_2');
                $table->dropForeign('detail_pengajuan_barang_nonmedis_ibfk_3');
            });
        }
    }
};
