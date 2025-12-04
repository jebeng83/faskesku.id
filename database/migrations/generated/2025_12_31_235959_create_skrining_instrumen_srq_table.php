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
        if (!Schema::hasTable('skrining_instrumen_srq')) {
            Schema::create('skrining_instrumen_srq', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('nip', 20)->index('nip');
                $table->enum('pernyataansrq1', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq1')->nullable();
                $table->enum('pernyataansrq2', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq2')->nullable();
                $table->enum('pernyataansrq3', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq3')->nullable();
                $table->enum('pernyataansrq4', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq4')->nullable();
                $table->enum('pernyataansrq5', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq5')->nullable();
                $table->enum('pernyataansrq6', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq6')->nullable();
                $table->enum('pernyataansrq7', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq7')->nullable();
                $table->enum('pernyataansrq8', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq8')->nullable();
                $table->enum('pernyataansrq9', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq9')->nullable();
                $table->enum('pernyataansrq10', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq10')->nullable();
                $table->enum('pernyataansrq11', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq11')->nullable();
                $table->enum('pernyataansrq12', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq12')->nullable();
                $table->enum('pernyataansrq13', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq13')->nullable();
                $table->enum('pernyataansrq14', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq14')->nullable();
                $table->enum('pernyataansrq15', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq15')->nullable();
                $table->enum('pernyataansrq16', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq16')->nullable();
                $table->enum('pernyataansrq17', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq17')->nullable();
                $table->enum('pernyataansrq18', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq18')->nullable();
                $table->enum('pernyataansrq19', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq19')->nullable();
                $table->enum('pernyataansrq20', ['Tidak', 'Ya'])->nullable();
                $table->tinyInteger('nilai_srq20')->nullable();
                $table->tinyInteger('nilai_total_srq')->nullable();
                $table->string('kesimpulan', 100)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_instrumen_srq');
    }
};
