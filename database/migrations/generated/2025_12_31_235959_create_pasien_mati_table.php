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
        if (! Schema::hasTable('pasien_mati')) {
            Schema::create('pasien_mati', function (Blueprint $table) {
                $table->date('tanggal')->nullable();
                $table->time('jam')->nullable();
                $table->string('no_rkm_medis', 15)->default('')->primary();
                $table->string('keterangan', 100)->nullable();
                $table->enum('temp_meninggal', ['-', 'Rumah Sakit', 'Puskesmas', 'Rumah Bersalin', 'Rumah Tempat Tinggal', 'Lain-lain (Termasuk Doa)', 'Tidak tahu'])->nullable();
                $table->string('icd1', 20)->nullable();
                $table->string('icd2', 20)->nullable();
                $table->string('icd3', 20)->nullable();
                $table->string('icd4', 20)->nullable();
                $table->string('kd_dokter', 20)->index('kd_dokter');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pasien_mati');
    }
};
