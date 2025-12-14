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
        if (! Schema::hasTable('audit_pembuangan_benda_tajam')) {
            Schema::create('audit_pembuangan_benda_tajam', function (Blueprint $table) {
                $table->dateTime('tanggal');
                $table->string('id_ruang', 5)->index('id_ruang');
                $table->enum('setiap_injeksi_needle_langsung_dimasukkan_safety_box', ['Ya', 'Tidak'])->nullable();
                $table->enum('setiap_pemasangan_iv_canula_langsung_dimasukkan_safety_box', ['Ya', 'Tidak'])->nullable();
                $table->enum('setiap_benda_tajam_jarum_dimasukkan_safety_box', ['Ya', 'Tidak'])->nullable();
                $table->enum('safety_box_tigaperempat_diganti', ['Ya', 'Tidak'])->nullable();
                $table->enum('safety_box_keadaan_bersih', ['Ya', 'Tidak'])->nullable();
                $table->enum('saftey_box_tertutup_setelah_digunakan', ['Ya', 'Tidak'])->nullable();

                $table->primary(['tanggal', 'id_ruang']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_pembuangan_benda_tajam');
    }
};
