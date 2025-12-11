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
        if (Schema::hasTable('jns_perawatan')) {
            Schema::table('jns_perawatan', function (Blueprint $table) {
                $table->foreign(['kd_kategori'], 'jns_perawatan_ibfk_1')->references(['kd_kategori'])->on('kategori_perawatan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_pj'], 'jns_perawatan_ibfk_2')->references(['kd_pj'])->on('penjab')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_poli'], 'jns_perawatan_ibfk_3')->references(['kd_poli'])->on('poliklinik')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('jns_perawatan')) {
            Schema::table('jns_perawatan', function (Blueprint $table) {
                $table->dropForeign('jns_perawatan_ibfk_1');
                $table->dropForeign('jns_perawatan_ibfk_2');
                $table->dropForeign('jns_perawatan_ibfk_3');
            });
        }
    }
};
