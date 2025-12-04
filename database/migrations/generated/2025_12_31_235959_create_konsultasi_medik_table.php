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
        if (!Schema::hasTable('konsultasi_medik')) {
            Schema::create('konsultasi_medik', function (Blueprint $table) {
                $table->string('no_permintaan', 20)->primary();
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->dateTime('tanggal');
                $table->enum('jenis_permintaan', ['Konsultasi', 'Evaluasi', 'Rawat Bersama', 'Alih Rawat', 'Pre/Post Operasi'])->nullable();
                $table->string('kd_dokter', 20)->nullable()->index('kd_dokter');
                $table->string('kd_dokter_dikonsuli', 20)->nullable()->index('kd_dokter_dikonsuli');
                $table->string('diagnosa_kerja', 200)->nullable();
                $table->string('uraian_konsultasi', 800)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('konsultasi_medik');
    }
};
