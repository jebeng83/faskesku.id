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
        if (!Schema::hasTable('inventaris_pemesanan')) {
            Schema::create('inventaris_pemesanan', function (Blueprint $table) {
                $table->string('no_faktur', 20)->primary();
                $table->string('no_order', 20);
                $table->char('kode_suplier', 5)->nullable()->index('kode_suplier');
                $table->string('nip', 20)->nullable()->index('nip');
                $table->date('tgl_pesan')->nullable();
                $table->date('tgl_faktur')->nullable();
                $table->date('tgl_tempo')->nullable();
                $table->double('total1');
                $table->double('potongan');
                $table->double('total2');
                $table->double('ppn');
                $table->double('meterai')->nullable();
                $table->double('tagihan');
                $table->enum('status', ['Sudah Dibayar', 'Belum Dibayar', 'Belum Lunas', 'Titip Faktur'])->nullable();
                $table->string('kd_rek_aset', 15);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris_pemesanan');
    }
};
