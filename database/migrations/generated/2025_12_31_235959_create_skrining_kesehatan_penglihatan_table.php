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
        if (! Schema::hasTable('skrining_kesehatan_penglihatan')) {
            Schema::create('skrining_kesehatan_penglihatan', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('mata_luar', ['Normal', 'Tidak Sehat'])->nullable();
                $table->enum('tajam_kiri', ['Normal (6/6 - 6/18)', 'Kelainan Refraksi (< 6/18 - 6/60)', 'Low Vision (6/60 - 3/60)', 'Kebutaan (< 3/60)'])->nullable();
                $table->enum('tajam_kanan', ['Normal (6/6 - 6/18)', 'Kelainan Refraksi (< 6/18 - 6/60)', 'Low Vision (6/60 - 3/60)', 'Kebutaan (< 3/60)'])->nullable();
                $table->enum('buta_warna_kiri', ['Tidak', 'Ya'])->nullable();
                $table->enum('buta_warna_kanan', ['Tidak', 'Ya'])->nullable();
                $table->enum('kacamata', ['Tidak', 'Ya'])->nullable();
                $table->enum('visus_kiri', ['Normal (6/6 - 6/18)', 'Kelainan Refraksi (< 6/18 - 6/60)', 'Low Vision (6/60 - 3/60)', 'Kebutaan (< 3/60)'])->nullable();
                $table->enum('visus_kanan', ['Normal (6/6 - 6/18)', 'Kelainan Refraksi (< 6/18 - 6/60)', 'Low Vision (6/60 - 3/60)', 'Kebutaan (< 3/60)'])->nullable();
                $table->enum('refraksi_kiri', ['Tidak', 'Ya'])->nullable();
                $table->enum('refraksi_kanan', ['Tidak', 'Ya'])->nullable();
                $table->enum('rujuk_refraksi', ['Tidak', 'Ya'])->nullable();
                $table->enum('katarak_kiri', ['Tidak', 'Ya'])->nullable();
                $table->enum('katarak_kanan', ['Tidak', 'Ya'])->nullable();
                $table->enum('rujuk_katarak', ['Tidak', 'Ya'])->nullable();
                $table->string('hasil_skrining', 40);
                $table->string('keterangan', 100)->nullable();
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_kesehatan_penglihatan');
    }
};
