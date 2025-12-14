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
        if (! Schema::hasTable('surat_pernyataan_memilih_dpjp')) {
            Schema::create('surat_pernyataan_memilih_dpjp', function (Blueprint $table) {
                $table->string('no_pernyataan', 20)->primary();
                $table->string('no_rawat', 17)->nullable()->index('no_rawat');
                $table->date('tanggal')->nullable();
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('nip', 20)->index('nip');
                $table->string('pembuat_pernyataan', 50);
                $table->string('alamat_pembuat_pernyataan', 100);
                $table->date('tgl_lahir_pembuat_pernyataan');
                $table->enum('jk_pembuat_pernyataan', ['L', 'P']);
                $table->enum('hubungan_pembuat_pernyataan', ['Diri Sendiri', 'Istri', 'Suami', 'Kerabat', 'Orang Tua', 'Anak', 'Saudara Kandung', 'Teman', 'Lain-lain']);
                $table->string('saksi_keluarga', 50);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_pernyataan_memilih_dpjp');
    }
};
