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
        if (! Schema::hasTable('berkas_pegawai')) {
            Schema::create('berkas_pegawai', function (Blueprint $table) {
                $table->string('nik', 20)->index('nik');
                $table->date('tgl_uploud');
                $table->string('kode_berkas', 10)->index('kode_berkas');
                $table->string('berkas', 500);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('berkas_pegawai');
    }
};
