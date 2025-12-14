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
        if (! Schema::hasTable('dapur_riwayat_barang')) {
            Schema::create('dapur_riwayat_barang', function (Blueprint $table) {
                $table->string('kode_brng', 15)->nullable()->index('kode_brng');
                $table->double('stok_awal')->nullable();
                $table->double('masuk')->nullable();
                $table->double('keluar')->nullable();
                $table->double('stok_akhir');
                $table->enum('posisi', ['Pengadaan', 'Penerimaan', 'Retur Beli', 'Opname', 'Stok Keluar', 'Hibah'])->nullable();
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
        Schema::dropIfExists('dapur_riwayat_barang');
    }
};
