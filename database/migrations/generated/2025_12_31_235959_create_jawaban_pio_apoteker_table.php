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
        if (! Schema::hasTable('jawaban_pio_apoteker')) {
            Schema::create('jawaban_pio_apoteker', function (Blueprint $table) {
                $table->string('no_permintaan', 20)->primary();
                $table->dateTime('tanggal_jawab');
                $table->enum('metode', ['Lisan', 'Tertulis', 'Telepon'])->nullable();
                $table->enum('penyampaian_jawaban', ['Segera', 'Dalam 24 Jam', 'Lebih Dari 24 Jam'])->nullable();
                $table->string('jawaban', 500)->nullable();
                $table->string('referensi', 500)->nullable();
                $table->string('nip', 20)->nullable()->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jawaban_pio_apoteker');
    }
};
