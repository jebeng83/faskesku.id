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
        if (Schema::hasTable('toko_bayar_piutang')) {
            Schema::table('toko_bayar_piutang', function (Blueprint $table) {
                $table->foreign(['no_member'], 'toko_bayar_piutang_ibfk_1')->references(['no_member'])->on('tokomember')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek'], 'toko_bayar_piutang_ibfk_2')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek_kontra'], 'toko_bayar_piutang_ibfk_3')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nota_piutang'], 'toko_bayar_piutang_ibfk_4')->references(['nota_piutang'])->on('tokopiutang')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('toko_bayar_piutang')) {
            Schema::table('toko_bayar_piutang', function (Blueprint $table) {
                $table->dropForeign('toko_bayar_piutang_ibfk_1');
                $table->dropForeign('toko_bayar_piutang_ibfk_2');
                $table->dropForeign('toko_bayar_piutang_ibfk_3');
                $table->dropForeign('toko_bayar_piutang_ibfk_4');
            });
        }
    }
};
