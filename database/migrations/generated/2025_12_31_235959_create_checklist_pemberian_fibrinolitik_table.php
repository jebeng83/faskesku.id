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
        if (! Schema::hasTable('checklist_pemberian_fibrinolitik')) {
            Schema::create('checklist_pemberian_fibrinolitik', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('nip', 20)->index('nip');
                $table->enum('kontra_indikasi1', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_kontra_indikasi1', 30)->nullable();
                $table->enum('kontra_indikasi2', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_kontra_indikasi2', 30)->nullable();
                $table->enum('kontra_indikasi3', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_kontra_indikasi3', 30)->nullable();
                $table->enum('kontra_indikasi4', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_kontra_indikasi4', 30)->nullable();
                $table->enum('kontra_indikasi5', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_kontra_indikasi5', 30)->nullable();
                $table->enum('kontra_indikasi6', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_kontra_indikasi6', 30)->nullable();
                $table->enum('kontra_indikasi7', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_kontra_indikasi7', 30)->nullable();
                $table->enum('kontra_indikasi8', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_kontra_indikasi8', 30)->nullable();
                $table->enum('kontra_indikasi9', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_kontra_indikasi9', 30)->nullable();
                $table->enum('kontra_indikasi10', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_kontra_indikasi10', 30)->nullable();
                $table->enum('risiko_tinggi1', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_risiko_tinggi1', 30)->nullable();
                $table->enum('risiko_tinggi2', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_risiko_tinggi2', 30)->nullable();
                $table->enum('risiko_tinggi3', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_risiko_tinggi3', 30)->nullable();
                $table->enum('risiko_tinggi4', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_risiko_tinggi4', 30)->nullable();
                $table->enum('risiko_tinggi5', ['Tidak', 'Ya'])->nullable();
                $table->string('keterangan_risiko_tinggi5', 30)->nullable();
                $table->string('kesimpulan', 150)->nullable();
                $table->string('persyaratan_ekg_pre_streptase', 80)->nullable();
                $table->string('persyaratan_ekg_post_streptase', 80)->nullable();
                $table->string('cek_troponin', 80)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checklist_pemberian_fibrinolitik');
    }
};
