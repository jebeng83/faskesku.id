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
        if (!Schema::hasTable('skrining_obesitas')) {
            Schema::create('skrining_obesitas', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->enum('kebiasaan_makan_manis', ['Ya', 'Tidak'])->nullable();
                $table->enum('aktifitas_fisik_setiap_hari', ['Ya', 'Tidak'])->nullable();
                $table->enum('istirahat_cukup', ['Ya', 'Tidak'])->nullable();
                $table->enum('risiko_merokok', ['Ya', 'Tidak'])->nullable();
                $table->enum('riwayat_minum_alkohol_merokok_keluarga', ['Ya', 'Tidak'])->nullable();
                $table->enum('riwayat_penggunaan_obat_steroid', ['Ya', 'Tidak'])->nullable();
                $table->string('berat_badan', 6)->nullable();
                $table->string('tinggi_badan', 8)->nullable();
                $table->string('imt', 6)->nullable();
                $table->enum('kasifikasi_imt', ['Berat Badan Kurang', 'Berat Badan Normal', 'Kelebihan Berat Badan', 'Obesitas I', 'Obesitas II'])->nullable();
                $table->string('lingkar_pinggang', 6)->nullable();
                $table->enum('risiko_lingkar_pinggang', ['Rendah', 'Cukup', 'Meningkat', 'Moderat', 'Berat', 'Sangat'])->nullable();
                $table->enum('status_obesitas', ['Normal', 'Berisiko'])->nullable();
                $table->string('keterangan', 40)->nullable();
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_obesitas');
    }
};
