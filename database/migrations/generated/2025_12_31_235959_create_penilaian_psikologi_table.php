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
        if (! Schema::hasTable('penilaian_psikologi')) {
            Schema::create('penilaian_psikologi', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('nip', 20)->index('nip');
                $table->enum('anamnesis', ['Autoanamnesis', 'Alloanamnesis']);
                $table->enum('dikirim_dari', ['Ruang Rawat', 'Poliklinik', 'Rehabilitasi', 'After Care', 'Dokter']);
                $table->enum('tujuan_pemeriksaan', ['Klinik', 'Bimbingan', 'Forensik']);
                $table->text('ket_anamnesis');
                $table->enum('rupa', ['Tampan', 'Buruk', 'Menarik', 'Memuakkan', 'Biasa']);
                $table->enum('bentuk_tubuh', ['Sangat Tinggi', 'Sangat Pendek', 'Sangat Kurus', 'Sangat Gemuk', 'Tinggi', 'Sedang', 'Atletik', 'Pendek', 'Langsing', 'Gemuk']);
                $table->enum('tindakan', ['Sopan', 'Tidak Sopan', 'Kurang Tahu Aturan', 'Canggung', 'Bebas', 'Tegas', 'Garang', 'Percaya Diri', 'Tertekan', 'Ragu-Ragu', 'Pasti', 'Kaku', 'Ceroboh', 'Dingin', 'Malu-Malu']);
                $table->enum('pakaian', ['Rapi', 'Serampangan', 'Terpelihara', 'Tidak Terpelihara', 'Teratur', 'Tidak Rapi', 'Sederhana', 'Biasa', 'Bersih', 'Kotor']);
                $table->enum('ekspresi', ['Sangat Mudah', 'Hati-Hati Dan Membatasi Diri', 'Sukar Mencari Kata-Kata', 'Mudah', 'Terbuka']);
                $table->enum('berbicara', ['Tenang', 'Acuh Tak Acuh', 'Gugup', 'Lancar', 'Ribut Dengan Banyak Gerak dan Isyarat']);
                $table->enum('penggunaan_kata', ['Ramah', 'Dibuat-Buat', 'Dengan Tekanan Suara', 'Terpengaruh Bahasa Daerah', 'Disertai Dengan Istilah Bahasa Asing']);
                $table->string('ciri_menyolok', 500);
                $table->text('hasil_psikotes');
                $table->text('kepribadian');
                $table->text('psikodinamika');
                $table->text('kesimpulan_psikolog');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_psikologi');
    }
};
