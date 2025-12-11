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
        if (!Schema::hasTable('skp_rekapitulasi_penilaian')) {
            Schema::create('skp_rekapitulasi_penilaian', function (Blueprint $table) {
                $table->string('nomor_rekapitulasi', 20)->primary();
                $table->string('skp_pertama', 5)->nullable();
                $table->string('skp_kedua', 5)->nullable();
                $table->string('skp_ketiga', 5)->nullable();
                $table->string('skp_keempat', 5)->nullable();
                $table->string('skp_kelima', 5)->nullable();
                $table->string('skp_keenam', 5)->nullable();
                $table->string('kesimpulan', 200)->nullable();
                $table->string('rekomendasi', 200)->nullable();
                $table->dateTime('tanggal');
                $table->string('nik_penilai', 20)->index('nik_penilai');
                $table->string('nik_dinilai', 20)->index('nik_dinilai');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skp_rekapitulasi_penilaian');
    }
};
