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
        if (!Schema::hasTable('surat_penolakan_anjuran_medis')) {
            Schema::create('surat_penolakan_anjuran_medis', function (Blueprint $table) {
                $table->string('no_surat', 20)->primary();
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->dateTime('tanggal');
                $table->enum('hubungan', ['Suami', 'Istri', 'Anak', 'Ayah', 'Ibu', 'Saudara', 'Keponakan', 'Adik', 'Kakak', 'Orang Tua', 'Diri Sendiri', '-']);
                $table->string('nama_pj', 50);
                $table->string('umur_pj', 3);
                $table->string('no_ktppj', 20);
                $table->enum('jkpj', ['L', 'P']);
                $table->string('no_telp', 30);
                $table->string('kode_penolakan', 3)->nullable()->index('kode_penolakan');
                $table->string('alasan_penolakan', 60)->nullable();
                $table->string('informasi_risiko_penolakan', 100)->nullable();
                $table->string('nik', 20)->index('nik');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_penolakan_anjuran_medis');
    }
};
