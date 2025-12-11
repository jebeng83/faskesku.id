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
        if (!Schema::hasTable('checklist_pre_operasi')) {
            Schema::create('checklist_pre_operasi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->string('sncn', 25);
                $table->string('tindakan', 50);
                $table->string('kd_dokter_bedah', 20)->index('kd_dokter_bedah');
                $table->string('kd_dokter_anestesi', 20)->index('kd_dokter_anestesi');
                $table->enum('identitas', ['Ya', 'Tidak'])->nullable();
                $table->enum('surat_ijin_bedah', ['Ada', 'Tidak Ada'])->nullable();
                $table->enum('surat_ijin_anestesi', ['Ada', 'Tidak Ada'])->nullable();
                $table->enum('surat_ijin_transfusi', ['Ada', 'Tidak Ada', 'Tidak Diperlukan'])->nullable();
                $table->enum('penandaan_area_operasi', ['Ada', 'Tidak Ada', 'Tidak Diperlukan'])->nullable();
                $table->enum('keadaan_umum', ['Baik', 'Sedang', 'Lemah'])->nullable();
                $table->enum('pemeriksaan_penunjang_rontgen', ['Ada', 'Tidak Ada', 'Tidak Diperlukan'])->nullable();
                $table->string('keterangan_pemeriksaan_penunjang_rontgen', 20)->nullable();
                $table->enum('pemeriksaan_penunjang_ekg', ['Ada', 'Tidak Ada', 'Tidak Diperlukan'])->nullable();
                $table->string('keterangan_pemeriksaan_penunjang_ekg', 20)->nullable();
                $table->enum('pemeriksaan_penunjang_usg', ['Ada', 'Tidak Ada', 'Tidak Diperlukan'])->nullable();
                $table->string('keterangan_pemeriksaan_penunjang_usg', 20)->nullable();
                $table->enum('pemeriksaan_penunjang_ctscan', ['Ada', 'Tidak Ada', 'Tidak Diperlukan'])->nullable();
                $table->string('keterangan_pemeriksaan_penunjang_ctscan', 20)->nullable();
                $table->enum('pemeriksaan_penunjang_mri', ['Ada', 'Tidak Ada', 'Tidak Diperlukan'])->nullable();
                $table->string('keterangan_pemeriksaan_penunjang_mri', 20)->nullable();
                $table->enum('persiapan_darah', ['Ada', 'Tidak Ada', 'Tidak Diperlukan'])->nullable();
                $table->string('keterangan_persiapan_darah', 20)->nullable();
                $table->enum('perlengkapan_khusus', ['Ada', 'Tidak Ada', 'Tidak Diperlukan'])->nullable();
                $table->string('nip_petugas_ruangan', 20)->nullable()->index('nip_petugas_ruangan');
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
        Schema::dropIfExists('checklist_pre_operasi');
    }
};
