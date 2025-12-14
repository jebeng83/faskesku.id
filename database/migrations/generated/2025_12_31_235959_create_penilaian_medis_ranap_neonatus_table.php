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
        if (! Schema::hasTable('penilaian_medis_ranap_neonatus')) {
            Schema::create('penilaian_medis_ranap_neonatus', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('no_rkm_medis_ibu', 15)->nullable()->index('no_rkm_medis');
                $table->string('g', 10)->nullable();
                $table->string('p', 10)->nullable();
                $table->string('a', 10)->nullable();
                $table->string('hidup', 10)->nullable();
                $table->string('usiahamil', 10)->nullable();
                $table->enum('hbsag', ['Negatif (-)', 'Positif (+)', 'Tidak Ada Keterangan'])->nullable();
                $table->enum('hiv', ['Negatif (-)', 'Positif (+)', 'Tidak Ada Keterangan'])->nullable();
                $table->enum('syphilis', ['Negatif (-)', 'Positif (+)', 'Tidak Ada Keterangan'])->nullable();
                $table->enum('riwayat_obstetri_ibu', ['Tidak Ada', 'Demam Pada Ibu > 38°C', 'Ketuban Pecah Dini', 'Ada Ketuban Berbau/Keruh', 'Nyeri Berkemih/ISK', 'Ibu DM', 'Ibu Hipertensi', 'Ibu Perdarahan', 'Ibu Eklamsia/Pre Eklamsia', 'Lainnya'])->nullable();
                $table->string('keterangan_riwayat_obstetri_ibu', 70)->nullable();
                $table->enum('faktor_risiko_neonatal', ['Tidak Ada', 'Kelahiran Preterm', 'Kelahiran Post Date', 'DJJ Abnormal', 'Lainnya'])->nullable();
                $table->string('keterangan_faktor_risiko_neonatal', 70)->nullable();
                $table->dateTime('tanggal_persalinan');
                $table->string('bersalin_di', 70)->nullable();
                $table->enum('inisiasi_menyusui', ['Ya', 'Tidak'])->nullable();
                $table->enum('jenis_persalinan', ['Spontan/Normal', 'Induksi', 'Sectio Caesaria', 'Vacum Ekstraksi'])->nullable();
                $table->string('indikasi', 70)->nullable();
                $table->enum('aterm', ['Ya', 'Tidak'])->nullable();
                $table->enum('bernafas', ['Ya', 'Tidak'])->nullable();
                $table->enum('tanus_otot', ['Ya', 'Tidak'])->nullable();
                $table->enum('cairan_amnion', ['Ya', 'Tidak'])->nullable();
                $table->string('f1', 1);
                $table->string('u1', 1);
                $table->string('t1', 1);
                $table->string('r1', 1);
                $table->string('w1', 1);
                $table->string('n1', 2);
                $table->string('f5', 1);
                $table->string('u5', 1);
                $table->string('t5', 1);
                $table->string('r5', 1);
                $table->string('w5', 1);
                $table->string('n5', 2);
                $table->string('f10', 1);
                $table->string('u10', 1);
                $table->string('t10', 1);
                $table->string('r10', 1);
                $table->string('w10', 1);
                $table->string('n10', 2);
                $table->enum('frekuensi_napas', ['< 60', '60 - 80', '> 80'])->nullable();
                $table->tinyInteger('nilai_frekuensi_napas')->nullable();
                $table->enum('retraksi', ['Tidak Ada', 'Retraksi Ringan', 'Retraksi Berat'])->nullable();
                $table->tinyInteger('nilai_retraksi')->nullable();
                $table->enum('sianosis', ['Tidak Ada', 'Hilang Dengan O2', 'Tidak Hilang Dengan O2'])->nullable();
                $table->tinyInteger('nilai_sianosis')->nullable();
                $table->enum('jalan_masuk_udara', ['Baik', 'Penurunan Ringan Udara Masuk', 'Tidak Ada Udara Masuk'])->nullable();
                $table->tinyInteger('nilai_jalan_masuk_udara')->nullable();
                $table->enum('grunting', ['Tidak Ada', 'Dapat Didengar Dengan Stetoskop', 'Dapat Didengar Tanpa Stetoskop'])->nullable();
                $table->tinyInteger('nilai_grunting')->nullable();
                $table->tinyInteger('total_down_score')->nullable();
                $table->string('keterangan_down_Score', 40)->nullable();
                $table->string('nadi', 5)->nullable();
                $table->string('rr', 5)->nullable();
                $table->string('suhu', 5)->nullable();
                $table->string('saturasi', 5)->nullable();
                $table->string('bb', 5)->nullable();
                $table->string('pb', 5)->nullable();
                $table->string('lk', 5)->nullable();
                $table->string('ld', 5)->nullable();
                $table->enum('keadaan_umum', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_keadaan_umum', 50)->nullable();
                $table->enum('kulit', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_kulit', 50)->nullable();
                $table->enum('kepala', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_kepala', 50)->nullable();
                $table->enum('mata', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_mata', 50)->nullable();
                $table->enum('telinga', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_telinga', 50)->nullable();
                $table->enum('hidung', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_hidung', 50)->nullable();
                $table->enum('mulut', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_mulut', 50)->nullable();
                $table->enum('tenggorokan', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_tenggorokan', 50)->nullable();
                $table->enum('leher', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_leher', 50)->nullable();
                $table->enum('thorax', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_thorax', 50)->nullable();
                $table->enum('abdomen', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_abdomen', 50)->nullable();
                $table->enum('genitalia', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_genitalia', 50)->nullable();
                $table->enum('anus', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_anus', 50)->nullable();
                $table->enum('muskulos', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_muskulos', 50)->nullable();
                $table->enum('ekstrimitas', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_ekstrimitas', 50)->nullable();
                $table->enum('paru', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_paru', 50)->nullable();
                $table->enum('refleks', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('keterangan_refleks', 50)->nullable();
                $table->string('kelainan_lainnya', 80)->nullable();
                $table->string('pemeriksaan_regional', 500);
                $table->string('lab', 500);
                $table->string('radiologi', 500);
                $table->string('penunjanglainnya', 500);
                $table->string('diagnosis', 500);
                $table->string('tata', 2000);
                $table->string('edukasi', 1000);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_medis_ranap_neonatus');
    }
};
