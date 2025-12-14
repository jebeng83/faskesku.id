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
        if (! Schema::hasTable('penilaian_tambahan_beresiko_melarikan_diri')) {
            Schema::create('penilaian_tambahan_beresiko_melarikan_diri', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('nip', 20)->index('kd_dokter');
                $table->enum('statik_riwayat_melarikan_diri', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorriwayat_melarikan_diri')->nullable();
                $table->enum('statik_riwayat_penolakan_pengobatan', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorriwayat_penolakan_pengobatan')->nullable();
                $table->enum('statik_usia_dibawah_35', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorusia_dibawah_35')->nullable();
                $table->enum('statik_laki_laki', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorlaki_laki')->nullable();
                $table->enum('statik_diagnosis_skizofrenia', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skordiagnosis_skizofrenia')->nullable();
                $table->enum('statik_belum_menikah', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorbelum_menikah')->nullable();
                $table->enum('statik_riwayat_penggunaan_napza', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skoriwayat_penggunaan_napza')->nullable();
                $table->enum('statik_diagnosis_gangguan_kepribadian', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skordiagnosis_gangguan_kepribadian')->nullable();
                $table->enum('statik_riwayat_kriminal', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorriwayat_kriminal')->nullable();
                $table->tinyInteger('statik_skortotal')->nullable();
                $table->enum('dinamis_anti_treatment', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skoranti_treatment')->nullable();
                $table->enum('dinamis_penggunaan_napza', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorpenggunaan_napza')->nullable();
                $table->enum('dinamis_kebosanan', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorkebosanan')->nullable();
                $table->enum('dinamis_perintah_halusinasi', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorperintah_halusinasi')->nullable();
                $table->enum('dinamis_hilangnya_kontrol_diri', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorhilangnya_kontrol_diri')->nullable();
                $table->enum('dinamis_seksual_tidak_wajar', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorseksual_tidak_wajar')->nullable();
                $table->enum('dinamis_kemarahan_frustasi', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorkemarahan_frustasi')->nullable();
                $table->enum('dinamis_ketakutan_perawatan', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorketakutan_perawatan')->nullable();
                $table->tinyInteger('dinamis_skortotal')->nullable();
                $table->string('faktor_faktor_pencegahan', 500)->nullable();
                $table->tinyInteger('total_skor')->nullable();
                $table->enum('level_skor', ['Rendah(<7)', 'Sedang(7-14)', 'Tinggi(>14)'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_tambahan_beresiko_melarikan_diri');
    }
};
