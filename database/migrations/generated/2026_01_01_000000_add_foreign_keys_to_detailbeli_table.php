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
        if (Schema::hasTable('detailbeli')) {
            Schema::table('detailbeli', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'detailbeli_ibfk_5')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_sat'], 'detailbeli_ibfk_6')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_faktur'], 'detailbeli_ibfk_7')->references(['no_faktur'])->on('pembelian')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detailbeli')) {
            Schema::table('detailbeli', function (Blueprint $table) {
                $table->dropForeign('detailbeli_ibfk_5');
                $table->dropForeign('detailbeli_ibfk_6');
                $table->dropForeign('detailbeli_ibfk_7');
            });
        }
    }
};
