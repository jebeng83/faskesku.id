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
        if (!Schema::hasTable('signin_sebelum_anestesi')) {
            Schema::create('signin_sebelum_anestesi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->string('sncn', 25);
                $table->string('tindakan', 50);
                $table->string('kd_dokter_bedah', 20)->index('kd_dokter_bedah');
                $table->string('kd_dokter_anestesi', 20)->index('kd_dokter_anestesi');
                $table->enum('identitas', ['Ya', 'Tidak'])->nullable();
                $table->enum('penandaan_area_operasi', ['Ada', 'Tidak Ada', 'Tidak Diperlukan'])->nullable();
                $table->string('alergi', 30)->nullable();
                $table->enum('resiko_aspirasi', ['Ada', 'Tidak Ada'])->nullable();
                $table->string('resiko_aspirasi_rencana_antisipasi', 50)->nullable();
                $table->enum('resiko_kehilangan_darah', ['Tidak Ada', 'Ada'])->nullable();
                $table->string('resiko_kehilangan_darah_line', 30)->nullable();
                $table->string('resiko_kehilangan_darah_rencana_antisipasi', 50)->nullable();
                $table->enum('kesiapan_alat_obat_anestesi', ['Lengkap', 'Pulsa Oximetri', 'Tidak Lengkap'])->nullable();
                $table->string('kesiapan_alat_obat_anestesi_rencana_antisipasi', 50)->nullable();
                $table->string('nip_perawat_ok', 20)->nullable()->index('nip_perawat_ok');

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('signin_sebelum_anestesi');
    }
};
