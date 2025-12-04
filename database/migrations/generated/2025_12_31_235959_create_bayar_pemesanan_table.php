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
        if (!Schema::hasTable('bayar_pemesanan')) {
            Schema::create('bayar_pemesanan', function (Blueprint $table) {
                $table->date('tgl_bayar');
                $table->string('no_faktur', 20)->index('bayar_pemesanan_ibfk_1');
                $table->string('nip', 20)->nullable()->index('bayar_pemesanan_ibfk_2');
                $table->double('besar_bayar')->nullable();
                $table->string('keterangan', 100)->nullable();
                $table->string('nama_bayar', 50)->nullable()->index('bayar_pemesanan_ibfk_3');
                $table->string('no_bukti', 30);

                $table->primary(['tgl_bayar', 'no_faktur', 'no_bukti']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bayar_pemesanan');
    }
};
