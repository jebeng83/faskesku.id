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
        if (! Schema::hasTable('penilaian_lanjutan_resiko_jatuh_anak')) {
            Schema::create('penilaian_lanjutan_resiko_jatuh_anak', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('penilaian_humptydumpty_skala1', ['0 - 3 Tahun', '3 - 7 Tahun', '7 - 13 Tahun', '> 13 Tahun'])->nullable();
                $table->tinyInteger('penilaian_humptydumpty_nilai1')->nullable();
                $table->enum('penilaian_humptydumpty_skala2', ['Laki-laki', 'Perempuan'])->nullable();
                $table->tinyInteger('penilaian_humptydumpty_nilai2')->nullable();
                $table->enum('penilaian_humptydumpty_skala3', ['Kelainan Neurologi', 'Perubahan Dalam Oksigen(Masalah Saluran Nafas, Dehidrasi, Anemia, Anoreksia / Sakit Kepala, Dll)', 'Kelainan Psikis / Perilaku', 'Diagnosa Lain'])->nullable();
                $table->tinyInteger('penilaian_humptydumpty_nilai3')->nullable();
                $table->enum('penilaian_humptydumpty_skala4', ['Tidak Sadar Terhadap Keterbatasan', 'Lupa Keterbatasan', 'Mengetahui Kemampuan Diri'])->nullable();
                $table->tinyInteger('penilaian_humptydumpty_nilai4')->nullable();
                $table->enum('penilaian_humptydumpty_skala5', ['Riwayat Jatuh Dari Tempat Tidur Saat Bayi/Anak', 'Pasien Menggunakan Alat Bantu/Box/Mebel', 'Pasien Berada Di Tempat Tidur', 'Di Luar Ruang Rawat'])->nullable();
                $table->tinyInteger('penilaian_humptydumpty_nilai5')->nullable();
                $table->enum('penilaian_humptydumpty_skala6', ['Dalam 24 Jam', 'Dalam 48 Jam', '> 48 Jam'])->nullable();
                $table->tinyInteger('penilaian_humptydumpty_nilai6')->nullable();
                $table->enum('penilaian_humptydumpty_skala7', ['Bermacam-macam Obat Yang Digunakan : Obat Sedative (Kecuali Pasien ICU Yang Menggunakan sedasi dan paralisis), Hipnotik, Barbiturat, Fenoti-Azin, Antidepresan, Laksans/Diuretika,Narkotik', 'Salah Satu Dari Pengobatan Di Atas', 'Pengobatan Lain'])->nullable();
                $table->tinyInteger('penilaian_humptydumpty_nilai7')->nullable();
                $table->tinyInteger('penilaian_humptydumpty_totalnilai')->nullable();
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
        Schema::dropIfExists('penilaian_lanjutan_resiko_jatuh_anak');
    }
};
