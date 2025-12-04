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
        if (Schema::hasTable('ipsrsdetailbeli')) {
            Schema::table('ipsrsdetailbeli', function (Blueprint $table) {
                $table->foreign(['no_faktur'], 'ipsrsdetailbeli_ibfk_1')->references(['no_faktur'])->on('ipsrspembelian')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'ipsrsdetailbeli_ibfk_4')->references(['kode_brng'])->on('ipsrsbarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_sat'], 'ipsrsdetailbeli_ibfk_5')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('ipsrsdetailbeli')) {
            Schema::table('ipsrsdetailbeli', function (Blueprint $table) {
                $table->dropForeign('ipsrsdetailbeli_ibfk_1');
                $table->dropForeign('ipsrsdetailbeli_ibfk_4');
                $table->dropForeign('ipsrsdetailbeli_ibfk_5');
            });
        }
    }
};
