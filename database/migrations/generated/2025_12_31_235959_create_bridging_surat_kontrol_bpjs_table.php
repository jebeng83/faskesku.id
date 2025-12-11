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
        if (!Schema::hasTable('bridging_surat_kontrol_bpjs')) {
            Schema::create('bridging_surat_kontrol_bpjs', function (Blueprint $table) {
                $table->string('no_sep', 40)->nullable()->index('bridging_surat_kontrol_bpjs_ibfk_1');
                $table->date('tgl_surat');
                $table->string('no_surat', 40)->primary();
                $table->date('tgl_rencana')->nullable();
                $table->string('kd_dokter_bpjs', 20)->nullable();
                $table->string('nm_dokter_bpjs', 50)->nullable();
                $table->string('kd_poli_bpjs', 15)->nullable();
                $table->string('nm_poli_bpjs', 40)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bridging_surat_kontrol_bpjs');
    }
};
