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
        if (Schema::hasTable('set_akun_ranap2')) {
            Schema::table('set_akun_ranap2', function (Blueprint $table) {
                $table->foreign(['Persediaan_Obat_Kamar_Operasi_Ranap'], 'set_akun_ranap2_ibfk_1')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Harian_Ranap'], 'set_akun_ranap2_ibfk_2')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Uang_Muka_Ranap'], 'set_akun_ranap2_ibfk_3')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Piutang_Pasien_Ranap'], 'set_akun_ranap2_ibfk_4')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['Sisa_Uang_Muka_Ranap'], 'set_akun_ranap2_ibfk_5')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('set_akun_ranap2')) {
            Schema::table('set_akun_ranap2', function (Blueprint $table) {
                $table->dropForeign('set_akun_ranap2_ibfk_1');
                $table->dropForeign('set_akun_ranap2_ibfk_2');
                $table->dropForeign('set_akun_ranap2_ibfk_3');
                $table->dropForeign('set_akun_ranap2_ibfk_4');
                $table->dropForeign('set_akun_ranap2_ibfk_5');
            });
        }
    }
};
