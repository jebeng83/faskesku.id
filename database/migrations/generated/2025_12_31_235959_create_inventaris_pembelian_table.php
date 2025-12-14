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
        if (! Schema::hasTable('inventaris_pembelian')) {
            Schema::create('inventaris_pembelian', function (Blueprint $table) {
                $table->string('no_faktur', 15)->primary();
                $table->char('kode_suplier', 5)->index('kode_suplier');
                $table->string('nip', 20)->index('nip');
                $table->date('tgl_beli')->index('tgl_beli');
                $table->double('subtotal')->index('subtotal');
                $table->double('potongan')->index('potongan');
                $table->double('total')->index('total');
                $table->double('ppn')->nullable();
                $table->double('meterai')->nullable();
                $table->double('tagihan')->nullable();
                $table->string('kd_rek', 15)->nullable()->index('inventaris_pembelian_ibfk_2');
                $table->string('kd_rek_aset', 15)->index('kd_rek_aset');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris_pembelian');
    }
};
