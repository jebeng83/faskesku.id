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
        if (!Schema::hasTable('pasien_bayi')) {
            Schema::create('pasien_bayi', function (Blueprint $table) {
                $table->string('no_rkm_medis', 15)->primary();
                $table->string('umur_ibu', 8)->index('umur_ibu');
                $table->string('nama_ayah', 50);
                $table->string('umur_ayah', 8)->index('umur_ayah');
                $table->string('berat_badan', 10)->index('berat_badan');
                $table->string('panjang_badan', 10)->index('panjang_badan');
                $table->string('lingkar_kepala', 10)->index('lingkar_kepala');
                $table->string('proses_lahir', 60)->index('proses_lahir');
                $table->char('anakke', 2)->index('anakke');
                $table->time('jam_lahir')->index('jam_lahir');
                $table->string('keterangan', 50)->index('keterangan');
                $table->string('diagnosa', 60)->nullable();
                $table->string('penyulit_kehamilan', 60)->nullable();
                $table->string('ketuban', 60)->nullable();
                $table->string('lingkar_perut', 10)->nullable();
                $table->string('lingkar_dada', 10)->nullable();
                $table->string('penolong', 20)->nullable()->index('penolong');
                $table->string('no_skl', 30)->nullable()->unique('no_skl');
                $table->string('g', 10);
                $table->string('p', 10);
                $table->string('a', 10);
                $table->string('f1', 1);
                $table->string('u1', 1);
                $table->string('t1', 1);
                $table->string('r1', 1);
                $table->string('w1', 1);
                $table->string('n1', 20);
                $table->string('f5', 1);
                $table->string('u5', 1);
                $table->string('t5', 1);
                $table->string('r5', 1);
                $table->string('w5', 1);
                $table->string('n5', 2);
                $table->string('f10', 1);
                $table->string('u10', 1);
                $table->string('t10', 1);
                $table->string('r10', 1);
                $table->string('w10', 1);
                $table->string('n10', 2);
                $table->string('resusitas', 100);
                $table->string('obat_diberikan', 300);
                $table->string('mikasi', 100);
                $table->string('mikonium', 100);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pasien_bayi');
    }
};
