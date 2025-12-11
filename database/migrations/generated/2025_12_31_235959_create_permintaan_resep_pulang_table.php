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
        if (!Schema::hasTable('permintaan_resep_pulang')) {
            Schema::create('permintaan_resep_pulang', function (Blueprint $table) {
                $table->string('no_permintaan', 14)->default('')->primary();
                $table->date('tgl_permintaan')->nullable();
                $table->time('jam');
                $table->string('no_rawat', 17)->default('')->index('no_rawat');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->enum('status', ['Sudah', 'Belum']);
                $table->date('tgl_validasi');
                $table->time('jam_validasi');

                $table->unique(['tgl_permintaan', 'jam', 'no_rawat'], 'tgl_permintaan');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permintaan_resep_pulang');
    }
};
