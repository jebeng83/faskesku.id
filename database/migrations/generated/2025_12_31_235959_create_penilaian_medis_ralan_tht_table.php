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
        if (! Schema::hasTable('penilaian_medis_ralan_tht')) {
            Schema::create('penilaian_medis_ralan_tht', function (Blueprint $table) {
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
                $table->string('td', 8)->default('');
                $table->string('nadi', 5)->default('');
                $table->string('rr', 5);
                $table->string('suhu', 5)->default('');
                $table->string('bb', 5)->default('');
                $table->string('tb', 5)->default('');
                $table->string('nyeri', 50);
                $table->string('status_nutrisi', 50);
                $table->text('kondisi');
                $table->text('ket_lokalis');
                $table->text('lab');
                $table->text('rad');
                $table->text('tes_pendengaran');
                $table->text('penunjang');
                $table->string('diagnosis', 500);
                $table->string('diagnosisbanding', 500);
                $table->text('permasalahan');
                $table->text('terapi');
                $table->text('tindakan');
                $table->text('tatalaksana');
                $table->string('edukasi', 1000);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_medis_ralan_tht');
    }
};
