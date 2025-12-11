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
        if (!Schema::hasTable('layanan_kedokteran_fisik_rehabilitasi')) {
            Schema::create('layanan_kedokteran_fisik_rehabilitasi', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->enum('pendamping', ['Tidak', 'Suami', 'Istri', 'Anak', 'Keluarga', 'Lainnya'])->nullable();
                $table->string('keterangan_pendamping', 30)->nullable();
                $table->string('anamnesa', 500)->nullable();
                $table->string('pemeriksaan_fisik', 1500)->nullable();
                $table->string('diagnosa_medis', 200)->nullable();
                $table->string('diagnosa_fungsi', 200)->nullable();
                $table->string('tatalaksana', 2000)->nullable();
                $table->string('anjuran', 500);
                $table->string('evaluasi', 500);
                $table->enum('suspek_penyakit_kerja', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_suspek_penyakit_kerja', 70)->nullable();
                $table->enum('status_program', ['Belum Selesai', 'Sudah Selesai']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('layanan_kedokteran_fisik_rehabilitasi');
    }
};
