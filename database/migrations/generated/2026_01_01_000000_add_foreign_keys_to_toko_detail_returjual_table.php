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
        if (Schema::hasTable('toko_detail_returjual')) {
            Schema::table('toko_detail_returjual', function (Blueprint $table) {
                $table->foreign(['kode_sat'], 'toko_detail_returjual_ibfk_1')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_brng'], 'toko_detail_returjual_ibfk_2')->references(['kode_brng'])->on('tokobarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_retur_jual'], 'toko_detail_returjual_ibfk_3')->references(['no_retur_jual'])->on('tokoreturjual')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('toko_detail_returjual')) {
            Schema::table('toko_detail_returjual', function (Blueprint $table) {
                $table->dropForeign('toko_detail_returjual_ibfk_1');
                $table->dropForeign('toko_detail_returjual_ibfk_2');
                $table->dropForeign('toko_detail_returjual_ibfk_3');
            });
        }
    }
};
