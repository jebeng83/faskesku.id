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
        if (!Schema::hasTable('penilaian_lanjutan_resiko_jatuh_psikiatri')) {
            Schema::create('penilaian_lanjutan_resiko_jatuh_psikiatri', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('penilaian_jatuhedmonson_skala1', ['-', 'Kurang Dari 50 Th', '50 - 70 Th', 'Lebih Dari 70 Th'])->nullable();
                $table->tinyInteger('penilaian_jatuhedmonson_nilai1')->nullable();
                $table->enum('penilaian_jatuhedmonson_skala2', ['-', 'Kesadaran/Orientasi Baik Setiap Saat', 'Agitasi/Ansietas', 'Kadang-kadang Bingung', 'Bingung/Disorientasi'])->nullable();
                $table->tinyInteger('penilaian_jatuhedmonson_nilai2')->nullable();
                $table->enum('penilaian_jatuhedmonson_skala3', ['-', 'Mandiri & Mampu Mengontrol BAB/BAK', 'Dower Catheter/Colostomy', 'Eliminasi Dengan Bantuan', 'Gangguan Eliminasi (Inkontinensia/Nokturia/Frekuensi)', 'Inkontinensia Tetapi Mampu Untuk Mobilisasi'])->nullable();
                $table->tinyInteger('penilaian_jatuhedmonson_nilai3')->nullable();
                $table->enum('penilaian_jatuhedmonson_skala4', ['-', 'Tanpa Obat-obatan', 'Obat-obatan Jantung', 'Obat-obatan Psikotropika (Termasuk Benzodiazepine & Antidepresan)', 'Mendapat Tambahan Obat-obatan & Atau Obat PRN Selama 24 Jam Terakhir'])->nullable();
                $table->tinyInteger('penilaian_jatuhedmonson_nilai4')->nullable();
                $table->enum('penilaian_jatuhedmonson_skala5', ['-', 'Bipolar/Gangguan Schizoaffective', 'Penggunaan Obat-obatan Terlarang, Ketergantungan Alkohol', 'Gangguan Depresi Mayor', 'Demensia/Delirium'])->nullable();
                $table->tinyInteger('penilaian_jatuhedmonson_nilai5')->nullable();
                $table->enum('penilaian_jatuhedmonson_skala6', ['-', 'Mandiri/Keseimbangan Baik/Imobilisasi', 'Dengan Alat Bantu (Kursi Roda, Walker, Dll)', 'Vertigo/Kelemahan', 'Goyah/Membutuhkan Bantuan & Menyadari Kemampuan', 'Goyah Tapi Lupa Keterbatasan'])->nullable();
                $table->tinyInteger('penilaian_jatuhedmonson_nilai6')->nullable();
                $table->tinyInteger('penilaian_jatuhedmonson_totalnilai')->nullable();
                $table->string('hasil_skrining', 200)->nullable();
                $table->string('saran', 200)->nullable();
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
        Schema::dropIfExists('penilaian_lanjutan_resiko_jatuh_psikiatri');
    }
};
