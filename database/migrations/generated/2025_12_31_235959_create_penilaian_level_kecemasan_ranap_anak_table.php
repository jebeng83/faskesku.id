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
        if (!Schema::hasTable('penilaian_level_kecemasan_ranap_anak')) {
            Schema::create('penilaian_level_kecemasan_ranap_anak', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->tinyInteger('cemas')->nullable();
                $table->tinyInteger('firasat_buruk')->nullable();
                $table->tinyInteger('takut_pikiran_sendiri')->nullable();
                $table->tinyInteger('mudah_tersinggung')->nullable();
                $table->tinyInteger('merasa_tegang')->nullable();
                $table->tinyInteger('lesu')->nullable();
                $table->tinyInteger('tak_bisa_istirahat_tenang')->nullable();
                $table->tinyInteger('mudah_terkejut')->nullable();
                $table->tinyInteger('mudah_menangis')->nullable();
                $table->tinyInteger('gemetar')->nullable();
                $table->tinyInteger('gelisah')->nullable();
                $table->tinyInteger('takut_pada_gelap')->nullable();
                $table->tinyInteger('takut_pada_orangasing')->nullable();
                $table->tinyInteger('takut_pada_kerumunan_banyak_orang')->nullable();
                $table->tinyInteger('takut_pada_binatang_besar')->nullable();
                $table->tinyInteger('takut_pada_keramaian_lalu_lintas')->nullable();
                $table->tinyInteger('takut_ditinggal_sendiri')->nullable();
                $table->tinyInteger('sulit_tidur')->nullable();
                $table->tinyInteger('terbangun_malam_hari')->nullable();
                $table->tinyInteger('tidur_tidak_nyeyak')->nullable();
                $table->tinyInteger('mimpi_buruk')->nullable();
                $table->tinyInteger('bangun_dengan_lesu')->nullable();
                $table->tinyInteger('banyak_mengalami_mimpi')->nullable();
                $table->tinyInteger('mimpi_menakutkan')->nullable();
                $table->tinyInteger('sulit_konsentrasi')->nullable();
                $table->tinyInteger('daya_ingat_buruk')->nullable();
                $table->tinyInteger('hilangnya_minat')->nullable();
                $table->tinyInteger('berkurangnya_kesenangan_pada_hobi')->nullable();
                $table->tinyInteger('sedih')->nullable();
                $table->tinyInteger('bangun_dini_hari')->nullable();
                $table->tinyInteger('perasaan_berubah')->nullable();
                $table->tinyInteger('sakit_nyeri_di_otot')->nullable();
                $table->tinyInteger('kaku')->nullable();
                $table->tinyInteger('kedutan_otot')->nullable();
                $table->tinyInteger('gigi_gemerutuk')->nullable();
                $table->tinyInteger('suara_tidak_stabil')->nullable();
                $table->tinyInteger('tinnitus')->nullable();
                $table->tinyInteger('penglihatan_kabur')->nullable();
                $table->tinyInteger('muka_merah_gejala_somatic')->nullable();
                $table->tinyInteger('merasa_lemah')->nullable();
                $table->tinyInteger('perasaan_ditusuk')->nullable();
                $table->tinyInteger('takhikardia')->nullable();
                $table->tinyInteger('berdebar')->nullable();
                $table->tinyInteger('nyeri_di_dada')->nullable();
                $table->tinyInteger('denyut_nadi_mengeras')->nullable();
                $table->tinyInteger('perasaan_lesu')->nullable();
                $table->tinyInteger('detak_jantung_menghilang')->nullable();
                $table->tinyInteger('merasa_tertekan')->nullable();
                $table->tinyInteger('perasaan_tercekik')->nullable();
                $table->tinyInteger('sering_menarik_napas')->nullable();
                $table->tinyInteger('napas_pendek')->nullable();
                $table->tinyInteger('bulu_berdiri')->nullable();
                $table->tinyInteger('sulit_menelan')->nullable();
                $table->tinyInteger('perut_melilit')->nullable();
                $table->tinyInteger('ganguan_pencernaan')->nullable();
                $table->tinyInteger('rasa_kembung')->nullable();
                $table->tinyInteger('nyeri_makan')->nullable();
                $table->tinyInteger('terbakar_perut')->nullable();
                $table->tinyInteger('sukar_bab')->nullable();
                $table->tinyInteger('muntah')->nullable();
                $table->tinyInteger('bab_lembek')->nullable();
                $table->tinyInteger('kehilangan_bb')->nullable();
                $table->tinyInteger('mual')->nullable();
                $table->tinyInteger('sering_bak')->nullable();
                $table->tinyInteger('tidak_bisa_menahan_kencing')->nullable();
                $table->tinyInteger('menjadi_dingin')->nullable();
                $table->tinyInteger('manorrhagia')->nullable();
                $table->tinyInteger('amenorrhoea')->nullable();
                $table->tinyInteger('ejakulasi_praecocks')->nullable();
                $table->tinyInteger('ereksi_hilang')->nullable();
                $table->tinyInteger('impotensi')->nullable();
                $table->tinyInteger('mulut_kering')->nullable();
                $table->tinyInteger('muka_merah_gejala_otonom')->nullable();
                $table->tinyInteger('mudah_berkeringat')->nullable();
                $table->tinyInteger('bulu_berdiri_gejala_otonom')->nullable();
                $table->tinyInteger('sakit_kepala')->nullable();
                $table->tinyInteger('gelisah_wawancara')->nullable();
                $table->tinyInteger('napas_pendek_wawancara')->nullable();
                $table->tinyInteger('jari_gemetar')->nullable();
                $table->tinyInteger('kerut_kening')->nullable();
                $table->tinyInteger('muka_tegang')->nullable();
                $table->tinyInteger('tonus_meningkat')->nullable();
                $table->tinyInteger('tidak_tenang')->nullable();
                $table->tinyInteger('muka_merah_wawancara')->nullable();
                $table->integer('total_skor')->nullable();
                $table->enum('keterangan_skor', ['Tidak Mengalami Kecemasan', 'Kecemasan Ringan', 'Kecemasan Sedang', 'Kecemasan Berat', 'Kecemasan Sangat Berat'])->nullable();
                $table->string('nip', 20)->index('nip');

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_level_kecemasan_ranap_anak');
    }
};
