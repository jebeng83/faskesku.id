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
        if (!Schema::hasTable('catatan_anestesi_sedasi')) {
            Schema::create('catatan_anestesi_sedasi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->string('kd_dokter_bedah', 20)->index('kd_dokter_bedah');
                $table->string('kd_dokter_anestesi', 20)->index('kd_dokter_anestesi');
                $table->string('diagnosa_pre_bedah', 50);
                $table->string('tindakan_jenis_pembedahan', 50);
                $table->string('diagnosa_pasca_bedah', 50);
                $table->string('pre_induksi_jam', 10)->nullable();
                $table->enum('pre_induksi_kesadaran', ['Compos Mentis', 'Somnolence', 'Sopor', 'Coma', 'Alert', 'Confusion', 'Voice', 'Pain', 'Unresponsive', 'Apatis', 'Delirium'])->nullable();
                $table->string('pre_induksi_td', 8)->nullable();
                $table->string('pre_induksi_nadi', 5)->nullable();
                $table->string('pre_induksi_rr', 5)->nullable();
                $table->string('pre_induksi_suhu', 5)->nullable();
                $table->string('pre_induksi_o2', 5)->nullable();
                $table->string('pre_induksi_tb', 5)->nullable();
                $table->string('pre_induksi_bb', 5)->nullable();
                $table->enum('pre_induksi_rhesus', ['+', '-'])->nullable();
                $table->string('pre_induksi_hb', 5)->nullable();
                $table->string('pre_induksi_ht', 5)->nullable();
                $table->string('pre_induksi_leko', 5)->nullable();
                $table->string('pre_induksi_trombo', 5)->nullable();
                $table->string('pre_induksi_btct', 5)->nullable();
                $table->string('pre_induksi_gds', 5)->nullable();
                $table->string('pre_induksi_lainlain', 30)->nullable();
                $table->enum('teknik_alat_hiopotensi', ['Ya', 'Tidak'])->nullable();
                $table->enum('teknik_alat_tci', ['Ya', 'Tidak'])->nullable();
                $table->enum('teknik_alat_cpb', ['Ya', 'Tidak'])->nullable();
                $table->enum('teknik_alat_ventilasi', ['Ya', 'Tidak'])->nullable();
                $table->enum('teknik_alat_broncoskopy', ['Ya', 'Tidak'])->nullable();
                $table->enum('teknik_alat_glidescopi', ['Ya', 'Tidak'])->nullable();
                $table->enum('teknik_alat_usg', ['Ya', 'Tidak'])->nullable();
                $table->enum('teknik_alat_stimulator_saraf', ['Ya', 'Tidak'])->nullable();
                $table->string('teknik_alat_lainlain', 100)->nullable();
                $table->enum('monitoring_ekg', ['Ya', 'Tidak'])->nullable();
                $table->string('monitoring_ekg_keterangan', 50)->nullable();
                $table->enum('monitoring_arteri', ['Ya', 'Tidak'])->nullable();
                $table->string('monitoring_arteri_keterangan', 50)->nullable();
                $table->enum('monitoring_cvp', ['Ya', 'Tidak'])->nullable();
                $table->string('monitoring_cvp_keterangan', 50)->nullable();
                $table->enum('monitoring_etco', ['Ya', 'Tidak'])->nullable();
                $table->enum('monitoring_stetoskop', ['Ya', 'Tidak'])->nullable();
                $table->enum('monitoring_nibp', ['Ya', 'Tidak'])->nullable();
                $table->enum('monitoring_ngt', ['Ya', 'Tidak'])->nullable();
                $table->enum('monitoring_bis', ['Ya', 'Tidak'])->nullable();
                $table->enum('monitoring_cath_a_pulmo', ['Ya', 'Tidak'])->nullable();
                $table->enum('monitoring_spo2', ['Ya', 'Tidak'])->nullable();
                $table->enum('monitoring_kateter', ['Ya', 'Tidak'])->nullable();
                $table->enum('monitoring_temp', ['Ya', 'Tidak'])->nullable();
                $table->string('monitoring_lainlain', 100)->nullable();
                $table->enum('status_fisik_asa', ['1', '2', '3', '4', '5', 'E'])->nullable();
                $table->enum('status_fisik_alergi', ['Tidak', 'Ya']);
                $table->string('status_fisik_alergi_keterangan', 50)->nullable();
                $table->string('status_fisik_penyulit_sedasi', 150)->nullable();
                $table->enum('perencanaan_lanjut', ['Ya', 'Tidak'])->nullable();
                $table->enum('perencanaan_lanjut_sedasi', ['Sedang', 'Dalam', 'Tidak', 'Lain-lain'])->nullable();
                $table->string('perencanaan_lanjut_sedasi_keterangan', 30)->nullable();
                $table->enum('perencanaan_lanjut_spinal', ['Ya', 'Tidak'])->nullable();
                $table->enum('perencanaan_lanjut_anestesi_umum', ['Ya', 'Tidak'])->nullable();
                $table->string('perencanaan_lanjut_anestesi_umum_keterangan', 30)->nullable();
                $table->enum('perencanaan_lanjut_blok_perifer', ['Ya', 'Tidak'])->nullable();
                $table->string('perencanaan_lanjut_blok_perifer_keterangan', 30)->nullable();
                $table->enum('perencanaan_lanjut_epidural', ['Ya', 'Tidak'])->nullable();
                $table->enum('perencanaan_batal', ['Ya', 'Tidak'])->nullable();
                $table->string('perencanaan_batal_alasan', 150)->nullable();
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
        Schema::dropIfExists('catatan_anestesi_sedasi');
    }
};
