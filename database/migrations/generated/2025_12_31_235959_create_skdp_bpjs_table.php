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
        if (!Schema::hasTable('skdp_bpjs')) {
            Schema::create('skdp_bpjs', function (Blueprint $table) {
                $table->year('tahun');
                $table->string('no_rkm_medis', 15)->nullable()->index('no_rkm_medis');
                $table->string('diagnosa', 50);
                $table->string('terapi', 200);
                $table->string('alasan1', 50)->nullable();
                $table->string('alasan2', 50)->nullable();
                $table->string('rtl1', 50)->nullable();
                $table->string('rtl2', 50)->nullable();
                $table->dateTime('tanggal_datang')->nullable();
                $table->dateTime('tanggal_rujukan');
                $table->string('no_antrian', 6);
                $table->string('kd_dokter', 20)->nullable()->index('kd_dokter');
                $table->enum('status', ['Menunggu', 'Sudah Periksa', 'Batal Periksa']);

                $table->primary(['tahun', 'no_antrian']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skdp_bpjs');
    }
};
