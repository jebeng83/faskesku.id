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
        if (! Schema::hasTable('perencanaan_pemulangan')) {
            Schema::create('perencanaan_pemulangan', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->date('rencana_pulang');
                $table->string('alasan_masuk', 150)->nullable();
                $table->string('diagnosa_medis', 50)->nullable();
                $table->enum('pengaruh_ri_pasien_dan_keluarga', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_pengaruh_ri_pasien_dan_keluarga', 100)->nullable();
                $table->enum('pengaruh_ri_pekerjaan_sekolah', ['Tidak', 'Ya']);
                $table->string('keterangan_pengaruh_ri_pekerjaan_sekolah', 100);
                $table->enum('pengaruh_ri_keuangan', ['Tidak', 'Ya']);
                $table->string('keterangan_pengaruh_ri_keuangan', 100);
                $table->enum('antisipasi_masalah_saat_pulang', ['Tidak', 'Ya']);
                $table->string('keterangan_antisipasi_masalah_saat_pulang', 100);
                $table->enum('bantuan_diperlukan_dalam', ['Menyiapkan Makanan', 'Edukasi Kesehatan', 'Makan', 'Mandi', 'Diet', 'Berpakaian', 'Menyiapkan Obat', 'Transportasi', 'Minum Obat']);
                $table->string('keterangan_bantuan_diperlukan_dalam', 100);
                $table->enum('adakah_yang_membantu_keperluan', ['Tidak', 'Ada']);
                $table->string('keterangan_adakah_yang_membantu_keperluan', 100);
                $table->enum('pasien_tinggal_sendiri', ['Tidak', 'Ya']);
                $table->string('keterangan_pasien_tinggal_sendiri', 100);
                $table->enum('pasien_menggunakan_peralatan_medis', ['Tidak', 'Ya']);
                $table->string('keterangan_pasien_menggunakan_peralatan_medis', 100);
                $table->enum('pasien_memerlukan_alat_bantu', ['Tidak', 'Ya']);
                $table->string('keterangan_pasien_memerlukan_alat_bantu', 100);
                $table->enum('memerlukan_perawatan_khusus', ['Tidak', 'Ya']);
                $table->string('keterangan_memerlukan_perawatan_khusus', 100);
                $table->enum('bermasalah_memenuhi_kebutuhan', ['Tidak', 'Ya']);
                $table->string('keterangan_bermasalah_memenuhi_kebutuhan', 100);
                $table->enum('memiliki_nyeri_kronis', ['Tidak', 'Ya']);
                $table->string('keterangan_memiliki_nyeri_kronis', 100);
                $table->enum('memerlukan_edukasi_kesehatan', ['Tidak', 'Ya']);
                $table->string('keterangan_memerlukan_edukasi_kesehatan', 100);
                $table->enum('memerlukan_keterampilkan_khusus', ['Tidak', 'Ya']);
                $table->string('keterangan_memerlukan_keterampilkan_khusus', 100);
                $table->string('nama_pasien_keluarga', 50);
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perencanaan_pemulangan');
    }
};
