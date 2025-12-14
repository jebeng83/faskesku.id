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
        if (! Schema::hasTable('catatan_persalinan')) {
            Schema::create('catatan_persalinan', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('mulai');
                $table->dateTime('selesai');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('nip', 20)->index('nip');
                $table->text('catatan')->nullable();
                $table->string('waktu_persalinan_kala_1', 5)->nullable();
                $table->string('waktu_persalinan_kala_2', 5)->nullable();
                $table->string('waktu_persalinan_kala_3', 5)->nullable();
                $table->string('waktu_persalinan_jumlah', 5)->nullable();
                $table->enum('perineum', ['Utuh', 'Rupture', 'Episiotomi'])->nullable();
                $table->string('jahitan_luar_1', 5)->nullable();
                $table->string('jahitan_luar_2', 5)->nullable();
                $table->string('jahitan_dalam_1', 5)->nullable();
                $table->string('jahitan_dalam_2', 5)->nullable();
                $table->enum('anak', ['Laki-laki', 'Perempuan'])->nullable();
                $table->enum('status_lahir', ['Hidup', 'Mati'])->nullable();
                $table->string('apgar_score', 20)->nullable();
                $table->string('bb', 5)->nullable();
                $table->string('pb', 5)->nullable();
                $table->string('kelainan', 100)->nullable();
                $table->string('ketuban', 20)->nullable();
                $table->string('placenta', 20)->nullable();
                $table->string('ukuran', 5)->nullable();
                $table->string('tali_pusat', 5)->nullable();
                $table->string('insertio', 20)->nullable();
                $table->string('darah_keluar_kala_1', 5)->nullable();
                $table->string('darah_keluar_kala_2', 5)->nullable();
                $table->string('darah_keluar_kala_3', 5)->nullable();
                $table->string('darah_keluar_kala_4', 5)->nullable();
                $table->string('darah_keluar_jumlah', 5)->nullable();
                $table->string('kondisi_umum', 100)->nullable();
                $table->string('td', 8)->nullable();
                $table->string('nadi', 5)->nullable();
                $table->string('rr', 5)->nullable();
                $table->string('suhu', 5)->nullable();
                $table->string('kontraksi_uterus', 100)->nullable();
                $table->string('ppv', 100)->nullable();
                $table->string('pengobatan', 600)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_persalinan');
    }
};
