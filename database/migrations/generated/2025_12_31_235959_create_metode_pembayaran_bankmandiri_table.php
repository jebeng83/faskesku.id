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
        if (!Schema::hasTable('metode_pembayaran_bankmandiri')) {
            Schema::create('metode_pembayaran_bankmandiri', function (Blueprint $table) {
                $table->string('kode_metode', 5)->primary();
                $table->string('nama_metode', 40)->nullable();
                $table->double('biaya_transaksi')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('metode_pembayaran_bankmandiri');
    }
};
