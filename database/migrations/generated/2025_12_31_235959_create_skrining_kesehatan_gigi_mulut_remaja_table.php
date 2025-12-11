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
        if (!Schema::hasTable('skrining_kesehatan_gigi_mulut_remaja')) {
            Schema::create('skrining_kesehatan_gigi_mulut_remaja', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('pernah_pemeriksaan_gigimulut', ['Pernah', 'Tidak Pernah'])->nullable();
                $table->enum('jumlah_gigi_tumbuh', ['<20', '>20'])->nullable();
                $table->enum('kondisi_kebersihan_gigimulut', ['Bersih', 'Kotor'])->nullable();
                $table->enum('punya_gigi_berlubang', ['Ya', 'Tidak'])->nullable();
                $table->enum('pernah_gusi_berdarah', ['Ya', 'Tidak'])->nullable();
                $table->enum('punya_karang_gigi', ['Ya', 'Tidak'])->nullable();
                $table->enum('gigi_depan_tidak_teratur', ['Ya', 'Tidak'])->nullable();
                $table->enum('menyikat_gigi_sebelum_tidur', ['Ya', 'Tidak'])->nullable();
                $table->enum('punya_sariawan', ['Ya', 'Tidak'])->nullable();
                $table->string('pemeriksaan_fisik', 600)->nullable();
                $table->string('pemeriksaan_penunjang', 600)->nullable();
                $table->string('hasil_skrining', 50)->nullable();
                $table->string('keterangan', 100);
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_kesehatan_gigi_mulut_remaja');
    }
};
