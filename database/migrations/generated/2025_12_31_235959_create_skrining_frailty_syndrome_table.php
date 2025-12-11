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
        if (!Schema::hasTable('skrining_frailty_syndrome')) {
            Schema::create('skrining_frailty_syndrome', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('resistensi', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_resistensi')->nullable();
                $table->enum('aktivitas', ['Jarang', 'Kadang-kadang', 'Sebagian Besar Waktu', 'Sepanjang Waktu'])->nullable();
                $table->tinyInteger('nilai_aktivitas')->nullable();
                $table->enum('penyakit_tidak_pernah', ['Ya', 'Tidak'])->nullable();
                $table->enum('penyakit_kanker', ['Ya', 'Tidak'])->nullable();
                $table->enum('penyakit_gagal_jantung', ['Ya', 'Tidak'])->nullable();
                $table->enum('penyakit_ginjal', ['Ya', 'Tidak'])->nullable();
                $table->enum('penyakit_nyeri_dada', ['Ya', 'Tidak'])->nullable();
                $table->enum('penyakit_serangan_jantung', ['Ya', 'Tidak'])->nullable();
                $table->enum('penyakit_stroke', ['Ya', 'Tidak'])->nullable();
                $table->enum('penyakit_asma', ['Ya', 'Tidak'])->nullable();
                $table->enum('penyakit_nyeri_sendi', ['Ya', 'Tidak'])->nullable();
                $table->enum('penyakit_paru_kronis', ['Ya', 'Tidak'])->nullable();
                $table->enum('penyakit_hipertensi', ['Ya', 'Tidak'])->nullable();
                $table->enum('penyakit_diabetes', ['Ya', 'Tidak'])->nullable();
                $table->tinyInteger('nilai_penyakit')->nullable();
                $table->enum('usaha_berjalan', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_usaha_berjalan')->nullable();
                $table->enum('berat_badan', ['< 5%', '>= 5%'])->nullable();
                $table->tinyInteger('nilai_berat_badan')->nullable();
                $table->tinyInteger('nilai_total')->nullable();
                $table->enum('hasil_skrining', ['Rapuh/Renta', 'Pra-Kerapuhan', 'Segar & Tidak Rapuh'])->nullable();
                $table->string('keterangan', 40)->nullable();
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_frailty_syndrome');
    }
};
