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
        if (!Schema::hasTable('laporan_anestesi')) {
            Schema::create('laporan_anestesi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('mulai');
                $table->dateTime('selesai');
                $table->enum('tempat_pemantauan', ['OK', 'Cathlab', 'ICU/ICCU', 'Radiologi', 'Endoscopy'])->nullable();
                $table->string('tindakan_operasi', 60);
                $table->string('operator1', 20)->index('operator1');
                $table->string('asisten_operator', 20)->index('asisten_operator');
                $table->string('dokter_anestesi', 20)->index('dokter_anestesi');
                $table->string('operator2', 20)->index('operator2');
                $table->string('onloop', 20)->index('onloop');
                $table->string('penata_anestesi', 20)->index('penata_anestesi');
                $table->string('diagnosa_preop', 100);
                $table->string('diagnosa_postop', 100);
                $table->enum('status_asa', ['1', '2', '3', '4', '5', 'E'])->nullable();
                $table->string('karena', 40)->nullable();
                $table->string('premedikasi', 500)->nullable();
                $table->string('ttv_premedikasi_td', 8);
                $table->string('ttv_premedikasi_rr', 5);
                $table->string('ttv_premedikasi_hr', 5);
                $table->string('ttv_premedikasi_spo2', 5);
                $table->string('ttv_premedikasi_ekg', 5);
                $table->string('ttv_premedikasi_suhu', 5);
                $table->string('ttv_premedikasi_lain', 30);
                $table->string('lama_operasi', 10);
                $table->string('lama_anastesi', 10);
                $table->string('keadaan_umum_bb', 5);
                $table->string('keadaan_umum_tb', 5);
                $table->string('keadaan_umum_alergi', 50);
                $table->string('keadaan_umum_malampathy', 50);
                $table->string('keadaan_umum_e', 1);
                $table->string('keadaan_umum_v', 1);
                $table->string('keadaan_umum_m', 1);
                $table->string('jenis_anestesi_lokasi', 30);
                $table->enum('jenis_anestesi_sedasi', ['Ringan', 'Sedang', 'Berat']);
                $table->enum('jenis_anestesi_regional', ['Spinal', 'Epidural', 'Combined']);
                $table->enum('jenis_anestesi_ga_ett', ['Ya', 'Tidak']);
                $table->enum('jenis_anestesi_ga_ntt', ['Ya', 'Tidak']);
                $table->enum('jenis_anestesi_ga_ema', ['Ya', 'Tidak']);
                $table->enum('jenis_anestesi_ga_bm', ['Ya', 'Tidak']);
                $table->string('posisi', 40);
                $table->string('perdarahan', 40);
                $table->string('urine', 40);
                $table->string('komplikasi', 40);
                $table->string('ekstubasi', 40);
                $table->string('jumlah_pack', 10);
                $table->string('dipindahkan_ke', 40);
                $table->enum('serah_terima_pasien', ['RR', 'ICU/ICCU', 'NICU/PICU', 'ODC']);
                $table->string('catatan', 100);
                $table->string('nip_recovery_room', 20)->index('nip_recovery_room');

                $table->primary(['no_rawat', 'mulai']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan_anestesi');
    }
};
