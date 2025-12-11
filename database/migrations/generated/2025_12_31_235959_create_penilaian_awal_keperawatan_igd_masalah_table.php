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
        if (!Schema::hasTable('penilaian_awal_keperawatan_igd_masalah')) {
            Schema::create('penilaian_awal_keperawatan_igd_masalah', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->string('kode_masalah', 3)->index('kode_masalah');

                $table->primary(['no_rawat', 'kode_masalah']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_awal_keperawatan_igd_masalah');
    }
};
