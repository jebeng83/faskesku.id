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
        if (! Schema::hasTable('konseling_farmasi')) {
            Schema::create('konseling_farmasi', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('diagnosa', 40)->nullable();
                $table->string('obat_pemakaian', 700)->nullable();
                $table->string('riwayat_alergi', 30)->nullable();
                $table->string('keluhan', 300)->nullable();
                $table->enum('pernah_datang', ['Ya', 'Tidak'])->nullable();
                $table->string('tindak_lanjut', 400)->nullable();
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('konseling_farmasi');
    }
};
