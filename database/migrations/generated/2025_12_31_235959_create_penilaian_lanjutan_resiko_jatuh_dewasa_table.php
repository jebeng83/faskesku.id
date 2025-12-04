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
        if (!Schema::hasTable('penilaian_lanjutan_resiko_jatuh_dewasa')) {
            Schema::create('penilaian_lanjutan_resiko_jatuh_dewasa', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('penilaian_jatuhmorse_skala1', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('penilaian_jatuhmorse_nilai1')->nullable();
                $table->enum('penilaian_jatuhmorse_skala2', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('penilaian_jatuhmorse_nilai2')->nullable();
                $table->enum('penilaian_jatuhmorse_skala3', ['Tidak Ada/Kursi Roda/Perawat/Tirah Baring', 'Tongkat/Alat Penopang', 'Berpegangan Pada Perabot'])->nullable();
                $table->tinyInteger('penilaian_jatuhmorse_nilai3')->nullable();
                $table->enum('penilaian_jatuhmorse_skala4', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('penilaian_jatuhmorse_nilai4')->nullable();
                $table->enum('penilaian_jatuhmorse_skala5', ['Normal/Tirah Baring/Imobilisasi', 'Lemah', 'Terganggu'])->nullable();
                $table->tinyInteger('penilaian_jatuhmorse_nilai5')->nullable();
                $table->enum('penilaian_jatuhmorse_skala6', ['Sadar Akan Kemampuan Diri Sendiri', 'Sering Lupa Akan Keterbatasan Yang Dimiliki'])->nullable();
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
        Schema::dropIfExists('penilaian_lanjutan_resiko_jatuh_dewasa');
    }
};
