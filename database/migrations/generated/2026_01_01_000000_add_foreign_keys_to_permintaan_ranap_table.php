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
        if (Schema::hasTable('permintaan_ranap')) {
            Schema::table('permintaan_ranap', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'permintaan_ranap_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['kd_kamar'], 'permintaan_ranap_ibfk_2')->references(['kd_kamar'])->on('kamar')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('permintaan_ranap')) {
            Schema::table('permintaan_ranap', function (Blueprint $table) {
                $table->dropForeign('permintaan_ranap_ibfk_1');
                $table->dropForeign('permintaan_ranap_ibfk_2');
            });
        }
    }
};
