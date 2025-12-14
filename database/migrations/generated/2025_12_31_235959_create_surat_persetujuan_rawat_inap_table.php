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
        if (! Schema::hasTable('surat_persetujuan_rawat_inap')) {
            Schema::create('surat_persetujuan_rawat_inap', function (Blueprint $table) {
                $table->string('no_surat', 20)->primary();
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tanggal');
                $table->string('nama_pj', 50);
                $table->string('no_ktppj', 20);
                $table->enum('pendidikan_pj', ['TS', 'TK', 'SD', 'SMP', 'SMA', 'SLTA/SEDERAJAT', 'D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3', '-'])->nullable();
                $table->string('alamatpj', 100);
                $table->string('no_telppj', 30);
                $table->string('ruang', 40)->nullable();
                $table->enum('kelas', ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas Utama', 'Kelas VIP', 'Kelas VVIP'])->nullable();
                $table->enum('hubungan', ['Suami', 'Istri', 'Anak', 'Ayah', 'Ibu', 'Saudara', 'Keponakan', 'Diri Saya']);
                $table->enum('hak_kelas', ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas Utama', 'Kelas VIP', 'Kelas VVIP', '-'])->nullable();
                $table->string('nama_alamat_keluarga_terdekat', 130)->nullable();
                $table->string('bayar_secara', 30)->nullable();
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_persetujuan_rawat_inap');
    }
};
