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
        if (!Schema::hasTable('penilaian_medis_ralan_bedah_mulut')) {
            Schema::create('penilaian_medis_ralan_bedah_mulut', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->enum('anamnesis', ['Autoanamnesis', 'Alloanamnesis']);
                $table->string('hubungan', 30);
                $table->string('keluhan_utama', 2000)->default('');
                $table->string('rps', 2000);
                $table->string('rpk', 1000);
                $table->string('alergi', 50)->default('');
                $table->enum('keadaan', ['Baik', 'Sedang', 'Lemah', 'Buruk']);
                $table->enum('kesadaran', ['Compos Mentis', 'Apatis', 'Somnolen', 'Sopor', 'Koma']);
                $table->enum('nyeri', ['Tidak Nyeri', 'Nyeri Ringan', 'Nyeri Sedang', 'Nyeri Berat', 'Nyeri Sangat Berat', 'Nyeri Tak Tertahankan']);
                $table->string('td', 8)->default('');
                $table->string('nadi', 5)->default('');
                $table->string('suhu', 5);
                $table->string('rr', 5)->default('');
                $table->string('bb', 5);
                $table->string('tb', 5);
                $table->string('status_nutrisi', 50)->default('');
                $table->enum('kulit', ['Tidak', 'Ya']);
                $table->string('keterangan_kulit', 30);
                $table->enum('kepala', ['Tidak', 'Ya']);
                $table->string('keterangan_kepala', 30);
                $table->enum('mata', ['Tidak', 'Ya']);
                $table->string('keterangan_mata', 30);
                $table->enum('leher', ['Tidak', 'Ya']);
                $table->string('keterangan_leher', 30);
                $table->enum('kelenjar', ['Tidak', 'Ya']);
                $table->string('keterangan_kelenjar', 30);
                $table->enum('dada', ['Tidak', 'Ya']);
                $table->string('keterangan_dada', 30);
                $table->enum('perut', ['Tidak', 'Ya']);
                $table->string('keterangan_perut', 30);
                $table->enum('ekstremitas', ['Tidak', 'Ya']);
                $table->string('keterangan_ekstremitas', 30);
                $table->string('wajah', 1000);
                $table->string('intra', 1000);
                $table->string('gigigeligi', 1000);
                $table->string('lab', 300);
                $table->string('rad', 300);
                $table->string('penunjang', 300);
                $table->string('diagnosis', 500);
                $table->string('diagnosis2', 500);
                $table->string('permasalahan', 1000);
                $table->string('terapi', 1000);
                $table->string('tindakan', 1000);
                $table->string('edukasi', 1000);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_medis_ralan_bedah_mulut');
    }
};
