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
        if (! Schema::hasTable('penilaian_medis_ralan_rehab_medik')) {
            Schema::create('penilaian_medis_ralan_rehab_medik', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->nullable()->index('kd_dokter');
                $table->enum('anamnesis', ['Autoanamnesis', 'Alloanamnesis'])->nullable();
                $table->string('hubungan', 30)->nullable();
                $table->string('keluhan_utama', 2000)->nullable()->default('');
                $table->string('rps', 2000)->nullable();
                $table->string('rpd', 1000)->nullable()->default('');
                $table->string('alergi', 50)->nullable()->default('');
                $table->enum('kesadaran', ['Compos Mentis', 'Apatis', 'Delirum'])->nullable();
                $table->enum('nyeri', ['Tidak Nyeri', 'Nyeri Sedang', 'Nyeri Sangat Hebat'])->nullable();
                $table->enum('skala_nyeri', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])->nullable();
                $table->string('td', 8)->nullable()->default('');
                $table->string('nadi', 5)->nullable()->default('');
                $table->string('suhu', 5)->nullable();
                $table->string('rr', 5)->nullable()->default('');
                $table->string('bb', 5)->nullable();
                $table->enum('kepala', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_kepala', 30)->nullable();
                $table->enum('thoraks', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_thoraks', 30)->nullable();
                $table->enum('abdomen', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_abdomen', 30)->nullable();
                $table->enum('ekstremitas', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_ekstremitas', 30)->nullable();
                $table->enum('columna', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_columna', 30)->nullable();
                $table->enum('muskulos', ['Normal', 'Abnormal', 'Tidak Diperiksa'])->nullable();
                $table->string('keterangan_muskulos', 30)->nullable();
                $table->string('lainnya', 1000)->nullable();
                $table->enum('resiko_jatuh', ['Tidak Berisiko', 'Berisiko Sedang', 'Berisiko Tinggi'])->nullable();
                $table->enum('resiko_nutrisional', ['Tidak Berisiko Malnutrisi', 'Berisiko Malnutrisi', 'Malnutrisi'])->nullable();
                $table->enum('kebutuhan_fungsional', ['Tidak Perlu Bantuan', 'Perlu Bantuan', 'Perlu Bantuan Total'])->nullable();
                $table->string('diagnosa_medis', 500)->nullable();
                $table->string('diagnosa_fungsi', 500)->nullable();
                $table->string('penunjang_lain', 500)->nullable();
                $table->string('fisio', 100)->nullable();
                $table->string('okupasi', 100)->nullable();
                $table->string('wicara', 100)->nullable();
                $table->string('akupuntur', 100)->nullable();
                $table->string('tatalain', 100)->nullable();
                $table->string('frekuensi_terapi', 40)->nullable();
                $table->date('fisioterapi');
                $table->date('terapi_okupasi');
                $table->date('terapi_wicara');
                $table->date('terapi_akupuntur');
                $table->date('terapi_lainnya');
                $table->string('edukasi', 500)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_medis_ralan_rehab_medik');
    }
};
