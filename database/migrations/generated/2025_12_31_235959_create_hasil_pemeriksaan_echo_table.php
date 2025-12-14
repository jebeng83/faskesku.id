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
        if (! Schema::hasTable('hasil_pemeriksaan_echo')) {
            Schema::create('hasil_pemeriksaan_echo', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('sistolik', 30)->nullable();
                $table->string('diastolic', 30)->nullable();
                $table->string('kontraktilitas', 30)->nullable();
                $table->string('dimensi_ruang', 50)->nullable();
                $table->string('katup', 50)->nullable();
                $table->string('analisa_segmental', 100)->nullable();
                $table->string('erap', 15)->nullable();
                $table->string('lain_lain', 100)->nullable();
                $table->string('kesimpulan', 200)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_pemeriksaan_echo');
    }
};
