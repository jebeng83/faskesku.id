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
        if (! Schema::hasTable('toko_detail_pengajuan_barang')) {
            Schema::create('toko_detail_pengajuan_barang', function (Blueprint $table) {
                $table->string('no_pengajuan', 20)->index('no_pengajuan');
                $table->string('kode_brng', 40)->nullable()->index('kode_brng');
                $table->char('kode_sat', 4)->nullable()->index('kode_sat');
                $table->double('jumlah')->nullable();
                $table->double('h_pengajuan')->nullable();
                $table->double('total');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('toko_detail_pengajuan_barang');
    }
};
