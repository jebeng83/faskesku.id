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
        if (! Schema::hasTable('penilaian_fisioterapi')) {
            Schema::create('penilaian_fisioterapi', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('informasi', ['Autoanamnesis', 'Alloanamnesis']);
                $table->string('keluhan_utama', 150)->default('\'\'');
                $table->string('rps', 100)->default('\'\'');
                $table->string('rpd', 100);
                $table->string('td', 8)->default('');
                $table->string('hr', 5)->default('');
                $table->string('rr', 5);
                $table->string('suhu', 5)->default('');
                $table->string('nyeri_tekan', 5);
                $table->string('nyeri_gerak', 5);
                $table->string('nyeri_diam', 5);
                $table->string('palpasi', 50);
                $table->string('luas_gerak_sendi', 50);
                $table->string('kekuatan_otot', 50);
                $table->string('statis', 50);
                $table->string('dinamis', 50);
                $table->string('kognitif', 50);
                $table->string('auskultasi', 50);
                $table->enum('alat_bantu', ['Tidak', 'Ya']);
                $table->string('ket_bantu', 50)->default('');
                $table->enum('prothesa', ['Tidak', 'Ya']);
                $table->string('ket_pro', 50);
                $table->enum('deformitas', ['Tidak', 'Ya']);
                $table->string('ket_deformitas', 50);
                $table->enum('resikojatuh', ['Tidak', 'Ya']);
                $table->string('ket_resikojatuh', 50);
                $table->enum('adl', ['Mandiri', 'Dibantu']);
                $table->string('lainlain_fungsional', 70);
                $table->text('ket_fisik');
                $table->string('pemeriksaan_musculoskeletal', 200);
                $table->string('pemeriksaan_neuromuscular', 200);
                $table->string('pemeriksaan_cardiopulmonal', 200);
                $table->string('pemeriksaan_integument', 200);
                $table->string('pengukuran_musculoskeletal', 200);
                $table->string('pengukuran_neuromuscular', 200);
                $table->string('pengukuran_cardiopulmonal', 200);
                $table->string('pengukuran_integument', 200);
                $table->string('penunjang', 500);
                $table->string('diagnosis_fisio', 100);
                $table->string('rencana_terapi', 200);
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_fisioterapi');
    }
};
