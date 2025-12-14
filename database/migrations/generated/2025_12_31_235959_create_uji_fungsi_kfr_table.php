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
        if (! Schema::hasTable('uji_fungsi_kfr')) {
            Schema::create('uji_fungsi_kfr', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal')->nullable();
                $table->string('diagnosis_fungsional', 50)->nullable();
                $table->string('diagnosis_medis', 50)->nullable();
                $table->string('hasil_didapat', 100)->nullable();
                $table->string('kesimpulan', 100)->nullable();
                $table->string('rekomedasi', 100)->nullable();
                $table->string('kd_dokter', 20)->nullable()->index('kd_dokter');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('uji_fungsi_kfr');
    }
};
