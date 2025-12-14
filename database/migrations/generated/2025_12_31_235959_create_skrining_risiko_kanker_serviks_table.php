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
        if (! Schema::hasTable('skrining_risiko_kanker_serviks')) {
            Schema::create('skrining_risiko_kanker_serviks', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('riwayat_penyakit_keluarga', ['Kanker', 'Benjolan Abnormal Pada Payudara', '-'])->nullable();
                $table->enum('riwayat_penyakit_sendiri', ['Kanker', 'Benjolan Abnormal Pada Payudara', '-'])->nullable();
                $table->enum('risiko_merokok', ['Ya', 'Tidak'])->nullable();
                $table->enum('risiko_kurang_fisik', ['Ya', 'Tidak'])->nullable();
                $table->enum('risiko_gula_berlebihan', ['Ya', 'Tidak'])->nullable();
                $table->enum('risiko_garam_berlebihan', ['Ya', 'Tidak'])->nullable();
                $table->enum('risiko_lemak_berlebihan', ['Ya', 'Tidak'])->nullable();
                $table->enum('risiko_kurang_buah_sayur', ['Ya', 'Tidak'])->nullable();
                $table->enum('risiko_alkohol', ['Ya', 'Tidak'])->nullable();
                $table->enum('hasil_iva', ['Positif', 'Negatif', 'Curiga Kanker'])->nullable();
                $table->string('hasil_skrining', 50)->nullable();
                $table->string('keterangan', 100);
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_risiko_kanker_serviks');
    }
};
