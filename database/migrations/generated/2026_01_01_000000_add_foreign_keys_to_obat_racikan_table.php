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
        if (Schema::hasTable('obat_racikan')) {
            Schema::table('obat_racikan', function (Blueprint $table) {
                $table->foreign(['no_rawat'], 'obat_racikan_ibfk_1')->references(['no_rawat'])->on('reg_periksa')->onUpdate('cascade')->onDelete('restrict');
                $table->foreign(['kd_racik'], 'obat_racikan_ibfk_2')->references(['kd_racik'])->on('metode_racik')->onUpdate('cascade')->onDelete('restrict');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('obat_racikan')) {
            Schema::table('obat_racikan', function (Blueprint $table) {
                $table->dropForeign('obat_racikan_ibfk_1');
                $table->dropForeign('obat_racikan_ibfk_2');
            });
        }
    }
};
