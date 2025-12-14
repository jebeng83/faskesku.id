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
        if (! Schema::hasTable('signout_sebelum_menutup_luka')) {
            Schema::create('signout_sebelum_menutup_luka', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->string('sncn', 25);
                $table->string('tindakan', 50);
                $table->string('kd_dokter_bedah', 20)->index('kd_dokter_bedah');
                $table->string('kd_dokter_anestesi', 20)->index('kd_dokter_anestesi');
                $table->enum('verbal_tindakan', ['Ya', 'Tidak'])->nullable();
                $table->enum('verbal_kelengkapan_kasa', ['Ya', 'Tidak'])->nullable();
                $table->enum('verbal_instrumen', ['Ya', 'Tidak'])->nullable();
                $table->enum('verbal_alat_tajam', ['Ya', 'Tidak'])->nullable();
                $table->enum('kelengkapan_specimen_label', ['Lengkap', 'Tidak Lengkap', 'Tidak Ada Pemeriksaan Spesimen'])->nullable();
                $table->enum('kelengkapan_specimen_formulir', ['Lengkap', 'Tidak Lengkap', 'Tidak Ada Pemeriksaan Spesimen'])->nullable();
                $table->enum('peninjauan_kegiatan_dokter_bedah', ['Ya', 'Tidak'])->nullable();
                $table->enum('peninjauan_kegiatan_dokter_anestesi', ['Ya', 'Tidak'])->nullable();
                $table->enum('peninjauan_kegiatan_perawat_kamar_ok', ['Ya', 'Tidak'])->nullable();
                $table->string('perhatian_utama_fase_pemulihan', 100)->nullable();
                $table->string('nip_perawat_ok', 20)->nullable()->index('nip_perawat_ok');

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('signout_sebelum_menutup_luka');
    }
};
