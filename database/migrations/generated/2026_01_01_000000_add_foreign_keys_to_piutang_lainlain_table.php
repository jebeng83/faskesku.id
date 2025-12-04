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
        if (Schema::hasTable('piutang_lainlain')) {
            Schema::table('piutang_lainlain', function (Blueprint $table) {
                $table->foreign(['nip'], 'piutang_lainlain_ibfk_1')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_peminjam'], 'piutang_lainlain_ibfk_2')->references(['kode_peminjam'])->on('peminjampiutang')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nama_bayar'], 'piutang_lainlain_ibfk_3')->references(['nama_bayar'])->on('akun_bayar')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek'], 'piutang_lainlain_ibfk_4')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('piutang_lainlain')) {
            Schema::table('piutang_lainlain', function (Blueprint $table) {
                $table->dropForeign('piutang_lainlain_ibfk_1');
                $table->dropForeign('piutang_lainlain_ibfk_2');
                $table->dropForeign('piutang_lainlain_ibfk_3');
                $table->dropForeign('piutang_lainlain_ibfk_4');
            });
        }
    }
};
