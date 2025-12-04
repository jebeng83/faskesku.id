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
        if (!Schema::hasTable('toko_bayar_pemesanan')) {
            Schema::create('toko_bayar_pemesanan', function (Blueprint $table) {
                $table->date('tgl_bayar')->nullable()->index('tgl_bayar');
                $table->string('no_faktur', 20)->nullable()->index('no_faktur');
                $table->string('nip', 20)->nullable()->index('nip');
                $table->double('besar_bayar')->nullable();
                $table->string('keterangan', 100)->nullable();
                $table->string('nama_bayar', 50)->nullable()->index('nama_bayar');
                $table->string('no_bukti', 30)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('toko_bayar_pemesanan');
    }
};
