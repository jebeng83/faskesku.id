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
        if (! Schema::hasTable('penilaian_lanjutan_resiko_jatuh_lansia')) {
            Schema::create('penilaian_lanjutan_resiko_jatuh_lansia', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('penilaian_jatuhmorse_skala1', ['Tidak', 'Pasien Datang Karena Jatuh', 'Pasien Jatuh Dalam 2 Bulan Terakhir'])->nullable();
                $table->tinyInteger('penilaian_jatuhmorse_nilai1')->nullable();
                $table->enum('penilaian_jatuhmorse_skala2', ['Tidak', 'Pasien Delirium', 'Pasien Disorientasi', 'Pasien Agitasi'])->nullable();
                $table->tinyInteger('penilaian_jatuhmorse_nilai2')->nullable();
                $table->enum('penilaian_jatuhmorse_skala3', ['Tidak', 'Memakai Kaca Mata', 'Penglihatan Kabur', 'Memiliki Glukoma/Katarak/Degenerasi Makula'])->nullable();
                $table->tinyInteger('penilaian_jatuhmorse_nilai3')->nullable();
                $table->enum('penilaian_jatuhmorse_skala4', ['Tidak', 'Prilaku Berkemih/Frekuensi/Urgensi/Incontinensia/Nokturia'])->nullable();
                $table->tinyInteger('penilaian_jatuhmorse_nilai4')->nullable();
                $table->enum('penilaian_jatuhmorse_skala5', ['Mandiri', 'Memerlukan Bantuan 1 Orang/Pengawasan', 'Memerlukan Bantuan 2 Orang', 'Memerlukan Bantuan Total'])->nullable();
                $table->tinyInteger('penilaian_jatuhmorse_nilai5')->nullable();
                $table->enum('penilaian_jatuhmorse_skala6', ['Mandiri', 'Berjalan Dengan Bantuan 1 Orang', 'Menggunakan Kursi Roda', 'Imobilisasi'])->nullable();
                $table->tinyInteger('penilaian_jatuhmorse_nilai6')->nullable();
                $table->tinyInteger('penilaian_jatuhmorse_totalnilai')->nullable();
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
        Schema::dropIfExists('penilaian_lanjutan_resiko_jatuh_lansia');
    }
};
