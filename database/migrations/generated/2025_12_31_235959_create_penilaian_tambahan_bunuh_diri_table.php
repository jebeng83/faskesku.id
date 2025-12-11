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
        if (!Schema::hasTable('penilaian_tambahan_bunuh_diri')) {
            Schema::create('penilaian_tambahan_bunuh_diri', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('nip', 20)->index('kd_dokter');
                $table->enum('statik_hidup_sendiri', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorhidup_sendiri')->nullable();
                $table->enum('statik_upaya_suicide', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorupaya_suicide')->nullable();
                $table->enum('statik_keluarga_suicide', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorkeluarga_suicide')->nullable();
                $table->enum('statik_diagnosa_gangguan_jiwa', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skordiagnosa_gangguan_jiwa')->nullable();
                $table->enum('statik_disabilitas_berat', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skordisabilitas_berat')->nullable();
                $table->enum('statik_berpisah', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorberpisah')->nullable();
                $table->enum('statik_kehilangan_kerja', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('statik_skorkehilangan_kerja')->nullable();
                $table->tinyInteger('statik_skortotal')->nullable();
                $table->enum('dinamis_ide_bunuh_diri', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skoride_bunuh_diri')->nullable();
                $table->enum('dinamis_maksud_suicide', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skormaksud_suicide')->nullable();
                $table->enum('dinamis_stress_berat', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorstress_berat')->nullable();
                $table->enum('dinamis_keputusasaan', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorkeputusasaan')->nullable();
                $table->enum('dinamis_kejadian_signifikan', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorkejadian_signifikan')->nullable();
                $table->enum('dinamis_kehilangan_kontrol', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorkehilangan_kontrol')->nullable();
                $table->enum('dinamis_penggunaan_napza', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
                $table->tinyInteger('dinamis_skorpenggunaan_napza')->nullable();
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
        Schema::dropIfExists('penilaian_tambahan_bunuh_diri');
    }
};
