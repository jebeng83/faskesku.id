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
        if (!Schema::hasTable('penilaian_tambahan_perilaku_kekerasan')) {
            Schema::create('penilaian_tambahan_perilaku_kekerasan', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('nip', 20)->index('kd_dokter');
                $table->enum('statik_insiden_kekerasan_baru_ini', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorinsiden_kekerasan_baru_ini')->nullable();
                $table->enum('statik_riwayat_penggunaan_senjata', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorriwayat_penggunaan_senjata')->nullable();
                $table->enum('statik_laki_laki', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorlaki_laki')->nullable();
                $table->enum('statik_usia_dibawah_35', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorusia_dibawah_35')->nullable();
                $table->enum('statik_riwayat_kriminal', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorriwayat_kriminal')->nullable();
                $table->enum('statik_ide_kekerasan', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skoride_kekerasan')->nullable();
                $table->enum('statik_kekerasan_anak_anak', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorkekerasan_anak_anak')->nullable();
                $table->enum('statik_peran_dalam_hidup', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorperan_dalam_hidup')->nullable();
                $table->enum('statik_penggunaan_napza', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorpenggunaan_napza')->nullable();
                $table->tinyInteger('statik_skortotal')->nullable();
                $table->enum('dinamis_ide_melukai_orang_lain', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skoride_melukai_orang_lain')->nullable();
                $table->enum('dinamis_akses_kekerasan', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorakses_kekerasan')->nullable();
                $table->enum('dinamis_ide_paranoid', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skoride_paranoid')->nullable();
                $table->enum('dinamis_perintah_halusinasi', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorperintah_halusinasi')->nullable();
                $table->enum('dinamis_frustasi_agitasi', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorfrustasi_agitasi')->nullable();
                $table->enum('dinamis_kesenangan_kekerasan', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorkesenangan_kekerasan')->nullable();
                $table->enum('dinamis_seksual_tidak_wajar', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorseksual_tidak_wajar')->nullable();
                $table->enum('dinamis_hilangnya_kontrol_diri', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorhilangnya_kontrol_diri')->nullable();
                $table->enum('dinamis_pengguaan_napza', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorpengguaan_napza')->nullable();
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
        Schema::dropIfExists('penilaian_tambahan_perilaku_kekerasan');
    }
};
