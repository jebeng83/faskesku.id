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
        if (Schema::hasTable('set_akun2')) {
            Schema::table('set_akun2', function (Blueprint $table) {
                $table->foreign(['Bayar_Pemesanan_Dapur'], 'set_akun2_ibfk_1')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Kontra_Penerimaan_Dapur'], 'set_akun2_ibfk_2')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Kontra_Retur_Beli_Dapur'], 'set_akun2_ibfk_3')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Penerimaan_Dapur'], 'set_akun2_ibfk_4')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Retur_Beli_Dapur'], 'set_akun2_ibfk_5')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Hibah_Dapur'], 'set_akun2_ibfk_6')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Kontra_Hibah_Dapur'], 'set_akun2_ibfk_7')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Piutang_Jasa_Perusahaan'], 'set_akun2_ibfk_8')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Pendapatan_Piutang_Jasa_Perusahaan'], 'set_akun2_ibfk_9')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('set_akun2')) {
            Schema::table('set_akun2', function (Blueprint $table) {
                $table->dropForeign('set_akun2_ibfk_1');
                $table->dropForeign('set_akun2_ibfk_2');
                $table->dropForeign('set_akun2_ibfk_3');
                $table->dropForeign('set_akun2_ibfk_4');
                $table->dropForeign('set_akun2_ibfk_5');
                $table->dropForeign('set_akun2_ibfk_6');
                $table->dropForeign('set_akun2_ibfk_7');
                $table->dropForeign('set_akun2_ibfk_8');
                $table->dropForeign('set_akun2_ibfk_9');
            });
        }
    }
};
