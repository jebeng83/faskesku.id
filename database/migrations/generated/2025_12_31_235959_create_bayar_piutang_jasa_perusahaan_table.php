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
        if (! Schema::hasTable('bayar_piutang_jasa_perusahaan')) {
            Schema::create('bayar_piutang_jasa_perusahaan', function (Blueprint $table) {
                $table->date('tgl_bayar');
                $table->string('kode_perusahaan', 5)->index('kode_perusahaan');
                $table->double('besar_cicilan');
                $table->string('keterangan', 100);
                $table->string('no_piutang', 15)->index('no_piutang');
                $table->string('kd_rek', 15)->index('kd_rek');
                $table->string('nama_bayar', 50)->index('nama_bayar');

                $table->primary(['tgl_bayar', 'kode_perusahaan', 'no_piutang', 'kd_rek', 'nama_bayar']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bayar_piutang_jasa_perusahaan');
    }
};
