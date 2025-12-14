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
        if (! Schema::hasTable('pengkajian_restrain')) {
            Schema::create('pengkajian_restrain', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('nip', 20)->index('nip');
                $table->string('gcs', 5)->nullable();
                $table->string('refleka_cahaya_ka', 3)->nullable();
                $table->string('refleka_cahaya_ki', 3)->nullable();
                $table->string('ukuran_pupil_ka', 3)->nullable();
                $table->string('ukuran_pupil_ki', 3)->nullable();
                $table->string('td', 8)->nullable();
                $table->string('suhu', 5)->nullable();
                $table->string('rr', 5)->nullable();
                $table->string('nadi', 5)->nullable();
                $table->enum('hasil_observasi', ['Pasien Gelisah/Delirium Dan Berontak', 'Pasien Tidak Kooperatif', 'Ketidakmampuan Dalam Mengikuti Perintah Untuk Tidak Meninggalkan Tempat Tidur'])->nullable();
                $table->enum('pertimbangan_klinis', ['Membahayakan Diri Sendiri', 'Membahayakan Orang Lain'])->nullable();
                $table->enum('restrain_non_farmakologi', ['Restrain Pergelangan Tangan', 'Restrain Pergelangan Kaki', 'Restrain Badan', 'Lain-lain'])->nullable();
                $table->string('restrain_non_farmakologi_keterangan', 50)->nullable();
                $table->string('restrain_farmakologi', 200)->nullable();
                $table->enum('sudah_dijelaskan_keluarga', ['Sudah', 'Belum']);
                $table->string('keluarga_yang_menyetujui', 100)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengkajian_restrain');
    }
};
