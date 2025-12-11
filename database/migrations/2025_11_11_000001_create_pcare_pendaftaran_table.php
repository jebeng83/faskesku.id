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
        // Jika tabel sudah ada di database, jangan buat ulang
        if (Schema::hasTable('pcare_pendaftaran')) {
            return;
        }

        Schema::create('pcare_pendaftaran', function (Blueprint $table) {
            // Match requested schema (no default id)
            $table->engine = 'InnoDB';
            $table->charset = 'latin1';
            $table->collation = 'latin1_swedish_ci';

            $table->string('no_rawat', 17);
            $table->date('tglDaftar');
            $table->string('no_rkm_medis', 15);
            $table->string('nm_pasien', 40);
            $table->string('kdProviderPeserta', 15);
            $table->string('noKartu', 25);
            $table->string('kdPoli', 5);
            $table->string('nmPoli', 50);
            $table->string('keluhan', 400);
            $table->enum('kunjSakit', ['Kunjungan Sakit', 'Kunjungan Sehat']);
            $table->string('sistole', 3);
            $table->string('diastole', 3);
            $table->string('beratBadan', 5);
            $table->string('tinggiBadan', 5);
            $table->string('respRate', 3);
            $table->string('lingkar_perut', 5);
            $table->string('heartRate', 3);
            $table->string('rujukBalik', 3);
            $table->enum('kdTkp', ['10 Rawat Jalan', '20 Rawat Inap', '50 Promotif Preventif']);
            $table->string('noUrut', 5);
            $table->enum('status', ['Terkirim', 'Gagal']);

            // Foreign key
            $table->foreign('no_rawat')
                ->references('no_rawat')
                ->on('reg_periksa')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pcare_pendaftaran');
    }
};
