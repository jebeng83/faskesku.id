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
        if (! Schema::hasTable('resep_luar')) {
            Schema::create('resep_luar', function (Blueprint $table) {
                $table->string('no_resep', 14)->default('')->primary();
                $table->date('tgl_perawatan')->nullable();
                $table->time('jam');
                $table->string('no_rawat', 17)->default('')->index('no_rawat');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->date('tgl_peresepan')->nullable();
                $table->time('jam_peresepan')->nullable();

                $table->unique(['tgl_perawatan', 'jam', 'no_rawat'], 'tgl_perawatan');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resep_luar');
    }
};
