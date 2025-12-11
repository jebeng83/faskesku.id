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
        if (Schema::hasTable('detail_obat_racikan_jual')) {
            Schema::table('detail_obat_racikan_jual', function (Blueprint $table) {
                $table->foreign(['nota_jual'], 'detail_obat_racikan_jual_ibfk_1')->references(['nota_jual'])->on('penjualan')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'detail_obat_racikan_jual_ibfk_2')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detail_obat_racikan_jual')) {
            Schema::table('detail_obat_racikan_jual', function (Blueprint $table) {
                $table->dropForeign('detail_obat_racikan_jual_ibfk_1');
                $table->dropForeign('detail_obat_racikan_jual_ibfk_2');
            });
        }
    }
};
