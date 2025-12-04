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
        if (Schema::hasTable('dapurdetailbeli')) {
            Schema::table('dapurdetailbeli', function (Blueprint $table) {
                $table->foreign(['no_faktur'], 'dapurdetailbeli_ibfk_1')->references(['no_faktur'])->on('dapurpembelian')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'dapurdetailbeli_ibfk_2')->references(['kode_brng'])->on('dapurbarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_sat'], 'dapurdetailbeli_ibfk_3')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('dapurdetailbeli')) {
            Schema::table('dapurdetailbeli', function (Blueprint $table) {
                $table->dropForeign('dapurdetailbeli_ibfk_1');
                $table->dropForeign('dapurdetailbeli_ibfk_2');
                $table->dropForeign('dapurdetailbeli_ibfk_3');
            });
        }
    }
};
