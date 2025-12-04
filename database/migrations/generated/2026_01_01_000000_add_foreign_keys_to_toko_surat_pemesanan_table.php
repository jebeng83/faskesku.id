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
        if (Schema::hasTable('toko_surat_pemesanan')) {
            Schema::table('toko_surat_pemesanan', function (Blueprint $table) {
                $table->foreign(['kode_suplier'], 'toko_surat_pemesanan_ibfk_1')->references(['kode_suplier'])->on('tokosuplier')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'toko_surat_pemesanan_ibfk_2')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('toko_surat_pemesanan')) {
            Schema::table('toko_surat_pemesanan', function (Blueprint $table) {
                $table->dropForeign('toko_surat_pemesanan_ibfk_1');
                $table->dropForeign('toko_surat_pemesanan_ibfk_2');
            });
        }
    }
};
