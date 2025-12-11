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
        if (!Schema::hasTable('data_triase_igdprimer')) {
            Schema::create('data_triase_igdprimer', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->string('keluhan_utama', 400);
                $table->enum('kebutuhan_khusus', ['-', 'UPPA', 'Airborne', 'Dekontaminan']);
                $table->string('catatan', 100);
                $table->enum('plan', ['Ruang Resusitasi', 'Ruang Kritis']);
                $table->dateTime('tanggaltriase');
                $table->string('nik', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_triase_igdprimer');
    }
};
