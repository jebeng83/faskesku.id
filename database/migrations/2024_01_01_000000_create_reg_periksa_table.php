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
        // Cek apakah tabel sudah ada sebelum membuatnya
        if (!Schema::hasTable('reg_periksa')) {
            Schema::create('reg_periksa', function (Blueprint $table) {
                $table->string('no_reg', 8)->nullable();
                $table->string('no_rawat', 17)->primary();
                $table->date('tgl_registrasi')->nullable();
                $table->time('jam_reg')->nullable();
                $table->string('kd_dokter', 20)->nullable();
                $table->string('no_rkm_medis', 15)->nullable();
                $table->char('kd_poli', 5)->nullable();
                $table->string('p_jawab', 100)->nullable();
                $table->string('almt_pj', 200)->nullable();
                $table->string('hubunganpj', 20)->nullable();
                $table->double('biaya_reg')->nullable();
                $table->enum('stts', ['Belum','Sudah','Batal','Berkas Diterima','Dirujuk','Meninggal','Dirawat','Pulang Paksa'])->nullable();
                $table->enum('stts_daftar', ['-','Lama','Baru'])->default('-');
                $table->enum('status_lanjut', ['Ralan','Ranap'])->default('Ralan');
                $table->char('kd_pj', 3);
                $table->integer('umurdaftar')->nullable();
                $table->enum('sttsumur', ['Th','Bl','Hr'])->nullable();
                $table->enum('status_bayar', ['Sudah Bayar','Belum Bayar'])->default('Belum Bayar');
                $table->enum('status_poli', ['Lama','Baru'])->default('Baru');
                $table->enum('keputusan', ['-','RUJUKAN','PRIORITAS','HIJAU','KUNING','MERAH','HITAM','MJKN','CHECK-IN'])->default('-');
                
                // Indexes
                $table->index('no_rkm_medis');
                $table->index('kd_poli');
                $table->index('kd_pj');
                $table->index('status_lanjut');
                $table->index('kd_dokter');
                $table->index('status_bayar');
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
