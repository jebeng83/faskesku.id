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
        if (! Schema::hasTable('skrining_thalassemia')) {
            Schema::create('skrining_thalassemia', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('nip', 20)->index('nip');
                $table->enum('transfusi_darah', ['Tidak', 'Ya'])->nullable();
                $table->enum('rutin_transfusi', ['Tidak', 'Ya'])->nullable();
                $table->enum('saudara_thalassemia', ['Tidak', 'Ya'])->nullable();
                $table->enum('tumbuh_kembang_terlambat', ['Tidak', 'Ya'])->nullable();
                $table->enum('anemia', ['Tidak', 'Ya'])->nullable();
                $table->enum('ikterus', ['Tidak', 'Ya'])->nullable();
                $table->enum('perut_buncit', ['Tidak', 'Ya'])->nullable();
                $table->enum('gizi_kurang', ['Tidak', 'Ya'])->nullable();
                $table->enum('facies_cooley', ['Tidak', 'Ya'])->nullable();
                $table->enum('perawakan_pendek', ['Tidak', 'Ya'])->nullable();
                $table->enum('hiperpigmentasi_kulit', ['Tidak', 'Ya'])->nullable();
                $table->enum('hemoglobin', ['Normal', '< 11 mg/dl'])->nullable();
                $table->enum('mvc', ['Normal', '< 80 fl'])->nullable();
                $table->enum('mchc', ['Normal', '< 27 pq'])->nullable();
                $table->enum('darah_tepi', ['Normal', '< 100.000 mm3'])->nullable();
                $table->string('tindak_lanjut', 300)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_thalassemia');
    }
};
