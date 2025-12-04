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
        if (!Schema::hasTable('penilaian_dehidrasi')) {
            Schema::create('penilaian_dehidrasi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('penilaian1', ['Baik', 'Lesu/Haus', 'Gelisah, Haus, Mengantuk, Hingga Syok'])->nullable();
                $table->tinyInteger('penilaian_nilai1')->nullable();
                $table->enum('penilaian2', ['Biasa', 'Cekung', 'Sangat Cekung'])->nullable();
                $table->tinyInteger('penilaian_nilai2')->nullable();
                $table->enum('penilaian3', ['Biasa', 'Kering', 'Sangat Kering'])->nullable();
                $table->tinyInteger('penilaian_nilai3')->nullable();
                $table->enum('penilaian4', ['< 30 x/menit', '30 - 40 x/menit', '> 40 x/menit'])->nullable();
                $table->tinyInteger('penilaian_nilai4')->nullable();
                $table->enum('penilaian5', ['Baik', 'Kurang', 'Jelek'])->nullable();
                $table->tinyInteger('penilaian_nilai5')->nullable();
                $table->enum('penilaian6', ['< 120 x/menit', '120 - 140 x/menit', '> 140 x/menit'])->nullable();
                $table->tinyInteger('penilaian_nilai6')->nullable();
                $table->tinyInteger('penilaian_totalnilai')->nullable();
                $table->string('hasil_penilaian', 200)->nullable();
                $table->string('kd_dokter', 20)->index('kd_dokter');

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_dehidrasi');
    }
};
