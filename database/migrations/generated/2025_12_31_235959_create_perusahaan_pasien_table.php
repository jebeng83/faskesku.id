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
        if (! Schema::hasTable('perusahaan_pasien')) {
            Schema::create('perusahaan_pasien', function (Blueprint $table) {
                $table->string('kode_perusahaan', 8)->primary();
                $table->string('nama_perusahaan', 70)->nullable();
                $table->string('alamat', 100)->nullable();
                $table->string('kota', 40)->nullable();
                $table->string('no_telp', 27)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perusahaan_pasien');
    }
};
