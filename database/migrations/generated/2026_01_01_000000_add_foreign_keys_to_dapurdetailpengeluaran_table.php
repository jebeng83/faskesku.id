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
        if (Schema::hasTable('dapurdetailpengeluaran')) {
            Schema::table('dapurdetailpengeluaran', function (Blueprint $table) {
                $table->foreign(['no_keluar'], 'dapurdetailpengeluaran_ibfk_1')->references(['no_keluar'])->on('dapurpengeluaran')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_sat'], 'dapurdetailpengeluaran_ibfk_2')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_brng'], 'dapurdetailpengeluaran_ibfk_3')->references(['kode_brng'])->on('dapurbarang')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('dapurdetailpengeluaran')) {
            Schema::table('dapurdetailpengeluaran', function (Blueprint $table) {
                $table->dropForeign('dapurdetailpengeluaran_ibfk_1');
                $table->dropForeign('dapurdetailpengeluaran_ibfk_2');
                $table->dropForeign('dapurdetailpengeluaran_ibfk_3');
            });
        }
    }
};
