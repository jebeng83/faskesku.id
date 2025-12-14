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
        if (! Schema::hasTable('penilaian_awal_keperawatan_ranap_bayi')) {
            Schema::create('penilaian_awal_keperawatan_ranap_bayi', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('informasi', ['Autoanamnesis', 'Alloanamnesis']);
                $table->string('ket_informasi', 30);
                $table->enum('tiba_diruang_rawat', ['Jalan Tanpa Bantuan', 'Kursi Roda', 'Brankar']);
                $table->string('rps', 300);
                $table->string('rpd', 150);
                $table->string('rpk', 150);
                $table->string('rpo', 150);
                $table->string('alergi', 40);
                $table->string('tumbuh_kembang_tengkurap', 15)->nullable();
                $table->string('tumbuh_kembang_duduk', 15)->nullable();
                $table->string('tumbuh_kembang_berdiri', 15)->nullable();
                $table->string('tumbuh_kembang_gigi_pertama', 15)->nullable();
                $table->string('tumbuh_kembang_berjalan', 15)->nullable();
                $table->string('tumbuh_kembang_bicara', 15)->nullable();
                $table->string('tumbuh_kembang_membaca', 15)->nullable();
                $table->string('tumbuh_kembang_menulis', 15)->nullable();
                $table->string('tumbuh_kembang_gangguan_emosi', 30)->nullable();
                $table->string('persalinan_anakke', 2);
                $table->string('persalinan_darisaudara', 2);
                $table->enum('persalinan_kelahiran', ['Spontan', 'Sectio Caesaria', 'Lain-Lain']);
                $table->string('persalinan_kelahiran_keterangan', 30);
                $table->enum('persalinan_umur_kelahiran', ['Cukup Bulan', 'Kurang Bulan']);
                $table->enum('persalinan_kelainan_bawaan', ['Tidak Ada', 'Ada']);
                $table->string('persalinan_kelainan_bawaan_keterangan', 30);
                $table->string('persalinan_bb_lahir', 5);
                $table->string('persalinan_pb_lahir', 5);
                $table->string('persalinan_lainnya', 100);
                $table->enum('fisik_kesadaran', ['Compos Mentis', 'Apatis', 'Somnolen', 'Sopor', 'Soporcoma', 'Coma']);
                $table->string('fisik_gcs', 6);
                $table->string('fisik_td', 8);
                $table->string('fisik_rr', 5);
                $table->string('fisik_suhu', 5);
                $table->string('fisik_nadi', 5);
                $table->string('fisik_bb', 5);
                $table->string('fisik_tb', 5);
                $table->string('fisik_lp', 5);
                $table->string('fisik_lk', 5);
                $table->string('fisik_ld', 5);
                $table->enum('saraf_pusat_kepala', ['TAK', 'Hydrocephalus', 'Hematoma', 'Lain-lain']);
                $table->string('saraf_pusat_kepala_keterangan', 30);
                $table->enum('saraf_pusat_wajah', ['TAK', 'Asimetris', 'Kelainan Kongenital']);
                $table->string('saraf_pusat_wajah_keterangan', 30);
                $table->enum('saraf_pusat_leher', ['TAK', 'Kaku Kuduk', 'Pembesaran Thyroid', 'Pembesaran KGB']);
                $table->enum('saraf_pusat_kejang', ['TAK', 'Kuat', 'Ada']);
                $table->string('saraf_pusat_kejang_keterangan', 30);
                $table->enum('saraf_pusat_sensorik', ['TAK', 'Sakit Nyeri', 'Rasa Kebas']);
                $table->enum('kardiovaskuler_pulsasi', ['Kuat', 'Lemah', 'Lain-lain']);
                $table->enum('kardiovaskuler_sirkulasi', ['Akral Hangat', 'Akral Dingin', 'Edema']);
                $table->string('kardiovaskuler_sirkulasi_keterangan', 30);
                $table->enum('kardiovaskuler_denyut_nadi', ['Teratur', 'Tidak Teratur']);
                $table->enum('respirasi_retraksi', ['Tidak Ada', 'Ringan', 'Berat']);
                $table->enum('respirasi_pola_nafas', ['Normal', 'Bradipnea', 'Tachipnea']);
                $table->enum('respirasi_suara_nafas', ['Vesikuler', 'Wheezing', 'Rhonki']);
                $table->enum('respirasi_batuk', ['Tidak', 'Ya : Produktif', 'Ya : Non Produktif']);
                $table->enum('respirasi_volume', ['Normal', 'Hiperventilasi', 'Hipoventilasi']);
                $table->enum('respirasi_jenis_pernapasan', ['Pernafasan Dada', 'Alat Bantu Pernafasaan']);
                $table->string('respirasi_jenis_pernapasan_keterangan', 30);
                $table->enum('respirasi_irama', ['Teratur', 'Tidak Teratur']);
                $table->enum('gastro_mulut', ['TAK', 'Stomatitis', 'Mukosa Kering', 'Bibir Pucat', 'Lain-lain']);
                $table->string('gastro_mulut_keterangan', 30);
                $table->enum('gastro_tenggorakan', ['TAK', 'Gangguan Menelan', 'Sakit Menelan', 'Lain-lain']);
                $table->string('gastro_tenggorakan_keterangan', 30);
                $table->enum('gastro_lidah', ['TAK', 'Kotor', 'Gerak Asimetris', 'Lain-lain']);
                $table->string('gastro_lidah_keterangan', 30);
                $table->enum('gastro_abdomen', ['Supel', 'Asictes', 'Tegang', 'Nyeri Tekan/Lepas', 'Lain-lain']);
                $table->string('gastro_abdomen_keterangan', 30);
                $table->enum('gastro_gigi', ['TAK', 'Karies', 'Goyang', 'Lain-lain']);
                $table->string('gastro_gigi_keterangan', 30);
                $table->enum('gastro_usus', ['TAK', 'Tidak Ada Bising Usus', 'Hiperistaltik']);
                $table->enum('gastro_anus', ['TAK', 'Atresia Ani']);
                $table->enum('neurologi_sensorik', ['TAK', 'Sakit Nyeri', 'Rasa Kebas', 'Lain-lain']);
                $table->enum('neurologi_pengilihatan', ['TAK', 'Ada Kelainan']);
                $table->string('neurologi_pengilihatan_keterangan', 30);
                $table->enum('neurologi_alat_bantu_penglihatan', ['Tidak', 'Kacamata', 'Lensa Kontak']);
                $table->enum('neurologi_motorik', ['TAK', 'Hemiparese', 'Tetraparese', 'Tremor', 'Lain-lain']);
                $table->enum('neurologi_pendengaran', ['TAK', 'Berdengung', 'Nyeri', 'Tuli', 'Keluar Cairan', 'Lain-lain']);
                $table->enum('neurologi_bicara', ['Jelas', 'Tidak Jelas']);
                $table->string('neurologi_bicara_keterangan', 30);
                $table->enum('neurologi_otot', ['Kuat', 'Lemah']);
                $table->enum('inte_kulit', ['Normal', 'Rash/Kemerahan', 'Luka', 'Memar', 'Ptekie', 'Bula']);
                $table->enum('inte_warna_kulit', ['Normal', 'Pucat', 'Sianosis', 'Lain-lain']);
                $table->enum('inte_tugor', ['Baik', 'Sedang', 'Buruk']);
                $table->enum('inte_decubi', ['Tidak Ada', 'Usia > 65 tahun', 'Obesitas', 'Imobilisasi', 'Paraplegi/Vegetative State', 'Dirawat Di HCU', 'Penyakit Kronis (DM, CHF, CKD)', 'Inkontinentia Uri/Alvi']);
                $table->enum('musku_odema', ['Tidak Ada', 'Ada']);
                $table->string('musku_odema_keterangan', 30);
                $table->enum('musku_pegerakansendi', ['Bebas', 'Terbatas']);
                $table->enum('musku_otot', ['Baik', 'Lemah', 'Tremor']);
                $table->enum('musku_fraktur', ['Tidak Ada', 'Ada']);
                $table->string('musku_fraktur_keterangan', 30);
                $table->enum('musku_nyerisendi', ['Tidak Ada', 'Ada']);
                $table->string('musku_nyerisendi_keterangan', 30);
                $table->string('eliminasi_bab_frekuensi', 3);
                $table->string('eliminasi_bab_frekuensi_per', 10);
                $table->string('eliminasi_bab_konsistesi', 20);
                $table->string('eliminasi_bab_warna', 20);
                $table->string('eliminasi_bak_frekuensi', 3);
                $table->string('eliminasi_bak_frekuensi_per', 10);
                $table->string('eliminasi_bak_warna', 20);
                $table->string('eliminasi_bak_lainlain', 20);
                $table->enum('psiko_kondisi', ['Tidak Ada Masalah', 'Marah', 'Takut', 'Depresi', 'Cepat Lelah', 'Cemas', 'Gelisah', 'Sulit Tidur', 'Lain-lain']);
                $table->enum('psiko_perilaku', ['Tidak Ada Masalah', 'Perilaku Kekerasan', 'Gangguan Efek', 'Gangguan Memori', 'Halusinasi', 'Kecenderungan Percobaan Bunuh Diri', 'Lain-lain']);
                $table->string('psiko_perilaku_keterangan', 30);
                $table->enum('psiko_gangguan_jiwa', ['Tidak', 'Ya']);
                $table->enum('psiko_hubungan_pasien', ['Harmonis', 'Kurang Harmonis', 'Tidak Harmonis', 'Konflik Besar']);
                $table->enum('psiko_tinggal_dengan', ['Sendiri', 'Orang Tua', 'Panti Asuhan', 'Keluarga', 'Lain-lain']);
                $table->string('psiko_tinggal_dengan_keterangan', 30);
                $table->string('psiko_pekerjaan_pj', 30);
                $table->enum('psiko_nilai_kepercayaan', ['Tidak Ada', 'Ada']);
                $table->string('psiko_nilai_kepercayaan_keterangan', 30);
                $table->enum('psiko_pendidikan_pj', ['-', 'TS', 'TK', 'SD', 'SMP', 'SMA', 'SLTA/SEDERAJAT', 'D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3']);
                $table->enum('psiko_edukasi', ['Pasien', 'Keluarga', 'Lainnya']);
                $table->string('psiko_edukasi_keterangan', 30);
                $table->string('edukasi_bahasa', 30);
                $table->enum('edukasi_baca_tulis', ['Baik', 'Kurang', 'Tidak Bisa']);
                $table->enum('edukasi_penerjemah', ['Tidak', 'Ya']);
                $table->string('edukasi_penerjemah_keterangan', 30);
                $table->enum('edukasi_terdapat_hambatan', ['Tidak', 'Ya']);
                $table->enum('edukasi_hambatan_belajar', ['-', 'Gangguan Pendengaran', 'Gangguan Penglihatan', 'Gangguan Kognitif', 'Gangguan Fisik', 'Gangguan Emosi', 'Keterbatasan Bahasa', 'Keterbatasan Budaya', 'Keterbatasan Spiritual', 'Agama', 'Lainnya']);
                $table->string('edukasi_hambatan_belajar_keterangan', 30);
                $table->enum('edukasi_hambatan_bicara', ['Normal', 'Gangguan Bicara']);
                $table->enum('edukasi_bahasa_isyarat', ['Tidak', 'Ya']);
                $table->enum('edukasi_cara_belajar', ['Audio', 'Lisan', 'Visual', 'Demonstrasi', 'Tulisan']);
                $table->enum('edukasi_menerima_informasi', ['Ya', 'Tidak']);
                $table->string('edukasi_menerima_informasi_keterangan', 30);
                $table->enum('edukasi_nutrisi', ['Ya', 'Tidak']);
                $table->enum('edukasi_penyakit', ['Ya', 'Tidak']);
                $table->enum('edukasi_pengobatan', ['Ya', 'Tidak']);
                $table->enum('edukasi_perawatan', ['Ya', 'Tidak']);
                $table->enum('skrining_gizi1', ['Tidak', 'Ya']);
                $table->string('nilai_gizi1', 1);
                $table->enum('skrining_gizi2', ['Tidak', 'Ya']);
                $table->string('nilai_gizi2', 1);
                $table->enum('skrining_gizi3', ['Tidak', 'Ya']);
                $table->string('nilai_gizi3', 1);
                $table->enum('skrining_gizi4', ['Tidak', 'Ya']);
                $table->string('nilai_gizi4', 1);
                $table->string('total_nilai', 2);
                $table->string('keterangan_skrining_gizi', 50);
                $table->enum('penilaian_humptydumpty_skala1', ['0 - 3 Tahun', '3 - 7 Tahun', '7 - 13 Tahun', '> 13 Tahun'])->nullable();
                $table->tinyInteger('penilaian_humptydumpty_nilai1')->nullable();
                $table->enum('penilaian_humptydumpty_skala2', ['Laki-laki', 'Perempuan'])->nullable();
                $table->tinyInteger('penilaian_humptydumpty_nilai2')->nullable();
                $table->enum('penilaian_humptydumpty_skala3', ['Kelainan Neurologi', 'Perubahan Dalam Oksigen(Masalah Saluran Nafas, Dehidrasi, Anemia, Anoreksia / Sakit Kepala, Dll)', 'Kelainan Psikis / Perilaku', 'Diagnosa Lain'])->nullable();
                $table->tinyInteger('penilaian_humptydumpty_nilai3')->nullable();
                $table->enum('penilaian_humptydumpty_skala4', ['Tidak Sadar Terhadap Keterbatasan', 'Lupa Keterbatasan', 'Mengetahui Kemampuan Diri'])->nullable();
                $table->tinyInteger('penilaian_humptydumpty_nilai4')->nullable();
                $table->enum('penilaian_humptydumpty_skala5', ['Riwayat Jatuh Dari Tempat Tidur Saat Bayi/Anak', 'Pasien Menggunakan Alat Bantu/Box/Mebel', 'Pasien Berada Di Tempat Tidur', 'Di Luar Ruang Rawat'])->nullable();
                $table->tinyInteger('penilaian_humptydumpty_nilai5')->nullable();
                $table->enum('penilaian_humptydumpty_skala6', ['Dalam 24 Jam', 'Dalam 48 Jam', '> 48 Jam'])->nullable();
                $table->tinyInteger('penilaian_humptydumpty_nilai6')->nullable();
                $table->enum('penilaian_humptydumpty_skala7', ['Bermacam-macam Obat Yang Digunakan : Obat Sedative (Kecuali Pasien ICU Yang Menggunakan sedasi dan paralisis), Hipnotik, Barbiturat, Fenoti-Azin, Antidepresan, Laksans/Diuretika,Narkotik', 'Salah Satu Dari Pengobatan Di Atas', 'Pengobatan Lain'])->nullable();
                $table->tinyInteger('penilaian_humptydumpty_nilai7')->nullable();
                $table->tinyInteger('penilaian_humptydumpty_totalnilai')->nullable();
                $table->string('hasil_skrining_penilaian_humptydumpty', 50)->nullable();
                $table->enum('nyeri_wajah', ['Tersenyum/tidak ada ekspresi khusus', 'Terkadang meringis/menarik diri', 'Sering menggetarkan dagu dan mengatupkan rahang']);
                $table->string('nyeri_nilai_wajah', 1);
                $table->enum('nyeri_kaki', ['Gerakan normal/relaksasi', 'Tidak tenang/tegang', 'Kaki dibuat menendang/menarik']);
                $table->string('nyeri_nilai_kaki', 1);
                $table->enum('nyeri_aktifitas', ['Tidur posisi normal, mudah bergerak', 'Gerakan menggeliat/berguling, kaku', 'Melengkungkan punggung/kaku menghentak']);
                $table->string('nyeri_nilai_aktifitas', 1);
                $table->enum('nyeri_menangis', ['Tidak menangis (mudah bergerak)', 'Mengerang/merengek', 'Menangis terus menerus, terisak, menjerit']);
                $table->string('nyeri_nilai_menangis', 1);
                $table->enum('nyeri_bersuara', ['Bersuara normal/tenang', 'Tenang bila dipeluk, digendong/diajak bicara', 'Sulit untuk menenangkan']);
                $table->string('nyeri_nilai_bersuara', 1);
                $table->string('nyeri_nilai_total', 2);
                $table->enum('nyeri_kondisi', ['Tidak Ada Nyeri', 'Nyeri Akut', 'Nyeri Kronis']);
                $table->string('nyeri_lokasi', 50);
                $table->string('nyeri_durasi', 25);
                $table->string('nyeri_frekuensi', 25);
                $table->enum('nyeri_hilang', ['Minum Obat', 'Istirahat', 'Mendengar Music', 'Berubah Posisi/Tidur', 'Lain-lain']);
                $table->string('nyeri_hilang_keterangan', 40);
                $table->enum('nyeri_diberitahukan_pada_dokter', ['Tidak', 'Ya']);
                $table->string('nyeri_diberitahukan_pada_dokter_keterangan', 15);
                $table->enum('informasi_perencanaan_pulang', ['Ya', 'Tidak']);
                $table->string('lama_ratarata', 3);
                $table->date('perencanaan_pulang');
                $table->string('kondisi_klinis_pulang', 100);
                $table->string('perawatan_lanjutan_dirumah', 300);
                $table->enum('cara_transportasi_pulang', ['Mandiri', 'Dibantu Sebagian', 'Dibantu Keseluruhan', 'Menggunakan Rostul', 'Menggunakan Brankar', 'Berjalan']);
                $table->enum('transportasi_digunakan', ['Kendaraan Pribadi', 'Mobil Ambulance', 'Kendaraan Umum']);
                $table->string('rencana', 200)->nullable();
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
        Schema::dropIfExists('penilaian_awal_keperawatan_ranap_bayi');
    }
};
