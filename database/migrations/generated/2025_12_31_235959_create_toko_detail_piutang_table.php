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
        if (!Schema::hasTable('toko_detail_piutang')) {
            Schema::create('toko_detail_piutang', function (Blueprint $table) {
                $table->string('nota_piutang', 15)->nullable()->index('nota_piutang');
                $table->string('kode_brng', 40)->nullable()->index('kode_brng');
                $table->char('kode_sat', 4)->nullable()->index('kode_sat');
                $table->double('h_jual')->nullable();
                $table->double('h_beli')->nullable();
                $table->double('jumlah')->nullable();
                $table->double('subtotal')->nullable();
                $table->double('dis')->nullable();
                $table->double('bsr_dis')->nullable();
                $table->double('total')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('toko_detail_piutang');
    }
};
