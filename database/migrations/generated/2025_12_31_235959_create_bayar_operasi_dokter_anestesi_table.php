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
        if (!Schema::hasTable('bayar_operasi_dokter_anestesi')) {
            Schema::create('bayar_operasi_dokter_anestesi', function (Blueprint $table) {
                $table->string('no_bayar', 30)->default('')->index('no_bayar');
                $table->string('no_rawat', 17)->index('no_rawat');
                $table->string('kode_paket', 15)->index('kode_paket');
                $table->dateTime('tgl_operasi');
                $table->double('biayadokter_anestesi');

                $table->primary(['no_rawat', 'tgl_operasi', 'kode_paket', 'no_bayar']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bayar_operasi_dokter_anestesi');
    }
};
