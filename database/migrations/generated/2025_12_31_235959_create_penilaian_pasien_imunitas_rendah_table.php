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
        if (! Schema::hasTable('penilaian_pasien_imunitas_rendah')) {
            Schema::create('penilaian_pasien_imunitas_rendah', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->enum('anamnesis', ['Autoanamnesis', 'Alloanamnesis'])->nullable();
                $table->string('hubungan', 30);
                $table->enum('pasien_mengetahui_kondisi_penyakitnya', ['Ya', 'Tidak'])->nullable();
                $table->enum('kebutuhan_ruang_perawatan', ['Isolasi', 'Ruang Rawat Biasa', 'ICU', 'ICU Isolasi'])->nullable();
                $table->string('riwayat_penyakit_keluhan', 1000)->nullable();
                $table->string('riwayat_penyakit_keluarga', 1000)->nullable();
                $table->string('riwayat_alergi', 100)->nullable();
                $table->string('riwayat_vaksinasi', 100)->nullable();
                $table->string('riwayat_pengobatan', 1000)->nullable();
                $table->string('diagnosa_utama', 500)->nullable();
                $table->string('diagnosa_tambahan', 500)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_pasien_imunitas_rendah');
    }
};
