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
        if (!Schema::hasTable('surat_buta_warna')) {
            Schema::create('surat_buta_warna', function (Blueprint $table) {
                $table->string('no_surat', 20)->primary();
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tanggalperiksa');
                $table->enum('hasilperiksa', ['Tidak Buta Warna', 'Buta Warna']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_buta_warna');
    }
};
