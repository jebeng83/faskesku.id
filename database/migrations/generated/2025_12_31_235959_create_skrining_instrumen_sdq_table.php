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
        if (! Schema::hasTable('skrining_instrumen_sdq')) {
            Schema::create('skrining_instrumen_sdq', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('nip', 20)->index('nip');
                $table->enum('pernyataansdq1', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq1')->nullable();
                $table->enum('pernyataansdq2', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq2')->nullable();
                $table->enum('pernyataansdq3', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq3')->nullable();
                $table->enum('pernyataansdq4', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq4')->nullable();
                $table->enum('pernyataansdq5', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq5')->nullable();
                $table->enum('pernyataansdq6', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq6')->nullable();
                $table->enum('pernyataansdq7', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq7')->nullable();
                $table->enum('pernyataansdq8', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq8')->nullable();
                $table->enum('pernyataansdq9', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq9')->nullable();
                $table->enum('pernyataansdq10', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq10')->nullable();
                $table->enum('pernyataansdq11', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq11')->nullable();
                $table->enum('pernyataansdq12', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq12')->nullable();
                $table->enum('pernyataansdq13', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq13')->nullable();
                $table->enum('pernyataansdq14', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq14')->nullable();
                $table->enum('pernyataansdq15', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq15')->nullable();
                $table->enum('pernyataansdq16', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq16')->nullable();
                $table->enum('pernyataansdq17', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq17')->nullable();
                $table->enum('pernyataansdq18', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq18')->nullable();
                $table->enum('pernyataansdq19', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq19')->nullable();
                $table->enum('pernyataansdq20', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq20')->nullable();
                $table->enum('pernyataansdq21', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq21')->nullable();
                $table->enum('pernyataansdq22', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq22')->nullable();
                $table->enum('pernyataansdq23', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq23')->nullable();
                $table->enum('pernyataansdq24', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq24')->nullable();
                $table->enum('pernyataansdq25', ['Tidak Benar', 'Agak Benar', 'Selalu Benar'])->nullable();
                $table->tinyInteger('nilai_sdq25')->nullable();
                $table->tinyInteger('nilai_total_sdq')->nullable();
                $table->enum('gejala_emosional', ['Abnormal', 'Ambang/Boderline', 'Normal'])->nullable();
                $table->tinyInteger('nilai_gejala_emosional')->nullable();
                $table->enum('masalah_perilaku', ['Abnormal', 'Ambang/Boderline', 'Normal'])->nullable();
                $table->tinyInteger('nilai_masalah_perilaku')->nullable();
                $table->enum('hiperaktivitas', ['Abnormal', 'Ambang/Boderline', 'Normal'])->nullable();
                $table->tinyInteger('nilai_hiperaktivitas')->nullable();
                $table->enum('teman_sebaya', ['Abnormal', 'Ambang/Boderline', 'Normal'])->nullable();
                $table->tinyInteger('nilai_teman_sebaya')->nullable();
                $table->enum('kekuatan', ['Abnormal', 'Ambang/Boderline', 'Normal'])->nullable();
                $table->tinyInteger('nilai_kekuatan')->nullable();
                $table->enum('kesulitan', ['Abnormal', 'Ambang/Boderline', 'Normal'])->nullable();
                $table->tinyInteger('nilai_kesulitan')->nullable();
                $table->string('keterangan', 200)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_instrumen_sdq');
    }
};
