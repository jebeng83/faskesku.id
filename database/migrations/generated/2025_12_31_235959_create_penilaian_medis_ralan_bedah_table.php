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
        if (! Schema::hasTable('penilaian_medis_ralan_bedah')) {
            Schema::create('penilaian_medis_ralan_bedah', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->enum('anamnesis', ['Autoanamnesis', 'Alloanamnesis']);
                $table->string('hubungan', 30);
                $table->string('keluhan_utama', 2000)->default('');
                $table->string('rps', 2000);
                $table->string('rpd', 1000)->default('');
                $table->string('rpo', 1000);
                $table->string('alergi', 50)->default('');
                $table->enum('kesadaran', ['Compos Mentis', 'Apatis', 'Delirum']);
                $table->string('status', 50);
                $table->string('td', 8)->default('');
                $table->string('nadi', 5)->default('');
                $table->string('suhu', 5);
                $table->string('rr', 5)->default('');
                $table->string('bb', 5);
                $table->string('nyeri', 5)->default('');
                $table->string('gcs', 10);
                $table->enum('kepala', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('thoraks', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('abdomen', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('ekstremitas', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('genetalia', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('columna', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->enum('muskulos', ['Normal', 'Abnormal', 'Tidak Diperiksa']);
                $table->string('lainnya', 1000);
                $table->text('ket_lokalis');
                $table->string('lab', 500);
                $table->string('rad', 500);
                $table->string('pemeriksaan', 500);
                $table->string('diagnosis', 500);
                $table->string('diagnosis2', 500);
                $table->string('permasalahan', 500);
                $table->string('terapi', 500);
                $table->string('tindakan', 500);
                $table->string('edukasi', 500);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_medis_ralan_bedah');
    }
};
