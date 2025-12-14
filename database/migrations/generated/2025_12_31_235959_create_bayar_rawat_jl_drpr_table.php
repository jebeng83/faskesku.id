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
        if (! Schema::hasTable('bayar_rawat_jl_drpr')) {
            Schema::create('bayar_rawat_jl_drpr', function (Blueprint $table) {
                $table->string('no_bayar', 30)->default('')->index('no_bayar');
                $table->string('no_rawat', 17)->default('')->index('no_rawat');
                $table->string('kd_jenis_prw', 15)->index('kd_jenis_prw');
                $table->date('tgl_perawatan');
                $table->time('jam_rawat');
                $table->double('tarif_tindakandr')->nullable();

                $table->primary(['no_rawat', 'kd_jenis_prw', 'no_bayar', 'tgl_perawatan', 'jam_rawat']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bayar_rawat_jl_drpr');
    }
};
