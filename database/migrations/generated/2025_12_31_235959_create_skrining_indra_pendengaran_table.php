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
        if (!Schema::hasTable('skrining_indra_pendengaran')) {
            Schema::create('skrining_indra_pendengaran', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('curiga_tuli_telinga_kiri', ['Tidak', 'Ya'])->nullable();
                $table->enum('curiga_tuli_telinga_kanan', ['Tidak', 'Ya'])->nullable();
                $table->enum('curiga_tuli_telinga_rujuk', ['Tidak', 'Ya'])->nullable();
                $table->enum('penurunan_pendengaran_telinga_kiri', ['Tidak', 'Ya'])->nullable();
                $table->enum('penurunan_pendengaran_telinga_kanan', ['Tidak', 'Ya'])->nullable();
                $table->enum('mendengar_bisikan_telinga_kiri', ['Normal', 'Gangguan Pendengaran'])->nullable();
                $table->enum('mendengar_bisikan_telinga_kanan', ['Normal', 'Gangguan Pendengaran'])->nullable();
                $table->enum('congek_telinga_kiri', ['Tidak', 'Ya'])->nullable();
                $table->enum('congek_telinga_kanan', ['Tidak', 'Ya'])->nullable();
                $table->enum('congek_telinga_rujuk', ['Tidak', 'Ya'])->nullable();
                $table->enum('sumbatan_serumen_telinga_kiri', ['Tidak', 'Ya'])->nullable();
                $table->enum('sumbatan_serumen_telinga_kanan', ['Tidak', 'Ya'])->nullable();
                $table->enum('sumbatan_serumen_telinga_rujuk', ['Tidak', 'Ya'])->nullable();
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
        Schema::dropIfExists('skrining_indra_pendengaran');
    }
};
