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
        if (Schema::hasTable('inventaris_detail_titip_faktur')) {
            Schema::table('inventaris_detail_titip_faktur', function (Blueprint $table) {
                $table->foreign(['no_tagihan'], 'inventaris_detail_titip_faktur_ibfk_1')->references(['no_tagihan'])->on('inventaris_titip_faktur')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_faktur'], 'inventaris_detail_titip_faktur_ibfk_2')->references(['no_faktur'])->on('inventaris_pemesanan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('inventaris_detail_titip_faktur')) {
            Schema::table('inventaris_detail_titip_faktur', function (Blueprint $table) {
                $table->dropForeign('inventaris_detail_titip_faktur_ibfk_1');
                $table->dropForeign('inventaris_detail_titip_faktur_ibfk_2');
            });
        }
    }
};
