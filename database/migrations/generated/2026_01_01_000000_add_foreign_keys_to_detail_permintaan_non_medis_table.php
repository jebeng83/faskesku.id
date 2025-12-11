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
        if (Schema::hasTable('detail_permintaan_non_medis')) {
            Schema::table('detail_permintaan_non_medis', function (Blueprint $table) {
                $table->foreign(['no_permintaan'], 'detail_permintaan_non_medis_ibfk_1')->references(['no_permintaan'])->on('permintaan_non_medis')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_brng'], 'detail_permintaan_non_medis_ibfk_2')->references(['kode_brng'])->on('ipsrsbarang')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kode_sat'], 'detail_permintaan_non_medis_ibfk_3')->references(['kode_sat'])->on('kodesatuan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detail_permintaan_non_medis')) {
            Schema::table('detail_permintaan_non_medis', function (Blueprint $table) {
                $table->dropForeign('detail_permintaan_non_medis_ibfk_1');
                $table->dropForeign('detail_permintaan_non_medis_ibfk_2');
                $table->dropForeign('detail_permintaan_non_medis_ibfk_3');
            });
        }
    }
};
