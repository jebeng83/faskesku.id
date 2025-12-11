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
        if (Schema::hasTable('ipsrsdetailpengeluaran')) {
            Schema::table('ipsrsdetailpengeluaran', function (Blueprint $table) {
                $table->foreign(['no_keluar'], 'ipsrsdetailpengeluaran_ibfk_1')->references(['no_keluar'])->on('ipsrspengeluaran')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_sat'], 'ipsrsdetailpengeluaran_ibfk_3')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_brng'], 'ipsrsdetailpengeluaran_ibfk_4')->references(['kode_brng'])->on('ipsrsbarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('ipsrsdetailpengeluaran')) {
            Schema::table('ipsrsdetailpengeluaran', function (Blueprint $table) {
                $table->dropForeign('ipsrsdetailpengeluaran_ibfk_1');
                $table->dropForeign('ipsrsdetailpengeluaran_ibfk_3');
                $table->dropForeign('ipsrsdetailpengeluaran_ibfk_4');
            });
        }
    }
};
