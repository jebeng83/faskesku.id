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
        if (!Schema::hasTable('surat_bebas_tbc')) {
            Schema::create('surat_bebas_tbc', function (Blueprint $table) {
                $table->string('no_surat', 25)->primary();
                $table->string('no_rawat', 17)->nullable()->index('no_rawat');
                $table->date('tanggalsurat')->nullable();
                $table->string('kd_dokter', 20)->nullable()->index('kd_dokter');
                $table->string('keperluan', 50)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_bebas_tbc');
    }
};
