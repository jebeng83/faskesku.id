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
        if (! Schema::hasTable('bayar_piutang')) {
            Schema::create('bayar_piutang', function (Blueprint $table) {
                $table->date('tgl_bayar');
                $table->string('no_rkm_medis', 15)->index('no_rkm_medis');
                $table->double('besar_cicilan')->index('besar_cicilan');
                $table->string('catatan', 100)->index('catatan');
                $table->string('no_rawat', 17)->index('nota_piutang');
                $table->string('kd_rek', 15)->index('kd_rek');
                $table->string('kd_rek_kontra', 15)->index('kd_rek_kontra');
                $table->double('diskon_piutang');
                $table->string('kd_rek_diskon_piutang', 15)->index('kd_rek_diskon_piutang');
                $table->double('tidak_terbayar');
                $table->string('kd_rek_tidak_terbayar', 15)->index('kd_rek_tidak_terbayar');

                $table->primary(['tgl_bayar', 'no_rkm_medis', 'no_rawat', 'kd_rek', 'kd_rek_kontra']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bayar_piutang');
    }
};
