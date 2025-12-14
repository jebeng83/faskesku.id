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
        if (! Schema::hasTable('surat_persetujuan_umum')) {
            Schema::create('surat_persetujuan_umum', function (Blueprint $table) {
                $table->string('no_surat', 20)->primary();
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tanggal');
                $table->enum('pengobatan_kepada', ['Suami', 'Istri', 'Anak', 'Ayah', 'Ibu', 'Saudara', 'Keponakan', 'Adik', 'Kakak', 'Orang Tua', 'Diri Sendiri', '-']);
                $table->string('nilai_kepercayaan', 50);
                $table->string('nama_pj', 50);
                $table->string('umur_pj', 7);
                $table->string('no_ktppj', 20);
                $table->enum('jkpj', ['L', 'P']);
                $table->enum('bertindak_atas', ['Suami', 'Istri', 'Anak', 'Ayah', 'Saudara', 'Keponakan', 'Cucu', 'Kakek', 'Nenek', 'Kakak', 'Adik', 'Diri Sendiri', 'Ibu']);
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
        Schema::dropIfExists('surat_persetujuan_umum');
    }
};
