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
        if (!Schema::hasTable('penilaian_pasien_penyakit_menular')) {
            Schema::create('penilaian_pasien_penyakit_menular', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->enum('anamnesis', ['Autoanamnesis', 'Alloanamnesis']);
                $table->string('hubungan', 30);
                $table->enum('pasien_mengetahui_kondisi_penyakitnya', ['Ya', 'Tidak'])->nullable();
                $table->enum('penyakit_sama_serumah', ['Ya', 'Tidak'])->nullable();
                $table->enum('riwayat_kontak', ['Bekerja Di Daerah KLB', 'Merawat Pasien Penyakit Infeksi', 'Berkunjung Ke Daerah Endemik Dalam 2 Minggu Terakhir', 'Bekerja Di Laboratorium', 'Kontak Langsung', 'Lain-lain'])->nullable();
                $table->string('keterangan_riwayat_kontak', 70)->nullable();
                $table->enum('transmisi_penularan_penyakit', ['Airborne', 'Droplet', 'Kontak Langsung', 'Cairan Tubuh Lainnya', 'Lain-lain'])->nullable();
                $table->string('keterangan_transmisi_penularan_penyakit', 70)->nullable();
                $table->enum('kebutuhan_ruang_rawat', ['Isolasi', 'Ruang Biasa', 'ICU', 'ICU Isolasi'])->nullable();
                $table->string('keluhan_yang_dirasakan_saat_ini', 1000)->nullable();
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
        Schema::dropIfExists('penilaian_pasien_penyakit_menular');
    }
};
