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
        if (! Schema::hasTable('detail_periksa_labpa_gambar')) {
            Schema::create('detail_periksa_labpa_gambar', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->string('kd_jenis_prw', 15)->index('kd_jenis_prw');
                $table->date('tgl_periksa');
                $table->time('jam');
                $table->string('photo', 500)->nullable();

                $table->primary(['no_rawat', 'kd_jenis_prw', 'tgl_periksa', 'jam']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_periksa_labpa_gambar');
    }
};
