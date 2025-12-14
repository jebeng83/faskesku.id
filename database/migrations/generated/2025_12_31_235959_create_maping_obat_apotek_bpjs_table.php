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
        if (! Schema::hasTable('maping_obat_apotek_bpjs')) {
            Schema::create('maping_obat_apotek_bpjs', function (Blueprint $table) {
                $table->string('kode_brng', 15)->index('kode_brng');
                $table->string('kode_brng_apotek_bpjs', 15)->primary();
                $table->string('nama_brng_apotek_bpjs', 80)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maping_obat_apotek_bpjs');
    }
};
