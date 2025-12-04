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
        if (!Schema::hasTable('audit_cuci_tangan_medis')) {
            Schema::create('audit_cuci_tangan_medis', function (Blueprint $table) {
                $table->dateTime('tanggal');
                $table->string('nik', 20)->index('nik');
                $table->enum('sebelum_menyentuh_pasien', ['Ya', 'Tidak'])->nullable();
                $table->enum('sebelum_tehnik_aseptik', ['Ya', 'Tidak'])->nullable();
                $table->enum('setelah_terpapar_cairan_tubuh_pasien', ['Ya', 'Tidak'])->nullable();
                $table->enum('setelah_kontak_dengan_pasien', ['Ya', 'Tidak'])->nullable();
                $table->enum('setelah_kontak_dengan_lingkungan_pasien', ['Ya', 'Tidak'])->nullable();

                $table->primary(['tanggal', 'nik']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_cuci_tangan_medis');
    }
};
