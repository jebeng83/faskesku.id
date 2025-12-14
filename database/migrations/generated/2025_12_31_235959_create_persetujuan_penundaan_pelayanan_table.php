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
        if (! Schema::hasTable('persetujuan_penundaan_pelayanan')) {
            Schema::create('persetujuan_penundaan_pelayanan', function (Blueprint $table) {
                $table->string('no_surat', 20)->primary();
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->dateTime('tanggal');
                $table->string('nama_pj', 50);
                $table->string('umur_pj', 3);
                $table->string('no_ktppj', 20);
                $table->string('alamatpj', 100);
                $table->string('no_telppj', 30);
                $table->enum('hubungan', ['Suami', 'Istri', 'Anak', 'Ayah', 'Ibu', 'Saudara', 'Keponakan', 'Diri Sendiri'])->nullable();
                $table->string('ruang', 40)->nullable();
                $table->string('dokter_pengirim', 40)->nullable();
                $table->string('pelayanan_dilakukan', 120)->nullable();
                $table->enum('ditunda_karena', ['Kerusakan Alat', 'Kondisi Umum Pasien', 'Penundaan Penjadwalan', 'Pemadaman Instalasi Listrik', 'Lain-lain'])->nullable();
                $table->string('keterangan_ditunda', 50)->nullable();
                $table->enum('alternatif_diberikan', ['Dijadwalkan Ulang', 'Dirujuk Ke Layanan Kesehatan Lain', 'Dikembalikan Kepada Dokter Pengirim', 'Lain-lain'])->nullable();
                $table->string('keterangan_alternatif_diberikan', 50);
                $table->string('nip', 20)->index('nip');
                $table->string('kd_dokter', 20)->nullable()->index('kd_dokter');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('persetujuan_penundaan_pelayanan');
    }
};
