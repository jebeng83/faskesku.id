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
        if (! Schema::hasTable('skrining_diabetes_melitus')) {
            Schema::create('skrining_diabetes_melitus', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('nip', 20)->index('nip');
                $table->enum('anamnesis1', ['Ya', 'Tidak'])->nullable();
                $table->enum('anamnesis2', ['Ya', 'Tidak'])->nullable();
                $table->enum('anamnesis3', ['Ya', 'Tidak'])->nullable();
                $table->enum('anamnesis4', ['Ya', 'Tidak'])->nullable();
                $table->enum('anamnesis5', ['Ya', 'Tidak'])->nullable();
                $table->enum('anamnesis6', ['Ya', 'Tidak'])->nullable();
                $table->enum('anamnesis7', ['Ya', 'Tidak'])->nullable();
                $table->enum('anamnesis8', ['Ya', 'Tidak'])->nullable();
                $table->enum('anamnesis9', ['Ya', 'Tidak'])->nullable();
                $table->enum('anamnesis10', ['Ya', 'Tidak'])->nullable();
                $table->enum('anamnesis11', ['Ya', 'Tidak'])->nullable();
                $table->enum('anamnesis12', ['Ya', 'Tidak'])->nullable();
                $table->string('berat_badan', 6)->nullable();
                $table->string('tinggi_badan', 8)->nullable();
                $table->string('imt', 6)->nullable();
                $table->enum('kasifikasi_imt', ['Berat Badan Kurang', 'Berat Badan Normal', 'Kelebihan Berat Badan', 'Obesitas I', 'Obesitas II'])->nullable();
                $table->string('hasil_gds', 10)->nullable();
                $table->string('keterangan_gds', 50)->nullable();
                $table->string('hasil_gdp', 10)->nullable();
                $table->string('keterangan_gdp', 50)->nullable();
                $table->enum('hasil_skrining', ['Normal', 'Suspek'])->nullable();
                $table->string('keterangan_skrining', 60)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_diabetes_melitus');
    }
};
