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
        if (!Schema::hasTable('audit_penanganan_darah')) {
            Schema::create('audit_penanganan_darah', function (Blueprint $table) {
                $table->dateTime('tanggal');
                $table->string('id_ruang', 5)->index('id_ruang');
                $table->enum('menggunakan_apd_waktu_membuang_darah', ['Ya', 'Tidak'])->nullable();
                $table->enum('komponen_darah_tidak_ada_dilantai', ['Ya', 'Tidak'])->nullable();
                $table->enum('membuang_darah_pada_tempat_ditentukan', ['Ya', 'Tidak'])->nullable();
                $table->enum('pembersihan_areal_tumbahan_darah', ['Ya', 'Tidak'])->nullable();
                $table->enum('apd_dibuang_di_limbah_infeksius', ['Ya', 'Tidak'])->nullable();
                $table->enum('melakukan_kebersihan_tangan_setelah_prosedur', ['Ya', 'Tidak'])->nullable();

                $table->primary(['tanggal', 'id_ruang']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_penanganan_darah');
    }
};
