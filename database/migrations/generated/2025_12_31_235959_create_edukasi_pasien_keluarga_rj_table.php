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
        if (! Schema::hasTable('edukasi_pasien_keluarga_rj')) {
            Schema::create('edukasi_pasien_keluarga_rj', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('nip', 20)->index('nip');
                $table->enum('bicara', ['Normal', 'Gangguan Bicara'])->nullable();
                $table->string('keterangan_bicara', 50)->nullable();
                $table->string('bahasa_sehari', 50)->nullable();
                $table->enum('perlu_penerjemah', ['Ya', 'Tidak'])->nullable();
                $table->string('keterangan_penerjemah', 50)->nullable();
                $table->enum('bahasa_isyarat', ['Ya', 'Tidak'])->nullable();
                $table->enum('cara_belajar', ['Menulis', 'Audio-Visual/Gambar', 'Diskusi', 'Simulasi'])->nullable();
                $table->enum('hambatan_belajar', ['Tidak Ada', 'Takut/Gelisah', 'Tidak Tertarik', 'Nyeri Tidak Nyaman', 'Buta Huruf', 'Gangguan Kognitif', 'Lain-lain'])->nullable();
                $table->string('keterangan_hambatan_belajar', 50)->nullable();
                $table->enum('kemampuan_belajar', ['Mampu Menerima Informasi', 'Tidak Mampu Menerima Informasi'])->nullable();
                $table->string('keterangan_kemampuan_belajar', 50)->nullable();
                $table->enum('penyakitnya_merupakan', ['Ujian/Cobaan', 'Kutukan', 'Lain-lain']);
                $table->string('keterangan_penyakitnya_merupakan', 50);
                $table->enum('keputusan_memilih_layanan', ['Sendiri', 'Keluarga', 'Lain-lain']);
                $table->string('keterangan_keputusan_memilih_layanan', 50);
                $table->enum('keyakinan_terhadap_terapi', ['Pasrah', 'Yakin Sembuh Jika Kontrol Teratur', 'Yakin Sembuh Jika Minum Obat Teratur', 'Lain-lain']);
                $table->string('keterangan_keyakinan_terhadap_terapi', 50);
                $table->enum('aspek_keyakinan_dipertimbangkan', ['Ada', 'Tidak']);
                $table->string('keterangan_aspek_keyakinan_dipertimbangkan', 50);
                $table->enum('kesediaan_menerima_informasi', ['Ya', 'Tidak']);
                $table->enum('topik_edukasi_penyakit', ['Ya', 'Tidak']);
                $table->enum('topik_edukasi_rencana_tindakan', ['Ya', 'Tidak']);
                $table->enum('topik_edukasi_pengobatan', ['Ya', 'Tidak']);
                $table->enum('topik_edukasi_hasil_layanan', ['Ya', 'Tidak']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('edukasi_pasien_keluarga_rj');
    }
};
