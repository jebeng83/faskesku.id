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
        if (!Schema::hasTable('pemantauan_pews_anak')) {
            Schema::create('pemantauan_pews_anak', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('parameter_perilaku', ['Sadar / Bermain', 'Tidur / Perubahan Perilaku', 'Gelisah', 'Tidak Merespon Terhadap Nyeri Penurunan Kesadaran'])->nullable();
                $table->string('skor_perilaku', 1)->nullable();
                $table->enum('parameter_crt_atau_warna_kulit', ['1 - 2 dtk / Pink', '3 dtk / Pucat', '4 dtk / Sianosis', '>=5 dtk / Mottle'])->nullable();
                $table->string('skor_crt_atau_warna_kulit', 1)->nullable();
                $table->enum('parameter_perespirasi', ['Tidak Ada Retraksi', 'Cuping Hidung / O2 1-3 Lpm', 'Retraksi Dada / O2 4-6 Lpm', 'Stridor / O2 7-8 Lpm'])->nullable();
                $table->string('skor_perespirasi', 1)->nullable();
                $table->string('skor_total', 1)->nullable();
                $table->string('parameter_total', 250)->nullable();
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
        Schema::dropIfExists('pemantauan_pews_anak');
    }
};
