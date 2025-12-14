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
        if (! Schema::hasTable('pemantauan_meows_obstetri')) {
            Schema::create('pemantauan_meows_obstetri', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('parameter_pernapasan', ['>= 30', '21 - 30', '11 - 20', '< 12'])->nullable();
                $table->string('skor_pernapasan', 1)->nullable();
                $table->enum('parameter_saturasi', ['> 95', '90 - 94', '< 90'])->nullable();
                $table->string('skor_saturasi', 1)->nullable();
                $table->enum('parameter_temperatur', ['> 38', '35 - 35.9', '36 - 37.9', '< 35'])->nullable();
                $table->string('skor_temperatur', 1)->nullable();
                $table->enum('parameter_tekanan_darah_sistole', ['> 160', '150 - 159', '100 - 140', '90 - 99', '< 90'])->nullable();
                $table->string('skor_tekanan_darah_sistole', 1)->nullable();
                $table->enum('parameter_tekanan_darah_diastole', ['> 110', '90 - 109', '< 90'])->nullable();
                $table->string('skor_tekanan_darah_diastole', 1)->nullable();
                $table->enum('parameter_denyut_jantung', ['> 120', '100 - 120', '51 - 99', '40 - 50', '< 40'])->nullable();
                $table->string('skor_denyut_jantung', 1)->nullable();
                $table->enum('parameter_kesadaran', ['Alert', 'Verbal', 'Pain', 'Unresponsive'])->nullable();
                $table->string('skor_kesadaran', 1)->nullable();
                $table->enum('parameter_ketuban', ['Khas', 'Busuk'])->nullable();
                $table->string('skor_ketuban', 1)->nullable();
                $table->enum('parameter_discharge', ['Normal', 'Banyak'])->nullable();
                $table->string('skor_discharge', 1)->nullable();
                $table->enum('parameter_proteinuria', ['Negatif', '+', '++>'])->nullable();
                $table->string('skor_proteinuria', 1)->nullable();
                $table->string('skor_total', 2);
                $table->string('parameter_total', 250)->nullable();
                $table->enum('code_blue', ['Ya', 'Tidak']);
                $table->string('nip', 20)->nullable()->index('nip');

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemantauan_meows_obstetri');
    }
};
