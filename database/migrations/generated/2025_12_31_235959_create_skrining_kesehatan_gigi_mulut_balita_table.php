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
        if (! Schema::hasTable('skrining_kesehatan_gigi_mulut_balita')) {
            Schema::create('skrining_kesehatan_gigi_mulut_balita', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('pernah_pemeriksaan_gigimulut', ['Pernah', 'Tidak Pernah'])->nullable();
                $table->enum('sudah_tumbuh_gigi', ['Sudah', 'Belum'])->nullable();
                $table->enum('jumlah_gigi_tumbuh', ['<20', '>20', '0'])->nullable();
                $table->enum('kondisi_kebersihan_gigimulut', ['Bersih', 'Kotor'])->nullable();
                $table->enum('kebiasaan_susu_botol', ['Ya', 'Tidak'])->nullable();
                $table->enum('mengemil_manis', ['Ya', 'Tidak'])->nullable();
                $table->enum('menyikat_gigi_sebelum_tidur', ['Ya', 'Tidak'])->nullable();
                $table->enum('mengemut_makanan', ['Ya', 'Tidak'])->nullable();
                $table->enum('lidah_kotor', ['Ya', 'Tidak'])->nullable();
                $table->enum('celah_bibir', ['Tidak Ada', 'Ada'])->nullable();
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
        Schema::dropIfExists('skrining_kesehatan_gigi_mulut_balita');
    }
};
