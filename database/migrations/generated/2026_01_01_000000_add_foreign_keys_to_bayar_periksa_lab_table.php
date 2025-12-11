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
        if (Schema::hasTable('bayar_periksa_lab')) {
            Schema::table('bayar_periksa_lab', function (Blueprint $table) {
                $table->foreign(['kd_jenis_prw'], 'bayar_periksa_lab_ibfk_1')->references(['kd_jenis_prw'])->on('jns_perawatan_lab')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_rawat'], 'bayar_periksa_lab_ibfk_2')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_bayar'], 'bayar_periksa_lab_ibfk_3')->references(['no_bayar'])->on('bayar_jm_dokter')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bayar_periksa_lab')) {
            Schema::table('bayar_periksa_lab', function (Blueprint $table) {
                $table->dropForeign('bayar_periksa_lab_ibfk_1');
                $table->dropForeign('bayar_periksa_lab_ibfk_2');
                $table->dropForeign('bayar_periksa_lab_ibfk_3');
            });
        }
    }
};
