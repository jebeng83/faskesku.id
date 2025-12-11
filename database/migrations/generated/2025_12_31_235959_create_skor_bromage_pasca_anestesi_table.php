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
        if (!Schema::hasTable('skor_bromage_pasca_anestesi')) {
            Schema::create('skor_bromage_pasca_anestesi', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->enum('penilaian_skala1', ['Gerakan Penuh Dari Tungkai', 'Tidak Mampu Extensi Tungkai', 'Tidak Mampu Flexi Lutut', 'Tidak Mampu Flexi Pergelangan Kaki'])->nullable();
                $table->tinyInteger('penilaian_nilai1')->nullable();
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
        Schema::dropIfExists('skor_bromage_pasca_anestesi');
    }
};
