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
        if (! Schema::hasTable('penilaian_risiko_dekubitus')) {
            Schema::create('penilaian_risiko_dekubitus', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('kondisi_fisik', ['Baik', 'Sedang', 'Buruk', 'Sangat Buruk'])->nullable();
                $table->tinyInteger('kondisi_fisik_nilai')->nullable();
                $table->enum('status_mental', ['Sadar', 'Apatis', 'Bingung', 'Stupor'])->nullable();
                $table->tinyInteger('status_mental_nilai')->nullable();
                $table->enum('aktifitas', ['Jalan Sendiri', 'Jalan Dengan Bantuan', 'Kursi Roda', 'Di Tempat Tidur'])->nullable();
                $table->tinyInteger('aktifitas_nilai')->nullable();
                $table->enum('mobilitas', ['Bebas Bergerak', 'Agar Terbatas', 'Sangat Terbatas', 'Tidak Mampu Bergerak'])->nullable();
                $table->tinyInteger('mobilitas_nilai')->nullable();
                $table->enum('inkontinensia', ['Kontinen', 'Kadang-kadang Inkontinensia Urine', 'Selalu Inkontenesia Urine', 'Inkontinensia Alvi Dan Urine'])->nullable();
                $table->tinyInteger('inkontinensia_nilai')->nullable();
                $table->tinyInteger('totalnilai')->nullable();
                $table->enum('kategorinilai', ['Risiko Rendah', 'Risiko Sedang', 'Risiko Tinggi'])->nullable();
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
        Schema::dropIfExists('penilaian_risiko_dekubitus');
    }
};
