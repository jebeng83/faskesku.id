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
        if (Schema::hasTable('bayar_jm_dokter')) {
            Schema::table('bayar_jm_dokter', function (Blueprint $table) {
                $table->foreign(['kd_dokter'], 'bayar_jm_dokter_ibfk_1')->references(['kd_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['nama_bayar'], 'bayar_jm_dokter_ibfk_2')->references(['nama_bayar'])->on('akun_bayar_hutang')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bayar_jm_dokter')) {
            Schema::table('bayar_jm_dokter', function (Blueprint $table) {
                $table->dropForeign('bayar_jm_dokter_ibfk_1');
                $table->dropForeign('bayar_jm_dokter_ibfk_2');
            });
        }
    }
};
