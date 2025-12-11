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
        if (Schema::hasTable('detail_penagihan_piutang')) {
            Schema::table('detail_penagihan_piutang', function (Blueprint $table) {
                $table->foreign(['no_tagihan'], 'detail_penagihan_piutang_ibfk_1')->references(['no_tagihan'])->on('penagihan_piutang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rawat'], 'detail_penagihan_piutang_ibfk_2')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detail_penagihan_piutang')) {
            Schema::table('detail_penagihan_piutang', function (Blueprint $table) {
                $table->dropForeign('detail_penagihan_piutang_ibfk_1');
                $table->dropForeign('detail_penagihan_piutang_ibfk_2');
            });
        }
    }
};
