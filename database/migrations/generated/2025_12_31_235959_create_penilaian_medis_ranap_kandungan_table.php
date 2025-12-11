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
        if (!Schema::hasTable('penilaian_medis_ranap_kandungan')) {
            Schema::create('penilaian_medis_ranap_kandungan', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->enum('anamnesis', ['Autoanamnesis', 'Alloanamnesis']);
                $table->string('hubungan', 100);
                $table->string('keluhan_utama', 2000)->default('');
                $table->string('rps', 2000);
                $table->string('rpd', 1000)->default('');
                $table->string('rpk', 1000);
                $table->string('rpo', 1000);
                $table->string('alergi', 100)->default('');
                $table->enum('keadaan', ['Sehat', 'Sakit Ringan', 'Sakit Sedang', 'Sakit Berat']);
                $table->string('gcs', 10);
                $table->enum('kesadaran', ['Compos Mentis', 'Apatis', 'Somnolen', 'Sopor', 'Koma']);
                $table->string('td', 8)->default('');
                $table->string('nadi', 5)->default('');
                $table->string('rr', 5);
                $table->string('suhu', 5)->default('');
                $table->string('spo', 5);
                $table->string('bb', 5)->default('');
                $table->string('tb', 5)->default('');
                $table->enum('kepala', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('mata', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('gigi', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('tht', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('thoraks', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('jantung', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('paru', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('abdomen', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('genital', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('ekstremitas', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('kulit', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->text('ket_fisik');
                $table->string('tfu', 10);
                $table->string('tbj', 10);
                $table->string('his', 10);
                $table->enum('kontraksi', ['Ada', 'Tidak']);
                $table->string('djj', 10);
                $table->text('inspeksi');
                $table->text('inspekulo');
                $table->text('vt');
                $table->text('rt');
                $table->text('ultra');
                $table->text('kardio');
                $table->text('lab');
                $table->string('diagnosis', 500);
                $table->text('tata');
                $table->string('edukasi', 1000);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_medis_ranap_kandungan');
    }
};
