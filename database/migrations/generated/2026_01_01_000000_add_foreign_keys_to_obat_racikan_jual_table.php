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
        if (Schema::hasTable('obat_racikan_jual')) {
            Schema::table('obat_racikan_jual', function (Blueprint $table) {
                $table->foreign(['nota_jual'], 'obat_racikan_jual_ibfk_1')->references(['nota_jual'])->on('penjualan')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_racik'], 'obat_racikan_jual_ibfk_2')->references(['kd_racik'])->on('metode_racik')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('obat_racikan_jual')) {
            Schema::table('obat_racikan_jual', function (Blueprint $table) {
                $table->dropForeign('obat_racikan_jual_ibfk_1');
                $table->dropForeign('obat_racikan_jual_ibfk_2');
            });
        }
    }
};
