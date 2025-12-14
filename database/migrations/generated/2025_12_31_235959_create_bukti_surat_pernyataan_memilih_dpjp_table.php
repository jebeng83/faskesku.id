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
        if (! Schema::hasTable('bukti_surat_pernyataan_memilih_dpjp')) {
            Schema::create('bukti_surat_pernyataan_memilih_dpjp', function (Blueprint $table) {
                $table->string('no_pernyataan', 20)->primary();
                $table->string('photo', 500)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bukti_surat_pernyataan_memilih_dpjp');
    }
};
