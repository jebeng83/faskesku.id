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
        if (Schema::hasTable('bayar_beban_hutang_lain')) {
            Schema::table('bayar_beban_hutang_lain', function (Blueprint $table) {
                $table->foreign(['kode_pemberi_hutang'], 'bayar_beban_hutang_lain_ibfk_1')->references(['kode_pemberi_hutang'])->on('pemberi_hutang_lain')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek'], 'bayar_beban_hutang_lain_ibfk_2')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nama_bayar'], 'bayar_beban_hutang_lain_ibfk_3')->references(['nama_bayar'])->on('akun_bayar_hutang')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_hutang'], 'bayar_beban_hutang_lain_ibfk_4')->references(['no_hutang'])->on('beban_hutang_lain')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bayar_beban_hutang_lain')) {
            Schema::table('bayar_beban_hutang_lain', function (Blueprint $table) {
                $table->dropForeign('bayar_beban_hutang_lain_ibfk_1');
                $table->dropForeign('bayar_beban_hutang_lain_ibfk_2');
                $table->dropForeign('bayar_beban_hutang_lain_ibfk_3');
                $table->dropForeign('bayar_beban_hutang_lain_ibfk_4');
            });
        }
    }
};
