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
        if (! Schema::hasTable('rekonsiliasi_obat_detail_obat')) {
            Schema::create('rekonsiliasi_obat_detail_obat', function (Blueprint $table) {
                $table->string('no_rekonsiliasi', 20)->nullable()->index('no_rekonsiliasi');
                $table->string('nama_obat', 100)->nullable();
                $table->string('dosis_obat', 20)->nullable();
                $table->string('frekuensi', 10)->nullable();
                $table->string('cara_pemberian', 150)->nullable();
                $table->string('waktu_pemberian_terakhir', 20)->nullable();
                $table->enum('tindak_lanjut', ['Lanjut', 'Stop'])->nullable();
                $table->string('perubahan_aturan_pakai', 150)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekonsiliasi_obat_detail_obat');
    }
};
