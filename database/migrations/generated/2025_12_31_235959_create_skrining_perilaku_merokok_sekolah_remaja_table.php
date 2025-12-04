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
        if (!Schema::hasTable('skrining_perilaku_merokok_sekolah_remaja')) {
            Schema::create('skrining_perilaku_merokok_sekolah_remaja', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_sekolah', 5)->nullable()->index('kd_sekolah');
                $table->enum('kelas', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])->nullable();
                $table->enum('apakah_anda_merokok', ['Ya, Setiap Hari', 'Ya, Kadang-kadang', 'Pernah Mencoba Walau Hanya 1 Hisapan', 'Tidak Merokok/Tidak Pernah Mencoba']);
                $table->string('jumlah_batang_rokok', 4);
                $table->enum('jumlah_batang_rokok_hariminggu', ['Batang/Hari', 'Batang/Minggu', '']);
                $table->enum('jenis_rokok_yang_digunakan', ['Rokok Konvensional : Rokok Filter/Putih, Kretek, Tingwe, dll', 'Rokok Elektronik : Vape, IQOS, dll', 'Keduanya', 'Lainnya', '']);
                $table->string('jenis_rokok_yang_digunakan_keterangan', 40);
                $table->string('usia_mulai_merokok', 3);
                $table->enum('alasan_mulai_merokok', ['Ikut-ikutan Teman', 'Pengaruh Keluarga', 'Rasa Ingin Tahu', 'Terpaksa Oleh Teman/Lingkungan', 'Mengisi Waktu Luang', 'Menghilangkan Stress', 'Lainnya', '']);
                $table->string('alasan_mulai_merokok_keterangan', 40);
                $table->string('sudah_berapa_lama_merokok', 5);
                $table->enum('bagaimana_biasanya_mendapatkan_rokok', ['Beli Batangan', 'Beli Bungkusan', 'Dapat Dari Teman/Saudara/Keluarga', 'Lainnya', '']);
                $table->string('bagaimana_biasanya_mendapatkan_rokok_keterangan', 40);
                $table->enum('keinginan_berhenti_merokok', ['Ya', 'Tidak', '']);
                $table->enum('alasan_utama_berhenti_merokok', ['Kondisi Kesehatan', 'Motivasi Diri Sendiri', 'Disarankan Orangtua/Guru/Teman', 'Tidak Mampu Beli/Mahal', 'Lainnya', '']);
                $table->string('alasan_utama_berhenti_merokok_keterangan', 40);
                $table->enum('tahu_dampak_kesehatan_merokok', ['Ya', 'Tidak']);
                $table->enum('dampak_kesehatan_dari_merokok_yang_diketahui', ['Kecanduan', 'Batuk', 'Gigi Kuning & Mulut Berbau', 'Sistem Pernapasan Terganggu', '']);
                $table->enum('tahu_merokok_pintu_masuk_narkoba', ['Ya', 'Tidak']);
                $table->enum('melihat_orang_merokok_di_sekolah', ['Ya', 'Tidak']);
                $table->enum('orang_yang_paling_sering_merokok_disekolah', ['Teman/Kakak Kelas', 'Guru/Kepala Sekolah', 'Satpam/Supir/Penjaga Kantin', 'Lainnya', '']);
                $table->string('orang_yang_paling_sering_merokok_disekolah_keterangan', 40);
                $table->enum('ada_anggota_keluarga_di_rumah_yang_merokok', ['Ya', 'Tidak']);
                $table->enum('teman_dekat_banyakyang_merokok', ['Ya', 'Tidak']);
                $table->enum('dilakukan_pemeriksaan_kadar_co_pernapasan', ['Ya', 'Tidak, Alat & BMHP Tidak Tersedia', 'Tidak, BMHP Tidak Tersedia']);
                $table->string('hasil_pemeriksaan_co_pernapasan', 5);
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_perilaku_merokok_sekolah_remaja');
    }
};
