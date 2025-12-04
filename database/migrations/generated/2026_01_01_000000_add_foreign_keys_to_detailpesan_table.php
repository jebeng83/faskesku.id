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
        if (Schema::hasTable('detailpesan')) {
            Schema::table('detailpesan', function (Blueprint $table) {
                $table->foreign(['kode_brng'], 'detailpesan_ibfk_1')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_sat'], 'detailpesan_ibfk_2')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_faktur'], 'detailpesan_ibfk_3')->references(['no_faktur'])->on('pemesanan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detailpesan')) {
            Schema::table('detailpesan', function (Blueprint $table) {
                $table->dropForeign('detailpesan_ibfk_1');
                $table->dropForeign('detailpesan_ibfk_2');
                $table->dropForeign('detailpesan_ibfk_3');
            });
        }
    }
};
