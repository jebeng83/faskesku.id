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
        if (! Schema::hasTable('bridging_rujukan_bpjs')) {
            Schema::create('bridging_rujukan_bpjs', function (Blueprint $table) {
                $table->string('no_sep', 40)->index('no_sep');
                $table->date('tglRujukan')->nullable();
                $table->date('tglRencanaKunjungan');
                $table->string('ppkDirujuk', 20)->nullable();
                $table->string('nm_ppkDirujuk', 100)->nullable();
                $table->enum('jnsPelayanan', ['1', '2'])->nullable();
                $table->string('catatan', 200)->nullable();
                $table->string('diagRujukan', 10)->nullable();
                $table->string('nama_diagRujukan', 400)->nullable();
                $table->enum('tipeRujukan', ['0. Penuh', '1. Partial', '2. Rujuk Balik'])->nullable();
                $table->string('poliRujukan', 15)->nullable();
                $table->string('nama_poliRujukan', 50)->nullable();
                $table->string('no_rujukan', 40)->primary();
                $table->string('user', 25)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bridging_rujukan_bpjs');
    }
};
