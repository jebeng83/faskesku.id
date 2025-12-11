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
        if (Schema::hasTable('detail_titip_faktur')) {
            Schema::table('detail_titip_faktur', function (Blueprint $table) {
                $table->foreign(['no_tagihan'], 'detail_titip_faktur_ibfk_1')->references(['no_tagihan'])->on('titip_faktur')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_faktur'], 'detail_titip_faktur_ibfk_2')->references(['no_faktur'])->on('pemesanan')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('detail_titip_faktur')) {
            Schema::table('detail_titip_faktur', function (Blueprint $table) {
                $table->dropForeign('detail_titip_faktur_ibfk_1');
                $table->dropForeign('detail_titip_faktur_ibfk_2');
            });
        }
    }
};
