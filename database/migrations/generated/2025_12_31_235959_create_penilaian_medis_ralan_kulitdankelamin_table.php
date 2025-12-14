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
        if (! Schema::hasTable('penilaian_medis_ralan_kulitdankelamin')) {
            Schema::create('penilaian_medis_ralan_kulitdankelamin', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->enum('anamnesis', ['Autoanamnesis', 'Alloanamnesis']);
                $table->string('hubungan', 30);
                $table->string('keluhan_utama', 2000)->default('');
                $table->string('rps', 2000);
                $table->string('rpd', 1000)->default('');
                $table->string('rpo', 1000);
                $table->string('rpk', 50)->default('');
                $table->enum('kesadaran', ['Compos Mentis', 'Apatis', 'Delirum']);
                $table->string('status', 15);
                $table->string('td', 8)->default('');
                $table->string('nadi', 5)->default('');
                $table->string('suhu', 5);
                $table->string('rr', 5)->default('');
                $table->string('bb', 5);
                $table->string('nyeri', 50)->default('');
                $table->string('gcs', 10);
                $table->string('statusderma', 1000);
                $table->string('pemeriksaan', 100);
                $table->string('diagnosis', 500);
                $table->string('diagnosis2', 500);
                $table->string('permasalahan', 500);
                $table->string('terapi', 500);
                $table->string('tindakan', 100);
                $table->string('edukasi', 500);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_medis_ralan_kulitdankelamin');
    }
};
