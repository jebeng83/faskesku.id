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
        if (! Schema::hasTable('inventaris_sterilisasi_cssd')) {
            Schema::create('inventaris_sterilisasi_cssd', function (Blueprint $table) {
                $table->string('keterangan_strerilisasi', 80);
                $table->string('no_sirkulasi', 20)->primary();
                $table->dateTime('tgl_sterilisasi')->nullable();
                $table->string('nip', 20)->default('')->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris_sterilisasi_cssd');
    }
};
