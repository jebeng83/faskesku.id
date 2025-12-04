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
        if (!Schema::hasTable('riwayat_barang_medis')) {
            Schema::create('riwayat_barang_medis', function (Blueprint $table) {
                $table->string('kode_brng', 15)->nullable()->index('riwayat_barang_medis_ibfk_1');
                $table->double('stok_awal')->nullable();
                $table->double('masuk')->nullable();
                $table->double('keluar')->nullable();
                $table->double('stok_akhir');
                $table->enum('posisi', ['Pemberian Obat', 'Pengadaan', 'Penerimaan', 'Piutang', 'Retur Beli', 'Retur Jual', 'Retur Piutang', 'Mutasi', 'Opname', 'Resep Pulang', 'Retur Pasien', 'Stok Pasien Ranap', 'Pengambilan Medis', 'Penjualan', 'Stok Keluar', 'Hibah'])->nullable();
                $table->date('tanggal')->nullable();
                $table->time('jam')->nullable();
                $table->string('petugas', 20)->nullable();
                $table->char('kd_bangsal', 5)->nullable()->index('kd_bangsal');
                $table->enum('status', ['Simpan', 'Hapus'])->nullable();
                $table->string('no_batch', 20);
                $table->string('no_faktur', 20);
                $table->string('keterangan', 150);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_barang_medis');
    }
};
