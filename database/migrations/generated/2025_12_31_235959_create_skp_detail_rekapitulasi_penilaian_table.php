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
        if (!Schema::hasTable('skp_detail_rekapitulasi_penilaian')) {
            Schema::create('skp_detail_rekapitulasi_penilaian', function (Blueprint $table) {
                $table->string('nomor_rekapitulasi', 20);
                $table->string('nomor_penilaian', 20)->index('nomor_penilaian');

                $table->primary(['nomor_rekapitulasi', 'nomor_penilaian']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skp_detail_rekapitulasi_penilaian');
    }
};
