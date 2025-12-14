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
        if (! Schema::hasTable('pcare_rujuk_subspesialis')) {
            Schema::create('pcare_rujuk_subspesialis', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->string('noKunjungan', 40)->nullable();
                $table->date('tglDaftar')->nullable();
                $table->string('no_rkm_medis', 15)->nullable();
                $table->string('nm_pasien', 40)->nullable();
                $table->string('noKartu', 25)->nullable();
                $table->char('kdPoli', 5)->nullable();
                $table->string('nmPoli', 50)->nullable();
                $table->string('keluhan', 400)->nullable();
                $table->string('kdSadar', 5)->nullable();
                $table->string('nmSadar', 50)->nullable();
                $table->string('sistole', 3)->nullable();
                $table->string('diastole', 3)->nullable();
                $table->string('beratBadan', 5)->nullable();
                $table->string('tinggiBadan', 5)->nullable();
                $table->string('respRate', 3)->nullable();
                $table->string('heartRate', 3)->nullable();
                $table->string('lingkarPerut', 5);
                $table->string('terapi', 2000)->nullable();
                $table->string('kdStatusPulang', 5)->nullable();
                $table->string('nmStatusPulang', 50)->nullable();
                $table->date('tglPulang')->nullable();
                $table->string('kdDokter', 20)->nullable();
                $table->string('nmDokter', 50)->nullable();
                $table->string('kdDiag1', 10)->nullable();
                $table->string('nmDiag1', 400)->nullable();
                $table->string('kdDiag2', 10)->nullable();
                $table->string('nmDiag2', 400)->nullable();
                $table->string('kdDiag3', 10)->nullable();
                $table->string('nmDiag3', 400)->nullable();
                $table->date('tglEstRujuk')->nullable();
                $table->string('kdPPK', 15)->nullable();
                $table->string('nmPPK', 100);
                $table->string('kdSubSpesialis', 5)->nullable();
                $table->string('nmSubSpesialis', 50)->nullable();
                $table->char('kdSarana', 5)->nullable();
                $table->string('nmSarana', 50)->nullable();
                $table->char('kdTACC', 5)->nullable();
                $table->string('nmTACC', 50)->nullable();
                $table->string('alasanTACC', 400)->nullable();
                $table->string('KdAlergiMakanan', 5);
                $table->string('NmAlergiMakanan', 50);
                $table->string('KdAlergiUdara', 5);
                $table->string('NmAlergiUdara', 50);
                $table->string('KdAlergiObat', 5);
                $table->string('NmAlergiObat', 50);
                $table->string('KdPrognosa', 5);
                $table->string('NmPrognosa', 100);
                $table->string('terapi_non_obat', 2000);
                $table->string('bmhp', 2000);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pcare_rujuk_subspesialis');
    }
};
