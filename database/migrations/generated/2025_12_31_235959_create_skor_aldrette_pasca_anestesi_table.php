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
        if (! Schema::hasTable('skor_aldrette_pasca_anestesi')) {
            Schema::create('skor_aldrette_pasca_anestesi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('penilaian_skala1', ['Tidak Sanggup Menggerakan Satupun Anggota Gerak', 'Sanggup Gerak 2 Anggota Tubuh', 'Sanggup Gerak 4 Anggota Tubuh'])->nullable();
                $table->tinyInteger('penilaian_nilai1')->nullable();
                $table->enum('penilaian_skala2', ['Apnea Atau Napas Tidak Adekuat', 'Sesak Atau Pernapasan Sedikit Terbatas', 'Sanggup Bernafas Dalam Serta Disuruh Batuk'])->nullable();
                $table->tinyInteger('penilaian_nilai2')->nullable();
                $table->enum('penilaian_skala3', ['± 50% Tekanan Darah Pra Anestesi', '± 20% - 50% Tekanan Darah Pra Anestesi', '± 20% Tekanan Darah Pra Anestesi'])->nullable();
                $table->tinyInteger('penilaian_nilai3')->nullable();
                $table->enum('penilaian_skala4', ['Tidak Ada Respon', 'Respon Terhadap Panggilan', 'Sadar Penuh'])->nullable();
                $table->tinyInteger('penilaian_nilai4')->nullable();
                $table->enum('penilaian_skala5', ['Cianosis', 'Pucat', 'Kemerahan / Normal'])->nullable();
                $table->tinyInteger('penilaian_nilai5')->nullable();
                $table->tinyInteger('penilaian_totalnilai')->nullable();
                $table->string('keluar', 200)->nullable();
                $table->string('instruksi', 250)->nullable();
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
        Schema::dropIfExists('skor_aldrette_pasca_anestesi');
    }
};
