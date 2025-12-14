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
        if (! Schema::hasTable('skp_penilaian')) {
            Schema::create('skp_penilaian', function (Blueprint $table) {
                $table->string('nomor_penilaian', 20)->primary();
                $table->string('nik_dinilai', 20)->nullable()->index('nik_dinilai');
                $table->string('nik_penilai', 20)->nullable()->index('nik_penilai');
                $table->dateTime('tanggal')->nullable();
                $table->string('keterangan', 100)->nullable();
                $table->enum('status', ['Proses Penilaian', 'Keluar Hasil'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skp_penilaian');
    }
};
