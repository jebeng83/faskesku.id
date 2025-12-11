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
        if (!Schema::hasTable('pemeriksaan_ralan')) {
            Schema::create('pemeriksaan_ralan', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tgl_perawatan');
                $table->time('jam_rawat');
                $table->string('suhu_tubuh', 5)->nullable();
                $table->string('tensi', 8);
                $table->string('nadi', 3)->nullable();
                $table->string('respirasi', 3)->nullable();
                $table->string('tinggi', 5)->nullable();
                $table->string('berat', 5)->nullable();
                $table->string('spo2', 3);
                $table->string('gcs', 10)->nullable();
                $table->enum('kesadaran', ['Compos Mentis', 'Somnolence', 'Sopor', 'Coma', 'Alert', 'Confusion', 'Voice', 'Pain', 'Unresponsive', 'Apatis', 'Delirium']);
                $table->string('keluhan', 2000)->nullable();
                $table->string('pemeriksaan', 2000)->nullable();
                $table->string('alergi', 80)->nullable();
                $table->string('lingkar_perut', 5)->nullable();
                $table->string('rtl', 2000);
                $table->string('penilaian', 2000);
                $table->string('instruksi', 2000);
                $table->string('evaluasi', 2000);
                $table->string('nip', 20)->index('nip');

                $table->primary(['no_rawat', 'tgl_perawatan', 'jam_rawat']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemeriksaan_ralan');
    }
};
