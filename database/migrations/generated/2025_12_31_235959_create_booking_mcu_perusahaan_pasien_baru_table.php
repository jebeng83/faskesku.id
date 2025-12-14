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
        if (! Schema::hasTable('booking_mcu_perusahaan_pasien_baru')) {
            Schema::create('booking_mcu_perusahaan_pasien_baru', function (Blueprint $table) {
                $table->string('no_pengajuan', 15)->primary();
                $table->string('nm_pasien', 40)->nullable();
                $table->string('no_ktp', 20)->nullable();
                $table->enum('jk', ['L', 'P'])->nullable();
                $table->string('tmp_lahir', 15)->nullable();
                $table->date('tgl_lahir')->nullable();
                $table->string('nm_ibu', 40);
                $table->string('alamat', 200)->nullable();
                $table->string('kelurahan', 60);
                $table->string('kecamatan', 60);
                $table->string('kabupaten', 60);
                $table->string('propinsi', 60);
                $table->enum('gol_darah', ['A', 'B', 'O', 'AB', '-'])->nullable();
                $table->string('pekerjaan', 60)->nullable();
                $table->enum('stts_nikah', ['BELUM MENIKAH', 'MENIKAH', 'JANDA', 'DUDHA', 'JOMBLO'])->nullable();
                $table->string('agama', 12)->nullable();
                $table->date('tgl_mcu')->nullable();
                $table->string('no_tlp', 40)->nullable();
                $table->string('umur', 30);
                $table->enum('pnd', ['TS', 'TK', 'SD', 'SMP', 'SMA', 'SLTA/SEDERAJAT', 'D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3', '-']);
                $table->enum('keluarga', ['AYAH', 'IBU', 'ISTRI', 'SUAMI', 'SAUDARA', 'ANAK', 'DIRI SENDIRI', 'LAIN-LAIN'])->nullable();
                $table->string('namakeluarga', 50);
                $table->string('pekerjaanpj', 35);
                $table->string('alamatpj', 100);
                $table->string('kelurahanpj', 60);
                $table->string('kecamatanpj', 60);
                $table->string('kabupatenpj', 60);
                $table->string('propinsipj', 30);
                $table->string('perusahaan_pasien', 8)->index('perusahaan_pasien');
                $table->string('suku_bangsa', 30);
                $table->string('bahasa_pasien', 30);
                $table->string('cacat_fisik', 30);
                $table->string('email', 50);
                $table->string('nip', 30);
                $table->enum('status', ['Sudah Dikonfirmasi', 'Menunggu Konfirmasi'])->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_mcu_perusahaan_pasien_baru');
    }
};
