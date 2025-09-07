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
        Schema::connection('fufufafa')->create('riwayat_transaksi_gudangbarang', function (Blueprint $table) {
            $table->id();
            $table->string('kode_brng', 15);
            $table->string('kd_bangsal', 5);
            $table->string('no_batch', 20)->default('');
            $table->string('no_faktur', 20)->default('');
            $table->enum('jenis_transaksi', ['INSERT', 'UPDATE', 'DELETE']);
            $table->double('stok_sebelum')->nullable();
            $table->double('stok_sesudah')->nullable();
            $table->double('selisih')->nullable();
            $table->string('keterangan')->nullable();
            $table->string('user_id')->nullable();
            $table->string('sumber_transaksi', 50)->nullable(); // opname, pembelian, penjualan, dll
            $table->json('data_sebelum')->nullable(); // JSON data lengkap sebelum perubahan
            $table->json('data_sesudah')->nullable(); // JSON data lengkap sesudah perubahan
            $table->timestamp('waktu_transaksi')->useCurrent();
            $table->timestamps();
            
            // Index untuk performa
            $table->index(['kode_brng', 'kd_bangsal']);
            $table->index('waktu_transaksi');
            $table->index('jenis_transaksi');
            $table->index('sumber_transaksi');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('fufufafa')->dropIfExists('riwayat_transaksi_gudangbarang');
    }
};