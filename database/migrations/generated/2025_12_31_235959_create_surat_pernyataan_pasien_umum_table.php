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
        if (! Schema::hasTable('surat_pernyataan_pasien_umum')) {
            Schema::create('surat_pernyataan_pasien_umum', function (Blueprint $table) {
                $table->string('no_surat', 20)->primary();
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tanggal');
                $table->string('nama_pj', 50);
                $table->string('no_ktppj', 20);
                $table->string('tempat_lahirpj', 20);
                $table->date('lahirpj');
                $table->enum('jkpj', ['L', 'P']);
                $table->string('alamatpj', 100);
                $table->enum('hubungan', ['Suami', 'Istri', 'Anak', 'Ayah', 'Ibu', 'Saudara', 'Keponakan']);
                $table->string('no_telp', 30);
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_pernyataan_pasien_umum');
    }
};
