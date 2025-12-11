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
        if (!Schema::hasTable('skp_detail_penilaian')) {
            Schema::create('skp_detail_penilaian', function (Blueprint $table) {
                $table->string('nomor_penilaian', 20)->index('nomor_penilaian');
                $table->string('kode_kriteria', 10);
                $table->enum('skala_penilaian', ['Ya', 'Tidak'])->nullable();

                $table->primary(['kode_kriteria', 'nomor_penilaian']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skp_detail_penilaian');
    }
};
