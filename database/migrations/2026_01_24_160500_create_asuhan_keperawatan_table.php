<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('asuhan_keperawatan')) {
        Schema::create('asuhan_keperawatan', function (Blueprint $table) {
            $table->string('no_rawat', 17)->primary();
            $table->string('no_rkm_medis', 15);
            $table->dateTime('tgl_pengkajian')->useCurrent();
            $table->dateTime('tgl_perubahan')->useCurrent()->useCurrentOnUpdate();
            $table->string('nip_perawat', 20);
            $table->string('ruangan', 30);
            $table->enum('jenis_pengkajian', ['Awal', 'Berkelanjutan', 'Rujukan'])->default('Awal');

            $table->string('keluhan_utama', 500);
            $table->dateTime('onset_keluhan')->nullable();
            $table->string('durasi_keluhan', 50)->nullable();
            $table->string('lokasi_keluhan', 150)->nullable();
            $table->string('kualitas_keluhan', 150)->nullable();
            $table->string('faktor_pemicu', 150)->nullable();
            $table->string('faktor_pereda', 150)->nullable();
            $table->integer('skala_keluhan')->nullable();

            $table->string('riwayat_penyakit_sekarang', 500)->nullable();
            $table->string('provokatif_palliatif', 150)->nullable();
            $table->string('kualitas_gejala', 150)->nullable();
            $table->string('region_radiasi', 150)->nullable();
            $table->string('severity_gejala', 150)->nullable();
            $table->string('time_pattern', 150)->nullable();

            $table->string('riwayat_penyakit_kronis', 200)->nullable();
            $table->string('riwayat_operasi', 200)->nullable();
            $table->string('riwayat_rawat_inap', 200)->nullable();
            $table->string('riwayat_trauma', 150)->nullable();
            $table->enum('riwayat_transfusi', ['Ya', 'Tidak', 'Tidak Tahu'])->nullable();
            $table->date('tgl_transfusi_terakhir')->nullable();

            $table->string('pengobatan_rutin', 150)->nullable();
            $table->string('pengobatan_herbal_suplemen', 150)->nullable();
            $table->string('riwayat_alergi_obat', 150)->nullable();
            $table->string('reaksi_alergi', 150)->nullable();
            $table->string('riwayat_alergi_makanan', 150)->nullable();
            $table->string('riwayat_alergi_lainnya', 150)->nullable();

            $table->string('riwayat_keluarga_penyakit_kardiovaskular', 150)->nullable();
            $table->string('riwayat_keluarga_diabetes', 150)->nullable();
            $table->string('riwayat_keluarga_kanker', 150)->nullable();
            $table->string('riwayat_keluarga_hipertensi', 150)->nullable();
            $table->string('riwayat_keluarga_penyakit_mental', 150)->nullable();
            $table->string('riwayat_keluarga_penyakit_genetik', 150)->nullable();

            $table->json('genogram_data')->nullable();
            $table->string('genogram_path', 255)->nullable();
            $table->string('genogram_deskripsi', 200)->nullable();
            $table->string('genogram_keluarga_inti', 200)->nullable();
            $table->string('genogram_hubungan_keluarga', 200)->nullable();

            $table->enum('lingkungan_tinggal', ['Rumah sendiri', 'Kontrak', 'Keluarga', 'Lainnya'])->nullable();
            $table->string('kondisi_lingkungan', 150)->nullable();
            $table->enum('akses_air_bersih', ['Ya', 'Tidak'])->nullable();
            $table->enum('sanitasi', ['MCK sendiri', 'MCK bersama', 'Tidak ada'])->nullable();
            $table->enum('paparan_polusi', ['Tidak', 'Polusi udara', 'Polusi suara', 'Kimia', 'Lainnya'])->nullable();
            $table->string('paparan_bahan_berbahaya', 150)->nullable();
            $table->string('pekerjaan_terakhir', 100)->nullable();
            $table->string('lingkungan_kerja', 150)->nullable();
            $table->string('lama_kerja', 50)->nullable();

            $table->enum('status_ekonomi', ['Baik', 'Cukup', 'Kurang'])->nullable();
            $table->string('stresor_psikososial', 150)->nullable();
            $table->string('dukungan_sosial_tersedia', 150)->nullable();
            $table->string('kebiasaan_menetap', 150)->nullable();

            $table->string('riwayat_kehamilan_ibu', 150)->nullable();
            $table->string('riwayat_persalinan_ibu', 150)->nullable();
            $table->string('riwayat_imunisasi', 150)->nullable();
            $table->string('milestone_perkembangan', 150)->nullable();

            $table->string('persepsi_kesehatan', 150)->nullable();
            $table->enum('keb_olahraga_frekuensi', ['Tidak pernah', '<1x/minggu', '1-3x/minggu', '>3x/minggu'])->nullable();
            $table->string('keb_olahraga_jenis', 100)->nullable();
            $table->boolean('cek_kesehatan_rutin')->default(false);
            $table->string('penggunaan_obat', 150)->nullable();
            $table->enum('penggunaan_rokok', ['Tidak', 'Ya <10batang/hari', 'Ya 10-20batang/hari', 'Ya >20batang/hari'])->nullable();
            $table->enum('penggunaan_alkohol', ['Tidak', 'Ya kadang', 'Ya rutin'])->nullable();
            $table->string('zat_adiktif_lainnya', 150)->nullable();

            $table->text('pola_makan_harian')->nullable();
            $table->enum('nafsu_makan', ['Baik', 'Cukup', 'Kurang', 'Tidak ada'])->default('Baik');
            $table->boolean('kesulitan_mengunyah')->default(false);
            $table->string('alergi_makanan', 150)->nullable();
            $table->decimal('bb_sebelum', 5, 2)->nullable();
            $table->decimal('bb_sekarang', 5, 2)->nullable();
            $table->decimal('perubahan_bb_6bln', 4, 2)->nullable();
            $table->boolean('mual_muntah')->default(false);
            $table->boolean('diare')->default(false);
            $table->boolean('konstipasi')->default(false);
            $table->decimal('kebiasaan_minum_perhari', 4, 2)->nullable();
            $table->text('suplemen_vitamin')->nullable();

            $table->integer('eliminasi_bak_frekuensi')->nullable();
            $table->string('eliminasi_bak_warna', 20)->nullable();
            $table->decimal('eliminasi_bak_jumlah', 5, 2)->nullable();
            $table->string('keluhan_bak', 150)->nullable();
            $table->integer('eliminasi_bab_frekuensi')->nullable();
            $table->enum('eliminasi_bab_konsistensi', ['Padat', 'Lunak', 'Cair', 'Keras'])->nullable();
            $table->string('eliminasi_bab_warna', 20)->nullable();
            $table->string('keluhan_bab', 150)->nullable();
            $table->enum('keringat', ['Normal', 'Berlebihan', 'Tidak ada'])->default('Normal');

            $table->string('aktivitas_sebelum_sakit', 150)->nullable();
            $table->enum('mobilitas', ['Mandiri', 'Dengan bantuan', 'Tirah baring'])->default('Mandiri');
            $table->string('kendala_aktivitas', 150)->nullable();
            $table->time('jam_tidur_mulai')->nullable();
            $table->time('jam_tidur_bangun')->nullable();
            $table->enum('kualitas_tidur', ['Nyenyak', 'Sering terbangun', 'Insomnia'])->default('Nyenyak');
            $table->enum('adl_makan', ['Mandiri', 'Dibantu', 'Bergantung'])->default('Mandiri');
            $table->enum('adl_mandi', ['Mandiri', 'Dibantu', 'Bergantung'])->default('Mandiri');
            $table->enum('adl_berpakaian', ['Mandiri', 'Dibantu', 'Bergantung'])->default('Mandiri');
            $table->enum('adl_toileting', ['Mandiri', 'Dibantu', 'Bergantung'])->default('Mandiri');

            $table->integer('tidur_siang_durasi')->nullable();
            $table->boolean('kesulitan_tidur')->default(false);
            $table->string('faktor_pengganggu_tidur', 150)->nullable();
            $table->enum('perasaan_bangun', ['Segar', 'Lelah', 'Sangat lelah'])->default('Segar');
            $table->boolean('obat_bantu_tidur')->default(false);
            $table->string('kebiasaan_sebelum_tidur', 150)->nullable();

            $table->enum('kesadaran', ['Compos mentis', 'Apatis', 'Somnolen', 'Delirium'])->default('Compos mentis');
            $table->boolean('orientasi_orang')->default(true);
            $table->boolean('orientasi_tempat')->default(true);
            $table->boolean('orientasi_waktu')->default(true);
            $table->enum('memori_jpendek', ['Baik', 'Terganggu'])->default('Baik');
            $table->enum('memori_jpanjang', ['Baik', 'Terganggu'])->default('Baik');
            $table->enum('pengambilan_keputusan', ['Baik', 'Terganggu'])->default('Baik');
            $table->enum('pengetahuan_penyakit', ['Baik', 'Cukup', 'Kurang'])->default('Baik');
            $table->enum('penglihatan', ['Normal', 'Rabun', 'Buta', 'Kacamata'])->default('Normal');
            $table->enum('pendengaran', ['Normal', 'Tuli', 'Alat bantu'])->default('Normal');
            $table->enum('penciuman', ['Normal', 'Terganggu'])->default('Normal');
            $table->enum('pengecapan', ['Normal', 'Terganggu'])->default('Normal');
            $table->enum('peraba', ['Normal', 'Terganggu'])->default('Normal');

            $table->string('perasaan_diri', 150)->nullable();
            $table->string('citra_tubuh', 150)->nullable();
            $table->enum('harga_diri', ['Baik', 'Cukup', 'Rendah'])->default('Baik');
            $table->boolean('perasaan_cemas')->default(false);
            $table->boolean('perasaan_takut')->default(false);
            $table->boolean('perasaan_sedih')->default(false);
            $table->boolean('perasaan_marah')->default(false);
            $table->string('mekanisme_koping', 150)->nullable();
            $table->string('harapan_masa_depan', 150)->nullable();

            $table->enum('status_perkawinan', ['Menikah', 'Belum menikah', 'Cerai', 'Duda/Janda'])->nullable();
            $table->integer('jumlah_anak')->default(0);
            $table->enum('hubungan_keluarga', ['Harmonis', 'Kurang harmonis'])->default('Harmonis');
            $table->string('hubungan_teman', 150)->nullable();
            $table->string('peran_di_keluarga', 150)->nullable();
            $table->string('peran_di_masyarakat', 150)->nullable();
            $table->string('dukungan_sosial', 150)->nullable();
            $table->string('kebiasaan_komunikasi', 150)->nullable();

            $table->integer('menarche_usia')->nullable();
            $table->integer('siklus_haid_hari')->nullable();
            $table->integer('lama_haid_hari')->nullable();
            $table->boolean('pms')->default(false);
            $table->integer('menopause_usia')->nullable();
            $table->string('riwayat_kehamilan', 150)->nullable();
            $table->string('kontrasepsi', 150)->nullable();
            $table->string('masalah_seksual', 150)->nullable();
            $table->enum('kepuasan_seksual', ['Puas', 'Cukup', 'Kurang'])->default('Puas');
            $table->boolean('riwayat_ims')->default(false);

            $table->string('sumber_stres', 150)->nullable();
            $table->string('tanda_stres_fisik', 150)->nullable();
            $table->string('tanda_stres_emosional', 150)->nullable();
            $table->string('mekanisme_koping_stres', 150)->nullable();
            $table->enum('efektivitas_koping', ['Efektif', 'Cukup', 'Tidak efektif'])->default('Efektif');
            $table->string('dukungan_diinginkan', 150)->nullable();
            $table->string('pengalaman_stres', 150)->nullable();

            $table->string('keyakinan_agama', 50)->nullable();
            $table->string('aktivitas_ibadah', 150)->nullable();
            $table->string('sumber_kekuatan_spiritual', 150)->nullable();
            $table->string('nilai_kehidupan', 150)->nullable();
            $table->string('hubungan_keyakinan_kesehatan', 150)->nullable();
            $table->string('kepercayaan_budaya', 150)->nullable();
            $table->string('praktik_tradisional', 150)->nullable();

            $table->integer('td_sistolik')->nullable();
            $table->integer('td_diastolik')->nullable();
            $table->integer('nadi')->nullable();
            $table->integer('rr')->nullable();
            $table->decimal('suhu', 3, 1)->nullable();
            $table->integer('nyeri_skala')->nullable();
            $table->string('nyeri_lokasi', 150)->nullable();
            $table->string('fisik_head_to_toe', 150)->nullable();
            $table->decimal('tinggi_badan', 5, 2)->nullable();
            $table->decimal('berat_badan', 5, 2)->nullable();
            $table->decimal('imt', 4, 2)->nullable();
            $table->decimal('lingkar_lengan', 5, 2)->nullable();

            $table->integer('skor_nyeri_total')->nullable();
            $table->enum('skor_risiko_jatuh', ['Rendah', 'Sedang', 'Tinggi'])->nullable();
            $table->decimal('skor_braden', 4, 2)->nullable();
            $table->decimal('skor_norton', 4, 2)->nullable();
            $table->integer('skor_glasgow')->nullable();
            $table->string('tanda_tanda_vital_lain', 150)->nullable();

            $table->string('diagnosa1_kode_sdki', 10)->nullable();
            $table->string('diagnosa1_label', 150)->nullable();
            $table->string('diagnosa1_etiologi', 150)->nullable();
            $table->string('diagnosa1_gejala', 150)->nullable();
            $table->string('diagnosa2_kode_sdki', 10)->nullable();
            $table->string('diagnosa2_label', 150)->nullable();
            $table->string('diagnosa2_etiologi', 150)->nullable();
            $table->string('diagnosa2_gejala', 150)->nullable();
            $table->string('diagnosa3_kode_sdki', 10)->nullable();
            $table->string('diagnosa3_label', 150)->nullable();
            $table->string('diagnosa3_etiologi', 150)->nullable();
            $table->string('diagnosa3_gejala', 150)->nullable();

            $table->string('tujuan1_kode_slki', 10)->nullable();
            $table->string('tujuan1_label', 150)->nullable();
            $table->string('tujuan1_kriteria', 150)->nullable();
            $table->date('tujuan1_target_tgl')->nullable();
            $table->string('tujuan2_kode_slki', 10)->nullable();
            $table->string('tujuan2_label', 150)->nullable();
            $table->string('tujuan2_kriteria', 150)->nullable();
            $table->date('tujuan2_target_tgl')->nullable();

            $table->string('intervensi1_kode_siki', 10)->nullable();
            $table->string('intervensi1_label', 150)->nullable();
            $table->string('intervensi1_aktivitas', 150)->nullable();
            $table->string('intervensi1_rasional', 150)->nullable();
            $table->string('intervensi2_kode_siki', 10)->nullable();
            $table->string('intervensi2_label', 150)->nullable();
            $table->string('intervensi2_aktivitas', 150)->nullable();
            $table->string('intervensi2_rasional', 150)->nullable();
            $table->string('intervensi3_kode_siki', 10)->nullable();
            $table->string('intervensi3_label', 150)->nullable();
            $table->string('intervensi3_aktivitas', 150)->nullable();
            $table->string('intervensi3_rasional', 150)->nullable();

            $table->string('evaluasi_hasil', 200)->nullable();
            $table->enum('evaluasi_status', ['Tercapai seluruhnya', 'Tercapai sebagian', 'Belum tercapai', 'Dalam proses'])->nullable();
            $table->dateTime('evaluasi_tgl')->nullable();
            $table->string('evaluator_nip', 20)->nullable();

            $table->enum('status_rekam', ['Aktif', 'Arsip', 'Dihapus'])->default('Aktif');
            $table->string('asal_rujukan', 100)->nullable();
            $table->string('tujuan_rujukan', 100)->nullable();
            $table->string('catatan_khusus', 200)->nullable();

            $table->index('no_rkm_medis', 'asuhan_keperawatan_no_rkm_medis_index');
            $table->index('tgl_pengkajian', 'asuhan_keperawatan_tgl_pengkajian_index');
            $table->index('nip_perawat', 'asuhan_keperawatan_nip_perawat_index');
            $table->index('status_rekam', 'asuhan_keperawatan_status_rekam_index');
        });
        }

    }

    public function down(): void
    {
        Schema::dropIfExists('asuhan_keperawatan');
    }
};
