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
        if (!Schema::hasTable('bayar_periksa_radiologi')) {
            Schema::create('bayar_periksa_radiologi', function (Blueprint $table) {
                $table->string('no_bayar', 30)->default('')->index('no_bayar');
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->string('kd_jenis_prw', 15)->index('kd_jenis_prw');
                $table->date('tgl_periksa');
                $table->time('jam');
                $table->double('tarif_tindakan_dokter');

                $table->primary(['no_rawat', 'kd_jenis_prw', 'no_bayar', 'tgl_periksa', 'jam']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bayar_periksa_radiologi');
    }
};
