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
        if (! Schema::hasTable('penilaian_korban_kekerasan')) {
            Schema::create('penilaian_korban_kekerasan', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('informasi', ['Autoanamnesis', 'Alloanamnesis'])->nullable();
                $table->string('hubungan_dengan_pasien', 30)->nullable();
                $table->string('jumlah_saudara', 2)->nullable();
                $table->enum('kondisi_keluaga', ['Bahagia', 'Broken Home'])->nullable();
                $table->enum('hubungan_orang_terdekat', ['Ada Masalah', 'Tidak Ada Masalah'])->nullable();
                $table->string('kekerasan_yang_dialami', 350)->nullable();
                $table->string('tempat_kejadian', 40)->nullable();
                $table->tinyInteger('lama_kekerasan')->nullable();
                $table->enum('periode_kekerasan', ['Hari', 'Bulan', 'Tahun'])->nullable();
                $table->string('seberapa_sering_mengalami', 150)->nullable();
                $table->string('pemicu_kekerasan', 150)->nullable();
                $table->string('yang_melakukan_kekerasan', 50)->nullable();
                $table->string('dampak_kekerasan', 200)->nullable();
                $table->string('tanda_tanda_didapatkan', 350)->nullable();
                $table->enum('memerlukan_pendampingan', ['Ya', 'Tidak'])->nullable();
                $table->string('riwayat_kelainan', 50)->nullable();
                $table->string('pemeriksaan_kepala', 50)->nullable();
                $table->string('pemeriksaan_thoraks', 50)->nullable();
                $table->string('pemeriksaan_leher', 50)->nullable();
                $table->string('pemeriksaan_abdomen', 50)->nullable();
                $table->string('pemeriksaan_genitalia', 50)->nullable();
                $table->string('pemeriksaan_ekstrimitas_atas', 50)->nullable();
                $table->string('pemeriksaan_ekstrimitas_bawah', 50);
                $table->string('pemeriksaan_anus', 50)->nullable();
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_korban_kekerasan');
    }
};
