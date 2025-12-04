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
        if (Schema::hasTable('kamar_inap')) {
            Schema::table('kamar_inap', function (Blueprint $table) {
                $table->foreign(['kd_kamar'], 'kamar_inap_ibfk_2')->references(['kd_kamar'])->on('kamar')->onUpdate('cascade')->onDelete('cascade');
                $table->foreign(['no_rawat'], 'kamar_inap_ibfk_3')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('kamar_inap')) {
            Schema::table('kamar_inap', function (Blueprint $table) {
                $table->dropForeign('kamar_inap_ibfk_2');
                $table->dropForeign('kamar_inap_ibfk_3');
            });
        }
    }
};
