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
        if (!Schema::hasTable('penilaian_awal_keperawatan_ralan_psikiatri')) {
            Schema::create('penilaian_awal_keperawatan_ralan_psikiatri', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('informasi', ['Autoanamnesis', 'Alloanamnesis']);
                $table->string('keluhan_utama', 500)->default('');
                $table->string('rkd_sakit_sejak', 8);
                $table->string('rkd_keluhan', 500);
                $table->enum('rkd_berobat', ['Tidak', 'Ya, Alternatif', 'Ya, RS', 'Ya, Puskesmas']);
                $table->enum('rkd_hasil_pengobatan', ['Berhasil', 'Tidak Berhasil']);
                $table->enum('fp_putus_obat', ['Tidak', 'Ya']);
                $table->string('ket_putus_obat', 50);
                $table->enum('fp_ekonomi', ['Tidak', 'Ya']);
                $table->string('ket_masalah_ekonomi', 50);
                $table->enum('fp_masalah_fisik', ['Tidak', 'Ya']);
                $table->string('ket_masalah_fisik', 50);
                $table->enum('fp_masalah_psikososial', ['Tidak', 'Ya']);
                $table->string('ket_masalah_psikososial', 50);
                $table->enum('rh_keluarga', ['Tidak', 'Ya']);
                $table->string('ket_rh_keluarga', 50);
                $table->enum('resiko_bunuh_diri', ['Tidak', 'Ya']);
                $table->enum('rbd_ide', ['Tidak', 'Ya']);
                $table->string('ket_rbd_ide', 50);
                $table->enum('rbd_rencana', ['Tidak', 'Ya']);
                $table->string('ket_rbd_rencana', 50);
                $table->enum('rbd_alat', ['Tidak', 'Ya']);
                $table->string('ket_rbd_alat', 50);
                $table->enum('rbd_percobaan', ['Tidak', 'Ya']);
                $table->string('ket_rbd_percobaan', 15);
                $table->enum('rbd_keinginan', ['Tidak', 'Ya']);
                $table->string('ket_rbd_keinginan', 100);
                $table->enum('rpo_penggunaan', ['Tidak', 'Ya']);
                $table->string('ket_rpo_penggunaan', 20);
                $table->enum('rpo_efek_samping', ['Tidak', 'Ya']);
                $table->string('ket_rpo_efek_samping', 20);
                $table->enum('rpo_napza', ['Tidak', 'Ya']);
                $table->string('ket_rpo_napza', 25);
                $table->string('ket_lama_pemakaian', 8);
                $table->string('ket_cara_pemakaian', 15);
                $table->string('ket_latar_belakang_pemakaian', 60);
                $table->enum('rpo_penggunaan_obat_lainnya', ['Tidak', 'Ya']);
                $table->string('ket_penggunaan_obat_lainnya', 20);
                $table->string('ket_alasan_penggunaan', 65);
                $table->enum('rpo_alergi_obat', ['Tidak', 'Ya']);
                $table->string('ket_alergi_obat', 25);
                $table->enum('rpo_merokok', ['Tidak', 'Ya']);
                $table->string('ket_merokok', 25);
                $table->enum('rpo_minum_kopi', ['Tidak', 'Ya']);
                $table->string('ket_minum_kopi', 25);
                $table->string('td', 8)->default('');
                $table->string('nadi', 5)->default('');
                $table->string('gcs', 5);
                $table->string('rr', 5);
                $table->string('suhu', 5)->default('');
                $table->enum('pf_keluhan_fisik', ['Tidak', 'Ya']);
                $table->string('ket_keluhan_fisik', 100);
                $table->enum('skala_nyeri', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
                $table->string('durasi', 25);
                $table->enum('nyeri', ['Tidak Ada Nyeri', 'Nyeri Akut', 'Nyeri Kronis']);
                $table->enum('provokes', ['Proses Penyakit', 'Benturan', 'Lain-lain']);
                $table->string('ket_provokes', 40);
                $table->enum('quality', ['Seperti Tertusuk', 'Berdenyut', 'Teriris', 'Tertindih', 'Tertiban', 'Lain-lain']);
                $table->string('ket_quality', 50);
                $table->string('lokasi', 50);
                $table->enum('menyebar', ['Tidak', 'Ya']);
                $table->enum('pada_dokter', ['Tidak', 'Ya']);
                $table->string('ket_dokter', 15);
                $table->enum('nyeri_hilang', ['Istirahat', 'Medengar Musik', 'Minum Obat']);
                $table->string('ket_nyeri', 40);
                $table->string('bb', 5)->default('');
                $table->string('tb', 5)->default('');
                $table->string('bmi', 5);
                $table->enum('lapor_status_nutrisi', ['Ya', 'Tidak']);
                $table->string('ket_lapor_status_nutrisi', 15);
                $table->enum('sg1', ['Tidak', 'Tidak Yakin', 'Ya, 1-5 Kg', 'Ya, 6-10 Kg', 'Ya, 11-15 Kg', 'Ya, >15 Kg']);
                $table->enum('nilai1', ['0', '1', '2', '3', '4']);
                $table->enum('sg2', ['Ya', 'Tidak']);
                $table->enum('nilai2', ['0', '1']);
                $table->tinyInteger('total_hasil');
                $table->enum('resikojatuh', ['Ya', 'Tidak']);
                $table->enum('bjm', ['Ya', 'Tidak']);
                $table->enum('msa', ['Ya', 'Tidak']);
                $table->enum('hasil', ['Tidak beresiko (tidak ditemukan a dan b)', 'Resiko rendah (ditemukan a/b)', 'Resiko tinggi (ditemukan a dan b)']);
                $table->enum('lapor', ['Ya', 'Tidak']);
                $table->string('ket_lapor', 15);
                $table->enum('adl_mandi', ['Mandiri', 'Bantuan Minimal', 'Bantuan Total']);
                $table->enum('adl_berpakaian', ['Mandiri', 'Bantuan Minimal', 'Bantuan Total']);
                $table->enum('adl_makan', ['Mandiri', 'Bantuan Minimal', 'Bantuan Total']);
                $table->enum('adl_bak', ['Mandiri', 'Bantuan Minimal', 'Bantuan Total']);
                $table->enum('adl_bab', ['Mandiri', 'Bantuan Minimal', 'Bantuan Total']);
                $table->enum('adl_hobi', ['Ya', 'Tidak']);
                $table->string('ket_adl_hobi', 50);
                $table->enum('adl_sosialisasi', ['Ya', 'Tidak']);
                $table->string('ket_adl_sosialisasi', 50);
                $table->enum('adl_kegiatan', ['Ya', 'Tidak']);
                $table->string('ket_adl_kegiatan', 50);
                $table->enum('sk_penampilan', ['Bersih', 'Rapi', 'Tidak Rapi', 'Kotor', 'Tidak Seperti Biasanya', 'Pakaian Tidak Sesuai']);
                $table->enum('sk_alam_perasaan', ['Sesuai', 'Marah', 'Putus Asa', 'Tertekan', 'Sedih', 'Labil', 'Malu', 'Khawatir', 'Gembira Berlebihan', 'Merasa Tidak Mampu', 'Ketakutan', 'Tidak Berguna']);
                $table->enum('sk_pembicaraan', ['Sesuai', 'Cepat', 'Lambat', 'Membisu', 'Mendominasi', 'Mengancam', 'Inkoheren', 'Apatis', 'Keras', 'Gagap', 'Tidak Mampu Memulai Pembicaraan']);
                $table->enum('sk_afek', ['Sesuai', 'Datar', 'Tumpul', 'Labil', 'Tidak Sesuai']);
                $table->enum('sk_aktifitas_motorik', ['Normal', 'Tegang', 'Gelisah', 'Lesuh', 'Grimasem', 'TIK', 'Tremor', 'Agitasi', 'Konfulsif', 'Melamun', 'Sulit Diarahkan']);
                $table->enum('sk_gangguan_ringan', ['Gangguan Ringan', 'Gangguan Bermakna']);
                $table->enum('sk_proses_pikir', ['Sesuai', 'Sirkumsial', 'Kehilangan Asosiasi', 'Flight Of Ideas', 'Bloking', 'Pengulangan Pembicaraan', 'Tangensial']);
                $table->enum('sk_orientasi', ['Tidak', 'Ya']);
                $table->enum('sk_tingkat_kesadaran_orientasi', ['-', 'Bingung', 'Sedasi', 'Waktu', 'Stupor', 'Tempat', 'Orang']);
                $table->enum('sk_memori', ['Ganguan Daya Ingat Jangka Pendek', 'Ganguan Daya Ingat Jangka Panjang', 'Ganguan Daya Ingat Saat Ini', 'Konfabulasi']);
                $table->enum('sk_interaksi', ['Kooperatif', 'Tidak Kooperatif', 'Bermusuhan', 'Mudah Tersinggung', 'Curiga', 'Defensif', 'Kontak Mata Kurang']);
                $table->enum('sk_konsentrasi', ['Konsentrasi Baik', 'Mudah Beralih', 'Tidak Mampu Berkonsentrasi', 'Tidak Mampu Berhitung Sederhana']);
                $table->enum('sk_persepsi', ['Halusinasi', 'Pendengaran', 'Penghidung', 'Penglihatan', 'Pengecapan', 'Perabaan']);
                $table->string('ket_sk_persepsi', 70)->default('');
                $table->enum('sk_isi_pikir', ['Sesuai', 'Obsesi', 'Fobia', 'Hipokondria', 'Depersonalisasi', 'Pikiran Magis', 'Ide Yang Terkait', 'Waham']);
                $table->enum('sk_waham', ['Kebesaran', 'Curiga', 'Agama', 'Nihilistik']);
                $table->string('ket_sk_waham', 100)->default('');
                $table->enum('sk_daya_tilik_diri', ['Mengingkari Penyakit Yang Diderita', 'Menyalahkan Hal-hal Diluar Dirinya']);
                $table->string('ket_sk_daya_tilik_diri', 100)->default('');
                $table->enum('kk_pembelajaran', ['Tidak', 'Ya']);
                $table->enum('ket_kk_pembelajaran', ['-', 'Pendengaran', 'Penglihatan', 'Kognitif', 'Fisik', 'Budaya', 'Emosi', 'Bahasa', 'Lainnya']);
                $table->string('ket_kk_pembelajaran_lainnya', 50)->default('');
                $table->enum('kk_Penerjamah', ['Tidak', 'Ya']);
                $table->string('ket_kk_penerjamah_Lainnya', 50);
                $table->enum('kk_bahasa_isyarat', ['Tidak', 'Ya']);
                $table->enum('kk_kebutuhan_edukasi', ['Diagnosa Dan Manajemen Penyakit', 'Obat-obatan/Terapi', 'Diet Dan Nutrisi', 'Tindakan Keperawatan', 'Rehabilitasi', 'Manajemen Nyeri', 'Lain-lain']);
                $table->string('ket_kk_kebutuhan_edukasi', 50)->default('');
                $table->string('rencana', 200);
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_awal_keperawatan_ralan_psikiatri');
    }
};
