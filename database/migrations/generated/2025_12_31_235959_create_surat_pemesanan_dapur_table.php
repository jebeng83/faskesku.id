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
        if (!Schema::hasTable('surat_pemesanan_dapur')) {
            Schema::create('surat_pemesanan_dapur', function (Blueprint $table) {
                $table->string('no_pemesanan', 20)->primary();
                $table->char('kode_suplier', 5)->nullable()->index('kode_suplier');
                $table->string('nip', 20)->nullable()->index('nip');
                $table->date('tanggal')->nullable();
                $table->double('subtotal');
                $table->double('potongan');
                $table->double('total');
                $table->double('ppn')->nullable();
                $table->double('meterai')->nullable();
                $table->double('tagihan')->nullable();
                $table->enum('status', ['Proses Pesan', 'Sudah Datang'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_pemesanan_dapur');
    }
};
