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
        if (!Schema::hasTable('catatan_pengkajian_paska_operasi')) {
            Schema::create('catatan_pengkajian_paska_operasi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('rawat_paska_operasi', 250)->nullable();
                $table->string('cairan', 500)->nullable();
                $table->string('antibiotika', 500)->nullable();
                $table->string('analgetika', 500)->nullable();
                $table->string('medikamentosa_lain', 500)->nullable();
                $table->string('diet', 500)->nullable();
                $table->string('pemeriksaan_laborat', 500)->nullable();
                $table->string('tranfusi', 250)->nullable();
                $table->string('lainlain', 500)->nullable();

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_pengkajian_paska_operasi');
    }
};
