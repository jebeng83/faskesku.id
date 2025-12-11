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
        if (!Schema::hasTable('hasil_pemeriksaan_usg_gynecologi')) {
            Schema::create('hasil_pemeriksaan_usg_gynecologi', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('diagnosa_klinis', 50);
                $table->string('kiriman_dari', 50);
                $table->string('uterus', 200)->nullable();
                $table->string('parametrium', 200)->nullable();
                $table->string('ovarium', 200)->nullable();
                $table->string('doppler', 200)->nullable();
                $table->string('kesimpulan', 300)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_pemeriksaan_usg_gynecologi');
    }
};
