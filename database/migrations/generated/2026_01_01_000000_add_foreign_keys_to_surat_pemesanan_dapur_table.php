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
        if (Schema::hasTable('surat_pemesanan_dapur')) {
            Schema::table('surat_pemesanan_dapur', function (Blueprint $table) {
                $table->foreign(['kode_suplier'], 'surat_pemesanan_dapur_ibfk_1')->references(['kode_suplier'])->on('dapursuplier')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip'], 'surat_pemesanan_dapur_ibfk_2')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('surat_pemesanan_dapur')) {
            Schema::table('surat_pemesanan_dapur', function (Blueprint $table) {
                $table->dropForeign('surat_pemesanan_dapur_ibfk_1');
                $table->dropForeign('surat_pemesanan_dapur_ibfk_2');
            });
        }
    }
};
