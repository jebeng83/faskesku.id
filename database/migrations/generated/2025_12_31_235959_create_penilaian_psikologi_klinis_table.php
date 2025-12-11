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
        if (!Schema::hasTable('penilaian_psikologi_klinis')) {
            Schema::create('penilaian_psikologi_klinis', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('nip', 20)->index('nip');
                $table->enum('anamnesis', ['Autoanamnesis', 'Alloanamnesis']);
                $table->enum('dikirim_dari', ['Ruang Rawat', 'Poliklinik', 'Rehabilitasi', 'After Care', 'Dokter']);
                $table->enum('tujuan_pemeriksaan', ['Klinik', 'Bimbingan', 'Forensik']);
                $table->string('ket_anamnesis', 200)->nullable();
                $table->string('keluhan_utama', 2000)->nullable();
                $table->string('riwayat_penyakit', 1000)->nullable();
                $table->string('riwayat_keluhan', 1000)->nullable();
                $table->enum('permasalahan_saat_ini', ['Sangat Serius', 'Serius', 'Cukup Serius'])->nullable();
                $table->string('permasalahan_alasan', 100)->nullable();
                $table->string('permasalahan_ekspektasi', 100)->nullable();
                $table->string('riwayat_hidup_singkat', 1000)->nullable();
                $table->string('kondisi_psikologis_penampilan', 150)->nullable();
                $table->string('kondisi_psikologis_ekspresi_wajah', 150)->nullable();
                $table->string('kondisi_psikologis_suasana_hati', 150)->nullable();
                $table->string('kondisi_psikologis_tingkah_laku', 150)->nullable();
                $table->string('kondisi_psikologis_fungsi_umum', 150)->nullable();
                $table->string('kondisi_psikologis_fungsi_intelektual', 150)->nullable();
                $table->string('kondisi_psikologis_pengalaman', 150)->nullable();
                $table->string('kondisi_psikologis_lainnya', 150)->nullable();
                $table->string('kondisi_patologis_delusi', 150)->nullable();
                $table->string('kondisi_patologis_proses_pikiran', 150)->nullable();
                $table->string('kondisi_patologis_halusinasi', 150)->nullable();
                $table->string('kondisi_patologis_afek', 150)->nullable();
                $table->string('kondisi_patologis_insight', 150)->nullable();
                $table->string('kondisi_patologis_kesadaran', 150)->nullable();
                $table->string('kondisi_patologis_orientasi', 150)->nullable();
                $table->string('kondisi_patologis_atensi', 150)->nullable();
                $table->string('kondisi_patologis_kontrol_impuls', 150)->nullable();
                $table->date('psikotes_tanggal_pelaksanaan')->nullable();
                $table->string('psikotes_nama_tes', 100)->nullable();
                $table->string('psikotes_hasil', 200)->nullable();
                $table->string('dinamika_psikologis', 1000)->nullable();
                $table->string('diagnosa_psikologis', 1000)->nullable();
                $table->string('manifestasi_fungsi_psikologis', 1000)->nullable();
                $table->string('rencana_intervensi', 1000)->nullable();
                $table->string('tahapan_intervensi1', 100)->nullable();
                $table->string('target_terapi1', 100)->nullable();
                $table->string('tahapan_intervensi2', 100)->nullable();
                $table->string('target_terapi2', 100)->nullable();
                $table->string('tahapan_intervensi3', 100)->nullable();
                $table->string('target_terapi3', 100)->nullable();
                $table->string('tahapan_intervensi4', 100)->nullable();
                $table->string('target_terapi4', 100)->nullable();
                $table->string('tahapan_intervensi5', 100)->nullable();
                $table->string('target_terapi5', 100)->nullable();
                $table->string('tahapan_intervensi6', 100)->nullable();
                $table->string('target_terapi6', 100)->nullable();
                $table->string('tahapan_intervensi7', 100)->nullable();
                $table->string('target_terapi7', 100)->nullable();
                $table->string('evaluasi', 1000)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_psikologi_klinis');
    }
};
