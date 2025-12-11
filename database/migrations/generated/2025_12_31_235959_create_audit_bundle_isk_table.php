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
        if (!Schema::hasTable('audit_bundle_isk')) {
            Schema::create('audit_bundle_isk', function (Blueprint $table) {
                $table->dateTime('tanggal');
                $table->string('id_ruang', 5)->index('id_ruang');
                $table->enum('pemasangan_sesuai_indikasi', ['Ya', 'Tidak'])->nullable();
                $table->enum('hand_hygiene', ['Ya', 'Tidak'])->nullable();
                $table->enum('menggunakan_apd_yang_tepat', ['Ya', 'Tidak'])->nullable();
                $table->enum('pemasangan_menggunakan_alat_steril', ['Ya', 'Tidak'])->nullable();
                $table->enum('segera_dilepas_setelah_tidak_diperlukan', ['Ya', 'Tidak'])->nullable();
                $table->enum('pengisian_balon_sesuai_petunjuk', ['Ya', 'Tidak'])->nullable();
                $table->enum('fiksasi_kateter_dengan_plester', ['Ya', 'Tidak'])->nullable();
                $table->enum('urinebag_menggantung_tidak_menyentuh_lantai', ['Ya', 'Tidak'])->nullable();

                $table->primary(['tanggal', 'id_ruang']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_bundle_isk');
    }
};
