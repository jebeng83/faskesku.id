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
        if (Schema::hasTable('detail_obat_racikan')) {
            Schema::table('detail_obat_racikan', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'detail_obat_racikan_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kode_brng'], 'detail_obat_racikan_ibfk_2')->references(['kode_brng'])->on('databarang')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detail_obat_racikan')) {
            Schema::table('detail_obat_racikan', function (Blueprint $table) {
                $table->dropForeign('detail_obat_racikan_ibfk_1');
                $table->dropForeign('detail_obat_racikan_ibfk_2');
            });
        }
    }
};
