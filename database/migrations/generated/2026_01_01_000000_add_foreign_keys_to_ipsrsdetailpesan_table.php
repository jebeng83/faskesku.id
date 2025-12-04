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
        if (Schema::hasTable('ipsrsdetailpesan')) {
            Schema::table('ipsrsdetailpesan', function (Blueprint $table) {
                $table->foreign(['no_faktur'], 'ipsrsdetailpesan_ibfk_1')->references(['no_faktur'])->on('ipsrspemesanan')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'ipsrsdetailpesan_ibfk_2')->references(['kode_brng'])->on('ipsrsbarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_sat'], 'ipsrsdetailpesan_ibfk_3')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('ipsrsdetailpesan')) {
            Schema::table('ipsrsdetailpesan', function (Blueprint $table) {
                $table->dropForeign('ipsrsdetailpesan_ibfk_1');
                $table->dropForeign('ipsrsdetailpesan_ibfk_2');
                $table->dropForeign('ipsrsdetailpesan_ibfk_3');
            });
        }
    }
};
