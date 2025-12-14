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
        if (! Schema::hasTable('pcare_kegiatan_kelompok')) {
            Schema::create('pcare_kegiatan_kelompok', function (Blueprint $table) {
                $table->string('eduId', 15)->primary();
                $table->string('clubId', 5)->nullable();
                $table->string('namaClub', 100);
                $table->date('tglPelayanan')->nullable();
                $table->string('nmKegiatan', 30)->nullable();
                $table->string('nmKelompok', 30)->nullable();
                $table->string('materi', 100)->nullable();
                $table->string('pembicara', 50)->nullable();
                $table->string('lokasi', 50)->nullable();
                $table->string('keterangan', 100)->nullable();
                $table->double('biaya')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pcare_kegiatan_kelompok');
    }
};
