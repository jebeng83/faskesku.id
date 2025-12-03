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
        if (! Schema::hasTable('reg_periksa')) {
            Schema::create('reg_periksa', function (Blueprint $table) {
                $table->string('no_reg', 8)->primary();
                $table->string('no_rawat', 17)->unique();
                $table->date('tgl_registrasi');
                $table->time('jam_reg');
                $table->string('kd_dokter', 20);
                $table->string('no_rkm_medis', 15);
                $table->char('kd_poli', 5);
                $table->string('p_jawab', 100);
                $table->string('almt_pj', 200);
                $table->string('hubunganpj', 20);
                $table->double('biaya_reg');
                $table->enum('stts', ['Belum', 'Sudah', 'Batal', 'Berkas Diterima', 'Dirujuk', 'Meninggal', 'Dirawat', 'Pulang Paksa']);
                $table->enum('stts_daftar', ['-', 'Lama', 'Baru']);
                $table->enum('status_lanjut', ['Ralan', 'Ranap']);
                $table->char('kd_pj', 3);
                $table->integer('umurdaftar');
                $table->enum('sttsumur', ['Th', 'Bl', 'Hr']);
                $table->enum('status_bayar', ['Sudah Bayar', 'Belum Bayar']);
                $table->enum('status_poli', ['Lama', 'Baru']);
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reg_periksa');
    }
};
