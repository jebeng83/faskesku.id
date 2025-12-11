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
        if (Schema::hasTable('bayar_piutang_jasa_perusahaan')) {
            Schema::table('bayar_piutang_jasa_perusahaan', function (Blueprint $table) {
                $table->foreign(['kode_perusahaan'], 'bayar_piutang_jasa_perusahaan_ibfk_1')->references(['kode_perusahaan'])->on('perusahaan_pasien')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek'], 'bayar_piutang_jasa_perusahaan_ibfk_2')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nama_bayar'], 'bayar_piutang_jasa_perusahaan_ibfk_3')->references(['nama_bayar'])->on('akun_bayar')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_piutang'], 'bayar_piutang_jasa_perusahaan_ibfk_4')->references(['no_piutang'])->on('piutang_jasa_perusahaan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bayar_piutang_jasa_perusahaan')) {
            Schema::table('bayar_piutang_jasa_perusahaan', function (Blueprint $table) {
                $table->dropForeign('bayar_piutang_jasa_perusahaan_ibfk_1');
                $table->dropForeign('bayar_piutang_jasa_perusahaan_ibfk_2');
                $table->dropForeign('bayar_piutang_jasa_perusahaan_ibfk_3');
                $table->dropForeign('bayar_piutang_jasa_perusahaan_ibfk_4');
            });
        }
    }
};
