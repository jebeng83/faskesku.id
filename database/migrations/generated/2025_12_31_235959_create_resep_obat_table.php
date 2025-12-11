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
        if (!Schema::hasTable('resep_obat')) {
            Schema::create('resep_obat', function (Blueprint $table) {
                $table->string('no_resep', 14)->default('')->primary();
                $table->date('tgl_perawatan')->nullable();
                $table->time('jam');
                $table->string('no_rawat', 17)->default('')->index('no_rawat');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->date('tgl_peresepan')->nullable()->index('tgl_peresepan');
                $table->time('jam_peresepan')->nullable();
                $table->enum('status', ['ralan', 'ranap'])->nullable()->index('status');
                $table->date('tgl_penyerahan');
                $table->time('jam_penyerahan');

                $table->index(['no_resep', 'no_rawat'], 'idx_resep_obat_noresep_rawat');
                $table->index(['tgl_peresepan', 'status'], 'idx_resep_obat_peresepan_status');
                $table->index(['no_rawat', 'kd_dokter'], 'idx_resep_obat_rawat_dokter');
                $table->index(['tgl_peresepan', 'status', 'jam_peresepan'], 'idx_resep_tgl_status_jam');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resep_obat');
    }
};
