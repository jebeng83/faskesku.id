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
        if (Schema::hasTable('riwayat_barang_medis')) {
            Schema::table('riwayat_barang_medis', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'riwayat_barang_medis_ibfk_1')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_bangsal'], 'riwayat_barang_medis_ibfk_2')->references(['kd_bangsal'])->on('bangsal')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('riwayat_barang_medis')) {
            Schema::table('riwayat_barang_medis', function (Blueprint $table) {
                $table->dropForeign('riwayat_barang_medis_ibfk_1');
                $table->dropForeign('riwayat_barang_medis_ibfk_2');
            });
        }
    }
};
