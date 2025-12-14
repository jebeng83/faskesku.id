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
        if (! Schema::hasTable('penilaian_lanjutan_resiko_jatuh_geriatri')) {
            Schema::create('penilaian_lanjutan_resiko_jatuh_geriatri', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('penilaian_jatuh_skala1', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('penilaian_jatuh_nilai1')->nullable();
                $table->enum('penilaian_jatuh_skala2', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('penilaian_jatuh_nilai2')->nullable();
                $table->enum('penilaian_jatuh_skala3', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('penilaian_jatuh_nilai3')->nullable();
                $table->enum('penilaian_jatuh_skala4', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('penilaian_jatuh_nilai4')->nullable();
                $table->enum('penilaian_jatuh_skala5', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('penilaian_jatuh_nilai5')->nullable();
                $table->enum('penilaian_jatuh_skala6', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('penilaian_jatuh_nilai6')->nullable();
                $table->enum('penilaian_jatuh_skala7', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('penilaian_jatuh_nilai7')->nullable();
                $table->enum('penilaian_jatuh_skala8', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('penilaian_jatuh_nilai8')->nullable();
                $table->enum('penilaian_jatuh_skala9', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('penilaian_jatuh_nilai9')->nullable();
                $table->enum('penilaian_jatuh_skala10', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('penilaian_jatuh_nilai10')->nullable();
                $table->enum('penilaian_jatuh_skala11', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('penilaian_jatuh_nilai11')->nullable();
                $table->tinyInteger('penilaian_jatuh_totalnilai')->nullable();
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
        Schema::dropIfExists('penilaian_lanjutan_resiko_jatuh_geriatri');
    }
};
