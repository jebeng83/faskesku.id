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
        if (! Schema::hasTable('timeout_sebelum_insisi')) {
            Schema::create('timeout_sebelum_insisi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->string('sncn', 25);
                $table->string('tindakan', 50);
                $table->string('kd_dokter_bedah', 20)->index('kd_dokter_bedah');
                $table->string('kd_dokter_anestesi', 20)->index('kd_dokter_anestesi');
                $table->enum('verbal_identitas', ['Ya', 'Tidak'])->nullable();
                $table->enum('verbal_tindakan', ['Ya', 'Tidak'])->nullable();
                $table->enum('verbal_area_insisi', ['Ya', 'Tidak'])->nullable();
                $table->enum('penandaan_area_operasi', ['Ada', 'Tidak Ada', 'Tidak Diperlukan'])->nullable();
                $table->string('lama_operasi', 10);
                $table->enum('penayangan_radiologi', ['Ditayangkan', 'Benar', 'Tidak Diperlukan'])->nullable();
                $table->enum('penayangan_ctscan', ['Ditayangkan', 'Benar', 'Tidak Diperlukan'])->nullable();
                $table->enum('penayangan_mri', ['Ditayangkan', 'Benar', 'Tidak Diperlukan'])->nullable();
                $table->enum('antibiotik_profilaks', ['Ya', 'Tidak'])->nullable();
                $table->string('nama_antibiotik', 50);
                $table->string('jam_pemberian', 10);
                $table->string('antisipasi_kehilangan_darah', 50);
                $table->enum('hal_khusus', ['Ada', 'Tidak Ada'])->nullable();
                $table->string('hal_khusus_diperhatikan', 100);
                $table->date('tanggal_steril')->nullable();
                $table->enum('petujuk_sterilisasi', ['Ya', 'Tidak'])->nullable();
                $table->enum('verifikasi_preoperatif', ['Ya', 'Tidak'])->nullable();
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
        Schema::dropIfExists('timeout_sebelum_insisi');
    }
};
