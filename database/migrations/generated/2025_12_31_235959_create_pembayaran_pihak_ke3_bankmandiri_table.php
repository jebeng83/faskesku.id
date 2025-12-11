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
        if (!Schema::hasTable('pembayaran_pihak_ke3_bankmandiri')) {
            Schema::create('pembayaran_pihak_ke3_bankmandiri', function (Blueprint $table) {
                $table->string('nomor_pembayaran', 30)->primary();
                $table->dateTime('tgl_pembayaran')->nullable();
                $table->string('no_rekening_sumber', 20)->nullable();
                $table->string('no_rekening_tujuan', 20)->nullable();
                $table->string('atas_nama_rekening_tujuan', 60)->nullable();
                $table->string('kota_atas_nama_rekening_tujuan', 20)->nullable();
                $table->double('nominal_pembayaran')->nullable();
                $table->string('nomor_tagihan', 30)->nullable();
                $table->string('kode_metode', 5)->nullable()->index('kode_metode');
                $table->string('kode_bank', 10)->nullable()->index('kode_bank');
                $table->string('kode_transaksi', 15);
                $table->enum('asal_transaksi', ['Bayar Pesan Obat/BHP', 'Bayar Pesan Non Medis', 'Bayar Pesan Aset/Inventaris', 'Bayar Pesan Toko', 'Bayar Pesan Dapur', 'Pengeluaran Harian', 'Bayar JM Dokter', 'Bayar Beban Hutang Lain'])->nullable();
                $table->enum('status_transaksi', ['Baru', 'Menunggu Persetujuan', 'Gagal Terkirim', 'Terkonfirmasi', 'Pembayaran Gagal'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayaran_pihak_ke3_bankmandiri');
    }
};
