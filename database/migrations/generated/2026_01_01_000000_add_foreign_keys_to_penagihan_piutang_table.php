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
        if (Schema::hasTable('penagihan_piutang')) {
            Schema::table('penagihan_piutang', function (Blueprint $table) {
                $table->foreign(['nip'], 'penagihan_piutang_ibfk_1')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_pj'], 'penagihan_piutang_ibfk_2')->references(['kd_pj'])->on('penjab')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_rek'], 'penagihan_piutang_ibfk_3')->references(['kd_rek'])->on('rekening')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip_menyetujui'], 'penagihan_piutang_ibfk_4')->references(['nik'])->on('pegawai')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('penagihan_piutang')) {
            Schema::table('penagihan_piutang', function (Blueprint $table) {
                $table->dropForeign('penagihan_piutang_ibfk_1');
                $table->dropForeign('penagihan_piutang_ibfk_2');
                $table->dropForeign('penagihan_piutang_ibfk_3');
                $table->dropForeign('penagihan_piutang_ibfk_4');
            });
        }
    }
};
