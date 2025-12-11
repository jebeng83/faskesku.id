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
        if (!Schema::hasTable('surat_pernyataan_pasien_umum_pembuat_pernyataan')) {
            Schema::create('surat_pernyataan_pasien_umum_pembuat_pernyataan', function (Blueprint $table) {
                $table->string('no_surat', 20)->primary();
                $table->string('photo', 500)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_pernyataan_pasien_umum_pembuat_pernyataan');
    }
};
