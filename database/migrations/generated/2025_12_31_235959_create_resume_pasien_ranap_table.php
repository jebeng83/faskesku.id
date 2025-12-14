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
        if (! Schema::hasTable('resume_pasien_ranap')) {
            Schema::create('resume_pasien_ranap', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('diagnosa_awal', 100);
                $table->string('alasan', 100);
                $table->text('keluhan_utama');
                $table->text('pemeriksaan_fisik');
                $table->text('jalannya_penyakit');
                $table->text('pemeriksaan_penunjang');
                $table->text('hasil_laborat');
                $table->text('tindakan_dan_operasi');
                $table->text('obat_di_rs');
                $table->string('diagnosa_utama', 80);
                $table->string('kd_diagnosa_utama', 10);
                $table->string('diagnosa_sekunder', 80);
                $table->string('kd_diagnosa_sekunder', 10);
                $table->string('diagnosa_sekunder2', 80);
                $table->string('kd_diagnosa_sekunder2', 10);
                $table->string('diagnosa_sekunder3', 80);
                $table->string('kd_diagnosa_sekunder3', 10);
                $table->string('diagnosa_sekunder4', 80);
                $table->string('kd_diagnosa_sekunder4', 10);
                $table->string('prosedur_utama', 80);
                $table->string('kd_prosedur_utama', 8);
                $table->string('prosedur_sekunder', 80);
                $table->string('kd_prosedur_sekunder', 8);
                $table->string('prosedur_sekunder2', 80);
                $table->string('kd_prosedur_sekunder2', 8);
                $table->string('prosedur_sekunder3', 80);
                $table->string('kd_prosedur_sekunder3', 8);
                $table->string('alergi', 100);
                $table->text('diet');
                $table->text('lab_belum');
                $table->text('edukasi');
                $table->enum('cara_keluar', ['Atas Izin Dokter', 'Pindah RS', 'Pulang Atas Permintaan Sendiri', 'Lainnya']);
                $table->string('ket_keluar', 50)->nullable();
                $table->enum('keadaan', ['Membaik', 'Sembuh', 'Keadaan Khusus', 'Meninggal']);
                $table->string('ket_keadaan', 50)->nullable();
                $table->enum('dilanjutkan', ['Kembali Ke RS', 'RS Lain', 'Dokter Luar', 'Puskesmes', 'Lainnya']);
                $table->string('ket_dilanjutkan', 50)->nullable();
                $table->dateTime('kontrol')->nullable();
                $table->text('obat_pulang');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resume_pasien_ranap');
    }
};
