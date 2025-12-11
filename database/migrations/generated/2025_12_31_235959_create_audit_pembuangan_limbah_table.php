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
        if (!Schema::hasTable('audit_pembuangan_limbah')) {
            Schema::create('audit_pembuangan_limbah', function (Blueprint $table) {
                $table->dateTime('tanggal');
                $table->string('id_ruang', 5)->index('id_ruang');
                $table->enum('pemisahan_limbah_oleh_penghasil_limbah', ['Ya', 'Tidak'])->nullable();
                $table->enum('limbah_infeksius_dimasukkan_kantong_kuning', ['Ya', 'Tidak'])->nullable();
                $table->enum('limbah_noninfeksius_dimasukkan_kantong_hitam', ['Ya', 'Tidak'])->nullable();
                $table->enum('limbah_tigaperempat_diikat', ['Ya', 'Tidak'])->nullable();
                $table->enum('limbah_segera_dibawa_kepembuangan_sementara', ['Ya', 'Tidak'])->nullable();
                $table->enum('kotak_sampah_dalam_kondisi_bersih', ['Ya', 'Tidak'])->nullable();
                $table->enum('pembersihan_tempat_sampah_dengan_desinfekten', ['Ya', 'Tidak'])->nullable();
                $table->enum('pembersihan_penampungan_sementara_dengan_desinfekten', ['Ya', 'Tidak'])->nullable();

                $table->primary(['tanggal', 'id_ruang']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_pembuangan_limbah');
    }
};
