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
        if (!Schema::hasTable('skrining_instrumen_acrs')) {
            Schema::create('skrining_instrumen_acrs', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('nip', 20)->index('nip');
                $table->enum('pernyataanacrs1', ['Tidak Pernah', 'Kadang-kadang', 'Sering', 'Selalu'])->nullable();
                $table->tinyInteger('nilai_acrs1')->nullable();
                $table->enum('pernyataanacrs2', ['Tidak Pernah', 'Kadang-kadang', 'Sering', 'Selalu'])->nullable();
                $table->tinyInteger('nilai_acrs2')->nullable();
                $table->enum('pernyataanacrs3', ['Tidak Pernah', 'Kadang-kadang', 'Sering', 'Selalu'])->nullable();
                $table->tinyInteger('nilai_acrs3')->nullable();
                $table->enum('pernyataanacrs4', ['Tidak Pernah', 'Kadang-kadang', 'Sering', 'Selalu'])->nullable();
                $table->tinyInteger('nilai_acrs4')->nullable();
                $table->enum('pernyataanacrs5', ['Tidak Pernah', 'Kadang-kadang', 'Sering', 'Selalu'])->nullable();
                $table->tinyInteger('nilai_acrs5')->nullable();
                $table->enum('pernyataanacrs6', ['Tidak Pernah', 'Kadang-kadang', 'Sering', 'Selalu'])->nullable();
                $table->tinyInteger('nilai_acrs6')->nullable();
                $table->enum('pernyataanacrs7', ['Tidak Pernah', 'Kadang-kadang', 'Sering', 'Selalu'])->nullable();
                $table->tinyInteger('nilai_acrs7')->nullable();
                $table->enum('pernyataanacrs8', ['Tidak Pernah', 'Kadang-kadang', 'Sering', 'Selalu'])->nullable();
                $table->tinyInteger('nilai_acrs8')->nullable();
                $table->enum('pernyataanacrs9', ['Tidak Pernah', 'Kadang-kadang', 'Sering', 'Selalu'])->nullable();
                $table->tinyInteger('nilai_acrs9')->nullable();
                $table->enum('pernyataanacrs10', ['Tidak Pernah', 'Kadang-kadang', 'Sering', 'Selalu'])->nullable();
                $table->tinyInteger('nilai_acrs10')->nullable();
                $table->tinyInteger('nilai_total_acrs')->nullable();
                $table->string('kesimpulan', 100)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_instrumen_acrs');
    }
};
