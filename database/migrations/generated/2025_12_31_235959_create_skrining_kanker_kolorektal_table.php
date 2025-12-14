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
        if (! Schema::hasTable('skrining_kanker_kolorektal')) {
            Schema::create('skrining_kanker_kolorektal', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('nip', 20)->index('nip');
                $table->enum('riwayat_polip_adenomatosa', ['Tidak', 'Ya'])->nullable();
                $table->enum('riwayat_bab_berdarah', ['Tidak', 'Ya'])->nullable();
                $table->enum('riwayat_reseksi_kuratif', ['Tidak', 'Ya'])->nullable();
                $table->enum('colok_dubur', ['Tidak', 'Ya'])->nullable();
                $table->enum('riwayat_kolorektal_keluarga', ['Tidak', 'Ya'])->nullable();
                $table->enum('darah_samar_feses', ['Tidak', 'Ya'])->nullable();
                $table->enum('rujuk_faskes_lanjut', ['Tidak', 'Ya'])->nullable();
                $table->enum('kesimpulan', ['Normal', 'Suspek'])->nullable();
                $table->string('keterangan_kesimpulan', 100)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_kanker_kolorektal');
    }
};
