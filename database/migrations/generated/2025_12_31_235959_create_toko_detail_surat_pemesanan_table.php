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
        if (!Schema::hasTable('toko_detail_surat_pemesanan')) {
            Schema::create('toko_detail_surat_pemesanan', function (Blueprint $table) {
                $table->string('no_pemesanan', 20)->index('no_pemesanan');
                $table->string('kode_brng', 40)->nullable()->index('kode_brng');
                $table->char('kode_sat', 4)->nullable()->index('kode_sat');
                $table->double('jumlah')->nullable()->index('jumlah');
                $table->double('h_pesan')->nullable()->index('h_pesan');
                $table->double('subtotal')->nullable()->index('subtotal');
                $table->double('dis')->index('dis');
                $table->double('besardis')->index('besardis');
                $table->double('total')->index('total');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('toko_detail_surat_pemesanan');
    }
};
