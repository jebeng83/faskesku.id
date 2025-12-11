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
        if (!Schema::hasTable('skrining_anemia')) {
            Schema::create('skrining_anemia', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('mudah_lelah', ['Tidak', 'Ya'])->nullable();
                $table->enum('buah_sayur', ['Tidak', 'Ya'])->nullable();
                $table->enum('protein_hewani', ['Tidak', 'Ya'])->nullable();
                $table->enum('masalah_pubertas', ['Tidak', 'Ya'])->nullable();
                $table->enum('risiko_ims', ['Tidak', 'Ya'])->nullable();
                $table->enum('kekerasan_seksual', ['Tidak', 'Ya'])->nullable();
                $table->enum('sudah_menstruasi', ['Tidak', 'Ya'])->nullable();
                $table->enum('gangguan_menstruasi', ['Tidak', 'Ya'])->nullable();
                $table->enum('tambah_darah', ['Tidak', 'Ya'])->nullable();
                $table->enum('kelainan_darah', ['Tidak', 'Ya'])->nullable();
                $table->enum('keluarga_thalasemia', ['Tidak', 'Ya'])->nullable();
                $table->enum('rambut', ['Sehat', 'Tidak Sehat'])->nullable();
                $table->enum('kulit', ['Sehat', 'Tidak Sehat'])->nullable();
                $table->enum('bekas_sutikan', ['Tidak', 'Ya'])->nullable();
                $table->enum('kuku', ['Sehat', 'Tidak Sehat'])->nullable();
                $table->enum('tanda_klinis', ['Tidak', 'Ya']);
                $table->string('pemeriksaan_hb', 8)->nullable();
                $table->enum('kadar_hb', ['>= 12 g/dl', '11,9 - 11 g/dl', '10.9 - 8 g/dl', '< 8 g/dl'])->nullable();
                $table->enum('jenis_anemia', ['Normal', 'Ringan', 'Sedang', 'Berat'])->nullable();
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
        Schema::dropIfExists('skrining_anemia');
    }
};
