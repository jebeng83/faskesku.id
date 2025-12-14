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
        if (! Schema::hasTable('penilaian_medis_ralan_gawat_darurat_psikiatri')) {
            Schema::create('penilaian_medis_ralan_gawat_darurat_psikiatri', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->enum('anamnesis', ['Autoanamnesis', 'Alloanamnesis']);
                $table->string('hubungan', 30);
                $table->string('keluhan_utama', 2000)->nullable();
                $table->string('gejala_menyertai', 1000)->nullable();
                $table->string('faktor_pencetus', 1000)->nullable();
                $table->enum('riwayat_penyakit_dahulu', ['Tidak Ada', 'Ada'])->nullable();
                $table->string('keterangan_riwayat_penyakit_dahulu', 1000)->nullable();
                $table->string('riwayat_kehamilan', 1000)->nullable();
                $table->enum('riwayat_sosial', ['Bergaul', 'Tidak Bergaul', 'Lain-lain'])->nullable();
                $table->string('keterangan_riwayat_sosial', 50)->nullable();
                $table->enum('riwayat_pekerjaan', ['Bekerja', 'Tidak Bekerja', 'Ganti-gantian Pekerjaan'])->nullable();
                $table->string('keterangan_riwayat_pekerjaan', 50)->nullable();
                $table->string('riwayat_obat_diminum', 1000)->nullable();
                $table->string('faktor_kepribadian_premorbid', 50)->nullable();
                $table->enum('faktor_keturunan', ['Tidak Ada', 'Ada'])->nullable();
                $table->string('keterangan_faktor_keturunan', 50)->nullable();
                $table->enum('faktor_organik', ['Tidak Ada', 'Ada'])->nullable();
                $table->string('keterangan_faktor_organik', 50)->nullable();
                $table->string('riwayat_alergi', 50)->nullable();
                $table->enum('fisik_kesadaran', ['Compos Mentis', 'Apatis', 'Somnolen', 'Sopor', 'Koma'])->nullable();
                $table->string('fisik_td', 8)->nullable();
                $table->string('fisik_rr', 5)->nullable();
                $table->string('fisik_suhu', 5)->nullable();
                $table->enum('fisik_nyeri', ['Tidak Nyeri', 'Nyeri Ringan', 'Nyeri Sedang', 'Nyeri Berat', 'Nyeri Sangat Berat', 'Nyeri Tak Tertahankan'])->nullable();
                $table->string('fisik_nadi', 5)->nullable();
                $table->string('fisik_bb', 5)->nullable();
                $table->string('fisik_tb', 5)->nullable();
                $table->string('fisik_status_nutrisi', 100)->nullable();
                $table->string('fisik_gcs', 8)->nullable();
                $table->enum('status_kelainan_kepala', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_status_kelainan_kepala', 50)->nullable();
                $table->enum('status_kelainan_leher', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_status_kelainan_leher', 50)->nullable();
                $table->enum('status_kelainan_dada', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_status_kelainan_dada', 50)->nullable();
                $table->enum('status_kelainan_perut', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_status_kelainan_perut', 50)->nullable();
                $table->enum('status_kelainan_anggota_gerak', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_status_kelainan_anggota_gerak', 50)->nullable();
                $table->string('status_lokalisata', 1000)->nullable();
                $table->string('psikiatrik_kesan_umum', 50)->nullable();
                $table->string('psikiatrik_sikap_prilaku', 50)->nullable();
                $table->string('psikiatrik_kesadaran', 50)->nullable();
                $table->string('psikiatrik_orientasi', 50)->nullable();
                $table->string('psikiatrik_daya_ingat', 50)->nullable();
                $table->string('psikiatrik_persepsi', 50)->nullable();
                $table->string('psikiatrik_pikiran', 50)->nullable();
                $table->string('psikiatrik_insight', 50)->nullable();
                $table->string('laborat', 300)->nullable();
                $table->string('radiologi', 200)->nullable();
                $table->string('ekg', 200)->nullable();
                $table->string('diagnosis', 1000)->nullable();
                $table->string('permasalahan', 500)->nullable();
                $table->string('instruksi_medis', 600)->nullable();
                $table->string('rencana_target', 1000)->nullable();
                $table->enum('pulang_dipulangkan', ['Tidak Perlu Kontrol', 'Kontrol/Berobat Jalan', 'Rawat Inap', '-'])->nullable();
                $table->string('keterangan_pulang_dipulangkan', 100)->nullable();
                $table->string('pulang_dirawat_diruang', 30)->nullable();
                $table->string('pulang_indikasi_ranap', 100)->nullable();
                $table->string('pulang_dirujuk_ke', 70)->nullable();
                $table->enum('pulang_alasan_dirujuk', ['-', 'Tempat Penuh', 'Perlu Fasilitas Lebih', 'Permintaan Pasien/Keluarga'])->nullable();
                $table->enum('pulang_paksa', ['-', 'Masalah Biaya', 'Kondisi Pasien', 'Masalah Lokasi Rumah', 'Lain-lain'])->nullable();
                $table->string('keterangan_pulang_paksa', 100)->nullable();
                $table->enum('pulang_meninggal_igd', ['-', '<= 2 Jam', '> 2 Jam'])->nullable();
                $table->string('pulang_penyebab_kematian', 100)->nullable();
                $table->enum('fisik_pulang_kesadaran', ['Compos Mentis', 'Apatis', 'Somnolen', 'Sopor', 'Koma'])->nullable();
                $table->string('fisik_pulang_td', 8)->nullable();
                $table->string('fisik_pulang_nadi', 5)->nullable();
                $table->string('fisik_pulang_gcs', 8)->nullable();
                $table->string('fisik_pulang_suhu', 5)->nullable();
                $table->string('fisik_pulang_rr', 5)->nullable();
                $table->string('edukasi', 1000)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_medis_ralan_gawat_darurat_psikiatri');
    }
};
