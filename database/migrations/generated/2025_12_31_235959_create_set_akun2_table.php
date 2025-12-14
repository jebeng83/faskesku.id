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
        if (! Schema::hasTable('set_akun2')) {
            Schema::create('set_akun2', function (Blueprint $table) {
                $table->string('Penerimaan_Dapur', 15)->nullable()->index('penerimaan_dapur');
                $table->string('Kontra_Penerimaan_Dapur', 15)->nullable()->index('kontra_penerimaan_dapur');
                $table->string('Bayar_Pemesanan_Dapur', 15)->nullable()->index('bayar_pemesanan_dapur');
                $table->string('Retur_Beli_Dapur', 15)->index('retur_beli_dapur');
                $table->string('Kontra_Retur_Beli_Dapur', 15)->index('kontra_retur_beli_dapur');
                $table->string('Hibah_Dapur', 15)->index('hibah_dapur');
                $table->string('Kontra_Hibah_Dapur', 15)->index('kontra_hibah_dapur');
                $table->string('Piutang_Jasa_Perusahaan', 15)->index('piutang_jasa_perusahaan');
                $table->string('Pendapatan_Piutang_Jasa_Perusahaan', 15)->index('pendapatan_piutang_jasa_perusahaan');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('set_akun2');
    }
};
