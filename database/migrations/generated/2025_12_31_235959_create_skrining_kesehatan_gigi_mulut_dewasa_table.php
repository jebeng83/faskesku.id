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
        if (! Schema::hasTable('skrining_kesehatan_gigi_mulut_dewasa')) {
            Schema::create('skrining_kesehatan_gigi_mulut_dewasa', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('kontrol_gigi', ['Ya', 'Tidak'])->nullable();
                $table->enum('gigi_bungsu_tumbuh', ['Ya', 'Tidak'])->nullable();
                $table->enum('gigi_hilang', ['Ya', 'Tidak'])->nullable();
                $table->enum('gigi_berlubang', ['Ya', 'Tidak'])->nullable();
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
        Schema::dropIfExists('skrining_kesehatan_gigi_mulut_dewasa');
    }
};
