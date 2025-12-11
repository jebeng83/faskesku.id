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
        if (!Schema::hasTable('jawaban_konsultasi_medik')) {
            Schema::create('jawaban_konsultasi_medik', function (Blueprint $table) {
                $table->string('no_permintaan', 20)->primary();
                $table->dateTime('tanggal');
                $table->string('diagnosa_kerja', 200)->nullable();
                $table->string('uraian_jawaban', 800)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jawaban_konsultasi_medik');
    }
};
