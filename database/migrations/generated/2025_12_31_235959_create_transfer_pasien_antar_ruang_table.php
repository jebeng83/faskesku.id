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
        if (! Schema::hasTable('transfer_pasien_antar_ruang')) {
            Schema::create('transfer_pasien_antar_ruang', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal_masuk');
                $table->dateTime('tanggal_pindah')->nullable();
                $table->string('asal_ruang', 30)->nullable();
                $table->string('ruang_selanjutnya', 30)->nullable();
                $table->string('diagnosa_utama', 100)->nullable();
                $table->string('diagnosa_sekunder', 150)->nullable();
                $table->enum('indikasi_pindah_ruang', ['Kondisi Pasien Stabil', 'Kondisi Pasien Tidak Ada Perubahan', 'Kondisi Pasien Memburuk', 'Fasilitas Kurang Memadai', 'Fasilitas Butuh Lebih Baik', 'Tenaga Membutuhkan Yang Lebih Ahli', 'Tenaga Kurang', 'Lain-lain'])->nullable();
                $table->string('keterangan_indikasi_pindah_ruang', 100)->nullable();
                $table->string('prosedur_yang_sudah_dilakukan', 800)->nullable();
                $table->string('obat_yang_telah_diberikan', 1200)->nullable();
                $table->enum('metode_pemindahan_pasien', ['Kursi Roda', 'Tempat Tidur', 'Brankar', 'Jalan Sendiri', '-'])->nullable();
                $table->enum('peralatan_yang_menyertai', ['Oksigen Portable', 'Infus', 'NGT', 'Syringe Pump', 'Suction', 'Kateter Urin', 'Tidak Ada'])->nullable();
                $table->string('keterangan_peralatan_yang_menyertai', 90)->nullable();
                $table->string('pemeriksaan_penunjang_yang_dilakukan', 700)->nullable();
                $table->enum('pasien_keluarga_menyetujui', ['Ya', 'Tidak'])->nullable();
                $table->string('nama_menyetujui', 50)->nullable();
                $table->enum('hubungan_menyetujui', ['Kakak', 'Adik', 'Saudara', 'Keluarga', 'Kakek', 'Nenek', 'Orang Tua', 'Suami', 'Istri', 'Penanggung Jawab', 'Menantu', 'Ipar', 'Mertua', '-'])->nullable();
                $table->string('keluhan_utama_sebelum_transfer', 300)->nullable();
                $table->enum('keadaan_umum_sebelum_transfer', ['Compos Mentis', 'Gelisah', 'Delirium', 'Koma'])->nullable();
                $table->string('td_sebelum_transfer', 7)->nullable();
                $table->string('nadi_sebelum_transfer', 5)->nullable();
                $table->string('rr_sebelum_transfer', 5)->nullable();
                $table->string('suhu_sebelum_transfer', 5)->nullable();
                $table->string('keluhan_utama_sesudah_transfer', 300)->nullable();
                $table->enum('keadaan_umum_sesudah_transfer', ['Compos Mentis', 'Gelisah', 'Delirium', 'Koma'])->nullable();
                $table->string('td_sesudah_transfer', 7)->nullable();
                $table->string('nadi_sesudah_transfer', 5)->nullable();
                $table->string('rr_sesudah_transfer', 5)->nullable();
                $table->string('suhu_sesudah_transfer', 5)->nullable();
                $table->string('nip_menyerahkan', 20)->index('nip_menyerahkan');
                $table->string('nip_menerima', 20)->index('nip_menerima');

                $table->primary(['no_rawat', 'tanggal_masuk']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transfer_pasien_antar_ruang');
    }
};
