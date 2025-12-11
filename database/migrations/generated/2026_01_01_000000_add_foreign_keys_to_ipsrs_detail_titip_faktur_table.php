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
        if (Schema::hasTable('ipsrs_detail_titip_faktur')) {
            Schema::table('ipsrs_detail_titip_faktur', function (Blueprint $table) {
                $table->foreign(['no_tagihan'], 'ipsrs_detail_titip_faktur_ibfk_1')->references(['no_tagihan'])->on('ipsrs_titip_faktur')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_faktur'], 'ipsrs_detail_titip_faktur_ibfk_2')->references(['no_faktur'])->on('ipsrspemesanan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('ipsrs_detail_titip_faktur')) {
            Schema::table('ipsrs_detail_titip_faktur', function (Blueprint $table) {
                $table->dropForeign('ipsrs_detail_titip_faktur_ibfk_1');
                $table->dropForeign('ipsrs_detail_titip_faktur_ibfk_2');
            });
        }
    }
};
