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
        if (Schema::hasTable('detail_piutang_pasien')) {
            Schema::table('detail_piutang_pasien', function (Blueprint $table) {
                $table->foreign(['kd_pj'], 'detail_piutang_pasien_ibfk_3')->references(['kd_pj'])->on('penjab')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nama_bayar'], 'detail_piutang_pasien_ibfk_4')->references(['nama_bayar'])->on('akun_piutang')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_rawat'], 'detail_piutang_pasien_ibfk_5')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detail_piutang_pasien')) {
            Schema::table('detail_piutang_pasien', function (Blueprint $table) {
                $table->dropForeign('detail_piutang_pasien_ibfk_3');
                $table->dropForeign('detail_piutang_pasien_ibfk_4');
                $table->dropForeign('detail_piutang_pasien_ibfk_5');
            });
        }
    }
};
