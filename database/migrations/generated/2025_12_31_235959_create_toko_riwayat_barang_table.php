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
        if (! Schema::hasTable('toko_riwayat_barang')) {
            Schema::create('toko_riwayat_barang', function (Blueprint $table) {
                $table->string('kode_brng', 40)->nullable()->index('kode_brng');
                $table->double('stok_awal')->nullable();
                $table->double('masuk')->nullable();
                $table->double('keluar')->nullable();
                $table->double('stok_akhir');
                $table->enum('posisi', ['Pengadaan', 'Penerimaan', 'Piutang', 'Retur Beli', 'Retur Jual', 'Retur Piutang', 'Opname', 'Penjualan', 'Stok Keluar'])->nullable();
                $table->date('tanggal')->nullable();
                $table->time('jam')->nullable();
                $table->string('petugas', 20)->nullable();
                $table->enum('status', ['Simpan', 'Hapus'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('toko_riwayat_barang');
    }
};
