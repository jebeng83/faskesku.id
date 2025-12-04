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
        if (!Schema::hasTable('pencapaian_kinerja_pegawai')) {
            Schema::create('pencapaian_kinerja_pegawai', function (Blueprint $table) {
                $table->integer('id');
                $table->string('kode_pencapaian', 3)->index('kode_pencapaian');
                $table->year('tahun');
                $table->tinyInteger('bulan');
                $table->string('keterangan', 150)->nullable();

                $table->primary(['id', 'kode_pencapaian', 'tahun', 'bulan']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pencapaian_kinerja_pegawai');
    }
};
