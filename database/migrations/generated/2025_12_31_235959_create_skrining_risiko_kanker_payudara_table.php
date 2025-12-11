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
        if (!Schema::hasTable('skrining_risiko_kanker_payudara')) {
            Schema::create('skrining_risiko_kanker_payudara', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('faktor_risiko_awal1', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_awal1', 1)->nullable();
                $table->enum('faktor_risiko_awal2', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_awal2', 1)->nullable();
                $table->enum('faktor_risiko_awal3', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_awal3', 1)->nullable();
                $table->enum('faktor_risiko_awal4', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_awal4', 1)->nullable();
                $table->enum('faktor_risiko_awal5', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_awal5', 1)->nullable();
                $table->enum('faktor_risiko_awal6', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_awal6', 1)->nullable();
                $table->enum('faktor_risiko_awal7', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_awal7', 1)->nullable();
                $table->enum('faktor_risiko_awal8', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_awal8', 1)->nullable();
                $table->enum('faktor_risiko_awal9', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_awal9', 1)->nullable();
                $table->enum('faktor_risiko_awal10', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_awal10', 1)->nullable();
                $table->enum('faktor_risiko_awal11', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_awal11', 1)->nullable();
                $table->enum('faktor_risiko_awal12', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_awal12', 1)->nullable();
                $table->enum('faktor_risiko_awal13', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_awal13', 1)->nullable();
                $table->enum('faktor_risiko_awal14', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_awal14', 1)->nullable();
                $table->enum('faktor_risiko_tinggi1', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_tinggi1', 1)->nullable();
                $table->enum('faktor_risiko_tinggi2', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_tinggi2', 1)->nullable();
                $table->enum('faktor_risiko_tinggi3', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_tinggi3', 1)->nullable();
                $table->enum('faktor_risiko_tinggi4', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_tinggi4', 1)->nullable();
                $table->enum('faktor_risiko_tinggi5', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_tinggi5', 1)->nullable();
                $table->enum('faktor_risiko_tinggi6', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_tinggi6', 1)->nullable();
                $table->enum('faktor_risiko_tinggi7', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_tinggi7', 1)->nullable();
                $table->enum('faktor_risiko_tinggi8', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_tinggi8', 1)->nullable();
                $table->enum('faktor_risiko_tinggi9', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_tinggi9', 1)->nullable();
                $table->enum('faktor_risiko_tinggi10', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_tinggi10', 1)->nullable();
                $table->enum('faktor_risiko_tinggi11', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_tinggi11', 1)->nullable();
                $table->enum('faktor_risiko_tinggi12', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_tinggi12', 1)->nullable();
                $table->enum('faktor_risiko_tinggi13', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_risiko_tinggi13', 1)->nullable();
                $table->enum('faktor_kecurigaan_ganas1', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_kecurigaan_ganas1', 2)->nullable();
                $table->enum('faktor_kecurigaan_ganas2', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_kecurigaan_ganas2', 2)->nullable();
                $table->enum('faktor_kecurigaan_ganas3', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_kecurigaan_ganas3', 2)->nullable();
                $table->enum('faktor_kecurigaan_ganas4', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_kecurigaan_ganas4', 2)->nullable();
                $table->enum('faktor_kecurigaan_ganas5', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_kecurigaan_ganas5', 2)->nullable();
                $table->enum('faktor_kecurigaan_ganas6', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_kecurigaan_ganas6', 2)->nullable();
                $table->enum('faktor_kecurigaan_ganas7', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_kecurigaan_ganas7', 2)->nullable();
                $table->enum('faktor_kecurigaan_ganas8', ['Ya', 'Tidak'])->nullable();
                $table->string('nilai_kecurigaan_ganas8', 2)->nullable();
                $table->string('total_skor', 3)->nullable();
                $table->enum('hasil_sadanis', ['Benjolan', 'Tidak Ada Benjolan', 'Curiga Kanker'])->nullable();
                $table->enum('tindak_lanjut_sadanis', ['Dirujuk', 'Tidak Dirujuk'])->nullable();
                $table->enum('hasil_skrining', ['Normal', 'Kemungkinan Kelainan Payudara Jinak', 'Curiga Kelainan Payudara Ganas'])->nullable();
                $table->string('keterangan', 50);
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_risiko_kanker_payudara');
    }
};
