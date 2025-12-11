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
        if (!Schema::hasTable('telaah_farmasi')) {
            Schema::create('telaah_farmasi', function (Blueprint $table) {
                $table->string('no_resep', 14)->primary();
                $table->enum('resep_identifikasi_pasien', ['Ya', 'Tidak'])->nullable();
                $table->string('resep_ket_identifikasi_pasien', 30)->nullable();
                $table->enum('resep_tepat_obat', ['Ya', 'Tidak'])->nullable();
                $table->string('resep_ket_tepat_obat', 30)->nullable();
                $table->enum('resep_tepat_dosis', ['Ya', 'Tidak'])->nullable();
                $table->string('resep_ket_tepat_dosis', 30)->nullable();
                $table->enum('resep_tepat_cara_pemberian', ['Ya', 'Tidak'])->nullable();
                $table->string('resep_ket_tepat_cara_pemberian', 30)->nullable();
                $table->enum('resep_tepat_waktu_pemberian', ['Ya', 'Tidak'])->nullable();
                $table->string('resep_ket_tepat_waktu_pemberian', 30)->nullable();
                $table->enum('resep_ada_tidak_duplikasi_obat', ['Ya', 'Tidak'])->nullable();
                $table->string('resep_ket_ada_tidak_duplikasi_obat', 30)->nullable();
                $table->enum('resep_interaksi_obat', ['Ya', 'Tidak'])->nullable();
                $table->string('resep_ket_interaksi_obat', 30)->nullable();
                $table->enum('resep_kontra_indikasi_obat', ['Ya', 'Tidak'])->nullable();
                $table->string('resep_ket_kontra_indikasi_obat', 30)->nullable();
                $table->enum('obat_tepat_pasien', ['Ya', 'Tidak'])->nullable();
                $table->enum('obat_tepat_obat', ['Ya', 'Tidak'])->nullable();
                $table->enum('obat_tepat_dosis', ['Ya', 'Tidak'])->nullable();
                $table->enum('obat_tepat_cara_pemberian', ['Ya', 'Tidak'])->nullable();
                $table->enum('obat_tepat_waktu_pemberian', ['Ya', 'Tidak'])->nullable();
                $table->string('nip', 20)->nullable()->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('telaah_farmasi');
    }
};
