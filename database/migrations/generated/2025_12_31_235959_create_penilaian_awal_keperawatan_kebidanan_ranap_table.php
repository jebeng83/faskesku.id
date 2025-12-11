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
        if (!Schema::hasTable('penilaian_awal_keperawatan_kebidanan_ranap')) {
            Schema::create('penilaian_awal_keperawatan_kebidanan_ranap', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('informasi', ['Autoanamnesis', 'Alloanamnesis']);
                $table->enum('tiba_diruang_rawat', ['Jalan Tanpa Bantuan', 'Kursi Roda', 'Brankar']);
                $table->enum('cara_masuk', ['Poli', 'IGD', 'VK', 'OK', 'Lain-lain']);
                $table->string('keluhan', 500);
                $table->string('rpk', 100);
                $table->string('psk', 100);
                $table->string('rp', 100);
                $table->string('alergi', 25);
                $table->enum('komplikasi_sebelumnya', ['Tidak', 'HAP', 'HPP', 'PEB/PER/Eklamsi', 'Lain-lain']);
                $table->string('keterangan_komplikasi_sebelumnya', 30);
                $table->string('riwayat_mens_umur', 10);
                $table->string('riwayat_mens_lamanya', 10);
                $table->string('riwayat_mens_banyaknya', 10);
                $table->string('riwayat_mens_siklus', 10);
                $table->enum('riwayat_mens_ket_siklus', ['Teratur', 'Tidak Teratur']);
                $table->enum('riwayat_mens_dirasakan', ['Tidak Ada Masalah', 'Dismenorhea', 'Spotting', 'Menorhagia', 'PMS']);
                $table->enum('riwayat_perkawinan_status', ['Menikah', 'Tidak / Belum Menikah']);
                $table->string('riwayat_perkawinan_ket_status', 5);
                $table->string('riwayat_perkawinan_usia1', 5);
                $table->enum('riwayat_perkawinan_ket_usia1', ['-', 'Masih Menikah', 'Cerai', 'Meninggal']);
                $table->string('riwayat_perkawinan_usia2', 5);
                $table->enum('riwayat_perkawinan_ket_usia2', ['-', 'Masih Menikah', 'Cerai', 'Meninggal']);
                $table->string('riwayat_perkawinan_usia3', 5);
                $table->enum('riwayat_perkawinan_ket_usia3', ['-', 'Masih Menikah', 'Cerai', 'Meninggal']);
                $table->string('riwayat_persalinan_g', 10);
                $table->string('riwayat_persalinan_p', 10);
                $table->string('riwayat_persalinan_a', 10);
                $table->string('riwayat_persalinan_hidup', 10);
                $table->date('riwayat_hamil_hpht');
                $table->string('riwayat_hamil_usiahamil', 10);
                $table->date('riwayat_hamil_tp');
                $table->enum('riwayat_hamil_imunisasi', ['Tidak Pernah', 'T I', 'TT II', 'TT III', 'TT IV']);
                $table->string('riwayat_hamil_anc', 5);
                $table->string('riwayat_hamil_ancke', 5);
                $table->enum('riwayat_hamil_ket_ancke', ['Teratur', 'Tidak Teratur']);
                $table->enum('riwayat_hamil_keluhan_hamil_muda', ['Tidak Ada', 'Mual', 'Muntah', 'Perdarahan', 'Lain–lain']);
                $table->enum('riwayat_hamil_keluhan_hamil_tua', ['Tidak Ada', 'Mual', 'Muntah', 'Perdarahan', 'Lain–lain']);
                $table->enum('riwayat_kb', ['Belum Pernah', 'Suntik', 'Pil', 'AKDR', 'MOW', 'Implan', 'Kondom', 'Kalender', 'MAL', 'Coitus Interuptus']);
                $table->string('riwayat_kb_lamanya', 10);
                $table->enum('riwayat_kb_komplikasi', ['Tidak Ada', 'Ada']);
                $table->string('riwayat_kb_ket_komplikasi', 50);
                $table->string('riwayat_kb_kapaberhenti', 20);
                $table->string('riwayat_kb_alasanberhenti', 50);
                $table->enum('riwayat_genekologi', ['Tidak Ada', 'Infertilitas', 'Infeksi Virus', 'PMS', 'Cervisitis Kronis', 'Endometriosis', 'Mioma', 'Polip Cervix', 'Kanker Kandungan', 'Operasi Kandungan']);
                $table->enum('riwayat_kebiasaan_obat', ['-', 'Obat Obatan', 'Vitamin', 'Jamu Jamuan']);
                $table->string('riwayat_kebiasaan_ket_obat', 100);
                $table->enum('riwayat_kebiasaan_merokok', ['Tidak', 'Ya']);
                $table->string('riwayat_kebiasaan_ket_merokok', 5);
                $table->enum('riwayat_kebiasaan_alkohol', ['Tidak', 'Ya']);
                $table->string('riwayat_kebiasaan_ket_alkohol', 5);
                $table->enum('riwayat_kebiasaan_narkoba', ['Tidak', 'Ya']);
                $table->string('pemeriksaan_kebidanan_mental', 40);
                $table->enum('pemeriksaan_kebidanan_keadaan_umum', ['Baik', 'Sedang', 'Buruk']);
                $table->string('pemeriksaan_kebidanan_gcs', 10);
                $table->string('pemeriksaan_kebidanan_td', 8);
                $table->string('pemeriksaan_kebidanan_nadi', 5);
                $table->string('pemeriksaan_kebidanan_rr', 5);
                $table->string('pemeriksaan_kebidanan_suhu', 5);
                $table->string('pemeriksaan_kebidanan_spo2', 5);
                $table->string('pemeriksaan_kebidanan_bb', 5);
                $table->string('pemeriksaan_kebidanan_tb', 5);
                $table->string('pemeriksaan_kebidanan_lila', 5);
                $table->string('pemeriksaan_kebidanan_tfu', 10);
                $table->string('pemeriksaan_kebidanan_tbj', 10);
                $table->string('pemeriksaan_kebidanan_letak', 10);
                $table->string('pemeriksaan_kebidanan_presentasi', 10);
                $table->string('pemeriksaan_kebidanan_penurunan', 10);
                $table->string('pemeriksaan_kebidanan_his', 10);
                $table->string('pemeriksaan_kebidanan_kekuatan', 10);
                $table->string('pemeriksaan_kebidanan_lamanya', 5);
                $table->string('pemeriksaan_kebidanan_djj', 5);
                $table->enum('pemeriksaan_kebidanan_ket_djj', ['Teratur', 'Tidak Teratur']);
                $table->string('pemeriksaan_kebidanan_portio', 10);
                $table->string('pemeriksaan_kebidanan_pembukaan', 5);
                $table->string('pemeriksaan_kebidanan_ketuban', 10);
                $table->string('pemeriksaan_kebidanan_hodge', 10);
                $table->enum('pemeriksaan_kebidanan_panggul', ['Luas', 'Sedang', 'Sempit', 'Tidak Dilakukan Pemeriksaan']);
                $table->enum('pemeriksaan_kebidanan_inspekulo', ['Dilakukan', 'Tidak']);
                $table->string('pemeriksaan_kebidanan_ket_inspekulo', 50);
                $table->enum('pemeriksaan_kebidanan_lakmus', ['Dilakukan', 'Tidak']);
                $table->string('pemeriksaan_kebidanan_ket_lakmus', 50);
                $table->enum('pemeriksaan_kebidanan_ctg', ['Dilakukan', 'Tidak']);
                $table->string('pemeriksaan_kebidanan_ket_ctg', 50);
                $table->enum('pemeriksaan_umum_kepala', ['Normocephale', 'Hydrocephalus', 'Lain-lain']);
                $table->enum('pemeriksaan_umum_muka', ['Normal', 'Pucat', 'Oedem', 'Lain-lain']);
                $table->enum('pemeriksaan_umum_mata', ['Conjungtiva Merah Muda', 'Conjungtiva Pucat', 'Sklera Ikterik', 'Pandangan Kabur', 'Lain-lain']);
                $table->enum('pemeriksaan_umum_hidung', ['Normal', 'Sekret', 'Polip', 'Lain-lain']);
                $table->enum('pemeriksaan_umum_telinga', ['Bersih', 'Serumen', 'Polip', 'Lain-lain']);
                $table->enum('pemeriksaan_umum_mulut', ['Bersih', 'Kotor', 'Lain-lain']);
                $table->enum('pemeriksaan_umum_leher', ['Normal', 'Pembesaran KGB', 'Pembesaran Kelenjar Tiroid', 'Lain-lain']);
                $table->enum('pemeriksaan_umum_dada', ['Mamae Simetris', 'Mamae Asimetris', 'Aerola Hiperpigmentasi', 'Kolustrum (+)', 'Tumor', 'Puting Susu Menonjol']);
                $table->enum('pemeriksaan_umum_perut', ['Luka Bekas Operasi', 'Nyeri Tekan (Ya)', 'Nyeri Tekan (Tidak)', 'Lain-lain']);
                $table->enum('pemeriksaan_umum_genitalia', ['Bersih', 'Kotor', 'Varises', 'Oedem', 'Hematoma', 'Hemoroid', 'Lain-lain']);
                $table->enum('pemeriksaan_umum_ekstrimitas', ['Normal', 'Oedem', 'Refleks Patella Ada', 'Lain-lain']);
                $table->enum('pengkajian_fungsi_kemampuan_aktifitas', ['Mandiri', 'Bantuan minimal', 'Bantuan Sebagian', 'Ketergantungan Total']);
                $table->enum('pengkajian_fungsi_berjalan', ['TAK', 'Penurunan Kekuatan/ROM', 'Paralisis', 'Sering Jatuh', 'Deformitas', 'Hilang keseimbangan', 'Riwayat Patah Tulang', 'Lain-lain']);
                $table->string('pengkajian_fungsi_ket_berjalan', 50);
                $table->enum('pengkajian_fungsi_aktivitas', ['Tirah Baring', 'Duduk', 'Berjalan']);
                $table->enum('pengkajian_fungsi_ambulasi', ['Walker', 'Tongkat', 'Kursi Roda', 'Tidak Menggunakan']);
                $table->enum('pengkajian_fungsi_ekstrimitas_atas', ['TAK', 'Lemah', 'Oedema', 'Tidak Simetris', 'Lain-lain']);
                $table->string('pengkajian_fungsi_ket_ekstrimitas_atas', 50);
                $table->enum('pengkajian_fungsi_ekstrimitas_bawah', ['TAK', 'Varises', 'Oedema', 'Tidak Simetris', 'Lain-lain']);
                $table->string('pengkajian_fungsi_ket_ekstrimitas_bawah', 50);
                $table->enum('pengkajian_fungsi_kemampuan_menggenggam', ['Tidak Ada Kesulitan', 'Terakhir', 'Lain-lain']);
                $table->string('pengkajian_fungsi_ket_kemampuan_menggenggam', 50);
                $table->enum('pengkajian_fungsi_koordinasi', ['Tidak Ada Kesulitan', 'Ada Masalah']);
                $table->string('pengkajian_fungsi_ket_koordinasi', 50);
                $table->enum('pengkajian_fungsi_gangguan_fungsi', ['Tidak (Tidak Perlu Co DPJP)', 'Ya (Co DPJP)']);
                $table->enum('riwayat_psiko_kondisipsiko', ['Tidak Ada Masalah', 'Marah', 'Takut', 'Depresi', 'Cepat Lelah', 'Cemas', 'Gelisah', 'Sulit Tidur', 'Lain-lain']);
                $table->enum('riwayat_psiko_adakah_prilaku', ['Tidak Ada Masalah', 'Perilaku Kekerasan', 'Gangguan Efek', 'Gangguan Memori', 'Halusinasi', 'Kecenderungan Percobaan Bunuh Diri', 'Lain-lain']);
                $table->string('riwayat_psiko_ket_adakah_prilaku', 50);
                $table->enum('riwayat_psiko_gangguan_jiwa', ['Tidak', 'Ya']);
                $table->enum('riwayat_psiko_hubungan_pasien', ['Harmonis', 'Kurang Harmonis', 'Tidak Harmonis', 'Konflik Besar']);
                $table->enum('riwayat_psiko_tinggal_dengan', ['Sendiri', 'Orang Tua', 'Suami/Istri', 'Keluarga', 'Lain-lain']);
                $table->string('riwayat_psiko_ket_tinggal_dengan', 50);
                $table->enum('riwayat_psiko_budaya', ['Tidak Ada', 'Ada']);
                $table->string('riwayat_psiko_ket_budaya', 50);
                $table->enum('riwayat_psiko_pend_pj', ['-', 'TS', 'TK', 'SD', 'SMP', 'SMA', 'SLTA/SEDERAJAT', 'D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3']);
                $table->enum('riwayat_psiko_edukasi_pada', ['Pasien', 'Keluarga']);
                $table->string('riwayat_psiko_ket_edukasi_pada', 50);
                $table->enum('penilaian_nyeri', ['Tidak Ada Nyeri', 'Nyeri Akut', 'Nyeri Kronis']);
                $table->enum('penilaian_nyeri_penyebab', ['Proses Penyakit', 'Benturan', 'Lain-lain']);
                $table->string('penilaian_nyeri_ket_penyebab', 50);
                $table->enum('penilaian_nyeri_kualitas', ['Seperti Tertusuk', 'Berdenyut', 'Teriris', 'Tertindih', 'Tertiban', 'Lain-lain']);
                $table->string('penilaian_nyeri_ket_kualitas', 50);
                $table->string('penilaian_nyeri_lokasi', 50);
                $table->enum('penilaian_nyeri_menyebar', ['Tidak', 'Ya']);
                $table->enum('penilaian_nyeri_skala', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
                $table->string('penilaian_nyeri_waktu', 5);
                $table->enum('penilaian_nyeri_hilang', ['Istirahat', 'Medengar Musik', 'Minum Obat']);
                $table->string('penilaian_nyeri_ket_hilang', 50);
                $table->enum('penilaian_nyeri_diberitahukan_dokter', ['Tidak', 'Ya']);
                $table->string('penilaian_nyeri_jam_diberitahukan_dokter', 10);
                $table->enum('penilaian_jatuh_skala1', ['Tidak', 'Ya']);
                $table->tinyInteger('penilaian_jatuh_nilai1');
                $table->enum('penilaian_jatuh_skala2', ['Tidak', 'Ya']);
                $table->tinyInteger('penilaian_jatuh_nilai2');
                $table->enum('penilaian_jatuh_skala3', ['Tidak Ada/Kursi Roda/Perawat/Tirah Baring', 'Tongkat/Alat Penopang', 'Berpegangan Pada Perabot']);
                $table->tinyInteger('penilaian_jatuh_nilai3');
                $table->enum('penilaian_jatuh_skala4', ['Tidak', 'Ya']);
                $table->tinyInteger('penilaian_jatuh_nilai4');
                $table->enum('penilaian_jatuh_skala5', ['Normal/Tirah Baring/Imobilisasi', 'Lemah', 'Terganggu']);
                $table->tinyInteger('penilaian_jatuh_nilai5');
                $table->enum('penilaian_jatuh_skala6', ['Sadar Akan Kemampuan Diri Sendiri', 'Sering Lupa Akan Keterbatasan Yang Dimiliki']);
                $table->tinyInteger('penilaian_jatuh_nilai6');
                $table->double('penilaian_jatuh_totalnilai');
                $table->enum('skrining_gizi1', ['Tidak ada penurunan berat badan', 'Tidak yakin/ tidak tahu/ terasa baju lebih longgar', 'Ya 1-5 kg', 'Ya 6-10 kg', 'Ya 11-15 kg', 'Ya > 15 kg']);
                $table->integer('nilai_gizi1');
                $table->enum('skrining_gizi2', ['Tidak', 'Ya']);
                $table->integer('nilai_gizi2');
                $table->double('nilai_total_gizi');
                $table->enum('skrining_gizi_diagnosa_khusus', ['Tidak', 'Ya']);
                $table->string('skrining_gizi_ket_diagnosa_khusus', 50);
                $table->enum('skrining_gizi_diketahui_dietisen', ['Tidak', 'Ya']);
                $table->string('skrining_gizi_jam_diketahui_dietisen', 10);
                $table->string('masalah', 1000);
                $table->string('rencana', 1000);
                $table->string('nip1', 20)->index('nip1');
                $table->string('nip2', 20)->index('nip2');
                $table->string('kd_dokter', 20)->index('kd_dokter');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_awal_keperawatan_kebidanan_ranap');
    }
};
