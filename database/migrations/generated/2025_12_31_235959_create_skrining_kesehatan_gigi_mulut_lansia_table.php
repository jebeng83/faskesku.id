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
        if (!Schema::hasTable('skrining_kesehatan_gigi_mulut_lansia')) {
            Schema::create('skrining_kesehatan_gigi_mulut_lansia', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('kontrol_gigi', ['Ya', 'Tidak'])->nullable();
                $table->enum('pola_makan', ['Ya', 'Tidak'])->nullable();
                $table->enum('sikat_gigi', ['Ya', 'Tidak'])->nullable();
                $table->enum('gigi_palsu', ['Ya', 'Tidak'])->nullable();
                $table->enum('gigi_berfungsi', ['Ya', 'Tidak'])->nullable();
                $table->enum('mukosa_mulut', ['Ya', 'Tidak'])->nullable();
                $table->string('hasil_skrining', 50)->nullable();
                $table->string('keterangan', 100);
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_kesehatan_gigi_mulut_lansia');
    }
};
