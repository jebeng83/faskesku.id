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
        if (! Schema::hasTable('checklist_post_operasi')) {
            Schema::create('checklist_post_operasi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->string('sncn', 25);
                $table->string('tindakan', 50);
                $table->string('kd_dokter_bedah', 20)->index('kd_dokter_bedah');
                $table->string('kd_dokter_anestesi', 20)->index('kd_dokter_anestesi');
                $table->enum('keadaan_umum', ['Sadar', 'Tidur', 'Terintubasi'])->nullable();
                $table->enum('pemeriksaan_penunjang_rontgen', ['Ada', 'Tidak Ada'])->nullable();
                $table->string('keterangan_pemeriksaan_penunjang_rontgen', 20)->nullable();
                $table->enum('pemeriksaan_penunjang_ekg', ['Ada', 'Tidak Ada'])->nullable();
                $table->string('keterangan_pemeriksaan_penunjang_ekg', 20)->nullable();
                $table->enum('pemeriksaan_penunjang_usg', ['Ada', 'Tidak Ada'])->nullable();
                $table->string('keterangan_pemeriksaan_penunjang_usg', 20)->nullable();
                $table->enum('pemeriksaan_penunjang_ctscan', ['Ada', 'Tidak Ada'])->nullable();
                $table->string('keterangan_pemeriksaan_penunjang_ctscan', 20)->nullable();
                $table->enum('pemeriksaan_penunjang_mri', ['Ada', 'Tidak Ada'])->nullable();
                $table->string('keterangan_pemeriksaan_penunjang_mri', 20)->nullable();
                $table->string('jenis_cairan_infus', 40)->nullable();
                $table->enum('kateter_urine', ['Ada', 'Tidak Ada'])->nullable();
                $table->dateTime('tanggal_pemasangan_kateter')->nullable();
                $table->enum('warna_kateter', ['Jernih', 'Keruh', '-'])->nullable();
                $table->string('jumlah_kateter', 4)->nullable();
                $table->string('area_luka_operasi', 120)->nullable();
                $table->enum('drain', ['Ada', 'Tidak Ada'])->nullable();
                $table->string('jumlah_drain', 2)->nullable();
                $table->string('letak_drain', 40)->nullable();
                $table->string('warna_drain', 30)->nullable();
                $table->enum('jaringan_pa', ['Ada', 'Tidak Ada'])->nullable();
                $table->string('nip_perawat_ok', 20)->nullable()->index('nip_perawat_ok');
                $table->string('nip_perawat_anestesi', 20)->nullable()->index('nip_perawat_anestesi');

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checklist_post_operasi');
    }
};
