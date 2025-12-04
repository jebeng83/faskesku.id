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
        if (!Schema::hasTable('retensi_pasien')) {
            Schema::create('retensi_pasien', function (Blueprint $table) {
                $table->string('no_rkm_medis', 15)->nullable()->index('no_rkm_medis');
                $table->date('terakhir_daftar')->nullable();
                $table->date('tgl_retensi')->nullable();
                $table->string('lokasi_pdf', 500)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('retensi_pasien');
    }
};
