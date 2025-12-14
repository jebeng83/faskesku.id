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
        if (! Schema::hasTable('hasil_pemeriksaan_ekg')) {
            Schema::create('hasil_pemeriksaan_ekg', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('diagnosa_klinis', 50)->nullable();
                $table->string('kiriman_dari', 50)->nullable();
                $table->string('irama', 40)->nullable();
                $table->string('laju_jantung', 40)->nullable();
                $table->string('gelombangp', 40)->nullable();
                $table->string('intervalpr', 40)->nullable();
                $table->string('axis', 40)->nullable();
                $table->string('kompleksqrs', 40)->nullable();
                $table->enum('segmenst', ['Normal', 'Tidak Normal'])->nullable();
                $table->enum('gelombangt', ['Normal', 'Tidak Normal'])->nullable();
                $table->string('kesimpulan', 200)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_pemeriksaan_ekg');
    }
};
