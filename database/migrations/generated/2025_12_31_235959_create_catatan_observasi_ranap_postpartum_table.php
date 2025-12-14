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
        if (! Schema::hasTable('catatan_observasi_ranap_postpartum')) {
            Schema::create('catatan_observasi_ranap_postpartum', function (Blueprint $table) {
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->date('tgl_perawatan');
                $table->time('jam_rawat');
                $table->string('gcs', 10)->nullable();
                $table->string('td', 8);
                $table->string('hr', 5)->nullable();
                $table->string('rr', 5)->nullable();
                $table->string('suhu', 5)->nullable();
                $table->string('spo2', 3);
                $table->string('tfu', 15);
                $table->string('kontraksi', 15);
                $table->string('perdarahan', 15);
                $table->string('keterangan', 30);
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
        Schema::dropIfExists('catatan_observasi_ranap_postpartum');
    }
};
