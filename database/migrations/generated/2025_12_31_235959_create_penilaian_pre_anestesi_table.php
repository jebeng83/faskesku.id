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
        if (! Schema::hasTable('penilaian_pre_anestesi')) {
            Schema::create('penilaian_pre_anestesi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->dateTime('tanggal_operasi')->nullable();
                $table->string('diagnosa', 100)->nullable();
                $table->string('rencana_tindakan', 100)->nullable();
                $table->string('tb', 5)->default('');
                $table->string('bb', 5)->default('');
                $table->string('td', 8)->default('');
                $table->string('io2', 5);
                $table->string('nadi', 5)->default('');
                $table->string('pernapasan', 5);
                $table->string('suhu', 5)->default('');
                $table->string('fisik_cardiovasculer', 100)->nullable();
                $table->string('fisik_paru', 100)->nullable();
                $table->string('fisik_abdomen', 100)->nullable();
                $table->string('fisik_extrimitas', 100)->nullable();
                $table->string('fisik_endokrin', 100)->nullable();
                $table->string('fisik_ginjal', 100)->nullable();
                $table->string('fisik_obatobatan', 100)->nullable();
                $table->string('fisik_laborat', 100)->nullable();
                $table->string('fisik_penunjang', 100)->nullable();
                $table->string('riwayat_penyakit_alergiobat', 50)->nullable();
                $table->string('riwayat_penyakit_alergilainnya', 50)->nullable();
                $table->string('riwayat_penyakit_terapi', 100)->nullable();
                $table->enum('riwayat_kebiasaan_merokok', ['Tidak', 'Ya']);
                $table->string('riwayat_kebiasaan_ket_merokok', 5);
                $table->enum('riwayat_kebiasaan_alkohol', ['Tidak', 'Ya']);
                $table->string('riwayat_kebiasaan_ket_alkohol', 5);
                $table->enum('riwayat_kebiasaan_obat', ['-', 'Obat Obatan', 'Vitamin', 'Jamu Jamuan']);
                $table->string('riwayat_kebiasaan_ket_obat', 100);
                $table->string('riwayat_medis_cardiovasculer', 100)->nullable();
                $table->string('riwayat_medis_respiratory', 100)->nullable();
                $table->string('riwayat_medis_endocrine', 100)->nullable();
                $table->string('riwayat_medis_lainnya', 100)->nullable();
                $table->enum('asa', ['1', '2', '3', '4', '5', 'E'])->nullable();
                $table->dateTime('puasa')->nullable();
                $table->enum('rencana_anestesi', ['GA', 'RA Spinal', 'RA Epidural', 'RA Combined', 'Blok Syaraf'])->nullable();
                $table->string('rencana_perawatan', 40)->nullable();
                $table->string('catatan_khusus', 100)->nullable();

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_pre_anestesi');
    }
};
