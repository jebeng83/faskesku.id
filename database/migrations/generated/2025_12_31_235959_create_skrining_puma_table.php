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
        if (!Schema::hasTable('skrining_puma')) {
            Schema::create('skrining_puma', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('jk', ['Perempuan', 'Laki-laki'])->nullable();
                $table->tinyInteger('nilai_jk')->nullable();
                $table->enum('usia', ['40-49', '50-59', '>60'])->nullable();
                $table->tinyInteger('nilai_usia')->nullable();
                $table->enum('pernah_merokok', ['Pernah', 'Tidak'])->nullable();
                $table->tinyInteger('nilai_pernah_merokok')->nullable();
                $table->string('jumlah_rokok_perhari', 3)->nullable();
                $table->string('lama_merokok', 3)->nullable();
                $table->enum('napas_pendek', ['Ya', 'Tidak'])->nullable();
                $table->tinyInteger('nilai_napas_pendek')->nullable();
                $table->enum('punya_dahak', ['Ya', 'Tidak'])->nullable();
                $table->tinyInteger('nilai_punya_dahak')->nullable();
                $table->enum('biasa_batuk', ['Ya', 'Tidak'])->nullable();
                $table->tinyInteger('nilai_biasa_batuk')->nullable();
                $table->enum('spirometri', ['Ya', 'Tidak'])->nullable();
                $table->tinyInteger('nilai_spirometri')->nullable();
                $table->tinyInteger('nilai_total')->nullable();
                $table->string('keterangan_hasil_skrining', 150)->nullable();
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_puma');
    }
};
