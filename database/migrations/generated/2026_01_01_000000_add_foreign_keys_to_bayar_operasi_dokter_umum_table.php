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
        if (Schema::hasTable('bayar_operasi_dokter_umum')) {
            Schema::table('bayar_operasi_dokter_umum', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'bayar_operasi_dokter_umum_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_bayar'], 'bayar_operasi_dokter_umum_ibfk_2')->references(['no_bayar'])->on('bayar_jm_dokter')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_paket'], 'bayar_operasi_dokter_umum_ibfk_3')->references(['kode_paket'])->on('paket_operasi')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bayar_operasi_dokter_umum')) {
            Schema::table('bayar_operasi_dokter_umum', function (Blueprint $table) {
                $table->dropForeign('bayar_operasi_dokter_umum_ibfk_1');
                $table->dropForeign('bayar_operasi_dokter_umum_ibfk_2');
                $table->dropForeign('bayar_operasi_dokter_umum_ibfk_3');
            });
        }
    }
};
