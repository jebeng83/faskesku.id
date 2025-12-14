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
        if (! Schema::hasTable('penilaian_bayi_baru_lahir')) {
            Schema::create('penilaian_bayi_baru_lahir', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('no_rkm_medis_ibu', 15)->nullable()->index('no_rkm_medis');
                $table->enum('penyakit_diderita_ibu', ['Tidak Ada', 'Ada'])->nullable();
                $table->string('keterangan_penyakit_diderita_ibu', 70)->nullable();
                $table->string('obat_dikonsumsi_selama_kehamilan', 150)->nullable();
                $table->enum('perawatan_antenatal', ['Ya', 'Tidak'])->nullable();
                $table->string('keterangan_perawatan_antenatal', 40)->nullable();
                $table->enum('terdaftar_ekohort', ['Ya', 'Tidak'])->nullable();
                $table->string('keterangan_terdaftar_ekohort', 40)->nullable();
                $table->enum('penyulit_kehamilan', ['Tidak Ada', 'Hiperemesis', 'CPD', 'Kelainan Letak', 'Solutio Placenta', 'Placenta Previa', 'KPD', 'Oligohydramnion', 'Polyhydramnion', 'Prolaps Tali Pusat', 'IUGR', 'Pre-eklamsi', 'Lainnya'])->nullable();
                $table->string('keterangan_penyulit_kehamilan', 60)->nullable();
                $table->string('alergi', 60)->nullable();
                $table->string('keterangan_lainnya_riwayat_maternal', 150)->nullable();
                $table->string('umur_kehamilan', 30)->nullable();
                $table->enum('kehamilan', ['Tunggal', 'Kembar'])->nullable();
                $table->string('keterangan_kehamilan', 30)->nullable();
                $table->string('urutan_kehamilan', 4)->nullable();
                $table->string('jam_ketuban_pecah', 4)->nullable();
                $table->string('menit_ketuban_pecah', 4)->nullable();
                $table->string('jumlah_air_ketuban', 20)->nullable();
                $table->string('warna_air_ketuban', 20)->nullable();
                $table->string('bau_air_ketuban', 20)->nullable();
                $table->string('letak_bayi', 70)->nullable();
                $table->enum('macam_persalinan', ['Spontan', 'Porceps', 'Vacum', 'Sectio Caesarea', 'Lainnya'])->nullable();
                $table->string('keterangan_macam_persalinan', 40)->nullable();
                $table->enum('indikasi_persalinan_operatif', ['Tidak Ada', 'Gawat Janin', 'SC Sebelumnya', 'Kala II Memanjang', 'Komplikasi Tali Pusat', 'Malposisi', 'Gawat Ibu', 'CPD', 'Lainnya'])->nullable();
                $table->string('keterangan_indikasi_persalinan_operatif', 50)->nullable();
                $table->string('lama_gawat_janin', 4)->nullable();
                $table->string('obat_selama_persalinan', 150)->nullable();
                $table->string('berat_placenta', 4)->nullable();
                $table->string('kelainan_placenta', 70)->nullable();
                $table->string('keterangan_lainnya_riwayat_persalinan', 150)->nullable();
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
                $table->string('bblahir', 5)->nullable();
                $table->string('panjang_badan', 5)->nullable();
                $table->string('lingkar_kepala', 5)->nullable();
                $table->string('lingkar_dada', 5)->nullable();
                $table->enum('resusitasi_saat_lahir', ['Tidak', 'Rangsang Taktil', 'O2', 'Ventilasi Dengan Maskre', 'Ventilasi Dengan EET', 'Lainnya'])->nullable();
                $table->string('keterangan_resusitasi_saat_lahir', 70)->nullable();
                $table->string('obat_diberikan_saat_lahir', 150)->nullable();
                $table->string('keterangan_lainnya_keadaan_bayi', 150)->nullable();
                $table->enum('kondisi_umum', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_kondisi_umum', 40)->nullable();
                $table->enum('kulit', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_kulit', 40)->nullable();
                $table->enum('kepala', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_kepala', 40)->nullable();
                $table->enum('leher', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_leher', 40)->nullable();
                $table->enum('mata', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_mata', 40)->nullable();
                $table->enum('hidung', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_hidung', 40)->nullable();
                $table->enum('telinga', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_telinga', 40)->nullable();
                $table->enum('dada', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_dada', 40)->nullable();
                $table->enum('paru', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_paru', 40)->nullable();
                $table->enum('jantung', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_jantung', 40)->nullable();
                $table->enum('perut', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_perut', 40)->nullable();
                $table->enum('tali_pusat', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_tali_pusat', 40)->nullable();
                $table->enum('alat_kelamin', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_alat_kelamin', 40)->nullable();
                $table->enum('ruas_tulang_belakang', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_ruas_tulang_belakang', 40)->nullable();
                $table->enum('extrimitas', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_extrimitas', 40)->nullable();
                $table->enum('anus', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_anus', 40)->nullable();
                $table->enum('refleks', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_refleks', 40)->nullable();
                $table->enum('denyut_femoral', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_denyut_femoral', 40)->nullable();
                $table->string('pemeriksaan_fisik_lainnya', 300)->nullable();
                $table->string('pemeriksaan_penunjang', 500)->nullable();
                $table->string('diagnosa', 300)->nullable();
                $table->string('tatalaksana', 1000)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_bayi_baru_lahir');
    }
};
