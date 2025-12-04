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
        if (!Schema::hasTable('pelaksanaan_informasi_edukasi')) {
            Schema::create('pelaksanaan_informasi_edukasi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->string('nik', 20)->index('nik');
                $table->string('materi_edukasi', 1000)->nullable();
                $table->string('keterangan', 50)->nullable();
                $table->enum('diberikan_pada', ['Pasien', 'Keluarga', 'Lain-lain']);
                $table->string('keterangan_diberikan_pada', 40);
                $table->string('lama_edukasi', 10)->nullable();
                $table->enum('metode_edukasi', ['Ceramah', 'Diskusi', 'Demonstrasi'])->nullable();
                $table->enum('hasil_verifikasi', ['Sudah Mengerti', 'Re-Edukasi', 'Re-Demonstrasi'])->nullable();
                $table->enum('status', ['Awal', 'Ulang'])->nullable();

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelaksanaan_informasi_edukasi');
    }
};
