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
        if (! Schema::hasTable('penilaian_tambahan_geriatri')) {
            Schema::create('penilaian_tambahan_geriatri', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('nik', 20)->index('kd_dokter');
                $table->enum('asal_masuk', ['IGD', 'Kamar Bersalin', 'Klinik'])->nullable();
                $table->enum('kondisi_masuk', ['Mandiri', 'Kursi Roda', 'Dipapah', 'Tempat Tidur'])->nullable();
                $table->string('keterangan_kondisi_masuk', 50)->nullable();
                $table->enum('anamnesis', ['Autoanamnesis', 'Alloanamnesis']);
                $table->string('diagnosa_medis', 100)->nullable();
                $table->enum('riwayat_immuno_telinga', ['Ya', 'Tidak'])->nullable();
                $table->enum('riwayat_immuno_sinus', ['Ya', 'Tidak'])->nullable();
                $table->enum('riwayat_immuno_antibiotik', ['Ya', 'Tidak'])->nullable();
                $table->enum('riwayat_immuno_pneumonia', ['Ya', 'Tidak'])->nullable();
                $table->enum('riwayat_immuno_abses', ['Ya', 'Tidak'])->nullable();
                $table->enum('riwayat_immuno_sariawan', ['Ya', 'Tidak'])->nullable();
                $table->enum('riwayat_immuno_memerlukan_antibiotik', ['Ya', 'Tidak'])->nullable();
                $table->enum('riwayat_immuno_infeksi_dalam', ['Ya', 'Tidak'])->nullable();
                $table->enum('riwayat_immuno_immunodefisiensi_primer', ['Ya', 'Tidak'])->nullable();
                $table->enum('riwayat_immuno_jenis_kangker', ['Ya', 'Tidak'])->nullable();
                $table->enum('riwayat_immuno_infeksi_oportunistik', ['Ya', 'Tidak'])->nullable();
                $table->enum('pola_aktifitas_tidur', ['TAK', 'Insomnia', 'Lainnya'])->nullable();
                $table->string('keterangan_pola_aktifitas_tidur', 50)->nullable();
                $table->enum('pola_aktifitas_obat_tidur', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_pola_aktifitas_obat_tidur', 50)->nullable();
                $table->enum('pola_aktifitas_olahraga', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_pola_aktifitas_olahraga', 50)->nullable();
                $table->enum('kualitas_hidup_mobilitas', ['Tidak Mempunyai Masalah Untuk Berjalan', 'Ada Masalah Untuk Berjalan', 'Hanya Mampu Berbaring'])->nullable();
                $table->enum('kualitas_hidup_perawatan_diri', ['Tidak Mempunyai Kesulitan Dalam Perawatan Diri Sendiri', 'Mengalami Kesulitan Untuk Membasuh Badan, Mandi Atau Berpakaian', 'Tidak Mampu Membasuh Badan, Mandi/Berpakaian Sendiri'])->nullable();
                $table->enum('kualitas_hidup_aktifitas_seharihari', ['Tak Mempunyai Kesulitan Dalam Melaksanakan Kegiatan Sehari-hari', 'Mempunyai Keterbatasan Dalam Melaksanakan Kegiatan Sehari-hari', 'Tak Mampu Melaksanakan Kegiatan Sehari-hari'])->nullable();
                $table->enum('kualitas_hidup_rasa_nyeri', ['Tidak Mempunyai Keluhan Rasa Nyeri Atau Rasa Tak Nyaman', 'Suka Merasakan Agak Nyeri/Agak Kurang Nyaman', 'Menderita Karena Keluhan Rasa Nyeri/Tidak Nyaman'])->nullable();
                $table->enum('skala_nyeri', ['0 - Tidak Nyeri', '2 - Dapat Ditoleransi(Aktifitas Tidak Tergangu)', '4 - Dapat Ditoleransi(Beberapa Aktifitas Sedikit Terganggu)', '5 - Tidak Dapat Ditoleransi(Masih Bisa Menggunakan Telp, Menonton TV/Membaca)', '6 - Tidak Dapat Ditoleransi(Tidak Bisa Menggunakan Telp, Menonton TV/Membaca)', '8 - Tidak Dapat Ditoleransi(Masih Bisa Berbicara Kerenya Nyeri)', '10 - Tidak Dapat Ditoleransi(Tidak Bisa Berbicara Kerenya Nyeri)'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_tambahan_geriatri');
    }
};
