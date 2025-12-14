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
        if (! Schema::hasTable('kategori_piutang_jasa_perusahaan')) {
            Schema::create('kategori_piutang_jasa_perusahaan', function (Blueprint $table) {
                $table->string('kode_kategori', 5)->primary();
                $table->string('nama_kategori', 70)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kategori_piutang_jasa_perusahaan');
    }
};
