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
        if (! Schema::hasTable('hasil_pemeriksaan_usg_neonatus')) {
            Schema::create('hasil_pemeriksaan_usg_neonatus', function (Blueprint $table) {
                $table->string('no_rawat', 17)->primary();
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('diagnosa_klinis', 50)->nullable();
                $table->string('kiriman_dari', 50);
                $table->string('ventrikal_sinistra', 200)->nullable();
                $table->string('ventrikal_dextra', 200)->nullable();
                $table->string('kesan', 200)->nullable();
                $table->string('kesimpulan', 300)->nullable();
                $table->string('saran', 200)->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_pemeriksaan_usg_neonatus');
    }
};
