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
        if (!Schema::hasTable('skrining_risiko_kanker_paru')) {
            Schema::create('skrining_risiko_kanker_paru', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan'])->nullable();
                $table->string('nilai_jenis_kelamin', 1)->nullable();
                $table->enum('umur', ['> 65 Tahun', '45 - 65 Tahun', '< 45 Tahun'])->nullable();
                $table->string('nilai_umur', 1)->nullable();
                $table->enum('pernah_kanker', ['Ya, Pernah > 5 Tahun Yang Lalu', 'Ya, Pernah < 5 Tahun Yang Lalu', 'Tidak Pernah'])->nullable();
                $table->string('nilai_pernah_kanker', 1)->nullable();
                $table->enum('ada_keluarga_kanker', ['Ya, Kanker Paru', 'Ya, Kanker Jenis Lain', 'Tidak Ada'])->nullable();
                $table->string('nilai_ada_keluarga_kanker', 1)->nullable();
                $table->enum('riwayat_rokok', ['Perokok Aktif, Masih Merokok 1 Tahun Ini', 'Bekas Perokok, Berhenti < 15 Tahun', 'Perokok Pasif', 'Tidak Merokok'])->nullable();
                $table->string('nilai_riwayat_rokok', 1)->nullable();
                $table->enum('riwayat_bekerja_mengandung_karsinogen', ['Ya', 'Tidak Yakin/Ragu-ragu', 'Tidak'])->nullable();
                $table->string('nilai_riwayat_bekerja_mengandung_karsinogen', 1)->nullable();
                $table->enum('lingkungan_tinggal_polusi_tinggi', ['Ya', 'Tidak Yakin/Ragu-ragu', 'Tidak'])->nullable();
                $table->string('nilai_lingkungan_tinggal_polusi_tinggi', 1)->nullable();
                $table->enum('lingkungan_rumah_tidak_sehat', ['Ya', 'Tidak Yakin/Ragu-ragu', 'Tidak'])->nullable();
                $table->string('nilai_lingkungan_rumah_tidak_sehat', 1)->nullable();
                $table->enum('pernah_paru_kronik', ['Ya, Pernah Tuberkolosis (TBC)', 'Ya, Pernah Penyakit Paru Kronik(PPOK)', 'Tidak'])->nullable();
                $table->string('nilai_pernah_paru_kronik', 1)->nullable();
                $table->string('total_skor', 2)->nullable();
                $table->enum('hasil_skrining', ['Risiko Ringan', 'Risiko Sedang', 'Risiko Berat'])->nullable();
                $table->string('keterangan', 50);
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_risiko_kanker_paru');
    }
};
