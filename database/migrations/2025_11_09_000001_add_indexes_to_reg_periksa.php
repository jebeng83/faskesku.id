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
        if (Schema::hasTable('reg_periksa')) {
            Schema::table('reg_periksa', function (Blueprint $table) {
                // Single-column index on tgl_registrasi for common date filters
                $table->index('tgl_registrasi', 'idx_reg_periksa_tgl');

                // Composite indexes to accelerate typical filters used in controllers
                $table->index(['tgl_registrasi', 'kd_dokter'], 'idx_reg_periksa_tgl_kd_dokter');
                $table->index(['tgl_registrasi', 'kd_poli'], 'idx_reg_periksa_tgl_kd_poli');

                // Ordering and lookup by patient history
                $table->index(['no_rkm_medis', 'tgl_registrasi', 'jam_reg'], 'idx_reg_periksa_norm_tgl_jam');
                $table->index(['tgl_registrasi', 'jam_reg'], 'idx_reg_periksa_tgl_jam');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('reg_periksa')) {
            Schema::table('reg_periksa', function (Blueprint $table) {
                // Drop indexes by their names
                $table->dropIndex('idx_reg_periksa_tgl');
                $table->dropIndex('idx_reg_periksa_tgl_kd_dokter');
                $table->dropIndex('idx_reg_periksa_tgl_kd_poli');
                $table->dropIndex('idx_reg_periksa_norm_tgl_jam');
                $table->dropIndex('idx_reg_periksa_tgl_jam');
            });
        }
    }
};