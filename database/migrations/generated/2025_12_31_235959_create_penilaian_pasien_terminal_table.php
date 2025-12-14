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
        if (! Schema::hasTable('penilaian_pasien_terminal')) {
            Schema::create('penilaian_pasien_terminal', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('diagnosa', 500);
                $table->string('rps', 500);
                $table->string('rpd', 500);
                $table->enum('keadaan_umum', ['Sedang', 'Jelek', 'Sangat Jelek'])->nullable();
                $table->enum('kesadaran', ['Compos Mentis', 'Apatis', 'Delirium', 'Samnolen', 'Sopor', 'Koma'])->nullable();
                $table->string('td', 8)->default('');
                $table->string('nadi', 5)->default('');
                $table->string('suhu', 5)->default('');
                $table->string('rr', 5);
                $table->string('spo2', 5);
                $table->enum('skala_nyeri', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
                $table->enum('tahap_pasien_menjelang_ajal', ['Menolak', 'Marah', 'Menawar', 'Depresi', 'Menerima'])->nullable();
                $table->enum('tanda_klinis_menjelang_kematian', ['Kurang/Tidak Responsif', 'Nadi Cepat & Melemah', 'Pernapasan Tidak Teratur & Dangkal/Ngorok', 'Kulit Pucat', 'Ekstrimitas Dingin', 'Defekasi/Berkemih Tidak Sengaja', 'Mata Tidak Respon Cahaya', 'Penurunan Tonus Otot'])->nullable();
                $table->string('kebutuhan_spiritual_pasien', 500)->nullable();
                $table->string('nip', 20)->index('nip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_pasien_terminal');
    }
};
