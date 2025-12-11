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
        if (!Schema::hasTable('bayar_jm_dokter')) {
            Schema::create('bayar_jm_dokter', function (Blueprint $table) {
                $table->string('no_bayar', 30)->primary();
                $table->date('tanggal')->nullable();
                $table->string('kd_dokter', 20)->nullable()->index('kd_dokter');
                $table->double('besar_bayar')->nullable();
                $table->string('nama_bayar', 50)->index('nama_bayar');
                $table->string('keterangan', 70);
                $table->double('rawatjalan');
                $table->double('rawatinap');
                $table->double('labrawatjalan');
                $table->double('labrawatinap');
                $table->double('radrawatjalan');
                $table->double('radrawatinap');
                $table->double('operasiralan');
                $table->double('operasiranap');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bayar_jm_dokter');
    }
};
