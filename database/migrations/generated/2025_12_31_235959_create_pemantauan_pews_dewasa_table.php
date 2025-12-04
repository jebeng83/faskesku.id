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
        if (!Schema::hasTable('pemantauan_pews_dewasa')) {
            Schema::create('pemantauan_pews_dewasa', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('parameter_laju_respirasi', ['<= 5', '6 - 8', '9 - 11', '12 - 20', '21 - 24', '25 - 34', '>= 35'])->nullable();
                $table->string('skor_laju_respirasi', 1)->nullable();
                $table->enum('parameter_saturasi_oksigen', ['>= 95', '94 - 95', '92 - 93', '<= 92'])->nullable();
                $table->string('skor_saturasi_oksigen', 1)->nullable();
                $table->enum('parameter_suplemen_oksigen', ['Ya', 'Tidak'])->nullable();
                $table->string('skor_suplemen_oksigen', 1)->nullable();
                $table->enum('parameter_tekanan_darah_sistolik', ['>= 220', '181 - 220', '111 - 180', '101 - 110', '91 - 100', '71 - 90', '<= 70'])->nullable();
                $table->string('skor_tekanan_darah_sistolik', 1)->nullable();
                $table->enum('parameter_laju_jantung', ['>= 140', '131 - 140', '111 - 130', '91 - 110', '51 - 90', '41 - 50', '<= 40'])->nullable();
                $table->string('skor_laju_jantung', 1)->nullable();
                $table->enum('parameter_kesadaran', ['Sadar', 'Nyeri/Verbal', 'Unrespon'])->nullable();
                $table->string('skor_kesadaran', 1)->nullable();
                $table->enum('parameter_temperatur', ['<= 35', '35.1 - 36', '36.1 - 38', '38.1 - 39', '>= 39'])->nullable();
                $table->string('skor_temperatur', 1)->nullable();
                $table->string('skor_total', 2)->nullable();
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
        Schema::dropIfExists('pemantauan_pews_dewasa');
    }
};
