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
        if (! Schema::hasTable('penilaian_mcu')) {
            Schema::create('penilaian_mcu', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->enum('informasi', ['Autoanamnesis', 'Alloanamnesis']);
                $table->string('rps', 2000);
                $table->string('rpk', 1000);
                $table->string('rpd', 1000);
                $table->string('alergi', 150)->default('');
                $table->enum('keadaan', ['Baik', 'Tidak Baik']);
                $table->enum('kesadaran', ['Composmentis', 'Apatis', 'Somnolen']);
                $table->string('td', 8)->default('');
                $table->string('nadi', 5)->default('');
                $table->string('rr', 5);
                $table->string('tb', 5)->default('');
                $table->string('bb', 5)->default('');
                $table->string('suhu', 5)->default('');
                $table->string('bmi', 6);
                $table->enum('kasifikasi_bmi', ['Berat Badan Kurang', 'Berat Badan Normal', 'Kelebihan Berat Badan', 'Obesitas I', 'Obesitas II']);
                $table->string('lingkar_pinggang', 6);
                $table->enum('risiko_lingkar_pinggang', ['Rendah', 'Cukup', 'Meningkat', 'Moderat', 'Berat', 'Sangat']);
                $table->enum('submandibula', ['Tidak Membesar', 'Membesar', '-']);
                $table->enum('axilla', ['Tidak Membesar', 'Membesar', '-']);
                $table->enum('supraklavikula', ['Tidak Membesar', 'Membesar', '-']);
                $table->enum('leher', ['Tidak Membesar', 'Membesar', '-']);
                $table->enum('inguinal', ['Tidak Membesar', 'Membesar', '-']);
                $table->enum('oedema', ['Tidak Ada', 'Ada', '-']);
                $table->enum('sinus_frontalis', ['Tidak Ada', 'Ada', '=']);
                $table->enum('sinus_maxilaris', ['Tidak Ada', 'Ada', '-']);
                $table->string('rambut', 100);
                $table->enum('palpebra', ['Normal', 'Oedem', 'Ptosis', '-']);
                $table->enum('sklera', ['Normal', 'Ikterik', '-']);
                $table->enum('cornea', ['Normal', 'Tidak Normal', '-']);
                $table->enum('buta_warna', ['Normal', 'Buta Warna Partial', 'Buta Warna Total', '-']);
                $table->enum('konjungtiva', ['Normal', 'Anemis', 'Hiperemis', '-']);
                $table->enum('lensa', ['Jernih', 'Keruh', 'Kacamata', '-']);
                $table->enum('pupil', ['Isokor', 'Anisokor', '-']);
                $table->enum('menggunakan_kacamata', ['Tidak', 'Ya', '-']);
                $table->string('visus', 50);
                $table->enum('luas_lapang_pandang', ['Normal', 'Tidak Normal', '-']);
                $table->string('keterangan_luas_lapang_pandang', 50);
                $table->enum('lubang_telinga', ['Normal', 'Tidak Normal', 'Lapang', 'Sempit', 'Serumen Prop', '-']);
                $table->enum('daun_telinga', ['Normal', 'Tidak Normal', '-']);
                $table->enum('selaput_pendengaran', ['Intak', 'Tidak Intak', '-']);
                $table->enum('proc_mastoideus', ['Normal', 'Tidak Normal', '-']);
                $table->enum('septum_nasi', ['Normal', 'Deviasi', '-']);
                $table->enum('lubang_hidung', ['Lapang', 'Rhinore', 'Epistaksis', '-']);
                $table->enum('sinus', ['Normal', 'Tidak Normal', '-']);
                $table->enum('bibir', ['Lembab', 'Kering']);
                $table->enum('gusi', ['Normal', 'Tidak Normal', '-']);
                $table->enum('gigi', ['Normal', 'Tidak Normal', '-']);
                $table->enum('caries', ['Tidak Ada', 'Ada', '-']);
                $table->enum('lidah', ['Bersih', 'Kotor', 'Tremor', '-']);
                $table->enum('faring', ['Normal', 'Hiperemis', '-']);
                $table->enum('tonsil', ['T1-T1', 'T2-T2', 'T3-T3', 'T4-T4', 'T0-T0', '-']);
                $table->enum('kelenjar_limfe', ['Tidak Membesar', 'Membesar', '-']);
                $table->enum('kelenjar_gondok', ['Tidak Membesar', 'Membesar', '-']);
                $table->enum('gerakan_dada', ['Simetris', 'Tidak Simetris', '-']);
                $table->enum('vocal_femitus', ['Sama', 'Tidak Sama', '-']);
                $table->enum('perkusi_dada', ['Sonor', 'Pekak', '-']);
                $table->enum('bunyi_napas', ['Vesikuler', 'Bronkhial', 'Trakeal', '-']);
                $table->enum('bunyi_tambahan', ['Tidak Ada', 'Wheezing', 'Ronchi', '-']);
                $table->enum('ictus_cordis', ['Tidak Terlihat', 'Terlihat', ' Teraba', 'Tidak Teraba', '-']);
                $table->enum('bunyi_jantung', ['Reguler', 'Irreguler', 'Gallop', 'Lain-lain', '-']);
                $table->enum('batas', ['Normal', 'Melebar', '-']);
                $table->enum('mamae', ['Normal', 'Tidak Normal', '-']);
                $table->string('keterangan_mamae', 100);
                $table->enum('inspeksi', ['Datar', 'Cembung', '-']);
                $table->enum('palpasi', ['Supel', 'Tegang (Defans Muscular)', 'Nyeri Tekan Epigastrium', 'Nyeri Tekan Suprapubik', 'Nyeri Tekan Right Lower Quadrant', 'Nyeri Tekan Left Lower Quadrant', '-']);
                $table->enum('hepar', ['Tidak Membesar', 'Membesar', '-']);
                $table->enum('perkusi_abdomen', ['Timpani', 'Hipertimpani', 'Dull', '-']);
                $table->enum('auskultasi', ['Normal', 'Bising Usus Meningkat', 'Bising Usus Menurun', '-']);
                $table->enum('limpa', ['Tidak Membesar', 'Membesar', '-']);
                $table->enum('costovertebral', ['Tidak Ada', 'Ada Di Kiri', 'Ada Di Kanan', '-']);
                $table->enum('scoliosis', ['Tidak Ada', 'Ada', '-']);
                $table->enum('kondisi_kulit', ['Normal', 'Tato', 'Penyakit Kulit', '-']);
                $table->string('penyakit_kulit', 100);
                $table->enum('ekstrimitas_atas', ['Normal', 'Tidak Normal', '-']);
                $table->string('ekstrimitas_atas_ket', 50);
                $table->enum('ekstrimitas_bawah', ['Normal', 'Tidak Normal', '-']);
                $table->string('ekstrimitas_bawah_ket', 50);
                $table->enum('area_genitalia', ['Tidak Ada Kelainan', 'Ada Kelainan', '-']);
                $table->string('keterangan_area_genitalia', 100);
                $table->enum('anus_perianal', ['Normal', 'Tidak Normal', '-']);
                $table->string('keterangan_anus_perianal', 100);
                $table->text('laborat');
                $table->text('radiologi');
                $table->text('ekg');
                $table->text('spirometri');
                $table->text('audiometri');
                $table->text('treadmill');
                $table->text('romberg_test');
                $table->text('back_strength');
                $table->text('abi_tangan_kanan');
                $table->text('abi_tangan_kiri');
                $table->text('abi_kaki_kanan');
                $table->text('abi_kaki_kiri');
                $table->text('lainlain');
                $table->string('merokok', 100);
                $table->string('alkohol', 100);
                $table->text('kesimpulan');
                $table->text('anjuran');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_mcu');
    }
};
