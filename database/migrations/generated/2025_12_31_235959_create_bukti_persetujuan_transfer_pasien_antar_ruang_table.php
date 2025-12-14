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
        if (! Schema::hasTable('bukti_persetujuan_transfer_pasien_antar_ruang')) {
            Schema::create('bukti_persetujuan_transfer_pasien_antar_ruang', function (Blueprint $table) {
                $table->string('no_rawat', 17);
                $table->dateTime('tanggal_masuk');
                $table->string('photo', 500)->nullable();

                $table->primary(['no_rawat', 'tanggal_masuk']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bukti_persetujuan_transfer_pasien_antar_ruang');
    }
};
