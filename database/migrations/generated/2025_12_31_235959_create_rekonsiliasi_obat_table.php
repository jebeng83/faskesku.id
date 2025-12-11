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
        if (!Schema::hasTable('rekonsiliasi_obat')) {
            Schema::create('rekonsiliasi_obat', function (Blueprint $table) {
                $table->string('no_rekonsiliasi', 20)->primary();
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->dateTime('tanggal_wawancara');
                $table->enum('rekonsiliasi_obat_saat', ['Admisi', 'Transfer Antar Ruang', 'Pindah Faskes Lain', 'Pulang'])->nullable();
                $table->string('alergi_obat', 70)->nullable();
                $table->string('manifestasi_alergi', 70)->nullable();
                $table->enum('dampak_alergi', ['-', 'Ringan', 'Sedang', 'Berat'])->nullable();
                $table->string('nip', 20)->nullable()->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekonsiliasi_obat');
    }
};
