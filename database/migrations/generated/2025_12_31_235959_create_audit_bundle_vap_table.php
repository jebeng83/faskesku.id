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
        if (!Schema::hasTable('audit_bundle_vap')) {
            Schema::create('audit_bundle_vap', function (Blueprint $table) {
                $table->dateTime('tanggal');
                $table->string('id_ruang', 5)->index('id_ruang');
                $table->enum('posisi_kepala', ['Ya', 'Tidak'])->nullable();
                $table->enum('pengkajian_setiap_hari', ['Ya', 'Tidak'])->nullable();
                $table->enum('hand_hygiene', ['Ya', 'Tidak'])->nullable();
                $table->enum('oral_hygiene', ['Ya', 'Tidak'])->nullable();
                $table->enum('suction_manajemen_sekresi', ['Ya', 'Tidak'])->nullable();
                $table->enum('profilaksis_peptic_ulcer', ['Ya', 'Tidak'])->nullable();
                $table->enum('dvt_profiklasisi', ['Ya', 'Tidak'])->nullable();
                $table->enum('penggunaan_apd_sesuai', ['Ya', 'Tidak'])->nullable();

                $table->primary(['tanggal', 'id_ruang']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_bundle_vap');
    }
};
