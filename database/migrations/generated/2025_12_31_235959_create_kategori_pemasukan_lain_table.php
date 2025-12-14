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
        if (! Schema::hasTable('kategori_pemasukan_lain')) {
            Schema::create('kategori_pemasukan_lain', function (Blueprint $table) {
                $table->string('kode_kategori', 5)->primary();
                $table->string('nama_kategori', 40)->nullable();
                $table->string('kd_rek', 15)->nullable()->index('kd_rek');
                $table->string('kd_rek2', 15)->nullable()->index('kd_rek2');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kategori_pemasukan_lain');
    }
};
