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
        if (! Schema::hasTable('permintaan_labpa')) {
            Schema::create('permintaan_labpa', function (Blueprint $table) {
                $table->string('noorder', 15)->primary();
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tgl_permintaan');
                $table->time('jam_permintaan');
                $table->date('tgl_sampel');
                $table->time('jam_sampel');
                $table->date('tgl_hasil');
                $table->time('jam_hasil');
                $table->string('dokter_perujuk', 20)->index('dokter_perujuk');
                $table->enum('status', ['ralan', 'ranap']);
                $table->string('informasi_tambahan', 60);
                $table->string('diagnosa_klinis', 80);
                $table->date('pengambilan_bahan')->nullable();
                $table->string('diperoleh_dengan', 40)->nullable();
                $table->string('lokasi_jaringan', 40)->nullable();
                $table->string('diawetkan_dengan', 40)->nullable();
                $table->string('pernah_dilakukan_di', 100)->nullable();
                $table->date('tanggal_pa_sebelumnya')->nullable();
                $table->string('nomor_pa_sebelumnya', 20)->nullable();
                $table->string('diagnosa_pa_sebelumnya', 100)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permintaan_labpa');
    }
};
