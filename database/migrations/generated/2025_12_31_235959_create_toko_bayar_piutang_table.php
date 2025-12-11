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
        if (!Schema::hasTable('toko_bayar_piutang')) {
            Schema::create('toko_bayar_piutang', function (Blueprint $table) {
                $table->date('tgl_bayar');
                $table->string('no_member', 10)->index('no_member');
                $table->double('besar_cicilan');
                $table->string('catatan', 100);
                $table->string('nota_piutang', 15)->index('nota_piutang');
                $table->string('kd_rek', 15)->index('kd_rek');
                $table->string('kd_rek_kontra', 15)->index('kd_rek_kontra');

                $table->primary(['tgl_bayar', 'no_member', 'nota_piutang', 'kd_rek', 'kd_rek_kontra']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('toko_bayar_piutang');
    }
};
