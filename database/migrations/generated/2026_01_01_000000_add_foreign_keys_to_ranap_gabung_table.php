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
        if (Schema::hasTable('ranap_gabung')) {
            Schema::table('ranap_gabung', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'ranap_gabung_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['no_rawat2'], 'ranap_gabung_ibfk_2')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('ranap_gabung')) {
            Schema::table('ranap_gabung', function (Blueprint $table) {
                $table->dropForeign('ranap_gabung_ibfk_1');
                $table->dropForeign('ranap_gabung_ibfk_2');
            });
        }
    }
};
