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
        if (!Schema::hasTable('skor_steward_pasca_anestesi')) {
            Schema::create('skor_steward_pasca_anestesi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('penilaian_skala1', ['Belum Respon', 'Bangun Jika Dipanggil', 'Sadar Penuh'])->nullable();
                $table->tinyInteger('penilaian_nilai1')->nullable();
                $table->enum('penilaian_skala2', ['Perlu Bantuan Bernafas', 'Berusaha Bernafas', 'Batuk / Menangis'])->nullable();
                $table->tinyInteger('penilaian_nilai2')->nullable();
                $table->enum('penilaian_skala3', ['Tidak Bergerak', 'Gerakan Tanpa Tujuan', 'Gerakan Beraturan'])->nullable();
                $table->tinyInteger('penilaian_nilai3')->nullable();
                $table->tinyInteger('penilaian_totalnilai')->nullable();
                $table->string('keluar', 200)->nullable();
                $table->string('instruksi', 200)->nullable();
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('nip', 20)->index('nip');

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skor_steward_pasca_anestesi');
    }
};
