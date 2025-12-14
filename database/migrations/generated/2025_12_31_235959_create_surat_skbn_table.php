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
        if (! Schema::hasTable('surat_skbn')) {
            Schema::create('surat_skbn', function (Blueprint $table) {
                $table->string('no_surat', 25)->primary();
                $table->string('no_rawat', 17)->nullable()->default('')->index('no_rawat');
                $table->date('tanggalsurat')->nullable();
                $table->enum('kategori', ['UMUM', 'POLRI', 'TNI'])->nullable()->default('UMUM');
                $table->string('kd_dokter', 20)->nullable()->default('')->index('kd_dokter');
                $table->string('keperluan', 300)->nullable();
                $table->enum('opiat', ['NEGATIF', 'POSITIF'])->nullable()->default('NEGATIF');
                $table->enum('ganja', ['NEGATIF', 'POSITIF'])->nullable()->default('NEGATIF');
                $table->enum('amphetamin', ['NEGATIF', 'POSITIF'])->nullable()->default('NEGATIF');
                $table->enum('methamphetamin', ['NEGATIF', 'POSITIF'])->nullable()->default('NEGATIF');
                $table->enum('benzodiazepin', ['NEGATIF', 'POSITIF'])->nullable()->default('NEGATIF');
                $table->enum('cocain', ['NEGATIF', 'POSITIF'])->nullable()->default('NEGATIF');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_skbn');
    }
};
