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
        if (! Schema::hasTable('master_berkas_pegawai')) {
            Schema::create('master_berkas_pegawai', function (Blueprint $table) {
                $table->string('kode', 10)->primary();
                $table->enum('kategori', ['Tenaga klinis Dokter Umum', 'Tenaga klinis Dokter Spesialis', 'Tenaga klinis Perawat dan Bidan', 'Tenaga klinis Profesi Lain', 'Tenaga Non Klinis']);
                $table->string('nama_berkas', 300);
                $table->tinyInteger('no_urut');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_berkas_pegawai');
    }
};
