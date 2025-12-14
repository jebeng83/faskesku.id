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
        if (! Schema::hasTable('diagnosa_corona')) {
            Schema::create('diagnosa_corona', function (Blueprint $table) {
                $table->string('no_rkm_medis', 15);
                $table->string('kode_icd', 10);
                $table->string('nama_penyakit', 200)->nullable();
                $table->enum('status', ['Primer', 'Sekunder'])->nullable();

                $table->primary(['no_rkm_medis', 'kode_icd']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diagnosa_corona');
    }
};
