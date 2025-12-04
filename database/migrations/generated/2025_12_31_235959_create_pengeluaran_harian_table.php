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
        if (!Schema::hasTable('pengeluaran_harian')) {
            Schema::create('pengeluaran_harian', function (Blueprint $table) {
                $table->string('no_keluar', 30)->primary();
                $table->dateTime('tanggal')->default('0000-00-00 00:00:00');
                $table->string('kode_kategori', 5)->nullable()->index('pengeluaran_harian_ibfk_2');
                $table->double('biaya');
                $table->string('nip', 20)->nullable()->index('nip');
                $table->string('keterangan', 100)->default('');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengeluaran_harian');
    }
};
