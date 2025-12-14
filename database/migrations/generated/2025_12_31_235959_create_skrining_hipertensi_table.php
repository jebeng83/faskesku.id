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
        if (! Schema::hasTable('skrining_hipertensi')) {
            Schema::create('skrining_hipertensi', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('anamnesis1', ['Tidak', 'Ya'])->nullable();
                $table->enum('anamnesis2', ['Tidak', 'Ya'])->nullable();
                $table->enum('anamnesis3', ['Tidak', 'Ya'])->nullable();
                $table->enum('anamnesis4', ['Tidak', 'Ya'])->nullable();
                $table->enum('anamnesis5', ['Tidak', 'Ya'])->nullable();
                $table->enum('anamnesis6', ['Tidak', 'Ya'])->nullable();
                $table->enum('anamnesis7', ['Tidak', 'Ya'])->nullable();
                $table->enum('anamnesis8', ['Tidak', 'Ya'])->nullable();
                $table->string('sistole', 3);
                $table->string('diastole', 3);
                $table->enum('klasifikasi_hipertensi', ['Optimal Normal', 'Normal', 'Tinggi', 'Sub-group : Perbatasan', 'Tingkat 1 (Hipertensi Ringan)', 'Tingkat 2 (Hipertensi Sedang)', 'Tingkat 3 (Hipertensi Berat)', 'Hipertensi Sistol Tensolasi', 'Tidak Diketahui']);
                $table->string('hasil_skrining', 40);
                $table->string('keterangan', 100)->nullable();
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_hipertensi');
    }
};
