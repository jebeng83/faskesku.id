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
        if (Schema::hasTable('bayar_piutang')) {
            Schema::table('bayar_piutang', function (Blueprint $table) {
                $table->foreign(['no_rkm_medis'], 'bayar_piutang_ibfk_1')->references(['no_rkm_medis'])->on('pasien')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek'], 'bayar_piutang_ibfk_2')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek_kontra'], 'bayar_piutang_ibfk_3')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek_diskon_piutang'], 'bayar_piutang_ibfk_4')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek_tidak_terbayar'], 'bayar_piutang_ibfk_5')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bayar_piutang')) {
            Schema::table('bayar_piutang', function (Blueprint $table) {
                $table->dropForeign('bayar_piutang_ibfk_1');
                $table->dropForeign('bayar_piutang_ibfk_2');
                $table->dropForeign('bayar_piutang_ibfk_3');
                $table->dropForeign('bayar_piutang_ibfk_4');
                $table->dropForeign('bayar_piutang_ibfk_5');
            });
        }
    }
};
