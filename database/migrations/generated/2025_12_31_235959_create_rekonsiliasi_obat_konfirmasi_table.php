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
        if (! Schema::hasTable('rekonsiliasi_obat_konfirmasi')) {
            Schema::create('rekonsiliasi_obat_konfirmasi', function (Blueprint $table) {
                $table->string('no_rekonsiliasi', 20)->primary();
                $table->dateTime('diterima_farmasi')->nullable();
                $table->dateTime('dikonfirmasi_apoteker')->nullable();
                $table->string('nip', 20)->nullable()->index('nip');
                $table->dateTime('diserahkan_pasien')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekonsiliasi_obat_konfirmasi');
    }
};
