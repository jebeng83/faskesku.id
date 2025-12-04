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
        if (!Schema::hasTable('laporan_tindakan')) {
            Schema::create('laporan_tindakan', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal');
                $table->string('kd_dokter', 20)->index('kd_dokter');
                $table->string('nip', 20)->nullable()->index('nip');
                $table->string('diagnosa_pra_tindakan', 50);
                $table->string('diagnosa_pasca_tindakan', 50);
                $table->string('tindakan_medik', 300);
                $table->string('uraian', 3000);
                $table->string('hasil', 1000);
                $table->string('kesimpulan', 500);

                $table->primary(['no_rawat', 'tanggal']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan_tindakan');
    }
};
