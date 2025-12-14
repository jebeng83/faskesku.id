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
        if (! Schema::hasTable('surat_persetujuan_pemeriksaan_hiv')) {
            Schema::create('surat_persetujuan_pemeriksaan_hiv', function (Blueprint $table) {
                $table->string('no_surat', 20)->primary();
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tanggal');
                $table->string('nik', 20)->index('nik');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_persetujuan_pemeriksaan_hiv');
    }
};
