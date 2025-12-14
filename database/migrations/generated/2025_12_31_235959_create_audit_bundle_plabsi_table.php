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
        if (! Schema::hasTable('audit_bundle_plabsi')) {
            Schema::create('audit_bundle_plabsi', function (Blueprint $table) {
                $table->dateTime('tanggal');
                $table->string('id_ruang', 5)->index('id_ruang');
                $table->enum('sebelum_melakukan_hand_hygiene', ['Ya', 'Tidak'])->nullable();
                $table->enum('menggunakan_apd_lengkap', ['Ya', 'Tidak'])->nullable();
                $table->enum('lokasi_pemasangan_sesuai', ['Ya', 'Tidak'])->nullable();
                $table->enum('alat_yang_digunakan_steril', ['Ya', 'Tidak'])->nullable();
                $table->enum('pembersihan_kulit', ['Ya', 'Tidak'])->nullable();
                $table->enum('setelah_melakukan_hand_hygiene', ['Ya', 'Tidak'])->nullable();
                $table->enum('perawatan_dressing_infus', ['Ya', 'Tidak'])->nullable();
                $table->enum('spoit_yang_digunakan_disposible', ['Ya', 'Tidak'])->nullable();
                $table->enum('memberi_tanggal_dan_jam_pemasangan_infus', ['Ya', 'Tidak'])->nullable();
                $table->enum('set_infus_setiap_72jam', ['Ya', 'Tidak'])->nullable();

                $table->primary(['tanggal', 'id_ruang']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_bundle_plabsi');
    }
};
