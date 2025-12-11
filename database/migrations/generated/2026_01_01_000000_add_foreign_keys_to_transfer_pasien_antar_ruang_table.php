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
        if (Schema::hasTable('transfer_pasien_antar_ruang')) {
            Schema::table('transfer_pasien_antar_ruang', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'transfer_pasien_antar_ruang_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['nip_menyerahkan'], 'transfer_pasien_antar_ruang_ibfk_2')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nip_menerima'], 'transfer_pasien_antar_ruang_ibfk_3')->references(['nip'])->on('petugas')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('transfer_pasien_antar_ruang')) {
            Schema::table('transfer_pasien_antar_ruang', function (Blueprint $table) {
                $table->dropForeign('transfer_pasien_antar_ruang_ibfk_1');
                $table->dropForeign('transfer_pasien_antar_ruang_ibfk_2');
                $table->dropForeign('transfer_pasien_antar_ruang_ibfk_3');
            });
        }
    }
};
