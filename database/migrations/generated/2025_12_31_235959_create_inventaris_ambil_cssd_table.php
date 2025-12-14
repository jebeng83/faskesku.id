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
        if (! Schema::hasTable('inventaris_ambil_cssd')) {
            Schema::create('inventaris_ambil_cssd', function (Blueprint $table) {
                $table->string('keterangan_ambil', 80);
                $table->string('no_sirkulasi', 20)->primary();
                $table->string('no_inventaris', 30)->default('')->index('no_inventaris');
                $table->dateTime('tgl_ambil')->nullable();
                $table->string('nip', 20)->default('')->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris_ambil_cssd');
    }
};
