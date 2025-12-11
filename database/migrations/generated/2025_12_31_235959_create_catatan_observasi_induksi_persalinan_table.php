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
        if (!Schema::hasTable('catatan_observasi_induksi_persalinan')) {
            Schema::create('catatan_observasi_induksi_persalinan', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tgl_perawatan');
                $table->time('jam_rawat');
                $table->string('obat', 50)->nullable();
                $table->string('cairan', 50);
                $table->string('dosis', 10)->nullable();
                $table->string('his', 50)->nullable();
                $table->string('djj', 5)->nullable();
                $table->string('keterangan', 50)->nullable();
                $table->string('nip', 20)->index('nip');

                $table->primary(['no_rawat', 'tgl_perawatan', 'jam_rawat']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_observasi_induksi_persalinan');
    }
};
