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
        if (!Schema::hasTable('penilaian_lanjutan_skrining_fungsional')) {
            Schema::create('penilaian_lanjutan_skrining_fungsional', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('penilaian_skrining_skala1', ['Tak Terkendali/Tak Teratur (Perlu Pencahar)', 'Kadang-kadang Tak Terkendali (1x Seminggu)', 'Terkendali Teratur'])->nullable();
                $table->tinyInteger('penilaian_skrining_nilai1')->nullable();
                $table->enum('penilaian_skrining_skala2', ['Tak Terkendali/Pakai Kateter', 'Kadang-kadang Tak Terkendali (Hanya 1x/24 Jam )', 'Mandiri'])->nullable();
                $table->tinyInteger('penilaian_skrining_nilai2')->nullable();
                $table->enum('penilaian_skrining_skala3', ['Butuh Pertolongan Orang Lain', 'Mandiri'])->nullable();
                $table->tinyInteger('penilaian_skrining_nilai3')->nullable();
                $table->enum('penilaian_skrining_skala4', ['Tergantung Pertolongan Orang Lain', 'Perlu Pertolongan Pada Beberapa Kegiatan Tetapi Dapat Mengerjakan Sendiri Beberapa Kegiatan Yang Lain', 'Mandiri'])->nullable();
                $table->tinyInteger('penilaian_skrining_nilai4')->nullable();
                $table->enum('penilaian_skrining_skala5', ['Tidak Mampu', 'Perlu Ditolong Memotong Makanan', 'Mandiri'])->nullable();
                $table->tinyInteger('penilaian_skrining_nilai5')->nullable();
                $table->enum('penilaian_skrining_skala6', ['Tidak Mampu', 'Perlu Banyak Bantuan Untuk Bisa Duduk (2 Orang)', 'Bantuan Minimal 1 Orang', 'Mandiri'])->nullable();
                $table->tinyInteger('penilaian_skrining_nilai6')->nullable();
                $table->enum('penilaian_skrining_skala7', ['Tidak Mampu', 'Bisa (Pindah) Dengan Kursi Roda', 'Berjalan Dengan Bantuan 1 Orang', 'Mandiri'])->nullable();
                $table->tinyInteger('penilaian_skrining_nilai7')->nullable();
                $table->enum('penilaian_skrining_skala8', ['Tergantung Orang Lain', 'Sebagian Dibantu (Misal Mengancing Baju)', 'Mandiri'])->nullable();
                $table->tinyInteger('penilaian_skrining_nilai8')->nullable();
                $table->enum('penilaian_skrining_skala9', ['Tidak Mampu', 'Butuh Pertolongan', 'Mandiri'])->nullable();
                $table->tinyInteger('penilaian_skrining_nilai9')->nullable();
                $table->enum('penilaian_skrining_skala10', ['Tergantung Orang Lain', 'Mandiri'])->nullable();
                $table->tinyInteger('penilaian_skrining_nilai10')->nullable();
                $table->tinyInteger('penilaian_skrining_totalnilai')->nullable();
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
        Schema::dropIfExists('penilaian_lanjutan_skrining_fungsional');
    }
};
