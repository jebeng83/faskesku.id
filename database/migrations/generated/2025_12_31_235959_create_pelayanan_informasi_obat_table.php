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
        if (! Schema::hasTable('pelayanan_informasi_obat')) {
            Schema::create('pelayanan_informasi_obat', function (Blueprint $table) {
                $table->string('no_permintaan', 20)->primary();
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->dateTime('tanggal');
                $table->enum('metode', ['Lisan', 'Tertulis', 'Telepon'])->nullable();
                $table->string('penanya', 70)->nullable();
                $table->enum('status_penanya', ['Pasien', 'Keluarga Pasien', 'Petugas Kesehatan'])->nullable();
                $table->string('no_telp_penanya', 30)->nullable();
                $table->enum('jenis_pertanyaan', ['Identifikasi Obat', 'Interaksi Obat', 'Harga Obat', 'Kontraindikasi', 'Cara Pemakaian', 'Stabilitas', 'Dosis', 'Keracunan', 'Efek Samping Obat', 'Penggunaan Terapeutik', 'Farmakokinetika', 'Farmakodinamika', 'Ketersediaan Obat', 'Lain-lain'])->nullable();
                $table->string('keterangan_jenis_pertanyaan', 30)->nullable();
                $table->string('uraian_pertanyaan', 500)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelayanan_informasi_obat');
    }
};
